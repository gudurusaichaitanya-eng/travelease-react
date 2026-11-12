import React from 'react';
import { useTravel } from '../../context/TravelContext';
import { formatCurrency } from '../../data/mockData';

export default function ConfirmationModal() {
  const { activeModal, closeModal, currentBooking, showToast } = useTravel();

  if (activeModal !== 'confirmation') return null;

  const handleDownloadTicket = () => {
    let text = `TRAVELEASE BOOKING TICKET\n`;
    text += `==============================================\n\n`;
    text += `Booking ID : ${currentBooking.id || 'TE-BK-999999'}\n`;
    text += `Customer   : ${currentBooking.userName || 'Valued Customer'}\n`;
    text += `Email      : ${currentBooking.userEmail || '-'}\n`;
    text += `Service    : ${currentBooking.title || currentBooking.service || '-'}\n`;
    text += `Date       : ${currentBooking.date || '-'}\n`;
    text += `Amount Paid: ${formatCurrency(currentBooking.amount)}\n`;
    text += `Payment    : ${currentBooking.paymentMethod || 'Online'}\n`;
    text += `Status     : CONFIRMED\n\n`;

    if (currentBooking.type === 'flight') {
      text += `FLIGHT PARTICULARS\n`;
      text += `----------------------------------------------\n`;
      text += `Airline    : ${currentBooking.airline || '-'} (${currentBooking.code || '-'})\n`;
      text += `Route      : ${currentBooking.route || '-'}\n`;
      text += `Departure  : ${currentBooking.departure || '-'}\n`;
      text += `Return     : ${currentBooking.returnDate || '-'}\n`;
      text += `Class      : ${currentBooking.flightClass || '-'}\n`;
      text += `Passengers : ${currentBooking.passengers || '-'}\n\n`;
    } else if (currentBooking.type === 'train') {
      text += `TRAIN PARTICULARS\n`;
      text += `----------------------------------------------\n`;
      text += `Train      : ${currentBooking.trainName || '-'} (${currentBooking.trainNumber || '-'})\n`;
      text += `Route      : ${currentBooking.route || '-'}\n`;
      text += `Departure  : ${currentBooking.departure || '-'}\n`;
      text += `Arrival    : ${currentBooking.arrival || '-'}\n`;
      text += `Class      : ${currentBooking.trainClass || '-'}\n`;
      text += `Passengers : ${currentBooking.passengers || '-'}\n\n`;
    } else if (currentBooking.type === 'hotel') {
      text += `HOTEL PARTICULARS\n`;
      text += `----------------------------------------------\n`;
      text += `Hotel      : ${currentBooking.hotelName || '-'}\n`;
      text += `Location   : ${currentBooking.location || '-'}\n`;
      text += `Check-in   : ${currentBooking.checkIn || '-'}\n`;
      text += `Check-out  : ${currentBooking.checkOut || '-'}\n`;
      text += `Rooms      : ${currentBooking.rooms || '-'}\n`;
      text += `Guests     : ${currentBooking.guests || '-'}\n\n`;
    } else if (currentBooking.type === 'cab') {
      text += `CAB PARTICULARS\n`;
      text += `----------------------------------------------\n`;
      text += `Vehicle    : ${currentBooking.cabType || '-'}\n`;
      text += `Route      : ${currentBooking.route || '-'}\n`;
      text += `Date/Time  : ${currentBooking.cabDate || '-'} at ${currentBooking.cabTime || '-'}\n\n`;
    }

    text += `==============================================\n`;
    text += `Thank you for booking with TravelEase!\n`;
    text += `Need assistance? Call +91 98765 43210 or email support@travelease.com\n`;

    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${currentBooking.id || 'TravelEase_Ticket'}.txt`;
    link.click();
    URL.revokeObjectURL(url);
    showToast('Ticket downloaded successfully!', 'success');
  };

  const handleGoToTrips = () => {
    closeModal();
    setTimeout(() => {
      document.getElementById('mytrips')?.scrollIntoView({ behavior: 'smooth' });
    }, 250);
  };

  return (
    <div className="custom-modal-backdrop" onClick={closeModal}>
      <div
        className="custom-modal-dialog text-center"
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: '480px' }}
      >
        <div className="custom-modal-body p-4">
          <i
            className="fa-solid fa-circle-check text-success"
            style={{ fontSize: '4.5rem' }}
          ></i>
          <h4 className="mt-3">Booking Confirmed!</h4>
          <p className="text-muted">Your booking has been successfully placed.</p>

          <div className="card-soft p-3 text-start my-3">
            <div className="d-flex justify-content-between mb-2">
              <span>Booking ID:</span>
              <strong>{currentBooking.id}</strong>
            </div>
            <div className="d-flex justify-content-between mb-2">
              <span>Service:</span>
              <strong>{currentBooking.title || currentBooking.service}</strong>
            </div>
            <div className="d-flex justify-content-between mb-2">
              <span>Date:</span>
              <strong>{currentBooking.date}</strong>
            </div>
            <div className="d-flex justify-content-between mb-2">
              <span>Amount Paid:</span>
              <strong>{formatCurrency(currentBooking.amount)}</strong>
            </div>
            <div className="d-flex justify-content-between">
              <span>Status:</span>
              <span className="status-badge status-confirmed">Confirmed</span>
            </div>
          </div>

          <div className="d-flex gap-2">
            <button
              type="button"
              className="btn btn-primary-grad w-100"
              onClick={handleDownloadTicket}
            >
              <i className="fa-solid fa-download me-1"></i> Download Ticket
            </button>
            <button
              type="button"
              className="btn btn-accent w-100"
              onClick={handleGoToTrips}
            >
              <i className="fa-solid fa-suitcase me-1"></i> Go to My Trips
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
