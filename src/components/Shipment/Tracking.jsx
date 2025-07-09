import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useShipment } from "../../context/ShipmentContext";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import iconRetinaUrl from "leaflet/dist/images/marker-icon-2x.png";
import iconUrl from "leaflet/dist/images/marker-icon.png";
import shadowUrl from "leaflet/dist/images/marker-shadow.png";
import {
  FaTruck,
  FaCheckCircle,
  FaHourglass,
  FaBox,
  FaMapMarkerAlt,
  FaPhone,
  FaUser,
  FaCalendarAlt,
  FaWeightHanging,
  FaRuler,
  FaShippingFast,
  FaExclamationTriangle,
} from "react-icons/fa";

const Tracking = () => {
  const { id } = useParams();
  const { getShipment, updateStatus } = useShipment();
  const [shipment, setShipment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [trackingHistory, setTrackingHistory] = useState([]);

  // Initialize leaflet icon
  delete L.Icon.Default.prototype._getIconUrl;
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: iconRetinaUrl,
    iconUrl: iconUrl,
    shadowUrl: shadowUrl,
  });

  const getCoordinatesForCity = (cityName) => {
    const cityCoords = {
      Mumbai: [19.076, 72.8777],
      Delhi: [28.6139, 77.209],
      Destination: [22.5726, 88.3639],
      Origin: [19.076, 72.8777], // fallback origin
      "In Transit": [21.1458, 79.0882], // example in transit coord
    };
    return cityCoords[cityName] || [19.076, 72.8777];
  };

  const handleMarkDelivered = async () => {
    try {
      await updateStatus(shipment._id || id, "Delivered");
      setShipment({ ...shipment, status: "Delivered" });
      // Update current location and tracking history status as well
      const updatedTrackingHistory = trackingHistory.map((loc) =>
        loc.status === "Delivered" ? loc : { ...loc, status: "Delivered" }
      );
      setTrackingHistory(updatedTrackingHistory);
      setCurrentLocation(updatedTrackingHistory[updatedTrackingHistory.length - 1]);
    } catch (err) {
      console.error("Error updating status:", err.message);
    }
  };

  useEffect(() => {
    const fetchShipment = async () => {
      try {
        const data = await getShipment(id);
        setShipment(data);

        const calculatedLocations = [
          {
            city: data.senderAddress?.split(",")[0] || "Origin",
            date: data.createdAt,
            status: "Processing",
          },
          {
            city: "In Transit", // midpoint or can be improved
            date: data.createdAt
              ? new Date(new Date(data.createdAt).getTime() + 86400000).toISOString() // +1 day
              : new Date().toISOString(),
            status: "In Transit",
          },
          {
            city: data.receiverAddress?.split(",")[0] || "Destination",
            date: data.deliveryDate || new Date().toISOString(),
            status: data.status,
          },
        ];

        setTrackingHistory(calculatedLocations);

        if (data.status === "Processing") {
          setCurrentLocation(calculatedLocations[0]);
        } else if (data.status === "In Transit") {
          setCurrentLocation(calculatedLocations[1]);
        } else {
          setCurrentLocation(calculatedLocations[2]);
        }
      } catch (error) {
        console.error("Error fetching shipment:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchShipment();
  }, [id, getShipment]);

  const getStatusInfo = (status) => {
    switch (status) {
      case "Processing":
        return { color: "warning", icon: <FaHourglass />, text: "Processing" };
      case "In Transit":
        return { color: "primary", icon: <FaTruck />, text: "In Transit" };
      case "Delivered":
        return { color: "success", icon: <FaCheckCircle />, text: "Delivered" };
      default:
        return { color: "secondary", icon: <FaBox />, text: "Processing" };
    }
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div
          className="spinner-border text-primary"
          style={{ width: "3rem", height: "3rem" }}
          role="status"
        >
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (!shipment) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div
          className="alert alert-danger d-flex align-items-center"
          style={{ maxWidth: "500px" }}
        >
          <FaExclamationTriangle className="me-2" />
          <div>Shipment not found</div>
        </div>
      </div>
    );
  }

  const statusInfo = getStatusInfo(shipment.status);

  return (
    <div className="container py-4">
      {/* Header Card */}
      <div className="card border-0 shadow-sm mb-4">
        <div className="card-body p-4">
          <div className="d-flex justify-content-between align-items-center flex-wrap">
            <div>
              <h1 className="h4 fw-bold mb-1">Tracking Shipment #{id}</h1>
              <div className="d-flex align-items-center text-muted">
                <FaCalendarAlt className="me-2" />
                <small>
                  Created: {shipment.createdAt ? new Date(shipment.createdAt).toLocaleDateString() : "Not specified"}
                </small>
              </div>
            </div>
            <div
              className={`badge bg-${statusInfo.color}-subtle text-${statusInfo.color} fs-6 px-3 py-2 mt-2 mt-md-0`}
            >
              <span className="d-flex align-items-center">
                {statusInfo.icon}
                <span className="ms-2">{statusInfo.text}</span>
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="row g-4">
        {/* Main Content Column */}
        <div className="col-lg-8">
          {/* Map Section */}
          <div className="card border-0 shadow-sm mb-4">
            <div className="card-header bg-white border-0">
              <h2 className="h5 mb-0">Live Location</h2>
            </div>
            <div className="card-body p-0">
              <div className="ratio ratio-16x9">
                <MapContainer
                  center={getCoordinatesForCity(currentLocation?.city)}
                  zoom={8}
                  style={{ height: "100%", width: "100%" }}
                  className="rounded-bottom"
                >
                  <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  <Marker position={getCoordinatesForCity(currentLocation?.city)}>
                    <Popup>
                      {currentLocation?.city} — {currentLocation?.status}
                    </Popup>
                  </Marker>
                </MapContainer>
              </div>
            </div>
          </div>

          {/* Route Progress */}
          <div className="card border-0 shadow-sm">
            <div className="card-header bg-white border-0">
              <h2 className="h5 mb-0">Delivery Progress</h2>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-md-5">
                  <div className="d-flex align-items-center mb-3">
                    <div className="bg-primary bg-opacity-10 p-2 rounded-circle me-3">
                      <FaMapMarkerAlt className="text-primary" />
                    </div>
                    <div>
                      <h6 className="mb-1">From</h6>
                      <p className="mb-0 fw-medium">
                        {shipment.senderAddress?.split(",")[0] || "Origin"}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-md-2 text-center d-none d-md-block">
                  <div className="h-100 d-flex align-items-center justify-content-center">
                    <div className="border-top w-100"></div>
                  </div>
                </div>
                <div className="col-md-5">
                  <div className="d-flex align-items-center mb-3">
                    <div className="bg-success bg-opacity-10 p-2 rounded-circle me-3">
                      <FaMapMarkerAlt className="text-success" />
                    </div>
                    <div>
                      <h6 className="mb-1">To</h6>
                      <p className="mb-0 fw-medium">
                        {shipment.receiverAddress?.split(",")[0] || "Destination"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="progress" style={{ height: "8px" }}>
                <div
                  className={`progress-bar bg-${statusInfo.color}`}
                  role="progressbar"
                  style={{
                    width:
                      shipment.status === "Processing"
                        ? "30%"
                        : shipment.status === "In Transit"
                        ? "70%"
                        : "100%",
                  }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar Column */}
        <div className="col-lg-4">
          {/* Tracking Timeline */}
          <div className="card border-0 shadow-sm mb-4">
            <div className="card-header bg-white border-0">
              <h2 className="h5 mb-0">Tracking History</h2>
            </div>
            <div className="card-body">
              <div className="timeline-vertical">
                {trackingHistory.map((location, index) => (
                  <div
                    key={index}
                    className={`timeline-item ${
                      currentLocation?.city === location.city ? "active" : ""
                    } ${
                      index <
                      trackingHistory.findIndex(
                        (l) => l.city === currentLocation?.city
                      )
                        ? "completed"
                        : ""
                    }`}
                  >
                    <div className="timeline-icon">
                      {index <
                      trackingHistory.findIndex(
                        (l) => l.city === currentLocation?.city
                      ) ? (
                        <FaCheckCircle className="text-success" />
                      ) : currentLocation?.city === location.city ? (
                        <span
                          className={`text-${
                            getStatusInfo(location.status).color
                          }`}
                        >
                          {getStatusInfo(location.status).icon}
                        </span>
                      ) : (
                        <span className="text-muted">
                          <FaCheckCircle />
                        </span>
                      )}
                    </div>
                    <div className="timeline-content">
                      <h6 className="mb-1">{location.city}</h6>
                      <small className="text-muted">
                        {location.date
                          ? new Date(location.date).toLocaleString()
                          : "Not specified"}
                      </small>
                      <p className="small mb-0 text-capitalize">
                        {location.status}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              {shipment.status !== "Delivered" && (
                <button
                  className="btn btn-success w-100 mt-3 d-flex align-items-center justify-content-center"
                  onClick={handleMarkDelivered}
                >
                  <FaCheckCircle className="me-2" />
                  Mark as Delivered
                </button>
              )}
            </div>
          </div>

          {/* Quick Details */}
          <div className="card border-0 shadow-sm">
            <div className="card-header bg-white border-0">
              <h2 className="h5 mb-0">Quick Details</h2>
            </div>
            <div className="card-body">
              <div className="d-flex mb-3">
                <div className="bg-light p-2 rounded-circle me-3">
                  <FaShippingFast className="text-primary" />
                </div>
                <div>
                  <h6 className="mb-1">Shipping Method</h6>
                  <p className="mb-0 text-capitalize">
                    {shipment.shippingMethod || "Not specified"}
                  </p>
                </div>
              </div>
              <div className="d-flex mb-3">
                <div className="bg-light p-2 rounded-circle me-3">
                  <FaWeightHanging className="text-primary" />
                </div>
                <div>
                  <h6 className="mb-1">Weight</h6>
                  <p className="mb-0">
                    {shipment.packageWeight || "Not specified"} kg
                  </p>
                </div>
              </div>
              <div className="d-flex">
                <div className="bg-light p-2 rounded-circle me-3">
                  <FaRuler className="text-primary" />
                </div>
                <div>
                  <h6 className="mb-1">Dimensions</h6>
                  <p className="mb-0">
                    {shipment.packageDimensions
                      ? shipment.packageDimensions.split("x").join(" × ") + " cm"
                      : "Not specified"}
                  </p>
                </div>
              </div>

              <div className="d-flex mt-3">
                <div className="bg-light p-2 rounded-circle me-3">
                  <FaCalendarAlt className="text-primary" />
                </div>
                <div>
                  <h6 className="mb-1">Delivery Date</h6>
                  <p className="mb-0">
                    {shipment.deliveryDate
                      ? new Date(shipment.deliveryDate).toLocaleDateString()
                      : "Not specified"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Detailed Information Sections */}
      <div className="row g-4 mt-2">
        {/* Sender Information */}
        <div className="col-md-6">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-header bg-white border-0">
              <h2 className="h5 mb-0">Sender Information</h2>
            </div>
            <div className="card-body">
              <div className="d-flex mb-4">
                <div className="bg-primary bg-opacity-10 p-3 rounded-circle me-3">
                  <FaUser className="text-primary" />
                </div>
                <div>
                  <h6 className="mb-1">Name</h6>
                  <p className="mb-0 fw-medium">
                    {shipment.senderName || "Not specified"}
                  </p>
                </div>
              </div>
              <div className="d-flex mb-4">
                <div className="bg-primary bg-opacity-10 p-3 rounded-circle me-3">
                  <FaMapMarkerAlt className="text-primary" />
                </div>
                <div>
                  <h6 className="mb-1">Address</h6>
                  <p className="mb-0 fw-medium">
                    {shipment.senderAddress || "Not specified"}
                  </p>
                </div>
              </div>
              <div className="d-flex">
                <div className="bg-primary bg-opacity-10 p-3 rounded-circle me-3">
                  <FaPhone className="text-primary" />
                </div>
                <div>
                  <h6 className="mb-1">Phone</h6>
                  <p className="mb-0 fw-medium">
                    {shipment.senderPhone || "Not specified"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Receiver Information */}
        <div className="col-md-6">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-header bg-white border-0">
              <h2 className="h5 mb-0">Receiver Information</h2>
            </div>
            <div className="card-body">
              <div className="d-flex mb-4">
                <div className="bg-success bg-opacity-10 p-3 rounded-circle me-3">
                  <FaUser className="text-success" />
                </div>
                <div>
                  <h6 className="mb-1">Name</h6>
                  <p className="mb-0 fw-medium">
                    {shipment.receiverName || "Not specified"}
                  </p>
                </div>
              </div>
              <div className="d-flex mb-4">
                <div className="bg-success bg-opacity-10 p-3 rounded-circle me-3">
                  <FaMapMarkerAlt className="text-success" />
                </div>
                <div>
                  <h6 className="mb-1">Address</h6>
                  <p className="mb-0 fw-medium">
                    {shipment.receiverAddress || "Not specified"}
                  </p>
                </div>
              </div>
              <div className="d-flex">
                <div className="bg-success bg-opacity-10 p-3 rounded-circle me-3">
                  <FaPhone className="text-success" />
                </div>
                <div>
                  <h6 className="mb-1">Phone</h6>
                  <p className="mb-0 fw-medium">
                    {shipment.receiverPhone || "Not specified"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tracking;
