# ClearNest - Project Architecture & Requirements

## Last Updated: May 9, 2026

---

## 📋 System Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                     CLIENT LAYER (Next.js)                   │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  Components (Reusable UI Components)                 │   │
│  │  - Kanban Board, Cards, Dialogs, Forms, etc         │   │
│  └──────────────────────────────────────────────────────┘   │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  Pages (Feature Pages)                               │   │
│  │  - /reminders, /streaks, /shopping, /inventory       │   │
│  └──────────────────────────────────────────────────────┘   │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  Hooks & State Management                            │   │
│  │  - useFamily(), useReminders(), useStreaks()        │   │
│  └──────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
                            ↓ (API)
┌─────────────────────────────────────────────────────────────┐
│              API LAYER (Next.js Route Handlers)              │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  /api/reminders   - CRUD operations                 │   │
│  │  /api/streaks     - Streak management               │   │
│  │  /api/shopping    - Shopping list operations        │   │
│  │  /api/inventory   - Inventory management            │   │
│  │  /api/families    - Family management               │   │
│  └──────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│        BUSINESS LOGIC LAYER (Services & Utilities)           │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  Services (lib/services/)                            │   │
│  │  - ReminderService                                   │   │
│  │  - StreakService                                     │   │
│  │  - ShoppingService                                   │   │
│  │  - InventoryService                                  │   │
│  │  - FamilyService                                     │   │
│  └──────────────────────────────────────────────────────┘   │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  Utilities (lib/utils/)                              │   │
│  │  - Date formatting, validation, etc                 │   │
│  └──────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│      DATA ACCESS LAYER (Supabase Client)                     │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  lib/supabase.ts - Database connections             │   │
│  │  Real-time subscriptions                             │   │
│  │  RLS policies enforcement                            │   │
│  └──────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│        STORAGE LAYER (PostgreSQL via Supabase)               │
│  ├─ families                                                 │
│  ├─ family_members                                           │
│  ├─ reminders (with columns, status)                        │
│  ├─ streaks                                                  │
│  ├─ shopping_items                                           │
│  └─ inventory_items                                          │
└─────────────────────────────────────────────────────────────┘
```

---

## 🏗️ Modular Structure

### Frontend Modules

```
app/
├── (auth)/                     # Auth module
│   ├── login/
│   ├── signup/
│   └── callback/
├── (main)/                     # Main app module
│   ├── layout.tsx              # Main layout
│   ├── page.tsx                # Dashboard
│   ├── reminders/              # Reminders module (kanban-style)
│   ├── streaks/                # Streaks module
│   ├── shopping/               # Shopping module
│   ├── inventory/              # Inventory module
│   └── settings/               # Settings module
└── api/                        # API routes
    ├── reminders/              # Reminder endpoints
    ├── streaks/                # Streak endpoints
    ├── shopping/               # Shopping endpoints
    ├── inventory/              # Inventory endpoints
    └── families/               # Family endpoints

components/
├── ui/                         # Base UI components
│   ├── button.tsx
│   ├── card.tsx
│   ├── dialog.tsx
│   └── ...
├── layout/                     # Layout components
│   ├── navbar.tsx
│   ├── sidebar.tsx
│   └── footer.tsx
├── reminders/                  # Reminder-specific components
│   ├── KanbanBoard.tsx
│   ├── Column.tsx
│   ├── TaskCard.tsx
│   └── TaskDialog.tsx
├── streaks/                    # Streak-specific components
│   ├── StreakCard.tsx
│   └── StreakStats.tsx
└── shared/                     # Shared components
    ├── EmptyState.tsx
    └── LoadingSpinner.tsx

