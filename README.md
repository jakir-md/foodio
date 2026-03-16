# Foodio - Premium Food Delivery Platform

Foodio is a full-stack food ordering and menu management platform. It features a seamless user experience for browsing and purchasing meals, alongside a robust admin dashboard for managing categories, menu items, and order statuses.

## 🌐 Live Links

- **Live Demo (Frontend):** [foodio-xi.vercel.app](https://foodio-xi.vercel.app)
- **Live API (Backend):** [foodio-jxlu.onrender.com](https://foodio-jxlu.onrender.com)

## Tech Stack

- **Frontend:** Next.js (App Router), React, Tailwind CSS, Zustand (State Management), Shadcn UI
- **Backend:** NestJS, TypeScript, Prisma ORM
- **Database:** PostgreSQL (hosted on Neon)
- **Authentication:** JWT & Bcrypt

---

## Core Technical Implementations

- `Modular UI Components:` Built highly reusable, isolated frontend components (like `TablePagination`, `SortingPopovers`, `ManagementTable`, `DeleteConfirmationDialog` and many more) that independently manage their own URL state and receive data via props.

- `URL-Driven Architecture:` Offloaded searching, sorting, and pagination to PostgreSQL using Next.js `searchParams` and `useTransition`, keeping the UI instantly responsive without full page reloads.

- `Secure Cart Calculations:` Enforced strict security by calculating cart totals exclusively on the NestJS backend using real database prices, preventing any malicious frontend manipulation.

- `Optimized Database Pagination:` Slashed database execution time in half by utilizing Promise.all to execute Prisma's findMany and count queries concurrently for lightning-fast API responses.

- `Protected UX Interceptors:` Created a seamless authentication flow that intercepts protected actions (like "Add to Cart") and triggers a state-preserving login modal instead of throwing jarring errors.

- `Dynamic Cache Management:` Strategically managed Next.js App Router caching using force-dynamic on routes relying on cookies and live parameters to guarantee users always see real-time data.

- `Automated Database Seeding:` Developed a comprehensive Prisma script (npx prisma db seed) that instantly populates the database with admin accounts, categories, and menu items for seamless local setup.

- `Graceful Error Boundaries:` Implemented a custom administrative dashboard navigation system and branded Next.js not-found.tsx boundary pages to gracefully handle routing errors and elevate the UX.

## Future Improvements

- I want to implement a strict Soft Delete pattern for our database. Right now, if an admin deletes a menu item, we risk orphaning old order records. Soft deleting will protect our financial and historical data.

- My next major feature is an Inventory and Concurrency engine. I plan to add stock limits so the frontend quantity selector is directly tied to a backend inventory check, preventing users from ordering out-of-stock items during high-traffic periods.

- Highly curious about implementing `event-driven architecture` using `rabbitmq` to make order processing lifecycle more efficient so that user should not wait seconds for getting confirmation.

- Want to use `docker for containerization`. Work on my machine problem get solved.

- For security I want to use `ratelimiting`, `helmetjs` and other steps to save my website from ddos attack and sql injection.

- More precise `ssr`, `ssg` and `csr` can be used for lightening fast delivery.

- To make the platform commercially viable, I am mapping out an SSLCommerz integration backed by a custom Transaction Ledger in the database to ensure we have a mathematically perfect record of all money entering the platform.

- On the frontend, I want to migrate all complex admin forms to React Hook Form. This will drastically reduce re-renders during text input and allow me to implement complex validation schemas before the data ever hits my NestJS API.

- There is still many UI/UX related issues, these will be resolved in the next upgrade. Also I want to use `framer motion or Gsap` for animation related UI improvements.

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
- Sync the database schema and generate the Prisma Client.
- Use seed command to seed your db.

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