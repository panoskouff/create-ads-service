import '@testing-library/jest-dom'
import '@testing-library/jest-dom/extend-expect'
import { PrismaClient } from '@prisma/client'

jest.mock('@prisma/client', () => {
  // const originalModule = jest.requireActual('@prisma/client')

  const mockPrismaClient = {
    user: {
      // findUnique: jest.fn().mockResolvedValue({ /* Mocked user data */ }),
      // create: jest.fn().mockResolvedValue({ /* Mocked user data */ }),
      //...
    },
  }

  return {
    __esModule: true,
    // ...originalModule,
    PrismaClient: jest.fn().mockImplementation(() => mockPrismaClient),
  }
})

// global.prisma = new PrismaClient()
global.prisma = new PrismaClient()
