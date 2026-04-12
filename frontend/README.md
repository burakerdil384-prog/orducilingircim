# Ordu Çilingir Website

Full-stack Next.js application for a locksmith business with PostgreSQL, Redis, and SEO optimization.

## Tech Stack

- **Next.js 16.2.3** (App Router, Turbopack)
- **TypeScript** + **TailwindCSS v4**
- **Prisma 7** with PostgreSQL adapter
- **Redis** (ioredis) for caching
- **JWT Auth** (jose + bcryptjs)
- **Material Design 3** color system

## Prerequisites

Before running the project, ensure you have:

- **Node.js 20+** installed
- **PostgreSQL** running on `localhost:5432` (or update `.env`)
- **Redis** running on `localhost:6379` (or update `.env`)

## Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment

Check `.env` file and update if needed:

```bash
DATABASE_URL="postgresql://postgres:password@localhost:5432/ordu_cilingir?schema=public"
REDIS_URL="redis://localhost:6379"
JWT_SECRET="your-secure-secret-here"
```

### 3. Setup Database

```bash
# Push schema to database
npm run db:push

# Generate Prisma client
npm run db:generate

# Seed initial data (services, locations, blog posts, admin)
npm run db:seed
```

**Default Admin Credentials:**
- Email: `admin@altinorducilingircim.com.tr`
- Password: `admin123`

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the result.

## Project Structure

```
src/
├── app/
│   ├── layout.tsx              # Root layout (TR lang, fonts, MD3 theme)
│   ├── page.tsx                # Homepage
│   ├── services/[slug]/        # Service detail pages
│   ├── locations/[district]/[neighborhood]/  # Location SEO pages
│   ├── blog/                   # Blog listing & detail
│   ├── admin/                  # Admin panel (auth required)
│   ├── robots.ts               # Dynamic robots.txt
│   └── sitemap.ts              # Dynamic sitemap
├── components/
│   ├── seo/json-ld.tsx         # JSON-LD schema injection
│   ├── ui/                     # Reusable UI components
│   ├── layout/                 # Header, Footer, etc.
│   └── sections/               # Page sections (Hero, Services, etc.)
├── lib/
│   ├── db.ts                   # Prisma client (PG adapter)
│   ├── redis.ts                # Redis client + caching helpers
│   ├── auth.ts                 # JWT authentication
│   ├── utils.ts                # Site config, slugify, formatDate
│   └── seo/                    # Schema.org generators
└── generated/prisma/           # Prisma generated client

prisma/
├── schema.prisma               # Database models
└── seed.ts                     # Seed data
```

## Database Models

- **Post** - Blog posts with slug, content, category
- **Service** - Services with FAQs, pricing
- **Location** - Districts/neighborhoods for local SEO
- **Admin** - Admin users with hashed passwords

## Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint

npm run db:generate  # Generate Prisma client
npm run db:push      # Push schema to database (no migrations)
npm run db:migrate   # Create and run migration
npm run db:seed      # Seed database with initial data
npm run db:studio    # Open Prisma Studio GUI
```

## Features

### SEO Optimization
- Dynamic `sitemap.xml` and `robots.txt`
- Meta tags with `generatePageMetadata()`
- Schema.org JSON-LD (LocalBusiness, Service, FAQ, Article, Breadcrumb)
- Turkish language optimization

### Caching Strategy
- Blog posts: 5 minutes TTL
- Services: 30 minutes TTL
- Location pages: 1 hour TTL
- Automatic cache invalidation helpers

### Material Design 3
- Custom MD3 color tokens in `globals.css`
- Primary: `#112737` (dark blue)
- Secondary: `#a93700` (orange)
- Fonts: Manrope (headlines), Inter (body)
- Material Symbols Outlined icons

## Development Notes

### Prisma 7
- Uses `@prisma/adapter-pg` driver adapter
- No `url` in `schema.prisma` (datasource only has `provider`)
- `prisma.config.ts` holds `DATABASE_URL` for migrations
- Import from `@/generated/prisma/client` NOT `@/generated/prisma`

### Redis
- Optional - app works without Redis (falls back to no caching)
- Use `getCached()` helper for automatic cache/fallback
- Use `invalidateCache(pattern)` to clear cache

## Next Steps (Pending Implementation)

- [ ] Step 2: Extract HTML → React components
- [ ] Step 3: Complete all page layouts (Homepage, Services, Blog, Admin)
- [ ] Step 4: API routes / Server Actions for admin panel
- [ ] Step 5: Authentication middleware
- [ ] Step 6: Production deployment (NGINX config)

## License

Proprietary - Ordu Çilingir
