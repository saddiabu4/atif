import { cn } from "@/lib/utils"
import { motion } from "framer-motion"

export function BottomNav({ items, activeItem, onItemClick }) {
	return (
		<nav className='fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur border-t border-slate-200/50 safe-area-bottom z-50 shadow-2xl'>
			<div className='flex items-center justify-around h-20 max-w-md mx-auto'>
				{items.map((item) => (
					<motion.button
						key={item.id}
						onClick={() => onItemClick(item.id)}
						whileTap={{ scale: 0.95 }}
						className={cn(
							"flex flex-col items-center justify-center gap-1 flex-1 h-full rounded-none transition-all relative",
							activeItem === item.id
								? "text-blue-600"
								: "text-slate-500 hover:text-slate-700"
						)}
					>
						{activeItem === item.id && (
							<motion.div
								layoutId='activeTab'
								className='absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-blue-500 to-blue-600'
								initial={false}
								transition={{ type: "spring", stiffness: 500, damping: 30 }}
							/>
						)}
						<motion.div
							animate={{
								scale: activeItem === item.id ? 1.15 : 1,
								color: activeItem === item.id ? "#2563eb" : "#64748b",
							}}
							transition={{ duration: 0.2 }}
						>
							<item.icon className='w-6 h-6' />
						</motion.div>
						<motion.span
							className='text-xs font-semibold'
							animate={{
								color: activeItem === item.id ? "#2563eb" : "#64748b",
							}}
							transition={{ duration: 0.2 }}
						>
							{item.label}
						</motion.span>
					</motion.button>
				))}
			</div>
		</nav>
	)
}
