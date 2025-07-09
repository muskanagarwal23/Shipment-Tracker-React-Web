import { useState, useEffect } from "react";
import { useShipment } from "../context/ShipmentContext";
import { Link } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";
import { 
  FaTruck, FaSearch, FaMapMarkerAlt, FaClock, 
  FaBoxOpen, FaExclamationTriangle, FaSync 
} from "react-icons/fa";

const LiveTracking = () => {
  const { user } = UserAuth();
  const { shipments, loading, error, fetchShipments } = useShipment();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [retryCount, setRetryCount] = useState(0);

  // Filter shipments based on search and status
  const filteredShipments = shipments.filter((shipment) => {
    const matchesSearch = shipment.trackingNumber?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         shipment.receiverName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         shipment.senderName?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || shipment.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status) => {
    switch (status) {
      case "Processing": return "bg-warning text-dark";
      case "In Transit": return "bg-primary text-white";
      case "Delivered": return "bg-success text-white";
      default: return "bg-secondary text-white";
    }
  };

  const handleRetry = () => {
    setRetryCount(retryCount + 1);
    fetchShipments();
  };

  useEffect(() => {
    if (!user) return;
    fetchShipments();
  }, [user, retryCount]);

  if (!user) {
    return (
      <div className="container py-5 text-center">
        <div className="card border-0 shadow-sm">
          <div className="card-body py-5">
            <FaExclamationTriangle size={48} className="text-danger mb-3" />
            <h3 className="mb-3">Authentication Required</h3>
            <p className="text-muted mb-4">
              Please sign in to view your shipments.
            </p>
            <Link to="/login" className="btn btn-primary">
              Sign In
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container py-5 text-center">
        <div className="card border-0 shadow-sm">
          <div className="card-body py-5">
            <FaExclamationTriangle size={48} className="text-danger mb-3" />
            <h3 className="mb-3">Error Loading Shipments</h3>
            <p className="text-muted mb-4">
              {error.message || "You don't have permission to view these shipments."}
            </p>
            <button 
              onClick={handleRetry}
              className="btn btn-primary d-inline-flex align-items-center"
            >
              <FaSync className="me-2" />
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (loading && retryCount === 0) {
    return (
      <div className="d-flex justify-content-center py-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-4">
      <div className="card border-0 shadow-sm mb-4">
        <div className="card-header bg-white">
          <h2 className="h4 mb-0 d-flex align-items-center">
            <FaTruck className="me-2 text-primary" /> My Shipments
          </h2>
        </div>
        <div className="card-body">
          <div className="row g-3 mb-4">
            <div className="col-md-6">
              <div className="input-group">
                <span className="input-group-text">
                  <FaSearch />
                </span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search my shipments..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <div className="col-md-4">
              <select
                className="form-select"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="all">All Statuses</option>
                <option value="Processing">Processing</option>
                <option value="In Transit">In Transit</option>
                <option value="Delivered">Delivered</option>
              </select>
            </div>
            <div className="col-md-2">
              <button 
                className="btn btn-outline-secondary w-100"
                onClick={() => {
                  setSearchTerm("");
                  setStatusFilter("all");
                }}
              >
                Reset
              </button>
            </div>
          </div>

          {filteredShipments.length === 0 && !loading ? (
            <div className="text-center py-5">
              <FaBoxOpen size={48} className="text-muted mb-3" />
              <h5 className="text-muted">No shipments found</h5>
              <p className="text-muted">
                {shipments.length === 0 
                  ? "You haven't created any shipments yet." 
                  : "No shipments match your search criteria"}
              </p>
              <Link to="/shipments/create" className="btn btn-primary mt-3">
                Create New Shipment
              </Link>
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table table-hover align-middle">
                <thead className="table-light">
                  <tr>
                    <th>Tracking #</th>
                    <th>From</th>
                    <th>To</th>
                    <th>Status</th>
                    <th>Last Updated</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredShipments.map((shipment,index) => (
                    <tr key={shipment.id}>
                      <td className="fw-bold">#{index+1}</td>
                      <td>
                        <div className="d-flex align-items-center">
                          <FaMapMarkerAlt className="text-muted me-2" />
                          {shipment.senderAddress?.split(",")[0] || "Unknown"}
                        </div>
                      </td>
                      <td>
                        <div className="d-flex align-items-center">
                          <FaMapMarkerAlt className="text-muted me-2" />
                          {shipment.receiverAddress?.split(",")[0] || "Unknown"}
                        </div>
                      </td>
                      <td>
                        <span className={`badge ${getStatusBadge(shipment.status)}`}>
                          {shipment.status}
                        </span>
                      </td>
                      <td>
                        <div className="d-flex align-items-center">
                          <FaClock className="text-muted me-2" />
                          {shipment.updatedAt 
                            ? new Date(shipment.updatedAt).toLocaleDateString()
                            : "Unknown"}
                        </div>
                      </td>
                      <td>
                        <Link
                          to={`/tracking/${shipment.id}`}
                          className="btn btn-sm btn-primary"
                        >
                          Track
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LiveTracking;