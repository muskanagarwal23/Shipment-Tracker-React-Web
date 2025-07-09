import { Link } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";

const Home = () => {
  const { user } = UserAuth();

  return (
    <div className="min-vh-100 d-flex flex-column justify-content-center align-items-center bg-light">
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-lg-8 text-center">
            <div className="mb-5">
              <h1 className="display-4 fw-bold text-primary mb-4">
                Welcome to <span className="text-dark">ShipTrack</span>
              </h1>
              <p className="lead text-muted mb-4">
                Revolutionizing your shipping experience with real-time tracking,
                seamless management, and instant updates for all your packages.
              </p>
              <div className="d-flex justify-content-center gap-3 mt-5">
                {!user ? (
                  <>
                    <Link
                      to="/register"
                      className="btn btn-primary btn-lg px-4 py-3 rounded-pill fw-bold shadow-sm"
                    >
                      Get Started
                    </Link>
                    <Link
                      to="/login"
                      className="btn btn-outline-primary btn-lg px-4 py-3 rounded-pill fw-bold shadow-sm"
                    >
                      Login
                    </Link>
                  </>
                ) : (
                  <Link
                    to="/dashboard"
                    className="btn btn-primary btn-lg px-4 py-3 rounded-pill fw-bold shadow-sm"
                  >
                    Go to Dashboard
                  </Link>
                )}
              </div>
            </div>
            
            <div className="mt-5 pt-5">
              <div className="row g-4">
                <div className="col-md-4">
                  <div className="card border-0 shadow-sm h-100">
                    <div className="card-body p-4">
                      <div className="bg-primary bg-opacity-10 p-3 rounded-circle d-inline-block mb-3">
                        <i className="bi bi-geo-alt-fill text-primary fs-3"></i>
                      </div>
                      <h5 className="card-title">Real-time Tracking</h5>
                      <p className="card-text text-muted">
                        Monitor your shipments every step of the way with live updates.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="card border-0 shadow-sm h-100">
                    <div className="card-body p-4">
                      <div className="bg-primary bg-opacity-10 p-3 rounded-circle d-inline-block mb-3">
                        <i className="bi bi-speedometer2 text-primary fs-3"></i>
                      </div>
                      <h5 className="card-title">Fast Delivery</h5>
                      <p className="card-text text-muted">
                        Our optimized routes ensure your packages arrive faster.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="card border-0 shadow-sm h-100">
                    <div className="card-body p-4">
                      <div className="bg-primary bg-opacity-10 p-3 rounded-circle d-inline-block mb-3">
                        <i className="bi bi-shield-check text-primary fs-3"></i>
                      </div>
                      <h5 className="card-title">Secure Handling</h5>
                      <p className="card-text text-muted">
                        Your shipments are protected with our advanced security measures.
                      </p>
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

export default Home;