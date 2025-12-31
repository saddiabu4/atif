import { cn } from "@/lib/utils"

export function Table({ className, ...props }) {
	return (
		<div className='w-full overflow-auto'>
			<table
				className={cn("w-full caption-bottom text-sm", className)}
				{...props}
			/>
		</div>
	)
}

export function TableHeader({ className, ...props }) {
	return (
		<thead
			className={cn("border-b border-slate-200 bg-slate-50", className)}
			{...props}
		/>
	)
}

export function TableBody({ className, ...props }) {
	return (
		<tbody className={cn("[&_tr:last-child]:border-0", className)} {...props} />
	)
}

export function TableFooter({ className, ...props }) {
	return (
		<tfoot
			className={cn(
				"border-t border-slate-200 bg-slate-50 font-medium [&>tr]:last:border-b-0",
				className
			)}
			{...props}
		/>
	)
}

export function TableRow({ className, ...props }) {
	return (
		<tr
			className={cn(
				"border-b border-slate-200 transition-colors hover:bg-slate-50 data-[state=selected]:bg-slate-100",
				className
			)}
			{...props}
		/>
	)
}

export function TableHead({ className, ...props }) {
	return (
		<th
			className={cn(
				"h-12 px-4 text-left align-middle font-semibold text-slate-600 [&:has([role=checkbox])]:pr-0",
				className
			)}
			{...props}
		/>
	)
}

export function TableCell({ className, ...props }) {
	return (
		<td
			className={cn(
				"px-4 py-2 align-middle [&:has([role=checkbox])]:pr-0",
				className
			)}
			{...props}
		/>
	)
}
