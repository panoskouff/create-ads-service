import '@testing-library/jest-dom'
import '@testing-library/jest-dom/extend-expect'

process.env.AUTOCOMPLETE_API_URL = 'https://fakeapi.com'

import { PrismaClient } from '@prisma/client'

jest.mock('@prisma/client', () => {
  const mockPrismaClient = {}

  return {
    __esModule: true,
    PrismaClient: jest.fn().mockImplementation(() => mockPrismaClient),
  }
})

global.prisma = new PrismaClient()
