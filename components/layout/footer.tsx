import Link from "next/link"

export function Footer() {
  return (
    <footer className="border-t border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-950/80 backdrop-blur-sm mt-auto">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-xl">🏠</span>
            <span className="font-bold text-slate-800 dark:text-slate-200">ClearNest</span>
            <span className="text-slate-400 text-sm ml-2">
              &copy; {new Date().getFullYear()}
            </span>
          </div>
          <nav className="flex items-center gap-6 text-sm text-slate-600 dark:text-slate-400">
            <Link href="/streaks" className="hover:text-orange-600 dark:hover:text-orange-400 transition-colors">
              Streaks
            </Link>
            <Link href="/shopping" className="hover:text-orange-600 dark:hover:text-orange-400 transition-colors">
              Shopping
            </Link>
            <Link href="/inventory" className="hover:text-orange-600 dark:hover:text-orange-400 transition-colors">
              Inventory
            </Link>
            <Link href="/reminders" className="hover:text-orange-600 dark:hover:text-orange-400 transition-colors">
              Reminders
            </Link>
            <Link href="/roadmap" className="hover:text-orange-600 dark:hover:text-orange-400 transition-colors">
              Roadmap
            </Link>
          </nav>
          <p className="text-xs text-slate-400 dark:text-slate-500">
            Family organisation, beautifully designed
          </p>
        </div>
      </div>
    </footer>
  )
}
