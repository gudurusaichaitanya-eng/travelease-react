import React from 'react';
import { useTravel } from './context/TravelContext';
import Navbar from './components/Navbar';
import HeroSearch from './components/HeroSearch';
import TravelAlerts from './components/TravelAlerts';
import FlightResults from './components/FlightResults';
import TrainResults from './components/TrainResults';
import HotelResults from './components/HotelResults';
import CabBooking from './components/CabBooking';
import FareComparison from './components/FareComparison';
import PopularDestinations from './components/PopularDestinations';
import SpecialOffers from './components/SpecialOffers';
import BusinessModules from './components/BusinessModules';
import MyTrips from './components/MyTrips';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import ToastContainer from './components/ToastContainer';

// Modals
import LoginModal from './components/modals/LoginModal';
import RegisterModal from './components/modals/RegisterModal';
import AccountModal from './components/modals/AccountModal';
import AdminLoginModal from './components/modals/AdminLoginModal';
import AdminDashboardModal from './components/modals/AdminDashboardModal';
import PaymentModal from './components/modals/PaymentModal';
import ConfirmationModal from './components/modals/ConfirmationModal';
import DetailsModal from './components/modals/DetailsModal';

export default function App() {
  const { isMaintenanceMode } = useTravel();

  return (
    <div className="travel-app">
      {/* MAINTENANCE NOTICE */}
      {isMaintenanceMode && (
        <div
          className="alert alert-warning mb-0 text-center py-2 fixed-top"
          style={{ zIndex: 1060, top: '56px' }}
        >
          <i className="fa-solid fa-wrench me-2"></i>
          <strong>Notice:</strong> System is undergoing scheduled maintenance testing. Live
          bookings remain in simulated mode.
        </div>
      )}

      {/* NAVBAR */}
      <Navbar />

      {/* MAIN CONTENT */}
      <main>
        <HeroSearch />
        <TravelAlerts />
        <TrainResults />
        <FlightResults />
        <HotelResults />
        <CabBooking />
        <FareComparison />
        <PopularDestinations />
        <SpecialOffers />
        <BusinessModules />
        <MyTrips />
        <ContactSection />
      </main>

      {/* FOOTER */}
      <Footer />

      {/* MODAL DIALOGS */}
      <LoginModal />
      <RegisterModal />
      <AccountModal />
      <AdminLoginModal />
      <AdminDashboardModal />
      <PaymentModal />
      <ConfirmationModal />
      <DetailsModal />

      {/* TOAST NOTIFICATIONS */}
      <ToastContainer />
    </div>
  );
}
