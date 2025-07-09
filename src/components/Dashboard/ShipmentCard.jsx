import { Link } from "react-router-dom";
import ProgressBar from "./ProgressBar";

const ShipmentCard = ({ shipment }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case "Processing":
        return "warning";
      case "In Transit":
        return "primary";
      case "Delivered":
        return "success";
      default:
        return "secondary";
    }
  };

  const getProgress = (status) => {
    switch (status) {
      case "Processing": return 30;
      case "In Transit": return 70;
      case "Delivered": return 100;
      default: return 0;
    }
  };

  return (
    <div className="card border-0 shadow-sm h-100">
      <div className="card-body">
        <div className="d-flex justify-content-between mb-3">
          <h5 className="card-title mb-0 fw-bold text-truncate">
            {shipment.packageDescription}
          </h5>
          <span className={`badge bg-${getStatusColor(shipment.status)}-subtle text-${getStatusColor(shipment.status)}`}>
            {shipment.status}
          </span>
        </div>
        
        <div className="mb-3">
          <div className="d-flex align-items-center mb-1">
            <i className="bi bi-geo-alt-fill text-primary me-2"></i>
            <small className="text-muted">From: {shipment.senderName}</small>
          </div>
          <div className="d-flex align-items-center">
            <i className="bi bi-geo-alt text-danger me-2"></i>
            <small className="text-muted">To: {shipment.receiverName}</small>
          </div>
        </div>

        <div className="mb-3">
          <ProgressBar now={getProgress(shipment.status)} variant={getStatusColor(shipment.status)} />
        </div>

        <div className="d-flex justify-content-between align-items-center">
          <div>
            <span className="fw-bold">${shipment.price}</span>
            <small className="text-muted ms-1">· {shipment.deliveryDate}</small>
          </div>
          <Link 
            to={`/shipments/${shipment.id}`} 
            className="btn btn-sm btn-outline-primary"
          >
            <i className="bi bi-eye me-1"></i> Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ShipmentCard;