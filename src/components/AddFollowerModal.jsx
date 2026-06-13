import { useState } from "react"
import { ROLES } from "../data/followers"
import { parseDateLocal, todayLocal } from "../utils"
import Avatar from "./Avatar"

const today = todayLocal()

export default function AddFollowerModal({ onClose, onAdd, followers }) {
  const [form, setForm] = useState({
    username: "",
    role: ROLES.FOLLOWER,
    notes: "",
    followedAt: today,
    avatar: "",
  })
  const [error, setError] = useState("")

  function set(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }))
    if (field === "username") setError("")
  }

  function validate() {
    if (!form.username.trim()) {
      setError("El username es obligatorio")
      return false
    }
    const exists = followers.some(
      (f) => f.username.toLowerCase() === form.username.trim().toLowerCase(),
    )
    if (exists) {
      setError("Este username ya existe en tu lista")
      return false
    }
    return true
  }

  function handleAdd() {
    if (!validate()) return
    onAdd({
      id: crypto.randomUUID(),
      username: form.username.trim(),
      avatar: form.avatar.trim() || null,
      role: form.role,
      followedAt: parseDateLocal(form.followedAt),
      notes: form.notes.trim(),
      gameAliases: [],
      tags: [],
      history: [],
    })
    onClose()
  }

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-zinc-900 border border-zinc-800 rounded-2xl w-full max-w-sm overflow-hidden"
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-800">
          <h2 className="font-bold text-sm tracking-wide text-zinc-100">
            Añadir seguidor
          </h2>
          <button
            onClick={onClose}
            className="text-zinc-500 hover:text-zinc-200 transition-colors cursor-pointer text-xs"
          >
            ✕
          </button>
        </div>

        <div className="px-6 py-5 flex flex-col gap-4">
          <Field label="Foto de perfil">
            <div className="flex items-center gap-3">
              <Avatar
                username={form.username || "?"}
                avatar={form.avatar.trim() || null}
                size={40}
              />
              <input
                type="text"
                placeholder="URL de imagen (opcional)"
                value={form.avatar}
                onChange={(e) => set("avatar", e.target.value)}
                className="flex-1 bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-sm text-zinc-100 placeholder-zinc-600 outline-none focus:border-violet-500 transition-colors"
              />
            </div>
          </Field>

          <Field label="Username *">
            <input
              type="text"
              placeholder="ej. srmackle"
              value={form.username}
              onChange={(e) => set("username", e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleAdd()}
              className={`w-full bg-zinc-800 border rounded-lg px-3 py-2 text-sm text-zinc-100 placeholder-zinc-600 outline-none transition-colors ${
                error
                  ? "border-red-500"
                  : "border-zinc-700 focus:border-violet-500"
              }`}
            />
            {error && <p className="text-xs text-red-400">{error}</p>}
          </Field>

          <Field label="Rol">
            <div className="flex gap-2">
              <RoleBtn
                active={form.role === ROLES.FOLLOWER}
                onClick={() => set("role", ROLES.FOLLOWER)}
                label="Seguidor"
              />
              <RoleBtn
                active={form.role === ROLES.MODERATOR}
                onClick={() => set("role", ROLES.MODERATOR)}
                label="Moderador"
                mod
              />
            </div>
          </Field>

          <Field label="Fecha de follow">
            <input
              type="date"
              value={form.followedAt}
              onChange={(e) => set("followedAt", e.target.value)}
              className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-sm text-zinc-100 outline-none focus:border-violet-500 transition-colors"
            />
          </Field>

          <Field label="Notas">
            <textarea
              placeholder="Opcional..."
              value={form.notes}
              onChange={(e) => set("notes", e.target.value)}
              rows={2}
              className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-sm text-zinc-100 placeholder-zinc-600 outline-none focus:border-violet-500 transition-colors resize-none"
            />
          </Field>

          <div className="flex gap-2 pt-1">
            <button
              onClick={onClose}
              className="flex-1 py-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-zinc-100 text-sm font-medium transition-colors cursor-pointer"
            >
              Cancelar
            </button>
            <button
              onClick={handleAdd}
              className="flex-1 py-2 rounded-lg bg-violet-600 hover:bg-violet-500 text-white text-sm font-medium transition-colors cursor-pointer"
            >
              Añadir
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

function Field({ label, children }) {
  return (
    <div className="flex flex-col gap-1.5">
      <p className="text-[11px] text-zinc-500 uppercase tracking-widest">
        {label}
      </p>
      {children}
    </div>
  )
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
