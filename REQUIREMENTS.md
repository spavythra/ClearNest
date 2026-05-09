# REQUIREMENTS.md - Living Document
Last Updated: May 9, 2026

## Project: ClearNest - Family Maintenance Hub

---

## 📋 Current Status

### Phase 1: MVP (IN PROGRESS)
**Target Completion:** May 20, 2026

#### Completed
- [x] Project setup and configuration
- [x] Lavish Indian-style design system with scenic backgrounds
- [x] Gmail OAuth authentication (frontend ready)
- [x] Database schema with RLS policies
- [x] Streaks feature (basic UI)
- [x] Shopping list feature (basic UI)
- [x] Inventory management (basic UI)
- [x] Kanban board reminders system
- [x] Architecture documentation
- [x] Modular component structure

#### In Progress
- [ ] API endpoints refinement
- [ ] Real-time Supabase subscriptions
- [ ] Push notifications setup
- [ ] Vercel deployment configuration
- [ ] Gmail OAuth backend verification

#### Not Started
- [ ] Mobile responsive testing
- [ ] Performance optimization
- [ ] Error handling & edge cases
- [ ] Analytics integration

---

## 🎯 Feature Requirements

### 1. Authentication & Family Management
**Status:** In Progress

**Requirements:**
- [x] Gmail OAuth login
- [x] Email/password authentication
- [ ] Family group creation
- [ ] Invite family members via email
- [ ] Role-based access (Owner, Member)
- [ ] Activity log
- [ ] Session management

**API Endpoints Needed:**
```
POST /api/auth/login
POST /api/auth/signup
POST /api/families
POST /api/families/{id}/members/invite
GET /api/families/{id}/members
DELETE /api/families/{id}/members/{memberId}
```

---

### 2. Kanban Board / Reminders (kanban-style)
**Status:** In Progress

**Requirements:**
- [x] Four columns: To Do, In Progress, Review, Done
- [x] Create tasks with title, description, priority
- [x] Drag-drop reordering (frontend logic ready)
- [x] Assign tasks to family members
- [x] Due date tracking with overdue indicators
- [x] Priority levels (Low, Medium, High)
- [x] Recurring task support (Daily, Weekly, Monthly)
- [ ] Task comments/discussions
- [ ] Task attachments
- [ ] Bulk operations
- [ ] Quick filters (My tasks, Overdue, etc.)

**API Endpoints Needed:**
```
GET /api/reminders?family_id=xxx
POST /api/reminders
PATCH /api/reminders/{id}
DELETE /api/reminders/{id}
POST /api/reminders/{id}/move (move to column)
POST /api/reminders/{id}/complete
GET /api/reminders/family/{familyId}/overdue
```

---

### 3. Streaks Tracking
**Status:** UI Complete, Backend Pending

**Requirements:**
- [x] Create daily habits/streaks
- [x] Display current streak count
- [x] Longest streak tracking
- [x] Visual fire emoji indicator
- [ ] Mark streak complete for today
- [ ] Reset streak manually
- [ ] Analytics: completion rate, best time of day
- [ ] Streak history graph
- [ ] Social sharing (optional)
- [ ] Badge system

**API Endpoints Needed:**
```
GET /api/streaks?family_id=xxx
POST /api/streaks
PATCH /api/streaks/{id}
DELETE /api/streaks/{id}
POST /api/streaks/{id}/complete (mark today as complete)
GET /api/streaks/{id}/analytics
POST /api/streaks/{id}/logs (add manual log)
```

---

### 4. Shopping List
**Status:** UI Complete, Backend Pending

**Requirements:**
- [x] Add items with quantity and unit
- [x] Category organization (Groceries, Dairy, Spices, etc.)
- [x] Check-off completed items
- [x] Sticky items (recurring purchases)
- [x] Item deletion
- [ ] Share shopping list with specific members
- [ ] Mark items bought by specific person
- [ ] Price tracking (optional)
- [ ] Barcode scanning (future)
- [ ] Smart suggestions based on history
- [ ] Budget alerts

**API Endpoints Needed:**
```
GET /api/shopping?family_id=xxx
POST /api/shopping
PATCH /api/shopping/{id}
DELETE /api/shopping/{id}
POST /api/shopping/{id}/toggle-complete
GET /api/shopping/categories
```

