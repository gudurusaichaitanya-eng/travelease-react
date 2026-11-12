import React, { useState } from 'react';
import { useTravel } from '../../context/TravelContext';

export default function AdminLoginModal() {
  const { activeModal, closeModal, loginAdmin, showToast } = useTravel();
  const [email, setEmail] = useState('admin@travelease.com');
  const [password, setPassword] = useState('admin123');

  if (activeModal !== 'adminLogin') return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      showToast('Please enter admin credentials.', 'danger');
      return;
    }
    loginAdmin(email, password);
  };

  return (
    <div className="custom-modal-backdrop" onClick={closeModal}>
      <div className="custom-modal-dialog" onClick={(e) => e.stopPropagation()}>
        <div className="custom-modal-header">
          <div>
            <h5 className="modal-title mb-0">
              <i className="fa-solid fa-user-shield text-primary me-2"></i>
              Admin Module
            </h5>
            <small className="text-muted">TravelEase Business Administration</small>
          </div>
          <button type="button" className="btn-close" onClick={closeModal}></button>
        </div>

        <div className="custom-modal-body">
          <div className="alert alert-info small">
            <strong>Demo Admin Credentials</strong>
            <br />
            Email: <code>admin@travelease.com</code> &nbsp; Password: <code>admin123</code>
            <br />
            <span className="text-muted">
              Pre-filled for your project review and testing.
            </span>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label fw-semibold">Admin Email</label>
              <input
                type="email"
                className="form-control"
                value={email}
                required
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <label className="form-label fw-semibold">Password</label>
              <input
                type="password"
                className="form-control"
                value={password}
                required
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button className="btn btn-primary-grad w-100" type="submit">
              <i className="fa-solid fa-right-to-bracket me-2"></i>
              Login to Admin Dashboard
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
