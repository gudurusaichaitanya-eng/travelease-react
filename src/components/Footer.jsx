import React from 'react';

export default function Footer() {
  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer>
      <div className="container">
        <div className="row g-4">
          <div className="col-md-3">
            <a className="navbar-brand text-white" href="#home" onClick={(e) => { e.preventDefault(); scrollTo('home'); }}>
              <i className="fa-solid fa-plane-departure me-2"></i>
              Travel<span className="text-warning">Ease</span>
            </a>
            <p className="mt-3">
              Your trusted partner for flights, trains, hotels and cabs — making travel simple,
              affordable and enjoyable across India.
            </p>
          </div>

          <div className="col-md-3">
            <h5>Quick Links</h5>
            <a href="#home" onClick={(e) => { e.preventDefault(); scrollTo('home'); }}>Home</a>
            <a href="#booking" onClick={(e) => { e.preventDefault(); scrollTo('booking'); }}>Flights</a>
            <a href="#trainResultsSection" onClick={(e) => { e.preventDefault(); scrollTo('trainResultsSection'); }}>Trains</a>
            <a href="#hotels" onClick={(e) => { e.preventDefault(); scrollTo('hotels'); }}>Hotels</a>
            <a href="#cabs" onClick={(e) => { e.preventDefault(); scrollTo('cabs'); }}>Cabs</a>
          </div>

          <div className="col-md-3">
            <h5>Services</h5>
            <a href="#mytrips" onClick={(e) => { e.preventDefault(); scrollTo('mytrips'); }}>My Trips</a>
            <a href="#offers" onClick={(e) => { e.preventDefault(); scrollTo('offers'); }}>Offers</a>
            <a href="#booking" onClick={(e) => { e.preventDefault(); scrollTo('booking'); }}>Travel Insurance</a>
            <a href="#booking" onClick={(e) => { e.preventDefault(); scrollTo('booking'); }}>Group Booking</a>
          </div>

          <div className="col-md-3">
            <h5>Support</h5>
            <a href="#contact" onClick={(e) => { e.preventDefault(); scrollTo('contact'); }}>Contact Us</a>
            <a href="#contact" onClick={(e) => { e.preventDefault(); scrollTo('contact'); }}>FAQs</a>
            <a href="#contact" onClick={(e) => { e.preventDefault(); scrollTo('contact'); }}>Cancellation Policy</a>
            <a href="#contact" onClick={(e) => { e.preventDefault(); scrollTo('contact'); }}>Terms & Conditions</a>
          </div>
        </div>

        <hr className="border-secondary mt-4" />
        <div className="d-flex flex-wrap justify-content-between align-items-center pt-2">
          <p className="mb-2 mb-md-0">&copy; {new Date().getFullYear()} TravelEase. All rights reserved.</p>
          <div className="d-flex">
            <a href="#home" className="social-icon" aria-label="Facebook">
              <i className="fa-brands fa-facebook-f"></i>
            </a>
            <a href="#home" className="social-icon" aria-label="Twitter">
              <i className="fa-brands fa-twitter"></i>
            </a>
            <a href="#home" className="social-icon" aria-label="Instagram">
              <i className="fa-brands fa-instagram"></i>
            </a>
            <a href="#home" className="social-icon" aria-label="LinkedIn">
              <i className="fa-brands fa-linkedin-in"></i>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
