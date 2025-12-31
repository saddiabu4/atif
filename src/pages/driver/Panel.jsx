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
		label: "Bosh sahifa",
		icon: ({ className }) => <Power className={className} />,
	},
	{
		id: "orders",
		label: "Buyurtmalar",
		icon: ({ className }) => <Navigation className={className} />,
	},
	{
		id: "earnings",
		label: "Daromad",
		icon: ({ className }) => <TrendingUp className={className} />,
	},
	{
		id: "profile",
		label: "Profil",
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

	// Mobile-first responsive design - all devices use mobile layout
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
		name: "Olimov Salim",
		avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=salim",
		totalTrips: 245,
		rating: 4.9,
		earnings: { today: 450000, thisMonth: 8250000 },
	})

	const handleToggleOnline = async (newStatus) => {
		setIsOnline(newStatus)
		try {
			await driverAPI.toggleOnlineStatus(CURRENT_DRIVER_ID, newStatus)
			onShowToast(newStatus ? "Siz onlayn oldingiz" : "Siz oflayn oldingiz")
			if (newStatus) {
				setTimeout(() => {
					setNewRequest({
						id: "trip_" + Date.now(),
						passenger: { name: "Ismatova Dilnoza", rating: 4.9 },
						pickup: "Toshkent markazi",
						destination: "Aeroport Terminal 3",
						estimatedFare: 65000,
						distance: 25,
					})
				}, 2000)
			} else {
				setNewRequest(null)
			}
		} catch (error) {
			onShowToast("Holatni yangilashda xatolik", "error")
		}
	}

	const handleAcceptRequest = async () => {
		if (newRequest) {
			try {
				onShowToast(
					`Safar qabul qilindi! Olib ketish: ${newRequest.pickup}`,
					"success"
				)
				setNewRequest(null)
			} catch (error) {
				onShowToast("So'rovni qabul qilishda xatolik", "error")
			}
		}
	}

	const handleDeclineRequest = () => {
		setNewRequest(null)
		onShowToast("So'rov rad etildi", "info")
	}

	// Mobile-first responsive design - all devices use this layout
	return (
		<MobileContent>
			<MobileHeader
				title={`${isOnline ? "🟢 Onlayn" : "⚫ Oflayn"}`}
				showBack={false}
			/>
			<div className='space-y-3 px-1'>
				{/* Status Card */}
				<Card className='border-0 shadow-md bg-white rounded-2xl overflow-hidden w-full sm:max-w-96'>
					<CardContent className='p-4'>
						<div className='flex items-center justify-between gap-3'>
							<div className='flex-1'>
								<h3 className='text-base font-bold text-slate-900'>
									{driver.name}
								</h3>
								<div className='flex items-center gap-2 mt-2'>
									<span className='inline-flex items-center gap-1 bg-amber-100 text-amber-800 text-xs font-semibold px-2 py-1 rounded-full'>
										⭐ {driver.rating}
									</span>
									<span className='text-xs text-slate-500'>
										{driver.totalTrips} safar
									</span>
								</div>
							</div>
							<button
								onClick={() => handleToggleOnline(!isOnline)}
								className={`px-5 py-3 rounded-xl font-semibold text-sm transition-all touch-target ${
									isOnline
										? "bg-green-500 text-white hover:bg-green-600 shadow-lg active:scale-95"
										: "bg-slate-300 text-slate-700 hover:bg-slate-400 active:scale-95"
								}`}
							>
								{isOnline ? "Onlayn ✓" : "Onlayn bo'lish"}
							</button>
						</div>
					</CardContent>
				</Card>

				{/* New Trip Request Card */}
				{newRequest && (
					<Card className='border-0 shadow-2xl bg-linear-to-br from-blue-500 to-blue-600 text-white rounded-3xl overflow-hidden w-full sm:max-w-96'>
						<CardContent className='p-5 space-y-4'>
							<div className='bg-white text-black bg-opacity-20 rounded-2xl px-4 py-2.5 inline-block'>
								<span className='text-sm font-bold tracking-wide'>
									🚗 YANGI SAFAR!
								</span>
							</div>
							<div className='space-y-3'>
								<div className='flex items-start gap-4'>
									<MapPin className='w-6 h-6 shrink-0 mt-0.5 opacity-90' />
									<div className='flex-1 min-w-0'>
										<p className='text-xs font-semibold opacity-80 mb-1'>
											OLIB KETISH
										</p>
										<p className='font-bold text-sm'>{newRequest.pickup}</p>
									</div>
								</div>
								<div className='h-8 w-0.5 bg-white text-black opacity-40 ml-3'></div>
								<div className='flex items-start gap-4'>
									<Navigation2 className='w-6 h-6 shrink-0 mt-0.5 opacity-90' />
									<div className='flex-1 min-w-0'>
										<p className='text-xs font-semibold opacity-80 mb-1'>
											MANZILAGACHA
										</p>
										<p className='font-bold text-sm'>
											{newRequest.destination}
										</p>
									</div>
								</div>
							</div>

							<div className='bg-white bg-opacity-20 rounded-2xl px-4 py-3 flex items-center gap-3 flex-wrap text-black'>
								<div className='flex gap-4 text-sm font-semibold'>
									<span>📍 {newRequest.distance} km</span>
									<span>•</span>
									<span>👤 {newRequest.passenger.name}</span>
								</div>
							</div>

							<div className='bg-white bg-opacity-25 rounded-2xl px-4 py-4 text-center text-black'>
								<p className='text-xs font-semibold opacity-90 mb-2'>
									TAXMINAT NARXI
								</p>
								<p className='text-3xl font-black leading-tight'>
									{newRequest.estimatedFare.toLocaleString("uz-UZ")} so'm
								</p>
								<p className='text-xs opacity-85 mt-2'>
									⭐ {newRequest.passenger.rating}
								</p>
							</div>

							<div className='flex gap-2.5 pt-2'>
								<Button
									onClick={handleAcceptRequest}
									className='flex-1 bg-green-500 hover:bg-green-600 text-white font-bold text-base h-12 rounded-xl active:scale-95 shadow-lg transition-all'
								>
									✓ Qabul qilish
								</Button>
								<Button
									onClick={handleDeclineRequest}
									variant='outline'
									className='flex-1 bg-white bg-opacity-20 text-white border border-white border-opacity-30 font-bold text-base h-12 rounded-xl active:scale-95 hover:bg-opacity-30 transition-all'
								>
									✕ Rad etish
								</Button>
							</div>
						</CardContent>
					</Card>
				)}

				{isOnline && !newRequest && (
					<Card className='border-0 shadow-sm bg-linear-to-br from-purple-50 to-blue-50 w-full sm:max-w-96'>
						<CardContent className='pt-6'>
							<div className='grid grid-cols-1 gap-4'>
								<div>
									<p className='text-2xl font-bold text-purple-600'>
										{driver.earnings.today.toLocaleString("uz-UZ")} so'm
									</p>
									<p className='text-sm text-slate-600'>Bugun</p>
								</div>
								<div>
									<p className='text-2xl font-bold text-blue-600'>
										{driver.earnings.thisMonth.toLocaleString("uz-UZ")} so'm
									</p>
									<p className='text-sm text-slate-600'>Bu oy</p>
								</div>
							</div>
						</CardContent>
					</Card>
				)}

				{!isOnline && (
					<Card className='border-0 shadow-sm bg-amber-50 border-l-4 border-l-amber-500 w-full sm:max-w-96'>
						<CardContent className='pt-6'>
							<div className='flex gap-2'>
								<AlertCircle className='w-5 h-5 text-amber-600 shrink-0 mt-0.5' />
								<div>
									<h3 className='font-semibold text-amber-900'>
										Siz oflayn oldingiz
									</h3>
									<p className='text-sm text-amber-800 mt-1'>
										Safar so'rovlarini qabul qilish va daromad olish uchun
										onlayn bo'ling!
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
		onShowToast(`${destination} manziliga navigatsiya ocilmoqda`, "success")
	}

	const handleCall = (name) => {
		onShowToast(`${name} ga qo'ng'iroq qilinmoqda...`, "info")
	}

	// Mobile-first responsive design - all devices use this layout
	return (
		<MobileContent>
			<MobileHeader title='Faol buyurtmalar' showBack={false} />
			{orders.length > 0 ? (
				<div className='space-y-3'>
					{orders.map((order) => (
						<Card
							key={order.id}
							className='border-0 shadow-sm overflow-hidden w-full sm:max-w-96'
						>
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
										<span>{order.estimatedTime} vaqtda</span>
									</div>
								</div>

								<div className='flex gap-2 pt-2'>
									<Button
										onClick={() => handleNavigate(order.destination)}
										className='flex-1 bg-blue-600 hover:bg-blue-700 text-white'
										size='sm'
									>
										<Navigation2 className='w-4 h-4 mr-1' />
										Navigatsiya
									</Button>
									<Button
										onClick={() => handleCall(order.passenger.name)}
										variant='outline'
										size='sm'
										className='flex-1'
									>
										<Phone className='w-4 h-4 mr-1' />
										Qo'ng'iroq qiling
									</Button>
								</div>
							</CardContent>
						</Card>
					))}
				</div>
			) : (
				<div className='flex flex-col items-center justify-center py-12 text-center'>
					<Navigation className='w-12 h-12 text-gray-300 mb-3' />
					<p className='text-gray-600'>Faol buyurtmalar yo'q</p>
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

	// Mobile-first responsive design - all devices use this layout
	return (
		<MobileContent>
			<MobileHeader title='Daromad' showBack={false} />
			<div className='space-y-4'>
				<div className='grid grid-cols-1 gap-3'>
					<Card className='border-0 shadow-sm bg-linear-to-br from-green-400 to-green-600 text-white w-full sm:max-w-96'>
						<CardContent className='pt-6'>
							<p className='text-sm font-medium opacity-90'>Bugun</p>
							<p className='text-2xl font-bold mt-2'>
								{earningsData.today.toLocaleString("uz-UZ")} so'm
							</p>
						</CardContent>
					</Card>
					<Card className='border-0 shadow-sm bg-linear-to-br from-blue-400 to-blue-600 text-white w-full sm:max-w-96'>
						<CardContent className='pt-6'>
							<p className='text-sm font-medium opacity-90'>Bu hafta</p>
							<p className='text-2xl font-bold mt-2'>
								{earningsData.thisWeek.toLocaleString("uz-UZ")} so'm
							</p>
						</CardContent>
					</Card>
					<Card className='border-0 shadow-sm bg-linear-to-br from-purple-400 to-purple-600 text-white col-span-2 w-full sm:max-w-96'>
						<CardContent className='pt-6'>
							<p className='text-sm font-medium opacity-90'>Bu oy</p>
							<p className='text-2xl font-bold mt-2'>
								{earningsData.thisMonth.toLocaleString("uz-UZ")} so'm
							</p>
						</CardContent>
					</Card>
				</div>

				<div>
					<h3 className='font-semibold text-gray-900 mb-3'>So'nggi safarlar</h3>
					<div className='space-y-2'>
						{earningsData.recentTrips.map((trip) => (
							<Card
								key={trip.id}
								className='border-0 shadow-sm w-full sm:max-w-96'
							>
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
												{trip.fare.toLocaleString("uz-UZ")} so'm
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
			onShowToast("Muvaffaqiyatli chiqildi", "success")
		} catch (error) {
			onShowToast("Chiqishda xatolik", "error")
		}
	}

	// Mobile-first responsive design - all devices use this layout
	return (
		<MobileContent>
			<MobileHeader title='Profil' showBack={false} />
			<div className='space-y-4'>
				<Card className='border-0 shadow-sm w-full sm:max-w-96'>
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
									⭐ {driver.rating} • {driver.totalTrips} safar
								</p>
								<p className='text-xs text-gray-500 mt-1'>
									Qo'shildi {driver.joinDate}
								</p>
							</div>
						</div>
					</CardContent>
				</Card>

				<Card className='border-0 shadow-sm w-full sm:max-w-96'>
					<CardHeader className='pb-3'>
						<CardTitle className='text-base'>Aloqa ma'lumotlari</CardTitle>
					</CardHeader>
					<CardContent className='space-y-3'>
						<div>
							<p className='text-xs font-medium text-gray-600 uppercase'>
								Telefon
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

				<Card className='border-0 shadow-sm w-full sm:max-w-96'>
					<CardHeader className='pb-3'>
						<CardTitle className='text-base'>Transport ma'lumoti</CardTitle>
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
								Rangi
							</p>
							<p className='text-gray-900'>{driver.vehicle.color}</p>
						</div>
						<div>
							<p className='text-xs font-medium text-gray-600 uppercase'>
								Raqami
							</p>
							<p className='text-gray-900'>{driver.vehicle.plate}</p>
						</div>
					</CardContent>
				</Card>

				<Card className='border-0 shadow-sm w-full sm:max-w-96'>
					<CardHeader className='pb-3'>
						<CardTitle className='text-base'>Hujjatlar</CardTitle>
					</CardHeader>
					<CardContent className='space-y-2'>
						{Object.entries(driver.documents).map(([doc, status]) => {
							const docLabels = {
								drivingLicense: "Haydovchi guvohnomasi",
								insuranceCertificate: "Sug'urta sertifikati",
								carRegistration: "Avtomobil roʻyxati",
							}
							return (
								<div
									key={doc}
									className='flex items-center justify-between py-2 border-b last:border-0'
								>
									<p className='text-sm font-medium'>{docLabels[doc] || doc}</p>
									<StatusBadge status={status} />
								</div>
							)
						})}
					</CardContent>
				</Card>

				<Button
					onClick={handleLogout}
					variant='outline'
					className='w-full text-red-600 border-red-300 hover:bg-red-50 mt-6'
				>
					Chiqish
				</Button>
			</div>
		</MobileContent>
	)
}
