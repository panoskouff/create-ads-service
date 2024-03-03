import React from 'react'
import { render, screen } from '@testing-library/react'
import { Text } from '#/atoms'
import Page from './page'

jest.mock('#/components/FetchAndDisplayUserPropertyAds', () => {
  return {
    __esModule: true,
    FetchAndDisplayUserPropertyAds: jest.fn(() => (
      <div>[FetchAndDisplayUserPropertyAds]</div>
    )),
  }
})

jest.mock('next-auth', () => ({
  getServerSession: jest.fn(() => ({ user: { id: 'mock-user-id' } })),
}))

jest.mock('next/link', () => {
  return jest.fn(({ children, href }) => <a href={href}>{children}</a>)
})

// we can't use let or const here due to the way jest.mock scope works
var mockSuspense: jest.Mock
jest.mock('react', () => {
  mockSuspense = jest.fn()
  mockSuspense
    /* Mock Suspense once so if its rendered we can actually see that is there. */
    .mockImplementationOnce(() => <div>[Suspense]</div>)
    .mockImplementation(({ children }) => <div>{children}</div>)
  const originalReact = jest.requireActual('react')

  return {
    __esModule: true,
    ...originalReact,
    Suspense: mockSuspense,
  }
})

describe('Page', () => {
  it('should render correctly with the correct fallback', async () => {
    render(await Page())

    expect(screen.getByText('Your ads')).toBeInTheDocument()
    expect(screen.getByText('[Suspense]')).toBeInTheDocument()
    expect(screen.getByText('Place an ad')).toBeInTheDocument()
    expect(screen.getByText('Place an ad').closest('a')).toHaveAttribute(
      'href',
      '/place-ad',
    )

    const props = mockSuspense.mock.calls[0][0]
    expect(props.fallback).toEqual(<Text>Loading your property ads...</Text>)
  })

  it('should render FetchAndDisplayUserPropertyAds once its loaded', async () => {
    render(await Page())

    expect(
      screen.getByText('[FetchAndDisplayUserPropertyAds]'),
    ).toBeInTheDocument()
  })

  it('should render the sign in link if the user is not signed in', async () => {
    ;(require('next-auth') as any).getServerSession.mockImplementationOnce(
      () => null,
    )

    render(await Page())

    expect(screen.getByText('sign in').closest('a')).toHaveAttribute(
      'href',
      '/sign-in',
    )
  })
})
