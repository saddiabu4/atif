import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table"
import { driverAPI } from "@/lib/api"
import { motion } from "framer-motion"
import { CheckCircle, Truck } from "lucide-react"
import { useEffect, useState } from "react"

export function AdminDrivers() {
	const [drivers, setDrivers] = useState([])
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		loadDrivers()
	}, [])

	const loadDrivers = async () => {
		setLoading(true)
		const data = await driverAPI.getAll()
		setDrivers(data)
		setLoading(false)
	}

	const handleVerify = async (driverId) => {
		await driverAPI.verify(driverId)
		await loadDrivers()
	}

	if (loading) {
		return (
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ duration: 0.2 }}
				className='p-8 flex justify-center'
			>
				<Truck className='w-8 h-8 text-slate-400' />
			</motion.div>
		)
	}

	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ duration: 0.3 }}
		>
			<Card className='border-0 shadow-sm'>
				<CardHeader className='border-b border-slate-100'>
					<CardTitle className='flex items-center gap-2'>
						<Truck className='w-5 h-5 text-blue-600' />
						Barcha Haydovchilar
					</CardTitle>
				</CardHeader>
				<CardContent className='pt-6'>
					{drivers.length === 0 ? (
						<div className='text-center py-8'>
							<p className='text-slate-500'>Haydovchilar topilmadi</p>
						</div>
					) : (
						<div className='overflow-x-auto'>
							<Table>
								<TableHeader>
									<TableRow className='border-b border-slate-200 hover:bg-transparent'>
										<TableHead className='text-slate-600'>Ism</TableHead>
										<TableHead className='text-slate-600'>Transport</TableHead>
										<TableHead className='text-slate-600'>Holat</TableHead>
										<TableHead className='text-slate-600'>
											Tasdiqlanish
										</TableHead>
										<TableHead className='text-slate-600 text-center'>
											Safarlar
										</TableHead>
										<TableHead className='text-slate-600 text-center'>
											Reyting
										</TableHead>
										<TableHead className='text-slate-600'>Amallar</TableHead>
									</TableRow>
								</TableHeader>
								<TableBody>
									{drivers.map((driver, idx) => (
										<motion.tr
											key={driver.id}
											initial={{ opacity: 0, y: 10 }}
											animate={{ opacity: 1, y: 0 }}
											transition={{ delay: idx * 0.05 }}
											className='border-b border-slate-100 hover:bg-slate-50 transition-colors'
										>
											<TableCell className='font-medium text-slate-900'>
												{driver.name}
											</TableCell>
											<TableCell>
												<div className='text-sm'>
													<p className='font-medium text-slate-900'>
														{driver.vehicle.model}
													</p>
													<p className='text-slate-600 text-xs'>
														{driver.vehicle.licensePlate}
													</p>
												</div>
											</TableCell>
											<TableCell>
												<Badge
													variant={
														driver.status === "online" ? "success" : "secondary"
													}
													className='text-xs'
												>
													{driver.status}
												</Badge>
											</TableCell>
											<TableCell>
												<Badge
													variant={
														driver.verificationStatus === "verified"
															? "success"
															: "warning"
													}
													className='text-xs'
												>
													{driver.verificationStatus}
												</Badge>
											</TableCell>
											<TableCell className='text-center text-slate-600'>
												{driver.totalTrips}
											</TableCell>
											<TableCell className='text-center'>
												<div className='flex items-center justify-center'>
													<span className='text-yellow-500'>★</span>
													<span className='ml-1 text-slate-900 font-medium'>
														{driver.rating}
													</span>
												</div>
											</TableCell>
											<TableCell>
												{driver.verificationStatus === "pending" ? (
													<Button
														size='sm'
														className='text-xs'
														onClick={() => handleVerify(driver.id)}
													>
														Tasdiqlash
													</Button>
												) : (
													<div className='flex items-center gap-2 text-green-600'>
														<CheckCircle className='w-4 h-4' />
														<span className='text-xs font-medium'>
															Tasdiqland
														</span>
													</div>
												)}
											</TableCell>
										</motion.tr>
									))}
								</TableBody>
							</Table>
						</div>
					)}
				</CardContent>
			</Card>
		</motion.div>
	)
}
