export function parseDateLocal(dateString) {
  const [year, month, day] = dateString.split("-").map(Number)
  return new Date(year, month - 1, day).toISOString()
}

export function toDateInput(isoDate) {
  const d = new Date(isoDate)
  const year = d.getFullYear()
  const month = String(d.getMonth() + 1).padStart(2, "0")
  const day = String(d.getDate()).padStart(2, "0")
  return `${year}-${month}-${day}`
}

export function formatDate(isoDate) {
  return new Date(isoDate).toLocaleDateString("es-MX", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}

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
