interface Props {
  message?: string
  onRetry?: () => void
}

export function ErrorMessage({ message = 'Failed to load data.', onRetry }: Props) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] gap-4 text-center px-6">
      <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center text-2xl">
        ⚠️
      </div>
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-1">Something went wrong</h3>
        <p className="text-gray-500 text-sm max-w-md">{message}</p>
      </div>
      {onRetry && (
        <button
          onClick={onRetry}
          className="px-4 py-2 bg-brand-600 text-white rounded-lg text-sm font-medium hover:bg-brand-700 transition-colors"
        >
          Try again
        </button>
      )}
    </div>
  )
}
