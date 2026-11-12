import React from 'react';
import { useTravel } from '../context/TravelContext';
import { cabTypes, formatCurrency } from '../data/mockData';

export default function CabBooking() {
  const { cabCriteria, selectedCab, setSelectedCab, startBooking, showToast } = useTravel();

  const handleSelectCab = (c) => {
    const estimatedDistance = 12; // 12 km typical city run
    const fare = c.baseFare + estimatedDistance * c.perKm;
    setSelectedCab({ ...c, fare });
  };

  const handleBookCab = () => {
    if (!selectedCab) {
      showToast('Please select a cab category first.', 'warning');
      return;
    }

    startBooking({
      type: 'cab',
      service: `Cab - ${selectedCab.type}`,
      details: `${cabCriteria.pickupLoc} → ${cabCriteria.dropLoc}`,
      amount: selectedCab.fare,
      cabType: selectedCab.type,
      route: `${cabCriteria.pickupLoc} → ${cabCriteria.dropLoc}`,
      cabDate: cabCriteria.cabDate,
      cabTime: cabCriteria.cabTime
    });
  };

  return (
    <section id="cabs">
      <div className="container">
        <h2 className="section-title">Book a Cab</h2>
        <p className="section-sub">Choose your ride, estimated fare shown instantly</p>

        <div className="row g-3">
          {cabTypes.map((c) => {
            const isSelected = selectedCab?.type === c.type;
            return (
              <div key={c.type} className="col-md-3 col-6">
                <div
                  className={`card-soft cab-card ${isSelected ? 'selected' : ''}`}
                  onClick={() => handleSelectCab(c)}
                >
                  <i className={`fa-solid ${c.icon}`}></i>
                  <h5 className="mt-2 mb-0">{c.type}</h5>
                  <small className="text-muted">{c.capacity}</small>
                  <div className="mt-2 fw-semibold text-primary">
                    {formatCurrency(c.baseFare)} base
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-4">
          <h4>
            Estimated Fare:{' '}
            <span className="text-primary">
              {selectedCab ? formatCurrency(selectedCab.fare) : '₹0'}
            </span>
          </h4>
          <button
            type="button"
            className="btn btn-accent mt-2"
            onClick={handleBookCab}
          >
            <i className="fa-solid fa-taxi me-1"></i> Book Cab
          </button>
        </div>
      </div>
    </section>
  );
}
