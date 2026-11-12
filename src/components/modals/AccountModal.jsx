import React from 'react';
import { useTravel } from '../../context/TravelContext';

export default function AccountModal() {
  const { activeModal, closeModal, currentUser, currentAccount, trips, logoutUser } = useTravel();

  if (activeModal !== 'account') return null;

  const displayName = currentAccount?.name || (currentUser ? currentUser.split('@')[0] : 'Guest User');
  const userBookingsCount = trips.filter(
    (t) => (!t.userEmail || t.userEmail.toLowerCase() === currentUser?.toLowerCase()) && t.status !== 'cancelled'
  ).length;

  const memberSince = currentAccount?.createdAt
    ? new Date(currentAccount.createdAt).toLocaleDateString('en-IN', {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
      })
    : '2026';

  const handleGoToTrips = () => {
    closeModal();
    setTimeout(() => {
      document.getElementById('mytrips')?.scrollIntoView({ behavior: 'smooth' });
    }, 250);
  };

  return (
    <div className="custom-modal-backdrop" onClick={closeModal}>
      <div className="custom-modal-dialog" onClick={(e) => e.stopPropagation()}>
        <div className="custom-modal-header">
          <h5 className="modal-title mb-0">
            <i className="fa-solid fa-circle-user me-2 text-primary"></i>
            My Account
          </h5>
          <button type="button" className="btn-close" onClick={closeModal}></button>
        </div>

        <div className="custom-modal-body">
          <div className="text-center mb-4">
            <div
              className="mx-auto mb-3 rounded-circle d-flex align-items-center justify-content-center bg-primary text-white"
              style={{ width: '76px', height: '76px', fontSize: '2rem' }}
            >
              <i className="fa-solid fa-user"></i>
            </div>
            <h4 className="mb-1">{displayName}</h4>
            <p className="text-muted mb-0">{currentUser}</p>
          </div>

          <div className="row g-3">
            <div className="col-6">
              <div className="card-soft p-3 text-center">
                <small className="text-muted">Member Since</small>
                <div className="fw-bold mt-1">{memberSince}</div>
              </div>
            </div>
            <div className="col-6">
              <div className="card-soft p-3 text-center">
                <small className="text-muted">Active Bookings</small>
                <div className="fw-bold mt-1">{userBookingsCount}</div>
              </div>
            </div>
          </div>

          <div className="card-soft p-3 mt-3">
            <div className="d-flex justify-content-between mb-2">
              <span className="text-muted">Account Status</span>
              <span className="badge bg-success">Active</span>
            </div>
            <div className="d-flex justify-content-between">
              <span className="text-muted">TravelEase Member</span>
              <i className="fa-solid fa-check text-success"></i>
            </div>
          </div>

          <button
            type="button"
            className="btn btn-outline-primary w-100 mt-3"
            onClick={handleGoToTrips}
          >
            <i className="fa-solid fa-suitcase me-2"></i>
            View My Trips
          </button>

          <button
            type="button"
            className="btn btn-danger w-100 mt-2"
            onClick={logoutUser}
          >
            <i className="fa-solid fa-right-from-bracket me-2"></i>
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
