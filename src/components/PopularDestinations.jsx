import React from 'react';
import { useTravel } from '../context/TravelContext';
import { destinations, generateFlights } from '../data/mockData';

export default function PopularDestinations() {
  const { setFlightCriteria, setFlights, showToast } = useTravel();

  const handleExplore = (destName) => {
    setFlightCriteria((prev) => ({
      ...prev,
      fromCity: 'Delhi (DEL)',
      toCity: `${destName} (${destName.substring(0, 3).toUpperCase()})`
    }));
    const results = generateFlights('Delhi (DEL)', destName);
    setFlights(results);
    showToast(`Exploring flights to ${destName}!`, 'info');
    document.getElementById('flightResultsSection')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section>
      <div className="container">
        <h2 className="section-title">Popular Destinations</h2>
        <p className="section-sub">Where travelers are headed this season</p>
        <div className="row g-4">
          {destinations.map((d, i) => (
            <div key={i} className="col-md-3 col-sm-6">
              <div className="dest-card card-soft">
                <img
                  src={d.img}
                  alt={d.name}
                  loading="lazy"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = `https://placehold.co/900x600/0d6efd/ffffff?text=${encodeURIComponent(
                      d.name
                    )}`;
                  }}
                />
                <div className="dest-overlay">
                  <h5 className="mb-0">{d.name}</h5>
                  <small>Starting from {d.price}</small>
                  <button
                    type="button"
                    className="btn btn-sm btn-light mt-2 fw-semibold explore-btn"
                    onClick={() => handleExplore(d.name)}
                  >
                    Explore
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
