import {
	Container,
	Header,
	MainContent,
	Sidebar,
	SidebarNav,
	SidebarNavItem,
} from "@/components/Layout"
import { motion } from "framer-motion"
import { BarChart3, Gauge, LogOut, Settings, Truck, Users } from "lucide-react"
import { useState } from "react"
import { AdminDashboard } from "./Dashboard"
import { AdminDrivers } from "./Drivers"
import { AdminOrders } from "./Orders"
import { AdminPayments } from "./Payments"
import { AdminSettings } from "./Settings"
import { AdminUsers } from "./Users"

const navItems = [
	{
		id: "dashboard",
		label: "Dashboard",
		icon: Gauge,
	},
	{
		id: "users",
		label: "Foydalanuvchilar",
		icon: Users,
	},
	{
		id: "drivers",
		label: "Haydovchilar",
		icon: Truck,
	},
	{
		id: "orders",
		label: "Buyurtmalar",
		icon: BarChart3,
	},
	{
		id: "payments",
		label: "To'lovlar",
		icon: BarChart3,
	},
	{
		id: "settings",
		label: "Sozlamalar",
		icon: Settings,
	},
]

export function AdminPanel() {
	const [activeTab, setActiveTab] = useState("dashboard")

	const handleLogout = () => {
		window.location.href = "/"
	}

	return (
		<div className='flex h-screen bg-slate-50 overflow-hidden'>
			{/* Sidebar */}
			<Sidebar>
				<div className='mb-8'>
					<h2 className='text-xl font-bold text-white'>Atif Admin</h2>
					<p className='text-slate-400 text-sm mt-1'>Platform boshqarish</p>
				</div>

				<SidebarNav>
					{navItems.map((item) => (
						<SidebarNavItem
							key={item.id}
							icon={item.icon}
							label={item.label}
							active={activeTab === item.id}
							onClick={() => setActiveTab(item.id)}
						/>
					))}
				</SidebarNav>

				<div className='border-t border-slate-700 mt-8 pt-8'>
					<button
						onClick={handleLogout}
						className='w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-slate-300 hover:bg-slate-800 hover:text-slate-100 transition-all duration-200'
					>
						<LogOut className='w-5 h-5' />
						<span>Chiqish</span>
					</button>
				</div>
			</Sidebar>

			{/* Main Content Area */}
			<div className='flex-1 flex flex-col overflow-hidden'>
				<Header
					title={navItems.find((n) => n.id === activeTab)?.label || "Dashboard"}
					subtitle='Transportasyon platformasi'
				/>

				<MainContent>
					<Container>
						<motion.div
							key={activeTab}
							initial={{ opacity: 0, y: 10 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0, y: -10 }}
							transition={{ duration: 0.2 }}
						>
							{activeTab === "dashboard" && <AdminDashboard />}
							{activeTab === "users" && <AdminUsers />}
							{activeTab === "drivers" && <AdminDrivers />}
							{activeTab === "orders" && <AdminOrders />}
							{activeTab === "payments" && <AdminPayments />}
							{activeTab === "settings" && <AdminSettings />}
						</motion.div>
					</Container>
				</MainContent>
			</div>
		</div>
	)
}
