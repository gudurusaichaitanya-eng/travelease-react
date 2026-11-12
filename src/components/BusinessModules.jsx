import React from 'react';
import { useTravel } from '../context/TravelContext';

export default function BusinessModules() {
  const { openModal } = useTravel();

  const scrollToBooking = () => {
    document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="modules" className="bg-white">
      <div className="container">
        <h2 className="section-title">TravelEase Business Modules</h2>
        <p className="section-sub">Two role-based modules for a complete travel booking system</p>
        <div className="row g-4">
          <div className="col-md-6">
            <div className="module-choice h-100">
              <div className="d-flex align-items-center gap-3 mb-3">
                <div className="trip-icon bg-primary">
                  <i className="fa-solid fa-user"></i>
                </div>
                <div>
                  <h5 className="mb-1">User Module</h5>
                  <span className="badge bg-success">Active</span>
                </div>
              </div>
              <p className="text-muted">
                Signup and Login, search flights and trains, hotels, cabs, compare fares, make
                payments, receive confirmations, manage My Trips and cancel bookings.
              </p>
              <button
                type="button"
                className="btn btn-outline-primary"
                onClick={scrollToBooking}
              >
                Explore User Services
              </button>
            </div>
          </div>

          <div className="col-md-6">
            <div className="module-choice h-100">
              <div className="d-flex align-items-center gap-3 mb-3">
                <div className="trip-icon" style={{ background: '#0f2342' }}>
                  <i className="fa-solid fa-shield-halved"></i>
                </div>
                <div>
                  <h5 className="mb-1">Admin Module</h5>
                  <span className="badge bg-success">Active</span>
                </div>
              </div>
              <p className="text-muted">
                Secure admin login, dashboard analytics, registered user management, booking
                management, cancellation control and travel service monitoring.
              </p>
              <button
                type="button"
                className="btn btn-dark"
                onClick={() => openModal('adminLogin')}
              >
                <i className="fa-solid fa-gauge-high me-2"></i>
                Open Admin Module
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
