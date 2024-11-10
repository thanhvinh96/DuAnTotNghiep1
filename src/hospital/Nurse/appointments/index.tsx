import React, { useState, useEffect } from "react";
import { Row, Col, Card, Button, Modal, Form, Container, Table } from "react-bootstrap";
import PageTitle from "../../../components/PageTitle";
import { GetScheduleByDoctor } from "../../../controller/PersonnelController";
import jwtDecode from 'jwt-decode';

const AppointMents = () => {
  const [showModal, setShowModal] = useState(false);
  const [appointments, setAppointments] = useState<any[]>([]);
  const [dataProfile, setDataProfile] = useState({
    tokenuser: '',
    tokeorg: '',
    value: 'org1',
  });

  // Hàm gọi API để lấy dữ liệu lịch hẹn
  const showdata = async () => {
    try {
      const token = localStorage.getItem('tokenadmin');
      if (token) {
        const decodedToken: any = jwtDecode(token);
        setDataProfile({
          tokenuser: decodedToken['tokenuser'] || '',
          tokeorg: decodedToken['tokeorg'] || '',
          value: 'org1',
        });
        
        const data = { doctor: decodedToken['tokenuser'] || "" };
        const _res = await GetScheduleByDoctor(data);

        // Kiểm tra nếu có dữ liệu trả về từ API và cập nhật vào state appointments
        if (_res) {
          setAppointments(_res);
        }
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  // Gọi showdata khi component mount
  useEffect(() => {
    showdata();
  }, []);

  return (
    <Container fluid className="appointments-container">
      <PageTitle
        breadCrumbItems={[
          { label: "Contacts", path: "/apps/contacts/profile" },
          { label: "Appointments", path: "/apps/contacts/appointments", active: true },
        ]}
        title={"Lịch Hẹn Khám"}
      />

      <Row>
        <Col xl={12}>
          <Card className="shadow-lg p-3 mb-5 bg-white rounded">
            <Card.Body>
              <h5 className="text-uppercase mb-4">Danh Sách Lịch Hẹn</h5>
              <Table striped bordered hover responsive>
                <thead>
                  <tr>
                    <th>Mã Hẹn</th>
                    <th>Chi Nhánh</th>
                    <th>Trạng Thái</th>
                    <th>Khoa</th>
                    <th>Bác Sĩ</th>
                    <th>Ngày Giờ Khám</th>
                    <th>Tiêu Đề</th>
                    <th>Ngày Tạo</th>
                    <th>Ngày Cập Nhật</th>
                    <th>Hành Động</th>
                  </tr>
                </thead>
                <tbody>
                  {appointments.length > 0 ? (
                    appointments.map((appointment) => (
                      <tr key={appointment._id}>
                        <td>{appointment._id}</td>
                        <td>{appointment.branch || "Không có thông tin"}</td>
                        <td>{appointment.className || "Không có thông tin"}</td>
                        <td>{appointment.department || "Không có thông tin"}</td>
                        <td>{appointment.doctor || "Không có thông tin"}</td>
                        <td>{new Date(appointment.timeschedule).toLocaleString()}</td>
                        <td>{appointment.title || "Không có thông tin"}</td>
                        <td>{new Date(appointment.created_at).toLocaleString()}</td>
                        <td>{new Date(appointment.updated_at).toLocaleString()}</td>
                        <td>
                          <Button variant="primary" size="sm" onClick={() => setShowModal(true)}>
                            Xem Chi Tiết
                          </Button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td className="text-center">
                        Không có dữ liệu
                      </td>
                    </tr>
                  )}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Modal cập nhật thông tin */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Cập nhật thông tin lịch hẹn</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formTitle">
              <Form.Label>Tiêu Đề</Form.Label>
              <Form.Control type="text" placeholder="Nhập tiêu đề" />
            </Form.Group>
            <Form.Group controlId="formDepartment" className="mt-3">
              <Form.Label>Khoa</Form.Label>
              <Form.Control type="text" placeholder="Nhập khoa" />
            </Form.Group>
            <Form.Group controlId="formDate" className="mt-3">
              <Form.Label>Ngày Giờ Khám</Form.Label>
              <Form.Control type="datetime-local" />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Đóng
          </Button>
          <Button variant="primary">
            Cập nhật
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default AppointMents;
