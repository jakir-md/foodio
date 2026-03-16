# Foodio - Premium Food Delivery Platform

Foodio is a full-stack food ordering and menu management platform. It features a seamless user experience for browsing and purchasing meals, alongside a robust admin dashboard for managing categories, menu items, and order statuses.

**Live Demo:** [Backend: (https://foodio-jxlu.onrender.com)]
**Live API:** [Frontend: (https://foodio-xi.vercel.app)]

## Tech Stack
- **Frontend:** Next.js (App Router), React, Tailwind CSS, Zustand (State Management), Shadcn UI
- **Backend:** NestJS, TypeScript, Prisma ORM
- **Database:** PostgreSQL (hosted on Neon)
- **Authentication:** JWT & Bcrypt
---

## 🛠️ Local Setup & Installation

This project is structured as a monorepo. You will need to run two separate terminal instances to start both the backend and frontend.

### Prerequisites
- Node.js (v18+)
- PostgreSQL database (or a free Neon DB URI)

# 1. Clone The Repository
```bash
git clone https://github.com/jakir-md/foodio.git
```
# 2. Backend Setup
 - Navigate to the backend directory:
```bash
cd backend
```
 - Intall Dependencies:
```bash
npm install
```
 - Create a .env file in the root backend folder resembles the .env.example. And then paste the env credentials for the backend given in the email.
 - Sync the database schema and generate the Prisma Client
```bash
npx prisma migrate dev
npx prisma generate
npx prisma db seed
```
 - Run the Server
```bash
npm run start:dev
```

# 3. Frontend Setup
 - Navigate to the frontend directory:
```bash
cd frontend
```
 - Intall Dependencies:
```bash
npm install
```
 - Create a .env file in the root frontend folder resembles the .env.example. And then paste the env credentials for the frontend given in the email.
 - Start the frontend development server
```bash
npm run dev
```