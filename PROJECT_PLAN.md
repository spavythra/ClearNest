# ClearNest - Family Maintenance App

## Project Overview
A browser-based app for family task management with streaks, shopping lists, inventory tracking, reminders, and roadmap planning. Real-time sync across family members.

## Core Features

### 1. **Streaks** (Daily Habit Tracking)
- Track consecutive days of completing tasks
- Examples: "Make bed", "Exercise", "Read", "Family dinner"
- Visual streak counter with fire emoji
- Break streak with option to restore
- Analytics: longest streak, current streak, completion rate
- Customizable daily reset time

### 2. **Shopping List**
- Add items with categories (Groceries, Household, etc.)
- Check-off completed items
- Share shopping list with family
- Sticky items (recurring purchases)
- Smart categorization & search

### 3. **Inventory Management**
- Track household items (food, supplies, cleaning products)
- Quantity tracking with low-stock alerts
- Expiry date tracking (optional)
- Replenishment reminders
- Auto-add expired items to shopping list

### 4. **Reminders & Notifications**
- One-time and recurring reminders
- Integration with streaks (daily task reminders)
- Browser push notifications
- Assignable reminders (who's responsible?)

### 5. **Roadmap/Planning**
- Monthly goals & milestones
- Family projects (home renovation, organization, etc.)
- Task dependencies & progress tracking
- Deadline calendar view

---

## Tech Stack

### Frontend
- **Framework**: Next.js 15 (React + TypeScript)
- **Styling**: Tailwind CSS + shadcn/ui components
- **State Management**: React Context + SWR for data fetching
- **Real-time Updates**: Supabase RealtimeClient
- **Notifications**: Browser API + React-Toastify

### Backend
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth (email/Google/GitHub)
- **API**: Next.js API routes
- **Real-time Sync**: Supabase Realtime subscriptions

### Deployment
- Vercel (for Next.js)
- Supabase (free tier for database)

---

## Database Schema (PostgreSQL)

```sql
-- Users & Auth (handled by Supabase Auth)

-- Families (groups)
CREATE TABLE families (
  id UUID PRIMARY KEY,
  name VARCHAR(255),
  created_at TIMESTAMP,
  created_by UUID REFERENCES auth.users
);

-- Family Members
CREATE TABLE family_members (
  id UUID PRIMARY KEY,
  family_id UUID REFERENCES families,
  user_id UUID REFERENCES auth.users,
  role VARCHAR(50), -- owner, member
  joined_at TIMESTAMP
);

-- Streaks
CREATE TABLE streaks (
  id UUID PRIMARY KEY,
  family_id UUID REFERENCES families,
  name VARCHAR(255),
  description TEXT,
  daily_reset_hour INT DEFAULT 0,
  created_by UUID REFERENCES auth.users,
  created_at TIMESTAMP,
  updated_at TIMESTAMP
);

-- Streak Logs (daily records)
CREATE TABLE streak_logs (
  id UUID PRIMARY KEY,
  streak_id UUID REFERENCES streaks,
  user_id UUID REFERENCES auth.users,
  completed_at TIMESTAMP,
  date DATE
);

-- Shopping List Items
CREATE TABLE shopping_items (
  id UUID PRIMARY KEY,
  family_id UUID REFERENCES families,
  name VARCHAR(255),
  category VARCHAR(100),
  quantity INT,
  unit VARCHAR(50),
  is_completed BOOLEAN DEFAULT FALSE,
  is_sticky BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP,
  completed_at TIMESTAMP
);

-- Inventory Items
CREATE TABLE inventory_items (
  id UUID PRIMARY KEY,
  family_id UUID REFERENCES families,
  name VARCHAR(255),
  category VARCHAR(100),
  quantity INT,
  unit VARCHAR(50),
  min_quantity INT,
  expiry_date DATE,
  last_updated TIMESTAMP,
  updated_by UUID REFERENCES auth.users
);

-- Reminders
CREATE TABLE reminders (
  id UUID PRIMARY KEY,
  family_id UUID REFERENCES families,
  title VARCHAR(255),
  description TEXT,
  reminder_type VARCHAR(50), -- one-time, recurring
  scheduled_at TIMESTAMP,
  frequency VARCHAR(50), -- daily, weekly, monthly
  assigned_to UUID REFERENCES auth.users,
  is_completed BOOLEAN DEFAULT FALSE,
  created_by UUID REFERENCES auth.users,
  created_at TIMESTAMP
);

-- Roadmap/Projects
CREATE TABLE projects (
  id UUID PRIMARY KEY,
  family_id UUID REFERENCES families,
  name VARCHAR(255),
  description TEXT,
  status VARCHAR(50), -- planning, active, completed
  deadline DATE,
  created_by UUID REFERENCES auth.users,
  created_at TIMESTAMP
);

-- Project Tasks
CREATE TABLE project_tasks (
  id UUID PRIMARY KEY,
  project_id UUID REFERENCES projects,
  title VARCHAR(255),
  description TEXT,
  status VARCHAR(50), -- todo, in_progress, done
  assigned_to UUID REFERENCES auth.users,
  due_date DATE,
  created_at TIMESTAMP
);
```

---

## User Flows

### Onboarding
1. Sign up / Login (email or social)
2. Create family group (optional)
3. Invite family members (email invite link)
4. Choose which features to enable
5. Dashboard view

### Daily Usage
1. **Morning**: Check streaks, complete daily tasks, add reminders
2. **Shopping**: Add items to list, check off when bought
3. **Inventory**: Track pantry, get low-stock alerts
4. **Planning**: View roadmap, update project progress

---

## MVP Milestones

### Phase 1 (MVP)
- [ ] Auth & family setup
- [ ] Streaks feature (track, display, analytics)
- [ ] Shopping list (add, edit, check-off)
- [ ] Basic dashboard

### Phase 2
- [ ] Inventory management
- [ ] Reminders & notifications
- [ ] Real-time sync improvements

### Phase 3
- [ ] Roadmap/Projects
- [ ] Analytics dashboard
- [ ] Mobile app (React Native)

---

## Project Structure

```
ClearNest/
├── frontend/
│   ├── app/                    # Next.js app directory
│   │   ├── layout.tsx
│   │   ├── page.tsx            # Dashboard
│   │   ├── auth/               # Auth pages
│   │   ├── streaks/            # Streaks feature
│   │   ├── shopping/           # Shopping list
│   │   ├── inventory/          # Inventory
│   │   ├── reminders/          # Reminders
│   │   ├── roadmap/            # Roadmap/Projects
│   │   └── api/                # API routes
│   ├── components/             # Reusable components
│   │   ├── ui/                 # shadcn/ui components
│   │   ├── layout/
│   │   ├── streaks/
│   │   ├── shopping/
│   │   └── ...
│   ├── lib/                    # Utilities
│   │   ├── supabase.ts
│   │   ├── auth.ts
│   │   └── types.ts
│   ├── styles/                 # Tailwind CSS
│   ├── public/                 # Static assets
│   ├── package.json
│   └── tsconfig.json
│
├── supabase/
│   ├── migrations/             # SQL migrations
│   ├── seed.sql                # Initial data
│   └── config.toml             # Supabase config
│
├── docs/
│   ├── ARCHITECTURE.md
│   ├── API_DOCS.md
│   ├── SETUP.md
│   └── DEPLOYMENT.md
│
├── .github/
│   └── workflows/              # CI/CD
│
├── README.md
└── PROJECT_PLAN.md (this file)
```

---

## Setup Steps

1. **Initialize Next.js project**
2. **Set up Supabase project**
3. **Create database schema**
4. **Build authentication system**
5. **Develop core features** (Phase 1)
6. **Add real-time sync**
7. **Deploy to Vercel + Supabase**

---

## Success Metrics
- ✅ Easy family setup (< 5 minutes)
- ✅ Zero-lag real-time updates
- ✅ Mobile-responsive design
- ✅ Push notifications work reliably
- ✅ 90% feature completion in 4 weeks
