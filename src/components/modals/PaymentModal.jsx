import React, { useState } from 'react';
import { useTravel } from '../../context/TravelContext';
import { formatCurrency } from '../../data/mockData';

export default function PaymentModal() {
  const { activeModal, closeModal, currentBooking, finalizePayment, showToast } = useTravel();

  const [paymentMethod, setPaymentMethod] = useState('Credit Card');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [upiTxnId, setUpiTxnId] = useState('');
  const [selectedBank, setSelectedBank] = useState('');

  if (activeModal !== 'payment') return null;

  const handleSubmit = (e) => {
    e.preventDefault();

    if (paymentMethod === 'Credit Card' || paymentMethod === 'Debit Card') {
      if (!cardNumber || !cardExpiry || !cardCvv) {
        showToast('Please fill in complete card details.', 'danger');
        return;
      }
    } else if (paymentMethod === 'UPI') {
      if (!upiTxnId.trim()) {
        showToast('Please enter demo UPI Transaction ID.', 'danger');
        return;
      }
    } else if (paymentMethod === 'Net Banking') {
      if (!selectedBank) {
        showToast('Please select your bank.', 'danger');
        return;
      }
    }

    finalizePayment(paymentMethod);
  };

  const isHotel = currentBooking.type === 'hotel';

  return (
    <div className="custom-modal-backdrop" onClick={closeModal}>
      <div className="custom-modal-dialog modal-lg" onClick={(e) => e.stopPropagation()}>
        <div className="custom-modal-header">
          <h5 className="modal-title mb-0">
            <i className="fa-solid fa-lock text-primary me-2"></i>
            Complete Payment
          </h5>
          <button type="button" className="btn-close" onClick={closeModal}></button>
        </div>

        <div className="custom-modal-body">
          {/* BOOKING SUMMARY */}
          <div className="card-soft p-3 mb-3">
            <h6 className="mb-3">
              <i className="fa-solid fa-receipt me-2"></i>Booking Summary
            </h6>

            <div className="d-flex justify-content-between mb-2">
              <span>Service:</span>
              <strong>{currentBooking.service || 'Travel Booking'}</strong>
            </div>

            <div className="d-flex justify-content-between mb-2">
              <span>Details:</span>
              <strong className="text-end ms-3">{currentBooking.details || '-'}</strong>
            </div>

            {isHotel && (
              <div className="hotel-booking-details mt-3">
                <h6 className="text-primary mb-2">
                  <i className="fa-solid fa-hotel me-2"></i>Hotel Booking Details
                </h6>
                <div className="row g-2">
                  <div className="col-md-6">
                    <div className="hotel-detail-item">
                      <div className="hotel-detail-label">Hotel</div>
                      <div className="hotel-detail-value">{currentBooking.hotelName}</div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="hotel-detail-item">
                      <div className="hotel-detail-label">Location</div>
                      <div className="hotel-detail-value">{currentBooking.location}</div>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="hotel-detail-item">
                      <div className="hotel-detail-label">Check-in</div>
                      <div className="hotel-detail-value">{currentBooking.checkIn}</div>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="hotel-detail-item">
                      <div className="hotel-detail-label">Check-out</div>
                      <div className="hotel-detail-value">{currentBooking.checkOut}</div>
                    </div>
                  </div>
                  <div className="col-md-2">
                    <div className="hotel-detail-item">
                      <div className="hotel-detail-label">Nights</div>
                      <div className="hotel-detail-value">{currentBooking.nights}</div>
                    </div>
                  </div>
                  <div className="col-md-2">
                    <div className="hotel-detail-item">
                      <div className="hotel-detail-label">Guests</div>
                      <div className="hotel-detail-value">{currentBooking.guests}</div>
                    </div>
                  </div>
                  <div className="col-md-2">
                    <div className="hotel-detail-item">
                      <div className="hotel-detail-label">Rooms</div>
                      <div className="hotel-detail-value">{currentBooking.rooms}</div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="hotel-detail-item">
                      <div className="hotel-detail-label">Price / Room / Night</div>
                      <div className="hotel-detail-value">
                        {formatCurrency(currentBooking.pricePerNight)}
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="hotel-detail-item">
                      <div className="hotel-detail-label">Total Cost</div>
                      <div className="hotel-detail-value text-primary">
                        {formatCurrency(currentBooking.amount)}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="d-flex justify-content-between mt-3 pt-3 border-top" style={{ fontSize: '1.1rem' }}>
              <span>Total Amount:</span>
              <strong className="text-primary fs-5">
                {formatCurrency(currentBooking.amount)}
              </strong>
            </div>
          </div>

          {/* PAYMENT METHODS SELECTOR */}
          <label className="form-label">Select Payment Method</label>
          <div className="row g-2 mb-3">
            {['Credit Card', 'Debit Card', 'UPI', 'Net Banking'].map((m) => (
              <div key={m} className="col-6 col-md-3">
                <div
                  className={`pay-method ${paymentMethod === m ? 'selected' : ''}`}
                  onClick={() => setPaymentMethod(m)}
                >
                  <i
                    className={`fa-solid ${
                      m === 'Credit Card'
                        ? 'fa-credit-card'
                        : m === 'Debit Card'
                        ? 'fa-regular fa-credit-card'
                        : m === 'UPI'
                        ? 'fa-qrcode'
                        : 'fa-building-columns'
                    }`}
                  ></i>
                  <small>{m === 'UPI' ? 'UPI QR' : m}</small>
                </div>
              </div>
            ))}
          </div>

          <form onSubmit={handleSubmit}>
            {/* CARD FORM */}
            {(paymentMethod === 'Credit Card' || paymentMethod === 'Debit Card') && (
              <div>
                <div className="mb-2">
                  <label className="form-label">Card Number</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="1234 5678 9012 3456"
                    maxLength={19}
                    required
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                  />
                </div>
                <div className="row g-2 mb-2">
                  <div className="col-6">
                    <label className="form-label">Expiry (MM/YY)</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="12/28"
                      maxLength={5}
                      required
                      value={cardExpiry}
                      onChange={(e) => setCardExpiry(e.target.value)}
                    />
                  </div>
                  <div className="col-6">
                    <label className="form-label">CVV</label>
                    <input
                      type="password"
                      className="form-control"
                      placeholder="***"
                      maxLength={3}
                      required
                      value={cardCvv}
                      onChange={(e) => setCardCvv(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* UPI FORM */}
            {paymentMethod === 'UPI' && (
              <div className="upi-box">
                <h6>
                  <i className="fa-solid fa-mobile-screen-button text-primary me-2"></i>
                  Scan & Pay with Any UPI App
                </h6>
                <p className="small text-muted mb-2">
                  Scan via Google Pay, PhonePe, Paytm or BHIM UPI
                </p>

                {/* SVG SIMULATED QR CODE */}
                <div className="d-flex justify-content-center my-3">
                  <div
                    style={{
                      background: '#fff',
                      padding: '12px',
                      borderRadius: '12px',
                      border: '2px solid #e2e8f0',
                      display: 'inline-block'
                    }}
                  >
                    <svg width="150" height="150" viewBox="0 0 100 100">
                      {/* Outer borders and positioning boxes */}
                      <rect width="100" height="100" fill="#ffffff" />
                      <rect x="5" y="5" width="28" height="28" fill="#1b2a41" />
                      <rect x="9" y="9" width="20" height="20" fill="#ffffff" />
                      <rect x="13" y="13" width="12" height="12" fill="#0d6efd" />

                      <rect x="67" y="5" width="28" height="28" fill="#1b2a41" />
                      <rect x="71" y="9" width="20" height="20" fill="#ffffff" />
                      <rect x="75" y="13" width="12" height="12" fill="#0d6efd" />

                      <rect x="5" y="67" width="28" height="28" fill="#1b2a41" />
                      <rect x="9" y="71" width="20" height="20" fill="#ffffff" />
                      <rect x="13" y="75" width="12" height="12" fill="#0d6efd" />

                      {/* Random aesthetic QR data blocks */}
                      <rect x="38" y="10" width="6" height="6" fill="#1b2a41" />
                      <rect x="50" y="10" width="8" height="6" fill="#1b2a41" />
                      <rect x="42" y="22" width="6" height="12" fill="#1b2a41" />
                      <rect x="10" y="38" width="6" height="18" fill="#1b2a41" />
                      <rect x="22" y="44" width="12" height="6" fill="#1b2a41" />
                      <rect x="38" y="38" width="24" height="24" fill="#0d6efd" rx="4" />
                      <circle cx="50" cy="50" r="6" fill="#ffffff" />
                      <rect x="68" y="38" width="10" height="6" fill="#1b2a41" />
                      <rect x="84" y="44" width="8" height="14" fill="#1b2a41" />
                      <rect x="38" y="68" width="8" height="18" fill="#1b2a41" />
                      <rect x="52" y="74" width="16" height="8" fill="#1b2a41" />
                      <rect x="74" y="70" width="18" height="18" fill="#1b2a41" />
                    </svg>
                  </div>
                </div>

                <div className="fw-semibold">
                  UPI ID: <span className="text-primary">travelease@upi</span>
                </div>
                <div className="small text-muted mt-1">
                  Amount: <strong>{formatCurrency(currentBooking.amount)}</strong>
                </div>

                <div className="mt-3 text-start">
                  <label className="form-label">UPI Reference / Transaction ID</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="e.g. UPI12349876"
                    required
                    value={upiTxnId}
                    onChange={(e) => setUpiTxnId(e.target.value)}
                  />
                </div>
              </div>
            )}

            {/* NET BANKING FORM */}
            {paymentMethod === 'Net Banking' && (
              <div>
                <label className="form-label">Select Bank</label>
                <select
                  className="form-select"
                  required
                  value={selectedBank}
                  onChange={(e) => setSelectedBank(e.target.value)}
                >
                  <option value="">Choose Bank...</option>
                  <option value="State Bank of India">State Bank of India</option>
                  <option value="HDFC Bank">HDFC Bank</option>
                  <option value="ICICI Bank">ICICI Bank</option>
                  <option value="Axis Bank">Axis Bank</option>
                  <option value="Kotak Mahindra Bank">Kotak Mahindra Bank</option>
                </select>
              </div>
            )}

            <button type="submit" className="btn btn-accent w-100 mt-4 py-2">
              <i className="fa-solid fa-lock me-2"></i> Pay {formatCurrency(currentBooking.amount)} Now
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
