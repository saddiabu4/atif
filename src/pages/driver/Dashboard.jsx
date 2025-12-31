import { Container, Grid, Header } from "@/components/Layout"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Toggle } from "@/components/ui/toggle"
import { driverAPI } from "@/lib/api"
import { DollarSign, Navigation } from "lucide-react"
import { useEffect, useState } from "react"

const CURRENT_DRIVER_ID = "driver_1"

export function DriverDashboard() {
	const [driver, setDriver] = useState(null)
	const [isOnline, setIsOnline] = useState(false)
	const [loading, setLoading] = useState(true)
	const [toasts, setToasts] = useState([])

	useEffect(() => {
		loadDriver()
	}, [])

	const loadDriver = async () => {
		setLoading(true)
		const data = await driverAPI.getById(CURRENT_DRIVER_ID)
		setDriver(data)
		setIsOnline(data.status === "online")
		setLoading(false)
	}

	const handleToggleOnline = async (newStatus) => {
		await driverAPI.toggleOnlineStatus(CURRENT_DRIVER_ID, newStatus)
		setIsOnline(newStatus)
		await loadDriver()
		showToast(newStatus ? "Siz onlayn oldingiz" : "Siz oflayn oldingiz")
	}

	const showToast = (message) => {
		const id = Date.now()
		setToasts((prev) => [...prev, { id, message }])
		setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), 3000)
	}

	if (loading || !driver) return <div className='p-8'>Yuklanmoqda...</div>

	return (
		<>
			<Header
				title='Haydovchi Dashboard'
				subtitle={`Xush kelibsiz, ${driver.name}`}
			>
				<div className='flex items-center gap-4'>
					<div className='text-right'>
						<p className='text-sm text-gray-600'>Holati</p>
						<p className='text-lg font-bold'>{driver.status.toUpperCase()}</p>
					</div>
					<Toggle
						checked={isOnline}
						onCheckedChange={handleToggleOnline}
						className='w-14 h-8'
					/>
				</div>
			</Header>

			<Container>
				<Grid cols={3} className='mb-8 sm:grid-cols-1 md:grid-cols-2'>
					{" "}
					<Card>
						<CardContent className='pt-6'>
							<div className='flex items-center justify-between'>
								<div>
									<p className='text-sm text-gray-600'>Bugungi daromad</p>
									<p className='text-3xl font-bold mt-2'>
										{driver.earnings.today.toLocaleString("uz-UZ")} so'm
									</p>
								</div>
								<DollarSign className='w-12 h-12 text-green-500 opacity-20' />
							</div>
						</CardContent>
					</Card>
					<Card>
						<CardContent className='pt-6'>
							<div className='flex items-center justify-between'>
								<div>
									<p className='text-sm text-gray-600'>Bu oy</p>
									<p className='text-3xl font-bold mt-2'>
										{driver.earnings.thisMonth.toLocaleString("uz-UZ")} so'm
									</p>
								</div>
								<DollarSign className='w-12 h-12 text-blue-500 opacity-20' />
							</div>
						</CardContent>
					</Card>
					<Card>
						<CardContent className='pt-6'>
							<div className='flex items-center justify-between'>
								<div>
									<p className='text-sm text-gray-600'>Jami safarlar</p>
									<p className='text-3xl font-bold mt-2'>{driver.totalTrips}</p>
								</div>
								<Navigation className='w-12 h-12 text-purple-500 opacity-20' />
							</div>
						</CardContent>
					</Card>
				</Grid>

				<Grid cols={2} className='lg:grid-cols-1'>
					{" "}
					<Card>
						<CardHeader>
							<CardTitle>Reyting va izohlar</CardTitle>
						</CardHeader>
						<CardContent>
							<div className='space-y-4'>
								<div>
									<div className='flex items-center gap-2 mb-2'>
										<span className='text-3xl font-bold'>
											{driver.averageRating}
										</span>
										<div className='text-yellow-500'>
											{"★".repeat(Math.floor(driver.averageRating))}
										</div>
									</div>
									<p className='text-sm text-gray-600'>
										{driver.reviewsCount} safar asosida
									</p>
								</div>

								<div className='pt-4 border-t'>
									<h4 className='font-semibold mb-3'>Yaqinda izohlar</h4>
									<div className='space-y-2 max-h-32 overflow-y-auto'>
										<div>
											<div className='flex items-center gap-1'>
												<span className='text-yellow-500'>★★★★★</span>
												<span className='text-xs text-gray-600'>
													Abdullayev Qayrat
												</span>
											</div>
											<p className='text-sm text-gray-600'>"Ajoyib xizmat!"</p>
										</div>
										<div>
											<div className='flex items-center gap-1'>
												<span className='text-yellow-500'>★★★★★</span>
												<span className='text-xs text-gray-600'>
													Anvarov Nodira
												</span>
											</div>
											<p className='text-sm text-gray-600'>
												"Juda professional haydovchi"
											</p>
										</div>
									</div>
								</div>
							</div>
						</CardContent>
					</Card>
					<Card>
						<CardHeader>
							<CardTitle>Verification Status</CardTitle>
						</CardHeader>
						<CardContent>
							<div className='space-y-3'>
								<div className='flex items-center justify-between'>
									<span className='font-medium'>Driver License</span>
									<Badge
										variant={
											driver.documents.license === "verified"
												? "success"
												: "warning"
										}
									>
										{driver.documents.license}
									</Badge>
								</div>
								<div className='flex items-center justify-between'>
									<span className='font-medium'>Vehicle Insurance</span>
									<Badge
										variant={
											driver.documents.insurance === "verified"
												? "success"
												: "warning"
										}
									>
										{driver.documents.insurance}
									</Badge>
								</div>
								<div className='flex items-center justify-between'>
									<span className='font-medium'>Vehicle Registration</span>
									<Badge
										variant={
											driver.documents.registration === "verified"
												? "success"
												: "warning"
										}
									>
										{driver.documents.registration}
									</Badge>
								</div>

								<div className='pt-4 border-t'>
									<h4 className='font-semibold mb-3'>Vehicle Info</h4>
									<div className='space-y-2 text-sm'>
										<div className='flex justify-between'>
											<span className='text-gray-600'>Model:</span>
											<span className='font-medium'>
												{driver.vehicle.model}
											</span>
										</div>
										<div className='flex justify-between'>
											<span className='text-gray-600'>Type:</span>
											<span className='font-medium capitalize'>
												{driver.vehicle.type}
											</span>
										</div>
										<div className='flex justify-between'>
											<span className='text-gray-600'>Plate:</span>
											<span className='font-medium'>
												{driver.vehicle.licensePlate}
											</span>
										</div>
										<div className='flex justify-between'>
											<span className='text-gray-600'>Color:</span>
											<span className='font-medium'>
												{driver.vehicle.color}
											</span>
										</div>
									</div>
								</div>
							</div>
						</CardContent>
					</Card>
				</Grid>
			</Container>

			{/* Toast notifications */}
			<div className='fixed bottom-4 right-4 space-y-2 z-50'>
				{toasts.map((toast) => (
					<div
						key={toast.id}
						className='bg-green-500 text-white px-4 py-3 rounded-lg shadow-lg'
					>
						{toast.message}
					</div>
				))}
			</div>
		</>
	)
}
