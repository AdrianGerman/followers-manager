import { useRef, useState } from "react"

export default function PorterModal({ onClose, onExport, onImport }) {
  const inputRef = useRef(null)
  const [status, setStatus] = useState(null)
  const [loading, setLoading] = useState(false)

  async function handleFileChange(e) {
    const file = e.target.files?.[0]
    if (!file) return

    setLoading(true)
    setStatus(null)
    try {
      const count = await onImport(file)
      setStatus({
        type: "ok",
        msg: `${count} seguidores importados correctamente`,
      })
    } catch (err) {
      setStatus({ type: "error", msg: err })
    } finally {
      setLoading(false)
      e.target.value = ""
    }
  }

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-zinc-900 border border-zinc-800 rounded-2xl w-full max-w-sm overflow-hidden"
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-800">
          <h2 className="font-bold text-sm tracking-wide text-zinc-100">
            Export / Import
          </h2>
          <button
            onClick={onClose}
            className="text-zinc-500 hover:text-zinc-200 transition-colors cursor-pointer text-xs"
          >
            ✕
          </button>
        </div>

        <div className="px-6 py-5 flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <p className="text-[11px] text-zinc-500 uppercase tracking-widest">
              Exportar
            </p>
            <p className="text-xs text-zinc-500">
              Descarga un archivo JSON con todos tus seguidores y su
              información.
            </p>
            <button
              onClick={() => {
                onExport()
                setStatus({ type: "ok", msg: "Backup descargado" })
              }}
              className="w-full py-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white text-sm font-medium transition-colors cursor-pointer"
            >
              Descargar backup
            </button>
          </div>

          <hr className="border-zinc-800" />

          <div className="flex flex-col gap-2">
            <p className="text-[11px] text-zinc-500 uppercase tracking-widest">
              Importar
            </p>
            <p className="text-xs text-zinc-500">
              Carga un backup JSON.{" "}
              <span className="text-yellow-400">
                Reemplaza todos los datos actuales.
              </span>
            </p>
            <input
              ref={inputRef}
              type="file"
              accept=".json"
              onChange={handleFileChange}
              className="hidden"
            />
            <button
              onClick={() => inputRef.current?.click()}
              disabled={loading}
              className="w-full py-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white text-sm font-medium transition-colors cursor-pointer disabled:opacity-50"
            >
              {loading ? "Importando..." : "Seleccionar archivo"}
            </button>
          </div>

          {status && (
            <p
              className={`text-xs text-center px-3 py-2 rounded-lg ${
                status.type === "ok"
                  ? "text-green-400 bg-green-400/10"
                  : "text-red-400 bg-red-400/10"
              }`}
            >
              {status.msg}
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
