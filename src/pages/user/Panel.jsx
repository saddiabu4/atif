import { BottomNav } from "@/components/mobile/BottomNav"
import { AnimatePresence, motion } from "framer-motion"
import { Home, Ticket, User } from "lucide-react"
import { useState } from "react"
import { BookingSuccess } from "./BookingSuccess"
import { MyBookings } from "./Bookings"
import { UserHome } from "./Home"
import { UserProfile } from "./Profile"
import { RouteDetails } from "./RouteDetails"

export function UserPanel() {
	const [activeTab, setActiveTab] = useState("home")
	const [currentPage, setCurrentPage] = useState("list") // list, details, success
	const [selectedRoute, setSelectedRoute] = useState(null)
	const [bookingData, setBookingData] = useState(null)

	const navItems = [
		{
			id: "home",
			label: "Bosh sahifa",
			icon: Home,
		},
		{
			id: "bookings",
			label: "Bronlar",
			icon: Ticket,
		},
		{
			id: "profile",
			label: "Profil",
			icon: User,
		},
	]

	const handleRouteSelect = (route) => {
		setSelectedRoute(route)
		setCurrentPage("details")
	}

	const handleBooking = (data) => {
		setBookingData(data)
		setCurrentPage("success")
	}

	const handleBackToHome = () => {
		setCurrentPage("list")
		setSelectedRoute(null)
		setActiveTab("home")
	}

	return (
		<div className='relative w-full h-screen bg-white'>
			{/* Mobile Container */}
			<div className='max-w-md mx-auto h-full flex flex-col bg-gray-50 relative'>
				{/* Content Area */}
				<div className='flex-1 overflow-y-auto'>
					<AnimatePresence mode='wait'>
						{activeTab === "home" && currentPage === "list" && (
							<motion.div
								key='home'
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								exit={{ opacity: 0, y: -20 }}
								transition={{ duration: 0.3 }}
							>
								<UserHome onRouteSelect={handleRouteSelect} />
							</motion.div>
						)}

						{activeTab === "home" && currentPage === "details" && (
							<motion.div
								key='details'
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								exit={{ opacity: 0, y: -20 }}
								transition={{ duration: 0.3 }}
							>
								<RouteDetails
									routeId={selectedRoute?.id}
									onBack={handleBackToHome}
									onBooking={handleBooking}
								/>
							</motion.div>
						)}

						{activeTab === "home" && currentPage === "success" && (
							<motion.div
								key='success'
								initial={{ opacity: 0, scale: 0.9 }}
								animate={{ opacity: 1, scale: 1 }}
								exit={{ opacity: 0, scale: 0.9 }}
								transition={{ duration: 0.3 }}
							>
								<BookingSuccess
									booking={bookingData}
									onDone={handleBackToHome}
								/>
							</motion.div>
						)}

						{activeTab === "bookings" && (
							<motion.div
								key='bookings'
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								exit={{ opacity: 0, y: -20 }}
								transition={{ duration: 0.3 }}
							>
								<MyBookings />
							</motion.div>
						)}

						{activeTab === "profile" && (
							<motion.div
								key='profile'
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								exit={{ opacity: 0, y: -20 }}
								transition={{ duration: 0.3 }}
							>
								<UserProfile
									onLogout={() => {
										setActiveTab("home")
										setCurrentPage("list")
									}}
								/>
							</motion.div>
						)}
					</AnimatePresence>
				</div>

				{/* Bottom Navigation */}
				<BottomNav
					items={navItems}
					activeItem={activeTab}
					onItemClick={setActiveTab}
				/>
			</div>
		</div>
	)
}
