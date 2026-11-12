export const formatCurrency = (n) => "₹" + Number(n || 0).toLocaleString("en-IN");

export const generateBookingId = (prefix) =>
  prefix + "-" + Math.floor(100000 + Math.random() * 900000);

export const cityAirports = {
  "Delhi": "DEL",
  "Mumbai": "BOM",
  "Hyderabad": "HYD",
  "Bengaluru": "BLR",
  "Chennai": "MAA",
  "Kolkata": "CCU",
  "Pune": "PNQ",
  "Goa": "GOI",
  "Vijayawada": "VGA",
  "Visakhapatnam": "VTZ",
  "Ahmedabad": "AMD",
  "Jaipur": "JAI",
  "Kochi": "COK",
  "Lucknow": "LKO",
  "Dubai": "DXB",
  "Singapore": "SIN",
  "Bangkok": "BKK",
  "Kuala Lumpur": "KUL",
  "Tokyo": "NRT",
  "Paris": "CDG"
};

export const cityBasePrices = {
  DEL: 3999, BOM: 4299, HYD: 4499, BLR: 4999, MAA: 4699,
  CCU: 5299, PNQ: 4399, GOI: 3999, VGA: 3599, VTZ: 3799,
  AMD: 4199, JAI: 4299, COK: 4999, LKO: 4599, DXB: 22999,
  SIN: 28499, BKK: 19999, KUL: 21999, NRT: 52999, CDG: 45999
};

export function cityInfo(value) {
  const v = (value || "").trim();
  const match = v.match(/^(.*?)\s*\(([A-Z]{3})\)$/);
  if (match) return { name: match[1].trim(), code: match[2] };
  const key = Object.keys(cityAirports).find(c => c.toLowerCase() === v.toLowerCase());
  return key ? { name: key, code: cityAirports[key] } : { name: v, code: (v.substring(0, 3) || "XXX").toUpperCase() };
}

export function generateFlights(fromValue, toValue) {
  const from = cityInfo(fromValue), to = cityInfo(toValue);
  const base = Math.max(1999, Math.round(((cityBasePrices[from.code] || 4499) + (cityBasePrices[to.code] || 4499)) / 2));
  const international = ["DXB", "SIN", "BKK", "KUL", "NRT", "CDG"].includes(from.code) || ["DXB", "SIN", "BKK", "KUL", "NRT", "CDG"].includes(to.code);
  const durations = international ? ["4h 05m", "4h 25m", "5h 10m", "5h 45m", "6h 20m"] : ["1h 10m", "1h 45m", "2h 20m", "2h 55m", "3h 30m"];
  const times = [["06:15", "08:20"], ["09:40", "12:10"], ["13:05", "16:50"], ["18:20", "20:35"], ["21:00", "23:15"]];
  const airlines = [["IndiGo", "6E"], ["Air India", "AI"], ["Vistara", "UK"], ["SpiceJet", "SG"], ["Akasa Air", "QP"]];
  return airlines.map((a, i) => ({
    id: `fl-${i}`,
    airline: a[0],
    code: a[1] + "-" + (200 + i * 137),
    logo: "fa-plane",
    dep: times[i][0],
    arr: times[i][1],
    from: from.code,
    to: to.code,
    duration: durations[i],
    stops: i === 2 ? "1 Stop" : "Non-stop",
    price: Math.round(base * (i === 2 ? 0.92 : 1 + (i * 0.055)))
  }));
}

