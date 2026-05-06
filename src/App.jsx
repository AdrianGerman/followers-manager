import { useState } from "react"
import { useFollowers } from "./hooks/useFollowers"
import { useFilteredFollowers } from "./hooks/useFilteredFollowers"
import StatsBar from "./components/StatsBar"
import Toolbar from "./components/Toolbar"
import FollowerGrid from "./components/FollowerGrid"
import FollowerList from "./components/FollowerList"
import FollowerModal from "./components/FollowerModal"

export default function App() {
  const { followers, saveFollower } = useFollowers()
  const {
    filtered,
    search,
    setSearch,
    filter,
    setFilter,
    sort,
    setSort,
    view,
    setView,
  } = useFilteredFollowers(followers)

  const [selected, setSelected] = useState(null)

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <header className="sticky top-0 z-10 border-b border-zinc-800 bg-zinc-900 px-6 h-14 flex items-center justify-between">
        <h1 className="font-bold text-lg tracking-widest text-violet-400 uppercase">
          Followers Manager
        </h1>
        <span className="text-xs text-zinc-600 tracking-wider">v0.8.0</span>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-8">
        <StatsBar followers={followers} />

        <Toolbar
          search={search}
          onSearch={setSearch}
          filter={filter}
          onFilter={setFilter}
          sort={sort}
          onSort={setSort}
          view={view}
          onView={setView}
          total={filtered.length}
        />

        {view === "grid" && (
          <FollowerGrid followers={filtered} onSelect={setSelected} />
        )}
        {view === "list" && (
          <FollowerList followers={filtered} onSelect={setSelected} />
        )}

        {filtered.length === 0 && (
          <p className="text-center text-zinc-600 text-sm py-16">
            Sin resultados
          </p>
        )}
      </main>

      <FollowerModal
        follower={selected}
        onClose={() => setSelected(null)}
        onSave={saveFollower}
      />
    </div>
  )
}
