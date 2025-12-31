import routesData from "@/data/routes.json"
import { AnimatePresence, motion } from "framer-motion"
import { ChevronLeft, ShoppingBag, Wifi, Wind, Zap } from "lucide-react"
import { useState } from "react"

const containerVariants = {
	hidden: { opacity: 0, y: 20 },
	visible: {
		opacity: 1,
		y: 0,
		transition: {
			staggerChildren: 0.08,
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

const seatVariants = {
	rest: { scale: 1 },
	hover: { scale: 1.1 },
	tap: { scale: 0.9 },
	selected: { scale: 1.15, rotate: 5 },
}

export function RouteDetails({ routeId, onBack, onBooking }) {
	const [selectedSeats, setSelectedSeats] = useState([])
	const [showBookingSummary, setShowBookingSummary] = useState(false)

	const route = routesData.routes.find((r) => r.id === routeId)

	if (!route) {
		return (
			<motion.div className='w-full h-screen flex items-center justify-center'>
				<p className='text-slate-600'>Safar topilmadi</p>
			</motion.div>
		)
	}

	const generateSeats = () => {
		const seats = []
		for (let i = 1; i <= route.totalSeats; i++) {
			seats.push({
				number: i,
				occupied: route.occupiedSeats.includes(i),
			})
		}
		return seats
	}

	const seats = generateSeats()
	const handleSeatToggle = (seatNumber) => {
		if (route.occupiedSeats.includes(seatNumber)) return

		setSelectedSeats((prev) =>
			prev.includes(seatNumber)
				? prev.filter((s) => s !== seatNumber)
				: [...prev, seatNumber]
		)
	}

	const totalPrice = selectedSeats.length * route.price

	return (
		<motion.div
			className='w-full pb-40 px-4 pt-2'
			variants={containerVariants}
			initial='hidden'
			animate='visible'
		>
			{/* Header */}
			<motion.div
				variants={itemVariants}
				className='flex items-center gap-3 mb-6 pt-2'
			>
				<motion.div
					onClick={onBack}
					className='shrink-0 w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center hover:bg-slate-200 transition-colors cursor-pointer'
					whileHover={{ scale: 1.05 }}
					whileTap={{ scale: 0.95 }}
				>
					<ChevronLeft className='w-5 h-5 text-slate-700' />
				</motion.div>
				<div>
					<h1 className='text-2xl font-bold text-slate-900'>
						{route.destination}
					</h1>
					<p className='text-sm text-slate-600'>{route.origin} dan</p>
				</div>
			</motion.div>

			{/* Route Summary Card */}
			<motion.div
				variants={itemVariants}
				className='bg-linear-to-br from-blue-50 to-blue-100 rounded-2xl p-5 mb-6 border border-blue-200'
			>
				<div className='grid grid-cols-3 gap-3 mb-4'>
					<div>
						<p className='text-xs text-blue-600 font-medium mb-1'>Jo'nayish</p>
						<p className='text-sm font-bold text-slate-900'>
							{route.departureTime}
						</p>
					</div>
					<div>
						<p className='text-xs text-blue-600 font-medium mb-1'>
							Davomiyligi
						</p>
						<p className='text-sm font-bold text-slate-900'>{route.duration}</p>
					</div>
					<div>
						<p className='text-xs text-blue-600 font-medium mb-1'>Masofasi</p>
						<p className='text-sm font-bold text-slate-900'>{route.distance}</p>
					</div>
				</div>
				<div className='flex items-center justify-between pt-4 border-t border-blue-200'>
					<div>
						<p className='text-xs text-blue-600 font-medium mb-1'>Kelish</p>
						<p className='text-sm font-bold text-slate-900'>
							{route.arrivalTime}
						</p>
					</div>
					<div className='flex items-center gap-2'>
						<span className='text-lg font-bold text-blue-600'>
							{route.rating}★
						</span>
						<span className='text-xs text-slate-600'>({route.reviews})</span>
					</div>
				</div>
			</motion.div>

			{/* Vehicle Info */}
			<motion.div variants={itemVariants} className='mb-6'>
				<h2 className='text-lg font-bold text-slate-900 mb-3'>
					Transport ma'lumoti
				</h2>
				<div className='bg-white rounded-2xl p-4 border border-slate-200'>
					<div className='flex items-start justify-between mb-4'>
						<div>
							<p className='text-base font-bold text-slate-900'>
								{route.vehicle.name}
							</p>
							<p className='text-xs text-slate-600 mt-1'>
								{route.vehicle.type}
							</p>
						</div>
						<div className='text-right'>
							<p className='text-xs text-slate-600 mb-1'>Sig'imi</p>
							<p className='text-lg font-bold text-slate-900'>
								{route.vehicle.capacity}
							</p>
						</div>
					</div>
					<div className='flex flex-wrap gap-2'>
						{route.vehicle.amenities.map((amenity, idx) => (
							<motion.div
								key={idx}
								className='bg-slate-50 rounded-lg px-3 py-2 flex items-center gap-2 text-xs font-medium text-slate-700 border border-slate-200'
								whileHover={{ scale: 1.05, backgroundColor: "#eff6ff" }}
							>
								<AmenityIcon amenity={amenity} />
								{amenity}
							</motion.div>
						))}
					</div>
				</div>
			</motion.div>

			{/* Seat Selection */}
			<motion.div variants={itemVariants} className='mb-6'>
				<div className='flex items-center justify-between mb-4'>
					<h2 className='text-lg font-bold text-slate-900'>Select Seats</h2>
					<motion.div
						className='text-xs font-semibold px-3 py-1 rounded-full'
						animate={{
							backgroundColor:
								route.availableSeats <= 5 ? "#fee2e2" : "#ecfdf5",
							color: route.availableSeats <= 5 ? "#991b1b" : "#065f46",
						}}
					>
						{route.availableSeats} available
					</motion.div>
				</div>

				<div className='bg-white rounded-2xl p-5 border border-slate-200'>
					{/* Seat Grid */}
					<div className='grid grid-cols-5 gap-2 mb-5'>
						{seats.map((seat, idx) => (
							<motion.button
								key={seat.number}
								variants={seatVariants}
								initial='rest'
								whileHover={!seat.occupied ? "hover" : "rest"}
								animate={
									selectedSeats.includes(seat.number) ? "selected" : "rest"
								}
								whileTap={!seat.occupied ? "tap" : "rest"}
								onClick={() => handleSeatToggle(seat.number)}
								disabled={seat.occupied}
								className={`aspect-square rounded-xl font-bold text-sm flex items-center justify-center transition-all border-2 ${
									seat.occupied
										? "bg-slate-200 border-slate-300 text-slate-600 cursor-not-allowed"
										: selectedSeats.includes(seat.number)
										? "bg-blue-600 border-blue-700 text-white shadow-lg"
										: "bg-white border-slate-300 text-slate-900 hover:border-blue-500"
								}`}
							>
								{seat.number}
							</motion.button>
						))}
					</div>

					{/* Legend */}
					<div className='flex gap-4 justify-center text-xs'>
						<div className='flex items-center gap-2'>
							<div className='w-4 h-4 rounded bg-white border-2 border-slate-300' />
							<span className='text-slate-600'>Available</span>
						</div>
						<div className='flex items-center gap-2'>
							<div className='w-4 h-4 rounded bg-blue-600 border-2 border-blue-700' />
							<span className='text-slate-600'>Selected</span>
						</div>
						<div className='flex items-center gap-2'>
							<div className='w-4 h-4 rounded bg-slate-200 border-2 border-slate-300' />
							<span className='text-slate-600'>Booked</span>
						</div>
					</div>
				</div>

				{selectedSeats.length > 0 && (
					<motion.div
						initial={{ opacity: 0, y: 10 }}
						animate={{ opacity: 1, y: 0 }}
						className='mt-3 p-3 bg-blue-50 rounded-lg border border-blue-200'
					>
						<p className='text-sm text-blue-900'>
							<span className='font-bold'>
								{selectedSeats.length} seat
								{selectedSeats.length !== 1 ? "s" : ""}
							</span>{" "}
							selected: {selectedSeats.sort((a, b) => a - b).join(", ")}
						</p>
					</motion.div>
				)}
			</motion.div>

			{/* Booking Summary - Fixed Bottom */}
			<AnimatePresence>
				{selectedSeats.length > 0 && (
					<motion.div
						initial={{ opacity: 0, y: 40 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: 40 }}
						className='fixed bottom-24 left-4 right-4 max-w-sm mx-auto'
					>
						{" "}
						<motion.div
							onClick={() => setShowBookingSummary(true)}
							className='w-full bg-linear-to-r from-blue-600 to-blue-700 text-white font-bold py-4 rounded-xl shadow-xl flex items-center justify-between px-5 cursor-pointer'
							whileHover={{ scale: 1.02 }}
							whileTap={{ scale: 0.98 }}
						>
							<div className='text-left'>
								<p className='text-xs text-blue-100'>Booking Total</p>
								<p className='text-xl font-bold'>{totalPrice} SAR</p>
							</div>
							<div className='text-right'>
								<ChevronLeft className='w-6 h-6 rotate-180' />
							</div>
						</motion.div>
					</motion.div>
				)}
			</AnimatePresence>

			{/* Booking Summary Modal */}
			<AnimatePresence>
				{showBookingSummary && (
					<BookingSummaryModal
						route={route}
						selectedSeats={selectedSeats}
						totalPrice={totalPrice}
						onConfirm={() => {
							onBooking?.({
								routeId: route.id,
								seats: selectedSeats,
								totalPrice,
							})
						}}
						onClose={() => setShowBookingSummary(false)}
					/>
				)}
			</AnimatePresence>
		</motion.div>
	)
}

function BookingSummaryModal({
	route,
	selectedSeats,
	totalPrice,
	onConfirm,
	onClose,
}) {
	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
			onClick={onClose}
			className='fixed inset-0 bg-black/50 z-50 flex items-end'
		>
			<motion.div
				initial={{ y: 400 }}
				animate={{ y: 0 }}
				exit={{ y: 400 }}
				onClick={(e) => e.stopPropagation()}
				className='w-full bg-white rounded-3xl rounded-b-none p-6 max-w-md mx-auto'
			>
				<div className='w-12 h-1 bg-slate-300 rounded-full mx-auto mb-6' />

				<h2 className='text-2xl font-bold text-slate-900 mb-4'>
					Confirm Booking
				</h2>

				{/* Summary Details */}
				<div className='space-y-4 mb-6'>
					<div className='flex items-start justify-between pb-4 border-b border-slate-200'>
						<div>
							<p className='text-sm text-slate-600 mb-1'>Route</p>
							<p className='font-bold text-slate-900'>{route.destination}</p>
							<p className='text-xs text-slate-600 mt-1'>from {route.origin}</p>
						</div>
						<div className='text-right'>
							<p className='text-sm text-slate-600 mb-1'>Departure</p>
							<p className='font-bold text-slate-900'>{route.departureTime}</p>
						</div>
					</div>

					<div className='bg-slate-50 rounded-xl p-4'>
						<p className='text-sm text-slate-600 mb-2'>Seats</p>
						<div className='flex flex-wrap gap-2'>
							{selectedSeats.map((seat) => (
								<motion.div
									key={seat}
									className='bg-blue-600 text-white px-3 py-1 rounded-lg font-semibold text-sm'
									whileHover={{ scale: 1.05 }}
								>
									Seat {seat}
								</motion.div>
							))}
						</div>
					</div>

					<div className='space-y-2'>
						<div className='flex justify-between'>
							<span className='text-slate-600'>Base Fare</span>
							<span className='font-semibold text-slate-900'>
								{route.price} SAR
							</span>
						</div>
						<div className='flex justify-between'>
							<span className='text-slate-600'>
								Seats ({selectedSeats.length})
							</span>
							<span className='font-semibold text-slate-900'>
								×{selectedSeats.length}
							</span>
						</div>
						<div className='border-t border-slate-200 pt-2 flex justify-between'>
							<span className='font-bold text-slate-900'>Total</span>
							<span className='text-2xl font-bold text-blue-600'>
								{totalPrice} SAR
							</span>
						</div>
					</div>
				</div>

				{/* Action Buttons */}
				<div className='space-y-3'>
					<motion.div
						onClick={onConfirm}
						className='w-full bg-blue-600 text-white font-bold py-4 rounded-xl hover:bg-blue-700 transition-colors cursor-pointer'
						whileHover={{ scale: 1.02 }}
						whileTap={{ scale: 0.98 }}
					>
						Confirm & Pay
					</motion.div>
					<motion.div
						onClick={onClose}
						className='w-full bg-slate-200 text-slate-900 font-bold py-4 rounded-xl hover:bg-slate-300 transition-colors cursor-pointer'
						whileHover={{ scale: 1.02 }}
						whileTap={{ scale: 0.98 }}
					>
						Cancel
					</motion.div>
				</div>
			</motion.div>
		</motion.div>
	)
}

function AmenityIcon({ amenity }) {
	const icons = {
		WiFi: <Wifi className='w-3 h-3' />,
		AC: <Wind className='w-3 h-3' />,
		Charging: <Zap className='w-3 h-3' />,
		Snacks: <ShoppingBag className='w-3 h-3' />,
		"Reclining Seats": <Wind className='w-3 h-3' />,
	}
	return icons[amenity] || <div className='w-3 h-3' />
}
