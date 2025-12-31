# Driver Panel Responsive Design Guide

## Responsive Breakpoints & Layouts

### MOBILE (≤ 640px)

```
┌─────────────────────┐
│   Header            │ Fixed/Sticky
├─────────────────────┤
│                     │
│   Status Card       │ Stack: Vertical
│   Name + Toggle     │
│                     │
├─────────────────────┤
│   Trip Request      │ Full Width
│   (if available)    │
├─────────────────────┤
│   Earnings Cards    │ 2x2 Grid
│   Today/Week        │
│   Month/Total       │
├─────────────────────┤
│   Recent Trips      │ Single Column
│   List Items        │
│                     │
├─────────────────────┤
│ Bottom Navigation   │ Fixed Bottom
│ ┌─┐ ┌─┐ ┌─┐ ┌─┐   │
│ │H│ │O│ │E│ │P│   │
│ └─┘ └─┘ └─┘ └─┘   │
└─────────────────────┘

Features:
✓ Full screen width
✓ Vertical stacking
✓ Large touch buttons (44px)
✓ Bottom navigation
✓ Minimal scrolling
```

### TABLET (641px - 1024px)

```
┌─────────────────────────────┐
│   Header                    │ Sticky
├─────────────────────────────┤
│                             │
│  Status    │   Earnings     │ 2 Columns
│  Card      │   Cards (2x)   │
│            │                │
├─────────────────────────────┤
│                             │
│  Trip Request (Full Width)  │ Spans Both
│  (if available)             │
│                             │
├──────────────┬──────────────┤
│              │              │
│ Recent Trip  │ Recent Trip  │ 2 Columns
│ Card 1       │ Card 2       │
│              │              │
├──────────────┴──────────────┤
│ Bottom Navigation (Optional)│
└─────────────────────────────┘

Features:
✓ 2-column layouts
✓ Better use of horizontal space
✓ Reduced vertical scrolling
✓ Medium-sized cards
✓ Bottom nav optional
```

### DESKTOP (≥ 1025px)

```
┌────────────────────────────────────────────────────────────┐
│              Header                                        │
├──────────────────┬──────────────────────────────────────────┤
│                  │                                          │
│   SIDEBAR NAV    │        MAIN CONTENT AREA                │
│   ┌─────────┐    │                                          │
│   │ Bosh    │    │  ┌─────────────────────────────────┐   │
│   │ sahifa  │    │  │   Status Indicator              │   │
│   ├─────────┤    │  │   [Online Toggle]               │   │
│   │Buyurtma │    │  └─────────────────────────────────┘   │
│   │lar      │    │  ┌──────────┬──────────┬──────────┐    │
│   ├─────────┤    │  │ Today    │ Month    │ Total    │    │
│   │Daromad  │    │  │ Earnings │ Earnings │ Trips    │    │
│   ├─────────┤    │  └──────────┴──────────┴──────────┘    │
│   │Profil   │    │  ┌──────────────────────────────────┐   │
│   └─────────┘    │  │   Trip Request (if available)    │   │
│                  │  │   [Accept] [Reject]              │   │
│   (Scroll)       │  └──────────────────────────────────┘   │
│                  │  ┌──────────┬──────────┬──────────┐    │
│                  │  │ Trip 1   │ Trip 2   │ Trip 3   │    │
│                  │  │ Card     │ Card     │ Card     │    │
│                  │  └──────────┴──────────┴──────────┘    │
│                  │                                         │
│                  │              (Scroll)                   │
│                  │                                         │
└──────────────────┴──────────────────────────────────────────┘

Features:
✓ Sidebar navigation (16rem)
✓ 3-column grid system
✓ Dashboard-style layout
✓ Centered with max-width
✓ Hover effects on cards
✓ Professional spacing
```

## Visual Hierarchy

### Status Section (ALWAYS PROMINENT)

```
┌────────────────────────────┐
│ Status: [●]  Onlayn        │  Color-coded indicator
├────────────────────────────┤  (Green = Online)
│ Welcome, Olimov Salim      │  Driver name
│ [Toggle Button]            │  Large, easy to tap
└────────────────────────────┘
```

### Active Trip Request (STANDS OUT)

```
┌─────────────────────────────────────┐
│ ┃ 🚗 Yangi safar so'rovi!         │  Blue left border
├──────────────────────────────────────│  Gradient header
│ 65,000 so'm                          │  Large green price
├──────────────────────────────────────│
│ 📍 Olib ketish: Toshkent markazi    │  Clear directions
│ 🧭 Manzilagacha: Aeroport Terminal  │
│ 👤 Dilnoza • ⭐ 4.9 • 25 km         │  Passenger info
├──────────────────────────────────────│
│ [✓ Qabul qilish] [✕ Rad etish]     │  Action buttons
└──────────────────────────────────────┘
```

