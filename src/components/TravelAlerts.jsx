import React from 'react';

export default function TravelAlerts() {
  return (
    <section className="pt-4 pb-0">
      <div className="container">
        <h2 className="section-title">Travel Alerts</h2>
        <p className="section-sub">Live updates on your bookings</p>
        <div className="row g-3">
          <div className="col-md-4">
            <div className="alert-travel alert-info-c">
              <i className="fa-solid fa-circle-info me-2"></i>
              <strong>Gate Change:</strong> Flight VGA-202 now departs from Gate 14B.
            </div>
          </div>
          <div className="col-md-4">
            <div className="alert-travel alert-warning-c">
              <i className="fa-solid fa-triangle-exclamation me-2"></i>
              <strong>Flight Delay:</strong> 6E-345 delayed by 40 minutes due to weather.
            </div>
          </div>
          <div className="col-md-4">
            <div className="alert-travel alert-success-c">
              <i className="fa-solid fa-circle-check me-2"></i>
              <strong>Hotel Confirmed:</strong> Taj Exotica booking confirmed for 3 nights.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
