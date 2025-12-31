import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { motion } from "framer-motion"
import { Save, Settings as SettingsIcon } from "lucide-react"
import { useState } from "react"

export function AdminSettings() {
	const [settings, setSettings] = useState({
		commission: 15,
		minFare: 10,
		baseFarePerKm: 2.5,
		nightSurge: 1.5,
	})
	const [saved, setSaved] = useState(false)

	const handleChange = (key, value) => {
		setSettings((prev) => ({
			...prev,
			[key]: parseFloat(value) || 0,
		}))
		setSaved(false)
	}

	const handleSave = () => {
		setSaved(true)
		setTimeout(() => setSaved(false), 3000)
	}

	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ duration: 0.3 }}
			className='space-y-6'
		>
			{/* Commission & Pricing */}
			<Card className='border-0 shadow-sm'>
				<CardHeader className='border-b border-slate-100'>
					<div className='flex items-center justify-between'>
						<div className='flex items-center gap-2'>
							<SettingsIcon className='w-5 h-5 text-blue-600' />
							<CardTitle>Commission & Pricing</CardTitle>
						</div>
						<motion.div
							onClick={handleSave}
							animate={{
								backgroundColor: saved
									? "rgb(34, 197, 94)"
									: "rgb(59, 130, 246)",
							}}
							className='flex items-center gap-2 px-4 py-2 text-white rounded-lg text-sm font-medium transition-colors cursor-pointer'
						>
							<Save className='w-4 h-4' />
							{saved ? "Saved" : "Save"}
						</motion.div>
					</div>
				</CardHeader>
				<CardContent className='pt-6'>
					<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
						<div>
							<label className='block text-sm font-medium text-slate-700 mb-2'>
								Commission Percentage (%)
							</label>
							<Input
								type='number'
								value={settings.commission}
								onChange={(e) => handleChange("commission", e.target.value)}
								step='0.1'
								min='0'
								className='border-slate-200'
							/>
							<p className='text-xs text-slate-600 mt-1'>
								Platform commission from each ride
							</p>
						</div>

						<div>
							<label className='block text-sm font-medium text-slate-700 mb-2'>
								Minimum Fare (SAR)
							</label>
							<Input
								type='number'
								value={settings.minFare}
								onChange={(e) => handleChange("minFare", e.target.value)}
								step='0.1'
								min='0'
								className='border-slate-200'
							/>
							<p className='text-xs text-slate-600 mt-1'>
								Minimum charge for any ride
							</p>
						</div>

						<div>
							<label className='block text-sm font-medium text-slate-700 mb-2'>
								Base Fare per KM (SAR)
							</label>
							<Input
								type='number'
								value={settings.baseFarePerKm}
								onChange={(e) => handleChange("baseFarePerKm", e.target.value)}
								step='0.1'
								min='0'
								className='border-slate-200'
							/>
							<p className='text-xs text-slate-600 mt-1'>
								Per kilometer charge
							</p>
						</div>

						<div>
							<label className='block text-sm font-medium text-slate-700 mb-2'>
								Night Surge Multiplier (x)
							</label>
							<Input
								type='number'
								value={settings.nightSurge}
								onChange={(e) => handleChange("nightSurge", e.target.value)}
								step='0.1'
								min='1'
								className='border-slate-200'
							/>
							<p className='text-xs text-slate-600 mt-1'>
								Price multiplier for night hours (10 PM - 6 AM)
							</p>
						</div>
					</div>
				</CardContent>
			</Card>

			{/* Regions */}
			<Card className='border-0 shadow-sm'>
				<CardHeader className='border-b border-slate-100'>
					<CardTitle>Active Regions</CardTitle>
				</CardHeader>
				<CardContent className='pt-6'>
					<div className='space-y-3'>
						{["Riyadh", "Jeddah", "Dammam", "Mecca", "Medina"].map(
							(region, idx) => (
								<motion.div
									key={region}
									initial={{ opacity: 0, x: -10 }}
									animate={{ opacity: 1, x: 0 }}
									transition={{ delay: idx * 0.1 }}
									className='flex items-center justify-between p-3 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors'
								>
									<span className='font-medium text-slate-900'>{region}</span>
									<Button size='sm' className='text-xs'>
										Edit
									</Button>
								</motion.div>
							)
						)}
					</div>
				</CardContent>
			</Card>
		</motion.div>
	)
}
