import { useState } from "react"
import { ROLES } from "../data/followers"

export const FILTERS = [
  { label: "Todos", value: "all" },
  { label: "Seguidores", value: ROLES.FOLLOWER },
  { label: "Moderadores", value: ROLES.MODERATOR },
]

export const SORTS = [
  { label: "Más antiguos", value: "asc" },
  { label: "Más recientes", value: "desc" },
  { label: "Nombre A–Z", value: "az" },
]

export function useFilteredFollowers(followers) {
  const [search, setSearch] = useState("")
  const [filter, setFilter] = useState("all")
  const [sort, setSort] = useState("asc")
  const [view, setView] = useState("grid")

  const filtered = followers
    .filter((f) => filter === "all" || f.role === filter)
    .filter((f) => f.username.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => {
      if (sort === "az") return a.username.localeCompare(b.username)
      if (sort === "desc")
        return new Date(b.followedAt) - new Date(a.followedAt)
      return new Date(a.followedAt) - new Date(b.followedAt)
    })

  return {
    filtered,
    search,
    setSearch,
    filter,
    setFilter,
    sort,
    setSort,
    view,
    setView,
  }
}
