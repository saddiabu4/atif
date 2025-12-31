import {
	BottomNav,
	MobileContainer,
	MobileContent,
	MobileHeader,
	StatusBadge,
	ToastContainer,
} from "@/components/mobile"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { driverAPI } from "@/lib/api"

import {
	AlertCircle,
	Clock,
	MapPin,
	Navigation,
	Navigation2,
	Phone,
	Power,
	TrendingUp,
	User,
} from "lucide-react"
import { useState } from "react"

const CURRENT_DRIVER_ID = "driver_1"

const navItems = [
	{
		id: "home",
		label: "Home",
		icon: ({ className }) => <Power className={className} />,
	},
	{
		id: "orders",
		label: "Orders",
		icon: ({ className }) => <Navigation className={className} />,
	},
	{
		id: "earnings",
		label: "Earnings",
		icon: ({ className }) => <TrendingUp className={className} />,
	},
	{
		id: "profile",
		label: "Profile",
		icon: ({ className }) => <User className={className} />,
	},
]

export function DriverPanel() {
	const [activeTab, setActiveTab] = useState("home")
	const [toasts, setToasts] = useState([])

	const showToast = (message, type = "success") => {
		const id = Date.now()
		setToasts((prev) => [...prev, { id, message, type }])
	}

	const removeToast = (id) => {
		setToasts((prev) => prev.filter((t) => t.id !== id))
	}

	return (
		<MobileContainer>
			{activeTab === "home" && <DriverHome onShowToast={showToast} />}
			{activeTab === "orders" && <DriverOrders onShowToast={showToast} />}
			{activeTab === "earnings" && <DriverEarnings onShowToast={showToast} />}
			{activeTab === "profile" && <DriverProfile onShowToast={showToast} />}
			<BottomNav
				items={navItems}
				activeItem={activeTab}
				onItemClick={setActiveTab}
			/>
			<ToastContainer toasts={toasts} onRemoveToast={removeToast} />
		</MobileContainer>
	)
}

