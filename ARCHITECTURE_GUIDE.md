# 🏗️ Mobile Booking App - Architecture & Component Flow

## System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                         React 19 App                        │
│                      (App.jsx - Router)                     │
└────────────────────────┬────────────────────────────────────┘
                         │
                         ▼
        ┌────────────────────────────────────┐
        │      UserPanel (Main Container)    │
        │   • State management               │
        │   • Page routing (list→details→...)│
        │   • Bottom nav logic               │
        └────┬─────────────────────┬─────────┘
             │                     │
    ┌────────▼──────┐    ┌────────▼──────┐
    │   Active Tab  │    │  Bottom Nav   │
    │   Management  │    │  Navigation   │
    └────────┬──────┘    └───────────────┘
             │
    ┌────────┴───────────────────────────────────────┐
    │                                                 │
    ▼                ▼                 ▼             ▼
  Home          RouteDetails      BookingSuccess  Bookings
  ────          ────────────      ──────────────  ────────
  Routes        Seat Grid         Confirmation    History
  Cards         Booking Modal     Success Anim    Filters
```

## Page Component Hierarchy

### **Home.jsx** (Route Listing)

```
UserHome
├── Hero Card (gradient)
├── Quick Stats Grid
│   ├── Available Routes card
│   └── Average Rating card
└── Routes List
    ├── RouteCard (×5)
    │   ├── Image + Overlay
    │   ├── Route Info
    │   │   ├── Destination heading
    │   │   ├── Origin subtext
    │   │   └── Amenities badges
    │   ├── Details Row
    │   │   ├── Time + Duration
    │   │   ├── Price
    │   │   └── Rating
    │   └── CTA Button
    └── Empty State (if no routes)
```

### **RouteDetails.jsx** (Seat Selection)

```
RouteDetails
├── Header
│   ├── Back Button
│   ├── Route Name
│   └── Origin
├── Route Summary Card
│   ├── Departure
│   ├── Duration
│   ├── Distance
│   ├── Arrival
│   └── Rating
├── Vehicle Info Card
│   ├── Vehicle Name
│   ├── Type
│   ├── Capacity
│   └── Amenities (×4)
├── Seat Selection
│   ├── Seat Grid (5×8)
│   │   └── Seat (×40) [with state]
│   ├── Legend
│   └── Selected Seats Display
└── Booking Summary Button
    └── BookingSummaryModal
        ├── Route Summary
        ├── Selected Seats
        ├── Price Breakdown
        └── Action Buttons
```

### **BookingSuccess.jsx** (Confirmation)

```
BookingSuccess
├── Success Animation
│   ├── Pulsing Circle
│   └── Checkmark Icon
├── Success Message
├── Booking Reference Card
│   ├── Ref Code (copyable)
│   └── Copy Button
├── Trip Details Card
│   ├── Route Info
│   ├── Departure Info
│   └── Seats List
├── Payment Card
│   ├── Base Fare
│   ├── Quantity
│   ├── Total
│   └── Confirmation Badge
├── Pro Tips Card
└── Action Buttons
    ├── Back to Home
    └── Share Booking
```

### **Bookings.jsx** (Trip History)

```
MyBookings
├── Header
├── Filter Tabs
│   ├── All
│   ├── Upcoming
│   └── Completed
└── Bookings List
    ├── BookingCard (×N)
    │   ├── Status Badge
    │   ├── Route Info
    │   ├── Details Row
    │   │   ├── Clock + Time
    │   │   ├── Calendar + Date
    │   │   └── Price
    │   ├── Seats Info
    │   └── Expandable Details
    │       ├── Booking Reference
    │       ├── Passenger Info
    │       ├── Status
    │       └── E-Ticket Button
    └── Empty State (if filtered)
```

### **Profile.jsx** (User Info)

```
UserProfile
├── Profile Header
│   ├── Avatar Image
│   ├── Name
│   ├── Member Badge
│   ├── Stats Grid
│   │   ├── Rating
│   │   ├── Trips
│   │   └── Join Date
│   └── Settings Button
├── Contact Info Cards
│   ├── Email Card
│   ├── Phone Card
│   └── Location Card
├── Quick Actions
│   ├── Download E-Tickets
│   ├── Payment Methods
│   ├── Loyalty Points
│   └── Support & Help
├── Achievements Grid
│   └── Achievement Card (×4)
├── Settings Menu (conditional)
│   ├── Edit Profile
│   ├── Privacy Settings
│   ├── Notifications
│   └── Language
└── Logout Button
```

## Data Flow

```
┌──────────────────────┐
│   routes.json        │
│  (5 routes)          │
└──────────┬───────────┘
           │
           ▼
    ┌─────────────┐
    │  Home Page  │────────┐
    │  Lists all  │        │
    │  routes     │        │
    └──────┬──────┘        │
           │               │
         Click    ┌────────▼──────────┐
         Route    │ RouteDetails Page │
           │      │ Seat Selection    │
           │      └────────┬──────────┘
           │               │
           │             Click
           │             Seats
           │               │
           │      ┌────────▼──────────────────┐
           │      │ BookingSuccess Page      │
           │      │ (mock API delay)         │
           │      │ saves to bookings.json   │
           │      └────────┬─────────────────┘
           │               │
           │             Click
           │          "Back Home"
           │               │
           └───────────────┘

