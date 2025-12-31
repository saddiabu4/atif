import { cn } from "@/lib/utils"

export function Select({ value, onValueChange, children, ...props }) {
	return (
		<div className='relative'>
			<select
				value={value}
				onChange={(e) => onValueChange(e.target.value)}
				className={cn(
					"flex h-9 w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm placeholder:text-gray-500 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 disabled:cursor-not-allowed disabled:opacity-50 appearance-none pr-8"
				)}
				{...props}
			>
				{children}
			</select>
			<div className='pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-gray-500'>
				<svg
					className='h-4 w-4'
					fill='none'
					stroke='currentColor'
					viewBox='0 0 24 24'
				>
					<path
						strokeLinecap='round'
						strokeLinejoin='round'
						strokeWidth={2}
						d='M19 14l-7 7m0 0l-7-7m7 7V3'
					/>
				</svg>
			</div>
		</div>
	)
}

export function SelectValue({ placeholder = "Select..." }) {
	return <option value=''>{placeholder}</option>
}
