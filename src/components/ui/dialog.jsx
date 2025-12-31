import { cn } from "@/lib/utils"

export function Dialog({ open = false, onOpenChange = () => {}, children }) {
	if (!open) return null

	return (
		<div className='fixed inset-0 z-50 bg-black/50 flex items-center justify-center'>
			<div
				className='bg-white rounded-lg shadow-lg max-w-md w-full mx-4'
				onClick={(e) => e.stopPropagation()}
			>
				{children}
			</div>
		</div>
	)
}

export function DialogContent({ className, children, ...props }) {
	return (
		<div className={cn("relative w-full bg-white", className)} {...props}>
			{children}
		</div>
	)
}

export function DialogHeader({ className, ...props }) {
	return (
		<div
			className={cn("flex flex-col space-y-1.5 border-b p-6", className)}
			{...props}
		/>
	)
}

export function DialogTitle({ className, ...props }) {
	return (
		<h2
			className={cn(
				"text-lg font-semibold leading-none tracking-tight",
				className
			)}
			{...props}
		/>
	)
}

export function DialogDescription({ className, ...props }) {
	return <p className={cn("text-sm text-gray-600", className)} {...props} />
}

export function DialogBody({ className, ...props }) {
	return <div className={cn("p-6", className)} {...props} />
}

export function DialogFooter({ className, ...props }) {
	return (
		<div
			className={cn("flex justify-end gap-3 border-t p-6", className)}
			{...props}
		/>
	)
}
