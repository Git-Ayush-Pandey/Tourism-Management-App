import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { BookingProvider } from "./context/BookingContext";
import { ThemeProvider } from "./context/ThemeContext";

import Navbar from "./components/common/Navbar";
import Footer from "./components/common/Footer";
import ProtectedRoute from "./components/auth/ProtectedRoute";

// Main Pages
import Home from "./pages/Home";
import Destinations from "./pages/Destinations";
import DestinationDetailPage from "./pages/DestinationDetailPage";
import Hotels from "./pages/Hotels";
import HotelDetailPage from "./pages/HotelDetailPage";
import Packages from "./pages/Packages";
import PackageDetailPage from "./pages/PackageDetailPage";
import Transport from "./pages/Transport";
import Bookings from "./pages/Bookings";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import NotFound from "./pages/NotFound";

// Admin pages & layout
import AdminLayout from "./components/admin/AdminLayout";
import Dashboard from "./components/admin/AdminDashboard";
import MyHotels from "./components/admin/ManageHotels";
import MyPackages from "./components/admin/ManagePackages";
import MyTransportServices from "./components/admin/MyTransportServices";
import MyBookings from "./components/admin/MyBookings";

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <BookingProvider>
          <Router>
            <div className="flex flex-col min-h-screen">
              <Navbar />

              <main className="flex-grow">
                <Routes>
                  {/* PUBLIC ROUTES */}
                  <Route path="/" element={<Home />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/signup" element={<Signup />} />

                  <Route path="/destinations" element={<Destinations />} />
                  <Route
                    path="/destinations/:id"
                    element={<DestinationDetailPage />}
                  />

                  <Route path="/hotels" element={<Hotels />} />
                  <Route path="/hotels/:id" element={<HotelDetailPage />} />

                  <Route path="/packages" element={<Packages />} />
                  <Route path="/packages/:id" element={<PackageDetailPage />} />

                  <Route path="/transport" element={<Transport />} />

                  {/* USER PROTECTED ROUTES */}
                  <Route
                    path="/bookings"
                    element={
                      <ProtectedRoute>
                        <Bookings />
                      </ProtectedRoute>
                    }
                  />

                  <Route
                    path="/profile"
                    element={
                      <ProtectedRoute>
                        <Profile />
                      </ProtectedRoute>
                    }
                  />

                  {/* ==================== ADMIN ROUTES ==================== */}
                  <Route
                    path="/admin"
                    element={
                      <ProtectedRoute adminOnly>
                        <AdminLayout />
                      </ProtectedRoute>
                    }
                  >
                    <Route index element={<Dashboard />} />
                    <Route path="hotels" element={<MyHotels />} />
                    <Route path="packages" element={<MyPackages />} />
                    <Route
                      path="transport-services"
                      element={<MyTransportServices />}
                    />
                    <Route path="bookings" element={<MyBookings />} />
                  </Route>

                  {/* NOT FOUND */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </main>

              <Footer />
            </div>
          </Router>
        </BookingProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
