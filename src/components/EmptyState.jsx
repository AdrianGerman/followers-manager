export default function EmptyState({ filtered, total, onAdd }) {
  if (total === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 gap-4">
        <div className="text-5xl">👥</div>
        <div className="text-center">
          <p className="text-zinc-300 font-semibold text-base">
            No tienes seguidores aún
          </p>
          <p className="text-zinc-600 text-sm mt-1">
            Añade el primero para empezar a gestionar tu comunidad
          </p>
        </div>
        <button
          onClick={onAdd}
          className="px-5 py-2 bg-violet-600 hover:bg-violet-500 text-white text-sm font-semibold rounded-lg transition-colors cursor-pointer"
        >
          + Añadir seguidor
        </button>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center justify-center py-24 gap-2">
      <div className="text-4xl">🔍</div>
      <p className="text-zinc-400 font-medium text-sm">Sin resultados</p>
      <p className="text-zinc-600 text-xs">
        Prueba con otro nombre o cambia el filtro
      </p>
    </div>
  )
}
