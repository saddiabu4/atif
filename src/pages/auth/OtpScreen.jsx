import { motion } from "framer-motion"
import { ArrowLeft } from "lucide-react"
import { useCallback, useEffect, useRef, useState } from "react"

const DEMO_OTP = "111111"

export function OtpScreen({ phone, onNext, onBack }) {
	const [otp, setOtp] = useState(["", "", "", "", "", ""])
	const [error, setError] = useState("")
	const inputRefs = useRef([null, null, null, null, null, null])

	useEffect(() => {
		inputRefs.current[0]?.focus()
	}, [])

	const handleChange = useCallback(
		(index, value) => {
			// Only allow digits
			if (!/^\d*$/.test(value)) return

			const newOtp = [...otp]
			newOtp[index] = value.slice(-1) // Keep only last digit

			setOtp(newOtp)
			setError("")

			// Auto-focus to next input if digit is entered
			if (value && index < 5) {
				inputRefs.current[index + 1]?.focus()
			}
		},
		[otp]
	)

	const handleKeyDown = useCallback(
		(index, e) => {
			// Backspace: move to previous input and clear
			if (e.key === "Backspace") {
				e.preventDefault()
				const newOtp = [...otp]
				newOtp[index] = ""
				setOtp(newOtp)

				if (index > 0) {
					inputRefs.current[index - 1]?.focus()
				}
				return
			}

			// Arrow keys for navigation
			if (e.key === "ArrowLeft" && index > 0) {
				e.preventDefault()
				inputRefs.current[index - 1]?.focus()
			} else if (e.key === "ArrowRight" && index < 5) {
				e.preventDefault()
				inputRefs.current[index + 1]?.focus()
			}
		},
		[otp]
	)

	const handlePaste = useCallback((e) => {
		e.preventDefault()
		const pastedData = e.clipboardData.getData("text").replace(/\D/g, "")

		if (pastedData.length <= 6) {
			const newOtp = pastedData.split("").concat(Array(6).fill("")).slice(0, 6)
			setOtp(newOtp)

			// Focus last filled input
			setTimeout(() => {
				const lastIndex = newOtp.findIndex((digit) => digit === "")
				if (lastIndex === -1) {
					inputRefs.current[5]?.blur()
				} else if (lastIndex > 0) {
					inputRefs.current[lastIndex - 1]?.focus()
				}
			}, 0)
		}
	}, [])

	const handleSubmit = useCallback(() => {
		const enteredOtp = otp.join("")

		if (enteredOtp.length !== 6) {
			setError("Barcha 6 ta raqamni kiriting")
			return
		}

		if (enteredOtp !== DEMO_OTP) {
			setError("Kod noto'g'ri, qayta urinib ko'ring")
			setOtp(["", "", "", "", "", ""])
			inputRefs.current[0]?.focus()
			return
		}

		onNext({ phone, otp: enteredOtp })
	}, [otp, phone, onNext])

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
					Tasdiqlash kodi
				</h2>
				<p className='text-gray-600 text-sm'>
					{phone} ga yuborilgan 6 ta raqamli kodni kiriting
				</p>
			</div>

			<div className='mb-8'>
				<div className='flex gap-3 justify-center mb-6'>
					{otp.map((digit, index) => (
						<input
							key={index}
							ref={(el) => (inputRefs.current[index] = el)}
							type='text'
							inputMode='numeric'
							value={digit}
							onChange={(e) => handleChange(index, e.target.value)}
							onKeyDown={(e) => handleKeyDown(index, e)}
							onPaste={handlePaste}
							maxLength='1'
							className={`w-12 h-12 text-center text-xl font-bold rounded-lg border-2 transition-all duration-200 focus:outline-none ${
								error
									? "border-red-500 focus:border-red-600 bg-red-50"
									: "border-gray-300 focus:border-blue-500 bg-white"
							}`}
						/>
					))}
				</div>

				{error && (
					<motion.p
						initial={{ opacity: 0, y: -10 }}
						animate={{ opacity: 1, y: 0 }}
						className='text-red-600 text-sm font-medium text-center'
					>
						{error}
					</motion.p>
				)}
			</div>

			<div className='text-center text-xs text-gray-500 mb-6'>
				<p>
					Demo OTP: <span className='font-mono font-bold'>111111</span>
				</p>
			</div>

			<button
				onClick={handleSubmit}
				className='w-full py-4 rounded-xl font-semibold text-lg bg-blue-600 text-white hover:bg-blue-700 transition-all duration-200 shadow-lg'
			>
				Kirish
			</button>
		</motion.div>
	)
}
