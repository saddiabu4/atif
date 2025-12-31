import { AlertCircle, CheckCircle, XCircle } from "lucide-react"
import { useEffect } from "react"

export function Toast({ message, type = "success", onClose, duration = 3000 }) {
	useEffect(() => {
		const timer = setTimeout(onClose, duration)
		return () => clearTimeout(timer)
	}, [duration, onClose])

	const icons = {
		success: <CheckCircle className='w-5 h-5 text-green-600' />,
		error: <XCircle className='w-5 h-5 text-red-600' />,
		info: <AlertCircle className='w-5 h-5 text-blue-600' />,
	}

	const backgrounds = {
		success: "bg-green-50 border-green-200",
		error: "bg-red-50 border-red-200",
		info: "bg-blue-50 border-blue-200",
	}

	return (
		<div
			className={`fixed bottom-28 left-4 right-4 max-w-md mx-auto ${backgrounds[type]} border rounded-lg px-4 py-3 flex items-center gap-3 shadow-lg z-50 animate-in slide-in-from-bottom-4 duration-200`}
		>
			{icons[type]}
			<p className='text-sm font-medium'>{message}</p>
		</div>
	)
}

export function ToastContainer({ toasts, onRemoveToast }) {
	return (
		<div className='fixed bottom-0 left-0 right-0 pointer-events-none'>
			{toasts.map((toast) => (
				<div key={toast.id} className='pointer-events-auto'>
					<Toast
						message={toast.message}
						type={toast.type || "success"}
						onClose={() => onRemoveToast(toast.id)}
					/>
				</div>
			))}
		</div>
	)
}