---

### 5. Inventory Management
**Status:** UI Complete, Backend Pending

**Requirements:**
- [x] Track household items (food, supplies, cleaning products)
- [x] Quantity tracking
- [x] Low-stock alerts
- [x] Category organization
- [ ] Expiry date tracking
- [ ] Auto-add expired items to shopping list
- [ ] Replenishment reminders
- [ ] Usage history
- [ ] Bulk entry (import from CSV)
- [ ] Reorder points configuration

**API Endpoints Needed:**
```
GET /api/inventory?family_id=xxx
POST /api/inventory
PATCH /api/inventory/{id}
DELETE /api/inventory/{id}
GET /api/inventory/low-stock?family_id=xxx
GET /api/inventory/expiring?family_id=xxx&days=7
```

---

### 6. Roadmap / Projects (Future)
**Status:** Not Started

**Requirements:**
- [ ] Create family projects (renovations, planning, etc.)
- [ ] Task breakdown within projects
- [ ] Deadline tracking
- [ ] Progress visualization
- [ ] Budget tracking (optional)
- [ ] Milestone celebrations
- [ ] Project completion certificates

---

### 7. Notifications & Alerts
**Status:** Not Started

**Requirements:**
- [ ] Browser push notifications
- [ ] In-app notification center
- [ ] Email digest (daily/weekly)
- [ ] Sound alerts for urgent tasks
- [ ] Notification preferences per member
- [ ] Quiet hours (no notifications after X time)
- [ ] Smart notification timing

---

### 8. Analytics & Reporting
**Status:** Not Started

**Requirements:**
- [ ] Task completion rate
- [ ] Streak analytics
- [ ] Shopping spending trends
- [ ] Inventory usage patterns
- [ ] Family activity leaderboard
- [ ] Export reports (PDF, CSV)
- [ ] Custom date range queries

---

## 🏗️ Technical Requirements

### Backend Services (lib/services/)
- [ ] `ReminderService.ts` - Task CRUD and movement logic
- [ ] `StreakService.ts` - Streak completion, analytics
- [ ] `ShoppingService.ts` - Cart operations, sharing
- [ ] `InventoryService.ts` - Stock management
- [ ] `FamilyService.ts` - Family operations
- [ ] `NotificationService.ts` - Notification dispatch

### Custom Hooks (lib/hooks/)
- [x] `useReminders.ts` - State and CRUD for reminders
- [ ] `useStreaks.ts` - State and CRUD for streaks
- [ ] `useShopping.ts` - State and CRUD for shopping
- [ ] `useFamily.ts` - Family context
- [ ] `useAuth.ts` - Authentication state
- [ ] `useNotifications.ts` - Notification subscriptions

### Database Migrations
- [x] `001_initial_schema.sql` - Core schema
- [ ] `002_add_task_comments.sql` - Comments feature
- [ ] `003_add_notifications.sql` - Notification system
- [ ] `004_add_analytics_views.sql` - Materialized views

### Utilities (lib/utils/)
- [ ] `date.ts` - Date formatting, calculations
- [ ] `validation.ts` - Input validation
- [ ] `formatting.ts` - Number/currency formatting
- [ ] `notifications.ts` - Notification helpers

---

## 🎨 Design Requirements

