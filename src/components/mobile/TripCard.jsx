import { cn } from "@/lib/utils"
import { Clock, DollarSign, MapPin } from "lucide-react"
import { StatusBadge } from "./StatusBadge"

export function TripCard({
	trip,
	onClick,
	className,
	driverName,
	driverAvatar,
	driverRating,
}) {
	const date = new Date(trip.createdAt)
	const timeStr = date.toLocaleTimeString("en-US", {
		hour: "numeric",
		minute: "2-digit",
	})

	return (
		<div
			onClick={onClick}
			className={cn(
				"bg-white border border-gray-200 rounded-lg p-4 mb-3 cursor-pointer hover:shadow-md transition-shadow",
				className
			)}
		>
			<div className='flex items-start justify-between mb-3'>
				<StatusBadge status={trip.status} />
				<span className='text-sm text-gray-600'>{timeStr}</span>
			</div>

			{driverName && (
				<div className='flex items-center gap-3 mb-3 pb-3 border-b border-gray-100'>
					<img
						src={driverAvatar}
						alt={driverName}
						className='w-10 h-10 rounded-full'
					/>
					<div>
						<p className='font-semibold text-sm'>{driverName}</p>
						{driverRating && (
							<p className='text-xs text-gray-600'>⭐ {driverRating}</p>
						)}
					</div>
				</div>
			)}

			<div className='space-y-2 mb-3'>
				<div className='flex items-start gap-3'>
					<MapPin className='w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5' />
					<div>
						<p className='text-xs text-gray-600'>From</p>
						<p className='text-sm font-medium text-gray-900 line-clamp-1'>
							{trip.pickup.address}
						</p>
					</div>
				</div>
				<div className='flex items-start gap-3'>
					<MapPin className='w-4 h-4 text-green-600 flex-shrink-0 mt-0.5' />
					<div>
						<p className='text-xs text-gray-600'>To</p>
						<p className='text-sm font-medium text-gray-900 line-clamp-1'>
							{trip.destination.address}
						</p>
					</div>
				</div>
			</div>

			<div className='flex items-center justify-between pt-3 border-t border-gray-100'>
				<div className='flex items-center gap-4'>
					<div className='flex items-center gap-1'>
						<Clock className='w-4 h-4 text-gray-600' />
						<span className='text-sm text-gray-600'>{trip.duration}</span>
					</div>
					<div className='flex items-center gap-1'>
						<DollarSign className='w-4 h-4 text-gray-600' />
						<span className='text-sm font-semibold text-gray-900'>
							SAR {trip.fare.toFixed(2)}
						</span>
					</div>
				</div>
			</div>
		</div>
	)
}
