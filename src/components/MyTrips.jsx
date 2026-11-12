import React from 'react';
import { useTravel } from '../context/TravelContext';

export default function MyTrips() {
  const { trips, currentUser, openModal, cancelTrip } = useTravel();

  const userTrips = currentUser
    ? trips.filter(
        (t) => !t.userEmail || t.userEmail.toLowerCase() === currentUser.toLowerCase()
      )
    : trips;

  const handleCancel = (trip) => {
    if (window.confirm(`Are you sure you want to cancel booking ${trip.id}?`)) {
      cancelTrip(trip.id);
    }
  };

  return (
    <section id="mytrips">
      <div className="container">
        <h2 className="section-title">My Trips</h2>
        <p className="section-sub">Your upcoming and past bookings</p>

        <div className="d-flex flex-column gap-3">
          {userTrips.length === 0 ? (
            <div className="card-soft p-4 text-center">
              <i className="fa-solid fa-suitcase-rolling fa-2x text-muted mb-2"></i>
              <h5>No trips to display</h5>
              <p className="text-muted mb-3">
                {currentUser
                  ? 'You have not booked any trips yet. Search flights, trains, or hotels above!'
                  : 'Please log in to view and manage your booked trips.'}
              </p>
              {!currentUser && (
                <button
                  type="button"
                  className="btn btn-primary-grad"
                  onClick={() => openModal('login')}
                >
                  Login Now
                </button>
              )}
            </div>
          ) : (
            userTrips.map((t) => {
              const statusClass =
                t.status === 'confirmed'
                  ? 'status-confirmed'
                  : t.status === 'pending'
                  ? 'status-pending'
                  : 'status-cancelled';

              return (
                <div key={t.id} className="trip-row card-soft">
                  <div className="trip-icon" style={{ background: t.color || '#0d6efd' }}>
                    <i className={`fa-solid ${t.icon || 'fa-suitcase'}`}></i>
                  </div>

                  <div className="flex-grow-1">
                    <h6 className="mb-1">{t.title}</h6>
                    <small className="text-muted">
                      Booking ID: <strong>{t.id}</strong> &nbsp;|&nbsp; {t.date}
                    </small>
                  </div>

                  <span className={`status-badge ${statusClass}`}>{t.status}</span>

                  <button
                    type="button"
                    className="btn btn-sm btn-outline-primary"
                    onClick={() => openModal('tripDetails', t)}
                  >
                    View Details
                  </button>

                  {t.status !== 'cancelled' && (
                    <button
                      type="button"
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => handleCancel(t)}
                    >
                      Cancel
                    </button>
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>
    </section>
  );
}
