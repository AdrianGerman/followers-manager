import { motion } from "framer-motion"
import FollowerCard from "./FollowerCard"

export default function FollowerGrid({ followers, onSelect }) {
  return (
    <div
      className="grid gap-3"
      style={{ gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))" }}
    >
      {followers.map((f, i) => (
        <motion.div
          key={f.id}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.15, delay: i * 0.03, ease: "easeOut" }}
        >
          <FollowerCard follower={f} onClick={onSelect} />
        </motion.div>
      ))}
    </div>
  )
}
