import { motion } from "framer-motion"
import { ArrowLeft } from "lucide-react"
import { useCallback, useState } from "react"

export function NameScreen({ onNext, onBack }) {
	const [name, setName] = useState("")
	const [error, setError] = useState("")

	const handleNext = useCallback(() => {
		const trimmedName = name.trim()

		if (!trimmedName) {
			setError("Iltimos, ismingizni kiriting")
			return
		}

		if (trimmedName.length < 2) {
			setError("Ism kamida 2 ta harfdan iborat bo'lishi kerak")
			return
		}

		onNext({ name: trimmedName })
	}, [name, onNext])

	const handleKeyPress = (e) => {
		if (e.key === "Enter") {
			handleNext()
		}
	}

	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			exit={{ opacity: 0, y: -20 }}
			transition={{ duration: 0.3 }}
			className='w-full max-w-md mx-auto px-6'
		>
			<button
				onClick={onBack}
				className='flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-8 transition-colors'
			>
				<ArrowLeft size={20} />
				<span>Orqaga</span>
			</button>

			<div className='text-center mb-10'>
				<h2 className='text-3xl font-bold text-gray-900 mb-2'>Salom!</h2>
				<p className='text-gray-600'>Sizning ismingizni bilib olamiz</p>
			</div>

			<div className='mb-8'>
				<label className='block text-sm font-semibold text-gray-700 mb-3'>
					Ismingizni kiriting
				</label>
				<input
					type='text'
					value={name}
					onChange={(e) => {
						setName(e.target.value)
						setError("")
					}}
					onKeyPress={handleKeyPress}
					placeholder='Ismingiz...'
					className={`w-full px-4 py-4 text-lg rounded-xl border-2 transition-all duration-200 focus:outline-none ${
						error
							? "border-red-500 focus:border-red-600 bg-red-50"
							: "border-gray-300 focus:border-blue-500 bg-white"
					}`}
					autoFocus
				/>
				{error && (
					<p className='text-red-600 text-sm mt-2 font-medium'>{error}</p>
				)}
			</div>

			<button
				onClick={handleNext}
				className='w-full py-4 rounded-xl font-semibold text-lg bg-blue-600 text-white hover:bg-blue-700 transition-all duration-200 shadow-lg'
			>
				Tizimga kirish
			</button>
		</motion.div>
	)
}
