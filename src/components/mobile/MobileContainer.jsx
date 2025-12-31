import { cn } from "@/lib/utils"

export function MobileContainer({ children, className, bottomPadding = true }) {
	return (
		<div
			className={cn(
				"w-full max-w-md mx-auto bg-white min-h-screen flex flex-col shadow-xl md:rounded-2xl overflow-hidden",
				bottomPadding && "pb-28",
				className
			)}
		>
			{children}
		</div>
	)
}

export function MobileContent({ children, className }) {
	return (
		<main className={cn("flex-1 overflow-y-auto px-4 py-5", className)}>
			{children}
		</main>
	)
}
