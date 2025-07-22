# SportsTurf Pro - Multi-Sport Turf Booking System

## Overview

SportsTurf Pro is a production-ready, full-featured turf booking system designed for multi-sport facilities. The application provides a modern, responsive web interface for customers to book sports slots with secure payment processing, while offering administrators a comprehensive dashboard for managing bookings and slot availability.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
The application uses a modern React-based single-page application (SPA) architecture:
- **React 18** with TypeScript for type safety and modern development
- **Vite** as the build tool for fast development and optimized production builds
- **Tailwind CSS** for utility-first styling with responsive design
- **Framer Motion** for smooth animations and transitions
- **Shadcn/UI** components for consistent, accessible UI elements
- **Wouter** for lightweight client-side routing

### Backend Architecture
The system follows a serverless/cloud-first approach:
- **Express.js** server primarily for development and static file serving
- **Firebase Firestore** as the primary database for all application data
- **Firebase Authentication** for secure admin access
- **Drizzle ORM** configured for potential database migration (currently uses Firestore)

### Payment Processing
- **Razorpay** integration for secure payment processing
- Support for both sandbox and production environments
- Real-time payment status tracking

### Communication Services
- **EmailJS** for automated email confirmations
- **WhatsApp integration** for instant booking confirmations and sharing

## Key Components

### Public-Facing Features
1. **Landing Page**: Modern, animated homepage with sport information and pricing
2. **Booking System**: Real-time slot availability with form validation
3. **Payment Integration**: Secure Razorpay payment processing with sandbox/live toggle
4. **Confirmation System**: Email and WhatsApp notifications with unique booking IDs
5. **Customer Confirmation**: Automatic WhatsApp confirmation sent to customer's mobile number

### Admin Features  
1. **Hidden Authentication**: Secure Firebase login via /admin-access-sptp2024 route
2. **Dashboard**: Real-time booking statistics with revenue tracking
3. **Slot Management**: Interactive modals to block specific time slots
4. **Date Blocking**: Full date blocking with reason tracking
5. **Search & Filter**: Advanced booking search by phone, date, or booking ID
6. **Data Export**: Download booking data for analysis (ready for implementation)

### Core Components
- **Navigation**: Responsive navigation with smooth scrolling
- **Sports Section**: Display available sports with pricing
- **Booking Form**: Multi-step form with real-time validation
- **Confirmation Flow**: Success page with sharing options
- **Admin Dashboard**: Comprehensive booking and slot management

## Data Flow

### Booking Process
1. User selects sport type and date
2. System fetches available slots from Firestore (excluding booked/blocked slots)
3. User fills booking form with validation
4. Payment processing through Razorpay
5. Booking data stored in Firestore with unique ID
6. Email confirmation sent via EmailJS
7. WhatsApp sharing option provided

### Admin Workflow
1. Admin authentication through Firebase Auth
2. Real-time booking data fetched from Firestore
3. Slot blocking/unblocking updates Firestore collections
4. Dashboard provides filtering and search capabilities

### Data Storage Structure
- **Bookings**: Customer booking information with payment status
- **Blocked Slots**: Admin-defined unavailable time slots
- **Blocked Dates**: Admin-defined unavailable entire dates
- **Users**: Admin user authentication data

## External Dependencies

### Firebase Services
- **Firestore**: Primary database with proper security rules for public/admin access
- **Authentication**: Admin user management with email/password login
- **Hosting**: Production deployment platform with automatic SSL

### Payment Processing
- **Razorpay**: Payment gateway with sandbox/live environment support
- **Real-time Processing**: Instant payment verification and booking confirmation

### Communication Services
- **EmailJS**: Email notification service for booking confirmations  
- **WhatsApp Integration**: Smart sharing with fallback to clipboard copy
- **Multi-platform Support**: Android/iOS deep links with web fallbacks

### Development Tools
- **Vite**: Build tool and development server
- **TypeScript**: Type safety and development experience
- **Tailwind CSS**: Styling framework
- **Framer Motion**: Animation library

## Deployment Strategy

### Production Setup
The application is designed for deployment on modern hosting platforms:
- **Frontend**: Static site deployment (Vercel, Netlify, or similar)
- **Backend**: Node.js hosting for the Express server (optional for static deployments)
- **Database**: Firebase Firestore (managed cloud database)
- **Authentication**: Firebase Auth (managed service)

### Environment Configuration
Production-ready environment variables:
- **Firebase**: API key, project ID, app ID for database and authentication  
- **Razorpay**: Key ID with sandbox/live toggle capability
- **EmailJS**: Service ID, template ID, and public key for notifications
- **WhatsApp**: Optional contact number for booking sharing
- **Hidden Admin Route**: /admin-access-sptp2024 for secure admin access

### Database Migration Path
The application includes Drizzle ORM configuration for potential migration to PostgreSQL:
- Current: Firebase Firestore (NoSQL)
- Future option: PostgreSQL with Drizzle ORM
- Schema definitions already established for easy migration

### Scaling Considerations
- Firebase Firestore provides automatic scaling
- Payment processing through Razorpay handles high transaction volumes
- Static frontend deployment ensures fast global delivery
- Component-based architecture allows for easy feature additions

The architecture prioritizes user experience with fast loading times, secure payments, and real-time data updates, while providing administrators with powerful management tools.