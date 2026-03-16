import Image from "next/image";
import Link from "next/link";

export default function HeroSection() {
  return (
    <div className="relative min-h-90vh w-full overflow-hidden">
      <div className="absolute inset-0 z-0 flex">
        <div className="w-[55%] h-full bg-white"></div>
        <div className="w-[45%] h-[90%] rounded-bl-[35%] bg-[#FFF9F0]"></div>
      </div>

      <main className="relative z-10 max-w-360 mx-auto px-6 md:px-12 pt-30 pb-20 flex flex-col lg:flex-row items-center min-h-screen">
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

          <Link
            href={"/food-menu"}
            className="flex w-45 items-center gap-2 px-8 py-4 bg-[#13322B] text-white rounded-full font-medium hover:bg-[#1a453b] transition-all shadow-xl shadow-[#13322B]/20 hover:-translate-y-1"
          >
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
          </Link>
        </div>

        <div className="w-full lg:w-[45%] relative lg:mt-0 flex justify-center">
          <div className="absolute right-25 -bottom-55">
            <img
              src="https://i.ibb.co.com/nq0V91mT/image-11.png"
              alt="Plate Image"
              height={400}
              width={400}
            />
          </div>
          <div className="absolute -top-40 -right-18 md:-right-1 bg-white p-4 rounded-xl shadow-2xl flex items-center gap-4 animate-bounce-slow">
            <div className="w-12 h-12 bg-orange-50 rounded-lg flex items-center justify-center text-2xl">
              🔥
            </div>
            <div>
              <p className="text-xs text-gray-500 font-medium">Today's Offer</p>
              <p className="text-sm font-bold text-[#13322B]">Free Delivery</p>
            </div>
          </div>

          <div className="absolute -bottom-50 -left-8 md:-left-12 bg-white p-4 rounded-xl shadow-2xl flex items-center gap-4">
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
