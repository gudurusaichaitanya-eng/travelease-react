import React, { useState } from 'react';
import { useTravel } from '../../context/TravelContext';
import { formatCurrency } from '../../data/mockData';

export default function AdminDashboardModal() {
  const {
    activeModal,
    closeModal,
    openModal,
    logoutAdmin,
    allUsers,
    trips,
    serviceState,
    toggleService,
    adminDeleteUser,
    cancelTrip,
    seedDemoUser,
    clearAllBookings,
    clearAllUsers,
    isMaintenanceMode,
    setIsMaintenanceMode,
    showToast
  } = useTravel();

  const [activePanel, setActivePanel] = useState('dashboard');
  const [userSearch, setUserSearch] = useState('');
  const [userSort, setUserSort] = useState('newest');

  const [bookingSearch, setBookingSearch] = useState('');
  const [bookingStatusFilter, setBookingStatusFilter] = useState('all');
  const [bookingTypeFilter, setBookingTypeFilter] = useState('all');

  if (activeModal !== 'adminDashboard') return null;

  // --- STATS CALCULATION ---
  const totalBookings = trips.length;
  const confirmedBookings = trips.filter((t) => t.status === 'confirmed');
  const cancelledBookings = trips.filter((t) => t.status === 'cancelled');
  const totalRevenue = trips.reduce((sum, t) => sum + (Number(t.amount) || 0), 0);
  const confirmedRevenue = confirmedBookings.reduce((sum, t) => sum + (Number(t.amount) || 0), 0);
  const activeServiceCount = Object.values(serviceState).filter(Boolean).length;

  // --- FILTERED USERS ---
  const filteredUsers = allUsers
    .filter((u) => {
      const q = userSearch.toLowerCase();
      return !q || u.name?.toLowerCase().includes(q) || u.email?.toLowerCase().includes(q);
    })
    .sort((a, b) => {
      if (userSort === 'name') return (a.name || '').localeCompare(b.name || '');
      if (userSort === 'oldest') return new Date(a.createdAt || 0) - new Date(b.createdAt || 0);
      return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
    });

  // --- FILTERED BOOKINGS ---
  const filteredBookings = trips.filter((b) => {
    const q = bookingSearch.toLowerCase();
    const matchesSearch =
      !q ||
      b.id?.toLowerCase().includes(q) ||
      b.title?.toLowerCase().includes(q) ||
      b.service?.toLowerCase().includes(q) ||
      b.route?.toLowerCase().includes(q) ||
      b.userEmail?.toLowerCase().includes(q) ||
      b.userName?.toLowerCase().includes(q);

    const matchesStatus = bookingStatusFilter === 'all' || b.status === bookingStatusFilter;
    const matchesType = bookingTypeFilter === 'all' || b.type === bookingTypeFilter;

    return matchesSearch && matchesStatus && matchesType;
  });

  const ADMIN_SERVICES = [
    { key: 'flight', label: 'Flights', icon: 'fa-plane', desc: 'Domestic & international flight search & booking.' },
    { key: 'train', label: 'Trains', icon: 'fa-train', desc: 'Indian Railways train reservations & class options.' },
    { key: 'hotel', label: 'Hotels', icon: 'fa-hotel', desc: 'Curated hotel stays, room types and guest packages.' },
    { key: 'cab', label: 'Cabs', icon: 'fa-taxi', desc: 'City transfers, airport pickups and hourly rentals.' }
  ];

  return (
    <div className="custom-modal-backdrop" onClick={closeModal}>
      <div
        className="custom-modal-dialog modal-xl"
        onClick={(e) => e.stopPropagation()}
        style={{ height: '90vh' }}
      >
        <div className="custom-modal-header py-3">
          <div>
            <h4 className="modal-title mb-0">
              <i className="fa-solid fa-gauge-high text-primary me-2"></i>
              TravelEase Admin Dashboard
            </h4>
            <small className="text-muted">
              Business control center • Users • Bookings • Services • Reports
            </small>
          </div>
          <div className="d-flex gap-2 align-items-center">
            <span className="module-badge">
              <i className="fa-solid fa-shield-halved"></i> Admin
            </span>
            <button className="btn btn-outline-danger btn-sm" onClick={logoutAdmin}>
              <i className="fa-solid fa-right-from-bracket me-1"></i>Logout
            </button>
            <button type="button" className="btn-close" onClick={closeModal}></button>
          </div>
        </div>

        <div className="custom-modal-body p-0">
          <div className="admin-shell row g-0" style={{ minHeight: '100%' }}>
            {/* SIDEBAR */}
            <aside className="admin-sidebar col-lg-2">
              <div className="admin-brand">
                <i className="fa-solid fa-plane-departure me-2"></i>TravelEase
              </div>
              <div
                className="small text-uppercase mb-2"
                style={{ color: '#7891b3', letterSpacing: '.08em' }}
              >
                Control Center
              </div>
              <button
                type="button"
                className={`admin-nav-btn ${activePanel === 'dashboard' ? 'active' : ''}`}
                onClick={() => setActivePanel('dashboard')}
              >
                <i className="fa-solid fa-chart-line me-2"></i>Dashboard
              </button>
              <button
                type="button"
                className={`admin-nav-btn ${activePanel === 'users' ? 'active' : ''}`}
                onClick={() => setActivePanel('users')}
              >
                <i className="fa-solid fa-users me-2"></i>Users
              </button>
              <button
                type="button"
                className={`admin-nav-btn ${activePanel === 'bookings' ? 'active' : ''}`}
                onClick={() => setActivePanel('bookings')}
              >
                <i className="fa-solid fa-ticket me-2"></i>Bookings
              </button>
              <button
                type="button"
                className={`admin-nav-btn ${activePanel === 'services' ? 'active' : ''}`}
                onClick={() => setActivePanel('services')}
              >
                <i className="fa-solid fa-layer-group me-2"></i>Services
              </button>
              <button
                type="button"
                className={`admin-nav-btn ${activePanel === 'reports' ? 'active' : ''}`}
                onClick={() => setActivePanel('reports')}
              >
                <i className="fa-solid fa-chart-pie me-2"></i>Reports
              </button>
              <button
                type="button"
                className={`admin-nav-btn ${activePanel === 'settings' ? 'active' : ''}`}
                onClick={() => setActivePanel('settings')}
              >
                <i className="fa-solid fa-gear me-2"></i>Settings
              </button>
              <hr style={{ borderColor: '#2b4566' }} />
              <div className="small" style={{ color: '#91a7c2' }}>
                <i className="fa-solid fa-database me-1"></i>React State & Storage
              </div>
            </aside>

            {/* MAIN PANEL CONTENT */}
            <main className="admin-main col-lg-10 p-4">
              {/* DASHBOARD TAB */}
              {activePanel === 'dashboard' && (
                <div>
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <div>
                      <h5 className="mb-1">Dashboard Overview</h5>
                      <p className="text-muted mb-0">
                        A complete snapshot of the TravelEase business system.
                      </p>
                    </div>
                    <button
                      className="btn btn-sm btn-outline-primary"
                      onClick={() => showToast('Data refreshed!', 'info')}
                    >
                      <i className="fa-solid fa-rotate me-1"></i>Refresh
                    </button>
                  </div>

                  <div className="row g-3 mb-4">
                    <div className="col-sm-6 col-xl-3">
                      <div className="admin-stat">
                        <div className="icon">
                          <i className="fa-solid fa-users"></i>
                        </div>
                        <small className="text-muted">Registered Users</small>
                        <h3>{allUsers.length}</h3>
                        <span className="admin-kpi-note">User Module accounts</span>
                      </div>
                    </div>
                    <div className="col-sm-6 col-xl-3">
                      <div className="admin-stat">
                        <div className="icon">
                          <i className="fa-solid fa-ticket"></i>
                        </div>
                        <small className="text-muted">Total Bookings</small>
                        <h3>{totalBookings}</h3>
                        <span className="admin-kpi-note">All travel services</span>
                      </div>
                    </div>
                    <div className="col-sm-6 col-xl-3">
                      <div className="admin-stat">
                        <div className="icon">
                          <i className="fa-solid fa-circle-check"></i>
                        </div>
                        <small className="text-muted">Confirmed</small>
                        <h3>{confirmedBookings.length}</h3>
                        <span className="admin-kpi-note">Successful payments</span>
                      </div>
                    </div>
                    <div className="col-sm-6 col-xl-3">
                      <div className="admin-stat">
                        <div className="icon">
                          <i className="fa-solid fa-indian-rupee-sign"></i>
                        </div>
                        <small className="text-muted">Booking Value</small>
                        <h3>{formatCurrency(totalRevenue)}</h3>
                        <span className="admin-kpi-note">Total recorded value</span>
                      </div>
                    </div>
                  </div>

                  <div className="row g-3 mb-3">
                    <div className="col-md-6">
                      <div className="admin-mini-card">
                        <div className="d-flex justify-content-between">
                          <strong>
                            <i className="fa-solid fa-user text-primary me-2"></i>User Module
                          </strong>
                          <span className="badge bg-success">Operational</span>
                        </div>
                        <p className="text-muted small mt-2 mb-2">
                          Customer-facing module for signup, search, fare comparison, payment,
                          booking, My Trips and cancellations.
                        </p>
                        <button
                          className="btn btn-sm btn-outline-primary"
                          onClick={() => setActivePanel('users')}
                        >
                          Manage Users
                        </button>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="admin-mini-card">
                        <div className="d-flex justify-content-between">
                          <strong>
                            <i className="fa-solid fa-user-shield text-primary me-2"></i>Admin Module
                          </strong>
                          <span className="badge bg-success">Operational</span>
                        </div>
                        <p className="text-muted small mt-2 mb-2">
                          Back-office control for users, bookings, travel services, analytics and
                          demo system settings.
                        </p>
                        <button
                          className="btn btn-sm btn-outline-dark"
                          onClick={() => setActivePanel('reports')}
                        >
                          Open Reports
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="admin-toolbar">
                    <div className="row g-2">
                      <div className="col-md-4">
                        <small className="text-muted">Confirmed value</small>
                        <div className="fw-bold">{formatCurrency(confirmedRevenue)}</div>
                      </div>
                      <div className="col-md-4">
                        <small className="text-muted">Cancelled bookings</small>
                        <div className="fw-bold">{cancelledBookings.length}</div>
                      </div>
                      <div className="col-md-4">
                        <small className="text-muted">Active services</small>
                        <div className="fw-bold">{activeServiceCount} / 4</div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* USERS TAB */}
              {activePanel === 'users' && (
                <div>
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <div>
                      <h5 className="mb-1">User Management</h5>
                      <p className="text-muted mb-0">
                        Manage registered accounts created through the User Module.
                      </p>
                    </div>
                    <span className="badge bg-primary">
                      {filteredUsers.length} user{filteredUsers.length === 1 ? '' : 's'}
                    </span>
                  </div>

                  <div className="admin-toolbar mb-3">
                    <div className="row g-2">
                      <div className="col-md-8">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Search user by name or email..."
                          value={userSearch}
                          onChange={(e) => setUserSearch(e.target.value)}
                        />
                      </div>
                      <div className="col-md-4">
                        <select
                          className="form-select"
                          value={userSort}
                          onChange={(e) => setUserSort(e.target.value)}
                        >
                          <option value="newest">Newest first</option>
                          <option value="oldest">Oldest first</option>
                          <option value="name">Name A-Z</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="table-responsive admin-table">
                    <table className="table mb-0">
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>Name</th>
                          <th>Email</th>
                          <th>Registered</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredUsers.length === 0 ? (
                          <tr>
                            <td colSpan="5" className="text-center text-muted py-4">
                              No matching registered users found.
                            </td>
                          </tr>
                        ) : (
                          filteredUsers.map((u, idx) => (
                            <tr key={u.email || idx}>
                              <td>{idx + 1}</td>
                              <td>
                                <strong>{u.name || 'User'}</strong>
                              </td>
                              <td>{u.email}</td>
                              <td>
                                {u.createdAt
                                  ? new Date(u.createdAt).toLocaleDateString('en-IN')
                                  : '-'}
                              </td>
                              <td>
                                <button
                                  className="btn btn-sm btn-outline-danger"
                                  onClick={() => {
                                    if (window.confirm(`Remove user ${u.name || u.email}?`)) {
                                      adminDeleteUser(u.email);
                                    }
                                  }}
                                >
                                  Remove
                                </button>
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* BOOKINGS TAB */}
              {activePanel === 'bookings' && (
                <div>
                  <div className="mb-3">
                    <h5 className="mb-1">Booking Management</h5>
                    <p className="text-muted mb-0">
                      Review, inspect and manage all User Module bookings.
                    </p>
                  </div>

                  <div className="admin-toolbar mb-3">
                    <div className="row g-2">
                      <div className="col-md-6">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Search booking ID, service, route or user..."
                          value={bookingSearch}
                          onChange={(e) => setBookingSearch(e.target.value)}
                        />
                      </div>
                      <div className="col-md-3">
                        <select
                          className="form-select"
                          value={bookingStatusFilter}
                          onChange={(e) => setBookingStatusFilter(e.target.value)}
                        >
                          <option value="all">All statuses</option>
                          <option value="confirmed">Confirmed</option>
                          <option value="pending">Pending</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                      </div>
                      <div className="col-md-3">
                        <select
                          className="form-select"
                          value={bookingTypeFilter}
                          onChange={(e) => setBookingTypeFilter(e.target.value)}
                        >
                          <option value="all">All services</option>
                          <option value="flight">Flights</option>
                          <option value="train">Trains</option>
                          <option value="hotel">Hotels</option>
                          <option value="cab">Cabs</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="table-responsive admin-table">
                    <table className="table mb-0">
                      <thead>
                        <tr>
                          <th>Booking ID</th>
                          <th>Customer</th>
                          <th>Service</th>
                          <th>Date</th>
                          <th>Amount</th>
                          <th>Status</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredBookings.length === 0 ? (
                          <tr>
                            <td colSpan="7" className="text-center text-muted py-4">
                              No matching bookings found.
                            </td>
                          </tr>
                        ) : (
                          filteredBookings.map((b) => {
                            const sc =
                              b.status === 'confirmed'
                                ? 'status-confirmed'
                                : b.status === 'pending'
                                ? 'status-pending'
                                : 'status-cancelled';

                            return (
                              <tr key={b.id}>
                                <td>
                                  <strong>{b.id}</strong>
                                </td>
                                <td>{b.userName || b.userEmail || 'Guest'}</td>
                                <td>{b.title || b.service}</td>
                                <td>{b.date || '-'}</td>
                                <td>{formatCurrency(b.amount)}</td>
                                <td>
                                  <span className={`status-badge ${sc}`}>{b.status}</span>
                                </td>
                                <td>
                                  <div className="d-flex gap-1">
                                    <button
                                      className="btn btn-sm btn-outline-primary"
                                      onClick={() => openModal('tripDetails', b)}
                                    >
                                      View
                                    </button>
                                    {b.status !== 'cancelled' && (
                                      <button
                                        className="btn btn-sm btn-outline-danger"
                                        onClick={() => {
                                          if (window.confirm(`Cancel booking ${b.id}?`)) {
                                            cancelTrip(b.id);
                                          }
                                        }}
                                      >
                                        Cancel
                                      </button>
                                    )}
                                  </div>
                                </td>
                              </tr>
                            );
                          })
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* SERVICES TAB */}
              {activePanel === 'services' && (
                <div>
                  <div className="mb-3">
                    <h5 className="mb-1">Service Management</h5>
                    <p className="text-muted mb-0">
                      Control the four business services available to customers.
                    </p>
                  </div>

                  <div className="row g-3">
                    {ADMIN_SERVICES.map((s) => (
                      <div key={s.key} className="col-md-6">
                        <div className="admin-service-card">
                          <div className="d-flex justify-content-between align-items-start gap-3">
                            <div>
                              <div className="d-flex align-items-center gap-2">
                                <div
                                  className="trip-icon"
                                  style={{ background: '#0d6efd', width: '38px', height: '38px' }}
                                >
                                  <i className={`fa-solid ${s.icon}`}></i>
                                </div>
                                <div>
                                  <h6 className="mb-0">{s.label}</h6>
                                  <small className="text-muted">
                                    {s.key.toUpperCase()} service
                                  </small>
                                </div>
                              </div>
                              <p className="small text-muted mt-3 mb-2">{s.desc}</p>
                            </div>
                            <div className="form-check form-switch">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                role="switch"
                                checked={serviceState[s.key] !== false}
                                onChange={() => toggleService(s.key)}
                              />
                            </div>
                          </div>
                          <span
                            className={`badge ${
                              serviceState[s.key] !== false ? 'bg-success' : 'bg-secondary'
                            }`}
                          >
                            {serviceState[s.key] !== false ? 'Active' : 'Disabled'}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* REPORTS TAB */}
              {activePanel === 'reports' && (
                <div>
                  <div className="mb-3">
                    <h5 className="mb-1">Reports & Analytics</h5>
                    <p className="text-muted mb-0">
                      Real-time client analytics generated from booking records.
                    </p>
                  </div>

                  <div className="row g-3 mb-3">
                    <div className="col-md-4">
                      <div className="admin-mini-card">
                        <small className="text-muted">Flights Booked</small>
                        <h4 className="mb-0">
                          {trips.filter((t) => t.type === 'flight').length}
                        </h4>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="admin-mini-card">
                        <small className="text-muted">Trains Booked</small>
                        <h4 className="mb-0">
                          {trips.filter((t) => t.type === 'train').length}
                        </h4>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="admin-mini-card">
                        <small className="text-muted">Hotels & Cabs</small>
                        <h4 className="mb-0">
                          {trips.filter((t) => t.type === 'hotel' || t.type === 'cab').length}
                        </h4>
                      </div>
                    </div>
                  </div>

                  <div className="admin-toolbar">
                    <h6>Booking Summary</h6>
                    <div className="row g-3">
                      <div className="col-md-4">
                        <small className="text-muted">Confirmed Revenue</small>
                        <div className="fw-bold">{formatCurrency(confirmedRevenue)}</div>
                      </div>
                      <div className="col-md-4">
                        <small className="text-muted">Average Booking Value</small>
                        <div className="fw-bold">
                          {formatCurrency(totalBookings ? totalRevenue / totalBookings : 0)}
                        </div>
                      </div>
                      <div className="col-md-4">
                        <small className="text-muted">Cancellation Rate</small>
                        <div className="fw-bold">
                          {totalBookings
                            ? `${((cancelledBookings.length / totalBookings) * 100).toFixed(1)}%`
                            : '0%'}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* SETTINGS TAB */}
              {activePanel === 'settings' && (
                <div>
                  <div className="mb-3">
                    <h5 className="mb-1">Admin Settings</h5>
                    <p className="text-muted mb-0">System configuration and demo data tools.</p>
                  </div>

                  <div className="admin-service-card mb-3">
                    <div className="d-flex justify-content-between align-items-center gap-3">
                      <div>
                        <strong>Maintenance Mode</strong>
                        <p className="text-muted small mb-0">
                          Simulates a system maintenance alert across the application.
                        </p>
                      </div>
                      <div className="form-check form-switch">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          role="switch"
                          checked={isMaintenanceMode}
                          onChange={(e) => setIsMaintenanceMode(e.target.checked)}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="admin-service-card mb-3">
                    <strong>Demo Data Tools</strong>
                    <p className="text-muted small">
                      Use these to quickly populate or clean up test records during presentation.
                    </p>
                    <div className="d-flex flex-wrap gap-2">
                      <button
                        type="button"
                        className="btn btn-outline-primary btn-sm"
                        onClick={seedDemoUser}
                      >
                        <i className="fa-solid fa-user-plus me-1"></i>Create Demo User
                      </button>
                      <button
                        type="button"
                        className="btn btn-outline-danger btn-sm"
                        onClick={() => {
                          if (window.confirm('Clear all booking records?')) {
                            clearAllBookings();
                          }
                        }}
                      >
                        <i className="fa-solid fa-trash me-1"></i>Clear All Bookings
                      </button>
                      <button
                        type="button"
                        className="btn btn-outline-danger btn-sm"
                        onClick={() => {
                          if (window.confirm('Clear all registered users?')) {
                            clearAllUsers();
                          }
                        }}
                      >
                        <i className="fa-solid fa-user-xmark me-1"></i>Clear All Users
                      </button>
                    </div>
                  </div>

                  <div className="alert alert-warning small mb-0">
                    <i className="fa-solid fa-triangle-exclamation me-1"></i>
                    This project uses browser Local Storage to simulate full database persistence
                    for your presentation.
                  </div>
                </div>
              )}
            </main>
          </div>
        </div>
      </div>
    </div>
  );
}
