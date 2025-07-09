import { useState } from "react";
import Login from "../components/Auth/Login";

const LoginPage = () => {
  const [error, setError] = useState(null);

  if (error) {
    return (
      <div className="min-vh-100 d-flex align-items-center justify-content-center">
        <div className="alert alert-danger">
          <h4>An error occurred</h4>
          <p>{error.message}</p>
          <button 
            className="btn btn-primary" 
            onClick={() => setError(null)}
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-vh-100 d-flex align-items-center bg-light py-4">
      <div className="container">
        <Login onError={setError} />
      </div>
    </div>
  );
};

export default LoginPage;