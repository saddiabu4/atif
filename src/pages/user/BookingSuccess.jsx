import routesData from "@/data/routes.json"
import { motion } from "framer-motion"
import {
	ArrowRight,
	CheckCircle2,
	Clock,
	Copy,
	MapPin,
	Share2,
	Users,
} from "lucide-react"
import { useState } from "react"

const containerVariants = {
	hidden: { opacity: 0, scale: 0.9 },
	visible: {
		opacity: 1,
		scale: 1,
		transition: {
			staggerChildren: 0.15,
			delayChildren: 0.2,
		},
	},
}

const itemVariants = {
	hidden: { opacity: 0, y: 20 },
	visible: {
		opacity: 1,
		y: 0,
		transition: { type: "spring", stiffness: 100, damping: 12 },
	},
}

export function BookingSuccess({ booking, onDone }) {
	const [copied, setCopied] = useState(false)
	const route = routesData.routes.find((r) => r.id === booking.routeId)

	if (!route) return null

	const bookingRef = `SHO-${Date.now().toString().slice(-6)}`
	const totalPrice = booking.totalPrice

	const handleCopyRef = () => {
		navigator.clipboard.writeText(bookingRef)
		setCopied(true)
		setTimeout(() => setCopied(false), 2000)
	}

	return (
		<motion.div
			className='w-full pb-32 px-4 pt-4 flex flex-col items-center justify-center min-h-screen'
			variants={containerVariants}
			initial='hidden'
			animate='visible'
		>
			{/* Success Animation */}
			<motion.div variants={itemVariants} className='mb-8'>
				{" "}
				<motion.div
					animate={{ scale: [0.8, 1] }}
					transition={{ duration: 0.6, type: "spring" }}
					className='flex justify-center'
				>
					<div className='relative'>
						<motion.div
							animate={{ rotate: 360 }}
							transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
							className='absolute inset-0 rounded-full bg-emerald-500/20 blur-xl'
						/>
						<motion.div
							animate={{ scale: [1, 1.2, 1] }}
							transition={{ duration: 2, repeat: Infinity }}
							className='relative'
						>
							<CheckCircle2
								className='w-20 h-20 text-emerald-500'
								strokeWidth={1.5}
							/>
						</motion.div>
					</div>
				</motion.div>
			</motion.div>

			{/* Success Message */}
			<motion.div variants={itemVariants} className='text-center mb-8'>
				<h1 className='text-3xl font-bold text-slate-900 mb-2'>
					Bron tasdiqlandi!
				</h1>
				<p className='text-slate-600'>Sizning safar tayyor</p>
			</motion.div>

			{/* Booking Reference */}
			<motion.div
				variants={itemVariants}
				className='w-full bg-linear-to-br from-blue-50 to-blue-100 rounded-2xl p-5 mb-6 border border-blue-200'
			>
				<p className='text-xs text-blue-600 font-medium mb-2'>Bron shakli</p>
				<div className='flex items-center justify-between'>
					<div>
						<p className='text-2xl font-bold text-slate-900 font-mono'>
							{bookingRef}
						</p>
						<p className='text-xs text-blue-600 mt-1'>
							Save this for your records
						</p>
					</div>{" "}
					<motion.div
						onClick={handleCopyRef}
						className='shrink-0 p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors cursor-pointer'
						whileHover={{ scale: 1.05 }}
						whileTap={{ scale: 0.95 }}
					>
						<Copy
							className={`w-5 h-5 transition-all ${
								copied ? "text-emerald-300" : ""
							}`}
						/>
					</motion.div>
				</div>
			</motion.div>

			{/* Trip Details */}
			<motion.div variants={itemVariants} className='w-full mb-6'>
				<h2 className='text-lg font-bold text-slate-900 mb-3'>Trip Details</h2>
				<div className='bg-white rounded-2xl p-5 border border-slate-200 space-y-4'>
					{/* Route */}
					<div className='flex items-start gap-3 pb-4 border-b border-slate-200'>
						<MapPin className='w-5 h-5 text-blue-600 shrink-0 mt-0.5' />
						<div>
							<p className='text-xs text-slate-600 mb-1'>Route</p>
							<p className='font-bold text-slate-900'>{route.destination}</p>
							<p className='text-xs text-slate-600 mt-1'>from {route.origin}</p>
						</div>
					</div>

					{/* Date & Time */}
					<div className='flex items-start gap-3 pb-4 border-b border-slate-200'>
						<Clock className='w-5 h-5 text-blue-600 shrink-0 mt-0.5' />
						<div>
							<p className='text-xs text-slate-600 mb-1'>Departure</p>
							<p className='font-bold text-slate-900'>{route.departureTime}</p>
							<p className='text-xs text-slate-600 mt-1'>
								{route.duration} journey
							</p>
						</div>
					</div>

					{/* Seats */}
					<div className='flex items-start gap-3'>
						<Users className='w-5 h-5 text-blue-600 shrink-0 mt-0.5' />
						<div>
							<p className='text-xs text-slate-600 mb-1'>Seats</p>
							<div className='flex flex-wrap gap-2'>
								{booking.seats.map((seat) => (
									<motion.span
										key={seat}
										className='inline-block bg-blue-600 text-white px-3 py-1 rounded-lg font-semibold text-sm'
										whileHover={{ scale: 1.05 }}
									>
										{seat}
									</motion.span>
								))}
							</div>
						</div>
					</div>
				</div>
			</motion.div>

			{/* Price Breakdown */}
			<motion.div variants={itemVariants} className='w-full mb-8'>
				<h2 className='text-lg font-bold text-slate-900 mb-3'>Payment</h2>
				<div className='bg-white rounded-2xl p-5 border border-slate-200 space-y-3'>
					<div className='flex justify-between'>
						<span className='text-slate-600'>Base Fare</span>
						<span className='font-semibold text-slate-900'>
							{route.price} SAR
						</span>
					</div>
					<div className='flex justify-between'>
						<span className='text-slate-600'>Number of Seats</span>
						<span className='font-semibold text-slate-900'>
							×{booking.seats.length}
						</span>
					</div>
					<div className='border-t border-slate-200 pt-3 flex justify-between items-center'>
						<span className='font-bold text-slate-900'>Total Amount</span>
						<span className='text-3xl font-bold text-blue-600'>
							{booking.totalPrice} SAR
						</span>
					</div>
					<p className='text-xs text-emerald-600 flex items-center gap-2 pt-2'>
						<CheckCircle2 className='w-4 h-4' />
						Payment confirmed
					</p>
				</div>
			</motion.div>

			{/* Quick Tips */}
			<motion.div variants={itemVariants} className='w-full mb-8'>
				<div className='bg-amber-50 rounded-2xl p-4 border border-amber-200'>
					<p className='text-sm font-bold text-amber-900 mb-2'>Pro Tips</p>
					<ul className='space-y-2 text-xs text-amber-800'>
						<li>• Arrive 15 minutes before departure</li>
						<li>• Bring a valid ID for check-in</li>
						<li>• Download your ticket for easy access</li>
					</ul>
				</div>
			</motion.div>

			{/* Action Buttons */}
			<motion.div variants={itemVariants} className='w-full space-y-3'>
				<motion.div
					onClick={onDone}
					className='w-full bg-blue-600 text-white font-bold py-4 rounded-xl hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 cursor-pointer'
					whileHover={{ scale: 1.02 }}
					whileTap={{ scale: 0.98 }}
				>
					Back to Home
					<ArrowRight className='w-4 h-4' />
				</motion.div>
				<motion.div
					className='w-full bg-slate-100 text-slate-900 font-bold py-4 rounded-xl hover:bg-slate-200 transition-colors flex items-center justify-center gap-2 cursor-pointer'
					whileHover={{ scale: 1.02 }}
					whileTap={{ scale: 0.98 }}
				>
					<Share2 className='w-4 h-4' />
					Share Booking
				</motion.div>
			</motion.div>
		</motion.div>
	)
}
