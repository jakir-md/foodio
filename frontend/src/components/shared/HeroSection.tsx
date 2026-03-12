import Link from "next/link";
import Image from "next/image";

export default function HeroSection() {
  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      <div className="absolute inset-0 z-0 flex">
        <div className="w-[55%] h-full bg-white"></div>
        <div className="w-[45%] h-full bg-[#FFF9F0]"></div>
      </div>

      <header className="absolute top-0 left-0 w-full z-50 flex justify-between items-center px-6 md:px-12 py-6 max-w-[1440px] mx-auto right-0">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-[#13322B] rounded-md rounded-tr-3xl flex items-center justify-center text-white font-bold text-xs">
            F
          </div>
          <span className="text-2xl font-bold text-[#13322B] font-serif tracking-tight">
            Foodio.
          </span>
        </div>

        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          <Link
            href="/"
            className="px-5 py-2.5 bg-[#F9F7F2] border border-[#13322B]/20 text-[#13322B] rounded-full"
          >
            Home
          </Link>
          <Link
            href="/menu"
            className="text-gray-500 hover:text-[#13322B] transition-colors"
          >
            Food Menu
          </Link>
          <Link
            href="/orders"
            className="text-gray-500 hover:text-[#13322B] transition-colors"
          >
            My Orders
          </Link>
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

      <main className="relative z-10 max-w-[1440px] mx-auto px-6 md:px-12 pt-40 pb-20 flex flex-col lg:flex-row items-center min-h-screen">
        <div className="w-full lg:w-[55%] pr-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#FFF9F0] text-sm text-[#13322B] font-medium rounded-md mb-8">
            <span className="text-emerald-600">🧾</span> Food Ordering Service
          </div>

          <h1 className="text-5xl md:text-7xl font-bold text-[#13322B] leading-[1.1] mb-6 tracking-tight">
            Where Great Food <br />
            Meets{" "}
            <span className="font-serif italic font-light">Great Taste.</span>
          </h1>

          <p className="text-gray-600 text-lg max-w-md mb-10 leading-relaxed">
            Experience a symphony of flavors crafted with passion. Premium
            ingredients, exquisite recipes, delivered to your door.
          </p>

          <button className="flex items-center gap-2 px-8 py-4 bg-[#13322B] text-white rounded-full font-medium hover:bg-[#1a453b] transition-all shadow-xl shadow-[#13322B]/20 hover:-translate-y-1">
            View Menu
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
          </button>
        </div>

        <div className="w-full lg:w-[45%] relative mt-16 lg:mt-0 flex justify-center">
          <div className="relative w-full max-w-[500px] aspect-square rounded-full shadow-2xl overflow-hidden bg-white/50 backdrop-blur-sm">
            <div className="w-full h-full rounded-full border-[20px] border-white overflow-hidden">
              <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-400 text-sm">
                [ Insert plate image here ]
              </div>
            </div>
          </div>

          <div className="absolute top-10 -right-8 md:-right-12 bg-white p-4 rounded-xl shadow-2xl flex items-center gap-4 animate-bounce-slow">
            <div className="w-12 h-12 bg-orange-50 rounded-lg flex items-center justify-center text-2xl">
              🔥
            </div>
            <div>
              <p className="text-xs text-gray-500 font-medium">Today's Offer</p>
              <p className="text-sm font-bold text-[#13322B]">Free Delivery</p>
            </div>
          </div>

          <div className="absolute bottom-10 -left-8 md:-left-12 bg-white p-4 rounded-xl shadow-2xl flex items-center gap-4">
            <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center text-xl">
              ⏱️
            </div>
            <div>
              <p className="text-xs text-gray-500 font-medium">Avg. Delivery</p>
              <p className="text-sm font-bold text-[#13322B]">22 Minutes</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
