import { Container, Header } from "@/components/Layout"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
	Dialog,
	DialogBody,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog"
import { orderAPI } from "@/lib/api"
import { MapPin, Star } from "lucide-react"
import { useEffect, useState } from "react"

const CURRENT_USER_ID = "user_1"

export function UserHistory() {
	const [orders, setOrders] = useState([])
	const [loading, setLoading] = useState(true)
	const [selectedOrder, setSelectedOrder] = useState(null)
	const [ratingOpen, setRatingOpen] = useState(false)
	const [rating, setRating] = useState(5)

	useEffect(() => {
		loadOrders()
	}, [])

	const loadOrders = async () => {
		setLoading(true)
		const allOrders = await orderAPI.getAll()
		const userOrders = allOrders.filter((o) => o.userId === CURRENT_USER_ID)
		setOrders(
			userOrders.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
		)
		setLoading(false)
	}

	const handleRate = async () => {
		if (!selectedOrder) return

		const review = `Great experience! Rating: ${rating} stars`
		await orderAPI.addRating(selectedOrder.id, rating, review)
		setRatingOpen(false)
		setSelectedOrder(null)
		setRating(5)
		await loadOrders()
	}

	if (loading) return <div className='p-8 text-slate-600'>Loading...</div>

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
		<>
			<Header title='Trip History' subtitle='Your past rides and trips' />
			<Container>
				<div className='space-y-4'>
					{orders.length === 0 ? (
						<Card>
							<CardContent className='pt-12 text-center pb-12'>
								<p className='text-slate-600 text-lg'>No trips yet</p>
								<p className='text-slate-400 text-sm mt-2'>
									Book your first ride to get started
								</p>
							</CardContent>
						</Card>
					) : (
						orders.map((order) => (
							<Card
								key={order.id}
								className='hover:shadow-lg transition-shadow'
							>
								<CardContent className='pt-6'>
									<div className='flex items-start justify-between mb-4'>
										<div className='flex-1'>
											<div className='flex items-start gap-3 mb-3'>
												<MapPin className='w-5 h-5 text-blue-500 shrink-0 mt-0.5' />
												<div>
													<p className='font-semibold text-sm'>
														{order.pickup.address}
													</p>
													<p className='text-xs text-slate-600'>From</p>
												</div>
											</div>
											<div className='flex items-start gap-3'>
												<MapPin className='w-5 h-5 text-red-500 shrink-0 mt-0.5' />
												<div>
													<p className='font-semibold text-sm'>
														{order.destination.address}
													</p>
													<p className='text-xs text-slate-600'>To</p>
												</div>
											</div>
										</div>

										<div className='text-right'>
											<p className='text-2xl font-bold text-emerald-600'>
												SAR {order.fare.toFixed(2)}
											</p>
											<Badge variant={getStatusColor(order.status)}>
												{order.status}
											</Badge>
										</div>
									</div>

									<div className='grid grid-cols-3 gap-3 py-3 border-t border-b bg-slate-50 rounded p-3 mb-4'>
										<div>
											<p className='text-xs text-slate-600'>Distance</p>
											<p className='font-semibold text-sm'>
												{order.distance} km
											</p>
										</div>
										<div>
											<p className='text-xs text-slate-600'>Duration</p>
											<p className='font-semibold text-sm'>{order.duration}</p>
										</div>
										<div>
											<p className='text-xs text-slate-600'>Date</p>
											<p className='font-semibold text-sm'>
												{new Date(order.createdAt).toLocaleDateString()}
											</p>
										</div>
									</div>

									{order.status === "completed" && (
										<div className='flex items-center justify-between'>
											{order.rating ? (
												<div className='flex items-center gap-2'>
													<div className='flex gap-1'>
														{Array.from({ length: 5 }).map((_, i) => (
															<Star
																key={i}
																className={`w-4 h-4 ${
																	i < order.rating
																		? "fill-yellow-400 text-yellow-400"
																		: "text-slate-300"
																}`}
															/>
														))}
													</div>
													<span className='text-sm text-slate-600'>
														{order.rating} stars
													</span>
												</div>
											) : (
												<Button
													size='sm'
													variant='secondary'
													onClick={() => {
														setSelectedOrder(order)
														setRatingOpen(true)
													}}
												>
													Rate Trip
												</Button>
											)}
										</div>
									)}
								</CardContent>
							</Card>
						))
					)}
				</div>
			</Container>

			{/* Rating Dialog */}
			<Dialog open={ratingOpen} onOpenChange={setRatingOpen}>
				<div className='fixed inset-0 z-50 bg-black/50 flex items-center justify-center'>
					<div className='bg-white rounded-lg shadow-lg max-w-md w-full mx-4'>
						<DialogHeader>
							<DialogTitle>Rate Your Trip</DialogTitle>
						</DialogHeader>
						<DialogBody>
							<div className='py-6 text-center'>
								<p className='text-slate-600 mb-6'>How was your experience?</p>
								<div className='flex justify-center gap-3 mb-6'>
									{Array.from({ length: 5 }).map((_, i) => (
										<button
											key={i}
											onClick={() => setRating(i + 1)}
											className='transition-transform hover:scale-110'
										>
											<Star
												className={`w-8 h-8 cursor-pointer ${
													i < rating
														? "fill-yellow-400 text-yellow-400"
														: "text-slate-300"
												}`}
											/>
										</button>
									))}
								</div>
								<p className='text-sm font-semibold'>{rating} out of 5 stars</p>
							</div>
						</DialogBody>
						<DialogFooter>
							<Button
								variant='secondary'
								onClick={() => setRatingOpen(false)}
								className='flex-1'
							>
								Cancel
							</Button>
							<Button onClick={handleRate} className='flex-1'>
								Submit Rating
							</Button>
						</DialogFooter>
					</div>
				</div>
			</Dialog>
		</>
	)
}