lib/
├── services/                   # Business logic
│   ├── reminders.ts
│   ├── streaks.ts
│   ├── shopping.ts
│   ├── inventory.ts
│   └── families.ts
├── hooks/                      # Custom React hooks
│   ├── useReminders.ts
│   ├── useStreaks.ts
│   ├── useFamily.ts
│   └── useAuth.ts
├── utils/                      # Utilities
│   ├── date.ts
│   ├── validation.ts
│   └── formatting.ts
├── types.ts                    # Type definitions
├── supabase.ts                 # Supabase client
└── constants.ts                # App constants
```

---

## 📊 Database Schema

### Core Tables

#### `reminders` (Kanban Board Tasks)
```sql
CREATE TABLE reminders (
  id UUID PRIMARY KEY,
  family_id UUID REFERENCES families,
  title VARCHAR(255) NOT NULL,
  description TEXT,

  -- Kanban board columns
  column_id VARCHAR(50) NOT NULL,  -- 'todo', 'in-progress', 'review', 'done'
  column_order INT NOT NULL,       -- Order within column

  -- Task properties
  priority VARCHAR(20),             -- 'low', 'medium', 'high'
  due_date DATE,
  assigned_to UUID REFERENCES auth.users,

  -- Recurrence
  reminder_type VARCHAR(50),        -- 'one-time', 'daily', 'weekly', 'monthly'
  is_completed BOOLEAN DEFAULT FALSE,

  -- Tracking
  created_by UUID REFERENCES auth.users,
  created_at TIMESTAMP WITH TIME ZONE,
  updated_at TIMESTAMP WITH TIME ZONE
);
```

#### `streaks`
```sql
CREATE TABLE streaks (
  id UUID PRIMARY KEY,
  family_id UUID REFERENCES families,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  daily_reset_hour INT DEFAULT 0,
  created_by UUID REFERENCES auth.users,
  created_at TIMESTAMP WITH TIME ZONE,
  updated_at TIMESTAMP WITH TIME ZONE
);
```

---

## 🎯 Key Features

### 1. **Kanban Board (Reminders/Tasks)**
- **Columns**: Todo, In Progress, Review, Done
- **Quick Actions**: Drag-drop, edit, delete, assign
- **Real-time Updates**: Supabase subscriptions
- **Priority Colors**: Visual indicators
- **Due Dates**: Calendar integration
- **Assignees**: Family member assignment

### 2. **Streaks Tracking**
- Daily habit tracking with fire emoji
- Longest streak analytics
- Current streak counter
- Visual progress bars

### 3. **Shopping List**
- Category-based organization
- Sticky items (recurring)
- Check-off functionality
- Quantity tracking

### 4. **Inventory Management**
- Low-stock alerts
- Expiry date tracking
- Replenishment recommendations
- Category organization

### 5. **Family Management**
- Invite members via email
- Role-based access (Owner, Member)
- Activity logs
- Member dashboard

---

## 📱 Quick Access Features

### Mobile Optimization
- Touch-friendly kanban board
- Quick action buttons
- Bottom sheet dialogs
- Swipe-to-delete

### Real-time Notifications
- Browser push notifications
- Sound alerts for urgent tasks
- Email digest (daily/weekly)
- In-app notification center

### Quick Actions (Floating Action Menu)
```
┌─────────────────────┐
│   Quick Actions     │
├─────────────────────┤
│ + Add Reminder      │
│ + Add Streak        │
│ + Add Shopping Item │
│ + Complete Streak   │
└─────────────────────┘
```

---

## 🔄 Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Next.js 15, React 19, TypeScript |
| Styling | Tailwind CSS, Custom CSS |
| State | React Hooks, SWR |
| Real-time | Supabase Realtime |
| Backend | Next.js API Routes |
| Database | PostgreSQL (Supabase) |
| Auth | Supabase Auth (Google OAuth) |
| Deployment | Vercel |
| Testing | Jest, React Testing Library |

---

## 🚀 Scalability Strategy

### Database Optimization
- Indexed columns for fast queries
- Partitioning by family_id
- Materialized views for analytics
- Connection pooling

### Frontend Performance
- Code splitting by feature
- Lazy loading components
- Image optimization
- Service worker for offline support

### API Efficiency
- Request batching
- Caching strategies
- Rate limiting
- Pagination for large datasets

---

## 📈 Requirements (Living Document)

### Phase 1: MVP (Weeks 1-2)
- [x] User authentication (Gmail)
- [x] Lavish Indian-style UI
- [x] Kanban board interface
- [x] Streaks basic functionality
- [x] Shopping list basic
- [x] Inventory basic
- [ ] Deploy to Vercel

### Phase 2: Enhancement (Weeks 3-4)
- [ ] Real-time sync across users
- [ ] Push notifications
- [ ] Advanced analytics
- [ ] Mobile app (React Native)
- [ ] Dark mode complete
- [ ] Offline support

### Phase 3: Scale (Weeks 5-6)
- [ ] Analytics dashboard
- [ ] Export features (PDF, CSV)
- [ ] API for third-party integrations
- [ ] Advanced family roles
- [ ] Data backup & sync
- [ ] Performance optimization

---

## 🔐 Security

- Row Level Security (RLS) enabled
- JWT tokens for API auth
- HTTPS only
- Rate limiting on endpoints
- Input validation & sanitization
- CORS configured properly
- Secure password hashing

---

## 📝 Deployment Checklist

- [ ] Environment variables configured
- [ ] Database migrations applied
- [ ] RLS policies verified
- [ ] API endpoints tested
- [ ] Gmail OAuth configured
- [ ] Vercel project setup
- [ ] Domain configured
- [ ] CI/CD pipeline ready
- [ ] Error monitoring setup
- [ ] Analytics tracking

---

## 📞 Support & Maintenance

- Regular security updates
- Database backups (daily)
- Performance monitoring
- User feedback integration
- Bug fix priority: Critical > High > Medium > Low

---

*This document is updated with every major feature addition or architectural change.*
