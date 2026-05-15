import { Link } from '@tanstack/react-router'
import ThemeToggle from './ThemeToggle'
import { YearSelect } from './YearSelect'
import { ChampionshipSelect } from './ChampionshipSelect'

export default function Header() {
  return (
    <header className="sticky top-0 z-50 px-4 backdrop-blur-lg">
      <nav className="page-wrap flex flex-wrap items-center gap-x-3 gap-y-2 py-3 sm:py-4">
        <h2 className="m-0 shrink-0 text-base font-semibold tracking-tight">
          <Link
            to="/"
            search={true}
            className="inline-flex items-center gap-2 px-3 py-1.5 text-sm no-underline sm:px-4 sm:py-2"
          >
            <span className="h-2 w-2 rounded-full" />
            Campeonato
          </Link>
        </h2>

        <div className="ml-auto flex items-center gap-1.5 sm:ml-0 sm:gap-2">
          <ThemeToggle />
          <YearSelect />
          <ChampionshipSelect />
        </div>
      </nav>
    </header>
  )
}
