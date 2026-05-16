import React, { useState, useEffect } from "react";
import {
  LayoutDashboard,
  Map,
  LogOut,
  Search,
  Plus,
  Star,
  X,
  Trash2,
  ExternalLink,
  Upload,
  Calendar,
  Users,
  CheckCircle2,
  Clock,
  Moon,
  Sun,
  Truck,
  DollarSign,
} from "lucide-react";
import { Link } from "react-router-dom";

// Interfaces
interface Trip {
  id: string;
  name: string;
  description: string;
  rating: string;
  image: string;
}

interface Booking {
  id: string;
  customerName: string;
  email: string;
  phone: string;
  destination: string;
  totalPeople: number;
  totalCost: number;
  date: string;
  status: "Pending" | "Confirmed";
}

interface Bus {
  id: string;
  driverName: string;
  busPlate: string;
  rating: string;
  price: string;
  image: string;
}

const AdminPanel: React.FC = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showBusForm, setShowBusForm] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const [bookings, setBookings] = useState<Booking[]>(() => {
    const savedBookings = localStorage.getItem("school_bookings");
    return savedBookings ? JSON.parse(savedBookings) : [];
  });

  const [trips, setTrips] = useState<Trip[]>(() => {
    const savedTrips = localStorage.getItem("admin_trips");
    return savedTrips ? JSON.parse(savedTrips) : [];
  });

  const [buses, setBuses] = useState<Bus[]>(() => {
    const savedBuses = localStorage.getItem("admin_buses");
    return savedBuses ? JSON.parse(savedBuses) : [];
  });

  const [newTrip, setNewTrip] = useState({
    name: "",
    description: "",
    rating: "5.0",
    image: "",
  });

  const [newBus, setNewBus] = useState({
    driverName: "",
    busPlate: "",
    rating: "5.0",
    price: "",
    code: "",
    image: "",
  });

  useEffect(() => {
    localStorage.setItem("admin_trips", JSON.stringify(trips));
  }, [trips]);

  useEffect(() => {
    localStorage.setItem("school_bookings", JSON.stringify(bookings));
  }, [bookings]);

  useEffect(() => {
    localStorage.setItem("admin_buses", JSON.stringify(buses));
  }, [buses]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewTrip({ ...newTrip, image: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleBusImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewBus({ ...newBus, image: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleBusImageUrl = (url: string) => {
    setNewBus({ ...newBus, image: url });
  };

  const saveTrip = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTrip.image) return;
    const tripData: Trip = { ...newTrip, id: Date.now().toString() };
    setTrips([tripData, ...trips]);
    setNewTrip({ name: "", description: "", rating: "5.0", image: "" });
    setShowCreateForm(false);
  };

  const deleteTrip = (id: string) => setTrips(trips.filter((t) => t.id !== id));
  const deleteBooking = (id: string) =>
    setBookings(bookings.filter((b) => b.id !== id));
  const deleteBus = (id: string) => setBuses(buses.filter((b) => b.id !== id));

  const saveBus = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !newBus.image ||
      !newBus.driverName ||
      !newBus.busPlate ||
      !newBus.price
    )
      return;
    const busData: Bus = { ...newBus, id: Date.now().toString() };
    setBuses([busData, ...buses]);
    setNewBus({
      driverName: "",
      busPlate: "",
      rating: "5.0",
      price: "",
      code: "",
      image: "",
    });
    setShowBusForm(false);
  };

  return (
    <div
      className={`min-h-screen transition-colors duration-300 font-sans flex overflow-hidden ${
        isDarkMode
          ? "bg-slate-950 text-slate-100"
          : "bg-[#F8FAFC] text-slate-900"
      }`}
    >
      {/* SIDEBAR */}
      <aside
        className={`w-72 border-r p-6 flex flex-col fixed h-full z-50 shadow-sm transition-colors duration-300 ${
          isDarkMode
            ? "bg-slate-900 border-slate-800"
            : "bg-white border-slate-200"
        }`}
      >
        <div className="flex items-center mb-10 px-4">
          <h1
            className={`text-xl font-black uppercase tracking-widest ${
              isDarkMode ? "text-white" : "text-slate-800"
            }`}
          >
            Admin<span className="text-indigo-600">Panel</span>
          </h1>
        </div>

        <nav className="flex-1 space-y-1">
          <button
            onClick={() => setActiveTab("dashboard")}
            className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all ${
              activeTab === "dashboard"
                ? isDarkMode
                  ? "bg-indigo-900/30 text-indigo-400 font-bold"
                  : "bg-indigo-50 text-indigo-600 font-bold"
                : "text-slate-500 hover:bg-slate-50 hover:text-slate-800"
            }`}
          >
            <LayoutDashboard size={20} />
            <span className="text-sm font-medium">Dashboard</span>
          </button>

          <button
            onClick={() => setActiveTab("trips")}
            className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all ${
              activeTab === "trips"
                ? isDarkMode
                  ? "bg-indigo-900/30 text-indigo-400 font-bold"
                  : "bg-indigo-50 text-indigo-600 font-bold"
                : "text-slate-500 hover:bg-slate-50 hover:text-slate-800"
            }`}
          >
            <Map size={20} />
            <span className="text-sm font-medium">Manage Trips</span>
          </button>

          <button
            onClick={() => setActiveTab("bookings")}
            className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all ${
              activeTab === "bookings"
                ? isDarkMode
                  ? "bg-indigo-900/30 text-indigo-400 font-bold"
                  : "bg-indigo-50 text-indigo-600 font-bold"
                : "text-slate-500 hover:bg-slate-50 hover:text-slate-800"
            }`}
          >
            <Calendar size={20} />
            <span className="text-sm font-medium">View Bookings</span>
          </button>

          <button
            onClick={() => setActiveTab("buses")}
            className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all ${
              activeTab === "buses"
                ? isDarkMode
                  ? "bg-indigo-900/30 text-indigo-400 font-bold"
                  : "bg-indigo-50 text-indigo-600 font-bold"
                : "text-slate-500 hover:bg-slate-50 hover:text-slate-800"
            }`}
          >
            <Truck size={20} />
            <span className="text-sm font-medium">Manage Buses</span>
          </button>

          <div
            className={`pt-4 mt-4 border-t ${
              isDarkMode ? "border-slate-800" : "border-slate-100"
            }`}
          >
            <Link
              to="/"
              className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all ${
                isDarkMode
                  ? "text-slate-500 hover:text-indigo-400 hover:bg-slate-800"
                  : "text-slate-400 hover:text-indigo-600 hover:bg-slate-50"
              }`}
            >
              <ExternalLink size={20} />
              <span className="text-sm font-medium">Main Website</span>
            </Link>
          </div>
        </nav>

        <button
          className={`flex items-center gap-4 px-4 py-4 mt-auto transition-colors font-bold border-t ${
            isDarkMode
              ? "border-slate-800 text-slate-500 hover:text-red-400"
              : "border-slate-100 text-slate-400 hover:text-red-500"
          }`}
        >
          <LogOut size={20} /> Logout
        </button>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 ml-72 p-10 h-screen overflow-y-auto">
        <header className="flex justify-between items-center mb-10">
          <div className="relative group">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500 transition-colors"
              size={18}
            />
            <input
              type="text"
              placeholder="Search data..."
              className={`border rounded-2xl py-3 pl-12 pr-6 w-96 outline-none transition-all text-sm shadow-sm ${
                isDarkMode
                  ? "bg-slate-900 border-slate-800 text-white focus:border-indigo-500"
                  : "bg-white border-slate-200 focus:border-indigo-500/50"
              }`}
            />
          </div>

          {/* THEME SWITCHER - No border, No background */}
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className={`p-3 rounded-xl transition-all bg-transparent ${
              isDarkMode
                ? "text-amber-400 hover:bg-white/5"
                : "text-indigo-600 hover:bg-slate-100"
            }`}
          >
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </header>

        {activeTab === "dashboard" && (
          <div className="space-y-8 animate-in fade-in duration-500">
            <h2
              className={`text-2xl font-black ${
                isDarkMode ? "text-white" : "text-slate-800"
              }`}
            >
              System Overview
            </h2>
            <div className="grid grid-cols-4 gap-6">
              <div
                className={`border p-8 rounded-[2.5rem] shadow-sm transition-colors ${
                  isDarkMode
                    ? "bg-slate-900 border-slate-800"
                    : "bg-white border-slate-200"
                }`}
              >
                <Map className="text-indigo-600 mb-4" size={28} />
                <p className="text-slate-400 font-bold text-[10px] uppercase tracking-widest">
                  Active Trips
                </p>
                <p
                  className={`text-4xl font-black mt-1 ${
                    isDarkMode ? "text-white" : "text-slate-900"
                  }`}
                >
                  {trips.length}
                </p>
              </div>
              <div
                className={`border p-8 rounded-[2.5rem] shadow-sm transition-colors ${
                  isDarkMode
                    ? "bg-slate-900 border-slate-800"
                    : "bg-white border-slate-200"
                }`}
              >
                <Users className="text-emerald-500 mb-4" size={28} />
                <p className="text-slate-400 font-bold text-[10px] uppercase tracking-widest">
                  Total Bookings
                </p>
                <p
                  className={`text-4xl font-black mt-1 ${
                    isDarkMode ? "text-white" : "text-slate-900"
                  }`}
                >
                  {bookings.length}
                </p>
              </div>
              <div
                className={`border p-8 rounded-[2.5rem] shadow-sm transition-colors ${
                  isDarkMode
                    ? "bg-slate-900 border-slate-800"
                    : "bg-white border-slate-200"
                }`}
              >
                <Clock className="text-amber-500 mb-4" size={28} />
                <p className="text-slate-400 font-bold text-[10px] uppercase tracking-widest">
                  Pending Reviews
                </p>
                <p
                  className={`text-4xl font-black mt-1 ${
                    isDarkMode ? "text-white" : "text-slate-900"
                  }`}
                >
                  {bookings.filter((b) => b.status === "Pending").length}
                </p>
              </div>
              <div
                className={`border p-8 rounded-[2.5rem] shadow-sm transition-colors ${
                  isDarkMode
                    ? "bg-slate-900 border-slate-800"
                    : "bg-white border-slate-200"
                }`}
              >
                <DollarSign className="text-green-500 mb-4" size={28} />
                <p className="text-slate-400 font-bold text-[10px] uppercase tracking-widest">
                  Total Revenue
                </p>
                <p
                  className={`text-4xl font-black mt-1 ${
                    isDarkMode ? "text-white" : "text-slate-900"
                  }`}
                >
                  $
                  {bookings
                    .reduce((sum, b) => sum + b.totalCost, 0)
                    .toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        )}

        {activeTab === "trips" && (
          <div className="space-y-6 animate-in fade-in duration-500">
            <div className="flex justify-between items-end">
              <div>
                <h2
                  className={`text-2xl font-black ${
                    isDarkMode ? "text-white" : "text-slate-800"
                  }`}
                >
                  Manage Trips
                </h2>
                <p className="text-slate-500 text-sm mt-1">
                  Add destinations from your PC.
                </p>
              </div>
              <button
                onClick={() => setShowCreateForm(true)}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3.5 rounded-2xl font-bold flex items-center gap-2 transition-all shadow-lg shadow-indigo-100"
              >
                <Plus size={20} /> Add New Trip
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {trips.map((trip) => (
                <div
                  key={trip.id}
                  className={`group border rounded-[2rem] overflow-hidden hover:shadow-xl transition-all duration-300 ${
                    isDarkMode
                      ? "bg-slate-900 border-slate-800 hover:border-indigo-500"
                      : "bg-white border-slate-200 hover:border-indigo-200"
                  }`}
                >
                  <div className="h-48 w-full overflow-hidden relative">
                    <img
                      src={trip.image}
                      alt={trip.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <button
                      onClick={() => deleteTrip(trip.id)}
                      className="absolute top-4 right-4 p-2 bg-white/90 backdrop-blur rounded-full text-slate-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all shadow-sm"
                    >
                      <Trash2 size={16} />
                    </button>
                    <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full flex items-center gap-1 border border-slate-100 shadow-sm">
                      <Star
                        size={12}
                        className="text-amber-500 fill-amber-500"
                      />
                      <span className="text-xs font-bold text-slate-800">
                        {trip.rating}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h4
                      className={`text-lg font-bold mb-2 ${
                        isDarkMode ? "text-white" : "text-slate-900"
                      }`}
                    >
                      {trip.name}
                    </h4>
                    <p className="text-slate-500 text-sm line-clamp-2 leading-relaxed">
                      {trip.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "bookings" && (
          <div className="space-y-6 animate-in fade-in duration-500">
            <div>
              <h2
                className={`text-2xl font-black ${
                  isDarkMode ? "text-white" : "text-slate-800"
                }`}
              >
                Customer Bookings
              </h2>
              <p className="text-slate-500 text-sm mt-1">Real-time requests.</p>
            </div>
            <div
              className={`border rounded-[2rem] overflow-hidden shadow-sm transition-colors ${
                isDarkMode
                  ? "bg-slate-900 border-slate-800"
                  : "bg-white border-slate-200"
              }`}
            >
              <table className="w-full text-left border-collapse">
                <thead
                  className={`${
                    isDarkMode
                      ? "bg-slate-800/50 border-slate-700"
                      : "bg-slate-50 border-slate-100"
                  } border-b text-[10px] font-black uppercase text-slate-400 tracking-widest`}
                >
                  <tr>
                    <th className="p-6">Customer</th>
                    <th className="p-6">Destination</th>
                    <th className="p-6 text-center">Group</th>
                    <th className="p-6">Cost</th>
                    <th className="p-6">Status</th>
                    <th className="p-6 text-right">Action</th>
                  </tr>
                </thead>
                <tbody
                  className={`divide-y ${isDarkMode ? "divide-slate-800" : "divide-slate-50"}`}
                >
                  {bookings.map((booking) => (
                    <tr
                      key={booking.id}
                      className="hover:bg-indigo-500/5 transition-colors"
                    >
                      <td className="p-6">
                        <p
                          className={`font-bold ${
                            isDarkMode ? "text-slate-200" : "text-slate-900"
                          }`}
                        >
                          {booking.customerName}
                        </p>
                        <p className="text-xs text-slate-400 font-medium">
                          {booking.email}
                        </p>
                      </td>
                      <td
                        className={`p-6 font-medium ${
                          isDarkMode ? "text-slate-400" : "text-slate-600"
                        }`}
                      >
                        {booking.destination}
                      </td>
                      <td className="p-6 text-center">
                        <span
                          className={`px-3 py-1 rounded-lg text-xs font-bold ${
                            isDarkMode
                              ? "bg-indigo-900/30 text-indigo-400"
                              : "bg-indigo-50 text-indigo-600"
                          }`}
                        >
                          {booking.totalPeople}
                        </span>
                      </td>
                      <td className="p-6 text-emerald-600 font-bold">
                        ${booking.totalCost}
                      </td>
                      <td className="p-6">
                        <span
                          className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-1 w-fit ${
                            booking.status === "Confirmed"
                              ? "bg-emerald-100 text-emerald-600"
                              : "bg-amber-100 text-amber-600"
                          }`}
                        >
                          {booking.status === "Confirmed" ? (
                            <CheckCircle2 size={12} />
                          ) : (
                            <Clock size={12} />
                          )}
                          {booking.status}
                        </span>
                      </td>
                      <td className="p-6 text-right">
                        <button
                          onClick={() => deleteBooking(booking.id)}
                          className="p-2 text-slate-300 hover:text-red-500 transition-colors"
                        >
                          <Trash2 size={18} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === "buses" && (
          <div className="space-y-6 animate-in fade-in duration-500">
            <div className="flex justify-between items-end">
              <div>
                <h2
                  className={`text-2xl font-black ${
                    isDarkMode ? "text-white" : "text-slate-800"
                  }`}
                >
                  Manage Buses
                </h2>
                <p className="text-slate-500 text-sm mt-1">
                  Add and manage your fleet.
                </p>
              </div>
              <button
                onClick={() => setShowBusForm(true)}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3.5 rounded-2xl font-bold flex items-center gap-2 transition-all shadow-lg shadow-indigo-100"
              >
                <Plus size={20} /> Add Bus
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {buses.map((bus) => (
                <div
                  key={bus.id}
                  className={`group border rounded-[2rem] overflow-hidden hover:shadow-xl transition-all duration-300 ${
                    isDarkMode
                      ? "bg-slate-900 border-slate-800 hover:border-indigo-500"
                      : "bg-white border-slate-200 hover:border-indigo-200"
                  }`}
                >
                  <div className="h-48 w-full overflow-hidden relative">
                    <img
                      src={bus.image}
                      alt={bus.busPlate}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <button
                      onClick={() => deleteBus(bus.id)}
                      className="absolute top-4 right-4 p-2 bg-white/90 backdrop-blur rounded-full text-slate-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all shadow-sm"
                    >
                      <Trash2 size={16} />
                    </button>
                    <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full flex items-center gap-1 border border-slate-100 shadow-sm">
                      <Star
                        size={12}
                        className="text-amber-500 fill-amber-500"
                      />
                      <span className="text-xs font-bold text-slate-800">
                        {bus.rating}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h4
                      className={`text-lg font-bold mb-1 ${
                        isDarkMode ? "text-white" : "text-slate-900"
                      }`}
                    >
                      {bus.driverName}
                    </h4>
                    <p className="text-slate-500 text-sm font-medium mb-3">
                      {bus.busPlate}
                    </p>
                    <p className="text-emerald-600 text-base font-black">
                      ${bus.price}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* BUS FORM MODAL */}
      {showBusForm && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
          <div
            className={`w-full max-w-sm rounded-[2rem] p-6 relative animate-in zoom-in-95 duration-200 shadow-2xl border ${
              isDarkMode
                ? "bg-slate-900 border-slate-800"
                : "bg-white border-slate-200"
            }`}
          >
            <button
              onClick={() => setShowBusForm(false)}
              className="absolute right-6 top-6 text-slate-400 hover:text-slate-900 transition-colors"
            >
              <X size={20} />
            </button>
            <h3
              className={`text-lg font-bold mb-1 text-center ${
                isDarkMode ? "text-white" : "text-slate-900"
              }`}
            >
              Add New Bus
            </h3>
            <form onSubmit={saveBus} className="space-y-3">
              <div className="space-y-1.5">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">
                  Bus Image
                </label>
                <div className="space-y-2">
                  <label
                    className={`relative flex flex-col items-center justify-center w-full h-24 border-2 border-dashed rounded-xl cursor-pointer transition-all overflow-hidden group ${
                      isDarkMode
                        ? "bg-slate-800 border-slate-700 hover:border-indigo-500"
                        : "bg-slate-50 border-slate-200 hover:bg-slate-100 hover:border-indigo-300"
                    }`}
                  >
                    {newBus.image ? (
                      <img
                        src={newBus.image}
                        alt="Preview"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="flex flex-col items-center justify-center">
                        <Upload className="w-6 h-6 text-slate-300 mb-1 group-hover:text-indigo-500" />
                        <p className="text-[10px] text-slate-400 font-bold">
                          Upload Image
                        </p>
                      </div>
                    )}
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleBusImageUpload}
                    />
                  </label>
                  <div className="flex gap-2 items-center">
                    <span className="text-slate-400 text-[10px] font-bold">
                      OR
                    </span>
                  </div>
                  <input
                    type="url"
                    placeholder="Paste image URL"
                    className={`w-full border rounded-xl p-2.5 outline-none transition-all text-xs ${
                      isDarkMode
                        ? "bg-slate-800 border-slate-700 text-white focus:border-indigo-500"
                        : "bg-slate-50 border-slate-200 focus:bg-white focus:border-indigo-500/50"
                    }`}
                    value={newBus.image.startsWith("http") ? newBus.image : ""}
                    onChange={(e) => handleBusImageUrl(e.target.value)}
                  />
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">
                  Driver Name
                </label>
                <input
                  required
                  className={`w-full border rounded-xl p-2.5 outline-none transition-all text-sm ${
                    isDarkMode
                      ? "bg-slate-800 border-slate-700 text-white focus:border-indigo-500"
                      : "bg-slate-50 border-slate-200 focus:bg-white focus:border-indigo-500/50"
                  }`}
                  placeholder="e.g., John Smith"
                  onChange={(e) =>
                    setNewBus({ ...newBus, driverName: e.target.value })
                  }
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">
                    Bus Plate
                  </label>
                  <input
                    required
                    className={`w-full border rounded-xl p-2.5 outline-none transition-all text-sm ${
                      isDarkMode
                        ? "bg-slate-800 border-slate-700 text-white focus:border-indigo-500"
                        : "bg-slate-50 border-slate-200 focus:bg-white focus:border-indigo-500/50"
                    }`}
                    placeholder="e.g., ABC-1234"
                    onChange={(e) =>
                      setNewBus({ ...newBus, busPlate: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">
                    Rating
                  </label>
                  <input
                    required
                    type="number"
                    step="0.1"
                    min="1"
                    max="5"
                    defaultValue="5.0"
                    className={`w-full border rounded-xl p-2.5 outline-none text-sm ${
                      isDarkMode
                        ? "bg-slate-800 border-slate-700 text-white"
                        : "bg-slate-50 border-slate-200"
                    }`}
                    onChange={(e) =>
                      setNewBus({ ...newBus, rating: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">
                  Price per Trip ($)
                </label>
                <input
                  required
                  type="number"
                  step="0.01"
                  min="0"
                  placeholder="e.g., 150.00"
                  className={`w-full border rounded-xl p-2.5 outline-none transition-all text-sm ${
                    isDarkMode
                      ? "bg-slate-800 border-slate-700 text-white focus:border-indigo-500"
                      : "bg-slate-50 border-slate-200 focus:bg-white focus:border-indigo-500/50"
                  }`}
                  onChange={(e) =>
                    setNewBus({ ...newBus, price: e.target.value })
                  }
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">
                  HTML Code (Optional)
                </label>
                <textarea
                  className={`w-full border rounded-xl p-2.5 outline-none transition-all text-xs font-mono min-h-[60px] resize-none ${
                    isDarkMode
                      ? "bg-slate-800 border-slate-700 text-white focus:border-indigo-500"
                      : "bg-slate-50 border-slate-200 focus:bg-white focus:border-indigo-500/50"
                  }`}
                  placeholder="e.g., <h1>Custom Title</h1>"
                  onChange={(e) =>
                    setNewBus({ ...newBus, code: e.target.value })
                  }
                />
              </div>
              <button
                type="submit"
                disabled={
                  !newBus.image ||
                  !newBus.driverName ||
                  !newBus.busPlate ||
                  !newBus.price
                }
                className="w-full h-10 mt-2 bg-indigo-600 text-white rounded-xl font-bold text-sm tracking-widest shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition-all active:scale-95 disabled:opacity-50"
              >
                ADD BUS
              </button>
            </form>
          </div>
        </div>
      )}

      {/* CREATE FORM MODAL */}
      {showCreateForm && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-900/40 backdrop-blur-sm">
          <div
            className={`w-full max-w-lg rounded-[2.5rem] p-10 relative animate-in zoom-in-95 duration-200 shadow-2xl border ${
              isDarkMode
                ? "bg-slate-900 border-slate-800"
                : "bg-white border-slate-200"
            }`}
          >
            <button
              onClick={() => setShowCreateForm(false)}
              className="absolute right-8 top-8 text-slate-400 hover:text-slate-900 transition-colors"
            >
              <X size={24} />
            </button>
            <h3
              className={`text-2xl font-bold mb-1 text-center ${
                isDarkMode ? "text-white" : "text-slate-900"
              }`}
            >
              New Destination
            </h3>
            <form onSubmit={saveTrip} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">
                  Cover Image
                </label>
                <label
                  className={`relative flex flex-col items-center justify-center w-full h-40 border-2 border-dashed rounded-3xl cursor-pointer transition-all overflow-hidden group ${
                    isDarkMode
                      ? "bg-slate-800 border-slate-700 hover:border-indigo-500"
                      : "bg-slate-50 border-slate-200 hover:bg-slate-100 hover:border-indigo-300"
                  }`}
                >
                  {newTrip.image ? (
                    <img
                      src={newTrip.image}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center">
                      <Upload className="w-8 h-8 text-slate-300 mb-2 group-hover:text-indigo-500" />
                      <p className="text-xs text-slate-400 font-bold">
                        Select Image
                      </p>
                    </div>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageUpload}
                  />
                </label>
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">
                  Name
                </label>
                <input
                  required
                  className={`w-full border rounded-2xl p-4 outline-none transition-all ${
                    isDarkMode
                      ? "bg-slate-800 border-slate-700 text-white focus:border-indigo-500"
                      : "bg-slate-50 border-slate-200 focus:bg-white focus:border-indigo-500/50"
                  }`}
                  onChange={(e) =>
                    setNewTrip({ ...newTrip, name: e.target.value })
                  }
                />
              </div>
              <div className="grid grid-cols-4 gap-4">
                <div className="col-span-3 space-y-1.5">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">
                    Description
                  </label>
                  <textarea
                    required
                    className={`w-full border rounded-2xl p-4 outline-none transition-all min-h-[100px] ${
                      isDarkMode
                        ? "bg-slate-800 border-slate-700 text-white focus:border-indigo-500"
                        : "bg-slate-50 border-slate-200 focus:bg-white focus:border-indigo-500/50"
                    }`}
                    onChange={(e) =>
                      setNewTrip({ ...newTrip, description: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">
                    Rating
                  </label>
                  <input
                    required
                    type="number"
                    step="0.1"
                    min="1"
                    max="5"
                    defaultValue="5.0"
                    className={`w-full border rounded-2xl p-4 outline-none ${
                      isDarkMode
                        ? "bg-slate-800 border-slate-700 text-white"
                        : "bg-slate-50 border-slate-200"
                    }`}
                    onChange={(e) =>
                      setNewTrip({ ...newTrip, rating: e.target.value })
                    }
                  />
                </div>
              </div>
              <button
                type="submit"
                disabled={!newTrip.image}
                className="w-full h-16 mt-4 bg-indigo-600 text-white rounded-2xl font-black tracking-widest shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition-all active:scale-95 disabled:opacity-50"
              >
                {newTrip.image ? "PUBLISH NOW" : "UPLOAD IMAGE"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPanel;
