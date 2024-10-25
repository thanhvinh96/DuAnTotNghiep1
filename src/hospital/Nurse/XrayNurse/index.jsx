import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, Form, Row, Col, Button, FormLabel } from 'react-bootstrap';

const XRayRequestForm = () => {
  const [image, setImage] = useState(null);
  const [maSoSoKham, setMaSoSoKham] = useState('');
  const [maSoSoKhamList, setMaSoSoKhamList] = useState([]);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleMaSoSoKhamChange = (e) => {
    setMaSoSoKham(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('image', image);
    formData.append('maSoSoKham', maSoSoKham);

    try {
      const response = await fetch('http://127.0.0.1:8000/api/medical-records/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: formData,
      });
      const result = await response.json();
      if (response.ok) {
        console.log('Upload thành công:', result);
        Swal.fire({
          title: 'Upload thành công!',
          text: `Mã sổ khám: ${maSoSoKham}`,
          icon: 'success',
          confirmButtonText: 'OK',
        });
      } else {
        console.error('Lỗi khi upload:', result);
        Swal.fire({
          title: 'Lỗi khi upload',
          text: result.message || 'Không thể upload. Vui lòng thử lại.',
          icon: 'error',
          confirmButtonText: 'OK',
        });
      }
    } catch (error) {
      console.error('Lỗi mạng:', error);
      Swal.fire({
        title: 'Lỗi mạng',
        text: 'Không thể kết nối đến máy chủ. Vui lòng thử lại sau.',
        icon: 'error',
        confirmButtonText: 'OK',
      });
    }
  };

  useEffect(() => {
    const fetchMaSoSoKham = async () => {
      try {
        const response = await fetch('/api/masosokham'); // Gọi API để lấy danh sách mã số sổ khám
        const data = await response.json();
        setMaSoSoKhamList(data);
      } catch (error) {
        console.error("Failed to fetch ma so so kham:", error);
      }
    };

    fetchMaSoSoKham();
  }, []);

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className='text-center'>PHIẾU CHỤP X-QUANG</h2>
          <div className='text-center'>
            <Form onSubmit={handleSubmit}>
              <Row className="justify-content-center">
                <Col md={2}>
                  <FormLabel>Mã Số Sổ Khám</FormLabel>
                  <Form.Control as="select" value={maSoSoKham} onChange={handleMaSoSoKhamChange}>
                    <option value="">Chọn mã số sổ khám</option>
                    {maSoSoKhamList.map((item) => (
                      <option key={item.id} value={item.id}>{item.name}</option>
                    ))}
                  </Form.Control>
                </Col>
              </Row>
              <div className="container border p-4">
                <Form.Group>
                  <Row>
                    <Col md={9}>
                      <Form.Label>Upload Image</Form.Label>
                      <Form.Control type="file" onChange={handleImageChange}></Form.Control>
                    </Col>
                    <Col md={3} className='mt-4'>
                      <Button className='mt-2' type='submit'>Submit</Button>
                    </Col>
                  </Row>
                </Form.Group>
              </div>
            </Form>
          </div>
        </Card.Body>
      </Card>
    </>
  );
};

export default XRayRequestForm;
