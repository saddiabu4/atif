import { cn } from "@/lib/utils"

export function Card({ className, ...props }) {
	return (
		<div
			className={cn(
				"rounded-xl border border-slate-200 bg-white shadow-sm hover:shadow-md transition-shadow",
				className
			)}
			{...props}
		/>
	)
}

export function CardHeader({ className, ...props }) {
	return (
		<div
			className={cn(
				"flex flex-col space-y-1.5 border-b border-slate-200 p-6",
				className
			)}
			{...props}
		/>
	)
}

export function CardTitle({ className, ...props }) {
	return (
		<h2
			className={cn(
				"text-2xl font-semibold leading-none tracking-tight text-slate-900",
				className
			)}
			{...props}
		/>
	)
}

export function CardDescription({ className, ...props }) {
	return <p className={cn("text-sm text-slate-600", className)} {...props} />
}

export function CardContent({ className, ...props }) {
	return <div className={cn("p-6 pt-0", className)} {...props} />
}

export function CardFooter({ className, ...props }) {
	return (
		<div
			className={cn(
				"flex items-center border-t border-slate-200 p-6 pt-0",
				className
			)}
			{...props}
		/>
	)
}
