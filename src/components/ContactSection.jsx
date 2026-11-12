import React from 'react';

export default function ContactSection() {
  return (
    <section id="contact" className="bg-white">
      <div className="container">
        <h2 className="section-title">Contact Us</h2>
        <p className="section-sub">We're here to help, 24/7</p>
        <div className="row g-4">
          <div className="col-md-4">
            <div className="card-soft p-4 text-center h-100">
              <i className="fa-solid fa-phone fa-2x text-primary mb-3"></i>
              <h5>Call Us</h5>
              <p className="text-muted mb-0">+91 98765 43210</p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card-soft p-4 text-center h-100">
              <i className="fa-solid fa-envelope fa-2x text-primary mb-3"></i>
              <h5>Email Us</h5>
              <p className="text-muted mb-0">support@travelease.com</p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card-soft p-4 text-center h-100">
              <i className="fa-solid fa-location-dot fa-2x text-primary mb-3"></i>
              <h5>Visit Us</h5>
              <p className="text-muted mb-0">MG Road, Bengaluru, India</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
