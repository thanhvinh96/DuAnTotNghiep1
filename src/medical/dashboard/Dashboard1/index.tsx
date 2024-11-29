import React, { useEffect, useState } from 'react';
import { Row, Col, Card, ListGroup, Modal, Button } from "react-bootstrap";
import Statistics from "./Statistics";
import UsersBalances from "./UsersBalances";
import jwtDecode from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import { balances } from "./data";

const Dashboard1 = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [showModal, setShowModal] = useState<boolean>(false);
  const [missingFields, setMissingFields] = useState<string[]>([]);
  const navigate = useNavigate();

  const checkToken = () => {
    const token = localStorage.getItem('jwtToken');
    if (token) {
      try {
        const decodedToken: any = jwtDecode(token);
        const requiredFields = ['identityCard'];
        const missing = requiredFields.filter(field => !decodedToken[field]);
        if (missing.length > 0) {
          setMissingFields(missing);
          setShowModal(true);
        }
      } catch (error) {
        console.error('Error decoding token:', error);
      }
    }
  };

  const handleNavigate = () => {
    navigate('/medical/profile-medical');
  };

  useEffect(() => {
    checkToken();
  }, []);

  return (
    <>
      <div className="dashboard-container">
        {/* Statistics Section */}
        
           
                <Statistics />
             
         

        {/* User Balances Section */}
        
                <UsersBalances balances={balances} />
            
        {/* Missing Information Modal */}
        <Modal
          show={showModal}
          onHide={() => setShowModal(false)}
          centered
          // size="md"
        >
          <Modal.Header closeButton>
            <Modal.Title>
              <i className="bi bi-exclamation-triangle-fill text-warning"></i> Missing Information
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p className="text-muted">
              The following fields are missing or incomplete in your profile:
            </p>
            <ListGroup className="mb-3">
              {missingFields.map((field, index) => (
                <ListGroup.Item
                  key={index}
                  className="d-flex align-items-center"
                >
                  <i className="bi bi-dash text-danger me-2"></i> {field}
                </ListGroup.Item>
              ))}
            </ListGroup>
            <p className="text-muted">
              Please update your profile to fill in these fields.
            </p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Close
            </Button>
            <Button variant="primary" onClick={handleNavigate}>
              Update Profile
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
};

export default Dashboard1;
