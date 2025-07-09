import { NavLink, Link} from "react-router-dom";
import { UserAuth } from "../context/AuthContext";

const Sidebar = () => {
  
  
 
  
  return (
    <div
      className="d-flex flex-column flex-shrink-0 p-3 bg-white shadow-sm"
      style={{ width: "280px", height: "100vh" }}
    >
      <div className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-decoration-none border-bottom pb-3">
        <i className="bi bi-truck fs-4 text-primary me-2"></i>
        <span className="fs-4 fw-bold">ShipTrack</span>
      </div>
      <ul className="nav nav-pills flex-column mb-auto">
        <li className="nav-item">
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              `nav-link ${isActive ? "active" : "link-dark"}`
            }
          >
            <i className="bi bi-speedometer2 me-2"></i>
            Dashboard
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/shipments"
            className={({ isActive }) =>
              `nav-link ${isActive ? "active" : "link-dark"}`
            }
          >
            <i className="bi bi-box-seam me-2"></i>
            My Shipments
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/shipments/create"
            className={({ isActive }) =>
              `nav-link ${isActive ? "active" : "link-dark"}`
            }
          >
            <i className="bi bi-plus-circle me-2"></i>
            Create Shipment
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/live-tracking"
            className={({ isActive }) =>
              `nav-link ${isActive ? "active" : "link-dark"}`
            }
          >
            <i className="bi bi-geo-alt me-2"></i>
            Live Tracking
          </NavLink>
        </li>
      </ul>
      
    </div>
  );
};

export default Sidebar;