function DriverHome({ onShowToast }) {
	const [isOnline, setIsOnline] = useState(false)
	const [newRequest, setNewRequest] = useState(null)
	const [driver] = useState({
		name: "Saleh Al-Otaibi",
		avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=saleh",
		totalTrips: 245,
		rating: 4.9,
		earnings: { today: 450, thisMonth: 8250 },
	})

	const handleToggleOnline = async (newStatus) => {
		setIsOnline(newStatus)
		try {
			await driverAPI.toggleOnlineStatus(CURRENT_DRIVER_ID, newStatus)
			onShowToast(newStatus ? "You are now online" : "You are now offline")
			if (newStatus) {
				setTimeout(() => {
					setNewRequest({
						id: "trip_" + Date.now(),
						passenger: { name: "Noor Al-Rashid", rating: 4.9 },
						pickup: "Downtown Riyadh",
						destination: "Airport Terminal 3",
						estimatedFare: 65,
						distance: 25,
					})
				}, 2000)
			} else {
				setNewRequest(null)
			}
		} catch (error) {
			onShowToast("Failed to update status", "error")
		}
	}

	const handleAcceptRequest = async () => {
		if (newRequest) {
			try {
				onShowToast(`Trip accepted! Pickup: ${newRequest.pickup}`, "success")
				setNewRequest(null)
			} catch (error) {
				onShowToast("Failed to accept request", "error")
			}
		}
	}

	const handleDeclineRequest = () => {
		setNewRequest(null)
		onShowToast("Request declined", "info")
	}

	return (
		<MobileContent>
			<MobileHeader
				title={`${isOnline ? "Online" : "Offline"}`}
				showBack={false}
			/>
			<div className='space-y-4'>
				<Card className='border-0 shadow-sm bg-white'>
					<CardContent className='pt-6'>
						<div className='flex items-center justify-between'>
							<div>
								<h3 className='font-semibold text-slate-900'>{driver.name}</h3>
								<div className='flex items-center gap-1 mt-1'>
									<span className='text-sm text-slate-600'>
										⭐ {driver.rating}
									</span>
									<span className='text-sm text-slate-600'>
										• {driver.totalTrips} trips
									</span>
								</div>
							</div>
							<button
								onClick={() => handleToggleOnline(!isOnline)}
								className={`px-4 py-2 rounded-lg font-medium transition-all ${
									isOnline
										? "bg-green-500 text-white hover:bg-green-600 shadow-lg"
										: "bg-slate-200 text-slate-700 hover:bg-slate-300"
								}`}
							>
								{isOnline ? "Online" : "Go Online"}
							</button>
						</div>
					</CardContent>
				</Card>

				{newRequest && (
					<Card className='border-l-4 border-l-blue-500 bg-blue-50 shadow-md'>
						<CardContent className='pt-6'>
							<div className='space-y-3'>
								<div className='flex items-center justify-between'>
									<span className='font-semibold text-slate-900'>
										New Trip Request!
									</span>
									<span className='text-2xl font-bold text-green-600'>
										SAR {newRequest.estimatedFare}
									</span>
								</div>
								<div className='space-y-2 text-sm'>
									<div className='flex items-start gap-2'>
										<MapPin className='w-4 h-4 mt-0.5 text-blue-600 shrink-0' />
										<span className='text-slate-700'>{newRequest.pickup}</span>
									</div>
									<div className='flex items-start gap-2'>
										<Navigation2 className='w-4 h-4 mt-0.5 text-blue-600 shrink-0' />
										<span className='text-slate-700'>
											{newRequest.destination}
										</span>
									</div>
									<div className='flex items-center gap-2 text-slate-600'>
										<span>{newRequest.distance} km</span>
										<span>•</span>
										<span>{newRequest.passenger.name}</span>
									</div>
								</div>
								<div className='flex gap-2 pt-2'>
									<Button
										onClick={handleAcceptRequest}
										className='flex-1 bg-green-500 hover:bg-green-600 text-white'
									>
										Accept
									</Button>
									<Button
										onClick={handleDeclineRequest}
										variant='outline'
										className='flex-1'
									>
										Decline
									</Button>
								</div>
							</div>
						</CardContent>
					</Card>
				)}

				{isOnline && !newRequest && (
					<Card className='border-0 shadow-sm bg-linear-to-br from-purple-50 to-blue-50'>
						<CardContent className='pt-6'>
							<div className='grid grid-cols-2 gap-4'>
								<div>
									<p className='text-2xl font-bold text-purple-600'>
										SAR {driver.earnings.today}
									</p>
									<p className='text-sm text-slate-600'>Today</p>
								</div>
								<div>
									<p className='text-2xl font-bold text-blue-600'>
										SAR {driver.earnings.thisMonth}
									</p>
									<p className='text-sm text-slate-600'>This Month</p>
								</div>
							</div>
						</CardContent>
					</Card>
				)}

				{!isOnline && (
					<Card className='border-0 shadow-sm bg-amber-50 border-l-4 border-l-amber-500'>
						<CardContent className='pt-6'>
							<div className='flex gap-2'>
								<AlertCircle className='w-5 h-5 text-amber-600 shrink-0 mt-0.5' />
								<div>
									<h3 className='font-semibold text-amber-900'>
										You're offline
									</h3>
									<p className='text-sm text-amber-800 mt-1'>
										Go online to receive trip requests and start earning!
									</p>
								</div>
							</div>
						</CardContent>
					</Card>
				)}
			</div>
		</MobileContent>
	)
}

