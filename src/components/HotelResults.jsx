import React from 'react';
import { useTravel } from '../context/TravelContext';
import { formatCurrency } from '../data/mockData';

export default function HotelResults() {
  const { hotels, hotelCriteria, startBooking, openModal } = useTravel();

  const getNights = () => {
    const a = hotelCriteria.checkIn;
    const b = hotelCriteria.checkOut;
    if (!a || !b) return 1;
    return Math.max(1, Math.ceil((new Date(b) - new Date(a)) / 86400000));
  };

  const getRoomsCount = () => {
    return parseInt(hotelCriteria.rooms, 10) || 1;
  };

  const handleBook = (hotel) => {
    const nights = getNights();
    const rooms = getRoomsCount();
    const total = hotel.price * nights * rooms;

    startBooking({
      type: 'hotel',
      service: `Hotel - ${hotel.name}`,
      details: `${hotel.location} | ${nights} night(s), ${rooms} room(s)`,
      amount: total,
      hotelName: hotel.name,
      location: hotel.location,
      pricePerNight: hotel.price,
      checkIn: hotelCriteria.checkIn,
      checkOut: hotelCriteria.checkOut,
      guests: hotelCriteria.guests,
      rooms: hotelCriteria.rooms,
      nights: nights
    });
  };

  return (
    <section id="hotels" className="bg-white">
      <div className="container">
        <h2 className="section-title">Handpicked Hotels</h2>
        <p className="section-sub">Comfort and luxury for every budget</p>

        <div className="row g-4">
          {hotels.map((h, i) => {
            const stars = '★'.repeat(h.rating) + '☆'.repeat(5 - h.rating);
            return (
              <div key={i} className="col-md-6 col-xl-4">
                <div className="hotel-premium-card h-100">
                  <div className="hotel-image-wrap">
                    <img
                      src={h.img}
                      className="hotel-img"
                      alt={h.name}
                      loading="lazy"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = `https://placehold.co/1000x650/0d6efd/ffffff?text=${encodeURIComponent(
                          h.name
                        )}`;
                      }}
                    />
                    <span className="hotel-rating-pill">{h.rating}.0 ★</span>
                    <span className="hotel-deal-pill">Best Value</span>
                  </div>

                  <div className="p-4 d-flex flex-column h-100">
                    <div className="d-flex justify-content-between align-items-start gap-2">
                      <div>
                        <h5 className="mb-1">{h.name}</h5>
                        <p className="text-muted mb-1">
                          <i className="fa-solid fa-location-dot me-1"></i>
                          {h.location}
                        </p>
                      </div>
                    </div>

                    <div className="rating-stars mb-2">
                      {stars}{' '}
                      <span className="small text-muted">
                        ({(h.reviews || 0).toLocaleString('en-IN')} reviews)
                      </span>
                    </div>

                    <p className="hotel-description">{h.description}</p>

                    <div className="mb-3">
                      {h.facilities.slice(0, 5).map((fac, fIdx) => (
                        <span key={fIdx} className="facility-badge">
                          {fac}
                        </span>
                      ))}
                    </div>

                    <div className="hotel-meta-grid">
                      <span>
                        <i className="fa-solid fa-bed"></i> {h.room}
                      </span>
                      <span>
                        <i className="fa-solid fa-ruler-combined"></i> {h.size}
                      </span>
                      <span>
                        <i className="fa-solid fa-user-group"></i> {h.guests}
                      </span>
                      <span>
                        <i className="fa-solid fa-clock"></i> {h.checkin}
                      </span>
                    </div>

                    <div className="mt-auto pt-3 border-top">
                      <div className="d-flex justify-content-between align-items-end">
                        <div>
                          <small className="text-muted">From</small>
                          <div className="price-tag" style={{ fontSize: '1.35rem' }}>
                            {formatCurrency(h.price)}
                          </div>
                          <small className="text-muted">per room / night</small>
                        </div>
                        <span className="small text-success fw-semibold">
                          <i className="fa-solid fa-circle-check me-1"></i> Free Wi-Fi
                        </span>
                      </div>

                      <div className="d-flex gap-2 mt-3">
                        <button
                          type="button"
                          className="btn btn-outline-primary w-100"
                          onClick={() => openModal('hotelDetails', h)}
                        >
                          View Details
                        </button>
                        <button
                          type="button"
                          className="btn btn-primary-grad w-100"
                          onClick={() => handleBook(h)}
                        >
                          Book Now
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
