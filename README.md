# TWS Sanity Starter

A modern monorepo starter template featuring React Router 7 and Sanity CMS for building content-driven web applications.

## Project Structure

- `/web` - React Router 7 frontend application
- `/studio` - Sanity CMS Studio for content management

## Quick Start

### Prerequisites

- Node.js 18+ and npm
- Sanity account and project

### Setup

1. Clone the repository:
```bash
git clone https://github.com/sethdavis512/tws-sanity-starter.git
cd tws-sanity-starter
```

2. Install dependencies for both apps:
```bash
# Web app
cd web && npm install

# Sanity Studio
cd ../studio && npm install
```

3. Configure environment variables:
```bash
# Copy example env files
cp web/.env.example web/.env
cp studio/.env.example studio/.env
```

Update the `.env` files with your Sanity project details:
- `VITE_SANITY_PROJECT_ID` - Your Sanity project ID
- `VITE_SANITY_DATASET` - Dataset name (usually "production")
- `SANITY_VIEWER_TOKEN` - Read token for preview mode
- `SESSION_SECRET` - Random string for session encryption

### Development

Start both applications in development mode:

```bash
# Terminal 1 - Web app
cd web && npm run dev

# Terminal 2 - Sanity Studio
cd studio && npm run dev
```

- Web app: http://localhost:5173
- Sanity Studio: http://localhost:3333

## Features

### React Router 7
- ✅ Config-based routing
- ✅ Server-side rendering (SSR)
- ✅ TypeScript with strict configuration
- ✅ Async loaders for data fetching
- ✅ Component props for loader data access

### Sanity CMS
- ✅ Visual editing with presentation tool
- ✅ Real-time preview capabilities
- ✅ Portable Text for rich content
- ✅ Optimized image delivery via CDN

### Content Features
- ✅ Blog post management
- ✅ Draft/published content states
- ✅ SEO-friendly URLs with slugs
- ✅ Image optimization and alt text

## Architecture

### Data Flow
1. Content is managed in Sanity Studio
2. React Router 7 app fetches data via async loaders
3. Real-time updates via `@sanity/react-loader`
4. Preview mode for draft content

### Key Dependencies
- React 19.1.0 with React Router 7.7.1
- Sanity v4.8.1 with visual editing tools
- Tailwind CSS v4.1.4
- TypeScript 5.8.3

## Commands

### Web Application
```bash
cd web
npm run dev        # Start development server
npm run build      # Build for production
npm run start      # Start production server
npm run typecheck  # Type check with React Router typegen
```

### Sanity Studio
```bash
cd studio
npm run dev        # Start development server
npm run build      # Build for production
npm run deploy     # Deploy to Sanity
```

## License

MIT