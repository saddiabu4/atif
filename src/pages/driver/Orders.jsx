import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { orderAPI } from "@/lib/api"
import { AnimatePresence, motion } from "framer-motion"
import { AlertCircle, CheckCircle2, Clock, MapPin } from "lucide-react"
import { useEffect, useState } from "react"

const CURRENT_DRIVER_ID = "driver_1"

const containerVariants = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: {
			staggerChildren: 0.1,
			delayChildren: 0.2,
		},
	},
}

const itemVariants = {
	hidden: { opacity: 0, y: 20 },
	visible: {
		opacity: 1,
		y: 0,
		transition: { type: "spring", stiffness: 100, damping: 12 },
	},
	exit: { opacity: 0, y: -20 },
}

export function DriverOrders() {
	const [orders, setOrders] = useState([])
	const [loading, setLoading] = useState(true)
	const [toasts, setToasts] = useState([])
	const [selectedOrder, setSelectedOrder] = useState(null)

	useEffect(() => {
		loadOrders()
	}, [])

	const loadOrders = async () => {
		setLoading(true)
		const allOrders = await orderAPI.getAll()
		// Filter orders for this driver or pending orders
		const driverOrders = allOrders.filter(
			(o) =>
				o.driverId === CURRENT_DRIVER_ID ||
				(o.status === "pending" && !o.driverId)
		)
		setOrders(driverOrders)
		setLoading(false)
	}

	const handleAcceptOrder = async (orderId) => {
		await orderAPI.assignDriver(orderId, CURRENT_DRIVER_ID)
		await orderAPI.updateStatus(orderId, "active")
		await loadOrders()
		showToast("Buyurtma qabul qilindi! Siz yo'ldansiz.")
	}

	const handleRejectOrder = async (orderId) => {
		// Just remove from view
		setOrders((prev) => prev.filter((o) => o.id !== orderId))
		showToast("Buyurtma rad etildi")
	}

	const handleCompleteOrder = async (orderId) => {
		await orderAPI.updateStatus(orderId, "completed")
		await loadOrders()
		showToast("Buyurtma muvaffaqiyatli tugallandi!")
	}

	const showToast = (message) => {
		const id = Date.now()
		setToasts((prev) => [...prev, { id, message }])
		setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), 3000)
	}

	if (loading) return <div className='p-8'>Yuklanmoqda...</div>

	const pendingOrders = orders.filter((o) => o.status === "pending")
	const activeOrders = orders.filter((o) => o.status === "active")
	const completedOrders = orders.filter((o) => o.status === "completed")

	const OrderCard = ({ order, showActions = true }) => (
		<motion.div
			variants={itemVariants}
			exit={{ opacity: 0, y: -20 }}
			className='mb-4'
		>
			<Card className='hover:shadow-lg transition-shadow duration-300'>
				<CardContent className='pt-6'>
					<div className='space-y-4'>
						{/* Route Info */}
						<div className='space-y-3'>
							<div className='flex items-start gap-3'>
								<MapPin className='w-5 h-5 text-blue-500 shrink-0 mt-0.5' />
								<div className='flex-1'>
									<p className='font-semibold text-sm text-slate-900'>
										{order.pickup.address}
									</p>
									<p className='text-xs text-slate-600'>Pickup</p>
								</div>
							</div>
							<div className='flex items-start gap-3'>
								<MapPin className='w-5 h-5 text-red-500 shrink-0 mt-0.5' />
								<div className='flex-1'>
									<p className='font-semibold text-sm text-slate-900'>
										{order.destination.address}
									</p>
									<p className='text-xs text-slate-600'>Destination</p>
								</div>
							</div>
						</div>

						{/* Details Grid */}
						<div className='grid grid-cols-1 gap-3 p-3 bg-slate-50 rounded-lg'>
							<motion.div whileHover={{ scale: 1.05 }}>
								<p className='text-xs text-slate-600 font-medium'>Distance</p>
								<p className='font-bold text-slate-900 text-lg'>
									{order.distance} km
								</p>
							</motion.div>
							<motion.div whileHover={{ scale: 1.05 }}>
								<p className='text-xs text-slate-600 font-medium'>Duration</p>
								<p className='font-bold text-slate-900 text-lg'>
									{order.duration}
								</p>
							</motion.div>
							<motion.div whileHover={{ scale: 1.05 }}>
								<p className='text-xs text-slate-600 font-medium'>Fare</p>
								<p className='font-bold text-emerald-600 text-lg'>
									SAR {order.fare.toFixed(2)}
								</p>
							</motion.div>
						</div>

						{/* Status */}
						<div className='flex items-center justify-between pt-2 border-t border-slate-200'>
							<Badge
								variant={
									order.status === "pending"
										? "secondary"
										: order.status === "active"
										? "default"
										: "outline"
								}
								className={
									order.status === "completed"
										? "bg-emerald-50 text-emerald-700 border-emerald-200"
										: ""
								}
							>
								{order.status === "pending" && (
									<Clock className='w-3 h-3 mr-1' />
								)}
								{order.status === "active" && (
									<AlertCircle className='w-3 h-3 mr-1' />
								)}
								{order.status === "completed" && (
									<CheckCircle2 className='w-3 h-3 mr-1' />
								)}
								{order.status.charAt(0).toUpperCase() + order.status.slice(1)}
							</Badge>
							<span className='text-xs text-slate-500'>
								{new Date(order.createdAt).toLocaleTimeString([], {
									hour: "2-digit",
									minute: "2-digit",
								})}
							</span>
						</div>

						{/* Actions */}
						{showActions && (
							<motion.div
								layout
								className='flex gap-2 pt-2 border-t border-slate-200'
							>
								{order.status === "pending" && (
									<>
										<Button
											className='flex-1 bg-emerald-600 hover:bg-emerald-700'
											onClick={() => handleAcceptOrder(order.id)}
										>
											Accept
										</Button>
										<Button
											className='flex-1'
											variant='outline'
											onClick={() => handleRejectOrder(order.id)}
										>
											Reject
										</Button>
									</>
								)}
								{order.status === "active" && (
									<Button
										className='w-full'
										onClick={() => handleCompleteOrder(order.id)}
									>
										Mark as Complete
									</Button>
								)}
								{order.status === "completed" && (
									<div className='w-full bg-emerald-50 text-emerald-700 py-2 rounded-lg text-center text-sm font-medium border border-emerald-200'>
										✓ Completed
									</div>
								)}
							</motion.div>
						)}
					</div>
				</CardContent>
			</Card>
		</motion.div>
	)

	return (
		<motion.div
			className='w-full pb-8'
			variants={containerVariants}
			initial='hidden'
			animate='visible'
		>
			{/* Header */}
			<motion.div variants={itemVariants} className='mb-8'>
				<h1 className='text-3xl font-bold text-slate-900'>Orders</h1>
				<p className='text-slate-600 text-sm mt-1'>
					Available and active orders
				</p>
			</motion.div>

			<motion.div variants={containerVariants}>
				<AnimatePresence mode='popLayout'>
					{pendingOrders.length > 0 && (
						<motion.div key='pending' variants={itemVariants} className='mb-8'>
							<div className='flex items-center gap-2 mb-4'>
								<AlertCircle className='w-6 h-6 text-amber-500' />
								<h2 className='text-xl font-bold text-slate-900'>
									Available Orders
									<span className='ml-2 px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-sm font-semibold'>
										{pendingOrders.length}
									</span>
								</h2>
							</div>
							<motion.div variants={containerVariants}>
								{pendingOrders.map((order) => (
									<OrderCard key={order.id} order={order} showActions={true} />
								))}
							</motion.div>
						</motion.div>
					)}

					{activeOrders.length > 0 && (
						<motion.div key='active' variants={itemVariants} className='mb-8'>
							<div className='flex items-center gap-2 mb-4'>
								<Clock className='w-6 h-6 text-blue-500' />
								<h2 className='text-xl font-bold text-slate-900'>
									Active Orders
									<span className='ml-2 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold'>
										{activeOrders.length}
									</span>
								</h2>
							</div>
							<motion.div variants={containerVariants}>
								{activeOrders.map((order) => (
									<OrderCard key={order.id} order={order} showActions={true} />
								))}
							</motion.div>
						</motion.div>
					)}

					{completedOrders.length > 0 && (
						<motion.div
							key='completed'
							variants={itemVariants}
							className='mb-8'
						>
							<div className='flex items-center gap-2 mb-4'>
								<CheckCircle2 className='w-6 h-6 text-emerald-500' />
								<h2 className='text-xl font-bold text-slate-900'>
									Completed Orders
									<span className='ml-2 px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-sm font-semibold'>
										{completedOrders.length}
									</span>
								</h2>
							</div>
							<motion.div variants={containerVariants}>
								{completedOrders.slice(0, 3).map((order) => (
									<OrderCard key={order.id} order={order} showActions={false} />
								))}
							</motion.div>
						</motion.div>
					)}

					{orders.length === 0 && (
						<motion.div variants={itemVariants}>
							<Card className='border-dashed'>
								<CardContent className='pt-12 text-center py-8'>
									<AlertCircle className='w-12 h-12 text-slate-400 mx-auto mb-4' />
									<p className='text-slate-600 text-lg font-medium'>
										No orders available right now
									</p>
									<p className='text-slate-500 text-sm mt-2'>
										Go online to receive ride requests
									</p>
								</CardContent>
							</Card>
						</motion.div>
					)}
				</AnimatePresence>
			</motion.div>

			{/* Toast notifications */}
			<AnimatePresence>
				<div className='fixed bottom-4 right-4 space-y-2 z-50'>
					{toasts.map((toast) => (
						<motion.div
							key={toast.id}
							initial={{ opacity: 0, y: 20, scale: 0.9 }}
							animate={{ opacity: 1, y: 0, scale: 1 }}
							exit={{ opacity: 0, y: 20, scale: 0.9 }}
							className='bg-emerald-500 text-white px-4 py-3 rounded-lg shadow-lg'
						>
							{toast.message}
						</motion.div>
					))}
				</div>
			</AnimatePresence>
		</motion.div>
	)
}
