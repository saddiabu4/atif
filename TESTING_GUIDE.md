# 🧪 TESTING GUIDE - Shopir Transportation Platform

Quick testing checklist to demonstrate all features are working.

---

## 🚀 Quick Start Test (2 minutes)

### 1. Visit http://localhost:5173

You should see the role selection screen with 3 colored panels.

### 2. Test Admin Panel

- [ ] Click "Enter as Admin" → Admin Dashboard loads
- [ ] See 4 stat cards with metrics
- [ ] Click "Users" → Users list displays with 4 users
- [ ] Click "Block" on Mohammed Ali → Status changes to "blocked" ✓
- [ ] Click "Unblock" → Status changes back to "active" ✓
- [ ] Navigate to "Drivers" → See 4 drivers with verification status
- [ ] Click "Verify" on Omar Al-Shehri → Status changes to "verified" ✓
- [ ] Navigate to "Orders" → See 5 orders with different statuses
- [ ] Click "Payments" → See revenue data and "Export CSV" button
- [ ] Click "Settings" → See editable commission and tariff fields
- [ ] Click "Logout" → Back to role selection ✓

**Expected Time:** 2-3 minutes

---

## 🚙 Driver Panel Test (2 minutes)

### 1. Click "Enter as Driver"

Driver Dashboard loads for Saleh Al-Otaibi

### 2. Test Dashboard Features

- [ ] See toggle switch in top right
- [ ] Click toggle ON → "You are now online" notification ✓
- [ ] See earnings cards: Today (SAR 450), Month (SAR 8,250), Total (SAR 18,500)
- [ ] See rating card with 4.9★ and 187 reviews
- [ ] See verification status (all documents verified)

### 3. Test Orders Page

- [ ] Click "Orders" → See multiple orders
- [ ] See "Available Orders" section with yellow alert icon
- [ ] Click "Accept" on pending order → Order moves to active ✓
- [ ] Click "Mark as Complete" → Order marked completed ✓
- [ ] See completed orders in "Completed Orders" section
- [ ] Navigation works smoothly between pages

### 4. Test Other Pages

- [ ] Click "Earnings" → See earnings breakdown and statistics
- [ ] Click "Profile" → See personal info and vehicle details
- [ ] Click "Logout" → Back to role selection ✓

**Expected Time:** 2-3 minutes

---

## 👤 User Panel Test (2-3 minutes)

### 1. Click "Enter as User"

User Dashboard loads for Ahmed Hassan

### 2. Test Booking Flow

- [ ] Click "Book a Ride"
- [ ] Enter "Al Noor Tower, Riyadh" in pickup field
- [ ] Enter "King Fahd Road, Jeddah" in destination
- [ ] Click "Get Estimate" → Price appears: SAR 125.50, 45.2 km ✓
- [ ] See trip details (distance, duration, fare)
- [ ] Click "Confirm Booking" → Loading animation appears ✓
- [ ] See "Finding Your Driver" screen with spinner
- [ ] Click "Book Another Ride" → Returns to booking form ✓

### 3. Test Trip History

- [ ] Click "Trip History"
- [ ] See 4 past trips with different statuses:
  - 2 completed (green badge)
  - 1 active (blue badge)
  - 1 cancelled (red badge)
- [ ] See trip details (pickup, destination, fare, date)
- [ ] Click "Rate Trip" on any completed trip
- [ ] Modal appears with 5-star rating selector
- [ ] Click stars to select rating (e.g., 5 stars) ✓
- [ ] Click "Submit Rating" → Rating saves ✓
- [ ] Stars now display in trip card ✓

### 4. Test Profile

- [ ] Click "Profile"
- [ ] See user info: Ahmed Hassan, email, phone
- [ ] See metrics: 45 trips, 4.8★ rating, joined 2024
- [ ] Click "Edit Profile" → Form becomes editable
- [ ] Change a field (e.g., name)
- [ ] Click "Save Changes" → "Profile updated" notification ✓
- [ ] Click "Logout" → Back to role selection ✓

**Expected Time:** 3-4 minutes

---

## ✅ Feature Checklist

### Data Integrity

- [ ] Users can be blocked/unblocked
- [ ] Drivers can be verified
- [ ] Orders change status
- [ ] Payments are recorded
- [ ] Earnings accumulate
- [ ] Ratings are saved
- [ ] Profile changes persist (during session)

### UI/UX

- [ ] All buttons respond to clicks
- [ ] Toggles work (online/offline)
- [ ] Forms accept input
- [ ] Navigation works between pages
- [ ] Status badges update
- [ ] Toast notifications appear
- [ ] Modals open and close
- [ ] Loading states display

### Responsive Design

- [ ] [ ] Desktop (1920px) - Full sidebar, multi-column
- [ ] [ ] Tablet (768px) - 2-column layouts
- [ ] [ ] Mobile (375px) - Single column, full-width

