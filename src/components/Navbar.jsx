import React from 'react';
import { useTravel } from '../context/TravelContext';

export default function Navbar({ onSwitchToPortal }) {
  const { currentUser, currentAccount, openModal, logoutUser } = useTravel();

  const displayName = currentAccount?.name || (currentUser ? currentUser.split('@')[0] : '');

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleLogout = () => {
    logoutUser();
    if (onSwitchToPortal) {
      onSwitchToPortal();
    }
  };

  return (
    <nav className="navbar navbar-expand-lg fixed-top">
      <div className="container">
        <a className="navbar-brand" href="#home" onClick={(e) => { e.preventDefault(); scrollTo('home'); }}>
          <i className="fa-solid fa-plane-departure me-2"></i>
          Travel<span>Ease</span>
        </a>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navMenu"
          aria-controls="navMenu"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navMenu">
          <ul className="navbar-nav mx-auto">
            <li className="nav-item">
              <span className="nav-link" onClick={() => scrollTo('home')}>Home</span>
            </li>
            <li className="nav-item">
              <span className="nav-link" onClick={() => scrollTo('modules')}>Modules</span>
            </li>
            <li className="nav-item">
              <span className="nav-link" onClick={() => scrollTo('booking')}>Flights</span>
            </li>
            <li className="nav-item">
              <span className="nav-link" onClick={() => scrollTo('trainResultsSection')}>Trains</span>
            </li>
            <li className="nav-item">
              <span className="nav-link" onClick={() => scrollTo('hotels')}>Hotels</span>
            </li>
            <li className="nav-item">
              <span className="nav-link" onClick={() => scrollTo('cabs')}>Cabs</span>
            </li>
            <li className="nav-item">
              <span className="nav-link" onClick={() => scrollTo('mytrips')}>My Trips</span>
            </li>
            <li className="nav-item">
              <span className="nav-link" onClick={() => scrollTo('offers')}>Offers</span>
            </li>
            <li className="nav-item">
              <span className="nav-link" onClick={() => scrollTo('contact')}>Contact</span>
            </li>
          </ul>

          <div className="d-flex gap-2 align-items-center">
            {currentUser ? (
              <>
                <button
                  type="button"
                  className="btn btn-outline-primary"
                  onClick={() => openModal('account')}
                >
                  <i className="fa-solid fa-circle-user me-1"></i>
                  {displayName}
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={handleLogout}
                  title="Logout and return to Login Portal"
                >
                  <i className="fa-solid fa-right-from-bracket me-1"></i>
                  Logout
                </button>
              </>
            ) : (
              <>
                <button
                  type="button"
                  className="btn btn-outline-primary"
                  onClick={onSwitchToPortal || (() => openModal('login'))}
                >
                  <i className="fa-solid fa-arrow-left me-1"></i>
                  Login Portal
                </button>
              </>
            )}

            <button
              type="button"
              className="btn btn-outline-dark btn-sm"
              onClick={() => openModal('adminLogin')}
            >
              <i className="fa-solid fa-shield-halved me-1"></i>
              Admin
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
