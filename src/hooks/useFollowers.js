/* eslint-disable no-unused-vars */
import { mockFollowers, ROLES } from "../data/followers"
import { useLocalStorage } from "./useLocalStorage"

export function useFollowers() {
  const [followers, setFollowers] = useLocalStorage("followers", mockFollowers)

  function saveFollower(updated) {
    setFollowers((prev) => prev.map((f) => (f.id === updated.id ? updated : f)))
  }

  return { followers, saveFollower }
}
