import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useShipment } from "../../context/ShipmentContext";
import { loadRazorpay } from "../../utils/razorpay";

const CreateShipment = () => {
  const { createShipment } = useShipment();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    senderName: "",
    senderEmail: "",
    senderPhone: "",
    senderAddress: "",
    receiverName: "",
    receiverEmail: "",
    receiverPhone: "",
    receiverAddress: "",
    packageDescription: "",
    packageWeight: "",
    packageDimensions: "",
    packageValue: "",
    deliveryInstructions: "",
    deliveryDate: "",
    insurance: false
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const calculatePrice = () => {
    const weight = parseFloat(formData.packageWeight) || 0;
    const basePrice = Math.max(5, weight * 2.5);
    const insuranceCost = formData.insurance ? parseFloat(formData.packageValue) * 0.01 : 0;
    return (basePrice + insuranceCost).toFixed(2);
  };

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const shipmentId = await createShipment({
        ...formData,
        price: calculatePrice(),
        status: "Processing",
        createdAt: new Date().toISOString()
      });

      // Payment integration would go here
      navigate(`/shipments/${shipmentId}`);
    } catch (error) {
      console.error("Error creating shipment:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-4">
      <div className="card border-0 shadow-sm">
        <div className="card-header bg-white">
          <h2 className="h4 mb-0">Create New Shipment</h2>
        </div>
        
        <div className="card-body">
          <div className="mb-4">
            <ul className="nav nav-pills nav-justified">
              <li className="nav-item">
                <button 
                  className={`nav-link ${step === 1 ? 'active' : ''}`}
                  onClick={() => setStep(1)}
                >
                  <i className="bi bi-person me-2"></i> Sender/Receiver
                </button>
              </li>
              <li className="nav-item">
                <button 
                  className={`nav-link ${step === 2 ? 'active' : ''}`}
                  onClick={() => setStep(2)}
                >
                  <i className="bi bi-box me-2"></i> Package Details
                </button>
              </li>
              <li className="nav-item">
                <button 
                  className={`nav-link ${step === 3 ? 'active' : ''}`}
                  onClick={() => setStep(3)}
                >
                  <i className="bi bi-credit-card me-2"></i> Payment
                </button>
              </li>
            </ul>
          </div>

          <form onSubmit={handleSubmit}>
            {step === 1 && (
              <div className="row g-4">
                <div className="col-md-6">
                  <div className="card h-100 border-0 shadow-sm">
                    <div className="card-header bg-light">
                      <h3 className="h6 mb-0">Sender Information</h3>
                    </div>
                    <div className="card-body">
                      <div className="mb-3">
                        <label className="form-label">Full Name</label>
                        <input
                          type="text"
                          name="senderName"
                          className="form-control"
                          value={formData.senderName}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Email</label>
                        <input
                          type="email"
                          name="senderEmail"
                          className="form-control"
                          value={formData.senderEmail}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Phone</label>
                        <input
                          type="tel"
                          name="senderPhone"
                          className="form-control"
                          value={formData.senderPhone}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Address</label>
                        <textarea
                          name="senderAddress"
                          className="form-control"
                          rows="3"
                          value={formData.senderAddress}
                          onChange={handleChange}
                          required
                        />
                      </div>
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
                        <label className="form-label">Full Name</label>
                        <input
                          type="text"
                          name="receiverName"
                          className="form-control"
                          value={formData.receiverName}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Email</label>
                        <input
                          type="email"
                          name="receiverEmail"
                          className="form-control"
                          value={formData.receiverEmail}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Phone</label>
                        <input
                          type="tel"
                          name="receiverPhone"
                          className="form-control"
                          value={formData.receiverPhone}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Address</label>
                        <textarea
                          name="receiverAddress"
                          className="form-control"
                          rows="3"
                          value={formData.receiverAddress}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-12 d-flex justify-content-end">
                  <button 
                    type="button" 
                    className="btn btn-primary"
                    onClick={nextStep}
                  >
                    Next <i className="bi bi-arrow-right ms-2"></i>
                  </button>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="row g-4">
                <div className="col-md-8">
                  <div className="card border-0 shadow-sm">
                    <div className="card-header bg-light">
                      <h3 className="h6 mb-0">Package Details</h3>
                    </div>
                    <div className="card-body">
                      <div className="row g-3">
                        <div className="col-md-6">
                          <label className="form-label">Description</label>
                          <input
                            type="text"
                            name="packageDescription"
                            className="form-control"
                            value={formData.packageDescription}
                            onChange={handleChange}
                            required
                          />
                        </div>
                        <div className="col-md-6">
                          <label className="form-label">Weight (kg)</label>
                          <input
                            type="number"
                            name="packageWeight"
                            className="form-control"
                            value={formData.packageWeight}
                            onChange={handleChange}
                            step="0.1"
                            min="0.1"
                            required
                          />
                        </div>
                        <div className="col-md-6">
                          <label className="form-label">Dimensions (cm)</label>
                          <input
                            type="text"
                            name="packageDimensions"
                            className="form-control"
                            value={formData.packageDimensions}
                            onChange={handleChange}
                            placeholder="L x W x H"
                            required
                          />
                        </div>
                        <div className="col-md-6">
                          <label className="form-label">Declared Value ($)</label>
                          <input
                            type="number"
                            name="packageValue"
                            className="form-control"
                            value={formData.packageValue}
                            onChange={handleChange}
                            min="0"
                            step="0.01"
                            required
                          />
                        </div>
                        <div className="col-12">
                          <div className="form-check">
                            <input
                              type="checkbox"
                              name="insurance"
                              className="form-check-input"
                              checked={formData.insurance}
                              onChange={handleChange}
                              id="insuranceCheck"
                            />
                            <label className="form-check-label" htmlFor="insuranceCheck">
                              Add Insurance (1% of declared value)
                            </label>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <label className="form-label">Delivery Date</label>
                          <input
                            type="date"
                            name="deliveryDate"
                            className="form-control"
                            value={formData.deliveryDate}
                            onChange={handleChange}
                            min={new Date().toISOString().split('T')[0]}
                            required
                          />
                        </div>
                        <div className="col-md-6">
                          <label className="form-label">Special Instructions</label>
                          <textarea
                            name="deliveryInstructions"
                            className="form-control"
                            rows="1"
                            value={formData.deliveryInstructions}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-md-4">
                  <div className="card border-0 shadow-sm sticky-top" style={{top: '20px'}}>
                    <div className="card-header bg-light">
                      <h3 className="h6 mb-0">Summary</h3>
                    </div>
                    <div className="card-body">
                      <div className="mb-3">
                        <h4 className="h6">Route</h4>
                        <div className="d-flex align-items-center mb-1">
                          <i className="bi bi-geo-alt-fill text-primary me-2"></i>
                          <small>{formData.senderAddress?.split(',')[0] || 'Sender location'}</small>
                        </div>
                        <div className="d-flex align-items-center">
                          <i className="bi bi-geo-alt text-danger me-2"></i>
                          <small>{formData.receiverAddress?.split(',')[0] || 'Receiver location'}</small>
                        </div>
                      </div>
                      <hr />
                      <div className="mb-3">
                        <h4 className="h6">Package</h4>
                        <p className="mb-1">
                          <span className="text-muted">Weight:</span> {formData.packageWeight || '0'} kg
                        </p>
                        <p className="mb-1">
                          <span className="text-muted">Dimensions:</span> {formData.packageDimensions || '-'}
                        </p>
                      </div>
                      <hr />
                      <div>
                        <h4 className="h6">Estimated Cost</h4>
                        <div className="d-flex justify-content-between">
                          <span>Shipping:</span>
                          <span>${(formData.packageWeight * 2.5).toFixed(2) || '0.00'}</span>
                        </div>
                        {formData.insurance && (
                          <div className="d-flex justify-content-between">
                            <span>Insurance:</span>
                            <span>${(formData.packageValue * 0.01).toFixed(2)}</span>
                          </div>
                        )}
                        <div className="d-flex justify-content-between fw-bold mt-2">
                          <span>Total:</span>
                          <span>${calculatePrice()}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-12 d-flex justify-content-between">
                  <button 
                    type="button" 
                    className="btn btn-outline-secondary"
                    onClick={prevStep}
                  >
                    <i className="bi bi-arrow-left me-2"></i> Back
                  </button>
                  <button 
                    type="button" 
                    className="btn btn-primary"
                    onClick={nextStep}
                  >
                    Next <i className="bi bi-arrow-right ms-2"></i>
                  </button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="row justify-content-center">
                <div className="col-lg-8">
                  <div className="card border-0 shadow-sm">
                    <div className="card-header bg-light">
                      <h3 className="h6 mb-0">Payment Information</h3>
                    </div>
                    <div className="card-body">
                      <div className="text-center py-4">
                        <i className="bi bi-credit-card-2-back text-primary" style={{fontSize: '3rem'}}></i>
                        <h4 className="h5 mt-3">Complete Your Payment</h4>
                        <p className="text-muted">Total amount to be paid</p>
                        <div className="display-4 fw-bold text-primary mb-4">
                          ${calculatePrice()}
                        </div>
                      </div>

                      <div className="mb-4">
                        <h5 className="h6 mb-3">Select Payment Method</h5>
                        <div className="row g-3">
                          <div className="col-md-6">
                            <div className="form-check card border p-3">
                              <input 
                                type="radio" 
                                name="paymentMethod" 
                                id="creditCard" 
                                className="form-check-input" 
                                defaultChecked
                              />
                              <label className="form-check-label d-flex align-items-center" htmlFor="creditCard">
                                <i className="bi bi-credit-card-fill fs-4 me-3"></i>
                                <span>Credit/Debit Card</span>
                              </label>
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="form-check card border p-3">
                              <input 
                                type="radio" 
                                name="paymentMethod" 
                                id="razorpay" 
                                className="form-check-input"
                              />
                              <label className="form-check-label d-flex align-items-center" htmlFor="razorpay">
                                <i className="bi bi-wallet-fill fs-4 me-3"></i>
                                <span>Razorpay</span>
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="alert alert-info">
                        <i className="bi bi-info-circle me-2"></i>
                        Your shipment will be processed immediately after successful payment.
                      </div>

                      <div className="d-flex justify-content-between pt-3">
                        <button 
                          type="button" 
                          className="btn btn-outline-secondary"
                          onClick={prevStep}
                        >
                          <i className="bi bi-arrow-left me-2"></i> Back
                        </button>
                        <button 
                          type="submit" 
                          className="btn btn-primary"
                          disabled={loading}
                        >
                          {loading ? (
                            <>
                              <span className="spinner-border spinner-border-sm me-2"></span>
                              Processing...
                            </>
                          ) : (
                            <>
                              Pay ${calculatePrice()} <i className="bi bi-lock-fill ms-2"></i>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateShipment;