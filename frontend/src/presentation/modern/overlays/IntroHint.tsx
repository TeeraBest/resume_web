import { motion } from 'framer-motion'

export function IntroHint() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1, delay: 1.2 }}
      className="pointer-events-none absolute inset-x-0 bottom-10 flex flex-col items-center gap-2"
    >
      <span className="text-xs uppercase tracking-[0.3em] text-white/40">Scroll to begin</span>
      <motion.span
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
        className="text-white/40"
      >
        ↓
      </motion.span>
    </motion.div>
  )
}
