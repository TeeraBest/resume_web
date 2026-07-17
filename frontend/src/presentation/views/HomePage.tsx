import { Link } from 'react-router-dom'
import { WaveBackground } from '../components/shared/WaveBackground'

export function HomePage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-6 relative overflow-hidden">
      <WaveBackground />
      <div className="text-center max-w-xl relative z-10">
        <h2 className="text-sm font-medium text-gray-300 mb-4">Welcome to</h2>
        <h1 className="text-6xl md:text-7xl font-bold text-white mb-4">
          I'm a<br />
          <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            Full Stack Developer
          </span>
        </h1>
        <p className="text-gray-400 text-lg leading-relaxed mb-8 mt-8">
          A full-stack resume website powered by React, Kong API Gateway, Fastify, PostgreSQL, and Valkey cache.
        </p>
        <Link
          to="/resume"
          className="inline-block px-8 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-cyan-700 transition-all shadow-lg hover:shadow-cyan-500/50"
        >
          View Resume →
        </Link>
        <p className="mt-8 text-xs text-gray-500">
          Data served via Kong Gateway · Cached with Valkey · Clean Architecture (MVVM)
        </p>
      </div>
    </div>
  )
}
