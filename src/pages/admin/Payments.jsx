import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { paymentAPI } from "@/lib/api"
import { motion } from "framer-motion"
import { CreditCard, Download, TrendingUp } from "lucide-react"
import { useEffect, useState } from "react"

export function AdminPayments() {
	const [payments, setPayments] = useState([])
	const [stats, setStats] = useState(null)
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		loadData()
	}, [])

	const loadData = async () => {
		setLoading(true)
		try {
			const [paymentsData, statsData] = await Promise.all([
				paymentAPI.getAll(),
				paymentAPI.getStats(),
			])
			setPayments(paymentsData)
			setStats(statsData)
		} catch (error) {
			console.error("Error loading payments:", error)
		}
		setLoading(false)
	}

	const handleExport = () => {
		const csv = payments
			.map(
				(p) => `${p.id},${p.orderId},${p.amount},${p.commission},${p.status}`
			)
			.join("\n")

		const element = document.createElement("a")
		element.setAttribute(
			"href",
			"data:text/plain;charset=utf-8," + encodeURIComponent(csv)
		)
		element.setAttribute("download", "payments.csv")
		element.style.display = "none"
		document.body.appendChild(element)
		element.click()
		document.body.removeChild(element)
	}

	if (loading) {
		return (
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ duration: 0.2 }}
				className='p-8 flex justify-center'
			>
				<CreditCard className='w-8 h-8 text-slate-400' />
			</motion.div>
		)
	}

	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ duration: 0.3 }}
			className='space-y-6'
		>
			{/* Payment Stats Grid */}
			<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
				<motion.div
					initial={{ opacity: 0, y: 8 }}
					animate={{ opacity: 1, y: 0 }}
					exit={{ opacity: 0, y: -8 }}
					transition={{ duration: 0.2, ease: "easeOut" }}
				>
					<Card className='border-0 shadow-sm hover:shadow-md transition-shadow'>
						<CardContent className='pt-6'>
							<div className='flex items-start justify-between'>
								<div>
									<p className='text-sm font-medium text-slate-600'>
										Jami Daromad
									</p>
									<p className='text-3xl font-bold text-slate-900 mt-2'>
										{stats?.totalRevenue?.toLocaleString("uz-UZ") || 0} so'm
									</p>
								</div>
								<div className='p-3 bg-green-50 rounded-lg'>
									<TrendingUp className='w-6 h-6 text-green-600' />
								</div>
							</div>
						</CardContent>
					</Card>
				</motion.div>

				<motion.div
					initial={{ opacity: 0, y: 8 }}
					animate={{ opacity: 1, y: 0 }}
					exit={{ opacity: 0, y: -8 }}
					transition={{ duration: 0.2, ease: "easeOut" }}
				>
					<Card className='border-0 shadow-sm hover:shadow-md transition-shadow'>
						<CardContent className='pt-6'>
							<div className='flex items-start justify-between'>
								<div>
									<p className='text-sm font-medium text-slate-600'>
										Jami Komissiya
									</p>
									<p className='text-3xl font-bold text-slate-900 mt-2'>
										{stats?.totalCommission?.toLocaleString("uz-UZ") || 0} so'm
									</p>
								</div>
								<div className='p-3 bg-blue-50 rounded-lg'>
									<CreditCard className='w-6 h-6 text-blue-600' />
								</div>
							</div>
						</CardContent>
					</Card>
				</motion.div>

				<motion.div
					initial={{ opacity: 0, y: 8 }}
					animate={{ opacity: 1, y: 0 }}
					exit={{ opacity: 0, y: -8 }}
					transition={{ duration: 0.2, ease: "easeOut" }}
				>
					<Card className='border-0 shadow-sm hover:shadow-md transition-shadow'>
						<CardContent className='pt-6'>
							<div className='flex items-start justify-between'>
								<div>
									<p className='text-sm font-medium text-slate-600'>
										Komissiya Darajasi
									</p>
									<p className='text-3xl font-bold text-slate-900 mt-2'>
										{stats?.commissionPercentage || 0}%
									</p>
								</div>
								<div className='p-3 bg-purple-50 rounded-lg'>
									<TrendingUp className='w-6 h-6 text-purple-600' />
								</div>
							</div>
						</CardContent>
					</Card>
				</motion.div>
			</div>

			{/* Recent Payments */}
			<Card className='border-0 shadow-sm'>
				<CardHeader className='border-b border-slate-100 flex items-center justify-between'>
					<CardTitle>So'nggi Tranzaksiyalar</CardTitle>
					<button
						onClick={handleExport}
						className='flex items-center gap-2 px-3 py-2 bg-blue-50 hover:bg-blue-100 text-blue-600 rounded-lg text-sm font-medium transition-colors'
					>
						<Download className='w-4 h-4' />
						Eksport
					</button>
				</CardHeader>
				<CardContent className='pt-6'>
					{payments.length === 0 ? (
						<div className='text-center py-8'>
							<p className='text-slate-500'>To'lov qaydlari yo'q</p>
						</div>
					) : (
						<div className='overflow-x-auto'>
							<table className='w-full text-sm'>
								<thead>
									<tr className='border-b border-slate-200'>
										<th className='text-left py-3 px-4 text-slate-600 font-medium'>
											Buyurtma ID
										</th>
										<th className='text-left py-3 px-4 text-slate-600 font-medium'>
											Miqdori
										</th>
										<th className='text-left py-3 px-4 text-slate-600 font-medium'>
											Komissiya
										</th>
										<th className='text-left py-3 px-4 text-slate-600 font-medium'>
											Haydovchi Daromadi
										</th>
										<th className='text-left py-3 px-4 text-slate-600 font-medium'>
											Holat
										</th>
										<th className='text-left py-3 px-4 text-slate-600 font-medium'>
											Sana
										</th>
									</tr>
								</thead>
								<tbody>
									{payments.map((payment, idx) => (
										<motion.tr
											key={payment.id}
											initial={{ opacity: 0, y: 10 }}
											animate={{ opacity: 1, y: 0 }}
											transition={{ delay: idx * 0.05 }}
											className='border-b border-slate-100 hover:bg-slate-50 transition-colors'
										>
											<td className='py-3 px-4 font-medium text-slate-900'>
												{payment.orderId}
											</td>
											<td className='py-3 px-4 text-slate-600'>
												SAR {payment.amount.toFixed(2)}
											</td>
											<td className='py-3 px-4 text-slate-600'>
												SAR {payment.commission.toFixed(2)}
											</td>
											<td className='py-3 px-4 text-green-600 font-medium'>
												SAR {payment.driverEarnings.toFixed(2)}
											</td>
											<td className='py-3 px-4'>
												<span
													className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
														payment.status === "completed"
															? "bg-green-100 text-green-700"
															: "bg-yellow-100 text-yellow-700"
													}`}
												>
													{payment.status}
												</span>
											</td>
											<td className='py-3 px-4 text-slate-600'>
												{new Date(payment.date).toLocaleDateString()}
											</td>
										</motion.tr>
									))}
								</tbody>
							</table>
						</div>
					)}
				</CardContent>
			</Card>
		</motion.div>
	)
}
