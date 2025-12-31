import { cn } from "@/lib/utils"

export function Badge({ className, variant = "default", ...props }) {
	const variants = {
		default: "bg-blue-100 text-blue-700 border border-blue-200",
		secondary: "bg-slate-100 text-slate-700 border border-slate-200",
		destructive: "bg-red-100 text-red-700 border border-red-200",
		success: "bg-green-100 text-green-700 border border-green-200",
		warning: "bg-yellow-100 text-yellow-700 border border-yellow-200",
		outline: "border border-slate-300 text-slate-700",
	}

	return (
		<div
			className={cn(
				"inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold transition-colors",
				variants[variant],
				className
			)}
			{...props}
		/>
	)
}
