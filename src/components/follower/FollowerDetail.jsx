import { useState } from "react"
import { formatDate, getSeniorityLabel } from "../../utils"
import { ROLES } from "../../data/followers"
import Avatar from "../Avatar"
import { RoleBadge } from "../FollowerRow"
import FollowerHistory from "./FollowerHistory"
import FollowerTags from "./FollowerTags"

export default function FollowerDetail({ follower, onRemove }) {
  const [confirming, setConfirming] = useState(false)
  const {
    username,
    avatar,
    role,
    followedAt,
    notes,
    gameAliases,
    history,
    tags,
  } = follower
  const isMod = role === ROLES.MODERATOR

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="md:col-span-1 flex flex-col gap-4">
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 flex flex-col items-center text-center gap-3">
          <Avatar username={username} avatar={avatar} size={88} />
          <div>
            <h1 className="text-xl font-bold text-zinc-100">{username}</h1>
            <p className="text-xs text-zinc-500 mt-1">
              {getSeniorityLabel(followedAt)} siguiendo
            </p>
          </div>
          <RoleBadge isMod={isMod} />
          <div className="w-full pt-2 border-t border-zinc-800 text-left">
            <p className="text-[11px] text-zinc-600 uppercase tracking-widest mb-1">
              Desde
            </p>
            <p className="text-sm text-zinc-300">{formatDate(followedAt)}</p>
          </div>
        </div>

        <FollowerTags tags={tags} />

        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4">
          {confirming ? (
            <div className="flex flex-col gap-2">
              <p className="text-xs text-zinc-500 text-center">
                ¿Eliminar a{" "}
                <span className="text-zinc-300 font-medium">{username}</span>?
              </p>
              <div className="flex gap-2">
                <button
                  onClick={() => setConfirming(false)}
                  className="flex-1 py-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-400 text-xs font-medium transition-colors cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  onClick={onRemove}
                  className="flex-1 py-2 rounded-lg bg-red-600 hover:bg-red-500 text-white text-xs font-medium transition-colors cursor-pointer"
                >
                  Eliminar
                </button>
              </div>
            </div>
          ) : (
            <button
              onClick={() => setConfirming(true)}
              className="w-full py-2 rounded-lg border border-zinc-800 hover:border-red-500/40 text-zinc-600 hover:text-red-400 text-xs font-medium transition-colors cursor-pointer"
            >
              Eliminar seguidor
            </button>
          )}
        </div>
      </div>

      <div className="md:col-span-2 flex flex-col gap-4">
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
          <p className="text-[11px] text-zinc-500 uppercase tracking-widest mb-3">
            Notas
          </p>
          <p
            className={`text-sm leading-relaxed ${notes ? "text-zinc-300" : "text-zinc-600 italic"}`}
          >
            {notes || "Sin notas"}
          </p>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
          <p className="text-[11px] text-zinc-500 uppercase tracking-widest mb-3">
            Alias en juegos
            {gameAliases.length > 0 && (
              <span className="ml-2 text-violet-400 normal-case tracking-normal">
                ({gameAliases.length})
              </span>
            )}
          </p>
          {gameAliases.length > 0 ? (
            <ul className="flex flex-col gap-2">
              {gameAliases.map((a, i) => (
                <li
                  key={i}
                  className="flex items-center justify-between bg-zinc-800 rounded-lg px-4 py-2.5"
                >
                  <span className="text-xs text-zinc-500">{a.game}</span>
                  <span className="text-sm text-zinc-200 font-medium">
                    {a.alias}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-zinc-600 italic">
              Sin aliases registrados
            </p>
          )}
        </div>

        <FollowerHistory history={history} />
      </div>
    </div>
  )
}
