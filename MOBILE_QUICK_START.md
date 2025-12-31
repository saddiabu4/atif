# Mobile Panels - Quick Start Guide

## What's New?

✨ **Fully mobile-optimized User and Driver panels** with bottom navigation, perfect for phones!

## How to Access

### Role Selection Screen

- Visit the app root
- Click **"Enter as User"** or **"Enter as Driver"**
- Automatically loads mobile panel at `/user/panel` or `/driver/panel`

## User Panel Navigation

```
📱 HOME (Book a Ride)
   ├─ Enter pickup location
   ├─ Enter destination
   ├─ Get price estimate
   └─ Book ride (simulates driver finding)

📍 TRIPS (Trip History)
   ├─ View completed rides
   ├─ See trip details
   └─ Tap for more info

💳 WALLET (Payment)
   ├─ Check balance
   ├─ Add money
   └─ View transactions

👤 PROFILE (Account)
   ├─ View personal info
   ├─ See rating & trips
   └─ Logout
```

## Driver Panel Navigation

```
🚗 HOME (Online/Offline)
   ├─ HUGE toggle button
   ├─ Quick earnings view
   └─ Accept/Decline requests

📋 ORDERS (Active Trip)
   ├─ Passenger information
   ├─ Pickup & destination
   ├─ Trip timeline
   └─ Navigate button

💰 EARNINGS (Income)
   ├─ Today's earnings
   ├─ Monthly breakdown
   └─ Recent trips list

👤 PROFILE (Account)
   ├─ Driver information
   ├─ Vehicle details
   ├─ Documents status
   └─ Logout
```

## Key Features

### Mobile-First Design

- ✅ Optimized for 360px-767px (phones)
- ✅ Works on tablets (stacked layout)
- ✅ Desktop: Centered phone frame
- ✅ Safe area support (iOS notches)

### Touch-Friendly

- ✅ 44px+ buttons (thumb-friendly)
- ✅ Large text (no pinch zoom needed)
- ✅ Bottom nav for natural reach
- ✅ Minimal scrolling

### User Experience

- ✅ Bottom navigation (fixed)
- ✅ Status badges (quick recognition)
- ✅ Toast notifications (feedback)
- ✅ Smooth transitions (60fps)
- ✅ One action per screen

### Interactive Elements

**User Booking:**

- Type pickup location
- Type destination
- Tap "Get Price Estimate"
- Tap "Book Ride Now"
- Wait for driver assignment (2-3 sec)
- Tap "Call Driver"

**Driver Requests:**

- Tap big toggle button to go ONLINE
- Wait 3 seconds for request (simulated)
- Accept or Decline request
- View active order details
- Tap "Navigate to Pickup"

## Component Structure

```javascript
// Mobile Panel Layout
<MobileContainer>
	<MobileHeader title='...' subtitle='...' />
	<MobileContent>{/* Page-specific content */}</MobileContent>
	<BottomNav items={navItems} activeItem={activeTab} />
	<ToastContainer toasts={toasts} />
</MobileContainer>
```

## Reusable Mobile Components

### 1. BottomNav

```jsx
<BottomNav
	items={[
		{ id: "home", label: "Home", icon: HomeIcon },
		{ id: "trips", label: "Trips", icon: TripsIcon },
		// ...
	]}
	activeItem={activeTab}
	onItemClick={setActiveTab}
/>
```

### 2. MobileHeader

```jsx
<MobileHeader
	title='Your Title'
	subtitle='Optional subtitle'
	action={<Button>Action</Button>}
/>
```

### 3. StatusBadge

```jsx
<StatusBadge status="completed" />  {/* Green badge */}
<StatusBadge status="active" />     {/* Blue badge */}
<StatusBadge status="cancelled" />  {/* Red badge */}
```

### 4. Toast Notifications

