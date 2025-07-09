const Footer = () => {
  return (
    <footer className="bg-dark text-white py-5 mt-4">
      <div className="container-fluid px-4 px-lg-5">
        <div className="row g-4">
          <div className="col-lg-3">
            <h5 className="fw-bold mb-3">
              <i className="bi bi-truck me-2 text-primary"></i> ShipTrack
            </h5>
            <p className="text-light">
              Revolutionizing logistics with real-time tracking and seamless shipment management.
            </p>
            <div className="d-flex gap-3">
              <a href="#" className="text-white"><i className="bi bi-facebook fs-5"></i></a>
              <a href="#" className="text-white"><i className="bi bi-twitter fs-5"></i></a>
              <a href="#" className="text-white"><i className="bi bi-linkedin fs-5"></i></a>
              <a href="#" className="text-white"><i className="bi bi-instagram fs-5"></i></a>
            </div>
          </div>
          
          <div className="col-lg-3">
            <h6 className="fw-bold mb-3">Quick Links</h6>
            <ul className="list-unstyled">
              <li className="mb-2"><a href="/" className="text-light text-decoration-none">Home</a></li>
              <li className="mb-2"><a href="/features" className="text-light text-decoration-none">Features</a></li>
              <li className="mb-2"><a href="pricing" className="text-light text-decoration-none">Pricing</a></li>
              <li className="mb-2"><a href="/about" className="text-light text-decoration-none">About Us</a></li>
            </ul>
          </div>
          
          <div className="col-lg-3">
            <h6 className="fw-bold mb-3">Support</h6>
            <ul className="list-unstyled">
              <li className="mb-2"><a href="#" className="text-light text-decoration-none">Help Center</a></li>
              <li className="mb-2"><a href="#" className="text-light text-decoration-none">Contact Us</a></li>
              <li className="mb-2"><a href="#" className="text-light text-decoration-none">FAQs</a></li>
              <li className="mb-2"><a href="#" className="text-light text-decoration-none">Shipping Policy</a></li>
            </ul>
          </div>
          
          <div className="col-lg-3">
            <h6 className="fw-bold mb-3">Newsletter</h6>
            <p className="text-light">Subscribe to get updates on new features.</p>
            <div className="input-group mb-3">
              <input type="email" className="form-control" placeholder="Your email" />
              <button className="btn btn-primary" type="button">Subscribe</button>
            </div>
          </div>
        </div>
        
        <hr className="my-4 border-secondary" />
        
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-center">
          <p className="mb-0 text-light">&copy; {new Date().getFullYear()} ShipTrack. All rights reserved.</p>
          <div className="d-flex gap-3">
            <a href="#" className="text-light text-decoration-none">Privacy Policy</a>
            <a href="#" className="text-light text-decoration-none">Terms of Service</a>
            <a href="#" className="text-light text-decoration-none">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;