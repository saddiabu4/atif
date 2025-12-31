import bookingsData from "@/data/bookings.json"
import routesData from "@/data/routes.json"
import { AnimatePresence, motion } from "framer-motion"
import {
	Calendar,
	CheckCircle2,
	ChevronDown,
	Clock,
	MapPin,
} from "lucide-react"
import { useState } from "react"

const containerVariants = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: {
			staggerChildren: 0.1,
			delayChildren: 0.1,
		},
	},
}

const itemVariants = {
	hidden: { opacity: 0, y: 15 },
	visible: {
		opacity: 1,
		y: 0,
		transition: { type: "spring", stiffness: 100, damping: 12 },
	},
}

const cardHoverVariants = {
	rest: { scale: 1, y: 0 },
	hover: { scale: 1.02, y: -4 },
}

export function MyBookings() {
	const [filter, setFilter] = useState("all") // all, upcoming, completed
	const [expandedBooking, setExpandedBooking] = useState(null)

	const bookings = bookingsData.bookings
	const routes = routesData.routes

	const filteredBookings = bookings.filter((booking) => {
		if (filter === "upcoming") return booking.status === "upcoming"
		if (filter === "completed") return booking.status === "completed"
		return true
	})

	return (
		<motion.div
			className='w-full pb-32 px-4 pt-4'
			variants={containerVariants}
			initial='hidden'
			animate='visible'
		>
			{" "}
			{/* Header */}
			<motion.div variants={itemVariants} className='mb-6'>
				<h1 className='text-3xl font-bold text-slate-900 mb-2'>
					Mening bronlar
				</h1>
				<p className='text-slate-600 text-sm'>
					Safarlaringizni ko'ring va boshqaring
				</p>
			</motion.div>
			{/* Filter Tabs */}
			<motion.div variants={itemVariants} className='flex gap-2 mb-6'>
				{[
					{ id: "all", label: "Hamma", count: bookings.length },
					{
						id: "upcoming",
						label: "Kelayotgan",
						count: bookings.filter((b) => b.status === "upcoming").length,
					},
					{
						id: "completed",
						label: "Tugallangan",
						count: bookings.filter((b) => b.status === "completed").length,
					},
				].map((tab) => (
					<motion.div
						key={tab.id}
						onClick={() => setFilter(tab.id)}
						className={`px-4 py-2 rounded-full font-semibold text-sm transition-all cursor-pointer ${
							filter === tab.id
								? "bg-blue-600 text-white shadow-md"
								: "bg-slate-200 text-slate-700 hover:bg-slate-300"
						}`}
						whileHover={{ scale: 1.05 }}
						whileTap={{ scale: 0.95 }}
					>
						{tab.label}
						{tab.count > 0 && (
							<span
								className={`ml-2 px-2 py-0.5 rounded-full text-xs font-bold ${
									filter === tab.id ? "bg-white/30" : "bg-slate-300/50"
								}`}
							>
								{tab.count}
							</span>
						)}
					</motion.div>
				))}
			</motion.div>
			{/* Bookings List */}
			<motion.div variants={itemVariants} className='space-y-3'>
				<AnimatePresence mode='popLayout'>
					{filteredBookings.length > 0 ? (
						filteredBookings.map((booking, index) => {
							const route = routes.find((r) => r.id === booking.routeId)
							if (!route) return null

							const isExpanded = expandedBooking === booking.id
							const departureDate = new Date(booking.departureDate)
							const isUpcoming = booking.status === "upcoming"

							return (
								<motion.div
									key={booking.id}
									variants={cardHoverVariants}
									initial='rest'
									whileHover='hover'
									whileTap={{ scale: 0.98 }}
									onClick={() =>
										setExpandedBooking(isExpanded ? null : booking.id)
									}
									className='w-full text-left overflow-hidden rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-lg transition-shadow cursor-pointer'
								>
									<motion.div layout className='p-4 space-y-3'>
										{/* Header Row */}
										<div className='flex items-start gap-3 justify-between'>
											{/* Status & Route */}
											<div className='flex-1'>
												{" "}
												<motion.div
													className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold mb-2 ${
														isUpcoming
															? "bg-blue-100 text-blue-700"
															: "bg-emerald-100 text-emerald-700"
													}`}
													whileHover={{ scale: 1.05 }}
												>
													{isUpcoming ? (
														<Clock className='w-3 h-3' />
													) : (
														<CheckCircle2 className='w-3 h-3' />
													)}
													{isUpcoming ? "Kelayotgan" : "Tugallangan"}
												</motion.div>
												<h3 className='font-bold text-slate-900'>
													{route.destination}
												</h3>
												<p className='text-xs text-slate-600 flex items-center gap-1 mt-0.5'>
													<MapPin className='w-3 h-3' />
													{route.origin}
												</p>
											</div>
											<motion.div
												animate={{ rotate: isExpanded ? 180 : 0 }}
												className='shrink-0'
											>
												<ChevronDown className='w-5 h-5 text-slate-400' />
											</motion.div>
										</div>
										{/* Details Grid */}
										<div className='grid grid-cols-3 gap-3 p-3 bg-slate-50 rounded-lg'>
											<div>
												<p className='text-xs text-slate-600 font-medium'>
													Departure
												</p>
												<div className='flex items-center gap-1 mt-1'>
													<Clock className='w-3 h-3 text-blue-600' />
													<p className='text-sm font-bold text-slate-900'>
														{route.departureTime}
													</p>
												</div>
											</div>
											<div>
												<p className='text-xs text-slate-600 font-medium'>
													Date
												</p>
												<div className='flex items-center gap-1 mt-1'>
													<Calendar className='w-3 h-3 text-slate-600' />
													<p className='text-sm font-bold text-slate-900'>
														{departureDate.toLocaleDateString("en-US", {
															month: "short",
															day: "numeric",
														})}
													</p>
												</div>
											</div>
											<div className='text-right'>
												<p className='text-xs text-slate-600 font-medium'>
													Price
												</p>
												<p className='text-sm font-bold text-blue-600 mt-1'>
													{booking.price} SAR
												</p>
											</div>
										</div>
										{/* Expanded Details */}
										<AnimatePresence>
											{isExpanded && (
												<motion.div
													initial={{
														opacity: 0,
														height: 0,
													}}
													animate={{
														opacity: 1,
														height: "auto",
													}}
													exit={{
														opacity: 0,
														height: 0,
													}}
													transition={{
														duration: 0.2,
													}}
													className='pt-4 border-t border-slate-200 mt-4 space-y-3'
												>
													<div>
														<p className='text-xs text-slate-600 mb-2'>
															Booking Reference
														</p>
														<motion.div
															className='flex items-center justify-between bg-slate-50 rounded-lg p-3'
															whileHover={{
																backgroundColor: "rgb(241, 245, 249)",
															}}
														>
															<code className='font-mono font-bold text-slate-900'>
																{booking.bookingRef}
															</code>
															<motion.div
																whileHover={{
																	scale: 1.1,
																}}
																whileTap={{
																	scale: 0.9,
																}}
																onClick={(e) => {
																	e.stopPropagation()
																	navigator.clipboard.writeText(
																		booking.bookingRef
																	)
																}}
																className='text-blue-600 hover:text-blue-700 font-semibold text-sm cursor-pointer'
															>
																Copy
															</motion.div>
														</motion.div>
													</div>

													<div>
														<p className='text-xs text-slate-600 mb-2'>
															Passenger Info
														</p>
														<div className='bg-slate-50 rounded-lg p-3 space-y-2'>
															<div className='flex justify-between'>
																<span className='text-sm text-slate-600'>
																	Name
																</span>
																<span className='text-sm font-semibold text-slate-900'>
																	{booking.passengerName}
																</span>
															</div>
															<div className='flex justify-between'>
																<span className='text-sm text-slate-600'>
																	Phone
																</span>
																<span className='text-sm font-semibold text-slate-900'>
																	{booking.phone}
																</span>
															</div>
														</div>
													</div>

													<div>
														<p className='text-xs text-slate-600 mb-2'>
															Status
														</p>
														<div className='flex items-center gap-2 text-sm font-semibold'>
															{isUpcoming ? (
																<>
																	<Clock className='w-4 h-4 text-blue-600' />
																	<span className='text-blue-600'>
																		Ready for boarding
																	</span>
																</>
															) : (
																<>
																	<CheckCircle2 className='w-4 h-4 text-emerald-600' />
																	<span className='text-emerald-600'>
																		Trip completed
																	</span>
																</>
															)}
														</div>
													</div>

													{isUpcoming && (
														<motion.div
															className='w-full bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition-colors mt-4 flex items-center justify-center cursor-pointer'
															whileHover={{
																scale: 1.02,
															}}
															whileTap={{
																scale: 0.98,
															}}
														>
															View E-Ticket
														</motion.div>
													)}
												</motion.div>
											)}
										</AnimatePresence>{" "}
									</motion.div>
								</motion.div>
							)
						})
					) : (
						<motion.div variants={itemVariants} className='text-center py-16'>
							<Calendar className='w-12 h-12 text-slate-300 mx-auto mb-4' />
							<p className='text-slate-600 font-medium mb-1'>
								No {filter !== "all" ? filter : ""}
								{filter !== "all" && " "}bookings
							</p>
							<p className='text-slate-500 text-sm'>
								Start booking your next trip
							</p>
						</motion.div>
					)}
				</AnimatePresence>
			</motion.div>
		</motion.div>
	)
}
