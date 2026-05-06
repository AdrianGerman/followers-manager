import ViewBtn from "./ui/ViewBtn"
import FilterPill from "./ui/FilterPill"
import { FILTERS, SORTS } from "../hooks/useFilteredFollowers"

export default function Toolbar({
  search,
  onSearch,
  filter,
  onFilter,
  sort,
  onSort,
  view,
  onView,
  total,
}) {
  return (
    <div className="mb-6">
      <div className="flex gap-3 mb-3 items-center">
        <input
          type="text"
          placeholder="Buscar seguidor..."
          value={search}
          onChange={(e) => onSearch(e.target.value)}
          className="flex-1 bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-2 text-sm text-zinc-100 placeholder-zinc-600 outline-none focus:border-violet-500 transition-colors"
        />
        <div className="flex bg-zinc-900 border border-zinc-800 rounded-lg overflow-hidden shrink-0">
          <ViewBtn
            active={view === "grid"}
            onClick={() => onView("grid")}
            label="Grid"
          />
          <ViewBtn
            active={view === "list"}
            onClick={() => onView("list")}
            label="Lista"
          />
        </div>
      </div>

      <div className="flex gap-2 items-center flex-wrap">
        <div className="flex gap-1.5">
          {FILTERS.map((f) => (
            <FilterPill
              key={f.value}
              active={filter === f.value}
              onClick={() => onFilter(f.value)}
              label={f.label}
            />
          ))}
        </div>

        <div className="w-px h-4 bg-zinc-800 mx-1" />

        <select
          value={sort}
          onChange={(e) => onSort(e.target.value)}
          className="bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-1.5 text-xs text-zinc-400 outline-none focus:border-violet-500 transition-colors cursor-pointer"
        >
          {SORTS.map((s) => (
            <option key={s.value} value={s.value}>
              {s.label}
            </option>
          ))}
        </select>

        <span className="text-xs text-zinc-600 ml-auto whitespace-nowrap">
          {total} resultado{total !== 1 && "s"}
        </span>
      </div>
    </div>
  )
}
