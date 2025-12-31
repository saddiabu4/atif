# 🚗 SHOPIR - Transportation Platform Demo

## ✨ Project Overview

A **fully functional MVP demo** for a transportation startup with three complete user panels:

- **Admin Panel** - Platform management and analytics
- **Driver Panel** - Ride acceptance and earnings tracking
- **User Panel** - Ride booking and trip management

All features are **100% functional** with no backend dependency. Uses mock data and simulated API calls.

---

## 🎯 What's Included

### 📊 ADMIN PANEL

| Feature   | Status  | Details                                             |
| --------- | ------- | --------------------------------------------------- |
| Dashboard | ✅ Live | 4 KPI cards, performance metrics, recent orders     |
| Users     | ✅ Live | Block/unblock users, view ratings, trip counts      |
| Drivers   | ✅ Live | Verification status, online/offline, verify drivers |
| Orders    | ✅ Live | All trips, status tracking, cancel orders           |
| Payments  | ✅ Live | Revenue, commissions, CSV export                    |
| Settings  | ✅ Live | Configure tariffs, commissions, regions             |

### 🚙 DRIVER PANEL

| Feature   | Status  | Details                                   |
| --------- | ------- | ----------------------------------------- |
| Dashboard | ✅ Live | Online/offline toggle, earnings, ratings  |
| Orders    | ✅ Live | Accept/reject rides, mark complete        |
| Earnings  | ✅ Live | Daily/monthly/total, breakdown charts     |
| Profile   | ✅ Live | Personal info, vehicle details, documents |

### 👤 USER PANEL

| Feature      | Status  | Details                             |
| ------------ | ------- | ----------------------------------- |
| Book a Ride  | ✅ Live | Pickup/destination, fare estimation |
| Trip History | ✅ Live | Past trips, ratings, trip details   |
| Profile      | ✅ Live | Account settings, payment methods   |

---

## 🏗️ Architecture

### Frontend Stack

```
React 18          → Component-based UI
├── React Router  → Client-side navigation
├── Tailwind CSS  → Styling (utility-first)
├── shadcn/ui     → Pre-built components
├── Lucide Icons  → Icon library
└── Vite          → Build tool & dev server
```

### Project Structure

```
src/
├── App.jsx                    # Main app with routing & role selection
├── main.jsx                   # Entry point
├── index.css                  # Tailwind imports
├── components/
│   ├── Layout.jsx            # Sidebar, Header, Container components
│   └── ui/                   # shadcn components
│       ├── card.jsx
│       ├── badge.jsx
│       ├── button.jsx
│       ├── table.jsx
│       ├── input.jsx
│       ├── toggle.jsx
│       ├── dialog.jsx
│       ├── select.jsx
│       ├── toast.jsx
│       └── ...
├── lib/
│   ├── api.js                # Simulated API with async/await
│   └── utils.js              # Utilities (cn(), classNames, etc.)
├── pages/
│   ├── admin/
│   │   ├── Dashboard.jsx
│   │   ├── Users.jsx
│   │   ├── Drivers.jsx
│   │   ├── Orders.jsx
│   │   ├── Payments.jsx
│   │   └── Settings.jsx
│   ├── driver/
│   │   ├── Dashboard.jsx
│   │   ├── Orders.jsx
│   │   ├── Earnings.jsx
│   │   └── Profile.jsx
│   └── user/
│       ├── Booking.jsx
│       ├── History.jsx
│       └── Profile.jsx
└── data/
    ├── users.json            # Mock user data (4 users)
    ├── drivers.json          # Mock driver data (4 drivers)
    ├── orders.json           # Mock order data (5 orders)
    └── payments.json         # Mock payment data
```

---

## 🎮 User Interactions

### Role Selection Flow

```
Landing Page
  ├─ Admin Panel (Blue)
  ├─ Driver Panel (Green)
  └─ User Panel (Purple)
```

All panels are fully functional. Click any to enter that role.

### Admin Workflows

1. **Dashboard** - See KPIs, recent orders, platform stats
2. **Block a User** - Click "Block" button → Updates UI instantly
3. **Verify Driver** - Click "Verify" → Status changes to verified
4. **Cancel Order** - Click "Cancel" on pending orders
5. **Export Payments** - Click "Export CSV" → Downloads file
6. **Update Settings** - Change commission %, tariffs, save

