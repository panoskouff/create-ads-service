import React from 'react'
import { render } from '@testing-library/react'
import Layout from './layout'

var MockNavigation: jest.Mock
jest.mock('#/components/Navigation', () => {
  MockNavigation = jest.fn(() => <div>[Navigation]</div>)
  return {
    __esModule: true,
    Navigation: MockNavigation,
  }
})

jest.mock('#/theme/fonts', () => ({
  mulish: {
    variable: 'mock-font-value',
  },
}))

jest.mock('next-auth', () => ({
  getServerSession: jest.fn(() => ({ user: { id: 'mock-user-id' } })),
}))

describe('Layout', () => {
  it('should check that the correct font is passed to the html tag', async () => {
    const { container } = render(await Layout({ children: 'mock-children' }))

    const htmlElement = container.querySelector('html')
    expect(htmlElement).not.toBe(null)

    expect(htmlElement).toHaveClass('mock-font-value')
  })

  it('should make sure Navigation is rendered and that session is passed as a prop', async () => {
    const { getByText } = render(await Layout({ children: 'mock-children' }))

    expect(getByText('[Navigation]')).toBeInTheDocument()
    const props = MockNavigation.mock.calls[0][0]
    expect(props.session).toEqual({ user: { id: 'mock-user-id' } })
  })

  it('should make sure that children are rendered', async () => {
    const { getByText } = render(await Layout({ children: 'mock-children' }))

    expect(getByText('mock-children')).toBeInTheDocument()
  })
})
