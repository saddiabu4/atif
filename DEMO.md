# Shopir - Transportation Platform Demo

A fully functional, responsive MVP demo for a transportation startup built with React, Vite, and Tailwind CSS. This is a **frontend-only demo** with mock data and simulated API calls.

## 🚀 Features

### **Admin Panel**

- **Dashboard**: View key metrics (daily orders, active drivers, total revenue, platform performance)
- **Users Management**: List all users, block/unblock accounts, manage user roles
- **Drivers Management**: Monitor driver verification status, online/offline status, ratings
- **Orders Management**: Track all trips, view order status, cancel pending orders
- **Payments & Revenue**: Monitor platform commission, revenue summary, export data to CSV
- **Settings**: Configure tariffs, commission percentages, regions

### **Driver Panel**

- **Dashboard**: View online/offline toggle, today's earnings, monthly earnings, total trips, rating
- **Orders**: Accept/reject new ride requests, mark completed orders
- **Earnings**: Track daily/monthly/total earnings, view earnings breakdown
- **Profile**: View personal info, vehicle details, document verification status

### **User (Passenger) Panel**

- **Book a Ride**: Enter pickup and destination, get fare estimation
- **Trip History**: View all past trips with details and ratings
- **Profile**: Manage account info, payment methods, preferences
- **Rating System**: Rate completed trips from 1-5 stars

## 📁 Project Structure

```
src/
├── components/
│   ├── Layout.jsx           # Reusable layout components (Sidebar, Header, etc.)
│   └── ui/                  # shadcn/ui components (Card, Badge, Table, etc.)
├── data/
│   ├── users.json          # Mock user data
│   ├── drivers.json        # Mock driver data
│   ├── orders.json         # Mock order/trip data
│   └── payments.json       # Mock payment data
├── lib/
│   ├── api.js              # Simulated API calls with async/await
│   └── utils.js            # Utility functions
├── pages/
│   ├── admin/              # Admin panel pages
│   ├── driver/             # Driver panel pages
│   └── user/               # User panel pages
├── App.jsx                 # Main app with routing and role selection
└── main.jsx               # Entry point
```

## 🎯 How It Works

### Role Selection

When you first visit the app, you'll see three panel options:

1. **Admin Panel** - Manage the entire platform
2. **Driver Panel** - Accept rides and manage earnings
3. **User Panel** - Book rides and manage trips

Click any panel to enter that role. Use the **Logout** button in the sidebar to return to role selection.

### Mock Data & API Calls

- All data is stored in JSON files in `/src/data/`
- The `/src/lib/api.js` file simulates real API calls with:
  - Async/await pattern
  - 300ms simulated network delay
  - In-memory data mutations
  - State management without a backend

### Key Features Demonstrated

#### ✅ Working Features

- All buttons and toggles are fully functional
- Status changes persist during the session
- User blocking/unblocking updates the UI
- Driver verification workflow
- Order acceptance/completion flow
- Rating system with star selection
- Form inputs for editing profiles
- CSV export for payments
- Toggle for driver online/offline status
- Real-time UI updates from "API" responses

#### 📱 Responsive Design

- Mobile-first approach
- Works seamlessly on:
  - Desktop (1920px+)
  - Tablet (768px - 1200px)
  - Mobile (320px - 767px)
- Sidebar collapses on mobile
- Touch-friendly buttons and forms

## 🛠️ Tech Stack

- **React 18** - UI library
- **Vite** - Build tool & dev server
- **React Router** - Client-side routing
- **Tailwind CSS** - Utility-first CSS
- **shadcn/ui** - Component library
- **Lucide Icons** - Icon library
- **Recharts** - Charts (prepared for future use)

## 🚀 Getting Started

### Installation

```bash
npm install
```

### Development Server

```bash
npm run dev
```

Visit `http://localhost:5173` in your browser.

### Build for Production

```bash
npm run build
```

## 📊 Sample Data Included

### Mock Users (4 users)

- Ahmed Hassan (active, 45 trips, 4.8★)
- Fatima Al-Rashid (active, 32 trips, 4.9★)
- Mohammed Ali (blocked, 78 trips, 3.2★)
- Noor AlAyed (active, 18 trips, 4.7★)

### Mock Drivers (4 drivers)

- Saleh Al-Otaibi (verified, online, 245 trips, 4.9★)
- Khalid Hassan (verified, offline, 198 trips, 4.7★)
- Omar Al-Shehri (pending verification, online, 23 trips)
- Faisal Al-Dossary (verified, offline, 312 trips, 4.8★)

### Mock Orders (5 orders)

- 2 completed orders
- 1 active order
- 1 pending order
- 1 cancelled order

## 🎨 UI/UX Components

- **Dashboard Cards** - Key metrics display
- **Data Tables** - User, driver, and order lists
- **Forms** - Input fields for bookings and profiles
- **Modals/Dialogs** - Rating dialogs and confirmations
- **Badges** - Status indicators (verified, active, pending, etc.)
- **Toggles** - Online/offline status
- **Progress Bars** - Performance metrics
- **Toast Notifications** - User feedback

## 🔄 Data Flow

```
User Action
    ↓
Click Handler
    ↓
API Call (with simulated delay)
    ↓
In-memory data mutation
    ↓
UI Update (state change)
    ↓
Toast Notification
```

## 💡 Demo Scenarios

### Admin Workflow

1. View dashboard with KPIs
2. Block a user
3. Verify a pending driver
4. Cancel a pending order
5. Export payments as CSV
6. Update commission settings

### Driver Workflow

1. Toggle online status
2. View available orders
3. Accept an order
4. Mark order as complete
5. Check earnings
6. View profile and documents

### User Workflow

1. Enter pickup and destination
2. Get fare estimation
3. Book a ride
4. Wait for driver assignment
5. View trip history
6. Rate a completed trip

## 🎯 Investment Demo Highlights

- **Production-Ready UI** - Professional, polished interface
- **Complete Feature Set** - All 3 panels fully functional
- **Realistic Workflows** - True-to-life user journeys
- **Performance** - Fast interactions, smooth animations
- **Responsive Design** - Works on all device sizes
- **Code Quality** - Clean, organized, scalable architecture
- **Mock Data** - Realistic data for demo purposes

## 📝 Notes

- **No Backend Required** - Everything runs in the browser
- **Session-Based** - Data changes persist during the session but reset on page refresh
- **Demo Purpose** - Not meant for production use without a real backend API
- **Easily Extensible** - Replace mock API calls with real ones by updating `/src/lib/api.js`

## 🔐 Security Notice

This is a demo for showcase purposes only. The following would be needed for production:

- Real backend API
- Authentication & authorization
- Payment processing integration
- Database for persistent storage
- Security measures (HTTPS, CORS, etc.)

## 📄 License

MIT - Feel free to use this demo as a reference for your own projects.

---

**Build with** ❤️ using React + Vite + Tailwind CSS
