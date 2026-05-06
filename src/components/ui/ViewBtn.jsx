export default function ViewBtn({ active, onClick, label }) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 text-xs font-medium transition-colors cursor-pointer ${
        active
          ? "bg-violet-600/20 text-violet-400"
          : "text-zinc-500 hover:text-zinc-300"
      }`}
    >
      {label}
    </button>
  )
}
