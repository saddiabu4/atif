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
import { userAPI } from "@/lib/api"
import { motion } from "framer-motion"
import { Shield } from "lucide-react"
import { useEffect, useState } from "react"

export function AdminUsers() {
	const [users, setUsers] = useState([])
	const [loading, setLoading] = useState(true)
	const [toasts, setToasts] = useState([])

	useEffect(() => {
		loadUsers()
	}, [])

	const loadUsers = async () => {
		setLoading(true)
		const data = await userAPI.getAll()
		setUsers(data)
		setLoading(false)
	}

	const handleBlock = async (userId) => {
		await userAPI.block(userId)
		await loadUsers()
		showToast("User blocked successfully")
	}

	const handleUnblock = async (userId) => {
		await userAPI.unblock(userId)
		await loadUsers()
		showToast("User unblocked successfully")
	}

	const showToast = (message) => {
		const id = Date.now()
		setToasts((prev) => [...prev, { id, message }])
		setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), 3000)
	}

	if (loading) {
		return (
			<motion.div
				animate={{ rotate: 360 }}
				transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
				className='p-8 flex justify-center'
			>
				<Shield className='w-8 h-8 text-slate-400' />
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
						<Shield className='w-5 h-5 text-blue-600' />
						All Users
					</CardTitle>
				</CardHeader>
				<CardContent className='pt-6'>
					{users.length === 0 ? (
						<div className='text-center py-8'>
							<p className='text-slate-500'>No users found</p>
						</div>
					) : (
						<div className='overflow-x-auto'>
							<Table>
								<TableHeader>
									<TableRow className='border-b border-slate-200 hover:bg-transparent'>
										<TableHead className='text-slate-600'>Name</TableHead>
										<TableHead className='text-slate-600'>Email</TableHead>
										<TableHead className='text-slate-600'>Phone</TableHead>
										<TableHead className='text-slate-600 text-center'>
											Trips
										</TableHead>
										<TableHead className='text-slate-600 text-center'>
											Rating
										</TableHead>
										<TableHead className='text-slate-600'>Status</TableHead>
										<TableHead className='text-slate-600'>Actions</TableHead>
									</TableRow>
								</TableHeader>
								<TableBody>
									{users.map((user, idx) => (
										<motion.tr
											key={user.id}
											initial={{ opacity: 0, y: 10 }}
											animate={{ opacity: 1, y: 0 }}
											transition={{ delay: idx * 0.05 }}
											className='border-b border-slate-100 hover:bg-slate-50 transition-colors'
										>
											<TableCell className='font-medium text-slate-900'>
												{user.name}
											</TableCell>
											<TableCell className='text-slate-600'>
												{user.email}
											</TableCell>
											<TableCell className='text-slate-600'>
												{user.phone}
											</TableCell>
											<TableCell className='text-center text-slate-600'>
												{user.totalTrips}
											</TableCell>
											<TableCell className='text-center'>
												<div className='flex items-center justify-center'>
													<span className='text-yellow-500'>★</span>
													<span className='ml-1 text-slate-900 font-medium'>
														{user.rating}
													</span>
												</div>
											</TableCell>
											<TableCell>
												<Badge
													variant={
														user.status === "active" ? "success" : "destructive"
													}
													className='text-xs'
												>
													{user.status}
												</Badge>
											</TableCell>
											<TableCell>
												{user.status === "active" ? (
													<Button
														size='sm'
														variant='destructive'
														className='text-xs'
														onClick={() => handleBlock(user.id)}
													>
														Block
													</Button>
												) : (
													<Button
														size='sm'
														className='text-xs'
														onClick={() => handleUnblock(user.id)}
													>
														Unblock
													</Button>
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

			{/* Toast notifications */}
			<div className='fixed bottom-4 right-4 space-y-2 z-50'>
				{toasts.map((toast) => (
					<motion.div
						key={toast.id}
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: 20 }}
						className='bg-slate-900 text-white px-4 py-3 rounded-lg shadow-lg text-sm'
					>
						{toast.message}
					</motion.div>
				))}
			</div>
		</motion.div>
	)
}
