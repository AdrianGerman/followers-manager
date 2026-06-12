/* eslint-disable no-unused-vars */
export {
  parseDateLocal,
  toDateInput,
  formatDate,
  getSeniorityLabel,
} from "./utils/date"

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

export { todayLocal } from "./utils/date"
