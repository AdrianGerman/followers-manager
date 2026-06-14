import { useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { useFollowers } from "../hooks/useFollowers"
import PageTransition from "../components/PageTransition"
import FollowerDetail from "../components/follower/FollowerDetail"
import FollowerEditForm from "../components/follower/FollowerEditForm"
import NotFoundPage from "./NotFoundPage"

export default function FollowerPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { followers, saveFollower, removeFollower } = useFollowers()
  const [editing, setEditing] = useState(false)

  const follower = followers.find((f) => f.id === id)

  if (!follower) return <NotFoundPage />

  function handleSave(updated) {
    saveFollower(updated)
    setEditing(false)
  }

  function handleRemove() {
    removeFollower(follower.id)
    navigate("/")
  }

  return (
    <PageTransition>
      <div className="min-h-screen bg-zinc-950 text-zinc-100">
        <header className="sticky top-0 z-10 border-b border-zinc-800 bg-zinc-900 px-6 h-14 flex items-center gap-3">
          <button
            onClick={() => navigate("/")}
            className="text-zinc-500 hover:text-zinc-100 text-sm transition-colors cursor-pointer flex items-center gap-1.5"
          >
            ← Volver
          </button>
          <span className="text-zinc-700">|</span>
          <span className="text-sm text-zinc-400 truncate">
            {follower.username}
          </span>
          {!editing && (
            <button
              onClick={() => setEditing(true)}
              className="ml-auto px-3 py-1.5 text-xs font-medium bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white rounded-lg transition-colors cursor-pointer"
            >
              Editar
            </button>
          )}
        </header>

        <main className="max-w-4xl mx-auto px-6 py-8">
          {editing ? (
            <FollowerEditForm
              follower={follower}
              onSave={handleSave}
              onCancel={() => setEditing(false)}
            />
          ) : (
            <FollowerDetail
              follower={follower}
              onRemove={handleRemove}
              onSave={saveFollower}
            />
          )}
        </main>
      </div>
    </PageTransition>
  )
}
