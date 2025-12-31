import { Grid } from "@/components/Layout"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { driverAPI, orderAPI, paymentAPI, userAPI } from "@/lib/api"
import { motion } from "framer-motion"
import { Activity, DollarSign, Truck, Users } from "lucide-react"
import { useEffect, useState } from "react"

export function AdminDashboard() {
	const [stats, setStats] = useState(null)
	const [orders, setOrders] = useState([])
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		loadDashboardData()
	}, [])

	const loadDashboardData = async () => {
		setLoading(true)
		try {
			const [allUsers, allDrivers, allOrders, paymentStats] = await Promise.all(
				[
					userAPI.getAll(),
					driverAPI.getAll(),
					orderAPI.getAll(),
					paymentAPI.getStats(),
				]
			)

			const activeUsers = allUsers.filter((u) => u.status === "active").length
			const activeDrivers = allDrivers.filter(
				(d) => d.status === "online"
			).length
			const totalOrders = allOrders.length
			const completedOrders = allOrders.filter(
				(o) => o.status === "completed"
			).length
			const activeOrders = allOrders.filter((o) => o.status === "active").length
			const totalRevenue = paymentStats.totalRevenue

			setStats({
				totalOrders,
				activeDrivers,
				totalRevenue,
				activeUsers,
				completedOrders,
				activeOrders,
				completionRate:
					totalOrders > 0
						? ((completedOrders / totalOrders) * 100).toFixed(1)
						: 0,
			})

			// Get 5 most recent orders
			const recentOrders = allOrders
				.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
				.slice(0, 5)
			setOrders(recentOrders)
		} catch (error) {
			console.error("Error loading dashboard:", error)
		}
		setLoading(false)
	}

	if (loading || !stats) {
		return (
			<div className='flex items-center justify-center h-96'>
				<motion.div
					animate={{ rotate: 360 }}
					transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
					className='p-3 bg-blue-100 rounded-full'
				>
					<Activity className='w-8 h-8 text-blue-600' />
				</motion.div>
			</div>
		)
	}

	const StatCard = ({ icon: Icon, label, value, trend = "up" }) => (
		<motion.div whileHover={{ translateY: -4 }} transition={{ duration: 0.2 }}>
			<Card className='border-0 shadow-sm hover:shadow-md transition-shadow'>
				<CardContent className='pt-6'>
					<div className='flex items-start justify-between'>
						<div>
							<p className='text-sm font-medium text-slate-600'>{label}</p>
							<p className='text-3xl font-bold text-slate-900 mt-2'>{value}</p>
						</div>
						<div className='p-3 bg-blue-50 rounded-lg'>
							<Icon className='w-6 h-6 text-blue-600' />
						</div>
					</div>
				</CardContent>
			</Card>
		</motion.div>
	)

	return (
		<>
			{/* KPI Grid */}
			<Grid cols={4} className='mb-8'>
				<StatCard
					icon={Activity}
					label='Total Orders'
					value={stats.totalOrders}
				/>
				<StatCard
					icon={Truck}
					label='Active Drivers'
					value={stats.activeDrivers}
				/>
				<StatCard
					icon={DollarSign}
					label='Total Revenue'
					value={`SAR ${stats.totalRevenue.toFixed(0)}`}
				/>
				<StatCard icon={Users} label='Active Users' value={stats.activeUsers} />
			</Grid>

			{/* Main Content Grid */}
			<Grid cols={2} className='mb-8'>
				{/* Recent Orders */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.1 }}
				>
					<Card className='border-0 shadow-sm h-full'>
						<CardHeader className='border-b border-slate-100 pb-4'>
							<CardTitle className='text-lg'>Recent Orders</CardTitle>
						</CardHeader>
						<CardContent className='pt-6'>
							{orders.length === 0 ? (
								<div className='text-center py-8'>
									<p className='text-slate-500'>No orders yet</p>
								</div>
							) : (
								<div className='space-y-4'>
									{orders.map((order, idx) => (
										<motion.div
											key={order.id}
											initial={{ opacity: 0, x: -10 }}
											animate={{ opacity: 1, x: 0 }}
											transition={{ delay: idx * 0.05 }}
											className='flex items-center justify-between pb-4 border-b border-slate-100 last:pb-0 last:border-0 hover:bg-slate-50 px-2 py-2 rounded transition-colors'
										>
											<div>
												<p className='font-medium text-sm text-slate-900'>
													{order.pickup.address?.split(",")[0] || "Trip"}
												</p>
												<p className='text-xs text-slate-500 mt-1'>
													{new Date(order.createdAt).toLocaleString()}
												</p>
											</div>
											<div className='text-right'>
												<p className='font-bold text-green-600 text-sm'>
													SAR {order.fare.toFixed(2)}
												</p>
												<Badge
													variant={
														order.status === "completed"
															? "success"
															: order.status === "active"
															? "secondary"
															: "outline"
													}
													className='text-xs mt-1'
												>
													{order.status}
												</Badge>
											</div>
										</motion.div>
									))}
								</div>
							)}
						</CardContent>
					</Card>
				</motion.div>

				{/* Performance Metrics */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.2 }}
				>
					<Card className='border-0 shadow-sm h-full'>
						<CardHeader className='border-b border-slate-100 pb-4'>
							<CardTitle className='text-lg'>Performance Metrics</CardTitle>
						</CardHeader>
						<CardContent className='pt-6'>
							<div className='space-y-6'>
								{/* Completion Rate */}
								<div>
									<div className='flex items-center justify-between mb-3'>
										<span className='text-sm font-medium text-slate-700'>
											Completion Rate
										</span>
										<span className='text-sm font-bold text-slate-900'>
											{stats.completionRate}%
										</span>
									</div>
									<div className='w-full bg-slate-100 rounded-full h-2 overflow-hidden'>
										<motion.div
											className='bg-linear-to-r from-green-500 to-emerald-500 h-2 rounded-full'
											initial={{ width: 0 }}
											animate={{
												width: `${Math.min(stats.completionRate, 100)}%`,
											}}
											transition={{ duration: 0.8, ease: "easeOut" }}
										/>
									</div>
								</div>

								{/* Active Orders */}
								<div>
									<div className='flex items-center justify-between mb-3'>
										<span className='text-sm font-medium text-slate-700'>
											Active Orders
										</span>
										<span className='text-sm font-bold text-slate-900'>
											{stats.activeOrders}
										</span>
									</div>
									<div className='w-full bg-slate-100 rounded-full h-2 overflow-hidden'>
										<motion.div
											className='bg-linear-to-r from-blue-500 to-cyan-500 h-2 rounded-full'
											initial={{ width: 0 }}
											animate={{ width: "60%" }}
											transition={{ duration: 0.8, ease: "easeOut" }}
										/>
									</div>
								</div>

								{/* Avg Rating */}
								<div>
									<div className='flex items-center justify-between mb-3'>
										<span className='text-sm font-medium text-slate-700'>
											Average Rating
										</span>
										<span className='text-sm font-bold text-slate-900'>
											4.7 / 5.0
										</span>
									</div>
									<div className='w-full bg-slate-100 rounded-full h-2 overflow-hidden'>
										<motion.div
											className='bg-linear-to-r from-purple-500 to-pink-500 h-2 rounded-full'
											initial={{ width: 0 }}
											animate={{ width: "94%" }}
											transition={{ duration: 0.8, ease: "easeOut" }}
										/>
									</div>
								</div>
							</div>
						</CardContent>
					</Card>
				</motion.div>
			</Grid>

			{/* Additional Stats */}
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ delay: 0.3 }}
			>
				<Card className='border-0 shadow-sm'>
					<CardHeader className='border-b border-slate-100 pb-4'>
						<CardTitle className='text-lg'>Quick Stats</CardTitle>
					</CardHeader>
					<CardContent className='pt-6'>
						<div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
							<div className='text-center p-4 bg-slate-50 rounded-lg'>
								<p className='text-2xl font-bold text-slate-900'>
									{stats.completedOrders}
								</p>
								<p className='text-sm text-slate-600 mt-1'>Completed Orders</p>
							</div>
							<div className='text-center p-4 bg-slate-50 rounded-lg'>
								<p className='text-2xl font-bold text-slate-900'>
									{stats.activeUsers}
								</p>
								<p className='text-sm text-slate-600 mt-1'>Active Users</p>
							</div>
							<div className='text-center p-4 bg-slate-50 rounded-lg'>
								<p className='text-2xl font-bold text-slate-900'>
									{stats.activeDrivers}
								</p>
								<p className='text-sm text-slate-600 mt-1'>Online Drivers</p>
							</div>
							<div className='text-center p-4 bg-slate-50 rounded-lg'>
								<p className='text-2xl font-bold text-green-600'>
									SAR {(stats.totalRevenue / 1000).toFixed(1)}k
								</p>
								<p className='text-sm text-slate-600 mt-1'>Total Revenue</p>
							</div>
						</div>
					</CardContent>
				</Card>
			</motion.div>
		</>
	)
}
