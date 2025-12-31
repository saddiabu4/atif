// Mobile utilities for responsive design
export const ResponsiveWrapper = ({ children }) => {
	return (
		<div className='w-full h-screen flex items-center justify-center bg-linear-to-br from-blue-50 to-gray-50'>
			{/* Desktop: Show mobile frame */}
			<div className='hidden md:flex items-center justify-center w-full h-full'>
				<div className='relative w-full max-w-md h-full md:max-h-screen rounded-3xl overflow-hidden shadow-2xl border-8 border-gray-900'>
					{children}
				</div>
			</div>

			{/* Mobile: Full screen */}
			<div className='md:hidden w-full h-full'>{children}</div>
		</div>
	)
}
