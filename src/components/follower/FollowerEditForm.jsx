import { useState } from "react"
import { ROLES } from "../../data/followers"
import { buildChangelog } from "../../utils/diff"
import Avatar from "../Avatar"
import FollowerTagsEditor from "./FollowerTagsEditor"

export default function FollowerEditForm({ follower, onSave, onCancel }) {
  const [role, setRole] = useState(follower.role)
  const [notes, setNotes] = useState(follower.notes)
  const [avatar, setAvatar] = useState(follower.avatar || "")
  const [aliases, setAliases] = useState(follower.gameAliases)
  const [tags, setTags] = useState(follower.tags || [])
  const [newAlias, setNewAlias] = useState({ game: "", alias: "" })

  const isDirty =
    role !== follower.role ||
    notes !== follower.notes ||
    (avatar.trim() || null) !== follower.avatar ||
    JSON.stringify(aliases) !== JSON.stringify(follower.gameAliases) ||
    JSON.stringify(tags) !== JSON.stringify(follower.tags || [])

  function handleSave() {
    const updated = {
      ...follower,
      role,
      notes,
      avatar: avatar.trim() || null,
      gameAliases: aliases,
      tags,
    }

    const changes = buildChangelog(follower, updated)
    if (changes.length > 0) {
      updated.history = [
        ...(follower.history || []),
        { date: new Date().toISOString(), changes },
      ]
    }

    onSave(updated)
  }

  function addAlias() {
    if (!newAlias.game.trim() || !newAlias.alias.trim()) return
    setAliases([
      ...aliases,
      { game: newAlias.game.trim(), alias: newAlias.alias.trim() },
    ])
    setNewAlias({ game: "", alias: "" })
  }

  function removeAlias(i) {
    setAliases(aliases.filter((_, idx) => idx !== i))
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="md:col-span-1 flex flex-col gap-4">
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 flex flex-col items-center gap-4">
          <Avatar
            username={follower.username}
            avatar={avatar.trim() || null}
            size={80}
          />
          <p className="text-xl font-bold text-zinc-100">{follower.username}</p>

          <Field label="Foto de perfil">
            <input
              type="text"
              placeholder="URL de imagen"
              value={avatar}
              onChange={(e) => setAvatar(e.target.value)}
              className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-xs text-zinc-100 placeholder-zinc-600 outline-none focus:border-violet-500 transition-colors"
            />
          </Field>

          <Field label="Rol">
            <div className="flex gap-2">
              <RoleBtn
                active={role === ROLES.FOLLOWER}
                onClick={() => setRole(ROLES.FOLLOWER)}
                label="Seguidor"
              />
              <RoleBtn
                active={role === ROLES.MODERATOR}
                onClick={() => setRole(ROLES.MODERATOR)}
                label="Mod"
                mod
              />
            </div>
          </Field>
        </div>

        <div className="flex gap-2">
          <button
            onClick={onCancel}
            className="flex-1 py-2.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-zinc-100 text-sm font-medium transition-colors cursor-pointer"
          >
            Cancelar
          </button>
          <button
            onClick={handleSave}
            disabled={!isDirty}
            className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-colors ${
              isDirty
                ? "bg-violet-600 hover:bg-violet-500 text-white cursor-pointer"
                : "bg-zinc-800 text-zinc-600 cursor-not-allowed"
            }`}
          >
            Guardar
          </button>
        </div>
      </div>

      <div className="md:col-span-2 flex flex-col gap-4">
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
          <Field label="Notas">
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="¿Por qué añadiste a este seguidor?"
              rows={5}
              className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-sm text-zinc-100 placeholder-zinc-600 outline-none focus:border-violet-500 transition-colors resize-none"
            />
          </Field>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
          <Field label="Tags">
            <FollowerTagsEditor tags={tags} onChange={setTags} />
          </Field>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
          <Field label="Alias en juegos">
            {aliases.length > 0 && (
              <ul className="flex flex-col gap-2 mb-4">
                {aliases.map((a, i) => (
                  <li
                    key={i}
                    className="flex items-center justify-between bg-zinc-800 rounded-lg px-4 py-2.5"
                  >
                    <span className="text-xs text-zinc-500 w-1/3">
                      {a.game}
                    </span>
                    <span className="text-sm text-zinc-200 font-medium">
                      {a.alias}
                    </span>
                    <button
                      onClick={() => removeAlias(i)}
                      className="text-zinc-600 hover:text-red-400 transition-colors text-xs ml-4 cursor-pointer"
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
                className="flex-1 bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-sm text-zinc-100 placeholder-zinc-600 outline-none focus:border-violet-500 transition-colors"
              />
              <input
                type="text"
                placeholder="Alias"
                value={newAlias.alias}
                onChange={(e) =>
                  setNewAlias({ ...newAlias, alias: e.target.value })
                }
                onKeyDown={(e) => e.key === "Enter" && addAlias()}
                className="flex-1 bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-sm text-zinc-100 placeholder-zinc-600 outline-none focus:border-violet-500 transition-colors"
              />
              <button
                onClick={addAlias}
                className="px-4 py-2 bg-violet-600 hover:bg-violet-500 text-white text-sm rounded-lg transition-colors cursor-pointer font-medium"
              >
                +
              </button>
            </div>
          </Field>
        </div>
      </div>
    </div>
  )
}

function Field({ label, children }) {
  return (
    <div className="flex flex-col gap-2 w-full">
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
      className={`flex-1 py-2 rounded-lg text-xs font-semibold border transition-colors cursor-pointer ${
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
