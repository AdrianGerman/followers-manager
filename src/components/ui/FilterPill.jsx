export default function FilterPill({ active, onClick, label }) {
  return (
    <button
      onClick={onClick}
      className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-colors cursor-pointer ${
        active
          ? "bg-violet-600/20 border-violet-500/60 text-violet-400"
          : "bg-transparent border-zinc-800 text-zinc-500 hover:text-zinc-300 hover:border-zinc-600"
      }`}
    >
      {label}
    </button>
  )
}