function DriverOrders({ onShowToast }) {
	const [orders] = useState([
		{
			id: "trip_1",
			passenger: { name: "Ahmed Al-Dosari", rating: 4.8 },
			pickup: "Olaya District",
			destination: "King Fahd Road",
			startTime: "2:30 PM",
			estimatedTime: "15 min",
			status: "in_progress",
		},
		{
			id: "trip_2",
			passenger: { name: "Fatima Al-Shehri", rating: 4.9 },
			pickup: "Malaz District",
			destination: "Diplomatic Quarter",
			startTime: "2:00 PM",
			estimatedTime: "25 min",
			status: "in_progress",
		},
	])

	const handleNavigate = (destination) => {
		onShowToast(`Opening navigation to ${destination}`, "success")
	}

	const handleCall = (name) => {
		onShowToast(`Calling ${name}...`, "info")
	}

	return (
		<MobileContent>
			<MobileHeader title='Active Orders' showBack={false} />
			{orders.length > 0 ? (
				<div className='space-y-3'>
					{orders.map((order) => (
						<Card key={order.id} className='border-0 shadow-sm overflow-hidden'>
							<CardContent className='p-4 space-y-3'>
								<div className='flex items-start justify-between'>
									<div className='flex-1'>
										<h3 className='font-semibold text-gray-900'>
											{order.passenger.name}
										</h3>
										<p className='text-sm text-gray-600'>
											⭐ {order.passenger.rating}
										</p>
									</div>
									<StatusBadge status={order.status} />
								</div>

								<div className='space-y-2'>
									<div className='flex items-center gap-2 text-sm'>
										<MapPin className='w-4 h-4 text-gray-400' />
										<span className='text-gray-700'>{order.pickup}</span>
									</div>
									<div className='flex items-center gap-2 text-sm'>
										<Navigation className='w-4 h-4 text-gray-400' />
										<span className='text-gray-700'>{order.destination}</span>
									</div>
									<div className='flex items-center gap-2 text-sm text-gray-600'>
										<Clock className='w-4 h-4' />
										<span>{order.estimatedTime} away</span>
									</div>
								</div>

								<div className='flex gap-2 pt-2'>
									<Button
										onClick={() => handleNavigate(order.destination)}
										className='flex-1 bg-blue-600 hover:bg-blue-700 text-white'
										size='sm'
									>
										<Navigation2 className='w-4 h-4 mr-1' />
										Navigate
									</Button>
									<Button
										onClick={() => handleCall(order.passenger.name)}
										variant='outline'
										size='sm'
										className='flex-1'
									>
										<Phone className='w-4 h-4 mr-1' />
										Call
									</Button>
								</div>
							</CardContent>
						</Card>
					))}
				</div>
			) : (
				<div className='flex flex-col items-center justify-center py-12 text-center'>
					<Navigation className='w-12 h-12 text-gray-300 mb-3' />
					<p className='text-gray-600'>No active orders</p>
				</div>
			)}
		</MobileContent>
	)
}

function DriverEarnings({ onShowToast }) {
	const [earningsData] = useState({
		today: 450,
		thisWeek: 2100,
		thisMonth: 8250,
		recentTrips: [
			{
				id: "trip_1",
				passenger: "Ahmed Al-Dosari",
				route: "Olaya → King Fahd Road",
				distance: 8.5,
				fare: 45,
				time: "12:45 PM",
			},
			{
				id: "trip_2",
				passenger: "Sara Al-Jasser",
				route: "Mall of Riyadh → Business Gate",
				distance: 12.3,
				fare: 65,
				time: "11:20 AM",
			},
			{
				id: "trip_3",
				passenger: "Mohammed Al-Khaldi",
				route: "Prince Road → Downtown",
				distance: 6.2,
				fare: 35,
				time: "9:45 AM",
			},
		],
	})

	return (
		<MobileContent>
			<MobileHeader title='Earnings' showBack={false} />
			<div className='space-y-4'>
				<div className='grid grid-cols-2 gap-3'>
					<Card className='border-0 shadow-sm bg-linear-to-br from-green-400 to-green-600 text-white'>
						<CardContent className='pt-6'>
							<p className='text-sm font-medium opacity-90'>Today</p>
							<p className='text-2xl font-bold mt-2'>
								SAR {earningsData.today}
							</p>
						</CardContent>
					</Card>
					<Card className='border-0 shadow-sm bg-linear-to-br from-blue-400 to-blue-600 text-white'>
						<CardContent className='pt-6'>
							<p className='text-sm font-medium opacity-90'>This Week</p>
							<p className='text-2xl font-bold mt-2'>
								SAR {earningsData.thisWeek}
							</p>
						</CardContent>
					</Card>
					<Card className='border-0 shadow-sm bg-linear-to-br from-purple-400 to-purple-600 text-white col-span-2'>
						<CardContent className='pt-6'>
							<p className='text-sm font-medium opacity-90'>This Month</p>
							<p className='text-2xl font-bold mt-2'>
								SAR {earningsData.thisMonth}
							</p>
						</CardContent>
					</Card>
				</div>

				<div>
					<h3 className='font-semibold text-gray-900 mb-3'>Recent Trips</h3>
					<div className='space-y-2'>
						{earningsData.recentTrips.map((trip) => (
							<Card key={trip.id} className='border-0 shadow-sm'>
								<CardContent className='p-3'>
									<div className='flex items-start justify-between gap-2'>
										<div className='flex-1 min-w-0'>
											<p className='font-medium text-gray-900 text-sm'>
												{trip.passenger}
											</p>
											<p className='text-xs text-gray-600 truncate'>
												{trip.route}
											</p>
											<p className='text-xs text-gray-600 mt-1'>
												{trip.distance} km • {trip.time}
											</p>
										</div>
										<div className='text-right shrink-0'>
											<p className='font-bold text-green-600'>
												SAR {trip.fare}
											</p>
										</div>
									</div>
								</CardContent>
							</Card>
						))}
					</div>
				</div>
			</div>
		</MobileContent>
	)
}

