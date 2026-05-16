# ClearNest – Feature Requirements

Last updated: May 2026

---

## Current State

The app is live at https://clear-nest.vercel.app. Core features are working end-to-end with Supabase auth and a PostgreSQL backend. The focus now is on real-time sync and API completeness.

---

## Auth and family management

- [x] Google OAuth login
- [x] Email / password signup and login
- [x] Guest mode (no account required to browse)
- [ ] Family group creation
- [ ] Invite members by email
- [ ] Activity log per member

---

## Kanban reminders board

- [x] Four columns: To Do, In Progress, Review, Done
- [x] Tasks with title, description, and priority level
- [x] Drag and drop on desktop
- [x] Assign tasks to family members
- [x] Due dates with overdue highlighting
- [x] Recurring tasks (daily, weekly, monthly)
- [ ] Task comments
- [ ] Quick filter: my tasks / overdue / by member

---

## Habit streaks

- [x] Create daily habits
- [x] Current streak counter
- [x] Longest streak record
- [ ] Mark streak complete for today (backend endpoint needed)
- [ ] Streak history chart
- [ ] Completion rate display

---

## Shopping list

- [x] Add items with quantity and unit
- [x] Category grouping
- [x] Check-off and delete items
- [x] Sticky items for recurring purchases
- [ ] Share specific list with a member
- [ ] Who-bought tracking
- [ ] Smart suggestions from history

---

## Food menu planner

- [x] Weekly view (Monday to Sunday)
- [x] Three meal slots per day: Breakfast, Lunch, Dinner
- [x] Inline editing with keyboard shortcuts
- [x] Persisted in localStorage (works without account)
- [ ] Save to Supabase when signed in
- [ ] Copy last week's plan as starting point

---

## Inventory

- [x] Add items with quantity and category
- [x] Low-stock threshold alerts
- [ ] Expiry date tracking
- [ ] Auto-add expiring items to shopping list
- [ ] Bulk import from CSV

---

## Roadmap / projects

- [ ] Create family projects with milestones
- [ ] Task breakdown per project
- [ ] Progress bar
- [ ] Deadline reminders

---

## Notifications

- [ ] In-app notification panel
- [ ] Email digest (daily or weekly)
- [ ] Browser push notifications
- [ ] Quiet hours setting

---

## Technical

**Stack:** Next.js 15, React 19, TypeScript, Tailwind CSS, Supabase (PostgreSQL + RLS + Realtime), Vercel

**Auth:** Supabase Google OAuth, email/password, guest mode via localStorage flag

**Design:** Nordic aesthetic — Playfair Display headings, Inter body, forest-green brand palette (#2d6a4f)

**Test coverage:** Jest + ts-jest, jsdom test environment. Tests for cn utility, Supabase client, and streaks data shape. Food utilities pending.

---

## API endpoints needed

```
GET    /api/streaks?family_id=
POST   /api/streaks
PATCH  /api/streaks/:id
DELETE /api/streaks/:id
POST   /api/streaks/:id/complete

GET    /api/shopping?family_id=
POST   /api/shopping
PATCH  /api/shopping/:id
DELETE /api/shopping/:id

GET    /api/inventory?family_id=
POST   /api/inventory
PATCH  /api/inventory/:id
DELETE /api/inventory/:id
GET    /api/inventory/low-stock

GET    /api/reminders?family_id=
POST   /api/reminders
PATCH  /api/reminders/:id
DELETE /api/reminders/:id
POST   /api/reminders/:id/move
```

---

## Known gaps

- Real-time Supabase subscriptions not yet wired to the frontend
- Food menu data not persisted to Supabase (localStorage only right now)
- Push notification service worker not set up
- Mobile testing not yet done on physical devices
