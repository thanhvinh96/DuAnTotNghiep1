import React, { useState, useEffect } from "react";
import { Form, Button, Card, Row, Col, Modal, Table } from "react-bootstrap";
import PageTitle from "../../components/PageTitle";
import { useLocation } from "react-router-dom";
import jwtDecode from "jwt-decode";
import { GetInfoHospital } from "../../controller/HospitalController";
import { GetpersonnelByToken } from "../../controller/PersonnelController";

export default function EditUserForm() {
  const [formData, setFormData] = useState({
    fullname: "",
    address: "",
    phone: "",
    typeusers: "",
    cccd: "",
    imgidentification: "",
    branch: "",
    password: "",
    avatar: "",
    License: "",
    tokenuser: "",
    timecreats: "",
    historyUser: [],
  });

  const [showModal, setShowModal] = useState(false);
  const [modalImage, setModalImage] = useState("");

  const location = useLocation();

  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = (image: string) => {
    setModalImage(image);
    setShowModal(true);
  };

  const getQueryParams = () => {
    const params = new URLSearchParams(location.search);
    return params.get("tokenuser");
  };

  const fetchUserData = async () => {
    try {
      const token = localStorage.getItem("tokenadmin");
      if (token) {
        const decodedToken: any = jwtDecode(token);
        const tokeorg = decodedToken["tokeorg"];
        const dataorg = { tokenorg: tokeorg };

        const response = await GetInfoHospital(dataorg);
        const tokenuser = getQueryParams();

        if (tokenuser) {
          const updatedDataget = {
            tokenuser: tokenuser,
            tokeorg: response.result.tokeorg,
            value: "org1",
          };
          const _response: any = await GetpersonnelByToken(updatedDataget);
          if (_response.success === true) {
            setFormData(_response.data);
          }
        }
      }
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu:", error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Dữ liệu chỉnh sửa:", formData);
    // Gửi dữ liệu form tới API
  };

  return (
    <>
      <PageTitle
        breadCrumbItems={[
          { label: "Trang chủ", path: "/" },
          { label: "Quản lý nhân sự", path: "/hospital/personnel-management" },
          { label: "Chỉnh sửa nhân sự", path: "/hospital/edit-personnel", active: true },
        ]}
        title={"Chỉnh sửa thông tin nhân sự"}
      />

      <Row>
        <Col>
          <Card>
            <Card.Body>
              <h4 className="header-title">Cập nhật thông tin nhân sự</h4>
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formFullname" className="mb-3">
                  <Form.Label>Họ và tên</Form.Label>
                  <Form.Control
                    type="text"
                    name="fullname"
                    value={formData.fullname}
                    onChange={handleInputChange}
                    placeholder="Nhập họ và tên"
                  />
                </Form.Group>

                <Form.Group controlId="formAddress" className="mb-3">
                  <Form.Label>Địa chỉ</Form.Label>
                  <Form.Control
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    placeholder="Nhập địa chỉ"
                  />
                </Form.Group>

                <Form.Group controlId="formPhone" className="mb-3">
                  <Form.Label>Số điện thoại</Form.Label>
                  <Form.Control
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="Nhập số điện thoại"
                  />
                </Form.Group>

                <Form.Group controlId="formCccd" className="mb-3">
                  <Form.Label>CCCD</Form.Label>
                  <Form.Control
                    type="text"
                    name="cccd"
                    value={formData.cccd}
                    onChange={handleInputChange}
                    placeholder="Nhập CCCD"
                  />
                </Form.Group>

                <Form.Group controlId="formTypeusers" className="mb-3">
                  <Form.Label>Loại người dùng</Form.Label>
                  <Form.Control
                    type="text"
                    name="typeusers"
                    value={formData.typeusers}
                    onChange={handleInputChange}
                    placeholder="Nhập loại người dùng"
                  />
                </Form.Group>

                <Row className="mb-3">
  <Col xs={12} md={4} className="text-center">
    <Form.Group controlId="formAvatar">
      <Form.Label>Ảnh đại diện</Form.Label>
      <div className="mb-3">
        <img
          src={formData.avatar || "https://via.placeholder.com/150"}
          alt="Ảnh đại diện"
          onClick={() => handleShowModal(formData.avatar || "https://via.placeholder.com/150")}
          style={{
            width: "100px",
            height: "100px",
            cursor: "pointer",
            marginBottom: "10px",
            border: "1px solid #ccc",
            objectFit: "cover",
          }}
        />
      </div>
    </Form.Group>
  </Col>

  <Col xs={12} md={4} className="text-center">
    <Form.Group controlId="formLicense">
      <Form.Label>Giấy phép hành nghề</Form.Label>
      <div className="mb-3">
        <img
          src={formData.License || "https://via.placeholder.com/150"}
          alt="Giấy phép hành nghề"
          onClick={() => handleShowModal(formData.License || "https://via.placeholder.com/150")}
          style={{
            width: "100px",
            height: "100px",
            cursor: "pointer",
            marginBottom: "10px",
            border: "1px solid #ccc",
            objectFit: "cover",
          }}
        />
      </div>
    </Form.Group>
  </Col>

  <Col xs={12} md={4} className="text-center">
    <Form.Group controlId="formImgIdentification">
      <Form.Label>Ảnh CCCD</Form.Label>
      <div className="mb-3">
        <img
          src={formData.imgidentification || "https://via.placeholder.com/150"}
          alt="Ảnh CCCD"
          onClick={() => handleShowModal(formData.imgidentification || "https://via.placeholder.com/150")}
          style={{
            width: "100px",
            height: "100px",
            cursor: "pointer",
            marginBottom: "10px",
            border: "1px solid #ccc",
            objectFit: "cover",
          }}
        />
      </div>
    </Form.Group>
  </Col>
</Row>


                <Button variant="primary" type="submit" className="mt-3">
                  Lưu thông tin
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="mt-4">
        <Col>
          <Card>
            <Card.Body>
              <h4 className="header-title">Lịch sử hoạt động</h4>
              {formData.historyUser && formData.historyUser.length > 0 ? (
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>Thời gian</th>
                      <th>Hành động</th>
                      <th>Chi tiết</th>
                    </tr>
                  </thead>
                  <tbody>
                    {formData.historyUser.map((history: any, index: number) => (
                      <tr key={index}>
                        <td>{new Date(history.timestamp).toLocaleString()}</td>
                        <td>{history.action}</td>
                        <td>
                          {Object.entries(history.data).map(([key, value]) => (
                            <p key={key}>
                              <strong>{key}:</strong> {value}
                            </p>
                          ))}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              ) : (
                <p>Không có lịch sử hoạt động</p>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Hình ảnh</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <img
            src={modalImage}
            alt="Hình phóng to"
            style={{ width: "100%", height: "auto" }}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Đóng
          </Button>
        </Modal.Footer>

</Modal>


    </>
  );
}