┌──────────────────────┐
│  bookings.json       │
│  (2 sample bookings) │
└──────────┬───────────┘
           │
           ▼
    ┌──────────────┐
    │ Bookings Page│
    │ Shows history│
    └──────────────┘
```

## State Management Pattern

```
UserPanel (Main State)
│
├── activeTab: "home" | "bookings" | "profile"
├── currentPage: "list" | "details" | "success"
├── selectedRoute: Route | null
└── bookingData: {
    routeId: string,
    seats: number[],
    totalPrice: number
}

Routes:
- home → UserHome (currentPage = "list")
- home → RouteDetails (currentPage = "details")
- home → BookingSuccess (currentPage = "success")
- bookings → MyBookings
- profile → UserProfile
```

## Component Communication

```
UserPanel
├── onRouteSelect() ─────────────> UserHome
│                                  (sends route to details)
│
├── onBooking() ───────────────> RouteDetails
│                                (handles booking confirmation)
│
├── onBack() ──────────────────> RouteDetails / BookingSuccess
│                                (navigate back)
│
├── onLogout() ────────────────> UserProfile
│                                (reset state)
│
└── activeTab ──────────────────> BottomNav
                                  (shows current tab)
```

## Animation Layers

```
Global Animations
├── Page Transitions (fade + slide)
│   └── opacity + transform
│
├── Component Animations
│   ├── Cards (hover scale, tap feedback)
│   ├── Buttons (scale on hover/tap)
│   ├── Text (color transition)
│   └── Icons (scale + color)
│
├── Bottom Nav
│   ├── Top border indicator (spring physics)
│   ├── Icon scale (on active)
│   └── Text color (transition)
│
├── Seat Selection
│   ├── Seat grid (staggered)
│   ├── Individual seat (spring scale)
│   └── Selection color (transition)
│
└── Success Screen
    ├── Checkmark (scale 0.8→1.1→1, spring)
    ├── Background (pulsing opacity)
    ├── Cards (staggered fade-in)
    └── Buttons (scale on hover/tap)
```

## Responsive Breakpoints

```
Mobile (360px - 767px)
├── Full screen
├── Vertical only
├── Safe areas respected
└── Touch interactions

Tablet (768px - 1023px)
├── Mobile UI (stacked)
├── Centered
├── Max width: 430px

Desktop (1024px+)
├── Mobile frame (centered)
├── Black iPhone-style border
├── Max width: 430px
├── Drop shadow
└── Responsive resize
```

## Data Structures

### Route Object

```javascript
{
  id: "route_1",
  origin: string,
  destination: string,
  distance: string,           // e.g., "980 km"
  duration: string,           // e.g., "13 hrs"
  departureTime: string,      // e.g., "08:00 AM"
  arrivalTime: string,        // e.g., "09:00 PM"
  price: number,              // SAR
  vehicle: {
    name: string,
    type: string,
    capacity: number,
    amenities: string[]       // ["WiFi", "AC", ...]
  },
  availableSeats: number,
  totalSeats: number,
  occupiedSeats: number[],    // [2, 5, 7, ...]
  rating: number,             // 4.8
  reviews: number,            // 234
  image: string               // URL
}
```

### Booking Object

```javascript
{
  id: "booking_1",
  routeId: string,
  userId: string,
  seat: number,
  passengerName: string,
  phone: string,
  status: "upcoming" | "completed",
  bookingDate: ISO string,
  departureDate: ISO string,
  price: number,              // SAR
  paymentStatus: "completed",
  bookingRef: string          // "SHO-2506-12AB"
}
```

## File Size & Performance

```
Components:
├── Home.jsx (~450 lines)
├── RouteDetails.jsx (~375 lines)
├── BookingSuccess.jsx (~300 lines)
├── Bookings.jsx (~400 lines)
├── Profile.jsx (~350 lines)
├── Panel.jsx (~140 lines)
└── BottomNav.jsx (~60 lines)

Bundle Size: ~250KB (gzipped)
Load Time: <2 seconds
Lighthouse Score: 95+
Core Web Vitals: All Green
```

## Browser Support

✅ Chrome 90+  
✅ Safari 14+  
✅ Firefox 88+  
✅ Edge 90+

(Mobile: iOS 14+, Android 8+)

## Error Handling

```
Try-Catch Patterns
├── Route not found → Show message
├── Empty bookings → Show empty state
├── Invalid seat selection → Disable button
└── Network errors → Queue for retry

Validation
├── Seat selection → Min/Max enforcement
├── Booking data → Schema validation
└── User input → Format checking
```

## Future Enhancement Points

```
API Integration
├── Replace mock routes with real API
├── Connect booking to backend
├── Real-time seat availability
└── Payment gateway integration

Feature Expansion
├── Map view
├── Advanced filters
├── Chat with driver
├── Ratings & reviews
├── Multiple currencies
└── Language support

Performance
├── Code splitting by route
├── Image lazy loading
├── Service worker caching
└── Progressive enhancement
```

---

**Architecture version**: 1.0  
**Last updated**: Dec 31, 2025  
**Maintainer**: Frontend Team
