import FollowerCard from "./FollowerCard"

export default function FollowerGrid({ followers, onSelect }) {
  return (
    <div
      className="grid gap-3"
      style={{ gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))" }}
    >
      {followers.map((f) => (
        <FollowerCard key={f.id} follower={f} onClick={onSelect} />
      ))}
    </div>
  )
}
