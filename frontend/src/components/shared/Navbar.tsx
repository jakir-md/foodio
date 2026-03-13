"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();
  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Food Menu", href: "/food-menu" },
    { name: "My Orders", href: "/my-orders" },
  ];
  return (
    <header className="absolute top-0 left-0 w-full z-50 flex justify-between items-center px-6 md:px-12 py-6 max-w-360 mx-auto right-0">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 bg-[#13322B] rounded-md rounded-tr-3xl flex items-center justify-center text-white font-bold text-xs">
          F
        </div>
        <span className="text-2xl font-bold text-[#13322B] font-serif tracking-tight">
          Foodio.
        </span>
      </div>

      <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
        {navLinks.map((link) => {
          const isActive = pathname === link.href;

          return (
            <Link
              key={link.name}
              href={link.href}
              className={
                isActive
                  ? "px-5 py-2.5 bg-[#F9F7F2] border border-[#13322B]/20 text-[#13322B] rounded-full transition-all"
                  : "px-5 py-2.5 text-gray-500 hover:text-[#13322B] transition-colors rounded-full"
              }
            >
              {link.name}
            </Link>
          );
        })}
      </nav>

      <div className="flex items-center gap-4">
        <button className="flex items-center gap-2 px-4 py-2.5 border border-[#13322B] text-[#13322B] rounded-full hover:bg-gray-50 transition-colors">
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
          <span className="font-semibold">2</span>
        </button>

        <Link
          href="/login"
          className="flex items-center gap-2 px-6 py-2.5 bg-[#13322B] text-white rounded-full hover:bg-[#1a453b] transition-colors shadow-lg shadow-[#13322B]/20"
        >
          Sign in
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M14 5l7 7m0 0l-7 7m7-7H3"
            />
          </svg>
        </Link>
      </div>
    </header>
  );
}