export const trainStations = {
  "New Delhi": "NDLS", "Mumbai Central": "BCT", "Chhatrapati Shivaji Maharaj Terminus": "CSMT",
  "Hyderabad": "HYB", "Secunderabad": "SC", "Vijayawada": "BZA", "Guntur": "GNT",
  "Visakhapatnam": "VSKP", "Rajahmundry": "RJY", "Tirupati": "TPTY", "Chennai": "MAS",
  "Bengaluru": "SBC", "Mysuru": "MYS", "Kolkata": "HWH", "Howrah": "HWH",
  "Patna": "PNBE", "Varanasi": "BSB", "Lucknow": "LKO", "Kanpur": "CNB", "Jaipur": "JP",
  "Ahmedabad": "ADI", "Surat": "ST", "Pune": "PUNE", "Nagpur": "NGP", "Bhopal": "BPL",
  "Indore": "INDB", "Kochi": "ERS", "Thiruvananthapuram": "TVC", "Coimbatore": "CBE",
  "Madurai": "MDU", "Bhubaneswar": "BBS", "Puri": "PURI", "Ranchi": "RNC", "Raipur": "R",
  "Jammu Tawi": "JAT", "Amritsar": "ASR", "Chandigarh": "CDG", "Dehradun": "DDN",
  "Haridwar": "HW", "Agra Cantt": "AGC", "Gwalior": "GWL", "Jodhpur": "JU",
  "Udaipur": "UDZ", "Guwahati": "GHY", "Siliguri": "NJP", "Rourkela": "ROU",
  "Dhanbad": "DHN", "Jabalpur": "JBP", "Nashik Road": "NK", "Goa Madgaon": "MAO"
};

export const trainBaseFares = {
  "NDLS": 850, "BCT": 900, "CSMT": 900, "HYB": 650, "SC": 650, "BZA": 550, "GNT": 500,
  "VSKP": 600, "RJY": 520, "TPTY": 550, "MAS": 750, "SBC": 800, "MYS": 780, "HWH": 950,
  "PNBE": 800, "BSB": 780, "LKO": 760, "CNB": 720, "JP": 850, "ADI": 900, "ST": 850,
  "PUNE": 800, "NGP": 720, "BPL": 700, "INDB": 720, "ERS": 950, "TVC": 1050, "CBE": 900,
  "MDU": 920, "BBS": 850, "PURI": 850, "RNC": 780, "R": 700, "JAT": 1200, "ASR": 1150,
  "CDG": 1050, "DDN": 1000, "HW": 980, "AGC": 800, "GWL": 780, "JU": 980, "UDZ": 1050,
  "GHY": 1250, "NJP": 1150, "ROU": 850, "DHN": 800, "JBP": 780, "NK": 820, "MAO": 950
};

export function stationInfo(value) {
  const v = (value || '').trim();
  const m = v.match(/^(.*?)\s*\(([A-Z0-9]+)\)$/);
  if (m) return { name: m[1].trim(), code: m[2] };
  const key = Object.keys(trainStations).find(x => x.toLowerCase() === v.toLowerCase());
  return key ? { name: key, code: trainStations[key] } : { name: v, code: (v.substring(0, 4) || 'XXXX').toUpperCase() };
}

export function generateTrains(fromValue, toValue) {
  const from = stationInfo(fromValue), to = stationInfo(toValue);
  const base = Math.max(300, Math.round(((trainBaseFares[from.code] || 700) + (trainBaseFares[to.code] || 700)) / 2));
  const names = ['Vande Bharat Express', 'Rajdhani Express', 'Shatabdi Express', 'Duronto Express', 'Superfast Express', 'Intercity Express'];
  const nums = ['20833', '12434', '12025', '12245', '12701', '12796'];
  const times = [['05:30', '11:10'], ['07:10', '13:45'], ['09:00', '15:20'], ['14:15', '20:40'], ['18:30', '01:15'], ['21:05', '05:45']];
  const durations = ['5h 40m', '6h 35m', '6h 20m', '6h 25m', '6h 45m', '8h 40m'];
  return names.map((name, i) => ({
    id: `tr-${i}`,
    name,
    number: nums[i],
    from: from.code,
    to: to.code,
    dep: times[i][0],
    arr: times[i][1],
    duration: durations[i],
    class: i % 3 === 0 ? 'CC / 3A' : i % 3 === 1 ? '2A / 3A' : 'SL / 3A',
    fare: Math.round(base * (i === 0 ? 1.45 : i === 1 ? 1.3 : i === 2 ? 1.15 : i === 3 ? 1.08 : i === 4 ? 0.92 : 0.82))
  }));
}

