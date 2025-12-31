import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { driverAPI } from "@/lib/api"
import { motion } from "framer-motion"
import {
	Award,
	Calendar,
	LogOut,
	Mail,
	Shield,
	Star,
	Truck,
} from "lucide-react"
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

export function DriverProfile() {
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

	return (
		<motion.div
			className='w-full pb-8'
			variants={containerVariants}
			initial='hidden'
			animate='visible'
		>
			{/* Header */}
			<motion.div variants={itemVariants} className='mb-8'>
				<h1 className='text-3xl font-bold text-slate-900'>Profil</h1>
				<p className='text-slate-600 text-sm mt-1'>Sizning hisob ma'lumoti</p>
			</motion.div>

			{/* Profile Card */}
			<motion.div variants={itemVariants} className='mb-8'>
				<Card className='overflow-hidden'>
					<CardContent className='pt-0'>
						<div className='bg-linear-to-r from-blue-600 to-blue-800 h-24'></div>
						<div className='px-6 pb-6'>
							<div className='flex items-end gap-4 -mt-12 mb-6'>
								<motion.img
									src={driver.avatar}
									alt={driver.name}
									className='w-24 h-24 rounded-2xl border-4 border-white shadow-lg'
									whileHover={{ scale: 1.1 }}
									whileTap={{ scale: 0.95 }}
								/>
								<div className='flex-1'>
									<h2 className='text-2xl font-bold text-slate-900'>
										{driver.name}
									</h2>
									<p className='text-slate-600 text-sm'>{driver.email}</p>
									<p className='text-slate-600 text-sm'>{driver.phone}</p>
								</div>
							</div>

							{/* Quick Stats */}
							<div className='grid grid-cols-4 gap-4'>
								<motion.div
									whileHover={{ scale: 1.05 }}
									className='text-center p-3 bg-slate-50 rounded-lg'
								>
									<Calendar className='w-5 h-5 text-blue-600 mx-auto mb-2' />
									<p className='text-xs text-slate-600 font-medium'>Joined</p>
									<p className='text-sm font-bold text-slate-900'>
										{new Date(driver.joinedDate).toLocaleDateString("en-US", {
											month: "short",
											year: "2-digit",
										})}
									</p>
								</motion.div>
								<motion.div
									whileHover={{ scale: 1.05 }}
									className='text-center p-3 bg-slate-50 rounded-lg'
								>
									<Truck className='w-5 h-5 text-emerald-600 mx-auto mb-2' />
									<p className='text-xs text-slate-600 font-medium'>Trips</p>
									<p className='text-sm font-bold text-slate-900'>
										{driver.totalTrips}
									</p>
								</motion.div>
								<motion.div
									whileHover={{ scale: 1.05 }}
									className='text-center p-3 bg-yellow-50 rounded-lg'
								>
									<Star className='w-5 h-5 text-yellow-500 mx-auto mb-2' />
									<p className='text-xs text-slate-600 font-medium'>Rating</p>
									<p className='text-sm font-bold text-yellow-600'>
										{driver.averageRating}
									</p>
								</motion.div>
								<motion.div
									whileHover={{ scale: 1.05 }}
									className='text-center p-3 bg-blue-50 rounded-lg'
								>
									<Award className='w-5 h-5 text-blue-600 mx-auto mb-2' />
									<p className='text-xs text-slate-600 font-medium'>Status</p>
									<p className='text-sm font-bold text-blue-600'>Active</p>
								</motion.div>
							</div>
						</div>
					</CardContent>
				</Card>
			</motion.div>

			{/* Details Grid */}
			<div className='grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8'>
				{/* Vehicle Information */}
				<motion.div variants={itemVariants}>
					<Card>
						<CardHeader>
							<CardTitle className='flex items-center gap-2 text-slate-900'>
								<Truck className='w-5 h-5 text-blue-600' />
								Vehicle Information
							</CardTitle>
						</CardHeader>
						<CardContent>
							<div className='space-y-4'>
								<motion.div
									whileHover={{ backgroundColor: "rgb(241, 245, 249)" }}
								>
									<p className='text-xs text-slate-600 font-medium mb-1'>
										Model
									</p>
									<p className='font-bold text-slate-900 p-2 bg-slate-50 rounded'>
										{driver.vehicle.model}
									</p>
								</motion.div>
								<motion.div
									whileHover={{ backgroundColor: "rgb(241, 245, 249)" }}
								>
									<p className='text-xs text-slate-600 font-medium mb-1'>
										Type
									</p>
									<p className='font-bold text-slate-900 p-2 bg-slate-50 rounded capitalize'>
										{driver.vehicle.type}
									</p>
								</motion.div>
								<motion.div
									whileHover={{ backgroundColor: "rgb(241, 245, 249)" }}
								>
									<p className='text-xs text-slate-600 font-medium mb-1'>
										License Plate
									</p>
									<p className='font-bold text-slate-900 p-2 bg-slate-50 rounded font-mono'>
										{driver.vehicle.licensePlate}
									</p>
								</motion.div>
								<motion.div
									whileHover={{ backgroundColor: "rgb(241, 245, 249)" }}
								>
									<p className='text-xs text-slate-600 font-medium mb-1'>
										Color
									</p>
									<p className='font-bold text-slate-900 p-2 bg-slate-50 rounded'>
										{driver.vehicle.color}
									</p>
								</motion.div>
							</div>
						</CardContent>
					</Card>
				</motion.div>

				{/* Documents */}
				<motion.div variants={itemVariants}>
					<Card>
						<CardHeader>
							<CardTitle className='flex items-center gap-2 text-slate-900'>
								<Shield className='w-5 h-5 text-emerald-600' />
								Documents
							</CardTitle>
						</CardHeader>
						<CardContent>
							<div className='space-y-3'>
								<motion.div className='flex items-center justify-between p-3 bg-slate-50 rounded-lg'>
									<span className='font-medium text-slate-900'>
										Driver License
									</span>
									<Badge
										variant={
											driver.documents.license === "verified"
												? "default"
												: "secondary"
										}
										className={
											driver.documents.license === "verified"
												? "bg-emerald-100 text-emerald-700 border-emerald-200"
												: "bg-amber-100 text-amber-700 border-amber-200"
										}
									>
										{driver.documents.license}
									</Badge>
								</motion.div>
								<motion.div className='flex items-center justify-between p-3 bg-slate-50 rounded-lg'>
									<span className='font-medium text-slate-900'>Insurance</span>
									<Badge
										variant={
											driver.documents.insurance === "verified"
												? "default"
												: "secondary"
										}
										className={
											driver.documents.insurance === "verified"
												? "bg-emerald-100 text-emerald-700 border-emerald-200"
												: "bg-amber-100 text-amber-700 border-amber-200"
										}
									>
										{driver.documents.insurance}
									</Badge>
								</motion.div>
								<motion.div className='flex items-center justify-between p-3 bg-slate-50 rounded-lg'>
									<span className='font-medium text-slate-900'>
										Registration
									</span>
									<Badge
										variant={
											driver.documents.registration === "verified"
												? "default"
												: "secondary"
										}
										className={
											driver.documents.registration === "verified"
												? "bg-emerald-100 text-emerald-700 border-emerald-200"
												: "bg-amber-100 text-amber-700 border-amber-200"
										}
									>
										{driver.documents.registration}
									</Badge>
								</motion.div>
								<motion.div className='flex items-center justify-between p-3 bg-slate-50 rounded-lg'>
									<span className='font-medium text-slate-900'>
										Background Check
									</span>
									<Badge
										variant={
											driver.documents.backgroundCheck === "verified"
												? "default"
												: "secondary"
										}
										className={
											driver.documents.backgroundCheck === "verified"
												? "bg-emerald-100 text-emerald-700 border-emerald-200"
												: "bg-amber-100 text-amber-700 border-amber-200"
										}
									>
										{driver.documents.backgroundCheck}
									</Badge>
								</motion.div>
							</div>
						</CardContent>
					</Card>
				</motion.div>
			</div>

			{/* Actions */}
			<motion.div variants={itemVariants} className='flex gap-3'>
				<Button className='flex-1 bg-blue-600 hover:bg-blue-700'>
					<Mail className='w-4 h-4 mr-2' />
					Contact Support
				</Button>
				<Button className='flex-1' variant='outline'>
					<LogOut className='w-4 h-4 mr-2' />
					Logout
				</Button>
			</motion.div>
		</motion.div>
	)
}
