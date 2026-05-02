import { getInitials, getAvatarColor } from "../utils"

export default function Avatar({ username, avatar, size = 48 }) {
  if (avatar) {
    return (
      <img
        src={avatar}
        alt={username}
        style={{ width: size, height: size }}
        className="rounded-full object-cover shrink-0"
      />
    )
  }

  return (
    <div
      style={{
        width: size,
        height: size,
        background: getAvatarColor(username),
        fontSize: size * 0.35,
      }}
      className="rounded-full flex items-center justify-center font-bold text-white flex-shrink-0 tracking-wide"
    >
      {getInitials(username)}
    </div>
  )
}
