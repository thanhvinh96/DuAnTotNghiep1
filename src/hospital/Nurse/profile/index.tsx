import React, { useState, useEffect } from "react";
import { Row, Col, Card, Button, Modal, Form, Image, Container } from "react-bootstrap";
import PageTitle from "../../../components/PageTitle";
import { GetpersonnelByToken } from '../../../controller/PersonnelController';
import jwtDecode from 'jwt-decode';

const Profile = () => {
  const [showModal, setShowModal] = useState(false);
  const [dataProfile, setDataProfile] = useState({
    tokenuser: '',
    tokeorg: '',
    value: 'org1',
  });
  const [personnelData, setPersonnelData] = useState<any>(null);

  const handleUpdateInfo = () => {
    setShowModal(false); // Đóng modal sau khi cập nhật
  };

  useEffect(() => {
    const fetchDataProfile = async () => {
      const token = localStorage.getItem('tokenadmin');
      if (token) {
        const decodedToken: any = jwtDecode(token);
        setDataProfile({
          tokenuser: decodedToken['tokenuser'] || '',
          tokeorg: decodedToken['tokeorg'] || '',
          value: 'org1',
        });
      }
    };
    fetchDataProfile();
  }, []);

  useEffect(() => {
    const fetchPersonnelData = async () => {
      if (dataProfile.tokenuser && dataProfile.tokeorg) {
        try {
          const res = await GetpersonnelByToken(dataProfile);
          setPersonnelData(res.data);
        } catch (error) {
          console.error("Lỗi khi lấy dữ liệu nhân viên:", error);
        }
      }
    };
    fetchPersonnelData();
  }, [dataProfile]);
  function formatDate(dateString:any) {
    const date = new Date(dateString);
  
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');
  
    return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
  }
  
  // Ví dụ sử dụng:
  const dateString = "Sat Nov 09 2024 02:23:04 GMT+0000 (Coordinated Universal Time)";
  console.log(formatDate(dateString)); // Kết quả: "09/11/2024 02:23:04"
  
  return (
    <Container fluid className="profile-container">
      <PageTitle
        breadCrumbItems={[
          { label: "Contacts", path: "/apps/contacts/profile" },
          { label: "Profile", path: "/apps/contacts/profile", active: true },
        ]}
        title={"Thông Tin Nhân Viên"}
      />
      
      <Row>
        <Col xl={12} lg={12}>
          <Card className="profile-card shadow-lg p-3 mb-5 bg-white rounded">
            <Card.Body>
              <Row>
                <Col md={3} className="text-center">
                  {/* Ảnh chân dung */}
                  <Image src={personnelData?.avatar || "https://via.placeholder.com/150"} rounded className="profile-license mb-3" />
                  <p className="text-muted">Ảnh chân dung</p>
                  
                  {/* Ảnh giấy phép */}
                  <Image src={personnelData?.License || "https://via.placeholder.com/150"} className="profile-license mb-3" rounded />
                  <p className="text-muted">Giấy phép hành nghề</p>
                  
                  {/* Ảnh nhận dạng */}
                  <Image src={personnelData?.imgidentification || "https://via.placeholder.com/150"} className="profile-id mb-3" rounded />
                  <p className="text-muted">Ảnh nhận dạng</p>

                  <Button variant="primary" onClick={() => setShowModal(true)} className="update-info-button">
                    Cập nhật thông tin
                  </Button>
                </Col>
                <Col md={9}>
                  <h5 className="text-uppercase profile-name">{personnelData?.fullname || "Tên nhân viên"}</h5>
                  <div className="profile-info">
                    <p><strong>Email:</strong> {personnelData?.email || "example@example.com"}</p>
                    <p><strong>Số điện thoại:</strong> {personnelData?.phone || "Không có số điện thoại"}</p>
                    <p><strong>Địa chỉ:</strong> {personnelData?.address || "Không có địa chỉ"}</p>
                    <p><strong>CCCD:</strong> {personnelData?.cccd || "Không có CCCD"}</p>
                    <p><strong>Chuyên môn:</strong> {personnelData?.specialized || "Không có chuyên môn"}</p>
                    <p><strong>Loại người dùng:</strong> {personnelData?.typeusers || "Không có loại người dùng"}</p>
                    <p><strong>Chi nhánh:</strong> {personnelData?.branch || "Không có chi nhánh"}</p>
                    <p><strong>Năm sinh:</strong> {formatDate(personnelData?.timecreats) || "Không có ngày tạo"}</p>
                  </div>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>

        {/* Modal cập nhật thông tin */}
        <Modal show={showModal} onHide={() => setShowModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Cập nhật thông tin {personnelData?.fullname || "nhân viên"}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="formName">
                <Form.Label>Tên</Form.Label>
                <Form.Control type="text" placeholder="Nhập tên" defaultValue={personnelData?.fullname || ""} />
              </Form.Group>
              <Form.Group controlId="formEmail" className="mt-3">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" placeholder="Nhập email" defaultValue={personnelData?.email || ""} />
              </Form.Group>
              <Form.Group controlId="formPhone" className="mt-3">
                <Form.Label>Số điện thoại</Form.Label>
                <Form.Control type="text" placeholder="Nhập số điện thoại" defaultValue={personnelData?.phone || ""} />
              </Form.Group>
              <Form.Group controlId="formPosition" className="mt-3">
                <Form.Label>Chuyên Môn</Form.Label>
                <Form.Control type="text" placeholder="Nhập chuyên môn" defaultValue={personnelData?.specialized || ""} />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Đóng
            </Button>
            <Button variant="primary" onClick={handleUpdateInfo}>
              Cập nhật
            </Button>
          </Modal.Footer>
        </Modal>
      </Row>
    </Container>
  );
};

export default Profile;
