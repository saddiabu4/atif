export function MobileHeader({ title, subtitle, children, action, showBack }) {
	return (
		<div className='sticky top-0 z-40 bg-white border-b border-slate-200 safe-area-top'>
			<div className='px-4 py-4'>
				<div className='flex items-start justify-between gap-3'>
					<div className='flex-1'>
						<h1 className='text-xl font-bold text-slate-900'>{title}</h1>
						{subtitle && (
							<p className='text-sm text-slate-600 mt-1'>{subtitle}</p>
						)}
					</div>
					{action && <div className='flex-shrink-0'>{action}</div>}
				</div>
				{children}
			</div>
		</div>
	)
}
