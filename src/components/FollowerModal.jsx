import { useState } from "react"
import { formatDate, getSeniorityLabel } from "../utils"
import { ROLES } from "../data/followers"
import Avatar from "./Avatar"
import { RoleBadge } from "./FollowerRow"

export default function FollowerModal({ follower, onClose, onSave }) {
  if (!follower) return null

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-zinc-900 border border-zinc-800 rounded-2xl w-full max-w-md overflow-hidden max-h-[90vh] overflow-y-auto"
      >
        <ModalContent follower={follower} onClose={onClose} onSave={onSave} />
      </div>
    </div>
  )
}

function ModalContent({ follower, onClose, onSave }) {
  const { username, avatar, followedAt } = follower

  const [role, setRole] = useState(follower.role)
  const [notes, setNotes] = useState(follower.notes)
  const [aliases, setAliases] = useState(follower.gameAliases)
  const [newAlias, setNewAlias] = useState({ game: "", alias: "" })

  const isMod = role === ROLES.MODERATOR
  const isDirty =
    role !== follower.role ||
    notes !== follower.notes ||
    JSON.stringify(aliases) !== JSON.stringify(follower.gameAliases)

  function handleSave() {
    onSave({ ...follower, role, notes, gameAliases: aliases })
    onClose()
  }

  function addAlias() {
    if (!newAlias.game.trim() || !newAlias.alias.trim()) return
    setAliases([
      ...aliases,
      { game: newAlias.game.trim(), alias: newAlias.alias.trim() },
    ])
    setNewAlias({ game: "", alias: "" })
  }

  function removeAlias(index) {
    setAliases(aliases.filter((_, i) => i !== index))
  }

  return (
    <>
      <div className="relative bg-zinc-800 h-20">
        <div className="absolute bottom-0 left-6 translate-y-1/2">
          <Avatar username={username} avatar={avatar} size={72} />
        </div>
      </div>

      <div className="px-6 pt-12 pb-6 flex flex-col gap-5">
        <div className="flex items-start justify-between gap-3 flex-wrap">
          <div>
            <h2 className="text-lg font-bold text-zinc-100">{username}</h2>
            <p className="text-xs text-zinc-500 mt-0.5">
              Desde {formatDate(followedAt)} · {getSeniorityLabel(followedAt)}{" "}
              siguiendo
            </p>
          </div>
          <RoleBadge isMod={isMod} />
        </div>

        <Divider />

        <div>
          <Label>Rol</Label>
          <div className="flex gap-2 mt-2">
            <RoleBtn
              active={role === ROLES.FOLLOWER}
              onClick={() => setRole(ROLES.FOLLOWER)}
              label="Seguidor"
            />
            <RoleBtn
              active={role === ROLES.MODERATOR}
              onClick={() => setRole(ROLES.MODERATOR)}
              label="Moderador"
              mod
            />
          </div>
        </div>

        <Divider />

        <div>
          <Label>Notas</Label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="¿Por qué añadiste a este seguidor? ¿Algo importante?"
            rows={3}
            className="mt-2 w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-sm text-zinc-100 placeholder-zinc-600 outline-none focus:border-violet-500 transition-colors resize-none"
          />
        </div>

        <Divider />

        <div>
          <Label>Alias en juegos</Label>

          {aliases.length > 0 && (
            <ul className="mt-2 flex flex-col gap-1.5 mb-3">
              {aliases.map((a, i) => (
                <li
                  key={i}
                  className="flex items-center justify-between bg-zinc-800 rounded-lg px-3 py-2 text-sm"
                >
                  <span className="text-zinc-500 text-xs">{a.game}</span>
                  <span className="text-zinc-200 font-medium">{a.alias}</span>
                  <button
                    onClick={() => removeAlias(i)}
                    className="text-zinc-600 hover:text-red-400 transition-colors text-xs ml-3 cursor-pointer"
                  >
                    ✕
                  </button>
                </li>
              ))}
            </ul>
          )}

          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Juego"
              value={newAlias.game}
              onChange={(e) =>
                setNewAlias({ ...newAlias, game: e.target.value })
              }
              className="flex-1 bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-1.5 text-xs text-zinc-100 placeholder-zinc-600 outline-none focus:border-violet-500 transition-colors"
            />
            <input
              type="text"
              placeholder="Alias"
              value={newAlias.alias}
              onChange={(e) =>
                setNewAlias({ ...newAlias, alias: e.target.value })
              }
              onKeyDown={(e) => e.key === "Enter" && addAlias()}
              className="flex-1 bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-1.5 text-xs text-zinc-100 placeholder-zinc-600 outline-none focus:border-violet-500 transition-colors"
            />
            <button
              onClick={addAlias}
              className="px-3 py-1.5 bg-violet-600 hover:bg-violet-500 text-white text-xs rounded-lg transition-colors cursor-pointer font-medium"
            >
              +
            </button>
          </div>
        </div>

        <Divider />

        <div className="flex gap-2">
          <button
            onClick={onClose}
            className="flex-1 py-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-zinc-100 text-sm font-medium transition-colors cursor-pointer"
          >
            Cancelar
          </button>
          <button
            onClick={handleSave}
            disabled={!isDirty}
            className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
              isDirty
                ? "bg-violet-600 hover:bg-violet-500 text-white"
                : "bg-zinc-800 text-zinc-600 cursor-not-allowed"
            }`}
          >
            Guardar
          </button>
        </div>
      </div>
    </>
  )
}

function Label({ children }) {
  return (
    <p className="text-[11px] text-zinc-500 uppercase tracking-widest">
      {children}
    </p>
  )
}

function Divider() {
  return <hr className="border-zinc-800" />
}

function RoleBtn({ active, onClick, label, mod = false }) {
  return (
    <button
      onClick={onClick}
      className={`flex-1 py-1.5 rounded-lg text-xs font-semibold border transition-colors cursor-pointer ${
        active
          ? mod
            ? "bg-yellow-400/10 border-yellow-500/60 text-yellow-400"
            : "bg-zinc-700 border-zinc-600 text-zinc-100"
          : "bg-transparent border-zinc-700 text-zinc-500 hover:text-zinc-300"
      }`}
    >
      {label}
    </button>
  )
}
