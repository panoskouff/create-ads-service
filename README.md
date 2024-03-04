# Create Ads Service

## Description

Create Ads Service is a full-stack web application built with [Next.js](https://nextjs.org/), [Prisma](https://www.prisma.io/), [TypeScript](https://www.typescriptlang.org/), and [MongoDB](https://www.mongodb.com/). It allows users to sign up, sign in, create property ads, and list all ads they have created. The project uses [next-auth](https://next-auth.js.org/) for authentication with stateless JWT validation, and it features color-coded validation for an enhanced user experience.

## Features

- User authentication (sign up, sign in)
- Create and list user-specific ads
- Color-coded form validation
- Secure authentication using next-auth with JWT

## Prerequisites

- Node.js
- npm or pnpm
- MongoDB

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/panoskouff/create-ads-service
   cd create-ads-service
   ```

2. Install the dependencies:

   ```bash
   npm install
   # or
   pnpm install
   ```

3. Copy `.env-sample` to `.env` and fill in the required environment variables:

   ```bash
   cp .env-sample .env
   ```

4. Generate Prisma client:

   ```bash
   npx prisma generate
   # or
   pnpx prisma generate
   ```

   > Note: If Prisma types are not appearing, ensure you've run `npx prisma generate` or `pnpx prisma generate`.

5. Run the development server:

   ```bash
   npm run dev
   # or
   pnpm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Scripts

- `dev`: Run the development server.
- `build`: Build the application for production.
- `start`: Start a production server.
- `lint`: Lint the project files with eslint.
- `format`: Format the project files with prettier.
- `test`: Run tests.
- `test:watch`: Run a specific test in watch mode.

## Deployment

This application is deployed at [create-ads-service.vercel.app](https://create-ads-service.vercel.app).
