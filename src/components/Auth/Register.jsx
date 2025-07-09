import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../../context/AuthContext";
import { toast } from "react-hot-toast";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const { signUp } = UserAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    if (password !== confirmPassword) {
      toast.error("Passwords don't match");
      setLoading(false);
      return;
    }

    if (!termsAccepted) {
      toast.error("Please accept terms and conditions");
      setLoading(false);
      return;
    }

    try {
      await signUp(email, password);
      toast.success("Account created successfully");
      navigate("/dashboard");
    } catch (error) {
  const message = error.message.includes("auth/email-already-in-use")
    ? "This email is already registered."
    : error.message.includes("auth/weak-password")
    ? "Password should be at least 6 characters."
    : "Failed to register. Please try again.";
  toast.error(message);
}

  };

  return (
    <div className="row justify-content-center">
      <div className="col-md-10 col-lg-8">
        <div className="card border-0 shadow-lg rounded-4 overflow-hidden">
          <div className="row g-0">
            <div className="col-md-6 d-none d-md-block bg-primary-gradient">
              <div className="h-100 d-flex flex-column justify-content-center align-items-center p-5 text-white">
                <h2 className="fw-bold mb-4">Join ShipTrack</h2>
                <p className="text-center">
                  Start managing shipments efficiently with our platform.
                </p>
                <div className="mt-4">
                  <img 
                    src="https://cdn-icons-png.flaticon.com/512/3344/3344404.png" 
                    alt="Shipping illustration" 
                    className="img-fluid"
                    style={{ maxHeight: "200px" }}
                  />
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="card-body p-4 p-md-5">
                <div className="text-center mb-4">
                  <h3 className="fw-bold text-primary">Create Account</h3>
                  <p className="text-muted">Fill in your details</p>
                </div>

                <form onSubmit={handleSubmit}>
                  {/* Email Input */}
                  <div className="mb-3">
                    <label className="form-label">Email address</label>
                    <div className="input-group">
                      <span className="input-group-text">
                        <i className="bi bi-envelope"></i>
                      </span>
                      <input
                        type="email"
                        className="form-control"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  {/* Password Input */}
                  <div className="mb-3">
                    <label className="form-label">Password</label>
                    <div className="input-group">
                      <span className="input-group-text">
                        <i className="bi bi-lock"></i>
                      </span>
                      <input
                        type={showPassword ? "text" : "password"}
                        className="form-control"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        minLength={6}
                      />
                      <button 
                        className="btn btn-outline-secondary" 
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        <i className={`bi ${showPassword ? "bi-eye-slash" : "bi-eye"}`}></i>
                      </button>
                    </div>
                    <small className="text-muted">At least 6 characters</small>
                  </div>

                  {/* Confirm Password */}
                  <div className="mb-3">
                    <label className="form-label">Confirm Password</label>
                    <div className="input-group">
                      <span className="input-group-text">
                        <i className="bi bi-lock"></i>
                      </span>
                      <input
                        type={showPassword ? "text" : "password"}
                        className="form-control"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  {/* Terms Checkbox */}
                  <div className="mb-4 form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      checked={termsAccepted}
                      onChange={(e) => setTermsAccepted(e.target.checked)}
                      required
                    />
                    <label className="form-check-label small">
                      I agree to the <a href="#" className="text-primary">Terms</a> and <a href="#" className="text-primary">Privacy Policy</a>
                    </label>
                  </div>

                  {/* Submit Button */}
                  <div className="d-grid mb-3">
                    <button
                      type="submit"
                      disabled={loading}
                      className="btn btn-primary"
                    >
                      {loading ? (
                        <>
                          <span className="spinner-border spinner-border-sm me-2"></span>
                          Creating account...
                        </>
                      ) : (
                        "Register"
                      )}
                    </button>
                  </div>

                  {/* Social Register */}
                  <div className="text-center position-relative my-4">
                    <span className="bg-white px-2 text-muted small">or sign up with</span>
                  </div>
                  <div className="row g-2">
                    <div className="col">
                      <button type="button" className="btn btn-outline-primary w-100">
                        <i className="bi bi-google me-2"></i> Google
                      </button>
                    </div>
                    <div className="col">
                      <button type="button" className="btn btn-outline-primary w-100">
                        <i className="bi bi-facebook me-2"></i> Facebook
                      </button>
                    </div>
                  </div>
                </form>

                <div className="text-center mt-4">
                  <p className="text-muted mb-0">
                    Already have an account?{" "}
                    <Link to="/login" className="text-primary fw-medium">
                      Login
                    </Link>
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

export default Register;