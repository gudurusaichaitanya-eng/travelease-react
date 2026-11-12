import React from 'react';
import { useTravel } from '../../context/TravelContext';
import { formatCurrency } from '../../data/mockData';

export default function DetailsModal() {
  const { activeModal, closeModal, modalData, startBooking, hotelCriteria } = useTravel();

  if (activeModal !== 'hotelDetails' && activeModal !== 'tripDetails') return null;

  // --- HOTEL DETAILS ---
  if (activeModal === 'hotelDetails') {
    const h = modalData;
    if (!h) return null;

    const getNights = () => {
      const a = hotelCriteria.checkIn;
      const b = hotelCriteria.checkOut;
      if (!a || !b) return 1;
      return Math.max(1, Math.ceil((new Date(b) - new Date(a)) / 86400000));
    };

    const handleBookHotel = () => {
      const nights = getNights();
      const rooms = parseInt(hotelCriteria.rooms, 10) || 1;
      const total = h.price * nights * rooms;

      closeModal();
      startBooking({
        type: 'hotel',
        service: `Hotel - ${h.name}`,
        details: `${h.location} | ${nights} night(s), ${rooms} room(s)`,
        amount: total,
        hotelName: h.name,
        location: h.location,
        pricePerNight: h.price,
        checkIn: hotelCriteria.checkIn,
        checkOut: hotelCriteria.checkOut,
        guests: hotelCriteria.guests,
        rooms: hotelCriteria.rooms,
        nights: nights
      });
    };

    return (
      <div className="custom-modal-backdrop" onClick={closeModal}>
        <div className="custom-modal-dialog modal-lg" onClick={(e) => e.stopPropagation()}>
          <div className="custom-modal-header border-0 pb-0">
            <h5 className="modal-title mb-0">Hotel Details</h5>
            <button type="button" className="btn-close" onClick={closeModal}></button>
          </div>

          <div className="custom-modal-body">
            <div
              className="position-relative rounded-4 overflow-hidden mb-4"
              style={{ height: '260px' }}
            >
              <img
                src={h.img}
                alt={h.name}
                className="w-100 h-100 object-fit-cover"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = `https://placehold.co/1000x650/0d6efd/ffffff?text=${encodeURIComponent(
                    h.name
                  )}`;
                }}
              />
              <span className="hotel-rating-pill">
                {h.rating}.0 ★ · {(h.reviews || 0).toLocaleString('en-IN')} reviews
              </span>
            </div>

            <div className="row g-4">
              <div className="col-lg-8">
                <h3 className="mb-1">{h.name}</h3>
                <p className="text-muted">
                  <i className="fa-solid fa-location-dot me-1"></i>
                  {h.location}
                </p>
                <p className="mb-3">{h.description}</p>

                <h6 className="text-uppercase text-muted small fw-bold">Stay Highlights</h6>
                <div className="row g-2 mb-3">
                  {h.facilities.map((fac, idx) => (
                    <div key={idx} className="col-sm-6">
                      <div className="p-2 border rounded bg-light small">
                        <i className="fa-solid fa-check text-success me-2"></i>
                        {fac}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="row g-2 text-center">
                  <div className="col-4">
                    <div className="bg-light p-2 rounded">
                      <small className="text-muted d-block">Room</small>
                      <strong>{h.room}</strong>
                    </div>
                  </div>
                  <div className="col-4">
                    <div className="bg-light p-2 rounded">
                      <small className="text-muted d-block">Size</small>
                      <strong>{h.size}</strong>
                    </div>
                  </div>
                  <div className="col-4">
                    <div className="bg-light p-2 rounded">
                      <small className="text-muted d-block">Guests</small>
                      <strong>{h.guests}</strong>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-lg-4">
                <div className="p-3 rounded-4 border bg-light h-100 d-flex flex-column justify-content-between">
                  <div>
                    <small className="text-muted">Starting from</small>
                    <div className="price-tag fs-3">{formatCurrency(h.price)}</div>
                    <span className="text-muted small">per room / night</span>
                    <hr />
                    <div className="small mb-2">
                      <i className="fa-solid fa-shield-halved text-success me-2"></i>
                      Verified Property
                    </div>
                    <div className="small mb-3">
                      <i className="fa-solid fa-ban text-success me-2"></i>
                      Free cancellation policy
                    </div>
                  </div>

                  <button
                    type="button"
                    className="btn btn-primary-grad w-100"
                    onClick={handleBookHotel}
                  >
                    Book This Hotel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // --- TRIP DETAILS ---
  const t = modalData;
  if (!t) return null;

  return (
    <div className="custom-modal-backdrop" onClick={closeModal}>
      <div className="custom-modal-dialog modal-lg" onClick={(e) => e.stopPropagation()}>
        <div className="custom-modal-header">
          <h5 className="modal-title mb-0">
            <i className="fa-solid fa-circle-info text-primary me-2"></i>
            Booking Details — {t.id}
          </h5>
          <button type="button" className="btn-close" onClick={closeModal}></button>
        </div>

        <div className="custom-modal-body">
          <div className="row g-3">
            <div className="col-md-6">
              <div className="hotel-booking-details">
                <div className="hotel-detail-label">Booking ID</div>
                <div className="hotel-detail-value">{t.id}</div>
              </div>
            </div>

            <div className="col-md-6">
              <div className="hotel-booking-details">
                <div className="hotel-detail-label">Status</div>
                <div className="hotel-detail-value text-uppercase fw-bold text-success">
                  {t.status}
                </div>
              </div>
            </div>

            <div className="col-md-12">
              <div className="hotel-booking-details">
                <div className="hotel-detail-label">Service Description</div>
                <div className="hotel-detail-value">{t.title || t.service}</div>
              </div>
            </div>

            {t.type === 'hotel' && (
              <>
                <div className="col-md-6">
                  <div className="hotel-booking-details">
                    <div className="hotel-detail-label">Hotel</div>
                    <div className="hotel-detail-value">{t.hotelName || t.title}</div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="hotel-booking-details">
                    <div className="hotel-detail-label">Location</div>
                    <div className="hotel-detail-value">{t.location || '-'}</div>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="hotel-booking-details">
                    <div className="hotel-detail-label">Check-in</div>
                    <div className="hotel-detail-value">{t.checkIn || '-'}</div>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="hotel-booking-details">
                    <div className="hotel-detail-label">Check-out</div>
                    <div className="hotel-detail-value">{t.checkOut || '-'}</div>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="hotel-booking-details">
                    <div className="hotel-detail-label">Nights</div>
                    <div className="hotel-detail-value">{t.nights || 1}</div>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="hotel-booking-details">
                    <div className="hotel-detail-label">Rooms</div>
                    <div className="hotel-detail-value">{t.rooms || 1}</div>
                  </div>
                </div>
              </>
            )}

            {t.type === 'flight' && (
              <>
                <div className="col-md-6">
                  <div className="hotel-booking-details">
                    <div className="hotel-detail-label">Airline</div>
                    <div className="hotel-detail-value">
                      {t.airline || '-'} ({t.code || '-'})
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="hotel-booking-details">
                    <div className="hotel-detail-label">Route</div>
                    <div className="hotel-detail-value">{t.route || '-'}</div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="hotel-booking-details">
                    <div className="hotel-detail-label">Departure Date</div>
                    <div className="hotel-detail-value">{t.departure || '-'}</div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="hotel-booking-details">
                    <div className="hotel-detail-label">Return Date</div>
                    <div className="hotel-detail-value">{t.returnDate || '-'}</div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="hotel-booking-details">
                    <div className="hotel-detail-label">Class</div>
                    <div className="hotel-detail-value">{t.flightClass || 'Economy'}</div>
                  </div>
                </div>
              </>
            )}

            {t.type === 'train' && (
              <>
                <div className="col-md-6">
                  <div className="hotel-booking-details">
                    <div className="hotel-detail-label">Train</div>
                    <div className="hotel-detail-value">
                      {t.trainName || '-'} ({t.trainNumber || '-'})
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="hotel-booking-details">
                    <div className="hotel-detail-label">Route</div>
                    <div className="hotel-detail-value">{t.route || '-'}</div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="hotel-booking-details">
                    <div className="hotel-detail-label">Departure</div>
                    <div className="hotel-detail-value">{t.departure || '-'}</div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="hotel-booking-details">
                    <div className="hotel-detail-label">Arrival</div>
                    <div className="hotel-detail-value">{t.arrival || '-'}</div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="hotel-booking-details">
                    <div className="hotel-detail-label">Class</div>
                    <div className="hotel-detail-value">{t.trainClass || 'SL'}</div>
                  </div>
                </div>
              </>
            )}

            {t.type === 'cab' && (
              <>
                <div className="col-md-6">
                  <div className="hotel-booking-details">
                    <div className="hotel-detail-label">Cab Type</div>
                    <div className="hotel-detail-value">{t.cabType || '-'}</div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="hotel-booking-details">
                    <div className="hotel-detail-label">Route</div>
                    <div className="hotel-detail-value">{t.route || '-'}</div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="hotel-booking-details">
                    <div className="hotel-detail-label">Date</div>
                    <div className="hotel-detail-value">{t.cabDate || '-'}</div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="hotel-booking-details">
                    <div className="hotel-detail-label">Time</div>
                    <div className="hotel-detail-value">{t.cabTime || '-'}</div>
                  </div>
                </div>
              </>
            )}

            <div className="col-md-6">
              <div className="hotel-booking-details">
                <div className="hotel-detail-label">Payment Method</div>
                <div className="hotel-detail-value">{t.paymentMethod || 'Online'}</div>
              </div>
            </div>

            <div className="col-md-6">
              <div className="hotel-booking-details">
                <div className="hotel-detail-label">Total Amount Paid</div>
                <div className="hotel-detail-value text-primary fs-5">
                  {formatCurrency(t.amount)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
