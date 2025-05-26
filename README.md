# Garment ERP System

This is the monorepo for the Garment ERP System, a modern solution for managing garment production processes.

## Overview

The project is built with Next.js (App Router) for both the frontend and backend API, Prisma as the ORM, and TypeScript for type safety.

## Folder Structure

```
garment-erp/
├── .next/                  # Next.js build output
├── .git/                   # Git repository files
├── docs/                   # Project documentation (guidelines, design docs)
├── docker/                 # Docker configurations (e.g., docker-compose.yml)
├── node_modules/           # Project dependencies
├── prisma/                 # Prisma schema, migrations, and seeds
│   ├── migrations/         # Database migration files
│   └── schema.prisma       # Main Prisma schema file
├── public/                 # Static assets served by Next.js
├── src/                    # Application source code
│   ├── app/                # Next.js App Router (Frontend Pages & API Routes)
│   │   ├── api/            # API route handlers
│   │   │   ├── tenants/
│   │   │   │   ├── [id]/route.ts
│   │   │   │   └── route.ts
│   │   │   ├── users/
│   │   │   │   ├── [id]/route.ts
│   │   │   │   └── route.ts
│   │   │   └── # (other API routes ...)
│   │   ├── admin/          # Admin portal frontend (example structure)
│   │   │   ├── components/
│   │   │   ├── pages/
│   │   │   └── layout.tsx
│   │   ├── (portal)/       # Main application portal (example structure)
│   │   ├── layout.tsx      # Root layout
│   │   └── page.tsx        # Root page
│   │   └── # (other frontend pages, components, hooks, styles, lib ...)
│   │
│   └── backend/            # Backend business logic and data access
│       ├── controllers/    # Request handlers, call services
│       │   ├── tenant.controller.ts
│       │   └── user.controller.ts
│       ├── services/       # Core business logic
│       │   ├── tenant.service.ts
│       │   └── user.service.ts
│       ├── repositories/   # Data access layer (using Prisma)
│       │   ├── tenant.repository.ts
│       │   └── user.repository.ts
│       ├── types/          # TypeScript definitions and DTOs
│       │   ├── tenant.types.ts
│       │   └── user.types.ts
│       └── utils/          # Shared backend utilities
│
├── .gitignore              # Files and directories to be ignored by Git
├── docker-compose.yml      # Docker Compose configuration
├── eslint.config.mjs       # ESLint configuration
├── next-env.d.ts           # Next.js TypeScript environment types
├── next.config.mjs         # Next.js configuration
├── package.json            # Project metadata and dependencies
├── pnpm-lock.yaml          # PNPM lock file
├── README.md               # This file
└── tsconfig.json           # TypeScript compiler configuration
```

## Key Technologies

*   **Framework**: Next.js (App Router)
*   **Language**: TypeScript
*   **ORM**: Prisma
*   **Database**: PostgreSQL (or as configured in `docker-compose.yml` and `schema.prisma`)
*   **Styling**: (Specify your styling solution, e.g., Tailwind CSS, CSS Modules)
*   **Package Manager**: pnpm
*   **Containerization**: Docker

## Getting Started

### Prerequisites

*   Node.js (latest LTS version recommended)
*   pnpm (https://pnpm.io/installation)
*   Docker and Docker Compose (https://www.docker.com/get-started)

### Installation

1.  Clone the repository:
    ```bash
    git clone <repository-url>
    cd garment-erp
    ```
2.  Install dependencies:
    ```bash
    pnpm install
    ```

### Environment Setup

1.  Create a `.env` file in the root of the project by copying `.env.example` (if it exists) or by creating a new one.
2.  Set the `DATABASE_URL` environment variable. For local development with Docker, it will typically look like this if you're using PostgreSQL:
    ```env
    DATABASE_URL="postgresql://user:password@localhost:5432/garment_erp_db?schema=public"
    ```
    (Adjust username, password, port, and database name as per your `docker-compose.yml` and Prisma setup).

### Database Setup

1.  Start the database container using Docker Compose:
    ```bash
    docker-compose up -d postgres  # Assuming 'postgres' is your service name in docker-compose.yml
    ```
2.  Run Prisma migrations to create the database schema:
    ```bash
    pnpm prisma migrate dev
    ```
3.  (Optional) Seed the database if you have seed scripts:
    ```bash
    pnpm prisma db seed
    ```

### Running the Application

1.  Start the development server:
    ```bash
    pnpm dev
    ```
    The application should now be running on `http://localhost:3000` (or your configured port).

## Available Scripts

In `package.json`, you can find various scripts:

*   `pnpm dev`: Starts the Next.js development server.
*   `pnpm build`: Builds the application for production.
*   `pnpm start`: Starts a Next.js production server.
*   `pnpm lint`: Lints the codebase using ESLint.
*   `pnpm prisma:migrate:dev`: Runs database migrations for development.
*   `pnpm prisma:studio`: Opens Prisma Studio to view and manage data.
*   `pnpm prisma:generate`: Generates Prisma Client based on your schema.

(Add or modify scripts as per your `package.json`)

## Coding Guidelines

Detailed coding guidelines, architectural rules, and design documents can be found in the `/docs` directory.

## Contributing

(Add guidelines for contributing to the project if applicable.) 