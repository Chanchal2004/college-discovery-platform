# College Navigator

A full-stack college discovery and comparison platform where students can search colleges, apply filters, compare institutions side-by-side, and save favorites after authentication.

## Live Demo

- Frontend: https://college-navigator-psi.vercel.app

## Core Features

- Search colleges by name with debounced input
- Filter by location, fee range, and course
- Sort by rating, fees, placement, or name
- Paginated college listing
- College detail pages with courses, placements, and reviews
- Compare 2-3 colleges side by side
- User authentication (register/login with JWT)
- Save/unsave colleges
- Save and manage comparison sets

## Tech Stack

### Client
- Next.js (App Router)
- React
- TypeScript
- Tailwind CSS

### Server
- Node.js
- Express
- TypeScript
- PostgreSQL
- JWT authentication

## Repository Structure

```text
college finder/
  client/   # Next.js frontend
  server/   # Express + PostgreSQL backend
```

## Local Development Setup

## 1) Prerequisites

- Node.js 18+
- npm
- PostgreSQL database

## 2) Clone and Install

```bash
git clone <your-repo-url>
cd "college finder"

cd client
npm install

cd ../server
npm install
```

## 3) Configure Environment Variables

### Server: `server/.env`

```env
DATABASE_URL=postgresql://<user>:<password>@<host>/<database>
JWT_SECRET=your-random-secret-key
PORT=5000
CORS_ORIGIN=http://localhost:3000
NODE_ENV=development
```

### Client: `client/.env.local`

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

## 4) Run the App

Open two terminals.

### Start backend

```bash
cd server
npm run dev
```

### Start frontend

```bash
cd client
npm run dev
```

Then open http://localhost:3000.

## Production Notes

- Frontend is deployed on Vercel:
  - https://college-navigator-psi.vercel.app
- Set `CORS_ORIGIN` on the backend to your deployed frontend URL.
- Set `NEXT_PUBLIC_API_URL` on the frontend to your deployed backend API URL.

## API Overview

Base URL (local): `http://localhost:5000/api`

- Auth
  - `POST /auth/register`
  - `POST /auth/login`
- Colleges
  - `GET /colleges`
  - `GET /colleges/filters`
  - `GET /colleges/:id`
  - `POST /colleges/compare`
- Saved (requires auth)
  - `GET /saved/colleges`
  - `POST /saved/colleges/:collegeId`
  - `GET /saved/comparisons`
  - `POST /saved/comparisons`
  - `DELETE /saved/comparisons/:id`

## Health Check

- `GET /api/health`

## License

This project is for educational and portfolio use.
