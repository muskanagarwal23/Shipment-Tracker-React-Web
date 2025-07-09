// pages/Features.jsx
import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { FaShippingFast, FaMapMarkedAlt, FaMobileAlt, FaLock } from 'react-icons/fa';

const Features = () => {
  const features = [
    { 
      title: "Easy Shipment Booking", 
      description: "Initiate new shipments with sender & receiver details.",
      icon: <FaShippingFast size={40} className="text-primary mb-3" />
    },
    { 
      title: "Live Tracking", 
      description: "Track real-time location of your package on map.",
      icon: <FaMapMarkedAlt size={40} className="text-primary mb-3" />
    },
    { 
      title: "Responsive UI", 
      description: "Seamlessly usable across all devices.",
      icon: <FaMobileAlt size={40} className="text-primary mb-3" />
    },
    { 
      title: "Secure Login", 
      description: "Protected user data with Firebase authentication.",
      icon: <FaLock size={40} className="text-primary mb-3" />
    },
  ];

  return (
    <Container className="py-5 my-5">
      <h2 className="mb-5 text-center fw-bold display-5">Our Platform Features</h2>
      <Row className="g-4">
        {features.map((f, index) => (
          <Col key={index} md={6} lg={3} className="d-flex">
            <Card className="h-100 shadow-sm border-0 rounded-4 hover-shadow transition-all">
              <Card.Body className="text-center p-4">
                {f.icon}
                <Card.Title className="text-primary fs-4 fw-bold mb-3">{f.title}</Card.Title>
                <Card.Text className="text-muted">{f.description}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Features;