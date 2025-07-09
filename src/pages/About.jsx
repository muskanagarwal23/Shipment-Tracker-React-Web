import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { FaShippingFast, FaMapMarkedAlt, FaUsers, FaHandshake } from 'react-icons/fa';

const About = () => {
  return (
    <Container className="py-5 my-5">
      <Row className="justify-content-center mb-5">
        <Col lg={8} className="text-center">
          <h1 className="display-5 fw-bold mb-4">About Our Shipping Platform</h1>
          <p className="lead text-muted">
            Revolutionizing logistics with technology to deliver your packages faster, safer, and more reliably.
          </p>
        </Col>
      </Row>

      <Row className="g-4 mb-5">
        <Col md={6} lg={3}>
          <Card className="h-100 border-0 shadow-sm hover-shadow transition-all">
            <Card.Body className="text-center p-4">
              <div className="bg-primary bg-opacity-10 text-primary rounded-circle p-3 d-inline-flex mb-3">
                <FaShippingFast size={32} />
              </div>
              <Card.Title className="fs-5 fw-bold mb-3">Fast Deliveries</Card.Title>
              <Card.Text className="text-muted">
                Our optimized network ensures 98% of packages arrive ahead of schedule.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>

        <Col md={6} lg={3}>
          <Card className="h-100 border-0 shadow-sm hover-shadow transition-all">
            <Card.Body className="text-center p-4">
              <div className="bg-info bg-opacity-10 text-info rounded-circle p-3 d-inline-flex mb-3">
                <FaMapMarkedAlt size={32} />
              </div>
              <Card.Title className="fs-5 fw-bold mb-3">Real-Time Tracking</Card.Title>
              <Card.Text className="text-muted">
                Advanced tracking technology lets you monitor your shipment every step of the way.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>

        <Col md={6} lg={3}>
          <Card className="h-100 border-0 shadow-sm hover-shadow transition-all">
            <Card.Body className="text-center p-4">
              <div className="bg-success bg-opacity-10 text-success rounded-circle p-3 d-inline-flex mb-3">
                <FaUsers size={32} />
              </div>
              <Card.Title className="fs-5 fw-bold mb-3">Customer First</Card.Title>
              <Card.Text className="text-muted">
                24/7 support team dedicated to solving your logistics challenges.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>

        <Col md={6} lg={3}>
          <Card className="h-100 border-0 shadow-sm hover-shadow transition-all">
            <Card.Body className="text-center p-4">
              <div className="bg-warning bg-opacity-10 text-warning rounded-circle p-3 d-inline-flex mb-3">
                <FaHandshake size={32} />
              </div>
              <Card.Title className="fs-5 fw-bold mb-3">Trusted Partners</Card.Title>
              <Card.Text className="text-muted">
                Network of certified carriers ensuring safe handling of your packages.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="align-items-center g-5 py-5">
        <Col lg={6}>
          <div className="pe-lg-5">
            <h2 className="fw-bold mb-4">Our Story</h2>
            <p className="lead text-muted mb-4">
              Founded in 2025, we set out to transform the shipping industry with technology that actually works for our customers.
            </p>
            <p>
              What began as a small team of logistics experts and software engineers has grown into a platform serving thousands of businesses
              nationwide. We've eliminated the pain points of traditional shipping by building solutions that are simple, transparent, and reliable.
            </p>
            <p className="mb-0">
              Today, we're proud to be the fastest-growing shipping platform in the region, but we're still just as committed to our original
              mission: making shipping effortless for everyone.
            </p>
          </div>
        </Col>
        <Col lg={6}>
          <div className="ratio ratio-16x9 rounded-4 overflow-hidden shadow">
            <img 
              src="https://images.unsplash.com/photo-1605000797499-95a51c5269ae?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1471&q=80" 
              alt="Our warehouse facility" 
              className="object-fit-cover"
            />
          </div>
        </Col>
      </Row>

      <Row className="py-5 my-5">
        <Col className="text-center">
          <h2 className="fw-bold mb-5">Meet The Leadership</h2>
          <Row className="g-4 justify-content-center">
            {[
              { name: "Rahul Sharma", role: "CEO & Founder", image: "https://randomuser.me/api/portraits/men/32.jpg" },
              { name: "Priya Patel", role: "CTO", image: "https://randomuser.me/api/portraits/women/44.jpg" },
              { name: "Amit Singh", role: "Head of Operations", image: "https://randomuser.me/api/portraits/men/75.jpg" },
              { name: "Neha Gupta", role: "Customer Success", image: "https://randomuser.me/api/portraits/women/68.jpg" },
            ].map((person, index) => (
              <Col key={index} sm={6} md={3}>
                <Card className="border-0 shadow-sm h-100">
                  <div className="ratio ratio-1x1">
                    <img 
                      src={person.image} 
                      alt={person.name} 
                      className="object-fit-cover rounded-top"
                    />
                  </div>
                  <Card.Body className="text-center">
                    <h5 className="mb-1 fw-bold">{person.name}</h5>
                    <p className="text-muted small mb-0">{person.role}</p>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Col>
      </Row>

      <Row className="bg-light rounded-4 p-5 mt-5">
        <Col lg={6} className="mb-4 mb-lg-0">
          <h3 className="fw-bold mb-4">Why Choose Us?</h3>
          <div className="d-flex mb-3">
            <div className="flex-shrink-0 text-primary me-3">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 13L9 17L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div>
              <h5 className="mb-1">Transparent Pricing</h5>
              <p className="text-muted small mb-0">No hidden fees, no surprises</p>
            </div>
          </div>
          <div className="d-flex mb-3">
            <div className="flex-shrink-0 text-primary me-3">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 13L9 17L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div>
              <h5 className="mb-1">99.9% On-Time Delivery</h5>
              <p className="text-muted small mb-0">Industry-leading reliability</p>
            </div>
          </div>
          <div className="d-flex">
            <div className="flex-shrink-0 text-primary me-3">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 13L9 17L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div>
              <h5 className="mb-1">Eco-Friendly Options</h5>
              <p className="text-muted small mb-0">Sustainable shipping solutions</p>
            </div>
          </div>
        </Col>
        <Col lg={6}>
          <h3 className="fw-bold mb-4">Our Numbers</h3>
          <Row className="text-center">
            <Col xs={4} className="mb-4">
              <h2 className="text-primary fw-bold">10K+</h2>
              <p className="text-muted small mb-0">Shipments Monthly</p>
            </Col>
            <Col xs={4} className="mb-4">
              <h2 className="text-primary fw-bold">200+</h2>
              <p className="text-muted small mb-0">Cities Served</p>
            </Col>
            <Col xs={4} className="mb-4">
              <h2 className="text-primary fw-bold">98%</h2>
              <p className="text-muted small mb-0">Happy Customers</p>
            </Col>
            <Col xs={4}>
              <h2 className="text-primary fw-bold">24/7</h2>
              <p className="text-muted small mb-0">Support</p>
            </Col>
            <Col xs={4}>
              <h2 className="text-primary fw-bold">50+</h2>
              <p className="text-muted small mb-0">Team Members</p>
            </Col>
            <Col xs={4}>
              <h2 className="text-primary fw-bold">100%</h2>
              <p className="text-muted small mb-0">Secure</p>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default About;