import { ROLES } from "../data/followers"

export default function StatsBar({ followers }) {
  const total = followers.length
  const mods = followers.filter((f) => f.role === ROLES.MODERATOR).length
  const regular = total - mods

  return (
    <div className="flex gap-3 mb-8 flex-wrap">
      <StatCard
        label="Total"
        value={total}
        accent="border-violet-500 text-violet-400"
      />
      <StatCard
        label="Moderadores"
        value={mods}
        accent="border-yellow-500 text-yellow-400"
      />
      <StatCard
        label="Seguidores"
        value={regular}
        accent="border-zinc-500 text-zinc-400"
      />
    </div>
  )
}

function StatCard({ label, value, accent }) {
  return (
    <div
      className={`bg-zinc-900 border border-zinc-800 border-t-2 ${accent} rounded-xl px-5 py-3 min-w-[130px]`}
    >
      <p className="text-[11px] text-zinc-500 uppercase tracking-widest mb-1">
        {label}
      </p>
      <p className={`text-3xl font-bold ${accent.split(" ")[1]}`}>{value}</p>
    </div>
  )
}
