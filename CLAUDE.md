# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Structure

This is a monorepo with two main applications:
- `/web` - React Router 7 frontend application
- `/studio` - Sanity CMS Studio for content management

## Development Commands

### Web Application (React Router 7)
Run from `/web` directory:
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run typecheck` - Type check with React Router typegen

### Sanity Studio
Run from `/studio` directory:
- `npm run dev` - Start Sanity Studio development server
- `npm run build` - Build Studio for production
- `npm run deploy` - Deploy Studio to Sanity

## Architecture

### React Router 7 Configuration
- Uses **config-based routing** in `web/app/routes.ts`
- SSR enabled by default
- Async `loader` functions for data fetching (no `useLoaderData` hooks)
- Data accessed via component props: `export default function MyComponent({ loaderData }: Route.ComponentProps)`
- Preview mode API routes for draft content

### Sanity Integration
- Project ID: `cx445xzd`
- Dataset: `production`
- Visual editing enabled with presentation tool
- Real-time preview capabilities via `@sanity/react-loader`
- Environment variables required:
  - `VITE_SANITY_PROJECT_ID`
  - `VITE_SANITY_DATASET`
  - `VITE_SANITY_STUDIO_URL`
  - `SANITY_VIEWER_TOKEN` (server-side)
  - `SESSION_SECRET` (preview sessions)

### Key Dependencies
- React 19.1.0 with React Router 7.7.1
- Sanity v4.8.1 with visual editing tools
- Tailwind CSS v4.1.4 with Vite plugin
- TypeScript 5.8.3 with strict configuration

### Route Structure
- `/` - Home page listing posts
- `/:slug` - Individual post pages
- `/api/preview-mode/enable` - Enable draft previews
- `/api/preview-mode/disable` - Disable draft previews

## Content Schema

Posts have the following structure:
- `title` - String
- `slug` - Unique identifier for URLs
- `publishedAt` - Date field
- `image` - Sanity image with alt text
- `body` - Rich text content (Portable Text)

## Development Notes

- Follow React Router 7 patterns with async loaders and component props
- Use Sanity's `@sanity/react-loader` for data fetching with live updates
- Images are optimized through Sanity's CDN using `@sanity/image-url`
- Rich text rendering via `@portabletext/react`