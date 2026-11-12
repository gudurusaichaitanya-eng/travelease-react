import React, { useState } from 'react';
import { useTravel } from '../../context/TravelContext';

export default function LoginModal() {
  const { activeModal, closeModal, openModal, loginUser, showToast } = useTravel();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  if (activeModal !== 'login') return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      showToast('Please fill in all fields.', 'danger');
      return;
    }
    const success = loginUser(email, password);
    if (success) {
      setEmail('');
      setPassword('');
    }
  };

  const handleForgotPassword = (e) => {
    e.preventDefault();
    const promptEmail = prompt('Enter your registered email:');
    if (promptEmail) {
      showToast(`Password reset link sent to ${promptEmail} (Demo).`, 'info');
    }
  };

  return (
    <div className="custom-modal-backdrop" onClick={closeModal}>
      <div className="custom-modal-dialog" onClick={(e) => e.stopPropagation()}>
        <div className="custom-modal-header">
          <h5 className="modal-title mb-0">Login to TravelEase</h5>
          <button type="button" className="btn-close" onClick={closeModal}></button>
        </div>

        <div className="custom-modal-body">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Email Address</label>
              <input
                type="email"
                className="form-control"
                value={email}
                required
                placeholder="name@example.com"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                value={password}
                required
                minLength={6}
                placeholder="Enter password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="d-flex justify-content-between align-items-center mb-3">
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="rememberMe"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                <label className="form-check-label" htmlFor="rememberMe">
                  Remember me
                </label>
              </div>
              <a href="#" className="small" onClick={handleForgotPassword}>
                Forgot password?
              </a>
            </div>

            <button type="submit" className="btn btn-primary-grad w-100">
              Login
            </button>
          </form>

          <div className="text-center mt-3">
            <small className="text-muted">
              Don't have an account?{' '}
              <a
                href="#"
                className="text-primary fw-semibold"
                onClick={(e) => {
                  e.preventDefault();
                  openModal('register');
                }}
              >
                Register here
              </a>
            </small>
          </div>
        </div>
      </div>
    </div>
  );
}
