import React from 'react'
import { render, screen } from '@testing-library/react'
import Page from './page'

jest.mock('#/components/AdPropertyForm/AdPropertyFormContainer', () => ({
  AdPropertyFormContainer: () => <div>[AdPropertyForm]</div>,
}))

jest.mock('next-auth', () => ({
  getServerSession: jest.fn(() => ({ user: { id: 'mock-user-id' } })),
}))

jest.mock('next/link', () => {
  return jest.fn(({ children, href }) => <a href={href}>{children}</a>)
})

describe('Page', () => {
  it('should render the AdPropertyForm if the user is signed in', async () => {
    render(await Page())
    expect(screen.getByText('[AdPropertyForm]')).toBeInTheDocument()
  })

  it('should render the sign in link if the user is not signed in', async () => {
    require('next-auth').getServerSession.mockImplementationOnce(() => null)
    render(await Page())

    expect(screen.getByText('sign in').closest('a')).toHaveAttribute(
      'href',
      '/sign-in',
    )
  })
})
