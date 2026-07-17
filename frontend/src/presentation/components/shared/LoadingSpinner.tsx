export function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
      <div className="w-12 h-12 border-4 border-gray-200 border-t-brand-500 rounded-full animate-spin" />
      <p className="text-gray-500 text-sm">Loading resume data...</p>
    </div>
  )
}
