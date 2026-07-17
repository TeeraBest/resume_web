import { useResumeViewModel } from '@presentation/viewmodels/useResumeViewModel'
import { ProfileSection } from '@presentation/components/resume/ProfileSection'
import { ExperienceSection } from '@presentation/components/resume/ExperienceSection'
import { EducationSection } from '@presentation/components/resume/EducationSection'
import { SkillsSection } from '@presentation/components/resume/SkillsSection'
import { ProjectsSection } from '@presentation/components/resume/ProjectsSection'
import { CertificationsSection } from '@presentation/components/resume/CertificationsSection'
import { LoadingSpinner } from '@presentation/components/shared/LoadingSpinner'
import { ErrorMessage } from '@presentation/components/shared/ErrorMessage'

export function ResumePage() {
  const vm = useResumeViewModel()

  if (vm.isLoading) return <LoadingSpinner />

  if (vm.isError) {
    return (
      <ErrorMessage
        message={vm.error?.message ?? 'Could not load resume data. Make sure the API is running.'}
        onRetry={() => vm.refetch()}
      />
    )
  }

  if (!vm.profile) return null

  return (
    <div className="min-h-screen bg-gray-50">
      <ProfileSection profile={vm.profile} yearsOfExperience={vm.totalYearsOfExperience} />

      <main className="max-w-4xl mx-auto px-6 pb-20">
        <ExperienceSection experiences={vm.experiences} />
        <SkillsSection categories={vm.skills} />
        <ProjectsSection projects={vm.projects} />
        <EducationSection education={vm.education} />
        <CertificationsSection certifications={vm.certifications} />
      </main>

      {vm.isFetching && !vm.isLoading && (
        <div className="fixed bottom-4 right-4 bg-brand-600 text-white text-xs px-3 py-1.5 rounded-full shadow-lg">
          Refreshing...
        </div>
      )}
    </div>
  )
}
