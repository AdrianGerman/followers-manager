import { useState } from "react"
import { useFollowers } from "./hooks/useFollowers"
import { useFilteredFollowers } from "./hooks/useFilteredFollowers"
import { usePorter } from "./hooks/usePorter"
import StatsBar from "./components/StatsBar"
import Toolbar from "./components/Toolbar"
import FollowerGrid from "./components/FollowerGrid"
import FollowerList from "./components/FollowerList"
import FollowerModal from "./components/FollowerModal"
import AddFollowerModal from "./components/AddFollowerModal"
import PorterModal from "./components/PorterModal"

export default function App() {
  const { followers, setFollowers, saveFollower, addFollower, removeFollower } =
    useFollowers()
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

  const [selected, setSelected] = useState(null)
  const [adding, setAdding] = useState(false)
  const [porting, setPorting] = useState(false)

  return (
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
        onRemove={removeFollower}
      />

      {adding && (
        <AddFollowerModal
          onClose={() => setAdding(false)}
          onAdd={addFollower}
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
  )
}
