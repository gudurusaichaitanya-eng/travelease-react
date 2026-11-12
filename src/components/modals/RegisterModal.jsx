import React, { useState } from 'react';
import { useTravel } from '../../context/TravelContext';

export default function RegisterModal() {
  const { activeModal, closeModal, openModal, registerUser, showToast } = useTravel();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  if (activeModal !== 'register') return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      showToast('Passwords do not match.', 'danger');
      return;
    }
    if (password.length < 6) {
      showToast('Password must be at least 6 characters.', 'danger');
      return;
    }

    const success = registerUser(name, email, password);
    if (success) {
      setName('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
    }
  };

  return (
    <div className="custom-modal-backdrop" onClick={closeModal}>
      <div className="custom-modal-dialog" onClick={(e) => e.stopPropagation()}>
        <div className="custom-modal-header">
          <h5 className="modal-title mb-0">Create Your Account</h5>
          <button type="button" className="btn-close" onClick={closeModal}></button>
        </div>

        <div className="custom-modal-body">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Full Name</label>
              <input
                type="text"
                className="form-control"
                value={name}
                required
                placeholder="e.g. Rahul Sharma"
                onChange={(e) => setName(e.target.value)}
              />
            </div>

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
                placeholder="Minimum 6 characters"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Confirm Password</label>
              <input
                type="password"
                className="form-control"
                value={confirmPassword}
                required
                placeholder="Re-type password"
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>

            <button type="submit" className="btn btn-primary-grad w-100">
              Register
            </button>
          </form>

          <div className="text-center mt-3">
            <small className="text-muted">
              Already have an account?{' '}
              <a
                href="#"
                className="text-primary fw-semibold"
                onClick={(e) => {
                  e.preventDefault();
                  openModal('login');
                }}
              >
                Login here
              </a>
            </small>
          </div>
        </div>
      </div>
    </div>
  );
}
