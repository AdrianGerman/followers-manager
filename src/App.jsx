import { useState } from "react"
import { mockFollowers } from "./data/followers"

export default function App() {
  const [followers] = useState(mockFollowers)

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <header className="sticky top-0 z-10 border-b border-zinc-800 bg-zinc-900 px-6 h-14 flex items-center justify-between">
        <h1 className="font-bold text-lg tracking-widest text-violet-400 uppercase">
          Followers Manager
        </h1>
        <span className="text-xs text-zinc-600 tracking-wider">v0.1.0</span>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-8">
        <p className="text-zinc-500 text-sm">
          {followers.length} seguidores cargados. UI en el siguiente commit.
        </p>
      </main>
    </div>
  )
}
