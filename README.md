# The Editorial — Full-Stack Blog

A complete editorial-style blog built with Next.js App Router, React, TypeScript, server API routes, and a lightweight JSON data store.

## Features

- Editorial / magazine-inspired responsive UI
- Featured story and archive grid
- Search and category filtering
- Individual article pages
- Full-stack GET, POST, and DELETE blog APIs
- Simple publishing desk at /admin
- Placeholder content and no external database required
- Local JSON persistence in data/posts.json

## Run locally

npm install
npm run dev

Open http://localhost:3000.

## API

- GET /api/posts — list posts
- GET /api/posts?q=design — search posts
- GET /api/posts?category=Technology — filter by category
- POST /api/posts — publish a post
- DELETE /api/posts/:id — remove a post

The JSON store is intended for local/demo use. For production deployment, replace lib/posts.ts with a persistent database adapter such as Postgres or Supabase.

## Project structure

app/api/posts/       server API
app/blog/[slug]/     article route
app/admin/           publishing desk
components/          reusable UI
data/posts.json      placeholder content
lib/posts.ts         data access layer
