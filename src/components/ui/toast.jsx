import { cn } from "@/lib/utils"
import * as React from "react"

let toastCount = 0

export function useToast() {
	const [toasts, setToasts] = React.useState([])

	const toast = ({ title, description, variant = "default" }) => {
		const id = toastCount++
		const newToast = { id, title, description, variant }
		setToasts((prev) => [...prev, newToast])

		setTimeout(() => {
			setToasts((prev) => prev.filter((t) => t.id !== id))
		}, 3000)

		return id
	}

	return { toasts, toast }
}

export function Toaster({ toasts }) {
	return (
		<div className='fixed bottom-0 right-0 z-50 flex flex-col gap-2 p-4 max-w-md'>
			{toasts.map((toast) => (
				<div
					key={toast.id}
					className={cn(
						"rounded-lg p-4 text-white shadow-lg animate-in fade-in slide-in-from-bottom-3",
						toast.variant === "destructive" ? "bg-red-500" : "bg-blue-500"
					)}
				>
					<div className='font-semibold'>{toast.title}</div>
					{toast.description && (
						<div className='text-sm opacity-90'>{toast.description}</div>
					)}
				</div>
			))}
		</div>
	)
}
