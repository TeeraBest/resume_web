import type { FullResume } from '@core/models/resume.model'
import type { IResumeRepository } from '@domain/interfaces/IResumeRepository'

export class GetResumeUseCase {
  constructor(private readonly repository: IResumeRepository) {}

  async execute(): Promise<FullResume> {
    return this.repository.getFullResume()
  }
}
