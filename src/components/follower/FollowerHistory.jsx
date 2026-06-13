import { formatDate } from "../../utils"

export default function FollowerHistory({ history = [], onUpdate }) {
  function removeEntry(index) {
    onUpdate(history.filter((_, i) => i !== index))
  }

  function clearAll() {
    onUpdate([])
  }

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
      <div className="flex items-center justify-between mb-4">
        <p className="text-[11px] text-zinc-500 uppercase tracking-widest">
          Historial de cambios
          {history.length > 0 && (
            <span className="ml-2 text-violet-400 normal-case tracking-normal">
              ({history.length})
            </span>
          )}
        </p>
        {history.length > 0 && (
          <button
            onClick={clearAll}
            className="text-[11px] text-zinc-600 hover:text-red-400 transition-colors cursor-pointer"
          >
            Borrar todo
          </button>
        )}
      </div>

      {history.length === 0 ? (
        <p className="text-sm text-zinc-600 italic">Sin cambios registrados</p>
      ) : (
        <ol className="flex flex-col gap-4">
          {[...history].reverse().map((entry, i) => {
            const realIndex = history.length - 1 - i
            return (
              <li key={i} className="flex gap-3 group">
                <div className="flex flex-col items-center gap-1 pt-0.5">
                  <div className="w-2 h-2 rounded-full bg-violet-500 shrink-0" />
                  {i < history.length - 1 && (
                    <div className="w-px flex-1 bg-zinc-800" />
                  )}
                </div>

                <div className="pb-4 flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <p className="text-[11px] text-zinc-500">
                      {formatDate(entry.date)}
                    </p>
                    <button
                      onClick={() => removeEntry(realIndex)}
                      className="text-[11px] text-zinc-700 hover:text-red-400 transition-colors cursor-pointer opacity-0 group-hover:opacity-100"
                    >
                      ✕
                    </button>
                  </div>
                  <ul className="flex flex-col gap-1">
                    {entry.changes.map((change, j) => (
                      <li
                        key={j}
                        className="text-sm text-zinc-300 flex items-start gap-2"
                      >
                        <span className="text-violet-500 mt-0.5 shrink-0">
                          ·
                        </span>
                        {change}
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            )
          })}
        </ol>
      )}
    </div>
  )
}
