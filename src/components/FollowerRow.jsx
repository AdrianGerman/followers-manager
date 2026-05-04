import { ROLES } from "../data/followers"
import { getSeniorityLabel } from "../utils"
import Avatar from "./Avatar"

export default function FollowerRow({ follower, onClick }) {
  const { username, avatar, role, followedAt, gameAliases } = follower
  const isMod = role === ROLES.MODERATOR

  return (
    <div
      onClick={() => onClick(follower)}
      className="flex items-center gap-4 bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 cursor-pointer transition-all duration-150 hover:border-violet-500 hover:bg-zinc-800"
    >
      <Avatar username={username} avatar={avatar} size={40} />

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="font-semibold text-sm text-zinc-100">
            {username}
          </span>
          <RoleBadge isMod={isMod} />
        </div>
        {gameAliases.length > 0 && (
          <p className="text-[11px] text-zinc-500 mt-0.5 truncate">
            {gameAliases.map((a) => `${a.game}: ${a.alias}`).join(" · ")}
          </p>
        )}
      </div>

      <div className="text-right shrink-0">
        <p className="text-sm text-zinc-300">{getSeniorityLabel(followedAt)}</p>
        <p className="text-[11px] text-zinc-600">siguiendo</p>
      </div>
    </div>
  )
}

export function RoleBadge({ isMod }) {
  return (
    <span
      className={`text-[10px] font-semibold tracking-wider px-1.5 py-0.5 rounded border ${
        isMod
          ? "text-yellow-400 bg-yellow-400/10 border-yellow-500/40"
          : "text-zinc-500 bg-zinc-800 border-zinc-700"
      }`}
    >
      {isMod ? "MOD" : "SEGUIDOR"}
    </span>
  )
}
