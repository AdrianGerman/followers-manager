import FollowerRow from "./FollowerRow"

export default function FollowerList({ followers, onSelect }) {
  return (
    <div className="flex flex-col gap-2">
      {followers.map((f) => (
        <FollowerRow key={f.id} follower={f} onClick={onSelect} />
      ))}
    </div>
  )
}
