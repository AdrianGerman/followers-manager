import { useState } from "react"
import { mockFollowers } from "./data/followers"
import { useLocalStorage } from "./hooks/useLocalStorage"
import StatsBar from "./components/StatsBar"
import FollowerCard from "./components/FollowerCard"
import FollowerRow from "./components/FollowerRow"
import FollowerModal from "./components/FollowerModal"

export default function App() {
  const [followers, setFollowers] = useLocalStorage("followers", mockFollowers)
  const [search, setSearch] = useState("")
  const [view, setView] = useState("grid")
  const [selected, setSelected] = useState(null)

  const filtered = followers.filter((f) =>
    f.username.toLowerCase().includes(search.toLowerCase()),
  )

  function handleSave(updated) {
    setFollowers((prev) => prev.map((f) => (f.id === updated.id ? updated : f)))
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <header className="sticky top-0 z-10 border-b border-zinc-800 bg-zinc-900 px-6 h-14 flex items-center justify-between">
        <h1 className="font-bold text-lg tracking-widest text-violet-400 uppercase">
          Followers Manager
        </h1>
        <span className="text-xs text-zinc-600 tracking-wider">v0.5.0</span>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-8">
        <StatsBar followers={followers} />

        <div className="flex gap-3 mb-5 items-center">
          <input
            type="text"
            placeholder="Buscar seguidor..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-2 text-sm text-zinc-100 placeholder-zinc-600 outline-none focus:border-violet-500 transition-colors"
          />
          <div className="flex bg-zinc-900 border border-zinc-800 rounded-lg overflow-hidden shrink-0">
            <ViewBtn
              active={view === "grid"}
              onClick={() => setView("grid")}
              label="Grid"
            />
            <ViewBtn
              active={view === "list"}
              onClick={() => setView("list")}
              label="Lista"
            />
          </div>
          <span className="text-xs text-zinc-600 whitespace-nowrap">
            {filtered.length} resultado{filtered.length !== 1 && "s"}
          </span>
        </div>

        {view === "grid" && (
          <div
            className="grid gap-3"
            style={{
              gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))",
            }}
          >
            {filtered.map((f) => (
              <FollowerCard key={f.id} follower={f} onClick={setSelected} />
            ))}
          </div>
        )}

        {view === "list" && (
          <div className="flex flex-col gap-2">
            {filtered.map((f) => (
              <FollowerRow key={f.id} follower={f} onClick={setSelected} />
            ))}
          </div>
        )}

        {filtered.length === 0 && (
          <p className="text-center text-zinc-600 text-sm py-16">
            Sin resultados para &quot;{search}&quot;
          </p>
        )}
      </main>

      <FollowerModal
        follower={selected}
        onClose={() => setSelected(null)}
        onSave={handleSave}
      />
    </div>
  )
}

function ViewBtn({ active, onClick, label }) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 text-xs font-medium transition-colors cursor-pointer ${
        active
          ? "bg-violet-600/20 text-violet-400"
          : "text-zinc-500 hover:text-zinc-300"
      }`}
    >
      {label}
    </button>
  )
}
