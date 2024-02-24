import { render, screen } from '@testing-library/react'
import { getServerSession } from 'next-auth'
import Page from './page'

// we can't use let or const here due to the way jest.mock scope works
var mockSessionProvider: jest.Mock

jest.mock('next-auth/react', () => {
  mockSessionProvider = jest.fn(({ children }) => (
    <div>
      [SessionProvider]
      {children}
    </div>
  ))
  return {
    SessionProvider: mockSessionProvider,
  }
})

jest.mock('next-auth', () => ({
  getServerSession: jest.fn(() => ({ user: { id: 'mock-user-id' } })),
}))

describe('Page', () => {
  it('should render correctly', async () => {
    render(await Page())
    expect(screen.getByText('[SessionProvider]')).toBeInTheDocument()
  })

  it('should pass the session to the SessionProvider if it exists', async () => {
    render(await Page())
    expect(mockSessionProvider).toHaveBeenCalledWith(
      {
        children: expect.anything(),
        session: { user: { id: 'mock-user-id' } },
      },
      {},
    )
  })

  it(`should pass null to session if the user is not signed in`, async () => {
    ;(getServerSession as jest.Mock).mockImplementationOnce(() => null)
    render(await Page())
    expect(mockSessionProvider).toHaveBeenCalledWith(
      {
        children: expect.anything(),
        session: null,
      },
      {},
    )
  })
})