function DriverProfile({ onShowToast }) {
	const [driver] = useState({
		name: "Saleh Al-Otaibi",
		phone: "+966 50 123 4567",
		email: "saleh@example.com",
		joinDate: "January 2023",
		rating: 4.9,
		totalTrips: 245,
		vehicle: {
			model: "Toyota Camry 2022",
			color: "Black",
			plate: "ر ص ج 1234",
		},
		documents: {
			drivingLicense: "verified",
			insuranceCertificate: "verified",
			carRegistration: "verified",
		},
	})

	const handleLogout = async () => {
		try {
			await driverAPI.logout(CURRENT_DRIVER_ID)
			onShowToast("Logged out successfully", "success")
		} catch (error) {
			onShowToast("Logout failed", "error")
		}
	}

	return (
		<MobileContent>
			<MobileHeader title='Profile' showBack={false} />
			<div className='space-y-4'>
				<Card className='border-0 shadow-sm'>
					<CardContent className='pt-6'>
						<div className='flex items-center gap-4'>
							<img
								src='https://api.dicebear.com/7.x/avataaars/svg?seed=saleh'
								alt={driver.name}
								className='w-16 h-16 rounded-full'
							/>
							<div className='flex-1'>
								<h2 className='font-bold text-lg text-gray-900'>
									{driver.name}
								</h2>
								<p className='text-sm text-gray-600'>
									⭐ {driver.rating} • {driver.totalTrips} trips
								</p>
								<p className='text-xs text-gray-500 mt-1'>
									Joined {driver.joinDate}
								</p>
							</div>
						</div>
					</CardContent>
				</Card>

				<Card className='border-0 shadow-sm'>
					<CardHeader className='pb-3'>
						<CardTitle className='text-base'>Contact Information</CardTitle>
					</CardHeader>
					<CardContent className='space-y-3'>
						<div>
							<p className='text-xs font-medium text-gray-600 uppercase'>
								Phone
							</p>
							<p className='text-gray-900'>{driver.phone}</p>
						</div>
						<div>
							<p className='text-xs font-medium text-gray-600 uppercase'>
								Email
							</p>
							<p className='text-gray-900'>{driver.email}</p>
						</div>
					</CardContent>
				</Card>

				<Card className='border-0 shadow-sm'>
					<CardHeader className='pb-3'>
						<CardTitle className='text-base'>Vehicle Details</CardTitle>
					</CardHeader>
					<CardContent className='space-y-3'>
						<div>
							<p className='text-xs font-medium text-gray-600 uppercase'>
								Model
							</p>
							<p className='text-gray-900'>{driver.vehicle.model}</p>
						</div>
						<div>
							<p className='text-xs font-medium text-gray-600 uppercase'>
								Color
							</p>
							<p className='text-gray-900'>{driver.vehicle.color}</p>
						</div>
						<div>
							<p className='text-xs font-medium text-gray-600 uppercase'>
								Plate
							</p>
							<p className='text-gray-900'>{driver.vehicle.plate}</p>
						</div>
					</CardContent>
				</Card>

				<Card className='border-0 shadow-sm'>
					<CardHeader className='pb-3'>
						<CardTitle className='text-base'>Documents</CardTitle>
					</CardHeader>
					<CardContent className='space-y-2'>
						{Object.entries(driver.documents).map(([doc, status]) => (
							<div
								key={doc}
								className='flex items-center justify-between py-2 border-b last:border-0'
							>
								<p className='text-sm font-medium capitalize'>
									{doc.replace(/([A-Z])/g, " $1").trim()}
								</p>
								<StatusBadge status={status} />
							</div>
						))}
					</CardContent>
				</Card>

				<Button
					onClick={handleLogout}
					variant='outline'
					className='w-full text-red-600 border-red-300 hover:bg-red-50 mt-6'
				>
					Logout
				</Button>
			</div>
		</MobileContent>
	)
}