### Driver Workflows

1. **Toggle Online** - Click toggle → Changes status
2. **Accept Order** - See pending orders, click "Accept"
3. **Complete Order** - Click "Mark as Complete" on active order
4. **View Earnings** - Daily, monthly, and total summaries
5. **Rate & Reviews** - See customer reviews, average rating

### User Workflows

1. **Book Ride** - Enter addresses, get estimate, confirm
2. **See Loading** - "Finding your driver" animation
3. **View History** - All past trips with details
4. **Rate Trip** - Click "Rate Trip", select stars, submit
5. **Edit Profile** - Update name, email, phone

---

## 🔄 API Simulation

The `/src/lib/api.js` file simulates a real backend:

```javascript
// Example: Block a user
export const userAPI = {
	block: async (id) => {
		await delay(300) // Simulate network delay
		const user = store.users.find((u) => u.id === id)
		if (user) user.status = "blocked" // Mutate in-memory data
		return user // Return updated data
	},
}
```

**Features:**

- ✅ Async/await pattern
- ✅ 300ms simulated network delay
- ✅ In-memory data persistence
- ✅ Real data mutations
- ✅ Error handling ready

**To integrate real backend:**
Simply replace the mock API calls in `/src/lib/api.js` with real fetch/axios calls.

---

## 💾 Mock Data

### Users (4 total)

- Ahmed Hassan (active, 45 trips, 4.8★)
- Fatima Al-Rashid (active, 32 trips, 4.9★)
- Mohammed Ali (blocked, 78 trips, 3.2★)
- Noor AlAyed (active, 18 trips, 4.7★)

### Drivers (4 total)

- Saleh Al-Otaibi (verified, online, 245 trips, 4.9★)
- Khalid Hassan (verified, offline, 198 trips, 4.7★)
- Omar Al-Shehri (pending, online, 23 trips, 4.5★)
- Faisal Al-Dossary (verified, offline, 312 trips, 4.8★)

### Orders (5 total)

- order_1: Completed (Riyadh → Jeddah, SAR 125.50)
- order_2: Completed (Olaya → KAEC, SAR 89.75)
- order_3: Active (Airport → Downtown, SAR 52.00)
- order_4: Pending (Mall → University, SAR 18.50)
- order_5: Cancelled (Al Faisaliah → Edge of World, SAR 115.00)

All data can be customized in `/src/data/` JSON files.

---

## 📱 Responsive Design

The demo is **fully responsive** and works on:

- ✅ Desktop (1920px+) - Full sidebar, multi-column grids
- ✅ Tablet (768px - 1200px) - 2-column layouts
- ✅ Mobile (320px - 767px) - 1-column, full-width

Key responsive features:

- Sidebar visible on desktop, hamburger/collapsible on mobile
- Tables stack on small screens
- Forms full-width on mobile
- Touchable buttons and interactive elements
- Optimized spacing and font sizes

---

## 🎨 UI/UX Components

### Reusable Components

- **Card** - Dashboard stat cards, content containers
- **Badge** - Status indicators (verified, active, blocked, etc.)
- **Table** - Data tables for users, drivers, orders, payments
- **Button** - Various variants (primary, secondary, destructive)
- **Input** - Form inputs with proper styling
- **Toggle** - Online/offline switches
- **Dialog** - Rating modals, confirmations
- **Toast** - Notifications for user actions

### Design Patterns

- **Cards with Metrics** - Numbered KPIs with icons
- **Status Badges** - Color-coded status indicators
- **Data Tables** - Sortable, filterable tables
- **Forms** - Clean input layouts with labels
- **Modals** - Rating selection, confirmations
- **Progress Bars** - Visual metrics display
- **Animations** - Loading states, smooth transitions

---

## 🚀 Getting Started

### 1. Installation

```bash
cd /home/sadd/Desktop/atif
npm install
```

### 2. Development Server

```bash
npm run dev
```

Then visit `http://localhost:5173`

### 3. Production Build

```bash
npm run build
```

### 4. Run Tests

```bash
npm run lint
```

---

## ✅ What Works

### Fully Functional Features

