import { clsx } from "clsx"
import { useEffect, useState } from "react"
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
	return twMerge(clsx(inputs))
}

/**
 * Hook to detect if a media query matches
 * @param {string} query - Media query string (e.g., "(min-width: 768px)")
 * @returns {boolean} - Whether the query matches
 */
export function useMediaQuery(query) {
	const [matches, setMatches] = useState(false)

	useEffect(() => {
		const media = window.matchMedia(query)
		if (media.matches !== matches) {
			setMatches(media.matches)
		}

		const listener = (e) => setMatches(e.matches)
		media.addEventListener("change", listener)
		return () => media.removeEventListener("change", listener)
	}, [matches, query])

	return matches
}
