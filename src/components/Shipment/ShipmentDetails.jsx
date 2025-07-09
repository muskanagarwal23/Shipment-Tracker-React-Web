import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useShipment } from '../../context/ShipmentContext';
import { toast } from 'react-hot-toast';

const ShipmentDetails = () => {
  const { id } = useParams();
  const { getShipment, updateStatus, deleteShipment } = useShipment();
  const [shipment, setShipment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchShipment = async () => {
      try {
        const data = await getShipment(id);
        setShipment(data);
      } catch (error) {
        toast.error('Failed to load shipment details');
        navigate('/shipments');
      } finally {
        setLoading(false);
      }
    };
    fetchShipment();
  }, [id, getShipment, navigate]);

  const handleStatusUpdate = async (newStatus) => {
    try {
      await updateStatus(id, newStatus);
      setShipment(prev => ({ ...prev, status: newStatus }));
      toast.success(`Status updated to ${newStatus}`);
    } catch (error) {
      toast.error('Failed to update status');
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this shipment?')) return;
    
    setDeleting(true);
    try {
      await deleteShipment(id);
      toast.success('Shipment deleted successfully');
      navigate('/shipments');
    } catch (error) {
      toast.error('Failed to delete shipment');
    } finally {
      setDeleting(false);
    }
  };

  const statusInfo = {
    'Processing': { color: 'warning', icon: 'hourglass' },
    'In Transit': { color: 'primary', icon: 'truck' },
    'Delivered': { color: 'success', icon: 'check-circle' },
    'Cancelled': { color: 'danger', icon: 'x-circle' }
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center py-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (!shipment) {
    return (
      <div className="text-center py-5">
        <div className="alert alert-danger">
          <i className="bi bi-exclamation-triangle-fill me-2"></i>
          Shipment not found
        </div>
        <button 
          onClick={() => navigate('/shipments')}
          className="btn btn-primary mt-3"
        >
          Back to Shipments
        </button>
      </div>
    );
  }

  return (
    <div className="container py-4">
      <div className="card border-0 shadow-sm">
        <div className="card-header bg-white d-flex justify-content-between align-items-center">
          <div>
            <h2 className="h4 mb-0">Shipment Details</h2>
            <small className="text-muted">ID: {id}</small>
          </div>
          <div>
            <span className={`badge bg-${statusInfo[shipment.status].color}-subtle text-${statusInfo[shipment.status].color} fs-6`}>
              <i className={`bi bi-${statusInfo[shipment.status].icon} me-1`}></i>
              {shipment.status}
            </span>
          </div>
        </div>

        <div className="card-body">
          <div className="row g-4">
            <div className="col-lg-8">
              <div className="row g-4">
                <div className="col-md-6">
                  <div className="card h-100 border-0 shadow-sm">
                    <div className="card-header bg-light">
                      <h3 className="h6 mb-0">Sender Information</h3>
                    </div>
                    <div className="card-body">
                      <div className="mb-3">
                        <label className="form-label">Name</label>
                        <p className="fw-medium">{shipment.senderName}</p>
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Address</label>
                        <p className="text-muted">{shipment.senderAddress}</p>
                      </div>
                      {shipment.senderEmail && (
                        <div className="mb-3">
                          <label className="form-label">Email</label>
                          <p className="text-muted">{shipment.senderEmail}</p>
                        </div>
                      )}
                      {shipment.senderPhone && (
                        <div className="mb-3">
                          <label className="form-label">Phone</label>
                          <p className="text-muted">{shipment.senderPhone}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="card h-100 border-0 shadow-sm">
                    <div className="card-header bg-light">
                      <h3 className="h6 mb-0">Receiver Information</h3>
                    </div>
                    <div className="card-body">
                      <div className="mb-3">
                        <label className="form-label">Name</label>
                        <p className="fw-medium">{shipment.receiverName}</p>
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Address</label>
                        <p className="text-muted">{shipment.receiverAddress}</p>
                      </div>
                      {shipment.receiverEmail && (
                        <div className="mb-3">
                          <label className="form-label">Email</label>
                          <p className="text-muted">{shipment.receiverEmail}</p>
                        </div>
                      )}
                      {shipment.receiverPhone && (
                        <div className="mb-3">
                          <label className="form-label">Phone</label>
                          <p className="text-muted">{shipment.receiverPhone}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="col-12">
                  <div className="card border-0 shadow-sm">
                    <div className="card-header bg-light">
                      <h3 className="h6 mb-0">Package Details</h3>
                    </div>
                    <div className="card-body">
                      <div className="row g-3">
                        <div className="col-md-3">
                          <label className="form-label">Description</label>
                          <p className="fw-medium">{shipment.packageDescription}</p>
                        </div>
                        <div className="col-md-3">
                          <label className="form-label">Weight</label>
                          <p className="fw-medium">{shipment.packageWeight} kg</p>
                        </div>
                        <div className="col-md-3">
                          <label className="form-label">Dimensions</label>
                          <p className="fw-medium">{shipment.packageDimensions}</p>
                        </div>
                        <div className="col-md-3">
                          <label className="form-label">Value</label>
                          <p className="fw-medium">${shipment.packageValue || 'N/A'}</p>
                        </div>
                        {shipment.deliveryInstructions && (
                          <div className="col-12">
                            <label className="form-label">Delivery Instructions</label>
                            <p className="text-muted">{shipment.deliveryInstructions}</p>
                          </div>
                        )}
                        {shipment.deliveryDate && (
                          <div className="col-md-6">
                            <label className="form-label">Expected Delivery</label>
                            <p className="fw-medium">
                              {new Date(shipment.deliveryDate).toLocaleDateString()}
                            </p>
                          </div>
                        )}
                        {shipment.insurance && (
                          <div className="col-md-6">
                            <label className="form-label">Insurance</label>
                            <p className="fw-medium text-success">
                              <i className="bi bi-check-circle-fill me-1"></i>
                              Covered (${(shipment.packageValue * 0.01).toFixed(2)})
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-4">
              <div className="sticky-top" style={{top: '20px'}}>
                <div className="card border-0 shadow-sm mb-4">
                  <div className="card-header bg-light">
                    <h3 className="h6 mb-0">Timeline</h3>
                  </div>
                  <div className="card-body">
                    <div className="timeline">
                      <div className={`timeline-item ${shipment.status === 'Processing' ? 'active' : ''} ${['In Transit', 'Delivered'].includes(shipment.status) ? 'completed' : ''}`}>
                        <div className="timeline-icon bg-primary">
                          <i className="bi bi-box-seam text-white"></i>
                        </div>
                        <div className="timeline-content">
                          <h6>Order Processed</h6>
                          <small className="text-muted">
                            {new Date(shipment.createdAt).toLocaleString()}
                          </small>
                        </div>
                      </div>
                      <div className={`timeline-item ${shipment.status === 'In Transit' ? 'active' : ''} ${shipment.status === 'Delivered' ? 'completed' : ''}`}>
                        <div className="timeline-icon bg-primary">
                          <i className="bi bi-truck text-white"></i>
                        </div>
                        <div className="timeline-content">
                          <h6>Shipped</h6>
                          {shipment.status !== 'Processing' && (
                            <small className="text-muted">
                              {shipment.updatedAt ? new Date(shipment.updatedAt).toLocaleString() : 'In progress'}
                            </small>
                          )}
                        </div>
                      </div>
                      <div className={`timeline-item ${shipment.status === 'Delivered' ? 'active completed' : ''}`}>
                        <div className="timeline-icon bg-primary">
                          <i className="bi bi-check-circle text-white"></i>
                        </div>
                        <div className="timeline-content">
                          <h6>Delivered</h6>
                          {shipment.status === 'Delivered' && shipment.updatedAt && (
                            <small className="text-muted">
                              {new Date(shipment.updatedAt).toLocaleString()}
                            </small>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="card border-0 shadow-sm mb-4">
                  <div className="card-header bg-light">
                    <h3 className="h6 mb-0">Payment Information</h3>
                  </div>
                  <div className="card-body">
                    <div className="mb-3">
                      <label className="form-label">Amount Paid</label>
                      <p className="fw-bold">${shipment.price}</p>
                    </div>
                    {shipment.paymentId && (
                      <div className="mb-3">
                        <label className="form-label">Payment ID</label>
                        <p className="text-muted small">{shipment.paymentId}</p>
                      </div>
                    )}
                    <div className="mb-3">
                      <label className="form-label">Payment Method</label>
                      <p className="text-muted">
                        {shipment.paymentMethod || 'Credit Card'}
                      </p>
                    </div>
                    <div className="alert alert-success mb-0">
                      <i className="bi bi-check-circle-fill me-2"></i>
                      Payment completed successfully
                    </div>
                  </div>
                </div>

                <div className="card border-0 shadow-sm">
                  <div className="card-header bg-light">
                    <h3 className="h6 mb-0">Actions</h3>
                  </div>
                  <div className="card-body">
                    <div className="d-grid gap-2">
                      <Link 
                        to={`/tracking/${shipment.id}`} 
                        className="btn btn-outline-primary"
                      >
                        <i className="bi bi-geo-alt me-2"></i> Track Shipment
                      </Link>
                      <button 
                        onClick={handleDelete}
                        className="btn btn-outline-danger"
                        disabled={deleting}
                      >
                        {deleting ? (
                          <>
                            <span className="spinner-border spinner-border-sm me-2"></span>
                            Deleting...
                          </>
                        ) : (
                          <>
                            <i className="bi bi-trash me-2"></i> Delete Shipment
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShipmentDetails;