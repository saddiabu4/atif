import { AuthProvider } from "@/lib/authContext"
import { ProtectedRoute } from "@/lib/ProtectedRoute"
import { AdminPanel } from "@/pages/admin/Panel"
import { AuthPage } from "@/pages/auth/AuthPage"
import { DriverPanel } from "@/pages/driver/Panel"
import { UserPanel } from "@/pages/user/Panel"
import { AnimatePresence } from "framer-motion"
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"

function App() {
	return (
		<BrowserRouter>
			<AuthProvider>
				<AnimatePresence mode='wait'>
					<Routes>
						{/* Auth Routes */}
						<Route path='/auth' element={<AuthPage />} />

						{/* Protected Routes */}
						<Route
							path='/'
							element={
								<ProtectedRoute>
									<UserPanel />
								</ProtectedRoute>
							}
						/>
						<Route
							path='/user/*'
							element={
								<ProtectedRoute>
									<UserPanel />
								</ProtectedRoute>
							}
						/>
						<Route
							path='/driver/*'
							element={
								<ProtectedRoute>
									<DriverPanel />
								</ProtectedRoute>
							}
						/>
						<Route
							path='/admin/*'
							element={
								<ProtectedRoute>
									<AdminPanel />
								</ProtectedRoute>
							}
						/>

						{/* Fallback */}
						<Route path='*' element={<Navigate to='/' />} />
					</Routes>
				</AnimatePresence>
			</AuthProvider>
		</BrowserRouter>
	)
}

export default App
