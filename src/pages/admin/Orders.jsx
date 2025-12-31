import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table"
import { orderAPI } from "@/lib/api"
import { motion } from "framer-motion"
import { Navigation } from "lucide-react"
import { useEffect, useState } from "react"

export function AdminOrders() {
	const [orders, setOrders] = useState([])
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		loadOrders()
	}, [])

	const loadOrders = async () => {
		setLoading(true)
		const data = await orderAPI.getAll()
		setOrders(data)
		setLoading(false)
	}

	const handleCancelOrder = async (orderId) => {
		await orderAPI.updateStatus(orderId, "cancelled")
		await loadOrders()
	}

	if (loading) {
		return (
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ duration: 0.2 }}
				className='p-8 flex justify-center'
			>
				<Navigation className='w-8 h-8 text-slate-400' />
			</motion.div>
		)
	}

	const getStatusColor = (status) => {
		switch (status) {
			case "completed":
				return "success"
			case "active":
				return "secondary"
			case "pending":
				return "warning"
			case "cancelled":
				return "destructive"
			default:
				return "secondary"
		}
	}

	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ duration: 0.3 }}
		>
			<Card className='border-0 shadow-sm'>
				<CardHeader className='border-b border-slate-100'>
					<CardTitle className='flex items-center gap-2'>
						<Navigation className='w-5 h-5 text-blue-600' />
						Barcha Buyurtmalar
					</CardTitle>
				</CardHeader>
				<CardContent className='pt-6'>
					{orders.length === 0 ? (
						<div className='text-center py-8'>
							<p className='text-slate-500'>Buyurtmalar topilmadi</p>
						</div>
					) : (
						<div className='overflow-x-auto'>
							<Table>
								<TableHeader>
									<TableRow className='border-b border-slate-200 hover:bg-transparent'>
										<TableHead className='text-slate-600'>
											Buyurtma ID
										</TableHead>
										<TableHead className='text-slate-600'>Yo'nalish</TableHead>
										<TableHead className='text-slate-600'>Masofasi</TableHead>
										<TableHead className='text-slate-600'>Haraj</TableHead>
										<TableHead className='text-slate-600'>Komissiya</TableHead>
										<TableHead className='text-slate-600'>Holat</TableHead>
										<TableHead className='text-slate-600'>Amallar</TableHead>
									</TableRow>
								</TableHeader>
								<TableBody>
									{orders.map((order, idx) => (
										<motion.tr
											key={order.id}
											initial={{ opacity: 0, y: 10 }}
											animate={{ opacity: 1, y: 0 }}
											transition={{ delay: idx * 0.05 }}
											className='border-b border-slate-100 hover:bg-slate-50 transition-colors'
										>
											<TableCell className='font-medium text-xs text-slate-900'>
												{order.id}
											</TableCell>
											<TableCell>
												<div className='text-sm'>
													<p className='font-medium text-slate-900 truncate max-w-xs'>
														{order.pickup.address?.split(",")[0]}
													</p>
													<p className='text-slate-600 text-xs truncate max-w-xs'>
														→ {order.destination.address?.split(",")[0]}
													</p>
												</div>
											</TableCell>
											<TableCell className='text-slate-600'>
												{order.distance?.toFixed(1)} km
											</TableCell>
											<TableCell className='font-medium text-slate-900'>
												{order.fare?.toLocaleString("uz-UZ")} so'm
											</TableCell>
											<TableCell className='text-slate-600'>
												{order.commission?.toLocaleString("uz-UZ")} so'm
											</TableCell>
											<TableCell>
												<Badge
													variant={getStatusColor(order.status)}
													className='text-xs'
												>
													{order.status}
												</Badge>
											</TableCell>
											<TableCell>
												{order.status === "pending" ? (
													<Button
														size='sm'
														variant='destructive'
														className='text-xs'
														onClick={() => handleCancelOrder(order.id)}
													>
														Bekor qilish
													</Button>
												) : (
													<span className='text-xs text-slate-400'>—</span>
												)}
											</TableCell>
										</motion.tr>
									))}
								</TableBody>
							</Table>
						</div>
					)}
				</CardContent>
			</Card>
		</motion.div>
	)
}
