# SportsTurf Pro - Multi-Sport Turf Booking System

A production-ready, full-featured turf booking system designed for multi-sport facilities with modern UI/UX, real-time availability, secure payment processing, and comprehensive admin management.

## Features

### Customer Features
- 🏟️ **Multi-Sport Support** - Cricket, Football, Box Cricket, and more
- 📅 **Real-Time Availability** - Live slot checking and booking
- 💳 **Secure Payments** - Razorpay integration with test/live modes
- 📱 **WhatsApp Confirmation** - Automatic booking confirmations
- 📧 **Email Notifications** - Professional booking receipts
- 🎯 **Modern UI/UX** - Responsive design with smooth animations

### Admin Features
- 🔐 **Secure Admin Panel** - Hidden authentication route
- 📊 **Real-Time Dashboard** - Booking statistics and revenue tracking
- 🚫 **Slot Management** - Block specific time slots or entire dates
- 🔍 **Advanced Search** - Filter bookings by phone, date, or ID
- 📈 **Analytics** - Revenue insights and booking patterns

## Tech Stack

- **Frontend**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS + Shadcn/UI + Framer Motion
- **Backend**: Express.js + Firebase Firestore
- **Authentication**: Firebase Auth
- **Payments**: Razorpay
- **Notifications**: EmailJS + WhatsApp Integration

## Quick Start

### 1. Clone and Install
```bash
git clone https://github.com/yourusername/turf-booking-system.git
cd turf-booking-system
npm install
```

### 2. Environment Setup
Copy `.env.example` to `.env` and configure:

```env
# Firebase Configuration
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_APP_ID=your_app_id

# Razorpay (Optional for test mode)
VITE_RAZORPAY_KEY_ID=your_razorpay_key

# EmailJS (Optional)
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key

# WhatsApp (Optional)
VITE_WHATSAPP_NUMBER=919876543210
```

### 3. Firebase Setup
1. Create a Firebase project at [console.firebase.google.com](https://console.firebase.google.com)
2. Enable Firestore Database and Authentication
3. Add web app and copy configuration to `.env`
4. Deploy Firestore rules: `firebase deploy --only firestore:rules`

### 4. Run Development Server
```bash
npm run dev
```

Visit `http://localhost:5000` for the booking system and `/admin-access-sptp2024` for admin panel.

## Project Structure

```
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # UI components
│   │   ├── pages/          # Route pages
│   │   ├── hooks/          # Custom hooks
│   │   ├── lib/            # Utilities and integrations
│   │   └── types/          # TypeScript types
├── server/                 # Express backend
├── shared/                 # Shared schemas and types
├── firebase.json          # Firebase configuration
├── firestore.rules        # Database security rules
└── documentation/         # Setup guides
```

## Admin Access

- **URL**: `/admin-access-sptp2024` (hidden route)
- **Authentication**: Firebase email/password
- **Features**: Real-time dashboard, slot management, booking search

## Payment Integration

### Test Mode (Default)
- No Razorpay keys required
- 2-second payment simulation
- Perfect for development and demos

### Live Mode
- Add `VITE_RAZORPAY_KEY_ID` to `.env`
- Automatic switch to live payments
- Real transaction processing

## WhatsApp Integration

Automatic customer confirmations sent via WhatsApp:
- Professional booking receipt format
- Sent to customer's mobile number
- No manual intervention required

## Deployment

### Firebase Hosting (Recommended)
```bash
npm run build
firebase deploy
```

### Vercel/Netlify
1. Connect your GitHub repository
2. Set environment variables
3. Deploy with build command: `npm run build`

## Configuration Files

- **Firebase**: `firebase.json`, `firestore.rules`
- **Admin Setup**: `admin-setup-steps.md`
- **Payment Setup**: `demo-booking.md`
- **WhatsApp Setup**: `whatsapp-setup-guide.md`

## Security

- ✅ Firestore security rules implemented
- ✅ Admin authentication required
- ✅ Hidden admin routes
- ✅ Environment variable protection
- ✅ Input validation and sanitization

## Support

For setup assistance or customization, refer to:
- `firebase-setup-guide.md` - Complete Firebase configuration
- `admin-setup-steps.md` - Admin user creation
- `whatsapp-setup-guide.md` - WhatsApp integration

## License

MIT License - feel free to use for commercial projects.

---

**SportsTurf Pro** - Built with ❤️ for modern turf facilities