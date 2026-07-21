import { HashRouter, Routes, Route, Navigate } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { Navbar } from '@presentation/components/layout/Navbar'
// import { HomePage } from '@presentation/views/HomePage'
import { ResumePage } from '@presentation/views/ResumePage'
import { ResumeModernPage } from '@presentation/modern/ResumeModernPage'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      retry: 2,
    },
  },
})

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <HashRouter>
        <Routes>
          <Route path="/" element={<ResumeModernPage />} />
          <Route path="/resume_modern" element={<Navigate to="/" replace />} />
          <Route
            path="*"
            element={
              <>
                <Navbar />
                <Routes>
                  {/* <Route path="/home" element={<HomePage />} /> */}
                  <Route path="/resume" element={<ResumePage />} />
                </Routes>
              </>
            }
          />
        </Routes>
      </HashRouter>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}
