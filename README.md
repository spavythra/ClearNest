# 🏠 ClearNest - Family Maintenance Hub

A beautiful, modular web application for families to manage daily tasks, maintain streaks, track shopping lists, manage inventory, and organize projects—all with a  interface.

[![Deploy to Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fspavythra%2FClearNest)

---

## ✨ Features

### 🎯 Kanban Board Reminders
- **Interface** with 4 columns: To Do, In Progress, Review, Done
- **Drag-drop task management** (desktop)
- **Priority levels** (Low, Medium, High) with color indicators
- **Task assignment** to family members
- **Due date tracking** with overdue alerts
- **Recurring tasks** (Daily, Weekly, Monthly)
- **Quick filters** for personal & overdue tasks

### 🔥 Daily Streaks
- Track habits with streak counters
- Visual fire emoji indicators
- Longest streak analytics
- Completion rate tracking
- Daily reset at customizable time

### 🛒 Smart Shopping List
- Category-based organization (Groceries, Dairy, Spices, etc.)
- Sticky items for recurring purchases
- Real-time check-off
- Family sharing with instant updates
- Quantity & unit tracking

### 📦 Inventory Management
- Track household items and supplies
- Low-stock alerts with visual warnings
- Expiry date tracking
- Automatic replenishment reminders
- Category-based organization

### 👨‍👩‍👧‍👦 Family Collaboration
- Invite family members via email
- Role-based access (Owner, Member)
- Assign tasks to specific members
- Activity logs
- Real-time sync across all devices

---

## 🛠️ Tech Stack

| Component | Technology |
|-----------|-----------|
| **Frontend** | Next.js 15, React 19, TypeScript |
| **Styling** | Tailwind CSS, Custom CSS (Lavish Indian Design) |
| **Authentication** | Supabase Auth (Google OAuth, Email/Password) |
| **Database** | PostgreSQL (Supabase) with RLS |
| **Real-time** | Supabase Realtime Subscriptions |
| **Backend API** | Next.js API Routes |
| **Deployment** | Vercel (Frontend + Serverless Functions) |
| **Icons & UI** | Lucide React, shadcn/ui patterns |

---

## 🎨 Design Highlights

### Lavish Indian-Inspired Aesthetic
- **Color Palette**: Saffron, Royal Purple, Royal Blue, 24K Gold
- **Typography**: Playfair Display (elegant serif) + Poppins (modern sans-serif)
- **Scenic Backgrounds**: Gradient overlays with mandala patterns
- **Animations**: Smooth floats, glows, and shimmer effects
- **Dark Mode**: Full support with preserved elegance

### Responsive & Accessible
- Mobile-first design
- Touch-friendly interactions
- Keyboard navigation support
- WCAG 2.1 AA compliance target

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm/yarn
- Supabase account (free tier works)
- GitHub account (for deployment)

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/spavythra/ClearNest.git
cd ClearNest
```

2. **Install dependencies**
```bash
npm install
# or
yarn install
```

3. **Setup environment variables**
```bash
cp .env.local.example .env.local
```

Add your Supabase credentials:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

4. **Setup Supabase Database**

Visit your Supabase dashboard and run the migration:
```sql
-- Copy contents of supabase/migrations/001_initial_schema.sql
-- Paste and run in your Supabase SQL editor
```

5. **Configure Gmail OAuth**

In Supabase Auth Settings:
1. Go to Authentication > Providers > Google
2. Add your Google OAuth credentials
3. Set authorized redirect URL: `http://localhost:3000/auth/callback`

6. **Start development server**
```bash
npm run dev
```

Open http://localhost:3000 in your browser.

---

## 📂 Project Structure

```
ClearNest/
├── app/
│   ├── (auth)/              # Authentication pages
│   │   ├── login/
│   │   ├── signup/
│   │   └── callback/
│   ├── reminders/           # Kanban board
│   ├── streaks/             # Daily habits
│   ├── shopping/            # Shopping list
│   ├── inventory/           # Inventory tracker
│   └── api/                 # API endpoints
├── components/
│   ├── ui/                  # Base components
│   ├── layout/              # Layout components
│   ├── reminders/           # Kanban-specific
│   └── shared/              # Shared components
├── lib/
│   ├── services/            # Business logic (upcoming)
│   ├── hooks/               # Custom hooks
│   ├── utils/               # Utility functions
│   ├── types.ts             # TypeScript types
│   └── supabase.ts          # DB client
├── styles/
│   └── globals.css          # Global styles + Indian design
├── supabase/
│   └── migrations/          # Database migrations
├── ARCHITECTURE.md          # System architecture
├── REQUIREMENTS.md          # Feature requirements (living doc)
├── PROJECT_PLAN.md          # Original project plan
└── README.md                # This file
```

---

## 📚 Documentation

- **[ARCHITECTURE.md](./ARCHITECTURE.md)** - System design, modular structure, tech stack details
- **[REQUIREMENTS.md](./REQUIREMENTS.md)** - Feature requirements, API endpoints, timeline (updated regularly)
- **[PROJECT_PLAN.md](./PROJECT_PLAN.md)** - Original planning document

---

## 🔐 Security

✅ **Row Level Security (RLS)** - Database-enforced access control
✅ **JWT Authentication** - Secure token-based auth
✅ **HTTPS Only** - All connections encrypted
✅ **Input Validation** - XSS & SQL injection protection
✅ **CORS Configured** - API endpoint protection

See [ARCHITECTURE.md](./ARCHITECTURE.md#-security) for detailed security practices.

---

## 📈 Performance

- **Lighthouse Score Target**: 90+
- **First Contentful Paint**: < 1.5s
- **API Response Time**: < 200ms
- **Code Splitting** - Feature-based lazy loading
- **Image Optimization** - Next.js Image component
- **Database Indexing** - Optimized queries

---

## 🧪 Testing

```bash
# Run tests (coming soon)
npm run test

# Run linting
npm run lint

# Type check
npm run type-check
```

---

## 🚀 Deployment

### Deploy to Vercel (Recommended)

1. Push code to GitHub
2. Import repository in Vercel dashboard
3. Set environment variables
4. Deploy!

```bash
# Or use Vercel CLI
npm i -g vercel
vercel
```

### Environment Variables for Production
```env
NEXT_PUBLIC_SUPABASE_URL=production_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=production_key
SUPABASE_SERVICE_ROLE_KEY=production_service_key
NEXT_PUBLIC_APP_URL=https://yourdomain.com
```

---

## 📱 Mobile Support

- Responsive design optimized for mobile
- Touch-friendly Kanban interface
- Bottom sheet dialogs for actions
- Mobile-optimized navigation
- One-handed operation support

Future: Native mobile app (React Native)

---

## 🎯 Roadmap

### Phase 1: MVP (Current)
- [x] Kanban board interface
- [x] Streaks tracking
- [x] Shopping list
- [x] Inventory management
- [ ] Real-time sync
- [ ] Push notifications
- [ ] Vercel deployment

### Phase 2: Enhancement
- [ ] Advanced analytics dashboard
- [ ] Task comments & discussions
- [ ] Mobile app (React Native)
- [ ] Advanced filtering & search
- [ ] Data export (PDF, CSV)

### Phase 3: Scale
- [ ] API for third-party integrations
- [ ] Business team features
- [ ] Multi-language support
- [ ] AI-powered recommendations

See [REQUIREMENTS.md](./REQUIREMENTS.md) for detailed timeline.

---

## 🤝 Contributing

Contributions welcome! Please:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 🐛 Issues & Support

Found a bug or have a suggestion?
- [Open an Issue](https://github.com/spavythra/ClearNest/issues)
- Check [Documentation](./ARCHITECTURE.md)
- Review [Requirements](./REQUIREMENTS.md)

---

## 📄 License

MIT License - see [LICENSE](./LICENSE) file for details

---

## 👨‍💻 Author

**Pavithra**
- GitHub: [@spavythra](https://github.com/spavythra)
- Email: developer@clearnest.app

---

## 🙏 Acknowledgments

- Supabase for excellent backend-as-a-service
- Vercel for seamless deployment
- Tailwind CSS for utility-first styling
- React community for amazing libraries

---

## 📊 Status

![Build](https://img.shields.io/badge/build-passing-brightgreen)
![Tests](https://img.shields.io/badge/tests-pending-yellow)
![License](https://img.shields.io/badge/license-MIT-blue)
![Version](https://img.shields.io/badge/version-0.1.0-brightgreen)

---

**Made with ❤️ for families who organize together, grow together.**
