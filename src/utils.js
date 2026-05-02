/* eslint-disable no-unused-vars */
export function getSeniorityLabel(isoDate) {
  const diff = Date.now() - new Date(isoDate).getTime()
  const days = Math.floor(diff / 86_400_000)
  const months = Math.floor(days / 30)
  const years = Math.floor(days / 365)

  if (years >= 1) {
    const rem = Math.floor((days % 365) / 30)
    return rem > 0
      ? `${years}a ${rem}m`
      : `${years} ${years === 1 ? "año" : "años"}`
  }
  if (months >= 1) return `${months} ${months === 1 ? "mes" : "meses"}`
  return `${days} ${days === 1 ? "día" : "días"}`
}

export function formatDate(isoDate) {
  return new Date(isoDate).toLocaleDateString("es-MX", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}

export function getInitials(username) {
  return username.slice(0, 2).toUpperCase()
}

export function getAvatarColor(username) {
  const palette = [
    "#9147ff",
    "#00b5ad",
    "#e8621a",
    "#d63864",
    "#2185d0",
    "#21ba45",
  ]
  let hash = 0
  for (const char of username) {
    hash = username.charCodeAt(0) + ((hash << 5) - hash)
  }
  return palette[Math.abs(hash) % palette.length]
}