### Color Palette ✅
- Primary: Saffron (#ff6b35)
- Secondary: Royal Purple (#6f4c93)
- Tertiary: Royal Blue (#0066cc)
- Accent: Gold (#ffd700)

### Typography ✅
- Headings: Playfair Display (serif)
- Body: Poppins (sans-serif)

### Components to Build
- [x] Card (luxe version with gradient border)
- [x] Button (golden, royal, peacock variants)
- [ ] Dropdown Menu
- [ ] Modal/Dialog
- [ ] Input Field (enhanced)
- [ ] Select Component
- [ ] Checkbox
- [ ] Radio Button
- [ ] Tabs
- [ ] Tooltip

---

## 📱 Responsive Design

### Breakpoints
- Mobile: 320px - 640px
- Tablet: 641px - 1024px
- Desktop: 1025px+

### Requirements
- [x] Mobile-first approach
- [ ] Touch-friendly interactions
- [ ] Optimized spacing for small screens
- [ ] Hamburger menu navigation
- [ ] Bottom sheet dialogs for mobile
- [ ] One-handed operation support

---

## 🔒 Security Requirements

### Authentication
- [x] JWT token handling
- [x] Secure password hashing
- [ ] 2FA support (future)
- [ ] Session timeout
- [ ] CSRF protection

### Data Protection
- [x] Row Level Security (RLS)
- [x] HTTPS enforcement
- [ ] Data encryption at rest
- [ ] Audit logging
- [ ] GDPR compliance
- [ ] Data backup strategy

### API Security
- [ ] Rate limiting
- [ ] Input validation
- [ ] CORS configuration
- [ ] API key rotation
- [ ] DDoS protection

---

## 📊 Performance Requirements

### Frontend
- [ ] Lighthouse score: 90+
- [ ] First Contentful Paint: < 1.5s
- [ ] Time to Interactive: < 3.5s
- [ ] Code splitting by feature
- [ ] Image optimization
- [ ] Lazy loading components

### Backend
- [ ] API response time: < 200ms
- [ ] Database query optimization
- [ ] Caching strategy
- [ ] Rate limiting

### Database
- [ ] Index strategy
- [ ] Partitioning by family_id
- [ ] Query optimization

---

## 🧪 Testing Requirements

### Unit Tests
- [ ] 80% code coverage
- [ ] Service layer tests
- [ ] Utility function tests
- [ ] Custom hook tests

### Integration Tests
- [ ] API endpoint tests
- [ ] Database operation tests
- [ ] Authentication flow tests

### E2E Tests
- [ ] User registration flow
- [ ] Task creation & movement
- [ ] Streak completion
- [ ] Family invitation

---

## 🚀 Deployment Requirements

### Pre-Deployment
- [ ] Environment variables configured
- [ ] Database migrations run
- [ ] RLS policies verified
- [ ] API endpoints tested
- [ ] Gmail OAuth configured
- [ ] Vercel secrets configured

### Deployment
- [ ] Automated CI/CD pipeline
- [ ] Blue-green deployment
- [ ] Database backup before deploy
- [ ] Health checks
- [ ] Error monitoring (Sentry)
- [ ] Performance monitoring (Vercel Analytics)

### Post-Deployment
- [ ] Smoke tests run
- [ ] User communication
- [ ] Monitoring setup
- [ ] Rollback plan ready

---

## 📈 Success Metrics

| Metric | Target | Current |
|--------|--------|---------|
| Page Load Time | < 2s | TBD |
| API Response | < 200ms | TBD |
| Uptime | 99.9% | TBD |
| User Retention | 70% | TBD |
| Task Completion | 60% | TBD |
| Bug-Free Sessions | 95% | TBD |

---

## 📅 Timeline

| Phase | Start | End | Status |
|-------|-------|-----|--------|
| MVP | May 6 | May 20 | 60% |
| Beta | May 20 | Jun 3 | 0% |
| Launch | Jun 3 | Jun 10 | 0% |
| Scale | Jun 10+ | - | 0% |

---

## ⚠️ Known Issues & Blockers

1. **Supabase Real-time Setup** - Need to configure Realtime subscriptions
2. **Gmail OAuth Verification** - Requires configuration
3. **Push Notifications** - Service Worker setup needed
4. **Mobile Testing** - Not yet tested on devices

---

## 🔄 Change Log

### May 9, 2026
- Added Kanban board reminders system
- Created architecture documentation
- Established modular component structure
- Defined API endpoints
- Updated requirements for all features

### May 6, 2026
- Initial project setup
- Database schema created
- Authentication pages designed
- Feature scaffolding

---

## 📝 Next Steps

1. [x] Create Kanban board UI
2. [ ] Build API endpoints (next priority)
3. [ ] Setup real-time subscriptions
4. [ ] Configure push notifications
5. [ ] Complete Vercel deployment
6. [ ] User testing & refinement

---

*This document is updated with every feature addition and should be reviewed before major commits.*
