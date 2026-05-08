import { mockFollowers } from "../data/followers"
import { useLocalStorage } from "./useLocalStorage"

export function useFollowers() {
  const [followers, setFollowers] = useLocalStorage("followers", mockFollowers)

  function saveFollower(updated) {
    setFollowers((prev) => prev.map((f) => (f.id === updated.id ? updated : f)))
  }

  function addFollower(newFollower) {
    setFollowers((prev) => [...prev, newFollower])
  }

  function removeFollower(id) {
    setFollowers((prev) => prev.filter((f) => f.id !== id))
  }

  return { followers, setFollowers, saveFollower, addFollower, removeFollower }
}
