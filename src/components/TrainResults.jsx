import React, { useState } from 'react';
import { useTravel } from '../context/TravelContext';
import { formatCurrency } from '../data/mockData';

export default function TrainResults() {
  const { trains, trainCriteria, startBooking } = useTravel();
  const [sortBy, setSortBy] = useState('price');

  const sortedTrains = [...trains].sort((a, b) => {
    if (sortBy === 'price') return a.fare - b.fare;
    if (sortBy === 'departure') return a.dep.localeCompare(b.dep);
    if (sortBy === 'duration') return parseInt(a.duration) - parseInt(b.duration);
    return 0;
  });

  const handleBook = (t) => {
    const passengerCount = parseInt(trainCriteria.trainPassengers, 10) || 1;
    const total = t.fare * passengerCount;

    startBooking({
      type: 'train',
      service: `${t.name} (${t.number})`,
      details: `${t.from} → ${t.to} | Dep: ${t.dep} - ${t.arr} | ${trainCriteria.trainClass} | ${passengerCount} passenger(s)`,
      amount: total,
      trainName: t.name,
      trainNumber: t.number,
      route: `${t.from} → ${t.to}`,
      departure: t.dep,
      arrival: t.arr,
      duration: t.duration,
      journeyDate: trainCriteria.trainDate,
      trainClass: trainCriteria.trainClass,
      passengers: trainCriteria.trainPassengers,
      pricePerPassenger: t.fare
    });
  };

  return (
    <section id="trainResultsSection" className="bg-white">
      <div className="container">
        <div className="d-flex justify-content-between align-items-end flex-wrap gap-2 mb-3">
          <div>
            <h2 className="section-title mb-1">Available Trains</h2>
            <p className="section-sub mb-0">Comfortable rail journeys across India</p>
          </div>
          <select
            className="form-select w-auto"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="price">Sort by Price</option>
            <option value="departure">Sort by Departure</option>
            <option value="duration">Sort by Duration</option>
          </select>
        </div>

        <div className="d-flex flex-column gap-3">
          {sortedTrains.map((t) => (
            <div key={t.id} className="train-card">
              <div className="row align-items-center g-3">
                <div className="col-lg-2 d-flex align-items-center gap-2">
                  <div className="train-logo">
                    <i className="fa-solid fa-train"></i>
                  </div>
                  <div>
                    <strong>{t.name}</strong>
                    <br />
                    <small className="text-muted">{t.number}</small>
                  </div>
                </div>

                <div className="col-lg-5">
                  <div className="d-flex justify-content-between align-items-end">
                    <div>
                      <strong>{t.dep}</strong>
                      <br />
                      <span className="station-chip">{t.from}</span>
                    </div>
                    <div className="text-center flex-grow-1 mx-3">
                      <small className="text-muted">{t.duration}</small>
                      <div className="train-route-line my-2"></div>
                      <span className="quota-badge">Daily • Available</span>
                    </div>
                    <div className="text-end">
                      <strong>{t.arr}</strong>
                      <br />
                      <span className="station-chip">{t.to}</span>
                    </div>
                  </div>
                </div>

                <div className="col-lg-2">
                  <small className="text-muted d-block">Classes</small>
                  <strong>{t.class}</strong>
                  <div className="text-primary fw-bold mt-1">{formatCurrency(t.fare)}</div>
                  <small className="text-muted">starting fare / passenger</small>
                </div>

                <div className="col-lg-3">
                  <button
                    type="button"
                    className="btn btn-primary-grad w-100"
                    onClick={() => handleBook(t)}
                  >
                    <i className="fa-solid fa-ticket me-1"></i> Book Train
                  </button>
                  <small className="text-muted d-block text-center mt-2">
                    Verified availability • Fast booking
                  </small>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
