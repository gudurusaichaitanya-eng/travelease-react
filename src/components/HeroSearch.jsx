import React, { useState } from 'react';
import { useTravel } from '../context/TravelContext';
import {
  cityAirports,
  trainStations,
  generateFlights,
  generateTrains,
  cityInfo,
  stationInfo
} from '../data/mockData';

export default function HeroSearch() {
  const [activeTab, setActiveTab] = useState('flights');
  const {
    flightCriteria,
    setFlightCriteria,
    setFlights,
    trainCriteria,
    setTrainCriteria,
    setTrains,
    hotelCriteria,
    setHotelCriteria,
    cabCriteria,
    setCabCriteria,
    showToast
  } = useTravel();

  // --- FLIGHT FORM HANDLERS ---
  const handleSwapCities = () => {
    setFlightCriteria((prev) => ({
      ...prev,
      fromCity: prev.toCity,
      toCity: prev.fromCity
    }));
  };

  const handleFlightSubmit = (e) => {
    e.preventDefault();
    const from = flightCriteria.fromCity.trim().toLowerCase();
    const to = flightCriteria.toCity.trim().toLowerCase();

    if (from === to) {
      showToast('From and To cities cannot be the same.', 'danger');
      return;
    }
    if (flightCriteria.isRoundTrip && flightCriteria.returnDate < flightCriteria.departDate) {
      showToast('Return date cannot be before departure date.', 'danger');
      return;
    }

    const fromInfo = cityInfo(flightCriteria.fromCity);
    const toInfo = cityInfo(flightCriteria.toCity);

    if (
      !Object.values(cityAirports).includes(fromInfo.code) ||
      !Object.values(cityAirports).includes(toInfo.code)
    ) {
      showToast('Please select a supported airport/city from the suggestions.', 'danger');
      return;
    }

    const results = generateFlights(flightCriteria.fromCity, flightCriteria.toCity);
    setFlights(results);
    showToast('Showing available flights for your route.', 'success');
    document.getElementById('flightResultsSection')?.scrollIntoView({ behavior: 'smooth' });
  };

  // --- TRAIN FORM HANDLERS ---
  const handleSwapStations = () => {
    setTrainCriteria((prev) => ({
      ...prev,
      trainFrom: prev.trainTo,
      trainTo: prev.trainFrom
    }));
  };

  const handleTrainSubmit = (e) => {
    e.preventDefault();
    const a = stationInfo(trainCriteria.trainFrom);
    const b = stationInfo(trainCriteria.trainTo);

    if (a.code === b.code) {
      showToast('From and To stations cannot be the same.', 'danger');
      return;
    }
    if (
      !Object.values(trainStations).includes(a.code) ||
      !Object.values(trainStations).includes(b.code)
    ) {
      showToast('Please select a supported Indian railway station.', 'danger');
      return;
    }

    const results = generateTrains(trainCriteria.trainFrom, trainCriteria.trainTo);
    setTrains(results);
    showToast('Showing train options for your route.', 'success');
    document.getElementById('trainResultsSection')?.scrollIntoView({ behavior: 'smooth' });
  };

  // --- HOTEL FORM HANDLER ---
  const handleHotelSubmit = (e) => {
    e.preventDefault();
    if (hotelCriteria.checkOut <= hotelCriteria.checkIn) {
      showToast('Check-out date must be after check-in date.', 'danger');
      return;
    }
    showToast('Hotels updated for your destination and dates.', 'success');
    document.getElementById('hotels')?.scrollIntoView({ behavior: 'smooth' });
  };

  // --- CAB FORM HANDLER ---
  const handleCabSubmit = (e) => {
    e.preventDefault();
    showToast('Cab options updated for your route.', 'success');
    document.getElementById('cabs')?.scrollIntoView({ behavior: 'smooth' });
  };

  // --- ROUTE CHIP CLICK ---
  const selectFlightRoute = (from, to) => {
    setFlightCriteria((prev) => ({ ...prev, fromCity: from, toCity: to }));
    setActiveTab('flights');
    const results = generateFlights(from, to);
    setFlights(results);
    document.getElementById('flightResultsSection')?.scrollIntoView({ behavior: 'smooth' });
    showToast(`Showing flights from ${from} to ${to}`, 'info');
  };

  const selectTrainRoute = (from, to) => {
    setTrainCriteria((prev) => ({ ...prev, trainFrom: from, trainTo: to }));
    setActiveTab('trains');
    const results = generateTrains(from, to);
    setTrains(results);
    document.getElementById('trainResultsSection')?.scrollIntoView({ behavior: 'smooth' });
    showToast(`Showing trains from ${from} to ${to}`, 'info');
  };

  return (
    <>
      <header className="hero" id="home">
        <div className="container">
          <h1>Plan Your Journey With Ease</h1>
          <p>
            Search, compare and book <strong>flights, trains, hotels and cabs</strong> across India
            and beyond — all in one place.
          </p>

          <div className="search-widget" id="booking">
            {/* SEARCH TABS */}
            <div className="search-tabs">
              <div
                className={`search-tab ${activeTab === 'flights' ? 'active' : ''}`}
                onClick={() => setActiveTab('flights')}
              >
                <i className="fa-solid fa-plane"></i>
                <span> Flights</span>
              </div>
              <div
                className={`search-tab ${activeTab === 'trains' ? 'active' : ''}`}
                onClick={() => setActiveTab('trains')}
              >
                <i className="fa-solid fa-train"></i>
                <span> Trains</span>
              </div>
              <div
                className={`search-tab ${activeTab === 'hotels' ? 'active' : ''}`}
                onClick={() => setActiveTab('hotels')}
              >
                <i className="fa-solid fa-hotel"></i>
                <span> Hotels</span>
              </div>
              <div
                className={`search-tab ${activeTab === 'cabs' ? 'active' : ''}`}
                onClick={() => setActiveTab('cabs')}
              >
                <i className="fa-solid fa-taxi"></i>
                <span> Cabs</span>
              </div>
            </div>

            {/* FLIGHT SEARCH PANEL */}
            {activeTab === 'flights' && (
              <div className="search-panel">
                <div className="d-flex gap-4 mb-3">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="tripType"
                      id="oneWay"
                      checked={!flightCriteria.isRoundTrip}
                      onChange={() =>
                        setFlightCriteria((prev) => ({ ...prev, isRoundTrip: false }))
                      }
                    />
                    <label className="form-check-label" htmlFor="oneWay">
                      One Way
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="tripType"
                      id="roundTrip"
                      checked={flightCriteria.isRoundTrip}
                      onChange={() =>
                        setFlightCriteria((prev) => ({ ...prev, isRoundTrip: true }))
                      }
                    />
                    <label className="form-check-label" htmlFor="roundTrip">
                      Round Trip
                    </label>
                  </div>
                </div>

                <form onSubmit={handleFlightSubmit} className="row g-3 align-items-end">
                  <div className="col-md-3">
                    <label className="form-label">FROM</label>
                    <input
                      type="text"
                      className="form-control"
                      value={flightCriteria.fromCity}
                      list="cityList"
                      placeholder="e.g. Hyderabad (HYD)"
                      required
                      onChange={(e) =>
                        setFlightCriteria((prev) => ({ ...prev, fromCity: e.target.value }))
                      }
                    />
                  </div>
                  <div className="col-md-auto d-flex justify-content-center">
                    <button
                      type="button"
                      className="swap-btn"
                      onClick={handleSwapCities}
                      title="Swap Cities"
                    >
                      <i className="fa-solid fa-right-left"></i>
                    </button>
                  </div>
                  <div className="col-md-3">
                    <label className="form-label">TO</label>
                    <input
                      type="text"
                      className="form-control"
                      value={flightCriteria.toCity}
                      list="cityList"
                      placeholder="e.g. Goa (GOI)"
                      required
                      onChange={(e) =>
                        setFlightCriteria((prev) => ({ ...prev, toCity: e.target.value }))
                      }
                    />
                  </div>
                  <div className="col-md-2">
                    <label className="form-label">DEPARTURE</label>
                    <input
                      type="date"
                      className="form-control"
                      value={flightCriteria.departDate}
                      required
                      onChange={(e) =>
                        setFlightCriteria((prev) => ({ ...prev, departDate: e.target.value }))
                      }
                    />
                  </div>
                  <div className="col-md-2">
                    <label className="form-label">RETURN</label>
                    <input
                      type="date"
                      className="form-control"
                      value={flightCriteria.returnDate}
                      disabled={!flightCriteria.isRoundTrip}
                      required={flightCriteria.isRoundTrip}
                      onChange={(e) =>
                        setFlightCriteria((prev) => ({ ...prev, returnDate: e.target.value }))
                      }
                    />
                  </div>
                  <div className="col-md-2">
                    <label className="form-label">PASSENGERS</label>
                    <select
                      className="form-select"
                      value={flightCriteria.passengers}
                      onChange={(e) =>
                        setFlightCriteria((prev) => ({ ...prev, passengers: e.target.value }))
                      }
                    >
                      <option>1 Adult</option>
                      <option>2 Adults</option>
                      <option>3 Adults</option>
                      <option>2 Adults, 1 Child</option>
                      <option>4 Adults</option>
                    </select>
                  </div>
                  <div className="col-md-2">
                    <label className="form-label">CLASS</label>
                    <select
                      className="form-select"
                      value={flightCriteria.flightClass}
                      onChange={(e) =>
                        setFlightCriteria((prev) => ({ ...prev, flightClass: e.target.value }))
                      }
                    >
                      <option>Economy</option>
                      <option>Premium Economy</option>
                      <option>Business</option>
                      <option>First Class</option>
                    </select>
                  </div>
                  <div className="col-md-8"></div>
                  <div className="col-md-2">
                    <button type="submit" className="btn btn-primary-grad w-100">
                      <i className="fa-solid fa-magnifying-glass me-1"></i> Search Flights
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* TRAIN SEARCH PANEL */}
            {activeTab === 'trains' && (
              <div className="search-panel">
                <div className="train-search-note mb-3">
                  <i className="fa-solid fa-circle-info me-2"></i>
                  Search trains across major Indian Railways stations. Fast, safe and instant booking.
                </div>
                <form onSubmit={handleTrainSubmit} className="row g-3 align-items-end">
                  <div className="col-md-3">
                    <label className="form-label">FROM STATION</label>
                    <input
                      type="text"
                      className="form-control"
                      value={trainCriteria.trainFrom}
                      list="stationList"
                      placeholder="e.g. Vijayawada (BZA)"
                      required
                      onChange={(e) =>
                        setTrainCriteria((prev) => ({ ...prev, trainFrom: e.target.value }))
                      }
                    />
                  </div>
                  <div className="col-md-1 d-flex justify-content-center">
                    <button
                      type="button"
                      className="swap-btn"
                      onClick={handleSwapStations}
                      title="Swap Stations"
                    >
                      <i className="fa-solid fa-right-left"></i>
                    </button>
                  </div>
                  <div className="col-md-3">
                    <label className="form-label">TO STATION</label>
                    <input
                      type="text"
                      className="form-control"
                      value={trainCriteria.trainTo}
                      list="stationList"
                      placeholder="e.g. Hyderabad (HYB)"
                      required
                      onChange={(e) =>
                        setTrainCriteria((prev) => ({ ...prev, trainTo: e.target.value }))
                      }
                    />
                  </div>
                  <div className="col-md-2">
                    <label className="form-label">JOURNEY DATE</label>
                    <input
                      type="date"
                      className="form-control"
                      value={trainCriteria.trainDate}
                      required
                      onChange={(e) =>
                        setTrainCriteria((prev) => ({ ...prev, trainDate: e.target.value }))
                      }
                    />
                  </div>
                  <div className="col-md-1">
                    <label className="form-label">PASSENGERS</label>
                    <select
                      className="form-select"
                      value={trainCriteria.trainPassengers}
                      onChange={(e) =>
                        setTrainCriteria((prev) => ({ ...prev, trainPassengers: e.target.value }))
                      }
                    >
                      <option>1</option>
                      <option>2</option>
                      <option>3</option>
                      <option>4</option>
                      <option>5</option>
                      <option>6</option>
                    </select>
                  </div>
                  <div className="col-md-2">
                    <label className="form-label">CLASS</label>
                    <select
                      className="form-select"
                      value={trainCriteria.trainClass}
                      onChange={(e) =>
                        setTrainCriteria((prev) => ({ ...prev, trainClass: e.target.value }))
                      }
                    >
                      <option>Sleeper (SL)</option>
                      <option>AC 3 Tier (3A)</option>
                      <option>AC 2 Tier (2A)</option>
                      <option>AC First Class (1A)</option>
                      <option>Chair Car (CC)</option>
                      <option>Executive Chair Car (EC)</option>
                    </select>
                  </div>
                  <div className="col-md-10">
                    <small className="text-muted">
                      <i className="fa-solid fa-shield-halved me-1"></i>
                      Verified availability • Popular routes • Multiple classes
                    </small>
                  </div>
                  <div className="col-md-2">
                    <button type="submit" className="btn btn-primary-grad w-100">
                      <i className="fa-solid fa-magnifying-glass me-1"></i> Search Trains
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* HOTEL SEARCH PANEL */}
            {activeTab === 'hotels' && (
              <div className="search-panel">
                <form onSubmit={handleHotelSubmit} className="row g-3 align-items-end">
                  <div className="col-md-4">
                    <label className="form-label">DESTINATION</label>
                    <input
                      type="text"
                      className="form-control"
                      value={hotelCriteria.hotelCity}
                      required
                      onChange={(e) =>
                        setHotelCriteria((prev) => ({ ...prev, hotelCity: e.target.value }))
                      }
                    />
                  </div>
                  <div className="col-md-2">
                    <label className="form-label">CHECK-IN</label>
                    <input
                      type="date"
                      className="form-control"
                      value={hotelCriteria.checkIn}
                      required
                      onChange={(e) =>
                        setHotelCriteria((prev) => ({ ...prev, checkIn: e.target.value }))
                      }
                    />
                  </div>
                  <div className="col-md-2">
                    <label className="form-label">CHECK-OUT</label>
                    <input
                      type="date"
                      className="form-control"
                      value={hotelCriteria.checkOut}
                      required
                      onChange={(e) =>
                        setHotelCriteria((prev) => ({ ...prev, checkOut: e.target.value }))
                      }
                    />
                  </div>
                  <div className="col-md-2">
                    <label className="form-label">GUESTS</label>
                    <select
                      className="form-select"
                      value={hotelCriteria.guests}
                      onChange={(e) =>
                        setHotelCriteria((prev) => ({ ...prev, guests: e.target.value }))
                      }
                    >
                      <option>1 Guest</option>
                      <option>2 Guests</option>
                      <option>3 Guests</option>
                      <option>4 Guests</option>
                    </select>
                  </div>
                  <div className="col-md-2">
                    <label className="form-label">ROOMS</label>
                    <select
                      className="form-select"
                      value={hotelCriteria.rooms}
                      onChange={(e) =>
                        setHotelCriteria((prev) => ({ ...prev, rooms: e.target.value }))
                      }
                    >
                      <option>1 Room</option>
                      <option>2 Rooms</option>
                      <option>3 Rooms</option>
                    </select>
                  </div>
                  <div className="col-md-12">
                    <button type="submit" className="btn btn-primary-grad w-100">
                      <i className="fa-solid fa-magnifying-glass me-1"></i> Search Hotels
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* CAB SEARCH PANEL */}
            {activeTab === 'cabs' && (
              <div className="search-panel">
                <form onSubmit={handleCabSubmit} className="row g-3 align-items-end">
                  <div className="col-md-3">
                    <label className="form-label">PICKUP LOCATION</label>
                    <input
                      type="text"
                      className="form-control"
                      value={cabCriteria.pickupLoc}
                      required
                      onChange={(e) =>
                        setCabCriteria((prev) => ({ ...prev, pickupLoc: e.target.value }))
                      }
                    />
                  </div>
                  <div className="col-md-3">
                    <label className="form-label">DROP LOCATION</label>
                    <input
                      type="text"
                      className="form-control"
                      value={cabCriteria.dropLoc}
                      required
                      onChange={(e) =>
                        setCabCriteria((prev) => ({ ...prev, dropLoc: e.target.value }))
                      }
                    />
                  </div>
                  <div className="col-md-2">
                    <label className="form-label">DATE</label>
                    <input
                      type="date"
                      className="form-control"
                      value={cabCriteria.cabDate}
                      required
                      onChange={(e) =>
                        setCabCriteria((prev) => ({ ...prev, cabDate: e.target.value }))
                      }
                    />
                  </div>
                  <div className="col-md-2">
                    <label className="form-label">TIME</label>
                    <input
                      type="time"
                      className="form-control"
                      value={cabCriteria.cabTime}
                      required
                      onChange={(e) =>
                        setCabCriteria((prev) => ({ ...prev, cabTime: e.target.value }))
                      }
                    />
                  </div>
                  <div className="col-md-2">
                    <button type="submit" className="btn btn-primary-grad w-100">
                      <i className="fa-solid fa-magnifying-glass me-1"></i> Find Cabs
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* DATALISTS FOR AIRPORTS & STATIONS */}
      <datalist id="cityList">
        {Object.entries(cityAirports).map(([city, code]) => (
          <option key={code} value={`${city} (${code})`} />
        ))}
      </datalist>

      <datalist id="stationList">
        {Object.entries(trainStations).map(([station, code], idx) => (
          <option key={`${code}-${idx}`} value={`${station} (${code})`} />
        ))}
      </datalist>

      {/* POPULAR ROUTE STRIP */}
      <div className="popular-route-strip container mt-3 mb-4">
        <div className="route-strip-head">
          <span>
            <i className="fa-solid fa-bolt text-warning me-2"></i>
            Popular Routes
          </span>
          <small>One click to search</small>
        </div>
        <div className="route-chips">
          {/* Train Chips */}
          <button
            type="button"
            className="route-chip"
            onClick={() => selectTrainRoute('Vijayawada (BZA)', 'Hyderabad (HYB)')}
          >
            <i className="fa-solid fa-train me-1"></i> Vijayawada → Hyderabad
          </button>
          <button
            type="button"
            className="route-chip"
            onClick={() => selectTrainRoute('New Delhi (NDLS)', 'Varanasi (BSB)')}
          >
            <i className="fa-solid fa-train me-1"></i> Delhi → Varanasi
          </button>
          <button
            type="button"
            className="route-chip"
            onClick={() => selectTrainRoute('Mumbai Central (BCT)', 'Ahmedabad (ADI)')}
          >
            <i className="fa-solid fa-train me-1"></i> Mumbai → Ahmedabad
          </button>
          <button
            type="button"
            className="route-chip"
            onClick={() => selectTrainRoute('Chennai (MAS)', 'Bengaluru (SBC)')}
          >
            <i className="fa-solid fa-train me-1"></i> Chennai → Bengaluru
          </button>

          {/* Flight Chips */}
          <button
            type="button"
            className="route-chip"
            onClick={() => selectFlightRoute('Vijayawada (VGA)', 'Hyderabad (HYD)')}
          >
            <i className="fa-solid fa-plane me-1"></i> Vijayawada → Hyderabad
          </button>
          <button
            type="button"
            className="route-chip"
            onClick={() => selectFlightRoute('Hyderabad (HYD)', 'Delhi (DEL)')}
          >
            <i className="fa-solid fa-plane me-1"></i> Hyderabad → Delhi
          </button>
          <button
            type="button"
            className="route-chip"
            onClick={() => selectFlightRoute('Mumbai (BOM)', 'Hyderabad (HYD)')}
          >
            <i className="fa-solid fa-plane me-1"></i> Mumbai → Hyderabad
          </button>
          <button
            type="button"
            className="route-chip"
            onClick={() => selectFlightRoute('Delhi (DEL)', 'Dubai (DXB)')}
          >
            <i className="fa-solid fa-plane me-1"></i> Delhi → Dubai
          </button>
          <button
            type="button"
            className="route-chip"
            onClick={() => selectFlightRoute('Chennai (MAA)', 'Singapore (SIN)')}
          >
            <i className="fa-solid fa-plane me-1"></i> Chennai → Singapore
          </button>
        </div>
      </div>
    </>
  );
}
