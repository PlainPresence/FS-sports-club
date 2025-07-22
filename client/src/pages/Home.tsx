import { useState } from 'react';
import Navigation from '@/components/Navigation';
import HeroSection from '@/components/HeroSection';
import SportsSection from '@/components/SportsSection';
import UpcomingSlots from '@/components/UpcomingSlots';
import BookingSection from '@/components/BookingSection';
import ConfirmationSection from '@/components/ConfirmationSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';

export default function Home() {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [bookingData, setBookingData] = useState(null);

  const handleBookingSuccess = (data: any) => {
    setBookingData(data);
    setShowConfirmation(true);
  };

  const handleBookAnother = () => {
    setShowConfirmation(false);
    setBookingData(null);
    const bookingSection = document.getElementById('booking');
    if (bookingSection) {
      bookingSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleBookNowClick = () => {
    const bookingSection = document.getElementById('booking');
    if (bookingSection) {
      bookingSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen">
      <Navigation />
      
      {showConfirmation && bookingData ? (
        <div className="pt-16">
          <ConfirmationSection 
            bookingData={bookingData} 
            onBookAnother={handleBookAnother} 
          />
        </div>
      ) : (
        <>
          <HeroSection onBookNowClick={handleBookNowClick} />
          <SportsSection />
          <UpcomingSlots />
          <BookingSection onBookingSuccess={handleBookingSuccess} />
          <ContactSection />
        </>
      )}
      
      <Footer />
    </div>
  );
}