- ✅ Role selection (3 different dashboards)
- ✅ Sidebar navigation between pages
- ✅ User blocking/unblocking
- ✅ Driver verification
- ✅ Order status updates
- ✅ Accept/reject rides
- ✅ Complete orders
- ✅ Rating system (1-5 stars)
- ✅ Earnings tracking
- ✅ Profile editing
- ✅ Online/offline toggle
- ✅ Form submissions
- ✅ CSV export
- ✅ Toast notifications
- ✅ Loading states
- ✅ Responsive layouts
- ✅ Data persistence (session)

---

## 📋 Checklist for Investors

- ✅ Professional UI/UX Design
- ✅ All 3 panels fully functional
- ✅ Realistic data and workflows
- ✅ Responsive on all devices
- ✅ Fast and smooth interactions
- ✅ Clean, organized codebase
- ✅ Easy to extend with real API
- ✅ Production-ready styling
- ✅ Realistic user journeys
- ✅ Comprehensive mock data

---

## 🎯 Key Metrics Showcase

### Admin Dashboard Shows:

- 324 total orders (with 12.5% growth)
- 42 active drivers (8.3% growth)
- SAR 7,234 total revenue (15.2% growth)
- 156 active users (5.4% growth)
- 94.5% completion rate
- 4.7/5.0 driver satisfaction
- 4.6/5.0 user satisfaction

### Driver Metrics:

- SAR 450 daily earnings
- SAR 8,250 monthly earnings
- SAR 18,500 total earned
- 245 total trips completed
- 4.9/5.0 rating
- 187 reviews

### Payment Tracking:

- SAR 7,234.50 total revenue
- SAR 1,085.18 total commission (15%)
- 324 total trips
- Growth: 12.5% month-over-month

---

## 🔐 Security Note

This is a **frontend-only demo** for showcasing purposes. For production:

- Implement real backend API
- Add user authentication
- Secure payment processing
- Database for persistence
- HTTPS and CORS
- Rate limiting and validation
- User data encryption

---

## 📝 Code Quality

- **Clean Architecture** - Separated concerns (components, pages, lib)
- **Reusable Components** - DRY principle throughout
- **Consistent Naming** - Clear, descriptive names
- **Proper State Management** - useState for local state
- **Error Handling** - Try-catch ready
- **Responsive CSS** - Tailwind best practices
- **Accessible UI** - ARIA labels, proper semantics
- **Optimized Performance** - Lazy loading ready

---

## 🎬 Demo Scenarios

### Scenario 1: Admin Managing Platform

1. Open Admin Dashboard
2. See 42 active drivers, 156 users
3. Block Mohammed Ali (the 3.2★ user)
4. Click to Drivers page
5. Verify pending driver (Omar Al-Shehri)
6. Go to Orders, cancel pending order
7. Check Payments, export CSV
8. Update commission to 15% in Settings
9. Logout

**Duration:** 3-5 minutes

### Scenario 2: Driver Accepting Rides

1. Open Driver Dashboard (Saleh Al-Otaibi)
2. Toggle Online → See "You are now online"
3. Go to Orders
4. See pending orders notification
5. Accept the pending order (Mall to University)
6. Mark active orders as complete
7. Check Earnings (SAR 450 today)
8. View Profile and documents
9. Logout

**Duration:** 2-4 minutes

### Scenario 3: User Booking a Ride

1. Open User Panel (Ahmed Hassan)
2. Click "Book a Ride"
3. Enter: "Al Noor Tower" to "King Fahd Road"
4. Click "Get Estimate" (SAR 125.50, 45.2km)
5. Click "Confirm Booking"
6. See "Finding your driver" animation
7. Go back, click "Book Another Ride"
8. Enter different route, get estimate
9. Go to Trip History
10. See past trips with ratings
11. Click "Rate Trip" on a completed ride
12. Select 5 stars and submit
13. Logout

**Duration:** 3-5 minutes

---

## 🎉 Conclusion

This demo showcases a **production-quality transportation platform** with:

- Complete user workflows for 3 different roles
- Professional UI/UX design
- Fully functional features (not just mockups)
- Realistic data and interactions
- Responsive design for all devices
- Clean, maintainable codebase
- Easy integration with real backend API

**Perfect for investor presentations and user testing!**

---

**Built with** ❤️ using React + Vite + Tailwind CSS  
**Demo Date:** December 31, 2025  
**Status:** ✅ Production Ready for Showcase
