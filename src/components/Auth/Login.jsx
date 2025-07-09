import { useState,useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../../context/AuthContext";
import { toast } from "react-hot-toast";
import {listenToUserShipments} from "../../firebase/firestore"

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { logIn } = UserAuth();
  const navigate = useNavigate();
  const { user } = UserAuth();
  const callback = () => {};
const errorCallback = () => {};

  useEffect(() => {
    if (!user || !user.uid) return; // Don't setup listeners if not authenticated or UID missing

    const unsubscribe = listenToUserShipments(user.uid, callback, errorCallback);
    return () => unsubscribe();
  }, [user]);

   const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await logIn(email, password);
      toast.success("Logged in successfully");
      // Add small delay to ensure auth state propagates
      await new Promise(resolve => setTimeout(resolve, 100));
      navigate("/dashboard");
    } catch (error) {
      console.error("Login error:", error);
      toast.error(error.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="row justify-content-center">
      <div className="col-md-10 col-lg-8">
        <div className="card border-0 shadow-lg rounded-4 overflow-hidden">
          <div className="row g-0">
            <div className="col-md-6 d-none d-md-block bg-primary-gradient">
              <div className="h-100 d-flex flex-column justify-content-center align-items-center p-5 text-white">
                <h2 className="fw-bold mb-4">Welcome Back!</h2>
                <p className="text-center">
                  Track your shipments and manage deliveries with ease.
                </p>
                <div className="mt-4">
                  <img 
                    src="https://cdn-icons-png.flaticon.com/512/4474/4474071.png" 
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
                  <h3 className="fw-bold text-primary">Sign In</h3>
                  <p className="text-muted">Enter your credentials</p>
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
                      />
                      <button 
                        className="btn btn-outline-secondary" 
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        <i className={`bi ${showPassword ? "bi-eye-slash" : "bi-eye"}`}></i>
                      </button>
                    </div>
                    <div className="text-end mt-2">
                      <Link to="/forgot-password" className="small text-decoration-none">
                        Forgot password?
                      </Link>
                    </div>
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
                          Logging in...
                        </>
                      ) : (
                        "Login"
                      )}
                    </button>
                  </div>

                  {/* Social Login */}
                  <div className="text-center position-relative my-4">
                    <span className="bg-white px-2 text-muted small">or continue with</span>
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
                    Don't have an account?{" "}
                    <Link to="/register" className="text-primary fw-medium">
                      Register
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

export default Login;