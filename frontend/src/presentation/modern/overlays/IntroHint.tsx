import { motion } from 'framer-motion'

export function IntroHint() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1, delay: 0.1 }}
      className="pointer-events-none absolute inset-x-0 bottom-32 flex flex-col items-center gap-2 md:bottom-28"
    >
      <span className="theme-text-muted text-xs font-semibold uppercase tracking-[0.3em]">Scroll/Click to begin</span>
      <motion.span
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
        className="theme-text-muted"
      >
        ↓
      </motion.span>
    </motion.div>
  )
}
