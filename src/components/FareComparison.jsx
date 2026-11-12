import React from 'react';
import { useTravel } from '../context/TravelContext';
import { compareData } from '../data/mockData';

export default function FareComparison() {
  const { startBooking } = useTravel();

  const handleBookCompare = (row) => {
    const numericAmount = parseInt(row.price.replace(/[^\d]/g, ''), 10) || 2500;
    startBooking({
      type: 'comparison',
      service: `${row.provider} - ${row.service}`,
      details: `Duration: ${row.duration} | Cancellation: ${row.cancel}`,
      amount: numericAmount
    });
  };

  return (
    <section className="bg-white">
      <div className="container">
        <h2 className="section-title">Compare Fares</h2>
        <p className="section-sub">Choose the best option across providers</p>
        <div className="table-responsive">
          <table className="table table-compare card-soft mb-0">
            <thead>
              <tr>
                <th>Provider</th>
                <th>Service</th>
                <th>Price</th>
                <th>Rating</th>
                <th>Duration</th>
                <th>Cancellation</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {compareData.map((r, i) => (
                <tr key={i}>
                  <td>
                    <strong>{r.provider}</strong>
                  </td>
                  <td>{r.service}</td>
                  <td className="text-primary fw-semibold">{r.price}</td>
                  <td>{r.rating}</td>
                  <td>{r.duration}</td>
                  <td>{r.cancel}</td>
                  <td>
                    <button
                      type="button"
                      className="btn btn-sm btn-primary-grad"
                      onClick={() => handleBookCompare(r)}
                    >
                      Book Now
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
