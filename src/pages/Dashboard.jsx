import Sidebar from "../components/Sidebar";
import StatsCard from "../components/Dashboard/StatsCard";
import { useShipment } from "../context/ShipmentContext";
import { Link } from "react-router-dom";
import {
  FaBoxes,
  FaTruck,
  FaCheckCircle,
  FaHourglassHalf,
  FaCalendarAlt,
  FaPlus,
  FaSearch,
  FaMapMarkerAlt,
  FaIdBadge,
  FaCalendarDay,
} from "react-icons/fa";
import { useEffect, useState } from "react";

const Dashboard = () => {
  const { shipments, loading } = useShipment();
  const [recentShipments, setRecentShipments] = useState([]);

  // Process recent shipments when data loads
  useEffect(() => {
    if (shipments.length > 0) {
      const sortedShipments = [...shipments]
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 5);
      setRecentShipments(sortedShipments);
    }
  }, [shipments]);

  const stats = [
    {
      title: "Total Shipments",
      value: shipments.length,
      icon: "boxes", // Changed to string identifier
      color: "primary",
      iconComponent: <FaBoxes size={24} />, // Added icon component
    },
    {
      title: "In Transit",
      value: shipments.filter((s) => s.status === "In Transit").length,
      icon: "truck",
      color: "info",
      iconComponent: <FaTruck size={24} />,
    },
    {
      title: "Delivered",
      value: shipments.filter((s) => s.status === "Delivered").length,
      icon: "check-circle",
      color: "success",
      iconComponent: <FaCheckCircle size={24} />,
    },
    {
      title: "Processing",
      value: shipments.filter((s) => s.status === "Processing").length,
      icon: "hourglass",
      color: "warning",
      iconComponent: <FaHourglassHalf size={24} />,
    },
  ];

  return (
    <div className="d-flex">
      <Sidebar />
      <div className="flex-grow-1 p-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h1 className="h2 fw-bold mb-0">Dashboard Overview</h1>
          <div className="d-flex">
            <Link
              to="/shipments/create"
              className="btn btn-primary d-flex align-items-center"
            >
              <FaPlus className="me-2" /> New Shipment
            </Link>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-5">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : (
          <>
            <div className="row g-4 mb-4">
              {stats.map((stat, index) => (
                <div key={index} className="col-md-6 col-lg-3">
                  <StatsCard
                    title={stat.title}
                    value={stat.value}
                    icon={stat.icon}
                    color={stat.color}
                    iconComponent={stat.iconComponent}
                  />
                </div>
              ))}
            </div>

            <div className="row g-4">
              <div className="col-lg-8">
                <div className="card border-0 shadow-sm h-100">
                  <div className="card-header bg-white border-0 d-flex justify-content-between align-items-center">
                    <h5 className="mb-0 fw-bold">Recent Shipments</h5>
                    <Link
                      to="/shipments"
                      className="btn btn-sm btn-outline-primary"
                    >
                      View All
                    </Link>
                  </div>
                  <div className="card-body p-0">
                    {recentShipments.length > 0 ? (
                      <div className="list-group list-group-flush">
                        {recentShipments.map((shipment) => (
                          <div
                            key={shipment.id || shipment._id}
                            className="list-group-item border-0 py-3 px-4 hover-bg"
                          >
                            <div className="d-flex justify-content-between align-items-center">
                              <div>
                                <h6 className="mb-1 fw-bold d-flex align-items-center">
                                  <FaIdBadge className="me-2 text-muted" />
                                  {`#${recentShipments.indexOf(shipment) + 1}`}

                                </h6>
                                <small className="text-muted d-flex align-items-center">
                                  <FaMapMarkerAlt className="me-2" />
                                  {shipment.senderAddress?.split(",")[0] ||
                                    "Origin not specified"}{" "}
                                  →{" "}
                                  {shipment.receiverAddress?.split(",")[0] ||
                                    "Destination not specified"}
                                </small>
                              </div>
                              <div className="text-end">
                                <span
                                  className={`badge bg-${getStatusColor(
                                    shipment.status
                                  )}`}
                                >
                                  {shipment.status || "Unknown"}
                                </span>
                                <div className="text-muted small d-flex align-items-center mt-1">
                                  <FaCalendarDay className="me-1" />
                                  {shipment.createdAt
                                    ? new Date(
                                        shipment.createdAt
                                      ).toLocaleDateString()
                                    : "Date not available"}
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-5">
                        <FaSearch size={32} className="text-muted mb-3" />
                        <h5 className="text-muted">No recent shipments</h5>
                        <p className="text-muted mb-4">
                          Create your first shipment to get started
                        </p>
                        <Link
                          to="/shipments/create"
                          className="btn btn-primary"
                        >
                          <FaPlus className="me-2" /> Create Shipment
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="col-lg-4">
                <div className="card border-0 shadow-sm h-100">
                  <div className="card-header bg-white border-0">
                    <h5 className="mb-0 fw-bold">Shipping Statistics</h5>
                  </div>
                  <div className="card-body">
                    <div className="mb-4">
                      <h6 className="text-muted mb-3">Shipments by Status</h6>
                      <div className="d-flex flex-column gap-2">
                        {stats.slice(1).map((stat) => (
                          <div key={stat.title}>
                            <div className="d-flex justify-content-between mb-1">
                              <span>{stat.title}</span>
                              <span>
                                {stat.value} (
                                {Math.round(
                                  (stat.value / stats[0].value) * 100
                                )}
                                %)
                              </span>
                            </div>
                            <div className="progress" style={{ height: "8px" }}>
                              <div
                                className={`progress-bar bg-${stat.color}`}
                                role="progressbar"
                                style={{
                                  width: `${
                                    (stat.value / stats[0].value) * 100
                                  }%`,
                                }}
                              ></div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h6 className="text-muted mb-3">Monthly Summary</h6>
                      <div className="bg-light p-3 rounded text-center">
                        <p className="mb-2">Total shipments this month</p>
                        <h3 className="text-primary">{shipments.length}</h3>
                        <small className="text-muted">Updated just now</small>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

// Helper function to get status color
const getStatusColor = (status) => {
  switch (status) {
    case "Processing":
      return "warning";
    case "In Transit":
      return "info";
    case "Delivered":
      return "success";
    default:
      return "secondary";
  }
};

export default Dashboard;
