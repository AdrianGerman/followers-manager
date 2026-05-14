import { ROLES } from "../data/followers"

export function buildChangelog(prev, next) {
  const changes = []

  if (prev.role !== next.role) {
    const label = next.role === ROLES.MODERATOR ? "Moderador" : "Seguidor"
    changes.push(`Rol cambiado a ${label}`)
  }

  if ((prev.avatar || "") !== (next.avatar || "")) {
    if (!prev.avatar && next.avatar) changes.push("Foto de perfil añadida")
    else if (prev.avatar && !next.avatar)
      changes.push("Foto de perfil eliminada")
    else changes.push("Foto de perfil actualizada")
  }

  if (prev.notes !== next.notes) {
    if (!prev.notes && next.notes) changes.push("Notas añadidas")
    else if (prev.notes && !next.notes) changes.push("Notas eliminadas")
    else changes.push("Notas editadas")
  }

  const prevAliases = JSON.stringify(prev.gameAliases)
  const nextAliases = JSON.stringify(next.gameAliases)
  if (prevAliases !== nextAliases) {
    const diff = next.gameAliases.length - prev.gameAliases.length
    if (diff > 0) changes.push(`${diff} alias añadido${diff > 1 ? "s" : ""}`)
    else if (diff < 0)
      changes.push(
        `${Math.abs(diff)} alias eliminado${Math.abs(diff) > 1 ? "s" : ""}`,
      )
    else changes.push("Aliases actualizados")
  }

  return changes
}
