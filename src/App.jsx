import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthContextProvider } from "./context/AuthContext";
import { ShipmentContextProvider } from "./context/ShipmentContext";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import Dashboard from "./pages/Dashboard";
import Shipments from "./pages/Shipments";
import PrivateRoute from "./components/Auth/PrivateRoute";
import CreateShipment from "./components/Shipment/CreateShipment"
import ShipmentDetails from "./components/Shipment/ShipmentDetails";
import Tracking from "./components/Shipment/Tracking";
import Features from "./pages/Features";
import Pricing from "./pages/Pricing";
import Support from "./pages/Support";
import Settings from "./pages/Settings";
import LiveTracking from "./components/LiveTracking";
import About from "./pages/About";

function App() {
  return (
    <Router>
      <AuthContextProvider>
        <ShipmentContextProvider>
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/features" element={<Features />} />
              <Route path="/pricing" element={<Pricing />} />
              <Route path="/support" element={<Support/>} />
              <Route path="/about" element={<About/>} />
              <Route
                path="/dashboard"
                element={
                  <PrivateRoute>
                    <Dashboard />
                  </PrivateRoute>
                }
              />
              <Route
                path="/shipments"
                element={
                  <PrivateRoute>
                    <Shipments />
                  </PrivateRoute>
                }
              />

              <Route
                path="/shipments/create"
                element={
                  <PrivateRoute>
                    <CreateShipment />
                  </PrivateRoute>
                }
              />

              <Route
                path="/tracking/:id"
                element={
                  <PrivateRoute>
                    <Tracking />
                  </PrivateRoute>
                }
              />

              <Route
                path="/shipments/:id"
                element={
                  <PrivateRoute>
                    <ShipmentDetails />
                  </PrivateRoute>
                }
              />

              <Route
                path="/settings"
                element={
                  <PrivateRoute>
                    <Settings />
                  </PrivateRoute>
                }
              />

              <Route
                path="/live-tracking"
                element={
                  <PrivateRoute>
                    <LiveTracking />
                  </PrivateRoute>
                }
              />


            </Routes>
          </Layout>
        </ShipmentContextProvider>
      </AuthContextProvider>
    </Router>
  );
}

export default App;