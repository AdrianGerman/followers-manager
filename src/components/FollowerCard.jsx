import { ROLES } from "../data/followers"
import { getSeniorityLabel } from "../utils"
import Avatar from "./Avatar"

export default function FollowerCard({ follower, onClick }) {
  const { username, avatar, role, followedAt, gameAliases } = follower
  const isMod = role === ROLES.MODERATOR

  return (
    <div
      onClick={() => onClick(follower)}
      className="relative bg-zinc-900 border border-zinc-800 rounded-xl p-5 flex flex-col items-center gap-2 text-center cursor-pointer transition-all duration-150 hover:border-violet-500 hover:bg-zinc-800 hover:-translate-y-0.5"
    >
      {isMod && (
        <span className="absolute top-2.5 right-2.5 text-[10px] font-semibold tracking-wider text-yellow-400 bg-yellow-400/10 border border-yellow-500/40 rounded px-1.5 py-0.5">
          MOD
        </span>
      )}

      <Avatar username={username} avatar={avatar} size={64} />

      <p className="font-semibold text-sm text-zinc-100 leading-tight break-all">
        {username}
      </p>

      <p className="text-[11px] text-zinc-500">
        {getSeniorityLabel(followedAt)} siguiendo
      </p>

      {gameAliases.length > 0 && (
        <span className="text-[10px] text-violet-400 bg-violet-400/10 border border-violet-500/20 rounded-full px-2 py-0.5">
          {gameAliases.length} {gameAliases.length === 1 ? "alias" : "aliases"}
        </span>
      )}
    </div>
  )
}