export const hotelData = [
  {
    name: "Taj Exotica Resort & Spa",
    location: "Goa, India",
    rating: 5,
    reviews: 1842,
    img: "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?q=85&w=1200&auto=format&fit=crop",
    facilities: ["Infinity Pool", "Spa", "Free Wi-Fi", "Breakfast", "Beach Access", "Parking"],
    price: 12500,
    room: "Deluxe Garden View",
    size: "48 m²",
    guests: "2 Adults",
    checkin: "2:00 PM",
    checkout: "12:00 PM",
    description: "A premium beachfront stay with resort-style amenities, spacious rooms and easy access to South Goa beaches."
  },
  {
    name: "The Leela Palace",
    location: "Bengaluru, India",
    rating: 5,
    reviews: 2310,
    img: "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=85&w=1200&auto=format&fit=crop",
    facilities: ["Free Wi-Fi", "Gym", "Restaurant", "Bar", "Parking", "Pool"],
    price: 9800,
    room: "Luxury Palace Room",
    size: "52 m²",
    guests: "2 Adults",
    checkin: "2:00 PM",
    checkout: "12:00 PM",
    description: "Elegant city accommodation combining classic architecture, premium dining and business-friendly facilities."
  },
  {
    name: "Radisson Blu Plaza Hotel",
    location: "Banjara Hills, Hyderabad, India",
    rating: 4,
    reviews: 3560,
    img: "https://images.unsplash.com/photo-1600100397608-f70a3ec9ba39?q=85&w=1200&auto=format&fit=crop",
    facilities: ["Outdoor Pool", "Free Wi-Fi", "Breakfast", "Spa", "Restaurant", "Fitness Centre"],
    price: 6200,
    room: "Superior Room",
    size: "44 m²",
    guests: "2 Adults + 2 Children",
    checkin: "2:00 PM",
    checkout: "12:00 PM",
    description: "A premium Hyderabad stay in Banjara Hills with spacious rooms, wellness facilities and convenient access to major attractions."
  },
  {
    name: "Novotel Suites Mumbai",
    location: "Mumbai, India",
    rating: 4,
    reviews: 1645,
    img: "https://images.unsplash.com/photo-1611892440504-42a792e24d32?q=80&w=1000&auto=format&fit=crop",
    facilities: ["Free Wi-Fi", "Gym", "Breakfast", "Pool", "Restaurant", "Room Service"],
    price: 7300,
    room: "Executive Suite",
    size: "45 m²",
    guests: "2 Adults",
    checkin: "2:00 PM",
    checkout: "12:00 PM",
    description: "Contemporary suites designed for comfortable business and leisure stays in Mumbai."
  },
  {
    name: "Marina Bay Sands",
    location: "Singapore",
    rating: 5,
    reviews: 5280,
    img: "https://images.unsplash.com/photo-1533105079780-92b9be482077?q=80&w=1000&auto=format&fit=crop",
    facilities: ["Infinity Pool", "Spa", "Free Wi-Fi", "Breakfast", "Casino", "Gym"],
    price: 24500,
    room: "Bay View Room",
    size: "50 m²",
    guests: "2 Adults",
    checkin: "3:00 PM",
    checkout: "11:00 AM",
    description: "Iconic luxury accommodation with skyline views, premium dining and world-class leisure facilities."
  },
  {
    name: "Burj Al Arab Jumeirah",
    location: "Dubai, UAE",
    rating: 5,
    reviews: 4920,
    img: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=1000&auto=format&fit=crop",
    facilities: ["Private Butler", "Pool", "Spa", "Free Wi-Fi", "Breakfast", "Beach Access"],
    price: 45000,
    room: "Luxury Suite",
    size: "170 m²",
    guests: "2 Adults",
    checkin: "3:00 PM",
    checkout: "12:00 PM",
    description: "Ultra-luxury suite experience with private butler service, exceptional views and signature hospitality."
  }
];

export const cabTypes = [
  { type: "Mini", icon: "fa-car", capacity: "4 Seats", baseFare: 250, perKm: 9 },
  { type: "Sedan", icon: "fa-car-side", capacity: "4 Seats", baseFare: 350, perKm: 12 },
  { type: "SUV", icon: "fa-truck-pickup", capacity: "6 Seats", baseFare: 500, perKm: 16 },
  { type: "Premium", icon: "fa-car-rear", capacity: "4 Seats", baseFare: 800, perKm: 22 }
];

