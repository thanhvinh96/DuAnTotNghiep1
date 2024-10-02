// src/pages/profile/ProfileMedical.tsx

import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { Row, Col, Form, Button, Card, Modal } from 'react-bootstrap';
import PageTitle from "../../components/PageTitle";
import jwtDecode from 'jwt-decode';
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from 'react-hook-form';

// Define an interface for the record object
interface Record {
  tokenmedical: string;
  name: string;
  email: string;
  birthDate: string;
  gender: string;
  address: string;
  phoneNumber: string;
  identityCard: string;
  cccd: string;
  cccdImagebase64: string;
}
interface DecodedToken {
  tokenmedical: string;
  name: string;
  birthDate: string;
  gender: string;
  email: string;
  address: string;
  phoneNumber: string;
  identityCard: string;
  cccd: string;
  medicalHistory: Array<{
    disease: string;
    treatment: string;
  }>;
  currentStatus: {
    symptoms: string;
    diagnosis: string;
    treatmentPlan: string;
  };
  authorizedEntities: Array<string>; // Danh sách các thực thể được phép truy cập
  accessRequests: Array<{
    requestor: string;
    status: string;
  }>; // Danh sách các yêu cầu quyền truy cập
}


const schema = yup.object().shape({
  cccd: yup.string().required("Please enter your CCCD"),
});

const ProfileMedical: React.FC = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [record, setRecord] = useState<Record>({
    tokenmedical: '',
    name: '',
    email: '',
    birthDate: '',
    gender: '',
    address: '',
    phoneNumber: '',
    identityCard: '',
    cccd: '',
    cccdImagebase64: '',

  });

  useEffect(() => {
    const token = localStorage.getItem('jwtToken');
    if (token) {
      const decodedToken: any = jwtDecode(token);
      setRecord({
        tokenmedical: decodedToken.tokenmedical || '',
        name: decodedToken.name || '',
        email: decodedToken.email || '',
        birthDate: decodedToken.birthDate || '',
        gender: decodedToken.gender || '',
        address: decodedToken.address || '',
        phoneNumber: decodedToken.phoneNumber || '',
        identityCard: decodedToken.identityCard || '',
        cccd: decodedToken.cccd || '',
        cccdImagebase64: decodedToken.cccd || '',
      });
    }
  }, []);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        console.log("Base64 String: ", base64String); // For debugging
        setRecord((prevRecord) => ({
          ...prevRecord,
          cccdImagebase64: base64String, // Set base64 string to state
        }));
      };
      reader.onerror = (error) => {
        console.error("Error reading file: ", error);
      };
      reader.readAsDataURL(file); // Read the file as a Data URL (base64 string)
    } else {
      console.error("No file selected");
    }
  };

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    
    // Extracting form values using document.getElementById
    const tokenmedical = (document.getElementById('formTokenMedical') as HTMLInputElement)?.value || '';
    const birthDate = (document.getElementById('formBirthDate') as HTMLInputElement)?.value || '';
    const gender = (document.getElementById('formGender') as HTMLSelectElement)?.value || '';
    const address = (document.getElementById('formAddress') as HTMLInputElement)?.value || '';
    const phoneNumber = (document.getElementById('formPhoneNumber') as HTMLInputElement)?.value || '';
    const identityCard = (document.getElementById('cccdImagebase64') as HTMLInputElement)?.value || '';
    const cccd = (document.getElementById('numbercccd') as HTMLInputElement)?.value || '';
    
    // Creating data object with required fields
    const data = {
      tokenmedical,
      birthDate,
      gender,
      address,
      phoneNumber,
      identityCard,
      cccd,
    };
  
    console.log('Submitted data:', data);
  
    fetch("http://42.96.2.80:3002/update-record", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(result => {
      localStorage.removeItem("jwtToken");
// Lưu JWT token vào localStorage
const decoded = jwtDecode<DecodedToken>(result.transactionResult.token);

// Save token in localStorage
console.log(result.transactionResult.token);
localStorage.setItem("jwtToken", result.transactionResult.token);
console.log("User info:", decoded);

      console.log('Success:', result);
    })
    .catch(error => {
      console.error('Error:', error);
    });
  };

  return (
    <>
      <PageTitle
        breadCrumbItems={[
          { label: "Profile Medical", path: "/profile/medical" },
          { label: "Profile Medical", path: "/profile/medical", active: true },
        ]}
        title={"Profile Medical"}
      />
      <Card>
        <Card.Body>
          <Form onSubmit={onSubmit}>
            <Row>
              <Col md={6}>
                <Form.Group controlId="formTokenMedical">
                  <Form.Label>Token Medical</Form.Label>
                  <Form.Control
                    type="text"
                    id="formTokenMedical"
                    value={record.tokenmedical}
                    readOnly
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="formName">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    id="formName"
                    value={record.name}
                    onChange={(e) => setRecord({ ...record, name: e.target.value })}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <Form.Group controlId="formEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    id="formEmail"
                    value={record.email}
                    onChange={(e) => setRecord({ ...record, email: e.target.value })}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="formBirthDate">
                  <Form.Label>Birth Date</Form.Label>
                  <Form.Control
                    type="date"
                    id="formBirthDate"
                    value={record.birthDate}
                    onChange={(e) => setRecord({ ...record, birthDate: e.target.value })}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <Form.Group controlId="formGender">
                  <Form.Label>Gender</Form.Label>
                  <Form.Control
                    as="select"
                    id="formGender"
                    value={record.gender}
                    onChange={(e) => setRecord({ ...record, gender: e.target.value })}
                  >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </Form.Control>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="formAddress">
                  <Form.Label>Address</Form.Label>
                  <Form.Control
                    type="text"
                    id="formAddress"
                    value={record.address}
                    onChange={(e) => setRecord({ ...record, address: e.target.value })}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <Form.Group controlId="formPhoneNumber">
                  <Form.Label>Phone Number</Form.Label>
                  <Form.Control
                    type="text"
                    id="formPhoneNumber"
                    value={record.phoneNumber}
                    onChange={(e) => setRecord({ ...record, phoneNumber: e.target.value })}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                {/* <Form.Group controlId="formIdentityCard">
                  <Form.Label>Identity Card</Form.Label>
                  <Form.Control
                    type="text"
                    id="formIdentityCard"
                    value={record.identityCard}
                    onChange={(e) => setRecord({ ...record, identityCard: e.target.value })}
                  />
                </Form.Group> */}
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <Form.Group controlId="formCCCD">
                  <Form.Label>CCCD</Form.Label>
                  <Form.Control
                    type="text"
                    id="numbercccd"
                    value={record.cccd}
                    onChange={(e) => setRecord({ ...record, cccd: e.target.value })}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="formCccdImage">
                  <Form.Label>CCCD Image</Form.Label>
                  <div className="d-flex align-items-center">
                    <Form.Control
                      type="file"
                      name="cccdImage"
                      className="me-2"
                      onChange={handleFileChange}
                    />
                    <Button variant="primary" onClick={() => setShowModal(true)}>
                      Show
                    </Button>
                  </div>
                </Form.Group>
                <Form.Group controlId="cccdImagebase64">
                  <Form.Control
                    type="hidden"
                    id="cccdImagebase64"
                    defaultValue={record.cccdImagebase64}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Button variant="primary" type="submit" className="mt-3">
              Save
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>CCCD Image</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {record.cccdImagebase64 && (
            <img src={record.cccdImagebase64} alt="CCCD" style={{ width: '100%' }} />
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ProfileMedical;