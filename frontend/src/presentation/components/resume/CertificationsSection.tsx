import type { Certification } from '@core/models/resume.model'

interface Props {
  certifications: Certification[]
}

export function CertificationsSection({ certifications }: Props) {
  if (certifications.length === 0) return null

  return (
    <section className="py-10">
      <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b border-gray-200">
        Certifications
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {certifications.map((cert) => (
          <div key={cert.id} className="flex gap-4 p-4 border border-gray-200 rounded-xl bg-white">
            <div className="w-10 h-10 flex-shrink-0 rounded-lg bg-brand-50 flex items-center justify-center text-brand-600 font-bold text-lg">
              ✓
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-semibold text-gray-900 truncate">
                {cert.url ? (
                  <a
                    href={cert.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-brand-600 transition-colors"
                  >
                    {cert.name}
                  </a>
                ) : (
                  cert.name
                )}
              </h3>
              <p className="text-xs text-gray-500 mt-0.5">{cert.issuer}</p>
              <div className="flex gap-3 mt-1 text-xs text-gray-400">
                <span>Issued {new Date(cert.issueDate).getFullYear()}</span>
                {cert.expiryDate && <span>· Expires {new Date(cert.expiryDate).getFullYear()}</span>}
                {cert.credentialId && <span>· ID: {cert.credentialId}</span>}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
