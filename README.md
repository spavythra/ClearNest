# ClearNest

A household management web app for families. It brings task tracking, habit streaks, shopping lists, and inventory management into one shared space, with real-time sync across family members.

Live demo: https://clear-nest.vercel.app

---

## Features

**Kanban Task Board**
- 4 columns: To Do, In Progress, Review, Done
- Drag and drop on desktop
- Priority levels with colour indicators
- Task assignment to family members
- Due dates with overdue alerts
- Recurring tasks (daily, weekly, monthly)

**Habit Streaks**
- Track daily habits with streak counters
- Longest streak record and completion rate
- Daily reset at a configurable time

**Shopping List**
- Category-based organisation
- Sticky items for recurring purchases
- Shared in real time across family members
- Quantity and unit tracking

**Inventory Management**
- Track household supplies with low-stock alerts
- Expiry date tracking with reminders
- Category-based organisation

---

## Tech Stack

| Component | Technology |
|---|---|
| Frontend | Next.js 15, React 19, TypeScript |
| Styling | Tailwind CSS |
| Authentication | Supabase Auth (Google OAuth, Email/Password) |
| Database | PostgreSQL via Supabase with Row Level Security |
| Real-time | Supabase Realtime Subscriptions |
| Backend API | Next.js API Routes |
| Deployment | Vercel |

---

## Security

- Row Level Security enforced at the database level
- JWT-based authentication
- HTTPS only
- Input validation against XSS and SQL injection
- CORS configured on API routes

---

## Project Structure

```
ClearNest/
├── app/
│   ├── (auth)/          # Login, signup, callback pages
│   ├── reminders/       # Kanban board
│   ├── streaks/         # Habit tracking
│   ├── shopping/        # Shopping list
│   ├── inventory/       # Inventory tracker
│   └── api/             # API route handlers
├── components/
│   ├── ui/              # Base UI components
│   ├── layout/          # Layout components
│   └── shared/          # Shared components
├── lib/
│   ├── hooks/           # Custom React hooks
│   ├── utils/           # Utility functions
│   ├── types.ts         # TypeScript type definitions
│   └── supabase.ts      # Supabase client
├── supabase/
│   └── migrations/      # Database migrations
└── styles/
    └── globals.css
```

---

## Run Locally

### Prerequisites

- Node.js 18+
- Supabase account (free tier works)

### Setup

1. Clone the repository

```bash
git clone https://github.com/spavythra/ClearNest.git
cd ClearNest
```

2. Install dependencies

```bash
npm install
```

3. Set up environment variables

```bash
cp .env.local.example .env.local
```

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

4. Run the database migration in your Supabase SQL editor

```sql
-- contents of supabase/migrations/001_initial_schema.sql
```

5. Enable Google OAuth in Supabase Auth settings and set the redirect URL to `http://localhost:3000/auth/callback`

6. Start the development server

```bash
npm run dev
```

App runs at `http://localhost:3000`

---

## Deploy to Vercel

1. Push to GitHub
2. Import the repo in Vercel
3. Add the environment variables
4. Deploy

---

## License

MIT License
