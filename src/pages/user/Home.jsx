import routesData from "@/data/routes.json"
import { AnimatePresence, motion } from "framer-motion"
import { ArrowRight, Clock, MapPin, Users, Zap } from "lucide-react"
import { useState } from "react"

const containerVariants = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: {
			staggerChildren: 0.1,
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

const cardHoverVariants = {
	rest: { scale: 1, y: 0 },
	hover: { scale: 1.02, y: -8, transition: { duration: 0.2 } },
	tap: { scale: 0.98 },
}

export function UserHome({ onRouteSelect }) {
	const [selectedRoute, setSelectedRoute] = useState(null)
	const [expandedRoute, setExpandedRoute] = useState(null)

	const handleRouteClick = (route) => {
		setSelectedRoute(route.id)
		onRouteSelect?.(route)
	}

	const routes = routesData.routes

	return (
		<motion.div
			className='w-full pb-32 px-4 pt-4'
			variants={containerVariants}
			initial='hidden'
			animate='visible'
		>
			{/* Hero Section */}
			<motion.div variants={itemVariants} className='mb-8'>
				<div className='relative overflow-hidden rounded-3xl bg-linear-to-br from-blue-600 to-blue-800 p-6 shadow-lg'>
					<motion.div
						className='absolute top-0 right-0 w-40 h-40 bg-blue-400/20 rounded-full blur-3xl'
						animate={{ scale: [1, 1.2, 1], rotate: [0, 360] }}
						transition={{ duration: 20, repeat: Infinity }}
					/>
					<div className='relative z-10'>
						<h1 className='text-3xl font-bold text-white mb-2'>
							Safarni Bron Qiling
						</h1>
						<p className='text-blue-100 text-sm'>
							Eng yaxshi sayohatni topib bron qiling
						</p>
					</div>
				</div>
			</motion.div>

			{/* Quick Search Stats */}
			<motion.div
				variants={itemVariants}
				className='grid grid-cols-2 gap-3 mb-8'
			>
				<motion.div
					className='bg-linear-to-br from-emerald-50 to-emerald-100 rounded-2xl p-4 border border-emerald-200'
					whileHover={{ scale: 1.05 }}
					whileTap={{ scale: 0.98 }}
				>
					<div className='text-2xl font-bold text-emerald-700 mb-1'>
						{routes.length}
					</div>
					<div className='text-xs text-emerald-600 font-medium'>
						Mavjud safarlar
					</div>
				</motion.div>
				<motion.div
					className='bg-linear-to-br from-orange-50 to-orange-100 rounded-2xl p-4 border border-orange-200'
					whileHover={{ scale: 1.05 }}
					whileTap={{ scale: 0.98 }}
				>
					<div className='text-2xl font-bold text-orange-700 mb-1'>4.7★</div>
					<div className='text-xs text-orange-600 font-medium'>
						O'rtacha reyting
					</div>
				</motion.div>
			</motion.div>

			{/* Routes List */}
			<motion.div variants={itemVariants} className='space-y-3'>
				<h2 className='text-xl font-bold text-slate-900 px-1 mb-4 flex items-center gap-2'>
					<Zap className='w-5 h-5 text-blue-600' />
					Mashhur safarlar
				</h2>

				<AnimatePresence mode='popLayout'>
					{routes.map((route, index) => (
						<motion.button
							key={route.id}
							variants={cardHoverVariants}
							initial='rest'
							whileHover='hover'
							whileTap='tap'
							onClick={() => handleRouteClick(route)}
							className='w-full text-left overflow-hidden rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-lg transition-shadow'
						>
							<motion.div
								className='relative'
								layout
								layoutId={`route-${route.id}`}
							>
								{/* Route Image */}
								<div className='relative h-40 overflow-hidden bg-slate-200'>
									<motion.img
										src={route.image}
										alt={route.destination}
										className='w-full h-full object-cover'
										initial={{ scale: 1 }}
										whileHover={{ scale: 1.1 }}
										transition={{ duration: 0.3 }}
									/>
									<div className='absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent' />
									<div className='absolute bottom-4 left-4 right-4'>
										<p className='text-white font-bold text-lg'>
											{route.destination}
										</p>
										<p className='text-white/80 text-xs'>from {route.origin}</p>
									</div>
								</div>

								{/* Route Info */}
								<div className='p-4 space-y-3'>
									{/* Time and Duration */}
									<div className='flex items-center gap-3'>
										<motion.div
											className='flex items-center gap-2 text-sm'
											whileHover={{ scale: 1.05 }}
										>
											<Clock className='w-4 h-4 text-blue-600' />
											<span className='font-bold text-slate-900'>
												{route.departureTime}
											</span>
											<span className='text-slate-600'>({route.duration})</span>
										</motion.div>
										<div className='flex-1' />
										<motion.div
											className='text-right'
											whileHover={{ scale: 1.05 }}
										>
											<p className='text-3xl font-bold text-blue-600'>
												{route.price.toLocaleString("uz-UZ")}
											</p>
											<p className='text-xs text-slate-600 font-medium'>
												so'm/o'rn
											</p>
										</motion.div>
									</div>

									{/* Route Details */}
									<div className='flex items-center gap-2 p-2 bg-slate-50 rounded-lg'>
										<MapPin className='w-4 h-4 text-slate-600' />
										<span className='text-sm text-slate-700 font-medium'>
											{route.distance}
										</span>
									</div>

									{/* Reyting & O'rinlar */}
									<motion.div
										className='flex items-center justify-between pt-3 border-t border-slate-200'
										initial={{ opacity: 0 }}
										animate={{ opacity: 1 }}
										transition={{ delay: 0.1 }}
									>
										<div className='flex items-center gap-2'>
											<span className='text-sm font-bold text-yellow-500'>
												{route.rating}★
											</span>
											<span className='text-xs text-slate-600'>
												({route.reviews} izohlar)
											</span>
										</div>
										<motion.div
											className='flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100'
											animate={{
												backgroundColor:
													route.availableSeats <= 5
														? "rgb(254, 226, 226)"
														: "rgb(220, 252, 231)",
											}}
										>
											<Users className='w-4 h-4' />
											<span
												className='text-sm font-bold'
												style={{
													color:
														route.availableSeats <= 5 ? "#dc2626" : "#059669",
												}}
											>
												{route.availableSeats}/{route.totalSeats}
											</span>
										</motion.div>
									</motion.div>

									{/* CTA Button */}
									<motion.button
										className='w-full bg-blue-600 text-white font-semibold py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-blue-700 transition-colors mt-3'
										whileHover={{ scale: 1.02 }}
										whileTap={{ scale: 0.98 }}
									>
										Bron qilish
										<ArrowRight className='w-4 h-4' />
									</motion.button>
								</div>
							</motion.div>
						</motion.button>
					))}
				</AnimatePresence>
			</motion.div>

			{/* Empty State */}
			{routes.length === 0 && (
				<motion.div variants={itemVariants} className='text-center py-12'>
					<MapPin className='w-12 h-12 text-slate-300 mx-auto mb-4' />
					<p className='text-slate-600 font-medium'>Safarlar mavjud emas</p>
					<p className='text-slate-500 text-sm'>
						Izlash shartlarini o'zgartirishga harakat qiling
					</p>
				</motion.div>
			)}
		</motion.div>
	)
}
