// pages/Support.jsx
import React from 'react';
import { Container, Form, Button, Row, Col,Card } from 'react-bootstrap';
import { FaHeadset, FaPaperPlane } from 'react-icons/fa';

const Support = () => {
  return (
    <Container className="py-5 my-5">
      <Row className="justify-content-center">
        <Col lg={8} xl={6}>
          <div className="text-center mb-5">
            <FaHeadset size={48} className="text-primary mb-3" />
            <h2 className="fw-bold display-5">Customer Support</h2>
            <p className="lead text-muted">We're here to help you with any questions or issues</p>
          </div>
          
          <Card className="shadow-sm border-0 rounded-4">
            <Card.Body className="p-4 p-md-5">
              <Form>
                <Form.Group className="mb-4" controlId="supportName">
                  <Form.Label className="fw-bold">Your Name</Form.Label>
                  <Form.Control 
                    type="text" 
                    placeholder="Enter your name" 
                    className="py-3 rounded-3"
                  />
                </Form.Group>

                <Form.Group className="mb-4" controlId="supportEmail">
                  <Form.Label className="fw-bold">Email address</Form.Label>
                  <Form.Control 
                    type="email" 
                    placeholder="Enter your email" 
                    className="py-3 rounded-3"
                  />
                </Form.Group>

                <Form.Group className="mb-4" controlId="supportMessage">
                  <Form.Label className="fw-bold">Message</Form.Label>
                  <Form.Control 
                    as="textarea" 
                    rows={5} 
                    placeholder="Describe your issue" 
                    className="rounded-3"
                  />
                </Form.Group>

                <div className="d-grid">
                  <Button 
                    variant="primary" 
                    size="lg" 
                    className="fw-bold rounded-3 py-3"
                  >
                    <FaPaperPlane className="me-2" /> Submit Request
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
          
          <div className="text-center mt-4">
            <p className="text-muted">
              Or contact us directly at <a href="mailto:support@shipment.com">support@shipment.com</a>
            </p>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Support;