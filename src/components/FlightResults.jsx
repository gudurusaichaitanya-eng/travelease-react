import React, { useState } from 'react';
import { useTravel } from '../context/TravelContext';
import { formatCurrency } from '../data/mockData';

export default function FlightResults() {
  const { flights, flightCriteria, startBooking } = useTravel();
  const [sortBy, setSortBy] = useState('price');

  const sortedFlights = [...flights].sort((a, b) => {
    if (sortBy === 'price') return a.price - b.price;
    if (sortBy === 'departure') return a.dep.localeCompare(b.dep);
    if (sortBy === 'duration') return parseInt(a.duration) - parseInt(b.duration);
    return 0;
  });

  const handleBook = (flight) => {
    const passengerCount = parseInt(flightCriteria.passengers, 10) || 1;
    const total = flight.price * passengerCount;

    startBooking({
      type: 'flight',
      service: `${flight.airline} ${flight.code}`,
      details: `${flight.from} → ${flight.to} | Dep: ${flightCriteria.departDate} | ${flightCriteria.passengers} | ${flightCriteria.flightClass}`,
      amount: total,
      airline: flight.airline,
      code: flight.code,
      route: `${flight.from} → ${flight.to}`,
      departure: flightCriteria.departDate,
      returnDate: flightCriteria.isRoundTrip ? flightCriteria.returnDate : '-',
      passengers: flightCriteria.passengers,
      flightClass: flightCriteria.flightClass,
      pricePerPassenger: flight.price
    });
  };

  return (
    <section id="flightResultsSection">
      <div className="container">
        <div className="d-flex justify-content-between align-items-end flex-wrap gap-2 mb-3">
          <div>
            <h2 className="section-title">Available Flights</h2>
            <p className="section-sub mb-0">Best fares for your route, updated live</p>
          </div>
          <select
            className="form-select w-auto"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="price">Sort by: Price (Low to High)</option>
            <option value="duration">Sort by: Duration</option>
            <option value="departure">Sort by: Departure Time</option>
          </select>
        </div>

        <div className="d-flex flex-column gap-3">
          {sortedFlights.map((f) => (
            <div key={f.id} className="card-soft flight-card">
              <div className="row align-items-center g-3">
                <div className="col-md-2 d-flex align-items-center gap-2">
                  <div className="airline-logo">
                    <i className="fa-solid fa-plane"></i>
                  </div>
                  <div>
                    <strong>{f.airline}</strong>
                    <br />
                    <small className="text-muted">{f.code}</small>
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="d-flex justify-content-between">
                    <div>
                      <div className="flight-route">{f.dep}</div>
                      <small className="text-muted">{f.from}</small>
                    </div>
                    <div className="text-center flex-grow-1 mx-3">
                      <small className="text-muted">{f.duration}</small>
                      <div className="flight-line"></div>
                      <span className="badge badge-stop">{f.stops}</span>
                    </div>
                    <div className="text-end">
                      <div className="flight-route">{f.arr}</div>
                      <small className="text-muted">{f.to}</small>
                    </div>
                  </div>
                </div>

                <div className="col-md-2 text-md-end">
                  <div className="price-tag">{formatCurrency(f.price)}</div>
                  <small className="text-muted">per passenger</small>
                </div>

                <div className="col-md-2">
                  <button
                    type="button"
                    className="btn btn-primary-grad w-100"
                    onClick={() => handleBook(f)}
                  >
                    Book Now
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
