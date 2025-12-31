import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { driverAPI } from "@/lib/api"
import { motion } from "framer-motion"
import { Calendar, DollarSign, TrendingUp } from "lucide-react"
import { useEffect, useState } from "react"

const CURRENT_DRIVER_ID = "driver_1"

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

export function DriverEarnings() {
	const [driver, setDriver] = useState(null)
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		loadDriver()
	}, [])

	const loadDriver = async () => {
		setLoading(true)
		const data = await driverAPI.getById(CURRENT_DRIVER_ID)
		setDriver(data)
		setLoading(false)
	}

	if (loading || !driver)
		return (
			<div className='p-8 flex items-center justify-center min-h-screen'>
				<div className='animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600'></div>
			</div>
		)

	const StatCard = ({ icon: Icon, label, value, trend }) => (
		<motion.div variants={itemVariants}>
			<Card className='relative overflow-hidden hover:shadow-lg transition-shadow duration-300 h-full'>
				<CardContent className='pt-6'>
					<div className='flex items-center justify-between'>
						<div className='flex-1'>
							<p className='text-sm text-slate-600 font-medium'>{label}</p>
							<p className='text-3xl font-bold mt-2 text-slate-900'>{value}</p>
							{trend && (
								<motion.p
									className='text-sm text-emerald-600 mt-2 font-medium'
									initial={{ scale: 0.9 }}
									animate={{ scale: 1 }}
									transition={{ type: "spring", stiffness: 200 }}
								>
									↑ {trend} from last period
								</motion.p>
							)}
						</div>
						<motion.div
							whileHover={{ scale: 1.1, rotate: 5 }}
							className='shrink-0'
						>
							<Icon className='w-12 h-12 text-blue-500/30' />
						</motion.div>
					</div>
				</CardContent>
			</Card>
		</motion.div>
	)

	return (
		<motion.div
			className='w-full pb-8'
			variants={containerVariants}
			initial='hidden'
			animate='visible'
		>
			{/* Header */}
			<motion.div variants={itemVariants} className='mb-8'>
				<h1 className='text-3xl font-bold text-slate-900'>Earnings</h1>
				<p className='text-slate-600 text-sm mt-1'>
					Your income summary and statistics
				</p>
			</motion.div>

			{/* Stat Cards Grid */}
			<motion.div
				className='grid grid-cols-1 sm:grid-cols-1 gap-6 mb-8'
				variants={containerVariants}
			>
				<StatCard
					icon={DollarSign}
					label="Today's Earnings"
					value={`SAR ${driver.earnings.today}`}
				/>
				<StatCard
					icon={Calendar}
					label='This Month'
					value={`SAR ${driver.earnings.thisMonth}`}
					trend='12.5%'
				/>
				<StatCard
					icon={TrendingUp}
					label='Total Earned'
					value={`SAR ${driver.earnings.total}`}
				/>
			</motion.div>

			{/* Detailed Cards */}
			<div className='grid grid-cols-1 lg:grid-cols-1 gap-6'>
				{/* Earning Breakdown */}
				<motion.div variants={itemVariants}>
					<Card className='h-full'>
						<CardHeader>
							<CardTitle className='text-slate-900'>
								Earning Breakdown
							</CardTitle>
						</CardHeader>
						<CardContent>
							<div className='space-y-6'>
								<motion.div
									initial={{ opacity: 0, x: -20 }}
									animate={{ opacity: 1, x: 0 }}
									transition={{ delay: 0.2 }}
								>
									<div className='flex justify-between mb-2'>
										<span className='text-sm font-medium text-slate-700'>
											Today
										</span>
										<span className='text-sm font-bold text-slate-900'>
											SAR {driver.earnings.today}
										</span>
									</div>
									<div className='w-full bg-slate-200 rounded-full h-2.5 overflow-hidden'>
										<motion.div
											className='bg-linear-to-r from-emerald-500 to-emerald-400 h-2.5 rounded-full'
											initial={{ width: 0 }}
											animate={{ width: "30%" }}
											transition={{ delay: 0.4, duration: 1 }}
										></motion.div>
									</div>
								</motion.div>
								<motion.div
									initial={{ opacity: 0, x: -20 }}
									animate={{ opacity: 1, x: 0 }}
									transition={{ delay: 0.3 }}
								>
									<div className='flex justify-between mb-2'>
										<span className='text-sm font-medium text-slate-700'>
											This Month
										</span>
										<span className='text-sm font-bold text-slate-900'>
											SAR {driver.earnings.thisMonth}
										</span>
									</div>
									<div className='w-full bg-slate-200 rounded-full h-2.5 overflow-hidden'>
										<motion.div
											className='bg-linear-to-r from-blue-500 to-blue-400 h-2.5 rounded-full'
											initial={{ width: 0 }}
											animate={{ width: "75%" }}
											transition={{ delay: 0.5, duration: 1 }}
										></motion.div>
									</div>
								</motion.div>
								<motion.div
									initial={{ opacity: 0, x: -20 }}
									animate={{ opacity: 1, x: 0 }}
									transition={{ delay: 0.4 }}
								>
									<div className='flex justify-between mb-2'>
										<span className='text-sm font-medium text-slate-700'>
											Total Earned
										</span>
										<span className='text-sm font-bold text-slate-900'>
											SAR {driver.earnings.total}
										</span>
									</div>
									<div className='w-full bg-slate-200 rounded-full h-2.5 overflow-hidden'>
										<motion.div
											className='bg-linear-to-r from-purple-500 to-purple-400 h-2.5 rounded-full'
											initial={{ width: 0 }}
											animate={{ width: "90%" }}
											transition={{ delay: 0.6, duration: 1 }}
										></motion.div>
									</div>
								</motion.div>
							</div>
						</CardContent>
					</Card>
				</motion.div>

				{/* Trip Statistics */}
				<motion.div variants={itemVariants}>
					<Card className='h-full'>
						<CardHeader>
							<CardTitle className='text-slate-900'>Trip Statistics</CardTitle>
						</CardHeader>
						<CardContent>
							<div className='space-y-4'>
								<motion.div
									className='flex justify-between items-center p-3 bg-slate-50 rounded-lg'
									whileHover={{ backgroundColor: "rgb(241, 245, 249)" }}
								>
									<span className='text-sm text-slate-600 font-medium'>
										Total Trips
									</span>
									<span className='text-2xl font-bold text-slate-900'>
										{driver.totalTrips}
									</span>
								</motion.div>
								<motion.div
									className='flex justify-between items-center p-3 bg-slate-50 rounded-lg'
									whileHover={{ backgroundColor: "rgb(241, 245, 249)" }}
								>
									<span className='text-sm text-slate-600 font-medium'>
										Average Rating
									</span>
									<span className='text-2xl font-bold text-yellow-500'>
										{driver.averageRating} ★
									</span>
								</motion.div>
								<motion.div
									className='flex justify-between items-center p-3 bg-slate-50 rounded-lg'
									whileHover={{ backgroundColor: "rgb(241, 245, 249)" }}
								>
									<span className='text-sm text-slate-600 font-medium'>
										Reviews
									</span>
									<span className='text-2xl font-bold text-slate-900'>
										{driver.reviewsCount}
									</span>
								</motion.div>
								<motion.div
									className='flex justify-between items-center p-3 bg-blue-50 rounded-lg'
									whileHover={{ backgroundColor: "rgb(239, 246, 255)" }}
								>
									<span className='text-sm text-slate-600 font-medium'>
										Avg Per Trip
									</span>
									<span className='text-2xl font-bold text-blue-600'>
										SAR {(driver.earnings.total / driver.totalTrips).toFixed(2)}
									</span>
								</motion.div>
							</div>
						</CardContent>
					</Card>
				</motion.div>
			</div>
		</motion.div>
	)
}
