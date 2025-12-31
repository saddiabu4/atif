import { AdminPanel } from "@/pages/admin/Panel"
import { DriverPanel } from "@/pages/driver/Panel"
import { UserPanel } from "@/pages/user/Panel"
import { AnimatePresence } from "framer-motion"
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"

function App() {
	return (
		<BrowserRouter>
			<AnimatePresence mode='wait'>
				<Routes>
					{/* User Panel - Default & Fallback */}
					<Route path='/' element={<UserPanel />} />
					<Route path='/user/*' element={<UserPanel />} />

					{/* Driver Panel */}
					<Route path='/driver/*' element={<DriverPanel />} />

					{/* Admin Panel */}
					<Route path='/admin/*' element={<AdminPanel />} />

					{/* Fallback */}
					<Route path='*' element={<Navigate to='/' />} />
				</Routes>
			</AnimatePresence>
		</BrowserRouter>
	)
}

export default App
