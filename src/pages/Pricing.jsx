// pages/Pricing.jsx
import React from 'react';
import { Container, Card, Button, Row, Col, Badge } from 'react-bootstrap';
import { FaCheckCircle, FaCrown } from 'react-icons/fa';

const Pricing = () => {
  const plans = [
    {
      name: "Free",
      price: "₹0",
      period: "forever",
      features: ["Create Shipments", "Track Status", "Basic Support"],
      recommended: false
    },
    {
      name: "Pro",
      price: "₹299",
      period: "per month",
      features: ["Live Tracking", "Priority Support", "Advanced Dashboard", "API Access"],
      recommended: true
    },
  ];

  return (
    <Container className="py-5 my-5">
      <div className="text-center mb-5">
        <h2 className="fw-bold display-5">Pricing Plans</h2>
        <p className="lead text-muted">Choose the plan that fits your shipping needs</p>
      </div>
      <Row className="g-4 justify-content-center">
        {plans.map((plan, idx) => (
          <Col md={8} lg={5} xl={4} key={idx} className="d-flex">
            <Card className={`shadow-sm rounded-4 w-100 ${plan.recommended ? 'border-primary border-2' : ''}`}>
              {plan.recommended && (
                <div className="position-absolute top-0 start-50 translate-middle">
                  <Badge bg="primary" className="rounded-pill px-3 py-2 fs-6 shadow">
                    <FaCrown className="me-2" />Recommended
                  </Badge>
                </div>
              )}
              <Card.Body className="p-4">
                <div className="text-center">
                  <Card.Title className="fw-bold fs-3 mb-1">{plan.name}</Card.Title>
                  <h3 className="my-3 text-primary fw-bold">
                    {plan.price} <small className="fs-6 text-muted fw-normal">{plan.period}</small>
                  </h3>
                </div>
                <ul className="list-unstyled mb-4">
                  {plan.features.map((f, i) => (
                    <li key={i} className="mb-2 d-flex align-items-center">
                      <FaCheckCircle className="text-success me-2" /> {f}
                    </li>
                  ))}
                </ul>
                <Button 
                  variant={plan.recommended ? "primary" : "outline-primary"} 
                  size="lg" 
                  className="w-100 mt-3 fw-bold"
                >
                  Choose {plan.name}
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Pricing;