import { motion } from "framer-motion"
import { ArrowLeft } from "lucide-react"
import { useCallback, useState } from "react"

export function PhoneScreen({ onNext, onBack }) {
	const [phone, setPhone] = useState("")
	const [error, setError] = useState("")

	const formatPhoneNumber = (value) => {
		// Remove all non-digits
		const digits = value.replace(/\D/g, "")

		// If starts with 998, assume it's the full number
		if (digits.startsWith("998")) {
			const withoutCountry = digits.slice(3)
			if (withoutCountry.length === 0) return "+998 "
			if (withoutCountry.length <= 2) return `+998 ${withoutCountry}`
			if (withoutCountry.length <= 5)
				return `+998 ${withoutCountry.slice(0, 2)} ${withoutCountry.slice(2)}`
			if (withoutCountry.length <= 7)
				return `+998 ${withoutCountry.slice(0, 2)} ${withoutCountry.slice(
					2,
					5
				)} ${withoutCountry.slice(5)}`
			return `+998 ${withoutCountry.slice(0, 2)} ${withoutCountry.slice(
				2,
				5
			)} ${withoutCountry.slice(5, 7)} ${withoutCountry.slice(7, 9)}`
		}

		// If doesn't start with 998, user is entering normally
		if (digits.length === 0) return "+998 "
		if (digits.length <= 2) return `+998 ${digits}`
		if (digits.length <= 5)
			return `+998 ${digits.slice(0, 2)} ${digits.slice(2)}`
		if (digits.length <= 7)
			return `+998 ${digits.slice(0, 2)} ${digits.slice(2, 5)} ${digits.slice(
				5
			)}`
		return `+998 ${digits.slice(0, 2)} ${digits.slice(2, 5)} ${digits.slice(
			5,
			7
		)} ${digits.slice(7, 9)}`
	}

	const handlePhoneChange = (e) => {
		const formatted = formatPhoneNumber(e.target.value)
		setPhone(formatted)
		setError("")
	}

	const isValidPhone = () => {
		const digits = phone.replace(/\D/g, "")
		return digits.length === 12 && digits.startsWith("998")
	}

	const handleNext = useCallback(() => {
		if (!phone.trim()) {
			setError("Telefon raqamingizni kiriting")
			return
		}

		if (!isValidPhone()) {
			setError("Telefon raqami noto'g'ri formatlashtirilgan")
			return
		}

		onNext({ phone })
	}, [phone, onNext])

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
				<h2 className='text-3xl font-bold text-gray-900 mb-2'>
					Telefon raqami
				</h2>
				<p className='text-gray-600'>Sizga OTP kod yuboramiz</p>
			</div>

			<div className='mb-8'>
				<label className='block text-sm font-semibold text-gray-700 mb-3'>
					Telefon raqamingizni kiriting
				</label>
				<input
					type='tel'
					inputMode='numeric'
					value={phone}
					onChange={handlePhoneChange}
					placeholder='+998 XX XXX XX XX'
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
				Tasdiqlash
			</button>
		</motion.div>
	)
}