```javascript
const showToast = (message, type = "success") => {
	const id = Date.now()
	setToasts((prev) => [...prev, { id, message, type }])
	// Auto-dismisses after 3 seconds
}

showToast("Booking confirmed!") // Success
showToast("Error occurred", "error") // Error
showToast("FYI", "info") // Info
```

### 5. TripCard

```jsx
<TripCard
	trip={tripData}
	driverName='Ahmed H.'
	driverAvatar='...'
	driverRating={4.9}
	onClick={() => handleTripClick(trip)}
/>
```

## Styling Tips

### Mobile-First Classes

```css
/* Use mobile defaults */
.container {
	padding: 16px; /* Mobile padding */
}

/* Override on larger screens */
@media (min-width: 768px) {
	.container {
		max-width: 640px;
	}
}
```

### Bottom Navigation Spacing

```jsx
{
	/* Always add this to avoid overlap */
}
;<MobileContent className='pb-28'>
	{/* Content with 112px bottom padding */}
</MobileContent>
```

### Safe Area Support

```jsx
{
	/* Automatically handled in MobileHeader */
}
;<div className='safe-area-top safe-area-bottom'>
	{/* Content respects notches on iOS */}
</div>
```

## Testing Checklist

- [ ] Mobile (320px - 767px)

  - [ ] No horizontal scroll
  - [ ] Text readable without zoom
  - [ ] Buttons easily tappable
  - [ ] Bottom nav accessible

- [ ] Tablet (768px - 1023px)

  - [ ] Stacked layout works
  - [ ] Navigation still functional
  - [ ] Content properly spaced

- [ ] Desktop (1024px+)
  - [ ] Centered phone frame
  - [ ] Max width 430px
  - [ ] Looks like mobile app

## Common Tasks

### Add New Tab to Navigation

```javascript
const navItems = [
	// ... existing items
	{
		id: "new-tab",
		label: "New",
		icon: ({ className }) => <NewIcon className={className} />,
	},
]

// In component:
{
	activeTab === "new-tab" && <NewTabComponent />
}
```

### Show Toast Notification

```javascript
showToast("Message here") // Default success
showToast("Error!", "error") // Error
showToast("Info", "info") // Info
```

### Create New Mobile Page

```javascript
// pages/user/NewPage.jsx
function NewPage({ onShowToast }) {
	return (
		<>
			<MobileHeader title='Page Title' subtitle='...' />
			<MobileContent>{/* Your content */}</MobileContent>
		</>
	)
}
```

## Performance Tips

1. **Minimize re-renders**

   - Use `useState` wisely
   - Memoize expensive components
   - Avoid inline object creation

2. **Optimize images**

   - Use responsive images
   - Load from CDN (dicebear for avatars)
   - Lazy load when possible

3. **Smooth scrolling**

   - Use CSS scroll-behavior
   - Avoid heavy computations on scroll
   - Hardware acceleration for animations

4. **Bundle size**
   - Tree-shake unused imports
   - Lazy load pages/routes
   - Monitor bundle size

## Troubleshooting

**Issue: Bottom nav overlapping content**

- ✅ Solution: Add `pb-28` to MobileContent

**Issue: Content not scrolling**

- ✅ Solution: Use MobileContent wrapper (handles overflow)

**Issue: Header not sticky**

- ✅ Solution: Use MobileHeader (already has sticky positioning)

**Issue: Safe areas not working on iOS**

- ✅ Solution: Check viewport meta tag in HTML

**Issue: Buttons too small on mobile**

- ✅ Solution: Use min-height-44 (or h-11+)

## Resources

- [Mobile Implementation Guide](./MOBILE_IMPLEMENTATION_GUIDE.md)
- [Tailwind CSS Docs](https://tailwindcss.com)
- [React Hooks Docs](https://react.dev/reference/react)
- [Lucide Icons](https://lucide.dev)

## Support

For questions or issues, check:

1. This quick start guide
2. Mobile Implementation Guide
3. Component source code comments
4. Example implementations in Panel.jsx files

Happy mobile building! 🎉
