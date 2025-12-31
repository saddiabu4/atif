import { motion } from "framer-motion"
import { useCallback, useState } from "react"

const UZBEK_REGIONS = [
	"Qoraqalpog'stan",
	"Andijon",
	"Buxoro",
	"Jizzax",
	"Namangan",
	"Navoi",
	"Qashqadaryo",
	"Samarqand",
	"Sirdaryo",
	"Surxondaryo",
	"Toshkent",
	"Toshkent shahri",
]

export function WelcomeScreen({ onNext }) {
	const [selectedRegion, setSelectedRegion] = useState("")

	const handleNext = useCallback(() => {
		if (selectedRegion) {
			onNext({ region: selectedRegion })
		}
	}, [selectedRegion, onNext])

	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			exit={{ opacity: 0, y: -20 }}
			transition={{ duration: 0.3 }}
			className='w-full max-w-md mx-auto px-6'
		>
			<div className='text-center mb-12'>
				<h1 className='text-4xl font-bold text-gray-900 mb-2'>
					Xush kelibsiz!
				</h1>
				<p className='text-gray-600 text-lg'>Qayerga bormoqchisiz?</p>
			</div>

			<div className='space-y-3 mb-8'>
				<label className='block text-sm font-semibold text-gray-700 mb-4'>
					Viloyatingizni tanlang
				</label>
				<div className='grid grid-cols-2 gap-3 max-h-64 overflow-y-auto pr-2'>
					{UZBEK_REGIONS.map((region) => (
						<button
							key={region}
							onClick={() => setSelectedRegion(region)}
							className={`p-3 text-sm font-medium rounded-lg transition-all duration-200 ${
								selectedRegion === region
									? "bg-blue-600 text-white shadow-lg"
									: "bg-gray-100 text-gray-700 hover:bg-gray-200"
							}`}
						>
							{region}
						</button>
					))}
				</div>
			</div>

			<button
				onClick={handleNext}
				disabled={!selectedRegion}
				className={`w-full py-4 rounded-xl font-semibold text-lg transition-all duration-200 ${
					selectedRegion
						? "bg-blue-600 text-white hover:bg-blue-700 shadow-lg"
						: "bg-gray-300 text-gray-500 cursor-not-allowed"
				}`}
			>
				Davom etish
			</button>
		</motion.div>
	)
}
