export interface ApiResponse<T> {
  success: boolean
  data: T
  meta: {
    cached: boolean
    timestamp: string
    total?: number
  }
}

export interface ApiError {
  success: false
  error: {
    code: string
    message: string
  }
}
