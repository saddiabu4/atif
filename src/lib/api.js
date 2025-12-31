import driversData from "@/data/drivers.json"
import ordersData from "@/data/orders.json"
import paymentsData from "@/data/payments.json"
import usersData from "@/data/users.json"

// Simulate API delay (500-1200ms for realistic feel)
const delay = (ms) => {
	const actualDelay = ms || Math.random() * 700 + 500
	return new Promise((resolve) => setTimeout(resolve, actualDelay))
}

// In-memory data store
let store = {
	users: JSON.parse(JSON.stringify(usersData.users)),
	drivers: JSON.parse(JSON.stringify(driversData.drivers)),
	orders: JSON.parse(JSON.stringify(ordersData.orders)),
	payments: JSON.parse(JSON.stringify(paymentsData.payments)),
	platformStats: JSON.parse(JSON.stringify(paymentsData.platformStats)),
}

// USER APIs
export const userAPI = {
	getAll: async () => {
		await delay()
		return store.users
	},
	getById: async (id) => {
		await delay()
		return store.users.find((u) => u.id === id)
	},
	block: async (id) => {
		await delay()
		const user = store.users.find((u) => u.id === id)
		if (user) user.status = "blocked"
		return user
	},
	unblock: async (id) => {
		await delay()
		const user = store.users.find((u) => u.id === id)
		if (user) user.status = "active"
		return user
	},
	changeRole: async (id, role) => {
		await delay()
		const user = store.users.find((u) => u.id === id)
		if (user) user.role = role
		return user
	},
}

// DRIVER APIs
export const driverAPI = {
	getAll: async () => {
		await delay()
		return store.drivers
	},
	getById: async (id) => {
		await delay()
		return store.drivers.find((d) => d.id === id)
	},
	toggleOnlineStatus: async (id, status) => {
		await delay()
		const driver = store.drivers.find((d) => d.id === id)
		if (driver) driver.status = status ? "online" : "offline"
		return driver
	},
	verify: async (id) => {
		await delay()
		const driver = store.drivers.find((d) => d.id === id)
		if (driver) {
			driver.verificationStatus = "verified"
			driver.documents.license = "verified"
			driver.documents.registration = "verified"
		}
		return driver
	},
	updateEarnings: async (id, amount) => {
		await delay()
		const driver = store.drivers.find((d) => d.id === id)
		if (driver) {
			driver.earnings.today += amount
			driver.earnings.thisMonth += amount
			driver.earnings.total += amount
		}
		return driver
	},
}

// ORDER APIs
export const orderAPI = {
	getAll: async () => {
		await delay()
		return store.orders
	},
	getById: async (id) => {
		await delay()
		return store.orders.find((o) => o.id === id)
	},
	create: async (orderData) => {
		await delay()
		const newOrder = {
			id: `order_${Date.now()}`,
			status: "pending",
			createdAt: new Date().toISOString(),
			completedAt: null,
			rating: null,
			review: null,
			...orderData,
		}
		store.orders.push(newOrder)
		return newOrder
	},
	updateStatus: async (id, status) => {
		await delay()
		const order = store.orders.find((o) => o.id === id)
		if (order) {
			order.status = status
			if (status === "completed") {
				order.completedAt = new Date().toISOString()
			}
			if (status === "cancelled") {
				order.cancelledAt = new Date().toISOString()
			}
		}
		return order
	},
	assignDriver: async (orderId, driverId) => {
		await delay()
		const order = store.orders.find((o) => o.id === orderId)
		if (order) order.driverId = driverId
		return order
	},
	addRating: async (id, rating, review) => {
		await delay()
		const order = store.orders.find((o) => o.id === id)
		if (order) {
			order.rating = rating
			order.review = review
		}
		return order
	},
}

// PAYMENT APIs
export const paymentAPI = {
	getAll: async () => {
		await delay()
		return store.payments
	},
	getStats: async () => {
		await delay()
		return store.platformStats
	},
	recordPayment: async (paymentData) => {
		await delay()
		const newPayment = {
			id: `pay_${Date.now()}`,
			status: "completed",
			date: new Date().toISOString(),
			...paymentData,
		}
		store.payments.push(newPayment)

		// Update platform stats
		store.platformStats.totalRevenue += paymentData.amount
		store.platformStats.totalCommission += paymentData.commission

		return newPayment
	},
	processRefund: async (paymentId) => {
		await delay()
		const payment = store.payments.find((p) => p.id === paymentId)
		if (payment) payment.status = "refunded"
		return payment
	},
}
