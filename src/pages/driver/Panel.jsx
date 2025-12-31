import {
	DriverPanelContent,
	DriverPanelGrid,
	DriverPanelHeader,
	DriverPanelLayout,
	DriverPanelSection,
	DriverStatusIndicator,
} from "@/components/driver"
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
import { useMediaQuery } from "@/lib/utils"

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
	// Detect screen size for responsive layout
	const isMobile = useMediaQuery("(max-width: 640px)")
	const isTablet = useMediaQuery("(max-width: 1024px)")

	const showToast = (message, type = "success") => {
		const id = Date.now()
		setToasts((prev) => [...prev, { id, message, type }])
	}

	const removeToast = (id) => {
		setToasts((prev) => prev.filter((t) => t.id !== id))
	}

	// Mobile view uses the old layout with bottom nav
	if (isMobile) {
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

	// Desktop/Tablet view uses responsive layout with sidebar nav
	return (
		<DriverPanelLayout>
			<DriverPanelHeader>
				<div className='flex items-center justify-between'>
					<div>
						<h1 className='text-2xl lg:text-3xl font-bold text-slate-900'>
							Haydovchi Dashboard
						</h1>
						<p className='text-sm text-slate-600 mt-1'>
							Xosh kelibsiz, o'zingizning ma'lumotingizni boshqaring
						</p>
					</div>
				</div>
			</DriverPanelHeader>

			<div className='flex flex-1 overflow-hidden'>
				{/* Sidebar Navigation */}
				<aside className='hidden lg:flex w-64 bg-white border-r border-slate-200 overflow-y-auto'>
					<nav className='w-full px-4 py-6 space-y-2'>
						{navItems.map((item) => (
							<button
								key={item.id}
								onClick={() => setActiveTab(item.id)}
								className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${
									activeTab === item.id
										? "bg-blue-600 text-white shadow-md"
										: "text-slate-700 hover:bg-slate-100"
								}`}
							>
								<item.icon className='w-5 h-5 shrink-0' />
								<span>{item.label}</span>
							</button>
						))}
					</nav>
				</aside>

				{/* Main Content */}
				<DriverPanelContent className='flex-1 overflow-y-auto'>
					{activeTab === "home" && <DriverHome onShowToast={showToast} />}
					{activeTab === "orders" && <DriverOrders onShowToast={showToast} />}
					{activeTab === "earnings" && (
						<DriverEarnings onShowToast={showToast} />
					)}
					{activeTab === "profile" && <DriverProfile onShowToast={showToast} />}
				</DriverPanelContent>
			</div>

			{/* Bottom nav for tablet */}
			{!isMobile && isTablet && (
				<BottomNav
					items={navItems}
					activeItem={activeTab}
					onItemClick={setActiveTab}
				/>
			)}

			<ToastContainer toasts={toasts} onRemoveToast={removeToast} />
		</DriverPanelLayout>
	)
}

function DriverHome({ onShowToast }) {
	const [isOnline, setIsOnline] = useState(false)
	const [newRequest, setNewRequest] = useState(null)
	const isMobile = useMediaQuery("(max-width: 640px)")
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

	// Mobile layout
	if (isMobile) {
		return (
			<MobileContent>
				<MobileHeader
					title={`${isOnline ? "Onlayn" : "Oflayn"}`}
					showBack={false}
				/>
				<div className='space-y-4'>
					<Card className='border-0 shadow-sm bg-white'>
						<CardContent className='pt-6'>
							<div className='flex items-center justify-between'>
								<div>
									<h3 className='font-semibold text-slate-900'>
										{driver.name}
									</h3>
									<div className='flex items-center gap-1 mt-1'>
										<span className='text-sm text-slate-600'>
											⭐ {driver.rating}
										</span>
										<span className='text-sm text-slate-600'>
											• {driver.totalTrips} safar
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
									{isOnline ? "Onlayn" : "Onlayn bo'lish"}
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
											Yangi safar so'rovi!
										</span>
										<span className='text-2xl font-bold text-green-600'>
											{newRequest.estimatedFare.toLocaleString("uz-UZ")} so'm
										</span>
									</div>
									<div className='space-y-2 text-sm'>
										<div className='flex items-start gap-2'>
											<MapPin className='w-4 h-4 mt-0.5 text-blue-600 shrink-0' />
											<span className='text-slate-700'>
												{newRequest.pickup}
											</span>
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
											Qabul qilish
										</Button>
										<Button
											onClick={handleDeclineRequest}
											variant='outline'
											className='flex-1'
										>
											Rad etish
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
						<Card className='border-0 shadow-sm bg-amber-50 border-l-4 border-l-amber-500'>
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

	// Desktop/Tablet layout
	return (
		<>
			<div className='mb-6 lg:mb-8'>
				<DriverStatusIndicator
					isOnline={isOnline}
					onToggle={() => handleToggleOnline(!isOnline)}
					driverName={driver.name}
				/>
			</div>

			<DriverPanelGrid cols='3' className='mb-6 lg:mb-8'>
				{/* Main Request Card */}
				{newRequest && (
					<DriverPanelSection span='2'>
						{" "}
						<Card className='border-l-4 border-l-blue-600 shadow-lg'>
							<CardHeader className='bg-linear-to-r from-blue-50 to-transparent pb-3'>
								<div className='flex items-center justify-between'>
									<CardTitle className='text-xl text-blue-900'>
										🚗 Yangi safar so'rovi!
									</CardTitle>
									<span className='text-3xl font-bold text-green-600'>
										{newRequest.estimatedFare.toLocaleString("uz-UZ")} so'm
									</span>
								</div>
							</CardHeader>
							<CardContent className='space-y-4'>
								<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
									<div className='space-y-3'>
										<div className='flex items-start gap-3'>
											<MapPin className='w-5 h-5 mt-1 text-blue-600 shrink-0' />
											<div>
												<p className='text-xs font-medium text-slate-600'>
													OLIB KETISH
												</p>
												<p className='text-sm font-semibold text-slate-900 mt-1'>
													{newRequest.pickup}
												</p>
											</div>
										</div>
										<div className='flex items-start gap-3'>
											<Navigation2 className='w-5 h-5 mt-1 text-blue-600 shrink-0' />
											<div>
												<p className='text-xs font-medium text-slate-600'>
													MANZILAGACHA
												</p>
												<p className='text-sm font-semibold text-slate-900 mt-1'>
													{newRequest.destination}
												</p>
											</div>
										</div>
									</div>
									<div className='space-y-3 flex flex-col justify-between'>
										<div>
											<p className='text-sm text-slate-600'>
												{newRequest.passenger.name}
											</p>
											<p className='text-sm font-semibold text-slate-900'>
												⭐ {newRequest.passenger.rating}
											</p>
											<p className='text-xs text-slate-600 mt-2'>
												📍 {newRequest.distance} km
											</p>
										</div>
									</div>
								</div>
								<div className='flex gap-3 pt-4 border-t'>
									<Button
										onClick={handleAcceptRequest}
										className='flex-1 bg-green-600 hover:bg-green-700 text-white text-base h-12 rounded-lg font-semibold'
									>
										✓ Qabul qilish
									</Button>
									<Button
										onClick={handleDeclineRequest}
										variant='outline'
										className='flex-1 text-base h-12 rounded-lg font-semibold'
									>
										✕ Rad etish
									</Button>
								</div>
							</CardContent>
						</Card>
					</DriverPanelSection>
				)}

				{/* Earnings Cards */}
				<Card
					className={`shadow-sm border-b-4 border-b-purple-500 ${
						newRequest ? "" : "lg:col-span-1"
					}`}
				>
					<CardContent className='pt-6'>
						<p className='text-xs font-medium text-slate-600 uppercase tracking-wide'>
							Bugungi daromad
						</p>
						<p className='text-2xl lg:text-3xl font-bold text-slate-900 mt-3'>
							{driver.earnings.today.toLocaleString("uz-UZ")} so'm
						</p>
						<div className='w-full h-1 bg-purple-500 mt-4 rounded-full'></div>
					</CardContent>
				</Card>

				<Card className='shadow-sm border-b-4 border-b-blue-500'>
					<CardContent className='pt-6'>
						<p className='text-xs font-medium text-slate-600 uppercase tracking-wide'>
							Bu oy
						</p>
						<p className='text-2xl lg:text-3xl font-bold text-slate-900 mt-3'>
							{driver.earnings.thisMonth.toLocaleString("uz-UZ")} so'm
						</p>
						<div className='w-full h-1 bg-blue-500 mt-4 rounded-full'></div>
					</CardContent>
				</Card>

				<Card className='shadow-sm border-b-4 border-b-orange-500'>
					<CardContent className='pt-6'>
						<p className='text-xs font-medium text-slate-600 uppercase tracking-wide'>
							Safarlar
						</p>
						<p className='text-2xl lg:text-3xl font-bold text-slate-900 mt-3'>
							{driver.totalTrips}
						</p>
						<div className='w-full h-1 bg-orange-500 mt-4 rounded-full'></div>
					</CardContent>
				</Card>
			</DriverPanelGrid>

			{/* Offline message */}
			{!isOnline && (
				<Card className='border-l-4 border-l-amber-500 bg-amber-50 shadow-sm'>
					<CardContent className='pt-6 pb-6'>
						<div className='flex gap-4 items-start'>
							<AlertCircle className='w-6 h-6 text-amber-600 shrink-0 mt-0.5' />
							<div>
								<h3 className='font-semibold text-amber-900 text-lg'>
									Siz hozir oflayn oldingiz
								</h3>
								<p className='text-sm text-amber-800 mt-2'>
									Safar so'rovlarini qabul qilish va daromad olish uchun "Onlayn
									bo'lish" tugmasini bosing va shovqinli yo'lga tushingiz!
								</p>
							</div>
						</div>
					</CardContent>
				</Card>
			)}
		</>
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
	const isMobile = useMediaQuery("(max-width: 640px)")

	const handleNavigate = (destination) => {
		onShowToast(`${destination} manziliga navigatsiya ocilmoqda`, "success")
	}

	const handleCall = (name) => {
		onShowToast(`${name} ga qo'ng'iroq qilinmoqda...`, "info")
	}

	// Mobile layout
	if (isMobile) {
		return (
			<MobileContent>
				<MobileHeader title='Faol buyurtmalar' showBack={false} />
				{orders.length > 0 ? (
					<div className='space-y-3'>
						{orders.map((order) => (
							<Card
								key={order.id}
								className='border-0 shadow-sm overflow-hidden'
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

	// Desktop/Tablet layout
	return (
		<>
			<div className='mb-8'>
				<h2 className='text-2xl lg:text-3xl font-bold text-slate-900 mb-6'>
					Faol Buyurtmalar
				</h2>
			</div>

			{orders.length > 0 ? (
				<DriverPanelGrid cols='auto'>
					{orders.map((order) => (
						<Card
							key={order.id}
							className='shadow-md border-t-4 border-t-blue-500 hover:shadow-lg transition-shadow'
						>
							<CardHeader className='pb-4'>
								<div className='flex items-start justify-between'>
									<div>
										<CardTitle className='text-lg'>
											{order.passenger.name}
										</CardTitle>
										<p className='text-sm text-slate-600 mt-1'>
											⭐ {order.passenger.rating}
										</p>
									</div>
									<StatusBadge status={order.status} />
								</div>
							</CardHeader>
							<CardContent className='space-y-4'>
								<div className='space-y-3'>
									<div className='flex items-start gap-3'>
										<MapPin className='w-5 h-5 text-blue-600 shrink-0 mt-0.5' />
										<div>
											<p className='text-xs font-medium text-slate-600'>
												OLiBKETISH
											</p>
											<p className='text-sm font-semibold text-slate-900'>
												{order.pickup}
											</p>
										</div>
									</div>
									<div className='flex items-start gap-3'>
										<Navigation2 className='w-5 h-5 text-blue-600 shrink-0 mt-0.5' />
										<div>
											<p className='text-xs font-medium text-slate-600'>
												MANZILAGACHA
											</p>
											<p className='text-sm font-semibold text-slate-900'>
												{order.destination}
											</p>
										</div>
									</div>
									<div className='flex items-center gap-2 text-sm text-slate-600 pt-2 border-t'>
										<Clock className='w-4 h-4' />
										<span>{order.estimatedTime}</span>
									</div>
								</div>

								<div className='flex gap-2 pt-4 border-t'>
									<Button
										onClick={() => handleNavigate(order.destination)}
										className='flex-1 bg-blue-600 hover:bg-blue-700 text-white h-10'
									>
										<Navigation2 className='w-4 h-4 mr-2' />
										Navigatsiya
									</Button>
									<Button
										onClick={() => handleCall(order.passenger.name)}
										variant='outline'
										className='flex-1 h-10'
									>
										<Phone className='w-4 h-4 mr-2' />
										Qo'ng'iroq
									</Button>
								</div>
							</CardContent>
						</Card>
					))}
				</DriverPanelGrid>
			) : (
				<div className='flex flex-col items-center justify-center py-16 text-center'>
					<div className='w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mb-4'>
						<Navigation className='w-10 h-10 text-slate-400' />
					</div>
					<p className='text-lg font-semibold text-slate-600'>
						Faol buyurtmalar yo'q
					</p>
					<p className='text-sm text-slate-500 mt-1'>
						Yangi buyurtmalar siz onlayn bo'lganingizdan keyin ko'rinadi
					</p>
				</div>
			)}
		</>
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
	const isMobile = useMediaQuery("(max-width: 640px)")

	// Mobile layout
	if (isMobile) {
		return (
			<MobileContent>
				<MobileHeader title='Daromad' showBack={false} />
				<div className='space-y-4'>
					<div className='grid grid-cols-2 gap-3'>
						<Card className='border-0 shadow-sm bg-linear-to-br from-green-400 to-green-600 text-white'>
							<CardContent className='pt-6'>
								<p className='text-sm font-medium opacity-90'>Bugun</p>
								<p className='text-2xl font-bold mt-2'>
									{earningsData.today.toLocaleString("uz-UZ")} so'm
								</p>
							</CardContent>
						</Card>
						<Card className='border-0 shadow-sm bg-linear-to-br from-blue-400 to-blue-600 text-white'>
							<CardContent className='pt-6'>
								<p className='text-sm font-medium opacity-90'>Bu hafta</p>
								<p className='text-2xl font-bold mt-2'>
									{earningsData.thisWeek.toLocaleString("uz-UZ")} so'm
								</p>
							</CardContent>
						</Card>
						<Card className='border-0 shadow-sm bg-linear-to-br from-purple-400 to-purple-600 text-white col-span-2'>
							<CardContent className='pt-6'>
								<p className='text-sm font-medium opacity-90'>Bu oy</p>
								<p className='text-2xl font-bold mt-2'>
									{earningsData.thisMonth.toLocaleString("uz-UZ")} so'm
								</p>
							</CardContent>
						</Card>
					</div>

					<div>
						<h3 className='font-semibold text-gray-900 mb-3'>
							So'nggi safarlar
						</h3>
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

	// Desktop/Tablet layout
	return (
		<>
			<div className='mb-8'>
				<h2 className='text-2xl lg:text-3xl font-bold text-slate-900 mb-6'>
					📊 Daromad Statistikasi
				</h2>
			</div>

			{/* Earnings Summary Cards */}
			<DriverPanelGrid cols='3' className='mb-8'>
				<Card className='shadow-lg border-none overflow-hidden'>
					<div className='h-1 bg-linear-to-r from-green-400 to-green-600'></div>
					<CardContent className='pt-8 pb-8'>
						<p className='text-sm font-medium text-slate-600 uppercase tracking-wide'>
							Bugungi daromad
						</p>
						<p className='text-3xl lg:text-4xl font-bold text-slate-900 mt-4'>
							{earningsData.today} so'm
						</p>
						<div className='mt-6 pt-6 border-t'>
							<p className='text-xs text-slate-600'>🎯 Manzili: 500 so'm</p>
						</div>
					</CardContent>
				</Card>

				<Card className='shadow-lg border-none overflow-hidden'>
					<div className='h-1 bg-linear-to-r from-blue-400 to-blue-600'></div>
					<CardContent className='pt-8 pb-8'>
						<p className='text-sm font-medium text-slate-600 uppercase tracking-wide'>
							Bu hafta
						</p>
						<p className='text-3xl lg:text-4xl font-bold text-slate-900 mt-4'>
							{earningsData.thisWeek} so'm
						</p>
						<div className='mt-6 pt-6 border-t'>
							<p className='text-xs text-slate-600'>📈 O'sish: +12%</p>
						</div>
					</CardContent>
				</Card>

				<Card className='shadow-lg border-none overflow-hidden'>
					<div className='h-1 bg-linear-to-r from-purple-400 to-purple-600'></div>
					<CardContent className='pt-8 pb-8'>
						<p className='text-sm font-medium text-slate-600 uppercase tracking-wide'>
							Bu oy
						</p>
						<p className='text-3xl lg:text-4xl font-bold text-slate-900 mt-4'>
							{earningsData.thisMonth} so'm
						</p>
						<div className='mt-6 pt-6 border-t'>
							<p className='text-xs text-slate-600'>
								✅ Safarlar: {earningsData.recentTrips.length}
							</p>
						</div>
					</CardContent>
				</Card>
			</DriverPanelGrid>

			{/* Recent Trips */}
			<div>
				<h3 className='text-xl font-bold text-slate-900 mb-6'>
					So'nggi safarlar
				</h3>
				<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
					{earningsData.recentTrips.map((trip) => (
						<Card
							key={trip.id}
							className='shadow-sm hover:shadow-md transition-shadow'
						>
							<CardContent className='p-6 space-y-4'>
								<div className='flex items-start justify-between'>
									<div className='flex-1 min-w-0'>
										<p className='font-semibold text-slate-900'>
											{trip.passenger}
										</p>
										<p className='text-sm text-slate-600 mt-1 truncate'>
											{trip.route}
										</p>
									</div>
									<div className='text-right shrink-0 ml-2'>
										<p className='text-xl font-bold text-green-600'>
											{trip.fare} so'm
										</p>
									</div>
								</div>

								<div className='flex items-center justify-between text-sm text-slate-600 pt-4 border-t'>
									<span>📍 {trip.distance} km</span>
									<span>⏰ {trip.time}</span>
								</div>
							</CardContent>
						</Card>
					))}
				</div>
			</div>
		</>
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
	const isMobile = useMediaQuery("(max-width: 640px)")

	const handleLogout = async () => {
		try {
			await driverAPI.logout(CURRENT_DRIVER_ID)
			onShowToast("Muvaffaqiyatli chiqildi", "success")
		} catch (error) {
			onShowToast("Chiqishda xatolik", "error")
		}
	}

	// Mobile layout
	if (isMobile) {
		return (
			<MobileContent>
				<MobileHeader title='Profil' showBack={false} />
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
										⭐ {driver.rating} • {driver.totalTrips} safar
									</p>
									<p className='text-xs text-gray-500 mt-1'>
										Qo'shildi {driver.joinDate}
									</p>
								</div>
							</div>
						</CardContent>
					</Card>

					<Card className='border-0 shadow-sm'>
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

					<Card className='border-0 shadow-sm'>
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

					<Card className='border-0 shadow-sm'>
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
										<p className='text-sm font-medium'>
											{docLabels[doc] || doc}
										</p>
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

	// Desktop/Tablet layout
	return (
		<>
			<div className='mb-8'>
				<h2 className='text-2xl lg:text-3xl font-bold text-slate-900'>
					👤 Mening Profilim
				</h2>
			</div>

			<DriverPanelGrid cols='2' className='mb-8'>
				{/* Profile Card */}
				<Card className='shadow-lg border-none overflow-hidden'>
					<div className='h-1 bg-linear-to-r from-blue-400 to-blue-600'></div>
					<CardContent className='pt-8'>
						<div className='flex flex-col items-center text-center mb-6'>
							<img
								src='https://api.dicebear.com/7.x/avataaars/svg?seed=saleh'
								alt={driver.name}
								className='w-24 h-24 rounded-full mb-4 shadow-lg'
							/>
							<h2 className='text-2xl font-bold text-slate-900'>
								{driver.name}
							</h2>
							<div className='flex items-center justify-center gap-3 mt-3 text-sm'>
								<span className='text-yellow-500 text-lg'>
									⭐ {driver.rating}
								</span>
								<span className='text-slate-600'>•</span>
								<span className='text-slate-600'>
									{driver.totalTrips} safar
								</span>
							</div>
							<p className='text-sm text-slate-600 mt-4'>
								Qo'shildi: {driver.joinDate}
							</p>
						</div>
					</CardContent>
				</Card>

				{/* Contact Information */}
				<Card className='shadow-lg border-none overflow-hidden'>
					<div className='h-1 bg-linear-to-r from-green-400 to-green-600'></div>
					<CardHeader className='pb-3'>
						<CardTitle className='text-lg'>📞 Aloqa ma'lumotlari</CardTitle>
					</CardHeader>
					<CardContent className='space-y-5'>
						<div className='border-b pb-4'>
							<p className='text-xs font-medium text-slate-600 uppercase tracking-wide'>
								Telefon
							</p>
							<p className='text-slate-900 font-medium mt-2'>{driver.phone}</p>
						</div>
						<div>
							<p className='text-xs font-medium text-slate-600 uppercase tracking-wide'>
								Email
							</p>
							<p className='text-slate-900 font-medium mt-2'>{driver.email}</p>
						</div>
					</CardContent>
				</Card>

				{/* Vehicle Information */}
				<Card className='shadow-lg border-none overflow-hidden'>
					<div className='h-1 bg-linear-to-r from-purple-400 to-purple-600'></div>
					<CardHeader className='pb-3'>
						<CardTitle className='text-lg'>🚗 Transport ma'lumoti</CardTitle>
					</CardHeader>
					<CardContent className='space-y-5'>
						<div className='border-b pb-4'>
							<p className='text-xs font-medium text-slate-600 uppercase tracking-wide'>
								Model
							</p>
							<p className='text-slate-900 font-medium mt-2'>
								{driver.vehicle.model}
							</p>
						</div>
						<div className='border-b pb-4'>
							<p className='text-xs font-medium text-slate-600 uppercase tracking-wide'>
								Rangi
							</p>
							<p className='text-slate-900 font-medium mt-2'>
								{driver.vehicle.color}
							</p>
						</div>
						<div>
							<p className='text-xs font-medium text-slate-600 uppercase tracking-wide'>
								Raqami
							</p>
							<p className='text-slate-900 font-medium mt-2'>
								{driver.vehicle.plate}
							</p>
						</div>
					</CardContent>
				</Card>

				{/* Documents */}
				<Card className='shadow-lg border-none overflow-hidden'>
					<div className='h-1 bg-linear-to-r from-orange-400 to-orange-600'></div>
					<CardHeader className='pb-3'>
						<CardTitle className='text-lg'>📄 Hujjatlar</CardTitle>
					</CardHeader>
					<CardContent className='space-y-4'>
						{Object.entries(driver.documents).map(([doc, status]) => {
							const docLabels = {
								drivingLicense: "Haydovchi guvohnomasi",
								insuranceCertificate: "Sug'urta sertifikati",
								carRegistration: "Avtomobil roʻyxati",
							}
							return (
								<div
									key={doc}
									className='flex items-center justify-between py-3 border-b last:border-0'
								>
									<p className='text-sm font-medium text-slate-900'>
										{docLabels[doc] || doc}
									</p>
									<StatusBadge status={status} />
								</div>
							)
						})}
					</CardContent>
				</Card>
			</DriverPanelGrid>

			{/* Logout Button */}
			<div className='flex gap-4'>
				<Button
					onClick={handleLogout}
					variant='outline'
					className='flex-1 text-red-600 border-red-300 hover:bg-red-50 h-12 text-base font-semibold'
				>
					🚪 Chiqish
				</Button>
			</div>
		</>
	)
}
