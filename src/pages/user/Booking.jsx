import { Container, Header } from "@/components/Layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { orderAPI } from "@/lib/api"
import { MapPin, Zap } from "lucide-react"
import { useState } from "react"

const CURRENT_USER_ID = "user_1"

export function UserBooking() {
	const [pickup, setPickup] = useState("")
	const [destination, setDestination] = useState("")
	const [estimatedPrice, setEstimatedPrice] = useState(null)
	const [loading, setLoading] = useState(false)
	const [toasts, setToasts] = useState([])
	const [orderCreated, setOrderCreated] = useState(null)

	const estimatePrice = async () => {
		if (!pickup || !destination) {
			showToast("Please enter both pickup and destination", "error")
			return
		}

		setLoading(true)
		// Simulate distance calculation
		const basePrice = 10
		const pricePerKm = 2.5
		const estimatedDistance = Math.random() * 30 + 5 // 5-35 km
		const estimated = basePrice + estimatedDistance * pricePerKm

		await new Promise((r) => setTimeout(r, 500))
		setEstimatedPrice({
			distance: estimatedDistance,
			fare: estimated,
			duration: Math.ceil((estimatedDistance / 60) * 45) + " mins",
		})
		setLoading(false)
	}

	const handleBookRide = async () => {
		if (!estimatedPrice) return

		setLoading(true)
		const order = await orderAPI.create({
			userId: CURRENT_USER_ID,
			pickup: {
				address: pickup,
				lat: 24.7136,
				lng: 46.6753,
			},
			destination: {
				address: destination,
				lat: 21.5433,
				lng: 39.1728,
			},
			distance: estimatedPrice.distance,
			duration: estimatedPrice.duration,
			fare: estimatedPrice.fare,
			commission: estimatedPrice.fare * 0.15,
		})

		// Simulate driver acceptance after 2-3 seconds
		setTimeout(async () => {
			await orderAPI.assignDriver(order.id, "driver_2")
			await orderAPI.updateStatus(order.id, "active")
			setOrderCreated((prev) => ({
				...prev,
				status: "active",
				driverId: "driver_2",
			}))
			showToast("Driver found! Mohammed is on the way...")
		}, 2500)

		setOrderCreated(order)
		setLoading(false)
		showToast("Booking confirmed! Finding the best driver...")
	}

	const showToast = (message, type = "success") => {
		const id = Date.now()
		setToasts((prev) => [...prev, { id, message, type }])
		setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), 3000)
	}

	if (orderCreated) {
		const isDriverAssigned = orderCreated.status === "active"

		return (
			<>
				<Header
					title={isDriverAssigned ? "Driver Assigned" : "Ride Booked"}
					subtitle={
						isDriverAssigned
							? "Your driver is on the way..."
							: "Finding the best driver for you..."
					}
				/>
				<Container>
					<Card className='max-w-md mx-auto'>
						<CardContent className='pt-12 text-center pb-12'>
							{!isDriverAssigned && (
								<>
									<div className='mb-6'>
										<div className='inline-block animate-spin'>
											<Zap className='w-12 h-12 text-blue-500' />
										</div>
									</div>
									<h2 className='text-2xl font-bold mb-2'>
										Finding Your Driver
									</h2>
									<p className='text-gray-600 mb-4'>
										We're searching for the nearest available driver...
									</p>
								</>
							)}

							{isDriverAssigned && (
								<>
									<div className='mb-6'>
										<div className='inline-block w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center'>
											<span className='text-3xl'>👤</span>
										</div>
									</div>
									<h2 className='text-2xl font-bold mb-1'>
										Mohammed Al-Rashid
									</h2>
									<p className='text-gray-600 mb-4 text-sm'>
										⭐ 4.9 • 2.5 km away
									</p>
									<p className='text-sm text-gray-600 mb-6'>
										Silver Honda Civic
									</p>
									<p className='text-sm text-gray-600 mb-6'>
										License Plate: KSA 2024
									</p>
								</>
							)}

							<div className='bg-blue-50 rounded-lg p-4 mb-6 text-left'>
								<div className='space-y-2 text-sm'>
									<div className='flex items-center gap-2'>
										<MapPin className='w-4 h-4 text-blue-500' />
										<span>{orderCreated.pickup.address}</span>
									</div>
									<div className='flex items-center gap-2'>
										<MapPin className='w-4 h-4 text-red-500' />
										<span>{orderCreated.destination.address}</span>
									</div>
									<div className='pt-2 border-t'>
										<p className='font-bold text-lg'>
											SAR {orderCreated.fare.toFixed(2)}
										</p>
									</div>
								</div>
							</div>

							<Button
								variant='secondary'
								className='w-full'
								onClick={() => {
									setOrderCreated(null)
									setEstimatedPrice(null)
									setPickup("")
									setDestination("")
								}}
							>
								Book Another Ride
							</Button>
						</CardContent>
					</Card>
				</Container>
			</>
		)
	}

	return (
		<>
			<Header title='Book a Ride' subtitle='Request a ride now' />
			<Container>
				<Card className='max-w-md mx-auto'>
					<CardContent className='pt-6'>
						<div className='space-y-4'>
							<div>
								<label className='block text-sm font-medium mb-2'>
									Pickup Location
								</label>
								<Input
									placeholder='Enter pickup address'
									value={pickup}
									onChange={(e) => setPickup(e.target.value)}
									className='w-full'
								/>
							</div>

							<div>
								<label className='block text-sm font-medium mb-2'>
									Destination
								</label>
								<Input
									placeholder='Enter destination address'
									value={destination}
									onChange={(e) => setDestination(e.target.value)}
									className='w-full'
								/>
							</div>

							<Button
								onClick={estimatePrice}
								disabled={loading || !pickup || !destination}
								className='w-full'
							>
								{loading ? "Estimating..." : "Get Estimate"}
							</Button>

							{estimatedPrice && (
								<div className='space-y-4'>
									<div className='border-t pt-4'>
										<div className='bg-blue-50 rounded-lg p-4 space-y-3'>
											<div className='flex justify-between items-center'>
												<span className='text-gray-600'>Distance</span>
												<span className='font-bold'>
													{estimatedPrice.distance.toFixed(1)} km
												</span>
											</div>
											<div className='flex justify-between items-center'>
												<span className='text-gray-600'>
													Estimated Duration
												</span>
												<span className='font-bold'>
													{estimatedPrice.duration}
												</span>
											</div>
											<div className='flex justify-between items-center border-t pt-3'>
												<span className='font-semibold'>Total Fare</span>
												<span className='text-2xl font-bold text-green-600'>
													SAR {estimatedPrice.fare.toFixed(2)}
												</span>
											</div>
										</div>
									</div>

									<Button
										onClick={handleBookRide}
										disabled={loading}
										className='w-full bg-green-600 hover:bg-green-700'
									>
										{loading ? "Booking..." : "Confirm Booking"}
									</Button>
								</div>
							)}
						</div>
					</CardContent>
				</Card>
			</Container>

			{/* Toast notifications */}
			<div className='fixed bottom-4 right-4 space-y-2 z-50'>
				{toasts.map((toast) => (
					<div
						key={toast.id}
						className={`text-white px-4 py-3 rounded-lg shadow-lg ${
							toast.type === "error" ? "bg-red-500" : "bg-green-500"
						}`}
					>
						{toast.message}
					</div>
				))}
			</div>
		</>
	)
}
