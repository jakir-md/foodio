"use client";

import Link from "next/link";

export default function AuthNavbar() {
  return (
    <header className="absolute top-0 left-0 w-full z-50 flex justify-between items-center px-6 md:px-12 py-6 max-w-360 mx-auto right-0">
      <div className="flex items-center gap-2">
        <Link href={"/"} className="flex items-center justify-between gap-3">
          <div className="w-8 h-8 bg-[#13322B] rounded-md rounded-tr-3xl flex items-center justify-center text-white font-bold text-xs">
            F
          </div>
          <span className="text-2xl font-bold text-[#13322B] font-serif tracking-tight">
            Foodio.
          </span>
        </Link>
      </div>
    </header>
  );
}