### Earnings Cards (EASY TO SCAN)

```
┌──────────────────────┐
│ Bugungi daromad      │  Label at top
│ 450,000 so'm         │  Large bold amount
│ ▮▮▮▮▮▮▮▮▮▮▮▮▮▮▮▮▮▮│  Progress indicator
└──────────────────────┘

Color Scheme:
🟣 Today     - Purple
🔵 Month     - Blue
🟠 Total     - Orange
```

### Trip Cards (CLEAR INFORMATION)

```
┌──────────────────────────────────────┐
│ Ahmed Al-Dosari         [In Progress]│  Name + Status
│ ⭐ 4.8                                │  Rating
├──────────────────────────────────────│
│ 📍 Olaya District                    │  Location
│ 🧭 King Fahd Road                    │
│ ⏱️  15 min                            │  Time estimate
├──────────────────────────────────────│
│ [Navigatsiya] [Qo'ng'iroq qiling]   │  Action buttons
└──────────────────────────────────────┘
```

## Color System

### Status Colors

- **Online**: #22c55e (Green-500) - Primary action
- **Offline**: #cbd5e1 (Slate-300) - Inactive
- **Active**: #2563eb (Blue-600) - Request/Trip

### Card Indicators

- **Purple**: Today's earnings
- **Blue**: This month's earnings
- **Orange**: Total trips
- **Green**: Accept/Positive action
- **Red**: Reject/Logout

### Text Colors

- **Primary**: #0f172a (Slate-900) - Headings
- **Secondary**: #475569 (Slate-600) - Descriptions
- **Tertiary**: #64748b (Slate-700) - Meta info
- **Muted**: #94a3b8 (Slate-400) - Disabled

## Typography Scale

### Mobile (≤640px)

- H1: 1.5rem (24px)
- H2: 1.25rem (20px)
- H3: 1.125rem (18px)
- Body: 0.875rem (14px)
- Caption: 0.75rem (12px)

### Tablet (641-1024px)

- H1: 1.875rem (30px)
- H2: 1.5rem (24px)
- H3: 1.25rem (20px)
- Body: 0.938rem (15px)
- Caption: 0.813rem (13px)

### Desktop (≥1025px)

- H1: 2rem (32px)
- H2: 1.75rem (28px)
- H3: 1.5rem (24px)
- Body: 1rem (16px)
- Caption: 0.875rem (14px)

## Spacing System

### Gaps Between Elements

- Mobile: 1rem (16px)
- Tablet: 1.25rem (20px)
- Desktop: 1.5rem (24px)

### Padding Inside Cards

- Mobile: 1rem (16px)
- Tablet: 1.5rem (24px)
- Desktop: 2rem (32px)

### Section Margins

- Mobile: 1rem (16px)
- Tablet: 1.5rem (24px)
- Desktop: 2rem (32px)

## Animation Guidelines

All animations are professional and purposeful:

### Fade-In

```
Duration: 0.4s
Easing: ease-out
Opacity: 0 → 1
Transform: translateY(8px) → translateY(0)
```

### Status Pulse (Online Only)

```
Duration: 2s
Easing: ease-in-out
Opacity: 1 → 0.7 → 1
Loop: None (subtle, not annoying)
```

### Card Hover (Desktop Only)

```
Duration: 0.3s
Transform: translateY(-2px)
Shadow: Low → Medium
```

## Responsive Grid System

### Mobile Grid

```
1 column
Full width cards
Stack vertically
Gap: 1rem
```

### Tablet Grid

```
2 columns
50/50 split
Gap: 1.25rem
Balanced layout
```

### Desktop Grid

```
3 columns (auto)
33/33/33 split (3 cards)
Or 2 columns (span layouts)
Gap: 1.5rem
Can span multiple columns
```

## Button Sizing

### Mobile

- Min height: 44px
- Min width: 44px
- Font size: 0.875rem
- Padding: 0.625rem 1rem

### Tablet

- Min height: 48px
- Min width: 48px
- Font size: 0.938rem
- Padding: 0.75rem 1.25rem

### Desktop

- Min height: 48px
- Min width: 48px
- Font size: 1rem
- Padding: 0.75rem 1.5rem

## Card Shadows

### Base Shadow (Always)

```
box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1)
```

### Hover Shadow (Desktop)

```
box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1)
Transition: 0.3s ease
```

### Focus Shadow (Accessibility)

```
outline: 2px solid #2563eb
outline-offset: 2px
```

## Accessibility Features

✓ Touch targets: 44px minimum
✓ Color contrast: WCAG AA standard
✓ Focus states: Visible outline
✓ Semantic HTML
✓ ARIA labels where needed
✓ Keyboard navigation
✓ No automatic audio/animation
✓ Text sizing: Scalable with user preferences
