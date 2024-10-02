import React, { useState } from 'react';
import { Card, Form, Button, Container, Row, Col } from 'react-bootstrap';

function MedicalRecordForm() {
    const [formData, setFormData] = useState({
        patientId: '',
        fullName: '',
        age: '',
        gender: '',
        address: '',
        insuranceBookNumber: '',
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
                        <div className="container mt-5">
                            <h2 className="text-center m-0">Thông Tin Bệnh Nhân</h2>
                            <p className="text-center m-0">Bệnh viện: BỆNH VIỆN SÀI GÒN</p>
                            <p className="text-center m-0">Điện thoại: 0764771159</p>
                            <p className="text-center m-0">Ngày khám: 13 tháng 05 năm 2024</p>
                            <Form>
                                <Form.Group className="mb-3 col-9 m-auto ">
                                    <Form.Label>Họ tên:</Form.Label>
                                    {/* <Form.Control type="text" value="Dương Tiến Công" readOnly /> */}
                                    <span> Dương Tiến Công</span> <br />
                                    <Form.Label>Giới tính:</Form.Label>
                                    <span> Nam</span> <br />
                                    {/* <Form.Control type="text" value="N" readOnly /> */}
                                    <Form.Label>Tuổi:</Form.Label>
                                    <span> 25</span> <br />
                                    {/* <Form.Control type="text" value="24 tuổi" readOnly /> */}
                                    <Form.Label>Địa chỉ:</Form.Label>
                                    <span> 123 Nguyễn Văn Cừ, P. Nguyễn Cư Trinh, Q1, TP.HCM</span> <br />
                                    {/* <Form.Control type="text" value="Thanh Xuân" readOnly /> */}
                                    <Form.Label>Số bảo hiểm:</Form.Label>
                                    <span> 1234567890</span> <br />
                                    {/* <Form.Control type="text" value="cd 00000000" readOnly /> */}
                                </Form.Group>
                            </Form>
                            </div>
                            <Form onSubmit={handleSubmit}>
                                <Row>
                                    <Col md={6}>
                                        <Form.Group controlId="bloodPressure">
                                            <Form.Label>blood Pressure</Form.Label>
                                            <Form.Control type="text" name="bloodPressure" value={formData.bloodPressure} onChange={handleChange} />
                                        </Form.Group>
                                    </Col>
                                    <Col md={6}>
                                        <Form.Group controlId="heartRate">
                                            <Form.Label>Heart Rate</Form.Label>
                                            <Form.Control type="text" name="heartRate" value={formData.heartRate} onChange={handleChange} />
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row>
                                <Col md={6}>
                                        <Form.Group controlId="bloodaType">
                                            <Form.Label>blood Type</Form.Label>
                                            <Form.Control type="text" name="bloodaType" value={formData.bloodaType} onChange={handleChange} />
                                        </Form.Group>
                                    </Col>
                                    <Col md={6}>
                                        <Form.Group controlId="height">
                                            <Form.Label>Height</Form.Label>
                                            <Form.Control type="number" name="height" value={formData.height} onChange={handleChange} />
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <hr/>
                                <Button variant="primary" type="submit">Submit</Button>
                            </Form>
                    </Container>
                </Card.Body>
            </Card>
        </>
    );
}

export default MedicalRecordForm;
