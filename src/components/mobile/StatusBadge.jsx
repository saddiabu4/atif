import { cn } from "@/lib/utils"

const statusStyles = {
	active: "bg-blue-100 text-blue-800",
	completed: "bg-green-100 text-green-800",
	cancelled: "bg-red-100 text-red-800",
	pending: "bg-yellow-100 text-yellow-800",
	searching: "bg-purple-100 text-purple-800",
	arrived: "bg-indigo-100 text-indigo-800",
	online: "bg-green-100 text-green-800",
	offline: "bg-gray-100 text-gray-800",
	verified: "bg-green-100 text-green-800",
	pending_verification: "bg-yellow-100 text-yellow-800",
}

export function StatusBadge({ status, className }) {
	return (
		<span
			className={cn(
				"inline-block px-3 py-1 rounded-full text-xs font-semibold",
				statusStyles[status] || "bg-gray-100 text-gray-800",
				className
			)}
		>
			{status.replace(/_/g, " ").charAt(0).toUpperCase() +
				status.replace(/_/g, " ").slice(1)}
		</span>
	)
}
