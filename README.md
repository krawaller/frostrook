# FrostRook - Next.js App with Supabase

A full-stack application built with Next.js, TypeScript, Supabase, and modern development tools.

## Features

- ⚡ **Next.js 16** with App Router and Turbopack
- 🔷 **TypeScript** for type safety
- 🔐 **Supabase Authentication** with Row Level Security
- 🗄️ **PostgreSQL Database** with local development support
- ✨ **CRUD Operations** for user-specific data
- 🎨 **ESLint** for code quality
- 💅 **Prettier** for code formatting

## Getting Started

### Prerequisites

- Node.js 18+
- Docker Desktop (for local Supabase)
- Supabase CLI

### Installation

1. Install dependencies:

   ```bash
   npm install
   ```

2. Install Supabase CLI (if not already installed):

   ```bash
   brew install supabase/tap/supabase
   ```

3. Set up environment files:

   ```bash
   npm run env:setup
   ```

   This creates template files. Then run:

   ```bash
   npm run env:local-setup    # Auto-configures local development from Supabase
   ```

   **For production**: Edit `.env.local.prod` with your actual Supabase production values from [your Supabase dashboard](https://supabase.com/dashboard).

### Development Options

#### Option 1: Local Development (Recommended)

Start with a local Supabase instance:

```bash
# Start development server with local database
npm run dev:local
```

This automatically:

- Sets up local environment variables
- Starts local Supabase stack
- Starts Next.js development server

- **App**: http://localhost:3000
- **Supabase Studio**: http://127.0.0.1:54323
- **Database**: postgresql://postgres:postgres@127.0.0.1:54322/postgres

#### Option 2: Production Database

Use your production Supabase instance:

```bash
npm run dev:production
```

**Note**: Make sure you've configured `.env.local.prod` with your production values first.

### Available Scripts

- `npm run dev` - Start development server (uses current .env.local)
- `npm run dev:local` - Start with local Supabase environment
- `npm run dev:production` - Start with production Supabase environment
- `npm run build` - Build the application for production
- `npm run start` - Start the production server
- `npm run lint` - Run ESLint to check for code issues
- `npm run format` - Format code using Prettier
- `npm run env:setup` - Create environment template files
- `npm run env:local-setup` - Auto-configure local environment from Supabase
- `npm run env:local` - Switch to local development environment
- `npm run env:production` - Switch to production environment
- `npm run supabase:start` - Start local Supabase
- `npm run supabase:stop` - Stop local Supabase
- `npm run supabase:reset` - Reset local database
- `npm run supabase:status` - Check Supabase status

## Project Structure

```
frostrook/
├── src/
│   ├── app/
│   │   ├── things/           # CRUD functionality for "things"
│   │   │   ├── actions.ts    # Server actions
│   │   │   ├── page.tsx      # Things page
│   │   │   └── components/   # UI components
│   │   ├── login/            # Authentication pages
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx          # Home page
│   ├── types/
│   │   └── database.ts       # TypeScript types
│   ├── utils/
│   │   └── supabase/         # Supabase client configuration
│   └── proxy.ts              # Next.js 16 proxy for auth
├── supabase/
│   ├── migrations/           # Database migrations
│   └── config.toml           # Supabase configuration
├── database/
│   └── setup.sql             # Database schema (reference)
├── .env.local.dev.template   # Local development environment template
├── .env.local.prod.template  # Production environment template
└── ...config files
```

## Environment Setup

The app uses different environment files for different contexts:

- **`.env.local.dev`** - Local Supabase development
- **`.env.local.prod`** - Production Supabase
- **`.env.local`** - Active environment (copied from above)

### Local Development Environment Variables

```env
NEXT_PUBLIC_SUPABASE_URL=http://127.0.0.1:54321
NEXT_PUBLIC_SUPABASE_ANON_KEY=sb_publishable_ACJWlzQHlZjBrEguHvfOxg_3BJgxAaH
SUPABASE_SERVICE_ROLE_KEY=sb_secret_N7UND0UgjKTVK-Uodkm0Hg_xSvEMPvz
```

## Database

The application includes a PostgreSQL database with:

- **User Authentication** via Supabase Auth
- **Things Table** with Row Level Security (RLS)
- **CRUD Operations** for user-specific data
- **Local Development** with Docker
- **Migrations** for version control

### Local Database Access

- **Supabase Studio**: http://127.0.0.1:54323
- **Direct PostgreSQL**: postgresql://postgres:postgres@127.0.0.1:54322/postgres

## Learn More

To learn more about the technologies used:

- [Next.js Documentation](https://nextjs.org/docs) - Next.js features and API
- [Supabase Documentation](https://supabase.com/docs) - Supabase features and API
- [Supabase Local Development](https://supabase.com/docs/guides/local-development) - Local development guide

## Deployment

The app is deployed on Vercel with production Supabase integration. For local development, use the local Supabase setup described above.
