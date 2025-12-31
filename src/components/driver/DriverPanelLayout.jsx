import { cn } from "@/lib/utils"

/**
 * Responsive layout wrapper for Driver Panel
 * - Mobile (≤640px): Single column, stacked
 * - Tablet (641-1024px): 2 columns where appropriate
 * - Desktop (≥1025px): 3+ columns with grid
 */
export function DriverPanelLayout({ children, className }) {
	return (
		<div
			className={cn(
				"w-full min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex flex-col",
				className
			)}
		>
			{children}
		</div>
	)
}

/**
 * Header section with status badge - fixed/sticky
 */
export function DriverPanelHeader({ children, className }) {
	return (
		<div
			className={cn(
				"sticky top-0 z-20 bg-white border-b border-slate-200 shadow-sm",
				className
			)}
		>
			<div className='px-4 sm:px-6 lg:px-8 py-4 sm:py-6 max-w-7xl mx-auto w-full'>
				{children}
			</div>
		</div>
	)
}

/**
 * Main content area with responsive max-width
 */
export function DriverPanelContent({ children, className }) {
	return (
		<main
			className={cn(
				"flex-1 overflow-y-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 max-w-7xl mx-auto w-full",
				className
			)}
		>
			{children}
		</main>
	)
}

/**
 * Responsive grid for dashboard sections
 * - Mobile: 1 column
 * - Tablet: 2 columns
 * - Desktop: Up to 3-4 columns
 */
export function DriverPanelGrid({ children, cols = "auto", className }) {
	const gridClasses = {
		auto: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6",
		2: "grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 lg:gap-6",
		3: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6",
		full: "flex flex-col gap-4 sm:gap-5 lg:gap-6",
	}

	return (
		<div className={cn(gridClasses[cols] || gridClasses.auto, className)}>
			{children}
		</div>
	)
}

/**
 * Two-column layout for tablet/desktop
 * Left: Primary content (orders, trips)
 * Right: Secondary content (stats, profile)
 */
export function DriverPanelRow({ children, className }) {
	return (
		<div
			className={cn(
				"grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6",
				className
			)}
		>
			{children}
		</div>
	)
}

/**
 * Utility for spanning full width on mobile, half on tablet, third on desktop
 */
export function DriverPanelSection({ children, span = "default", className }) {
	const spanClasses = {
		default: "lg:col-span-1",
		2: "lg:col-span-2",
		full: "col-span-1 md:col-span-2 lg:col-span-3",
	}

	return (
		<div className={cn(spanClasses[span] || spanClasses.default, className)}>
			{children}
		</div>
	)
}

/**
 * Status indicator component with responsive sizing
 */
export function DriverStatusIndicator({
	isOnline,
	onToggle,
	driverName,
	className,
}) {
	return (
		<div
			className={cn(
				"flex items-center justify-between p-4 sm:p-5 bg-white rounded-lg border border-slate-200 shadow-sm",
				className
			)}
		>
			<div className='flex-1 min-w-0'>
				<p className='text-xs sm:text-sm font-medium text-slate-600 uppercase tracking-wide'>
					Status
				</p>
				<h2 className='text-lg sm:text-xl lg:text-2xl font-bold text-slate-900 mt-1'>
					{isOnline ? (
						<span className='flex items-center gap-2'>
							<span className='inline-block w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse'></span>
							Onlayn
						</span>
					) : (
						<span className='flex items-center gap-2'>
							<span className='inline-block w-2.5 h-2.5 bg-slate-400 rounded-full'></span>
							Oflayn
						</span>
					)}
				</h2>
				{driverName && (
					<p className='text-xs sm:text-sm text-slate-600 mt-2'>
						Xosh kelibsiz, {driverName}
					</p>
				)}
			</div>
			<div className='ml-4 shrink-0'>
				<button
					onClick={onToggle}
					className={cn(
						"relative inline-flex h-8 w-14 sm:h-9 sm:w-16 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2",
						isOnline
							? "bg-green-500 focus:ring-green-500"
							: "bg-slate-300 focus:ring-slate-400"
					)}
				>
					<span
						className={cn(
							"inline-block h-6 w-6 sm:h-7 sm:w-7 transform rounded-full bg-white shadow-lg transition-transform",
							isOnline ? "translate-x-7 sm:translate-x-8" : "translate-x-1"
						)}
					/>
				</button>
			</div>
		</div>
	)
}
