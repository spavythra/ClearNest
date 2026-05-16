import Link from "next/link"

export function Footer() {
  return (
    <footer className="border-t border-stone-200 dark:border-stone-800 bg-white/80 dark:bg-stone-950/80 backdrop-blur-sm mt-auto">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-bold text-stone-800 dark:text-stone-200 text-lg">ClearNest</span>
            <span className="text-stone-400 text-sm ml-2">
              &copy; {new Date().getFullYear()}
            </span>
          </div>
          <nav className="flex flex-wrap items-center gap-5 text-sm text-stone-500 dark:text-stone-400">
            <Link href="/streaks" className="hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors">
              Streaks
            </Link>
            <Link href="/shopping" className="hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors">
              Shopping
            </Link>
            <Link href="/food" className="hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors">
              Food Menu
            </Link>
            <Link href="/inventory" className="hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors">
              Inventory
            </Link>
            <Link href="/reminders" className="hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors">
              Reminders
            </Link>
            <Link href="/roadmap" className="hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors">
              Roadmap
            </Link>
          </nav>
          <p className="text-xs text-stone-400 dark:text-stone-500">
            Family organisation, thoughtfully designed
          </p>
        </div>
      </div>
    </footer>
  )
}
