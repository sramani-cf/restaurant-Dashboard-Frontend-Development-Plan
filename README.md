# Restaurant Management Dashboard

A comprehensive, modern restaurant management dashboard built with Next.js 15, TypeScript, and Tailwind CSS. This application provides real-time integration with POS systems, comprehensive analytics, and tools for managing all aspects of restaurant operations.

## Features

### Core Functionality
- **Real-time Dashboard**: KPI monitoring, live order tracking, and performance metrics
- **POS Integration**: Seamless integration with Toast and Square POS systems
- **Menu Management**: Complete CRUD operations for menu items, categories, and modifiers
- **Order Management**: Real-time order processing and tracking
- **Analytics & Reporting**: Comprehensive business intelligence and custom reports
- **Inventory Control**: Stock tracking, low-stock alerts, and supplier management
- **Reservations**: Table management and reservation system
- **Kitchen Display System (KDS)**: Digital kitchen order management
- **Staff Management**: Employee scheduling and role management
- **Customer Management**: Customer profiles and preferences tracking

### Technical Features
- **Server Components**: Optimized performance with Next.js 15 App Router
- **Type Safety**: Full TypeScript implementation
- **Real-time Updates**: WebSocket integration for live data
- **Mobile Responsive**: Progressive Web App (PWA) capabilities
- **Accessibility**: WCAG 2.1 AA compliant
- **Security**: OWASP compliance, input validation, and rate limiting
- **Performance**: Optimized bundle size, lazy loading, and caching strategies

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Headless UI, TanStack Table v8, Recharts
- **Database**: PostgreSQL with Prisma ORM
- **Caching**: Redis
- **Deployment**: Vercel/AWS/Docker
- **Testing**: Jest, React Testing Library, Playwright
- **Monitoring**: Sentry, Google Analytics

## Installation

1. Clone the repository:
```bash
git clone https://github.com/your-org/restaurant-dashboard.git
cd restaurant-dashboard
```

2. Install dependencies:
```bash
npm install --legacy-peer-deps
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

4. Configure your environment variables in `.env.local`

5. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## Available Scripts

```bash
npm run dev           # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm test             # Run unit tests
npm run test:e2e     # Run end-to-end tests
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript compiler
```

## Deployment

### Vercel
```bash
vercel --prod
```

### Docker
```bash
docker-compose up -d
```

## License

This project is proprietary and confidential.
