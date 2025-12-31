import { motion } from "framer-motion"
import {
	Award,
	Bell,
	CreditCard,
	Download,
	Lock,
	LogOut,
	Mail,
	MapPin,
	MessageCircle,
	Phone,
	Settings,
	Star,
	Truck,
	Wallet,
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

const currentUser = {
	id: "user_1",
	name: "Abdullayev Qayrat",
	email: "qayrat@example.com",
	phone: "+998 90 123 4567",
	avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=qayrat",
	location: "Toshkent, O'zbekiston",
	rating: 4.8,
	totalTrips: 45,
	joinDate: "Yanvar 2024",
	memberStatus: "Premium",
}

export function UserProfile({ onLogout }) {
	const [showSettings, setShowSettings] = useState(false)

	return (
		<motion.div
			className='w-full pb-32 px-4 pt-4'
			variants={containerVariants}
			initial='hidden'
			animate='visible'
		>
			{/* Profile Header */}
			<motion.div variants={itemVariants} className='mb-8'>
				<div className='bg-linear-to-br from-blue-600 to-blue-800 rounded-3xl p-6 text-white relative overflow-hidden'>
					<motion.div
						className='absolute top-0 right-0 w-40 h-40 bg-blue-400/20 rounded-full blur-3xl'
						animate={{ scale: [1, 1.2, 1], rotate: [0, 180] }}
						transition={{ duration: 20, repeat: Infinity }}
					/>
					<div className='relative z-10'>
						<div className='flex items-start justify-between mb-6'>
							<div className='flex items-center gap-4'>
								<motion.img
									src={currentUser.avatar}
									alt={currentUser.name}
									className='w-20 h-20 rounded-2xl border-4 border-white shadow-lg'
									whileHover={{ scale: 1.1 }}
									whileTap={{ scale: 0.95 }}
								/>
								<div>
									<h1 className='text-2xl font-bold text-white'>
										{currentUser.name}
									</h1>
									<motion.div
										className='text-xs text-blue-100 mt-1 px-3 py-1 bg-white/20 rounded-full w-fit font-medium'
										whileHover={{ backgroundColor: "rgba(255, 255, 255, 0.3)" }}
									>
										✨ {currentUser.memberStatus}
									</motion.div>
									<p className='text-blue-100 text-xs mt-2'>
										{currentUser.email}
									</p>
								</div>
							</div>
							<motion.button
								className='p-2 bg-white/20 rounded-lg hover:bg-white/30 transition-colors'
								whileHover={{ scale: 1.1 }}
								whileTap={{ scale: 0.95 }}
							>
								<Settings className='w-5 h-5 text-white' />
							</motion.button>
						</div>

						{/* Quick Stats */}
						<div className='grid grid-cols-3 gap-3'>
							<motion.div className='text-center'>
								<Star className='w-5 h-5 text-yellow-300 mx-auto mb-1' />
								<p className='text-blue-100 text-xs font-medium'>Rating</p>
								<p className='text-xl font-bold text-white'>
									{currentUser.rating}
								</p>
							</motion.div>
							<motion.div className='text-center'>
								<Truck className='w-5 h-5 text-blue-100 mx-auto mb-1' />
								<p className='text-blue-100 text-xs font-medium'>Safarlar</p>
								<p className='text-xl font-bold text-white'>
									{currentUser.totalTrips}
								</p>
							</motion.div>
							<motion.div className='text-center'>
								<Award className='w-5 h-5 text-blue-100 mx-auto mb-1' />
								<p className='text-blue-100 text-xs font-medium'>A'zo</p>
								<p className='text-sm font-bold text-white'>
									{currentUser.joinDate}
								</p>
							</motion.div>
						</div>
					</div>
				</div>
			</motion.div>
			{/* Contact Info */}
			<motion.div variants={itemVariants} className='mb-6'>
				<h2 className='text-xl font-bold text-slate-900 mb-4 flex items-center gap-2'>
					<Phone className='w-5 h-5 text-blue-600' />
					Aloqa ma'lumotlari
				</h2>
				<div className='space-y-3'>
					<motion.div
						className='bg-white rounded-2xl p-4 border border-slate-200 flex items-center gap-3 hover:shadow-md transition-shadow'
						whileHover={{ scale: 1.02 }}
						whileTap={{ scale: 0.98 }}
					>
						<div className='p-2 bg-blue-100 rounded-lg shrink-0'>
							<Mail className='w-5 h-5 text-blue-600' />
						</div>
						<div className='flex-1'>
							<p className='text-xs text-slate-600 font-medium'>
								Elektron pochta
							</p>
							<p className='font-semibold text-slate-900'>
								{currentUser.email}
							</p>
						</div>
					</motion.div>

					<motion.div
						className='bg-white rounded-2xl p-4 border border-slate-200 flex items-center gap-3 hover:shadow-md transition-shadow'
						whileHover={{ scale: 1.02 }}
						whileTap={{ scale: 0.98 }}
					>
						<div className='p-2 bg-emerald-100 rounded-lg shrink-0'>
							<Phone className='w-5 h-5 text-emerald-600' />
						</div>
						<div className='flex-1'>
							<p className='text-xs text-slate-600 font-medium'>Telefon</p>
							<p className='font-semibold text-slate-900'>
								{currentUser.phone}
							</p>
						</div>
					</motion.div>

					<motion.div
						className='bg-white rounded-2xl p-4 border border-slate-200 flex items-center gap-3 hover:shadow-md transition-shadow'
						whileHover={{ scale: 1.02 }}
						whileTap={{ scale: 0.98 }}
					>
						<div className='p-2 bg-purple-100 rounded-lg shrink-0'>
							<MapPin className='w-5 h-5 text-purple-600' />
						</div>
						<div className='flex-1'>
							<p className='text-xs text-slate-600 font-medium'>Location</p>
							<p className='font-semibold text-slate-900'>
								{currentUser.location}
							</p>
						</div>
					</motion.div>
				</div>
			</motion.div>

			{/* Quick Actions */}
			<motion.div variants={itemVariants} className='mb-8'>
				<h2 className='text-xl font-bold text-slate-900 mb-4 flex items-center gap-2'>
					<Wallet className='w-5 h-5 text-emerald-600' />
					Quick Actions
				</h2>
				<div className='space-y-2'>
					{" "}
					{[
						{
							icon: Download,
							label: "Download E-Tickets",
							color: "blue",
						},
						{
							icon: CreditCard,
							label: "Payment Methods",
							color: "emerald",
						},
						{
							icon: Award,
							label: "Loyalty Points",
							color: "amber",
						},
						{
							icon: MessageCircle,
							label: "Support & Help",
							color: "indigo",
						},
					].map((action, idx) => (
						<motion.button
							key={idx}
							className={`w-full rounded-2xl p-4 flex items-center gap-3 border border-slate-200 hover:border-slate-300 hover:shadow-md transition-all group bg-white`}
							whileHover={{ scale: 1.02 }}
							whileTap={{ scale: 0.98 }}
						>
							<motion.div
								className={`p-2 rounded-lg shrink-0 ${
									action.color === "blue"
										? "bg-blue-100"
										: action.color === "emerald"
										? "bg-emerald-100"
										: action.color === "amber"
										? "bg-amber-100"
										: "bg-indigo-100"
								}`}
								whileHover={{ scale: 1.1 }}
							>
								<action.icon
									className={`w-5 h-5 ${
										action.color === "blue"
											? "text-blue-600"
											: action.color === "emerald"
											? "text-emerald-600"
											: action.color === "amber"
											? "text-amber-600"
											: "text-indigo-600"
									}`}
								/>
							</motion.div>
							<span className='font-semibold text-slate-900 flex-1 text-left'>
								{action.label}
							</span>
							<motion.div
								className='text-slate-400 group-hover:text-slate-600'
								animate={{ x: 0 }}
								whileHover={{ x: 4 }}
							>
								→
							</motion.div>
						</motion.button>
					))}
				</div>
			</motion.div>
			{/* Achievement Section */}
			<motion.div variants={itemVariants} className='mb-8'>
				<h2 className='text-xl font-bold text-slate-900 mb-4 flex items-center gap-2'>
					<Award className='w-5 h-5 text-amber-500' />
					Achievements
				</h2>
				<div className='grid grid-cols-2 gap-3'>
					{[
						{ icon: "🎯", label: "Road Warrior", desc: "50+ trips" },
						{ icon: "⭐", label: "5-Star Rider", desc: "Perfect rating" },
						{ icon: "🎉", label: "Early Bird", desc: "Joined early" },
						{ icon: "💎", label: "Premium Plus", desc: "Upgraded tier" },
					].map((achievement, idx) => (
						<motion.div
							key={idx}
							className='bg-linear-to-br from-amber-50 to-amber-100 rounded-2xl p-4 border border-amber-200 text-center'
							whileHover={{ scale: 1.05 }}
							whileTap={{ scale: 0.95 }}
						>
							<div className='text-2xl mb-2'>{achievement.icon}</div>
							<p className='text-sm font-bold text-amber-900'>
								{achievement.label}
							</p>
							<p className='text-xs text-amber-800'>{achievement.desc}</p>
						</motion.div>
					))}
				</div>
			</motion.div>

			{/* Account Settings */}
			{showSettings && (
				<motion.div
					variants={itemVariants}
					className='mb-6'
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
				>
					<h2 className='text-lg font-bold text-slate-900 mb-3'>Settings</h2>
					<div className='space-y-2'>
						{[
							{ label: "Edit Profile", icon: Settings },
							{ label: "Privacy Settings", icon: Lock },
							{ label: "Notifications", icon: Bell },
							{ label: "Payment Methods", icon: CreditCard },
						].map((setting, idx) => (
							<motion.button
								key={idx}
								className='w-full bg-white rounded-2xl p-4 border border-slate-200 text-left font-semibold text-slate-900 hover:bg-slate-50 transition-colors flex items-center gap-3'
								whileHover={{ scale: 1.02 }}
								whileTap={{ scale: 0.98 }}
							>
								<setting.icon className='w-5 h-5 text-slate-600' />
								{setting.label}
							</motion.button>
						))}
					</div>
				</motion.div>
			)}

			{/* Logout Button */}
			<motion.button
				onClick={onLogout}
				className='w-full bg-red-600 text-white font-bold py-4 rounded-xl hover:bg-red-700 transition-colors flex items-center justify-center gap-2 mt-8'
				whileHover={{ scale: 1.02 }}
				whileTap={{ scale: 0.98 }}
				variants={itemVariants}
			>
				<LogOut className='w-5 h-5' />
				Logout (Demo)
			</motion.button>

			{/* Footer Note */}
			<motion.div
				variants={itemVariants}
				className='text-center mt-6 text-xs text-slate-500'
			>
				<p>Version 2.0.0 • Last updated 31 Dec 2025</p>
			</motion.div>
		</motion.div>
	)
}
