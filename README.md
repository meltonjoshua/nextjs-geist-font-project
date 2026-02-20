# Suffolk Cleaning Agency

A full-stack Next.js website for Suffolk Cleaning Agency, featuring a public-facing marketing site, a contractor clock in/out portal, and an admin management dashboard.

## Features

### Public Website
- **Home** – Hero section, services overview, testimonials, and call-to-action
- **Services** – Detailed listing of all cleaning services offered
- **About** – Company story, values, and team information
- **Contact** – Contact form and company contact details

### Contractor Portal (`/contractor`)
- Secure login for contractors
- Clock in / Clock out with one click
- View personal time records and session history

### Admin Portal (`/admin`)
- Secure admin-only login
- Dashboard with live stats (total users, active sessions, today's records)
- **User Management** – Add, edit, and delete contractors and admins
- **Time Records** – View and filter all contractor clock records

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Set environment variables

Copy `.env.example` to `.env.local` and fill in your values:

```bash
cp .env.example .env.local
```

### 3. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the site.

## Default Credentials

| Role       | Email                              | Password    |
|------------|------------------------------------|-------------|
| Admin      | admin@suffolkcleaning.co.uk        | password123 |
| Contractor | john@suffolkcleaning.co.uk         | password123 |

> **Important:** Change these passwords immediately after first login in production.

## Project Structure

```
src/
  app/
    page.tsx                  # Home page
    services/page.tsx         # Services page
    about/page.tsx            # About page
    contact/page.tsx          # Contact page
    contractor/
      login/page.tsx          # Contractor login
      dashboard/page.tsx      # Clock in/out dashboard
    admin/
      login/page.tsx          # Admin login
      dashboard/page.tsx      # Admin overview
      users/page.tsx          # User management
      records/page.tsx        # All clock records
    api/                      # API routes
  components/
    Navbar.tsx
    Footer.tsx
  lib/
    auth.ts                   # JWT utilities (jose)
    db.ts                     # File-based JSON storage
  middleware.ts               # Route protection
data/
  users.json                  # User records
  records.json                # Clock records
```

## Tech Stack

- **Next.js 16** with App Router
- **TypeScript**
- **Tailwind CSS**
- **jose** – JWT authentication (edge-compatible)
- **bcryptjs** – Password hashing
- File-based JSON storage (no external database required)

## Environment Variables

| Variable     | Description                                      | Default (dev only)                          |
|--------------|--------------------------------------------------|---------------------------------------------|
| `JWT_SECRET` | Secret key for signing JWT tokens (min 32 chars) | `suffolk-cleaning-dev-secret-key-not-for-production` |

> In production, always set a strong `JWT_SECRET`.