export const compareData = [
  { provider: "IndiGo", service: "Flight VGA-HYD", price: "₹4,599", rating: "4.3★", duration: "2h 05m", cancel: "Free before 24h" },
  { provider: "MakeMyTrip", service: "Taj Exotica, Goa", price: "₹12,500/night", rating: "4.7★", duration: "Per night", cancel: "Free cancellation" },
  { provider: "Ola Cabs", service: "Sedan Airport Transfer", price: "₹650", rating: "4.2★", duration: "~35 mins", cancel: "Free before 1h" },
  { provider: "Vistara", service: "Flight VGA-HYD", price: "₹3,899 (1 stop)", rating: "4.5★", duration: "3h 45m", cancel: "Chargeable" }
];

export const destinations = [
  { name: "Goa", price: "₹8,999", img: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?q=85&w=900&auto=format&fit=crop" },
  { name: "Hyderabad", price: "₹4,499", img: "https://images.unsplash.com/photo-1600100397608-f70a3ec9ba39?q=85&w=900&auto=format&fit=crop" },
  { name: "Delhi", price: "₹3,999", img: "https://images.unsplash.com/photo-1587474260584-136574528ed5?q=85&w=900&auto=format&fit=crop" },
  { name: "Mumbai", price: "₹4,299", img: "https://images.unsplash.com/photo-1529253355930-ddbe423a2ac7?q=85&w=900&auto=format&fit=crop" },
  { name: "Dubai", price: "₹22,999", img: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=85&w=900&auto=format&fit=crop" },
  { name: "Paris", price: "₹45,999", img: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=85&w=900&auto=format&fit=crop" },
  { name: "Singapore", price: "₹28,499", img: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?q=85&w=900&auto=format&fit=crop" },
  { name: "Tokyo", price: "₹52,999", img: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?q=85&w=900&auto=format&fit=crop" }
];

export const initialTrips = [
  {
    id: "TE-FL-10234",
    type: "flight",
    icon: "fa-plane",
    color: "#0d6efd",
    title: "Vijayawada → Hyderabad (6E-234)",
    date: "12 Sep 2026, 06:15 AM",
    status: "confirmed",
    amount: 4599,
    airline: "IndiGo",
    code: "6E-234",
    route: "VGA → HYD",
    departure: "12 Sep 2026",
    passengers: "1 Adult",
    flightClass: "Economy"
  },
  {
    id: "TE-HT-88213",
    type: "hotel",
    icon: "fa-hotel",
    color: "#ff7a00",
    title: "Taj Exotica Resort, Goa (3 nights)",
    date: "18 Sep 2026 - 21 Sep 2026",
    status: "confirmed",
    amount: 37500,
    hotelName: "Taj Exotica Resort",
    location: "Goa, India",
    checkIn: "18 Sep 2026",
    checkOut: "21 Sep 2026",
    guests: "2 Guests",
    rooms: 1,
    nights: 3,
    pricePerNight: 12500
  },
  {
    id: "TE-CB-55021",
    type: "cab",
    icon: "fa-taxi",
    color: "#20c997",
    title: "Vijayawada Airport Pickup - Sedan",
    date: "10 Sep 2026, 09:00 PM",
    status: "pending",
    amount: 650,
    cabType: "Sedan",
    route: "Vijayawada Airport → Benz Circle",
    cabDate: "10 Sep 2026",
    cabTime: "09:00 PM"
  },
  {
    id: "TE-FL-10987",
    type: "flight",
    icon: "fa-plane",
    color: "#0d6efd",
    title: "Hyderabad → Vijayawada (AI-887)",
    date: "02 Aug 2026, 07:45 PM",
    status: "cancelled",
    amount: 5299,
    airline: "Air India",
    code: "AI-887",
    route: "HYD → VGA",
    departure: "02 Aug 2026",
    passengers: "1 Adult",
    flightClass: "Economy"
  }
];
