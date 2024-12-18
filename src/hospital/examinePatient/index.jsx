import React, { useState } from 'react';
import { Card, Form, Button, Container, Row, Col } from 'react-bootstrap';

function MedicalRecordForm() {
    const [formData, setFormData] = useState({
        patientId: '',
        fullName: '',
        age: '',
        gender: '',
        address: '',
        insuranceBookNumber:'',
        admissionDate: '',
        room: '',
        diagnosis: '',
        reasonForAdmission: '',
        bloodPressure: '',
        heartRate: '',
        height: '',
        bloodatype: '',
        medicalHistory: '',
        examinationResults: '',
        treatmentPlan: '',
        doctorName: '',
        followUpNotes: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form Data Submitted:', formData);
    };

    return (
        <>
            <Card>
                <Card.Body>
                    <Container>
                        <h2 className="my-4 text-center">Enter Medical Examination Results</h2>
                        <Form onSubmit={handleSubmit}>
                            <Row>
                                <Col md={3}>
                                    <Form.Group controlId="patientId">
                                        <Form.Label>patientId</Form.Label>
                                        <Form.Control type="text" name="patientId" value={formData.patientId} onChange={handleChange} />
                                    </Form.Group>
                                </Col>
                                <Col md={3}>
                                    <Form.Group controlId="fullName">
                                        <Form.Label>fullName</Form.Label>
                                        <Form.Control type="text" name="fullName" value={formData.fullName} onChange={handleChange} />
                                    </Form.Group>
                                </Col>
                                <Col md={3}>
                                    <Form.Group controlId="age">
                                        <Form.Label>age</Form.Label>
                                        <Form.Control type="number" name="age" value={formData.age} onChange={handleChange} />
                                    </Form.Group>
                                </Col>
                                <Col md={3}>
                                    <Form.Group controlId="gender">
                                        <Form.Label>gender</Form.Label>
                                        <Form.Control type="text" name="gender" value={formData.gender} onChange={handleChange} />
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={6}>
                                    <Form.Group controlId="address">
                                        <Form.Label>address</Form.Label>
                                        <Form.Control type="text" name="address" value={formData.address} onChange={handleChange} />
                                    </Form.Group>
                                </Col>
                                <Col md={6}>
                                    <Form.Group controlId="insuranceBookNumber">
                                        <Form.Label>Insurance Book Number</Form.Label>
                                        <Form.Control type="text" name="insuranceBookNumber" value={formData.insuranceBookNumber} onChange={handleChange} />
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Form.Group controlId="admissionDate">
                                <Form.Label>Admission Date</Form.Label>
                                <Form.Control type="date" name="admissionDate" value={formData.admissionDate} onChange={handleChange} />
                            </Form.Group>
                            <Form.Group controlId="room">
                                <Form.Label>Room</Form.Label>
                                <Form.Control type="text" name="room" value={formData.room} onChange={handleChange} />
                            </Form.Group>
                            <Form.Group controlId="reasonForAdmission">
                                <Form.Label>Lý do vào viện</Form.Label>
                                <Form.Control type="text" name="reasonForAdmission" value={formData.reasonForAdmission} onChange={handleChange} />
                            </Form.Group>
                            <Row>
                                <Col md={3}>
                                    <Form.Group controlId="bloodPressure">
                                        <Form.Label>blood Pressure</Form.Label>
                                        <Form.Control type="text" name="bloodPressure" value={formData.bloodPressure} onChange={handleChange} />
                                    </Form.Group>
                                </Col>
                                <Col md={3}>
                                    <Form.Group controlId="heartRate">
                                        <Form.Label>Heart Rate</Form.Label>
                                        <Form.Control type="text" name="heartRate" value={formData.heartRate} onChange={handleChange} />
                                    </Form.Group>
                                </Col>
                                <Col md={3}>
                                    <Form.Group controlId="bloodaType">
                                        <Form.Label>blood Type</Form.Label>
                                        <Form.Control type="text" name="bloodaType" value={formData.bloodaType} onChange={handleChange} />
                                    </Form.Group>
                                </Col>
                                <Col md={3}>
                                    <Form.Group controlId="height">
                                        <Form.Label>Height</Form.Label>
                                        <Form.Control type="number" name="height" value={formData.height} onChange={handleChange} />
                                    </Form.Group>
                                </Col>

                            </Row>
                            <Form.Group controlId="diagnosis">
                                <Form.Label>Diagnosis</Form.Label>
                                <Form.Control type="text" name="diagnosis" value={formData.diagnosis} onChange={handleChange} />
                            </Form.Group>
                            <Form.Group controlId="medicalHistory">
                                <Form.Label>MedicalHistory</Form.Label>
                                <Form.Control as="textarea" name="medicalHistory" value={formData.medicalHistory} onChange={handleChange} />
                            </Form.Group>
                            <Form.Group controlId="examinationResults">
                                <Form.Label>Examination Results</Form.Label>
                                <Form.Control as="textarea" name="examinationResults" value={formData.examinationResults} onChange={handleChange} />
                            </Form.Group>
                            <Form.Group controlId="treatmentPlan">
                                <Form.Label>Treatment Plan</Form.Label>
                                <Form.Control as="textarea" name="treatmentPlan" value={formData.treatmentPlan} onChange={handleChange} />
                            </Form.Group>
                            <Form.Group controlId="followUpNotes">
                                <Form.Label>Follow Up Notes</Form.Label>
                                <Form.Control as="textarea" name="followUpNotes" value={formData.followUpNotes} onChange={handleChange} />
                            </Form.Group>
                            <Button variant="primary" type="submit">Submit</Button>
                        </Form>
                    </Container>
                </Card.Body>
            </Card>
        </>
    );
}

export default MedicalRecordForm;
