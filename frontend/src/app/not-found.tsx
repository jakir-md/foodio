import Link from "next/link";
import { UtensilsCrossed, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <main className="min-h-[80vh] flex flex-col items-center justify-center px-6 text-center bg-[#FAFAF9]">
      <div className="w-24 h-24 bg-[#13322B]/10 rounded-full flex items-center justify-center mb-8">
        <UtensilsCrossed className="w-12 h-12 text-[#13322B]" />
      </div>
      <h1 className="text-4xl md:text-5xl font-bold text-[#13322B] font-serif mb-4">
        Oops! Page not found
      </h1>
      <p className="text-gray-500 max-w-md mx-auto mb-10 text-lg">
        Looks like this page is off the menu. The link might be broken, or the
        page may have been moved.
      </p>

      <div className="flex flex-col sm:flex-row items-center gap-4">
        <Link
          href="/"
          className="flex items-center justify-center gap-2 bg-[#13322B] text-white px-8 py-3 rounded-full font-medium hover:bg-[#1a453b] transition-colors w-full sm:w-auto"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>

        <Link
          href="/food-menu"
          className="flex items-center justify-center px-8 py-3 rounded-full font-medium text-[#13322B] bg-white border border-gray-200 hover:bg-gray-50 transition-colors w-full sm:w-auto"
        >
          View Menu
        </Link>
      </div>
    </main>
  );
}
