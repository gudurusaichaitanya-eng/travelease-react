import React from 'react';
import { useTravel } from '../context/TravelContext';

export default function SpecialOffers() {
  const { showToast } = useTravel();

  const handleApplyOffer = (code) => {
    document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' });
    showToast(`Promo code ${code} applied! Search flights, trains, or hotels now.`, 'success');
  };

  return (
    <section id="offers" className="bg-white">
      <div className="container">
        <h2 className="section-title">Special Offers</h2>
        <p className="section-sub">Deals you don't want to miss</p>
        <div className="row g-4">
          <div className="col-md-3 col-sm-6">
            <div className="offer-card offer1">
              <i className="fa-solid fa-plane fa-2x mb-3"></i>
              <h4>20% OFF</h4>
              <p>On domestic flight bookings. Use code FLY20.</p>
              <button
                type="button"
                className="btn btn-light btn-sm fw-semibold"
                onClick={() => handleApplyOffer('FLY20')}
              >
                Book Now
              </button>
            </div>
          </div>

          <div className="col-md-3 col-sm-6">
            <div className="offer-card offer2">
              <i className="fa-solid fa-hotel fa-2x mb-3"></i>
              <h4>Weekend Deal</h4>
              <p>Flat 30% off on hotel stays this weekend.</p>
              <button
                type="button"
                className="btn btn-light btn-sm fw-semibold"
                onClick={() => handleApplyOffer('HOTEL30')}
              >
                Book Now
              </button>
            </div>
          </div>

          <div className="col-md-3 col-sm-6">
            <div className="offer-card offer3">
              <i className="fa-solid fa-taxi fa-2x mb-3"></i>
              <h4>Airport Transfer</h4>
              <p>Flat ₹99 off on your first airport cab ride.</p>
              <button
                type="button"
                className="btn btn-light btn-sm fw-semibold"
                onClick={() => handleApplyOffer('CAB99')}
              >
                Book Now
              </button>
            </div>
          </div>

          <div className="col-md-3 col-sm-6">
            <div className="offer-card offer4">
              <i className="fa-solid fa-earth-asia fa-2x mb-3"></i>
              <h4>Go International</h4>
              <p>Save up to ₹8,000 on international flight packages.</p>
              <button
                type="button"
                className="btn btn-light btn-sm fw-semibold"
                onClick={() => handleApplyOffer('GLOBAL8K')}
              >
                Book Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
