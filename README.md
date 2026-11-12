# TravelEase - Complete Travel Booking Application (React + Vite)

A modern, responsive, full-featured travel booking web application built with **React 18**, **Vite**, **Bootstrap 5**, and **FontAwesome**.

---

## 🌟 Key Features

1. **User Authentication & Profiles:**
   - Registration with duplicate email check and password validation.
   - Login with session persistence in `localStorage`.
   - "My Account" profile modal with booking metrics, member details, and quick logout.

2. **Multi-Service Travel Search:**
   - **Flights:** One-way & Round-trip search across Indian and International destinations, swap cities button, class selection, live sorting by price, duration, and departure time.
   - **Trains:** Indian Railways station selector, class selector (1A, 2A, 3A, SL, CC, EC), passenger count, swap stations.
   - **Hotels:** Destination selector, check-in & check-out validation, room count, guest count, hotel cards with interactive details modal.
   - **Cabs:** Category selection (Mini, Sedan, SUV, Premium), live estimated distance & fare calculation, pickup and drop points.
   - **Popular Route Chips:** 1-click auto-fill & search for popular flight and train routes.

3. **Fare Comparison & Special Offers:**
   - Provider comparison table (IndiGo, MakeMyTrip, Ola, Vistara) with instant booking.
   - Promo cards (FLY20, HOTEL30, CAB99, GLOBAL8K) that auto-apply discount codes.

4. **Interactive Payment & Confirmation System:**
   - **Payment Methods:** Credit Card, Debit Card, UPI QR Code (interactive simulated QR graphic with reference ID), Net Banking.
   - **Ticket Generation:** Instant downloadable `.txt` ticket receipt with all passenger, itinerary, pricing, and hotel details.

5. **My Trips & Cancellation:**
   - Lists all active and past trips with real-time status badges (Confirmed, Pending, Cancelled).
   - "View Details" modal for full itinerary inspection.
   - 1-click booking cancellation with confirmation prompt.

6. **Admin Module & Business Dashboard:**
   - Demo Admin Account: `admin@travelease.com` / `admin123`
   - Real-time KPI statistics: Registered Users, Total Bookings, Confirmed Bookings, Gross Booking Revenue.
   - User Management: Search users, sort (newest, oldest, A-Z), view details, remove user.
   - Booking Management: Search, filter by status or service type, cancel booking.
   - Service Control: Toggle switches to enable/disable Flights, Trains, Hotels, or Cabs in real time.
   - Reports & Analytics: Breakdown by travel mode, revenue, cancellation rate.
   - Demo Data Tools: Seed demo user, clear bookings, clear users.

---

## 🚀 Running the Project in Visual Studio Code (VS Code)

### Step 1: Open the Project in VS Code
1. Launch **Visual Studio Code**.
2. Go to **File -> Open Folder...**
3. Select this folder:
   ```
   C:\Users\G Sai chaitanya\.gemini\antigravity\scratch\travelease-react
   ```
   *(Or open your terminal and run `code .` inside this folder)*

### Step 2: Open the Integrated Terminal
Press ``Ctrl + ` `` (Backtick) or go to **Terminal -> New Terminal** in VS Code.

> **Note for Windows Users:**
> If Windows PowerShell displays `File ... npm.ps1 cannot be loaded because running scripts is disabled on this system`, run this once in PowerShell:
> ```powershell
> Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned
> ```
> Or simply type `npm.cmd` instead of `npm`.

### Step 3: Install Dependencies
Run:
```bash
npm install
```

### Step 4: Start the Development Server
Run:
```bash
npm run dev
```

You will see:
```
  VITE v5.4.2  ready in 250 ms

  ➜  Local:   http://localhost:3000/
  ➜  Network: use --host to expose
```
Click the link or open your browser at **`http://localhost:3000`** to see your app running!

---

## 🛠️ Build for Production
To create a high-performance, minified production build:
```bash
npm run build
```
The compiled assets will be created in the `dist/` folder ready for deployment to Vercel, Netlify, or GitHub Pages.

---

## 📂 Project Structure

```
travelease-react/
├── index.html                   # HTML entry point with CDN fonts & styles
├── vanilla_index.html           # Original standalone single-file version
├── package.json                 # Dependencies & scripts
├── vite.config.js               # Vite config with React plugin & port 3000
├── README.md                    # Setup and usage guide
└── src/
    ├── main.jsx                 # App root mount with TravelProvider
    ├── App.jsx                  # Main page layout & modal orchestration
    ├── index.css                # Polished CSS styles, animations & responsiveness
    ├── context/
    │   └── TravelContext.jsx    # Central state (Auth, Bookings, Services, Toasts)
    ├── data/
    │   └── mockData.js          # Airports, train stations, hotels, cabs, fares
    └── components/
        ├── Navbar.jsx           # Responsive navigation bar & auth buttons
        ├── HeroSearch.jsx       # Tabbed search widget (Flights, Trains, Hotels, Cabs)
        ├── TravelAlerts.jsx     # Live travel notices
        ├── FlightResults.jsx    # Flight cards & sorting
        ├── TrainResults.jsx     # Train cards & booking
        ├── HotelResults.jsx     # Hotel cards & details preview
        ├── CabBooking.jsx       # Cab categories & dynamic fare calculator
        ├── FareComparison.jsx   # Multi-provider comparison table
        ├── PopularDestinations.jsx # Top destination cards with 1-click search
        ├── SpecialOffers.jsx    # Promo cards with discount codes
        ├── BusinessModules.jsx  # Overview of User vs Admin modules
        ├── MyTrips.jsx          # User bookings list & cancellation
        ├── ContactSection.jsx   # Contact information cards
        ├── Footer.jsx           # Footer links & copyright
        ├── ToastContainer.jsx   # Floating toast notification system
        └── modals/
            ├── LoginModal.jsx          # User login
            ├── RegisterModal.jsx       # User registration
            ├── AccountModal.jsx        # User account profile
            ├── AdminLoginModal.jsx     # Admin login
            ├── AdminDashboardModal.jsx # Comprehensive admin control center
            ├── PaymentModal.jsx        # Credit card, UPI QR, Net Banking
            ├── ConfirmationModal.jsx   # Success screen & ticket download
            └── DetailsModal.jsx        # Hotel & Trip details preview
```

---

## 🔑 Demo Logins
- **Admin Module:**
  - Email: `admin@travelease.com`
  - Password: `admin123`
- **Sample User:**
  - Email: `demo.user@travelease.com`
  - Password: `demo123`
  - *(Or click **Register** to create any new user account!)*
