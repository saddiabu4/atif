import { cn } from "@/lib/utils"

export function Toggle({
	checked = false,
	onCheckedChange = () => {},
	disabled = false,
	className,
	...props
}) {
	return (
		<button
			role='switch'
			aria-checked={checked}
			onClick={() => !disabled && onCheckedChange(!checked)}
			disabled={disabled}
			className={cn(
				"relative inline-flex h-6 w-11 items-center rounded-full transition-colors",
				checked ? "bg-blue-600" : "bg-gray-300",
				disabled && "opacity-50 cursor-not-allowed",
				className
			)}
			{...props}
		>
			<span
				className={cn(
					"inline-block h-4 w-4 transform rounded-full bg-white transition-transform",
					checked ? "translate-x-6" : "translate-x-1"
				)}
			/>
		</button>
	)
}
