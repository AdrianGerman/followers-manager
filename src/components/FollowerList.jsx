import { motion } from "framer-motion"
import FollowerRow from "./FollowerRow"

export default function FollowerList({ followers, onSelect }) {
  return (
    <div className="flex flex-col gap-2">
      {followers.map((f, i) => (
        <motion.div
          key={f.id}
          initial={{ opacity: 0, x: -8 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.15, delay: i * 0.025, ease: "easeOut" }}
        >
          <FollowerRow follower={f} onClick={onSelect} />
        </motion.div>
      ))}
    </div>
  )
}
