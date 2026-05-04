import { formatDate, getSeniorityLabel } from "../utils"
import { ROLES } from "../data/followers"
import Avatar from "./Avatar"
import { RoleBadge } from "./FollowerRow"

export default function FollowerModal({ follower, onClose }) {
  if (!follower) return null

  const { username, avatar, role, followedAt, notes, gameAliases } = follower
  const isMod = role === ROLES.MODERATOR

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-zinc-900 border border-zinc-800 rounded-2xl w-full max-w-md overflow-hidden"
      >
        <div className="relative bg-zinc-800 h-20 flex items-end px-6 pb-0">
          <div className="absolute bottom-0 translate-y-1/2">
            <Avatar username={username} avatar={avatar} size={72} />
          </div>
        </div>

        <div className="px-6 pt-12 pb-6 flex flex-col gap-5">
          <div className="flex items-center justify-between gap-3 flex-wrap">
            <div>
              <h2 className="text-lg font-bold text-zinc-100 leading-tight">
                {username}
              </h2>
              <p className="text-xs text-zinc-500 mt-0.5">
                {getSeniorityLabel(followedAt)} siguiendo
              </p>
            </div>
            <RoleBadge isMod={isMod} />
          </div>

          <Divider />

          <InfoRow label="Desde" value={formatDate(followedAt)} />

          <Divider />

          <div>
            <p className="text-[11px] text-zinc-500 uppercase tracking-widest mb-2">
              Notas
            </p>
            <p
              className={`text-sm ${notes ? "text-zinc-300" : "text-zinc-600 italic"}`}
            >
              {notes || "Sin notas"}
            </p>
          </div>

          <Divider />

          <div>
            <p className="text-[11px] text-zinc-500 uppercase tracking-widest mb-2">
              Alias en juegos
            </p>
            {gameAliases.length > 0 ? (
              <ul className="flex flex-col gap-2">
                {gameAliases.map((a, i) => (
                  <li
                    key={i}
                    className="flex items-center justify-between text-sm"
                  >
                    <span className="text-zinc-500">{a.game}</span>
                    <span className="text-zinc-200 font-medium">{a.alias}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-zinc-600 italic">
                Sin aliases registrados
              </p>
            )}
          </div>

          <Divider />

          <button
            onClick={onClose}
            className="w-full py-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-zinc-100 text-sm font-medium transition-colors cursor-pointer"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  )
}

function InfoRow({ label, value }) {
  return (
    <div className="flex items-center justify-between text-sm">
      <span className="text-zinc-500">{label}</span>
      <span className="text-zinc-200">{value}</span>
    </div>
  )
}

function Divider() {
  return <hr className="border-zinc-800" />
}
