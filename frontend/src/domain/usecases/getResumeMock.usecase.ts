import type { FullResume } from '@core/models/resume.model'
import { MOCK_RESUME } from '@presentation/modern/data/mockResume'

/**
 * Drop-in replacement for GetResumeUseCase that returns mock data
 * without hitting any repository or API.
 * Swap back to GetResumeUseCase when the real API is available.
 */
export class GetResumeMockUseCase {
  execute(): FullResume {
    return MOCK_RESUME
  }
}
