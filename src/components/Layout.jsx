import { cn } from "@/lib/utils"

export function Sidebar({ children, className }) {
	return (
		<aside
			className={cn(
				"w-64 bg-slate-900 text-white border-r border-slate-800 min-h-screen p-4 overflow-y-auto",
				className
			)}
		>
			{children}
		</aside>
	)
}

export function SidebarNav({ children }) {
	return <nav className='space-y-2'>{children}</nav>
}

export function SidebarNavItem({ icon: Icon, label, active, onClick }) {
	return (
		<button
			onClick={onClick}
			className={cn(
				"w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200",
				active
					? "bg-blue-600 text-white shadow-lg"
					: "text-slate-300 hover:bg-slate-800 hover:text-slate-100"
			)}
		>
			{Icon && <Icon className='w-5 h-5 shrink-0' />}
			<span>{label}</span>
		</button>
	)
}

export function Header({ title, subtitle, children }) {
	return (
		<div className='border-b border-slate-200 bg-white sticky top-0 z-10'>
			<div className='px-6 md:px-8 py-6'>
				<div className='flex items-center justify-between'>
					<div>
						<h1 className='text-2xl md:text-3xl font-bold text-slate-900'>
							{title}
						</h1>
						{subtitle && (
							<p className='text-slate-600 text-sm md:text-base mt-1'>
								{subtitle}
							</p>
						)}
					</div>
					{children}
				</div>
			</div>
		</div>
	)
}

export function MainContent({ children, className }) {
	return (
		<main className={cn("flex-1 bg-slate-50 overflow-y-auto", className)}>
			<div className='px-6 md:px-8 py-6'>{children}</div>
		</main>
	)
}

export function Container({ children, className }) {
	return <div className={cn("max-w-7xl mx-auto", className)}>{children}</div>
}

export function Grid({ children, cols = 4, className }) {
	return (
		<div
			className={cn(
				"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6",
				className
			)}
		>
			{children}
		</div>
	)
}
