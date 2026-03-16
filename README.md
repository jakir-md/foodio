# Foodio - Food Delivery Platform

Foodio is a full-stack food ordering and menu management platform. It features a seamless user experience for browsing and purchasing meals, alongside a robust admin dashboard for managing categories, menu items, and order statuses.

## 🌐 Live Links

- **Live Demo (Frontend):** [foodio-xi.vercel.app](https://foodio-xi.vercel.app)
- **Live API (Backend):** [foodio-jxlu.onrender.com](https://foodio-jxlu.onrender.com)

## 💻 Tech Stack

- **Frontend:** Next.js (App Router), React, Tailwind CSS, Zustand, Shadcn UI
- **Backend:** NestJS, TypeScript, Prisma ORM
- **Database:** PostgreSQL (hosted on Neon)
- **Authentication:** JWT & Bcrypt

---

## ✨ Core Technical Implementations

- **Modular UI Components:** Built highly reusable, isolated frontend components (like `TablePagination`, `SortingPopovers`, `ManagementTable`, and `DeleteConfirmationDialog`) that independently manage their own URL state and receive data via props.
- **URL-Driven Architecture:** Offloaded searching, sorting, and pagination to PostgreSQL using Next.js `searchParams` and `useTransition`, keeping the UI instantly responsive without full page reloads.
- **Secure Cart Calculations:** Enforced strict security by calculating cart totals exclusively on the NestJS backend using real database prices, preventing any malicious frontend manipulation.
- **Optimized Database Pagination:** Slashed database execution time in half by utilizing `Promise.all` to execute Prisma's `findMany` and `count` queries concurrently for lightning-fast API responses.
- **Protected UX Interceptors:** Created a seamless authentication flow that intercepts protected actions (like "Add to Cart") and triggers a state-preserving login modal instead of throwing jarring errors.
- **Dynamic Cache Management:** Strategically managed Next.js App Router caching using `force-dynamic` on routes relying on cookies and live parameters to guarantee users always see real-time data.
- **Automated Database Seeding:** Developed a comprehensive Prisma script (`npx prisma db seed`) that instantly populates the database with admin accounts, categories, and menu items for seamless local setup.
- **Graceful Error Boundaries:** Implemented a custom administrative dashboard navigation system and branded Next.js `not-found.tsx` boundary pages to gracefully handle routing errors and elevate the UX.

---

## 🚀 Engineering Roadmap (Future Improvements)

- **Soft Delete Architecture:** Implementing a strict soft delete pattern to preserve financial and historical data, preventing orphaned order records when administrative deletions occur.
- **Inventory & Concurrency Engine:** Tying frontend quantity selectors directly to backend inventory checks to prevent out-of-stock orders during high-traffic periods.
- **Event-Driven Processing:** Transitioning order processing to a RabbitMQ-backed event loop to decouple services and ensure zero-wait confirmation times for users.
- **Containerization:** Dockerizing both frontend and backend environments to guarantee complete parity between local development, staging, and production.
- **Advanced Security:** Integrating rate-limiting, Helmet.js, and strict CORS policies to harden the API against DDoS attacks and injection vulnerabilities.
- **Rendering Optimization:** Fine-tuning Next.js rendering strategies (SSR, SSG, CSR) to squeeze out maximum performance and SEO benefits.
- **Payment & Transaction Ledger:** Integrating SSLCommerz backed by a custom double-entry transaction ledger to maintain a mathematically perfect record of all platform revenue.
- **Form Architecture:** Migrating complex administrative interfaces to React Hook Form and Zod to eliminate unnecessary re-renders and enforce strict client-side validation.
- **UI/UX Polish:** Integrating Framer Motion for fluid micro-interactions and refining the global design system for a flawless mobile-first experience.

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

## 👨‍💻 Author

**Md Jakir Hossain** *Full Stack Engineer* 🎓 B.Sc. in Computer Science & Engineering, Jahangirnagar University

- **GitHub:** [@jakir-md](https://github.com/jakir-md)
- **LinkedIn:** [Md Jakir Hossain](https://www.linkedin.com/in/jakir-md)