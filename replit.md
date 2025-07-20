# Replit.md

## Overview

This is a full-stack TypeScript application built with React frontend and Express backend, designed as a brand management portal for the "Fruitful Global" ecosystem. The application provides a dashboard interface for managing sectors, brands, and their associated metadata across various technology platforms including VaultMesh™, HotStack, and FAA.ZONE™.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

The application follows a monorepo structure with clear separation between client, server, and shared components:

- **Frontend**: React with TypeScript, using Vite for build tooling
- **Backend**: Express.js with TypeScript for API layer
- **Database**: PostgreSQL with Drizzle ORM for data persistence
- **Styling**: Tailwind CSS with shadcn/ui component library
- **State Management**: TanStack Query for server state management

## Key Components

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite with hot module replacement
- **UI Components**: shadcn/ui built on Radix UI primitives
- **Styling**: Tailwind CSS with CSS variables for theming
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: TanStack React Query for server state

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Database ORM**: Drizzle with PostgreSQL
- **API Design**: RESTful endpoints with JSON responses
- **Session Management**: Express sessions (configured for PostgreSQL storage)
- **Environment**: Development/production modes with appropriate middleware

### Database Schema
The application uses four main entities:
- **Users**: Authentication and user management
- **Sectors**: Business sector categorization (33 sectors total)
- **Brands**: Brand entities with metadata (6,005+ brand elements)
- **System Status**: Service health monitoring

Key relationships:
- Brands belong to sectors (one-to-many)
- Brands can have parent/child relationships for subnodes
- Flexible JSON metadata storage for additional brand properties

## Data Flow

1. **Client Requests**: React components make API calls through TanStack Query
2. **API Layer**: Express routes handle HTTP requests and validation
3. **Data Access**: Storage layer (currently in-memory, configured for PostgreSQL)
4. **Response**: JSON data flows back through the query system to React components

The application supports:
- Search functionality across brands
- Sector-based filtering
- Real-time system status monitoring
- Theme switching (light/dark/hyper modes)

## External Dependencies

### Core Dependencies
- **Database**: Neon PostgreSQL (serverless)
- **UI Framework**: Radix UI primitives for accessibility
- **Validation**: Zod for schema validation
- **Build Tools**: Vite, esbuild for production builds

### Development Dependencies
- **TypeScript**: Full type safety across the stack
- **ESLint/Prettier**: Code quality and formatting
- **Replit Integration**: Development environment optimizations

## Deployment Strategy

The application is configured for multiple deployment scenarios:

### Development
- Vite dev server with HMR
- Express API server with auto-reload
- Database migrations via Drizzle Kit

### Production
- **Frontend**: Vite build output served as static files
- **Backend**: Bundled Express server with esbuild
- **Database**: PostgreSQL with connection pooling
- **Environment**: NODE_ENV-based configuration switching

### Database Management
- **Migrations**: Drizzle Kit for schema management
- **Schema**: Shared TypeScript definitions between client/server
- **Connection**: Environment-based DATABASE_URL configuration

The application architecture supports horizontal scaling and can be deployed to various platforms including Replit, Vercel, or traditional hosting providers.