_Test by resizing browser or using DevTools_

### Interactions

- [ ] Blocking a user works
- [ ] Verifying a driver works
- [ ] Accepting an order works
- [ ] Completing an order works
- [ ] Rating a trip works
- [ ] Editing profile works
- [ ] Exporting CSV works
- [ ] Online/offline toggle works

---

## 🎯 Investor Demo Script (5-7 minutes)

### Opening (30 seconds)

> "Welcome to Shopir - a transportation platform demo built with modern web technologies. This shows a complete system with three user roles: Admin for platform management, Drivers for ride acceptance and earnings, and Users for booking and managing trips."

### Admin Demo (2 minutes)

1. Open Admin Dashboard
2. "Here we can see the platform metrics - 324 orders, 42 active drivers, SAR 7,234 revenue"
3. Go to Users → "We can manage users - block problematic ones like this"
4. Click Block on Mohammed Ali
5. "We can also verify drivers in the Drivers page" → Click Drivers
6. Click Verify on pending driver
7. "All transactions are tracked here" → Show Payments
8. "And we can configure platform settings" → Show Settings

### Driver Demo (2 minutes)

1. Go to Driver Dashboard
2. "Drivers toggle online/offline status here" → Toggle switch
3. "We track their earnings in real-time" → Show earnings cards
4. "They can accept new ride requests" → Go to Orders
5. "Accept a pending order and complete it" → Demo the workflow
6. "Their ratings and documents are verified here" → Show Profile

### User Demo (2-3 minutes)

1. Go to User Booking
2. "Passengers enter their trip details and get a fare estimate"
3. Enter pickup and destination, get estimate
4. "They book the ride with one click"
5. "We keep full trip history with ratings"
6. Go to Trip History
7. "Passengers can rate completed trips" → Demo rating flow
8. "All their account information is here" → Show Profile

### Closing (30 seconds)

> "What you see is fully functional with realistic data and workflows. The entire platform runs in the browser with no backend needed for demo purposes. The code is clean, scalable, and ready to connect to a real API. We've built this in React with Tailwind CSS for a production-quality UI."

---

## 🐛 Troubleshooting

### Issue: Page doesn't load

- [ ] Check browser console (F12)
- [ ] Verify server is running (`npm run dev`)
- [ ] Check http://localhost:5173 is accessible
- [ ] Clear browser cache

### Issue: Data doesn't persist after refresh

- **Expected behavior:** Demo uses in-memory data. Refresh resets everything.
- **Fix:** This is normal for a frontend-only demo. In production, use a database.

### Issue: Buttons don't respond

- [ ] Check browser console for errors
- [ ] Make sure JavaScript is enabled
- [ ] Try a different browser
- [ ] Restart dev server

### Issue: Styles look broken

- [ ] Check that Tailwind CSS is loaded
- [ ] Clear browser cache
- [ ] Restart dev server: `npm run dev`

---

## 📊 Test Results Template

```
Date: December 31, 2025
Tester: [Your Name]
Browser: Chrome/Firefox/Safari
Device: Desktop/Tablet/Mobile

ADMIN PANEL:
  Dashboard: [ ] PASS [ ] FAIL
  Users: [ ] PASS [ ] FAIL
  Drivers: [ ] PASS [ ] FAIL
  Orders: [ ] PASS [ ] FAIL
  Payments: [ ] PASS [ ] FAIL
  Settings: [ ] PASS [ ] FAIL

DRIVER PANEL:
  Dashboard: [ ] PASS [ ] FAIL
  Orders: [ ] PASS [ ] FAIL
  Earnings: [ ] PASS [ ] FAIL
  Profile: [ ] PASS [ ] FAIL

USER PANEL:
  Booking: [ ] PASS [ ] FAIL
  History: [ ] PASS [ ] FAIL
  Profile: [ ] PASS [ ] FAIL

RESPONSIVE:
  Desktop: [ ] PASS [ ] FAIL
  Tablet: [ ] PASS [ ] FAIL
  Mobile: [ ] PASS [ ] FAIL

OVERALL: [ ] PASS [ ] FAIL

Notes: ___________________________________________
```

---

## ✨ Expected Results

### All Tests Should Pass ✓

- Every button click should produce a visible response
- Data changes should persist during the session
- Navigation should be smooth and instant
- Forms should accept input without errors
- Notifications should appear for user actions
- No console errors should occur
- Layout should adapt to screen size
- Animations should be smooth

### Performance

- Dashboard loads in < 1 second
- Navigation between pages is instant
- Forms respond immediately to input
- No lag or stuttering during interactions

---

**Happy Testing!** 🎉

For any issues, check `/src` for the code or `/src/lib/api.js` for the mock API implementation.
