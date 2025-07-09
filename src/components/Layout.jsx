import Navbar from "./Navbar";
import Footer from "./Footer"; 

const Layout = ({ children }) => {
  return (
    <div className="d-flex flex-column min-vh-100 bg-light " style={{marginTop:"50px"}}>
      <Navbar />
      <main className="flex-grow-1 py-4">
        <div className="container-fluid px-4 px-lg-5">
          {children}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Layout;