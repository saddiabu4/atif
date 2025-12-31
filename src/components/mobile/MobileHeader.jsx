export function MobileHeader({ title, subtitle, children, action, showBack }) {
	return (
		<div className='sticky top-0 z-40 bg-white border-b border-slate-200/50 safe-area-top shadow-sm'>
			<div className='px-4 py-3'>
				<div className='flex items-start justify-between gap-3'>
					<div className='flex-1 min-w-0'>
						<h1 className='text-lg font-bold text-slate-900 truncate'>
							{title}
						</h1>
						{subtitle && (
							<p className='text-xs text-slate-600 mt-0.5 truncate'>
								{subtitle}
							</p>
						)}
					</div>
					{action && <div className='flex-shrink-0'>{action}</div>}
				</div>
				{children}
			</div>
		</div>
	)
}
