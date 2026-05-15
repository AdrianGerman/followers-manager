export default function FollowerTags({ tags = [] }) {
  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
      <p className="text-[11px] text-zinc-500 uppercase tracking-widest mb-3">
        Tags
        {tags.length > 0 && (
          <span className="ml-2 text-violet-400 normal-case tracking-normal">
            ({tags.length})
          </span>
        )}
      </p>

      {tags.length > 0 ? (
        <div className="flex flex-wrap gap-2">
          {tags.map((tag, i) => (
            <span
              key={i}
              className="px-2.5 py-1 rounded-full text-xs font-medium bg-zinc-800 border border-zinc-700 text-zinc-300"
            >
              {tag}
            </span>
          ))}
        </div>
      ) : (
        <p className="text-sm text-zinc-600 italic">Sin tags</p>
      )}
    </div>
  )
}
