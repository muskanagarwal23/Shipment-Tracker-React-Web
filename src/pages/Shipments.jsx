import { useState } from "react";
import { Link } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { useShipment } from "../context/ShipmentContext";
import {
  FaSearch,
  FaPlus,
  FaBoxOpen,
  FaFilter,
  FaSort,
  FaTruck,
  FaCheckCircle,
  FaHourglassHalf,
  FaMapMarkerAlt,
  FaCalendarDay,
} from "react-icons/fa";

const Shipments = () => {
  const { shipments, loading } = useShipment();
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("newest");

  const getStatusIcon = (status) => {
    switch (status) {
      case "Processing":
        return <FaHourglassHalf className="text-warning" />;
      case "In Transit":
        return <FaTruck className="text-primary" />;
      case "Delivered":
        return <FaCheckCircle className="text-success" />;
      default:
        return <FaHourglassHalf className="text-secondary" />;
    }
  };

  const filteredShipments = shipments
    .filter((shipment) => {
      // Status filter
      if (filter !== "all" && shipment.status !== filter) return false;

      // Search term filter
      if (searchTerm) {
        const searchLower = searchTerm.toLowerCase();
        return (
          shipment.trackingNumber?.toLowerCase().includes(searchLower) ||
          shipment.senderName?.toLowerCase().includes(searchLower) ||
          shipment.receiverName?.toLowerCase().includes(searchLower) ||
          shipment.senderAddress?.toLowerCase().includes(searchLower) ||
          shipment.receiverAddress?.toLowerCase().includes(searchLower)
        );
      }
      return true;
    })
    .sort((a, b) => {
      // Sorting logic
      if (sortOption === "newest") {
        return new Date(b.createdAt) - new Date(a.createdAt);
      } else if (sortOption === "oldest") {
        return new Date(a.createdAt) - new Date(b.createdAt);
      } else if (sortOption === "price") {
        return (a.shippingCost || 0) - (b.shippingCost || 0);
      }
      return 0;
    });

  return (
    <div className="d-flex">
      <Sidebar />
      <div className="flex-grow-1 p-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h1 className="h2 fw-bold mb-0">My Shipments</h1>
          <Link
            to="/shipments/create"
            className="btn btn-primary d-flex align-items-center"
          >
            <FaPlus className="me-2" /> Create New
          </Link>
        </div>

        <div className="card border-0 shadow-sm mb-4">
          <div className="card-body p-3">
            <div className="row g-3 align-items-center">
              <div className="col-md-5">
                <div className="input-group">
                  <span className="input-group-text bg-white border-end-0">
                    <FaSearch className="text-muted" />
                  </span>
                  <input
                    type="text"
                    className="form-control border-start-0 ps-0"
                    placeholder="Search by tracking #, name, or address..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
              <div className="col-md-3">
                <div className="input-group">
                  <span className="input-group-text bg-white border-end-0">
                    <FaFilter className="text-muted" />
                  </span>
                  <select
                    className="form-control border-start-0 ps-0"
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                  >
                    <option value="all">All Statuses</option>
                    <option value="Processing">Processing</option>
                    <option value="In Transit">In Transit</option>
                    <option value="Delivered">Delivered</option>
                  </select>
                </div>
              </div>
              <div className="col-md-3">
                <div className="input-group">
                  <span className="input-group-text bg-white border-end-0">
                    <FaSort className="text-muted" />
                  </span>
                  <select
                    className="form-control border-start-0 ps-0"
                    value={sortOption}
                    onChange={(e) => setSortOption(e.target.value)}
                  >
                    <option value="newest">Newest First</option>
                    <option value="oldest">Oldest First</option>
                    <option value="price">Price: Low to High</option>
                  </select>
                </div>
              </div>
              <div className="col-md-1">
                <button
                  className="btn btn-outline-secondary w-100"
                  onClick={() => {
                    setSearchTerm("");
                    setFilter("all");
                    setSortOption("newest");
                  }}
                >
                  Reset
                </button>
              </div>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-5">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : filteredShipments.length === 0 ? (
          <div className="card border-0 shadow-sm">
            <div className="card-body text-center py-5">
              <FaBoxOpen size={48} className="text-muted mb-3" />
              <h5 className="text-muted">No shipments found</h5>
              <p className="text-muted mb-4">
                {shipments.length === 0
                  ? "You don't have any shipments yet."
                  : "Try adjusting your search or filters"}
              </p>
              <Link to="/shipments/create" className="btn btn-primary">
                <FaPlus className="me-2" /> Create Shipment
              </Link>
            </div>
          </div>
        ) : (
          <div className="row g-4">
            {filteredShipments.map((shipment, index) => (
              <div key={shipment.id} className="col-12">
                <div className="card border-0 shadow-sm h-100 hover-shadow transition-all">
                  <div className="card-body p-4">
                    <div className="d-flex justify-content-between align-items-start mb-3">
                      <div>
                        <h5 className="fw-bold mb-1 d-flex align-items-center">
                          <span className="badge bg-light text-dark me-2">
                            #{index + 1}
                          </span>
                          {getStatusIcon(shipment.status)}
                          <span className="ms-2">{shipment.status}</span>
                        </h5>
                        <div className="text-muted small">
                          Created:{" "}
                          {new Date(shipment.createdAt).toLocaleDateString()}
                        </div>
                      </div>
                      <Link
                        to={`/tracking/${shipment.id}`}
                        className="btn btn-sm btn-outline-primary"
                      >
                        Track Shipment
                      </Link>
                    </div>

                    <div className="row g-3">
                      <div className="col-md-6">
                        <div className="d-flex align-items-start mb-3">
                          <div className="flex-shrink-0 bg-primary bg-opacity-10 p-2 rounded me-3">
                            <FaMapMarkerAlt className="text-primary" />
                          </div>
                          <div>
                            <h6 className="mb-1">From</h6>
                            <p className="text-muted small mb-0">
                              {shipment.senderName || "N/A"}
                              <br />
                              {shipment.senderAddress ||
                                "Address not specified"}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="d-flex align-items-start mb-3">
                          <div className="flex-shrink-0 bg-success bg-opacity-10 p-2 rounded me-3">
                            <FaMapMarkerAlt className="text-success" />
                          </div>
                          <div>
                            <h6 className="mb-1">To</h6>
                            <p className="text-muted small mb-0">
                              {shipment.receiverName || "N/A"}
                              <br />
                              {shipment.receiverAddress ||
                                "Address not specified"}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="d-flex justify-content-between align-items-center border-top pt-3 mt-3">
                      <div className="d-flex align-items-center">
                        <FaCalendarDay className="text-muted me-2" />
                        <small className="text-muted">
                          Est. Delivery:{" "}
                          {shipment.deliveryDate
                            ? new Date(
                                shipment.deliveryDate
                              ).toLocaleDateString()
                            : "Not specified"}
                        </small>
                      </div>
                      <div className="text-end">
                        <span className="fw-bold">
                          $
                          {shipment.price
                            ? parseFloat(shipment.price).toFixed(2)
                            : "0.00"}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Shipments;
