import React, { useState } from 'react';
import { useTravel } from '../context/TravelContext';

export default function AuthPortal({ onContinueAsGuest }) {
  const [portalType, setPortalType] = useState('user'); // 'user' | 'admin'
  const [authMode, setAuthMode] = useState('login'); // 'login' | 'register'

  // User fields
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [userConfirmPassword, setUserConfirmPassword] = useState('');

  // Admin fields
  const [adminEmail, setAdminEmail] = useState('admin@travelease.com');
  const [adminPassword, setAdminPassword] = useState('admin123');

  const { loginUser, registerUser, loginAdmin, showToast } = useTravel();

  const handleUserSubmit = (e) => {
    e.preventDefault();
    if (authMode === 'login') {
      if (!userEmail || !userPassword) {
        showToast('Please enter your email and password.', 'danger');
        return;
      }
      loginUser(userEmail, userPassword);
    } else {
      if (!userName || !userEmail || !userPassword) {
        showToast('Please fill in all registration fields.', 'danger');
        return;
      }
      if (userPassword !== userConfirmPassword) {
        showToast('Passwords do not match.', 'danger');
        return;
      }
      if (userPassword.length < 6) {
        showToast('Password must be at least 6 characters.', 'danger');
        return;
      }
      registerUser(userName, userEmail, userPassword);
    }
  };

  const handleQuickDemoLogin = () => {
    loginUser('demo.user@travelease.com', 'demo123');
  };

  const handleAdminSubmit = (e) => {
    e.preventDefault();
    if (!adminEmail || !adminPassword) {
      showToast('Please enter admin credentials.', 'danger');
      return;
    }
    loginAdmin(adminEmail, adminPassword);
  };

  return (
    <div className="auth-portal-wrapper">
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-lg-6 col-md-8 col-sm-11">
            <div className="card-soft portal-card overflow-hidden">
              {/* BRAND HEADER */}
              <div className="portal-header text-center p-4">
                <div className="portal-logo mx-auto mb-2">
                  <i className="fa-solid fa-plane-departure"></i>
                </div>
                <h3 className="fw-bold mb-1">
                  Travel<span style={{ color: 'var(--accent)' }}>Ease</span> Portal
                </h3>
                <p className="text-muted small mb-0">
                  Please log in to your account or access the Admin portal to view live travel data.
                </p>
              </div>

              {/* ROLE TOGGLE TABS */}
              <div className="portal-tabs d-flex border-top border-bottom">
                <button
                  type="button"
                  className={`portal-tab-btn flex-fill py-3 ${portalType === 'user' ? 'active' : ''}`}
                  onClick={() => setPortalType('user')}
                >
                  <i className="fa-solid fa-user me-2"></i>User Portal
                </button>
                <button
                  type="button"
                  className={`portal-tab-btn flex-fill py-3 ${portalType === 'admin' ? 'active' : ''}`}
                  onClick={() => setPortalType('admin')}
                >
                  <i className="fa-solid fa-shield-halved me-2"></i>Admin Portal
                </button>
              </div>

              {/* USER PORTAL CONTENT */}
              {portalType === 'user' && (
                <div className="p-4">
                  <div className="d-flex justify-content-center mb-3">
                    <div className="btn-group w-100" role="group">
                      <button
                        type="button"
                        className={`btn btn-sm ${authMode === 'login' ? 'btn-primary' : 'btn-outline-primary'}`}
                        onClick={() => setAuthMode('login')}
                      >
                        Sign In
                      </button>
                      <button
                        type="button"
                        className={`btn btn-sm ${authMode === 'register' ? 'btn-primary' : 'btn-outline-primary'}`}
                        onClick={() => setAuthMode('register')}
                      >
                        Create Account
                      </button>
                    </div>
                  </div>

                  <form onSubmit={handleUserSubmit}>
                    {authMode === 'register' && (
                      <div className="mb-3">
                        <label className="form-label">Full Name</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="e.g. Rahul Sharma"
                          value={userName}
                          onChange={(e) => setUserName(e.target.value)}
                          required
                        />
                      </div>
                    )}

                    <div className="mb-3">
                      <label className="form-label">Email Address</label>
                      <input
                        type="email"
                        className="form-control"
                        placeholder="name@example.com"
                        value={userEmail}
                        onChange={(e) => setUserEmail(e.target.value)}
                        required
                      />
                    </div>

                    <div className="mb-3">
                      <label className="form-label">Password</label>
                      <input
                        type="password"
                        className="form-control"
                        placeholder="Enter password"
                        value={userPassword}
                        onChange={(e) => setUserPassword(e.target.value)}
                        required
                        minLength={6}
                      />
                    </div>

                    {authMode === 'register' && (
                      <div className="mb-3">
                        <label className="form-label">Confirm Password</label>
                        <input
                          type="password"
                          className="form-control"
                          placeholder="Re-enter password"
                          value={userConfirmPassword}
                          onChange={(e) => setUserConfirmPassword(e.target.value)}
                          required
                        />
                      </div>
                    )}

                    <button type="submit" className="btn btn-primary-grad w-100 py-2 mt-2">
                      <i className={`fa-solid ${authMode === 'login' ? 'fa-right-to-bracket' : 'fa-user-plus'} me-2`}></i>
                      {authMode === 'login' ? 'Login to View Travel Data' : 'Register & Enter'}
                    </button>
                  </form>

                  {/* QUICK DEMO USER BUTTON */}
                  <div className="mt-3 pt-3 border-top text-center">
                    <button
                      type="button"
                      className="btn btn-outline-secondary btn-sm w-100 mb-2"
                      onClick={handleQuickDemoLogin}
                    >
                      <i className="fa-solid fa-bolt text-warning me-1"></i> Quick Demo User Login
                    </button>
                    {onContinueAsGuest && (
                      <button
                        type="button"
                        className="btn btn-link btn-sm text-muted text-decoration-none"
                        onClick={onContinueAsGuest}
                      >
                        or preview portal as guest &rarr;
                      </button>
                    )}
                  </div>
                </div>
              )}

              {/* ADMIN PORTAL CONTENT */}
              {portalType === 'admin' && (
                <div className="p-4">
                  <div className="alert alert-info py-2 small mb-3">
                    <strong><i className="fa-solid fa-circle-info me-1"></i> Admin Credentials</strong>
                    <br />
                    Email: <code>admin@travelease.com</code> | Password: <code>admin123</code>
                  </div>

                  <form onSubmit={handleAdminSubmit}>
                    <div className="mb-3">
                      <label className="form-label">Admin Email</label>
                      <input
                        type="email"
                        className="form-control"
                        value={adminEmail}
                        onChange={(e) => setAdminEmail(e.target.value)}
                        required
                      />
                    </div>

                    <div className="mb-3">
                      <label className="form-label">Admin Password</label>
                      <input
                        type="password"
                        className="form-control"
                        value={adminPassword}
                        onChange={(e) => setAdminPassword(e.target.value)}
                        required
                      />
                    </div>

                    <button type="submit" className="btn btn-dark w-100 py-2 mt-2">
                      <i className="fa-solid fa-gauge-high me-2"></i>
                      Login to Admin Dashboard
                    </button>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
