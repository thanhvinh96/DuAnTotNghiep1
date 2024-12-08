// import React, { useState } from 'react';
// import { Card, Form, Button, Container, Row, Col } from 'react-bootstrap';

// function MedicalRecordForm() {
//     const [formData, setFormData] = useState({
//         patientId: '',
//         fullName: '',
//         age: '',
//         gender: '',
//         address: '',
//         insuranceBookNumber:'',
//         admissionDate: '',
//         room: '',
//         diagnosis: '',
//         reasonForAdmission: '',
//         bloodPressure: '',
//         heartRate: '',
//         height: '',
//         bloodatype: '',
//         medicalHistory: '',
//         examinationResults: '',
//         treatmentPlan: '',
//         doctorName: '',
//         followUpNotes: ''
//     });

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData({
//             ...formData,
//             [name]: value
//         });
//     };

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         console.log('Form Data Submitted:', formData);
//     };

//     return (
//         <>
//             <Card>
//                 <Card.Body>
//                     <Container>
//                         <h2 className="my-4 text-center">Enter patient information</h2>
//                         <Form onSubmit={handleSubmit}>
//                             <Row>
//                                 <Col md={3}>
//                                     <Form.Group controlId="patientId">
//                                         <Form.Label>patientId</Form.Label>
//                                         <Form.Control type="text" name="patientId" value={formData.patientId} onChange={handleChange} />
//                                     </Form.Group>
//                                 </Col>
//                                 <Col md={3}>
//                                     <Form.Group controlId="fullName">
//                                         <Form.Label>fullName</Form.Label>
//                                         <Form.Control type="text" name="fullName" value={formData.fullName} onChange={handleChange} />
//                                     </Form.Group>
//                                 </Col>
//                                 <Col md={3}>
//                                     <Form.Group controlId="age">
//                                         <Form.Label>age</Form.Label>
//                                         <Form.Control type="number" name="age" value={formData.age} onChange={handleChange} />
//                                     </Form.Group>
//                                 </Col>
//                                 <Col md={3}>
//                                     <Form.Group controlId="gender">
//                                         <Form.Label>gender</Form.Label>
//                                         <Form.Control type="text" name="gender" value={formData.gender} onChange={handleChange} />
//                                     </Form.Group>
//                                 </Col>
//                             </Row>
//                             <Row>
//                                 <Col md={6}>
//                                     <Form.Group controlId="address">
//                                         <Form.Label>address</Form.Label>
//                                         <Form.Control type="text" name="address" value={formData.address} onChange={handleChange} />
//                                     </Form.Group>
//                                 </Col>
//                                 <Col md={6}>
//                                     <Form.Group controlId="insuranceBookNumber">
//                                         <Form.Label>Insurance Book Number</Form.Label>
//                                         <Form.Control type="text" name="insuranceBookNumber" value={formData.insuranceBookNumber} onChange={handleChange} />
//                                     </Form.Group>
//                                 </Col>
//                             </Row>
//                             <Form.Group controlId="admissionDate">
//                                 <Form.Label>Admission Date</Form.Label>
//                                 <Form.Control type="date" name="admissionDate" value={formData.admissionDate} onChange={handleChange} />
//                             </Form.Group>
//                             <Form.Group controlId="room">
//                                 <Form.Label>Room</Form.Label>
//                                 <Form.Control type="text" name="room" value={formData.room} onChange={handleChange} />
//                             </Form.Group>
//                             <Form.Group controlId="reasonForAdmission">
//                                 <Form.Label>Lý do vào viện</Form.Label>
//                                 <Form.Control type="text" name="reasonForAdmission" value={formData.reasonForAdmission} onChange={handleChange} />
//                             </Form.Group>
//                             <Button variant="primary" type="submit">Submit</Button>
//                         </Form>
//                     </Container>
//                 </Card.Body>
//             </Card>
//         </>
//     );
// }

// export default MedicalRecordForm;

import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Card,
  Form,
  Row,
  Col,
  Button,
  Table,
  FormLabel,
} from "react-bootstrap";

const BloodTestForm = () => {
  const [tableData, setTableData] = useState([]);
  let id = "67115977deb595fcd5044e42";
  // Hàm để thêm dòng mới vào bảng
  const addRow = () => {
    setTableData([
      ...tableData,
      { testName: "", referenceValue: "", result: "", unit: "", machine: "" },
    ]);
  };

  // Hàm để xử lý khi thay đổi giá trị input
  const handleInputChange = (index, field, value) => {
    const newData = [...tableData];
    newData[index][field] = value;
    setTableData(newData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "http://127.0.0.1:8000/api/medical-records/",
        id,
        "/addServiceXNNT",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(tableData),
        }
      );
      if (response.ok) {
        const data = await response.json();
        console.log(data);
      } else {
        const error = await response.json();
        console.error(error);
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center">PHIẾU XÉT NƯỚC TIỂU</h2>
          <div className="text-center">
            <Form>
              <Row className="justify-content-center">
                <Col md={2}>
                  <FormLabel>Mã Số Sổ Khám</FormLabel>
                  <Form.Control as="select">
                    <option value=""></option>
                    <option value=""></option>
                  </Form.Control>
                </Col>
              </Row>
            </Form>
          </div>
          <div className="container border p-4">
            <Form onSubmit={handleSubmit}>
              <Table className="table table-bordered text-center mt-5">
                <thead className="thead-light">
                  <tr>
                    <th scope="col">STT</th>
                    <th scope="col">Tên Xét nghiệm</th>
                    <th scope="col">Kết quả</th>
                  </tr>
                </thead>
                <tbody>
                  {tableData.map((item, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>
                        <Form.Control type="text" />
                      </td>
                      <td>
                        <Form.Control type="text" />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
              <div className="d-flex justify-content-between mt-3">
                <Button
                  onClick={addRow}
                  style={{
                    fontSize: "16px",
                    padding: "5px 10px",
                    width: "150px",
                  }}
                >
                  Thêm dòng
                </Button>
                <Button
                  style={{
                    fontSize: "16px",
                    padding: "5px 10px",
                    width: "150px",
                  }}
                >
                  Thêm kết quả
                </Button>
              </div>
            </Form>
          </div>
        </Card.Body>
      </Card>
    </>
  );
};

export default BloodTestForm;
