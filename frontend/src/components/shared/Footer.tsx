import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full bg-white border-t border-gray-100 py-6 px-6 md:px-12">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-3">
          <span className="text-xl font-bold text-emerald-900 font-serif tracking-tight">
            Foodio.
          </span>
          <span className="text-sm text-gray-400">
            © {new Date().getFullYear()} Foodio Inc.
          </span>
        </div>

        <nav className="flex items-center gap-8 text-sm text-gray-500">
          <Link
            href="/privacy"
            className="hover:text-emerald-900 transition-colors"
          >
            Privacy
          </Link>
          <Link
            href="/terms"
            className="hover:text-emerald-900 transition-colors"
          >
            Terms
          </Link>
          <Link
            href="/contact"
            className="hover:text-emerald-900 transition-colors"
          >
            Contact
          </Link>
        </nav>
      </div>
    </footer>
  );
}
