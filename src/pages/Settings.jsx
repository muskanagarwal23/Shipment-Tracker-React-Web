// pages/Settings.jsx
import React, { useState } from 'react';
import { Container, Card, Form, Button, Row, Col, Tab, Tabs, Alert } from 'react-bootstrap';
import { FaUserCog, FaBell, FaShieldAlt, FaSignOutAlt, FaSave } from 'react-icons/fa';
import { UserAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Settings = () => {
    const { user, logOut } = UserAuth();
    const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('profile');
  const [formData, setFormData] = useState({
    name: 'John Doe',
    email: 'john@example.com',
    phone: '+91 9876543210',
    company: 'Acme Corp',
    address: '123 Shipping St, Mumbai',
    notifications: {
      email: true,
      sms: false,
      promotions: true,
      shipmentUpdates: true
    },
    security: {
      twoFactorAuth: false,
      passwordReset: true
    }
  });
  const [showAlert, setShowAlert] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: checked
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 3000);
    // Here you would typically send the data to your backend
    console.log('Settings saved:', formData);
  };

  const handleLogout = async () => {
    try {
      await logOut();
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container className="py-5 my-5">
      <Row className="justify-content-center">
        <Col lg={10} xl={8}>
          <Card className="shadow-sm border-0 rounded-4 overflow-hidden">
            <Card.Body className="p-0">
              <Row className="g-0">
                <Col md={4} className="border-end">
                  <div className="p-4">
                    <h2 className="fw-bold mb-4 d-flex align-items-center">
                      <FaUserCog className="me-2 text-primary" /> Settings
                    </h2>
                    <Tabs
                      activeKey={activeTab}
                      onSelect={(k) => setActiveTab(k)}
                      className="flex-column border-0"
                      id="settings-tabs"
                    >
                      <Tab eventKey="profile" title={
                        <span className="d-flex align-items-center">
                          <FaUserCog className="me-2" /> Profile
                        </span>
                      } className="border-0" />
                      <Tab eventKey="notifications" title={
                        <span className="d-flex align-items-center">
                          <FaBell className="me-2" /> Notifications
                        </span>
                      } className="border-0" />
                      <Tab eventKey="security" title={
                        <span className="d-flex align-items-center">
                          <FaShieldAlt className="me-2" /> Security
                        </span>
                      } className="border-0" />
                    </Tabs>
                  </div>
                </Col>
                <Col md={8}>
                  <div className="p-4 p-lg-5">
                    {showAlert && (
                      <Alert variant="success" onClose={() => setShowAlert(false)} dismissible>
                        Settings saved successfully!
                      </Alert>
                    )}

                    <Form onSubmit={handleSubmit}>
                      {activeTab === 'profile' && (
                        <>
                          <h4 className="fw-bold mb-4">Profile Information</h4>
                          <Form.Group className="mb-3">
                            <Form.Label>Full Name</Form.Label>
                            <Form.Control
                              type="text"
                              name="name"
                              value={formData.name}
                              onChange={handleChange}
                              className="py-2 rounded-3"
                            />
                          </Form.Group>
                          <Row>
                            <Col md={6}>
                              <Form.Group className="mb-3">
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                  type="email"
                                  name="email"
                                  value={formData.email}
                                  onChange={handleChange}
                                  className="py-2 rounded-3"
                                />
                              </Form.Group>
                            </Col>
                            <Col md={6}>
                              <Form.Group className="mb-3">
                                <Form.Label>Phone</Form.Label>
                                <Form.Control
                                  type="tel"
                                  name="phone"
                                  value={formData.phone}
                                  onChange={handleChange}
                                  className="py-2 rounded-3"
                                />
                              </Form.Group>
                            </Col>
                          </Row>
                          <Form.Group className="mb-3">
                            <Form.Label>Company</Form.Label>
                            <Form.Control
                              type="text"
                              name="company"
                              value={formData.company}
                              onChange={handleChange}
                              className="py-2 rounded-3"
                            />
                          </Form.Group>
                          <Form.Group className="mb-4">
                            <Form.Label>Address</Form.Label>
                            <Form.Control
                              as="textarea"
                              rows={3}
                              name="address"
                              value={formData.address}
                              onChange={handleChange}
                              className="rounded-3"
                            />
                          </Form.Group>
                        </>
                      )}

                      {activeTab === 'notifications' && (
                        <>
                          <h4 className="fw-bold mb-4">Notification Preferences</h4>
                          <Form.Group className="mb-3">
                            <Form.Check
                              type="switch"
                              id="email-notifications"
                              label="Email Notifications"
                              name="notifications.email"
                              checked={formData.notifications.email}
                              onChange={handleChange}
                            />
                          </Form.Group>
                          <Form.Group className="mb-3">
                            <Form.Check
                              type="switch"
                              id="sms-notifications"
                              label="SMS Notifications"
                              name="notifications.sms"
                              checked={formData.notifications.sms}
                              onChange={handleChange}
                            />
                          </Form.Group>
                          <Form.Group className="mb-3">
                            <Form.Check
                              type="switch"
                              id="promotion-notifications"
                              label="Promotional Offers"
                              name="notifications.promotions"
                              checked={formData.notifications.promotions}
                              onChange={handleChange}
                            />
                          </Form.Group>
                          <Form.Group className="mb-4">
                            <Form.Check
                              type="switch"
                              id="shipment-notifications"
                              label="Shipment Status Updates"
                              name="notifications.shipmentUpdates"
                              checked={formData.notifications.shipmentUpdates}
                              onChange={handleChange}
                            />
                          </Form.Group>
                        </>
                      )}

                      {activeTab === 'security' && (
                        <>
                          <h4 className="fw-bold mb-4">Security Settings</h4>
                          <Form.Group className="mb-3">
                            <Form.Check
                              type="switch"
                              id="two-factor-auth"
                              label="Two-Factor Authentication"
                              name="security.twoFactorAuth"
                              checked={formData.security.twoFactorAuth}
                              onChange={handleChange}
                            />
                            <Form.Text className="text-muted">
                              Adds an extra layer of security to your account
                            </Form.Text>
                          </Form.Group>
                          <Form.Group className="mb-4">
                            <Form.Check
                              type="switch"
                              id="password-reset"
                              label="Allow Password Reset"
                              name="security.passwordReset"
                              checked={formData.security.passwordReset}
                              onChange={handleChange}
                            />
                            <Form.Text className="text-muted">
                              Enables password reset via email
                            </Form.Text>
                          </Form.Group>
                          <div className="d-grid gap-2">
                            <Button variant="outline-primary" size="lg" className="rounded-3">
                              Change Password
                            </Button>
                          </div>
                        </>
                      )}

                      <div className="d-flex justify-content-between mt-4 pt-3 border-top">
                        <Button variant="danger" className="rounded-3 d-flex align-items-center"
                        onClick={handleLogout}
                        >
                          <FaSignOutAlt className="me-2" /> Logout
                        </Button>
                        <Button variant="primary" type="submit" className="rounded-3 d-flex align-items-center">
                          <FaSave className="me-2" /> Save Changes
                        </Button>
                      </div>
                    </Form>
                  </div>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Settings;