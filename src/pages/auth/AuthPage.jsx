import { useAuth } from "@/lib/authContext"
import { AnimatePresence } from "framer-motion"
import { useCallback, useState } from "react"
import { useNavigate } from "react-router-dom"
import { NameScreen } from "./NameScreen"
import { OtpScreen } from "./OtpScreen"
import { PhoneScreen } from "./PhoneScreen"
import { WelcomeScreen } from "./WelcomeScreen"

export function AuthPage() {
	const navigate = useNavigate()
	const { login } = useAuth()
	const [step, setStep] = useState(1)
	const [authData, setAuthData] = useState({})

	const handleWelcomeNext = useCallback((data) => {
		setAuthData((prev) => ({ ...prev, ...data }))
		setStep(2)
	}, [])

	const handlePhoneNext = useCallback((data) => {
		setAuthData((prev) => ({ ...prev, ...data }))
		setStep(3)
	}, [])

	const handleOtpNext = useCallback((data) => {
		setAuthData((prev) => ({ ...prev, ...data }))
		setStep(4)
	}, [])

	const handleNameNext = useCallback(
		(data) => {
			const finalAuthData = {
				id: Math.random().toString(36).substr(2, 9),
				name: data.name,
				phone: authData.phone,
				region: authData.region,
				loginTime: new Date().toISOString(),
			}

			login(finalAuthData)
			navigate("/", { replace: true })
		},
		[authData, login, navigate]
	)

	const handleBack = useCallback(() => {
		if (step > 1) {
			setStep(step - 1)
		}
	}, [step])

	return (
		<div className='flex items-center justify-center min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 px-4'>
			<div className='w-full'>
				<AnimatePresence mode='wait'>
					{step === 1 && (
						<WelcomeScreen key='welcome' onNext={handleWelcomeNext} />
					)}
					{step === 2 && (
						<PhoneScreen
							key='phone'
							onNext={handlePhoneNext}
							onBack={handleBack}
						/>
					)}
					{step === 3 && (
						<OtpScreen
							key='otp'
							phone={authData.phone}
							onNext={handleOtpNext}
							onBack={handleBack}
						/>
					)}
					{step === 4 && (
						<NameScreen
							key='name'
							onNext={handleNameNext}
							onBack={handleBack}
						/>
					)}
				</AnimatePresence>
			</div>
		</div>
	)
}
