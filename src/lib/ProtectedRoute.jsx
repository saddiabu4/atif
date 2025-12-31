import { useAuth } from "@/lib/authContext"
import { Navigate } from "react-router-dom"

export function ProtectedRoute({ children }) {
	const { isAuthenticated, isLoading } = useAuth()

	if (isLoading) {
		return (
			<div className='flex items-center justify-center min-h-screen bg-white'>
				<div className='text-center'>
					<div className='w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4' />
					<p className='text-gray-600'>Yuklanmoqda...</p>
				</div>
			</div>
		)
	}

	if (!isAuthenticated) {
		return <Navigate to='/auth' replace />
	}

	return children
}
