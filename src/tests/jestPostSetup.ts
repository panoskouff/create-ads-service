import '@testing-library/jest-dom'
import '@testing-library/jest-dom/extend-expect'
import { PrismaClient } from '@prisma/client'

jest.mock('@prisma/client', () => {
  const mockPrismaClient = {}

  return {
    __esModule: true,
    PrismaClient: jest.fn().mockImplementation(() => mockPrismaClient),
  }
})

global.prisma = new PrismaClient()
