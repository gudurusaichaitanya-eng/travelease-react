import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  hotelData,
  initialTrips,
  generateFlights,
  generateTrains,
  cityAirports,
  trainStations,
  generateBookingId
} from '../data/mockData';

const TravelContext = createContext();

export function TravelProvider({ children }) {
  // --- USERS & AUTH ---
  const [allUsers, setAllUsers] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('TravelEaseUsers') || '[]');
    } catch {
      return [];
    }
  });

  const [currentUser, setCurrentUser] = useState(() => {
    return localStorage.getItem('TravelEaseUser') || '';
  });

  const [currentAccount, setCurrentAccount] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('TravelEaseAccount') || 'null');
    } catch {
      return null;
    }
  });

  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(() => {
    return localStorage.getItem('TravelEaseAdmin') === 'true';
  });

  const [isMaintenanceMode, setIsMaintenanceMode] = useState(() => {
    return localStorage.getItem('TravelEaseMaintenance') === 'true';
  });

  // --- SERVICES STATUS ---
  const [serviceState, setServiceState] = useState(() => {
    try {
      return (
        JSON.parse(localStorage.getItem('TravelEaseServiceState') || 'null') || {
          flight: true,
          train: true,
          hotel: true,
          cab: true
        }
      );
    } catch {
      return { flight: true, train: true, hotel: true, cab: true };
    }
  });

  // --- TRIPS / BOOKINGS ---
  const [trips, setTrips] = useState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem('TravelEaseTrips') || 'null');
      return Array.isArray(saved) && saved.length ? saved : initialTrips;
    } catch {
      return initialTrips;
    }
  });

  // --- MODALS & TOASTS ---
  const [activeModal, setActiveModal] = useState(null);
  const [modalData, setModalData] = useState(null);
  const [currentBooking, setCurrentBooking] = useState({});
  const [toasts, setToasts] = useState([]);

  // --- FLIGHT SEARCH & RESULTS ---
  const [flightCriteria, setFlightCriteria] = useState({
    fromCity: 'Vijayawada (VGA)',
    toCity: 'Hyderabad (HYD)',
    departDate: new Date(Date.now() + 86400000).toISOString().slice(0, 10),
    returnDate: new Date(Date.now() + 7 * 86400000).toISOString().slice(0, 10),
    isRoundTrip: false,
    passengers: '1 Adult',
    flightClass: 'Economy'
  });
  const [flights, setFlights] = useState(() =>
    generateFlights('Vijayawada (VGA)', 'Hyderabad (HYD)')
  );

  // --- TRAIN SEARCH & RESULTS ---
  const [trainCriteria, setTrainCriteria] = useState({
    trainFrom: 'Vijayawada (BZA)',
    trainTo: 'Hyderabad (HYB)',
    trainDate: new Date(Date.now() + 86400000).toISOString().slice(0, 10),
    trainPassengers: '1',
    trainClass: 'Sleeper (SL)'
  });
  const [trains, setTrains] = useState(() =>
    generateTrains('Vijayawada (BZA)', 'Hyderabad (HYB)')
  );

  // --- HOTEL SEARCH ---
  const [hotelCriteria, setHotelCriteria] = useState({
    hotelCity: 'Goa, India',
    checkIn: new Date(Date.now() + 86400000).toISOString().slice(0, 10),
    checkOut: new Date(Date.now() + 7 * 86400000).toISOString().slice(0, 10),
    guests: '2 Guests',
    rooms: '1 Room'
  });
  const [hotels] = useState(hotelData);

  // --- CABS ---
  const [cabCriteria, setCabCriteria] = useState({
    pickupLoc: 'Vijayawada Airport (VGA)',
    dropLoc: 'Benz Circle, Vijayawada',
    cabDate: new Date().toISOString().slice(0, 10),
    cabTime: '09:00'
  });
  const [selectedCab, setSelectedCab] = useState(null);

  // --- PERSISTENCE EFFECTS ---
  useEffect(() => {
    localStorage.setItem('TravelEaseUsers', JSON.stringify(allUsers));
  }, [allUsers]);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('TravelEaseUser', currentUser);
    } else {
      localStorage.removeItem('TravelEaseUser');
    }
  }, [currentUser]);

  useEffect(() => {
    if (currentAccount) {
      localStorage.setItem('TravelEaseAccount', JSON.stringify(currentAccount));
    } else {
      localStorage.removeItem('TravelEaseAccount');
    }
  }, [currentAccount]);

  useEffect(() => {
    localStorage.setItem('TravelEaseTrips', JSON.stringify(trips));
  }, [trips]);

  useEffect(() => {
    localStorage.setItem('TravelEaseServiceState', JSON.stringify(serviceState));
  }, [serviceState]);

  useEffect(() => {
    localStorage.setItem('TravelEaseAdmin', isAdminLoggedIn ? 'true' : 'false');
  }, [isAdminLoggedIn]);

  useEffect(() => {
    localStorage.setItem('TravelEaseMaintenance', isMaintenanceMode ? 'true' : 'false');
  }, [isMaintenanceMode]);

  // --- TOAST DISPATCHER ---
  const showToast = (message, type = 'primary') => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // --- MODAL CONTROLS ---
  const openModal = (modalName, data = null) => {
    setActiveModal(modalName);
    setModalData(data);
  };

  const closeModal = () => {
    setActiveModal(null);
    setModalData(null);
  };

  // --- AUTH ACTIONS ---
  const loginUser = (email, password) => {
    const cleanEmail = email.trim().toLowerCase();
    const account = allUsers.find((u) => u.email?.toLowerCase() === cleanEmail);
    if (!account) {
      showToast('No account found with this email. Please register first.', 'danger');
      return false;
    }
    if (account.password !== password) {
      showToast('Incorrect password. Please try again.', 'danger');
      return false;
    }
    setCurrentUser(cleanEmail);
    setCurrentAccount(account);
    showToast(`Welcome back, ${account.name || cleanEmail}!`, 'success');
    closeModal();
    return true;
  };

  const registerUser = (name, email, password) => {
    const cleanEmail = email.trim().toLowerCase();
    if (allUsers.some((u) => u.email?.toLowerCase() === cleanEmail)) {
      showToast('An account with this email already exists. Please login.', 'warning');
      return false;
    }
    const newAccount = {
      name: name.trim(),
      email: cleanEmail,
      password,
      createdAt: new Date().toISOString()
    };
    const updatedUsers = [...allUsers, newAccount];
    setAllUsers(updatedUsers);
    setCurrentUser(cleanEmail);
    setCurrentAccount(newAccount);
    showToast('Account created successfully! You are now logged in.', 'success');
    closeModal();
    return true;
  };

  const logoutUser = () => {
    setCurrentUser('');
    setCurrentAccount(null);
    closeModal();
    showToast('Logged out successfully.', 'info');
  };

  const loginAdmin = (email, password) => {
    if (email === 'admin@travelease.com' && password === 'admin123') {
      setIsAdminLoggedIn(true);
      showToast('Admin logged in successfully.', 'success');
      openModal('adminDashboard');
      return true;
    }
    showToast('Invalid admin credentials. Use admin@travelease.com / admin123', 'danger');
    return false;
  };

  const logoutAdmin = () => {
    setIsAdminLoggedIn(false);
    closeModal();
    showToast('Admin logged out safely.', 'info');
  };

  // --- BOOKING WORKFLOW ---
  const startBooking = (bookingObj) => {
    if (!currentUser) {
      showToast('Please login to your account before booking.', 'warning');
      openModal('login');
      return;
    }
    if (bookingObj?.type && serviceState[bookingObj.type] === false) {
      showToast(
        `${bookingObj.type.toUpperCase()} booking is currently disabled by administrator.`,
        'warning'
      );
      return;
    }
    setCurrentBooking(bookingObj);
    openModal('payment');
  };

  const finalizePayment = (paymentMethod) => {
    const id = generateBookingId('TE-BK');
    const today = new Date().toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });

    const newTrip = {
      id,
      userEmail: currentUser,
      userName: currentAccount?.name || currentUser.split('@')[0],
      type: currentBooking.type || 'booking',
      icon:
        currentBooking.type === 'hotel'
          ? 'fa-hotel'
          : currentBooking.type === 'cab'
          ? 'fa-taxi'
          : currentBooking.type === 'train'
          ? 'fa-train'
          : 'fa-plane',
      color:
        currentBooking.type === 'hotel'
          ? '#ff7a00'
          : currentBooking.type === 'cab'
          ? '#20c997'
          : currentBooking.type === 'train'
          ? '#6f42c1'
          : '#0d6efd',
      title: currentBooking.service || 'Travel Booking',
      date:
        currentBooking.type === 'hotel'
          ? `${currentBooking.checkIn} - ${currentBooking.checkOut}`
          : currentBooking.date || today,
      status: 'confirmed',
      amount: Number(currentBooking.amount || 0),
      paymentMethod,
      ...currentBooking
    };

    setTrips((prev) => [newTrip, ...prev]);
    setCurrentBooking(newTrip);
    openModal('confirmation', newTrip);
    showToast('Payment successful! Your booking is confirmed.', 'success');
  };

  const cancelTrip = (tripId) => {
    setTrips((prev) =>
      prev.map((t) => (t.id === tripId ? { ...t, status: 'cancelled' } : t))
    );
    showToast(`Booking ${tripId} has been cancelled.`, 'warning');
  };

  // --- ADMIN ACTIONS ---
  const toggleService = (key) => {
    setServiceState((prev) => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const adminDeleteUser = (email) => {
    setAllUsers((prev) => prev.filter((u) => u.email?.toLowerCase() !== email.toLowerCase()));
    if (currentUser?.toLowerCase() === email.toLowerCase()) {
      logoutUser();
    }
    showToast(`User ${email} removed.`, 'warning');
  };

  const seedDemoUser = () => {
    const demoEmail = 'demo.user@travelease.com';
    if (allUsers.some((u) => u.email === demoEmail)) {
      showToast('Demo user already exists: demo.user@travelease.com / demo123', 'info');
      return;
    }
    const demo = {
      name: 'Demo Traveler',
      email: demoEmail,
      password: 'demo123',
      createdAt: new Date().toISOString()
    };
    setAllUsers((prev) => [...prev, demo]);
    showToast('Demo user created! Email: demo.user@travelease.com, Password: demo123', 'success');
  };

  const clearAllBookings = () => {
    setTrips([]);
    showToast('All booking records have been cleared.', 'warning');
  };

  const clearAllUsers = () => {
    setAllUsers([]);
    logoutUser();
    showToast('All registered user accounts cleared.', 'warning');
  };

  return (
    <TravelContext.Provider
      value={{
        // Auth
        currentUser,
        currentAccount,
        allUsers,
        isAdminLoggedIn,
        isMaintenanceMode,
        setIsMaintenanceMode,
        loginUser,
        registerUser,
        logoutUser,
        loginAdmin,
        logoutAdmin,

        // Services & Trips
        serviceState,
        toggleService,
        trips,
        cancelTrip,

        // Modals & Toasts
        activeModal,
        modalData,
        openModal,
        closeModal,
        toasts,
        showToast,
        removeToast,

        // Flights
        flightCriteria,
        setFlightCriteria,
        flights,
        setFlights,

        // Trains
        trainCriteria,
        setTrainCriteria,
        trains,
        setTrains,

        // Hotels
        hotelCriteria,
        setHotelCriteria,
        hotels,

        // Cabs
        cabCriteria,
        setCabCriteria,
        selectedCab,
        setSelectedCab,

        // Booking workflow
        currentBooking,
        startBooking,
        finalizePayment,

        // Admin tools
        adminDeleteUser,
        seedDemoUser,
        clearAllBookings,
        clearAllUsers
      }}
    >
      {children}
    </TravelContext.Provider>
  );
}

export function useTravel() {
  const context = useContext(TravelContext);
  if (!context) {
    throw new Error('useTravel must be used within a TravelProvider');
  }
  return context;
}
