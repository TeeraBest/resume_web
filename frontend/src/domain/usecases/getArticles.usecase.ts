import type { Article } from '@core/models/resume.model'
import type { IResumeRepository } from '@domain/interfaces/IResumeRepository'

export class GetArticlesUseCase {
  constructor(private readonly repository: IResumeRepository) {}

  async execute(): Promise<Article[]> {
    return this.repository.getArticles()
  }
}
