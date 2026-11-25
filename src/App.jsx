import React, { useState } from 'react';
import { useTravel } from './context/TravelContext';
import AuthPortal from './components/AuthPortal';
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
  const { currentUser, isAdminLoggedIn, logoutAdmin, openModal, isMaintenanceMode } = useTravel();
  const [isGuest, setIsGuest] = useState(false);

  // If user is neither logged in, nor admin, nor in guest mode: SHOW LOGIN/ADMIN PORTAL FIRST!
  const isAuthenticated = Boolean(currentUser || isAdminLoggedIn || isGuest);

  if (!isAuthenticated) {
    return (
      <div className="travel-app">
        <AuthPortal onContinueAsGuest={() => setIsGuest(true)} />
        <ToastContainer />
      </div>
    );
  }

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

      {/* ADMIN STATUS BANNER IF LOGGED IN AS ADMIN */}
      {isAdminLoggedIn && (
        <div
          className="bg-dark text-white py-2 px-3 fixed-top d-flex justify-content-between align-items-center"
          style={{ zIndex: 1070 }}
        >
          <div className="small">
            <span className="badge bg-danger me-2">ADMIN SESSION</span>
            <span>Signed in as <strong>admin@travelease.com</strong></span>
          </div>
          <div className="d-flex gap-2">
            <button
              type="button"
              className="btn btn-primary btn-sm py-0"
              onClick={() => openModal('adminDashboard')}
            >
              <i className="fa-solid fa-gauge-high me-1"></i> Open Admin Dashboard
            </button>
            <button
              type="button"
              className="btn btn-outline-light btn-sm py-0"
              onClick={logoutAdmin}
            >
              <i className="fa-solid fa-right-from-bracket me-1"></i> Logout Admin
            </button>
          </div>
        </div>
      )}

      {/* NAVBAR */}
      <div style={{ marginTop: isAdminLoggedIn ? '40px' : '0' }}>
        <Navbar onSwitchToPortal={() => setIsGuest(false)} />
      </div>

      {/* MAIN CONTENT (SHOWN ONLY AFTER LOGIN) */}
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
