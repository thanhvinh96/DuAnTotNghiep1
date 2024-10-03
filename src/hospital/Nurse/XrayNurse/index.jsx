import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, Form, Row, Col , Button } from 'react-bootstrap';

const XRayRequestForm = () => {
  const [image, setImage] = useState(null);

  const handleImageChange = (e) => {
    setImage(e.target.files[0])
  };
  return (
    <>
      <Card>
        <Card.Body>
          <h2 className='text-center'>PHIẾU CHỤP X-QUANG</h2>
          <div className="container border p-4">
            <Form>
              <Form.Group>
                <Row>
                  <Col md={4}>
                    <Form.Label>FullName</Form.Label>
                    <Form.Control type="text"></Form.Control>
                  </Col>
                  <Col md={4}>
                    <Form.Label>Age</Form.Label>
                    <Form.Control type="text"></Form.Control>
                  </Col>
                  <Col md={4}>
                    <Form.Label>gender</Form.Label>
                    <Form.Control type="text"></Form.Control>
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <Form.Label>Address</Form.Label>
                    <Form.Control type="text"></Form.Control>
                  </Col>
                  <Col md={6}>
                    <Form.Label>Số bảo hiểm</Form.Label>
                    <Form.Control type="text"></Form.Control>
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <Form.Label>Date</Form.Label>
                    <Form.Control type="date"></Form.Control>
                  </Col>
                  <Col md={6}>
                    <Form.Label>Doctor</Form.Label>
                    <Form.Control type="text"></Form.Control>
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <Form.Label>Chẩn Đoán</Form.Label>
                    <Form.Control type="text"></Form.Control>
                  </Col>
                  <Col md={6}>
                    <Form.Label>Yêu cầu chụp/chiếu</Form.Label>
                    <Form.Control type="text"></Form.Control>
                  </Col>
                </Row>
                <Row>
                  <Col md={9}>
                    <Form.Label>Upload Image</Form.Label>
                    <Form.Control type="file" onChange={handleImageChange}></Form.Control>
                  </Col>
                  <Col md={3} className='mt-4'>
                    <Button className='mt-2' type='submit'> Submit </Button>
                  </Col>
                </Row>
              </Form.Group>
            </Form>
          </div>
        </Card.Body>
      </Card >
    </>
  );
};

export default XRayRequestForm;