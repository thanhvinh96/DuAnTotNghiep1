import React, { useEffect, useState } from 'react';
import { Row, Col } from "react-bootstrap";

// components
import Statistics from "./Statistics";
import UsersBalances from "./UsersBalances";
import jwtDecode from 'jwt-decode'; // Sử dụng thư viện jwt-decode để giải mã token
import { Modal, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { balances } from "./data";

const Dashboard1 = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [showModal, setShowModal] = useState<boolean>(false);
  const [missingFields, setMissingFields] = useState<string[]>([]);
  const navigate = useNavigate(); // Khai báo biến điều hướng

  const checkToken = () => {
    const token = localStorage.getItem('jwtToken');
    if (token) {
      try {
        const decodedToken: any = jwtDecode(token);
        console.log(jwtDecode(token));
        const requiredFields = ['identityCard'];
        const missing = requiredFields.filter(field => !decodedToken[field]);
        console.log(missing);
        if (missing.length > 0) {
          setMissingFields(missing);

          setShowModal(true);
        }
      } catch (error) {
        console.error('Lỗi giải mã token:', error);
      }
    }
  }

  /*
   * Xử lý thay đổi ngày
   */
  const handleNavigate = () => {
    navigate('/medical/profile-medical');
  }

  const onDateChange = (date: Date) => {
    if (date) {
      setSelectedDate(date);
    }
  };

  useEffect(() => {
    checkToken();
  }, [])

  return (
    <>
      <Statistics />
      <Row>
        <Col xl={12}>
          <UsersBalances balances={balances} />
        </Col>
      </Row>
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Thông Tin Thiếu</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Các trường thông tin sau còn thiếu hoặc chưa được điền trong hồ sơ của bạn:</p>
          <ul>
            {missingFields.map((field, index) => (
              <li key={index}>{field}</li>
            ))}
          </ul>
          <p>Vui lòng cập nhật hồ sơ của bạn để điền các trường này.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Đóng
          </Button>
          <Button variant="primary" onClick={() => handleNavigate()}>
            Cập nhật
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Dashboard1;
