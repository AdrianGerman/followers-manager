import { formatDate } from "../../utils"

export default function FollowerHistory({ history = [] }) {
  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
      <p className="text-[11px] text-zinc-500 uppercase tracking-widest mb-4">
        Historial de cambios
        {history.length > 0 && (
          <span className="ml-2 text-violet-400 normal-case tracking-normal">
            ({history.length})
          </span>
        )}
      </p>

      {history.length === 0 ? (
        <p className="text-sm text-zinc-600 italic">Sin cambios registrados</p>
      ) : (
        <ol className="flex flex-col gap-4">
          {[...history].reverse().map((entry, i) => (
            <li key={i} className="flex gap-3">
              <div className="flex flex-col items-center gap-1 pt-0.5">
                <div className="w-2 h-2 rounded-full bg-violet-500 shrink-0" />
                {i < history.length - 1 && (
                  <div className="w-px flex-1 bg-zinc-800" />
                )}
              </div>

              <div className="pb-4 flex-1 min-w-0">
                <p className="text-[11px] text-zinc-500 mb-1.5">
                  {formatDate(entry.date)}
                </p>
                <ul className="flex flex-col gap-1">
                  {entry.changes.map((change, j) => (
                    <li
                      key={j}
                      className="text-sm text-zinc-300 flex items-start gap-2"
                    >
                      <span className="text-violet-500 mt-0.5 shrink-0">·</span>
                      {change}
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ol>
      )}
    </div>
  )
}
