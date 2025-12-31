import {
	createContext,
	useCallback,
	useContext,
	useEffect,
	useState,
} from "react"

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
	const [user, setUser] = useState(null)
	const [isLoading, setIsLoading] = useState(true)

	// Load user from localStorage on mount
	useEffect(() => {
		try {
			const storedUser = localStorage.getItem("atif_user")
			if (storedUser) {
				setUser(JSON.parse(storedUser))
			}
		} catch {
			localStorage.removeItem("atif_user")
		} finally {
			setIsLoading(false)
		}
	}, [])

	const login = useCallback((userData) => {
		setUser(userData)
		localStorage.setItem("atif_user", JSON.stringify(userData))
	}, [])

	const logout = useCallback(() => {
		setUser(null)
		localStorage.removeItem("atif_user")
	}, [])

	const isAuthenticated = !!user

	return (
		<AuthContext.Provider
			value={{ user, isAuthenticated, isLoading, login, logout }}
		>
			{children}
		</AuthContext.Provider>
	)
}

export function useAuth() {
	const context = useContext(AuthContext)
	if (!context) {
		throw new Error("useAuth must be used within AuthProvider")
	}
	return context
}
