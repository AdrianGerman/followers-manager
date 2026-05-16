import { useState } from "react"

export default function FollowerTagsEditor({ tags, onChange }) {
  const [input, setInput] = useState("")
  const [error, setError] = useState("")

  function addTag() {
    const value = input.trim().toLowerCase()
    if (!value) return

    if (tags.includes(value)) {
      setError("Este tag ya existe")
      return
    }

    onChange([...tags, value])
    setInput("")
    setError("")
  }

  function removeTag(tag) {
    onChange(tags.filter((t) => t !== tag))
  }

  function handleKeyDown(e) {
    if (e.key === "Enter") addTag()
    if (e.key === "Backspace" && !input && tags.length > 0) {
      removeTag(tags[tags.length - 1])
    }
  }

  return (
    <div className="flex flex-col gap-2">
      {tags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {tags.map((tag, i) => (
            <span
              key={i}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-zinc-800 border border-zinc-700 text-zinc-300"
            >
              {tag}
              <button
                onClick={() => removeTag(tag)}
                className="text-zinc-600 hover:text-red-400 transition-colors cursor-pointer leading-none"
              >
                ✕
              </button>
            </span>
          ))}
        </div>
      )}

      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Nuevo tag (Enter para añadir)"
          value={input}
          onChange={(e) => {
            setInput(e.target.value)
            setError("")
          }}
          onKeyDown={handleKeyDown}
          className={`flex-1 bg-zinc-800 border rounded-lg px-3 py-2 text-sm text-zinc-100 placeholder-zinc-600 outline-none transition-colors ${
            error ? "border-red-500" : "border-zinc-700 focus:border-violet-500"
          }`}
        />
        <button
          onClick={addTag}
          className="px-4 py-2 bg-violet-600 hover:bg-violet-500 text-white text-sm rounded-lg transition-colors cursor-pointer font-medium"
        >
          +
        </button>
      </div>

      {error && <p className="text-xs text-red-400">{error}</p>}
      <p className="text-[11px] text-zinc-600">
        Backspace elimina el último tag
      </p>
    </div>
  )
}
