import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useFollowers } from "../hooks/useFollowers"
import { useFilteredFollowers } from "../hooks/useFilteredFollowers"
import { usePorter } from "../hooks/usePorter"
import PageTransition from "../components/PageTransition"
import StatsBar from "../components/StatsBar"
import Toolbar from "../components/Toolbar"
import FollowerGrid from "../components/FollowerGrid"
import FollowerList from "../components/FollowerList"
import AddFollowerModal from "../components/AddFollowerModal"
import PorterModal from "../components/PorterModal"
import EmptyState from "../components/EmptyState"

export default function HomePage() {
  const { followers, setFollowers, addFollower } = useFollowers()
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

  const { exportData, importData } = usePorter(followers, setFollowers)
  const navigate = useNavigate()

  const [adding, setAdding] = useState(false)
  const [porting, setPorting] = useState(false)

  const isEmpty = followers.length === 0
  const noResults = !isEmpty && filtered.length === 0

  return (
    <PageTransition>
      <div className="min-h-screen bg-zinc-950 text-zinc-100">
        <header className="sticky top-0 z-10 border-b border-zinc-800 bg-zinc-900 px-6 h-14 flex items-center justify-between">
          <h1 className="font-bold text-lg tracking-widest text-violet-400 uppercase">
            Followers Manager
          </h1>
          <div className="flex gap-2">
            <button
              onClick={() => setPorting(true)}
              className="px-3 py-1.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-zinc-100 text-xs font-medium rounded-lg transition-colors cursor-pointer"
            >
              Export / Import
            </button>
            <button
              onClick={() => setAdding(true)}
              className="px-4 py-1.5 bg-violet-600 hover:bg-violet-500 text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer"
            >
              + Añadir
            </button>
          </div>
        </header>

        <main className="max-w-6xl mx-auto px-6 py-8">
          {!isEmpty && <StatsBar followers={followers} />}

          {!isEmpty && (
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
          )}

          {!isEmpty && !noResults && view === "grid" && (
            <FollowerGrid
              followers={filtered}
              onSelect={(f) => navigate(`/follower/${f.id}`)}
            />
          )}
          {!isEmpty && !noResults && view === "list" && (
            <FollowerList
              followers={filtered}
              onSelect={(f) => navigate(`/follower/${f.id}`)}
            />
          )}

          {(isEmpty || noResults) && (
            <EmptyState
              total={followers.length}
              filtered={filtered.length}
              onAdd={() => setAdding(true)}
            />
          )}
        </main>

        {adding && (
          <AddFollowerModal
            onClose={() => setAdding(false)}
            onAdd={addFollower}
            followers={followers}
          />
        )}

        {porting && (
          <PorterModal
            onClose={() => setPorting(false)}
            onExport={exportData}
            onImport={importData}
          />
        )}
      </div>
    </PageTransition>
  )
}
