import React, { useEffect, useState } from "react";
// import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Row, Col } from "react-bootstrap";

import { Button, Modal } from "react-bootstrap";
import jwtDecode from 'jwt-decode';
import PageTitle from "../../components/PageTitle";
import { GetInfoHospital } from "../../controller/HospitalController";

/* social links */
const Profile = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [orgData, setorgData] = useState({
    nameorg: '',
    phoneadmin: '',
    emailadmin: '',
    addressadmin: '',
    tokeorg: '',
    businessBase64: '',
    timestamp: ''
  });
  const getData = async () => {
    const token = localStorage.getItem('tokenadmin');
    if (token) {
      try {
        const decodedToken: any = jwtDecode(token);
  
        console.log("tê tổ chức" + decodedToken['branch']);

        const tokeorg = decodedToken['tokeorg'];
        if (tokeorg) {
          const dataorg = {
            "tokenorg": tokeorg
          };
          const res = await GetInfoHospital(dataorg);
          // const response = await fetch('http://42.96.2.80:3002/getinfo-org/', {
          //   method: 'POST',
          //   body: JSON.stringify(dataorg),
          //   headers: {
          //     "Content-Type": "application/json",
          //   },
          // });

          // if (!response.ok) {
          //   throw new Error('Network response was not ok');
          // }
          console.log(res.result);
          // const data = await res.json();
          console.log(res.result)
          console.log(res.result.nameorg);
          setorgData({
            nameorg: res.result.nameorg || '',
            phoneadmin: res.result.phoneadmin || '',
            emailadmin: res.result.emailadmin || '',
            addressadmin: res.result.addressadmin || '',
            tokeorg: res.result.tokeorg || '',
            businessBase64: res.result.businessBase64 || '',
            timestamp: res.result.timestamp || '',
          });
          // Xử lý dữ liệu nhận được tại đây
        }


      } catch (error) {
        console.error('Có lỗi xảy ra:', error);
      }
    }
  };

  useEffect(() => {
    getData()
  }, [])
  return (
    <>
    <PageTitle
      breadCrumbItems={[
        { label: "Trang chủ", path: "/hospital/home" },
        { label: "Thông tin bệnh viện", path: "/features/tables/advanced", active: true },
      ]}
      title={"Thông tin bệnh viện"}
    />
    <Row>
      {/* Cột bên trái: Thông tin Tổ chức */}
      <Col md={8}>
        <div className="card custom-card shadow-none mb-4">
          <div className="card-body">
            <h4 className="mb-4">Thông tin Tổ chức</h4>
            <div className="row">
              <div className="col-md-6 mb-4">
                <label className="form-label">
                  Tên tổ chức <span className="text-danger">*</span>
                </label>
                <div className="input-group">
                  <span className="input-group-text">
                    <i className="fa-solid fa-building"></i>
                  </span>
                  <input
                    type="text"
                    className="form-control"
                    value={orgData.nameorg}
                    placeholder="Nhập tên tổ chức"
                  />
                </div>
              </div>

              <div className="col-md-6 mb-4">
                <label className="form-label">
                  Số điện thoại tổ chức <span className="text-danger">*</span>
                </label>
                <div className="input-group">
                  <span className="input-group-text">
                    <i className="fa-solid fa-phone"></i>
                  </span>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Nhập số điện thoại tổ chức"
                    value={orgData.phoneadmin}
                  />
                </div>
              </div>

              <div className="col-md-6 mb-4">
                <label className="form-label">
                  Email tổ chức <span className="text-danger">*</span>
                </label>
                <div className="input-group">
                  <span className="input-group-text">
                    <i className="fa-solid fa-envelope"></i>
                  </span>
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Nhập email tổ chức"
                    value={orgData.emailadmin}
                  />
                </div>
              </div>

              <div className="col-md-6 mb-4">
                <label className="form-label">
                  Địa chỉ tổ chức <span className="text-danger">*</span>
                </label>
                <div className="input-group">
                  <span className="input-group-text">
                    <i className="fa-solid fa-map-marker-alt"></i>
                  </span>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Nhập địa chỉ tổ chức"
                    value={orgData.addressadmin}
                  />
                </div>
              </div>

              <div className="col-md-6 mb-4">
                <label className="form-label">
                  Mã Token Bệnh viện <span className="text-danger">*</span>
                </label>
                <div className="input-group">
                  <input
                    type={passwordVisible ? "text" : "password"}
                    className="form-control"
                    placeholder="Nhập mã token"
                    value={orgData.tokeorg}
                  />
                  <button
                    style={{ width: '80px' }}
                    type="button"
                    className="btn btn-primary"
                    onClick={togglePasswordVisibility}
                  >
                    {passwordVisible ? "Ẩn" : "Hiện"}
                  </button>
                </div>
              </div>

              <div className="col-md-6 mb-4">
                <label className="form-label">
                  Giấy phép kinh doanh <span className="text-danger">*</span>
                </label>
                <Button variant="primary" onClick={handleShow}>Xem</Button>
                <Modal show={show} onHide={handleClose} centered>
                  <Modal.Header closeButton>
                    <Modal.Title>Giấy phép kinh doanh</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <img
                      src={orgData.businessBase64}
                      alt="Giấy phép kinh doanh"
                      className="img-fluid"
                      style={{ maxHeight: "500px", width: "100%" }}
                    />
                  </Modal.Body>
                  <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                      Đóng
                    </Button>
                  </Modal.Footer>
                </Modal>
              </div>

              <div className="col-12 d-flex justify-content-between mt-4">
                <Link to='/hospital/home'>
                  <div className="btn btn-danger" style={{ width: '100px' }}>
                    <i className="fa fa-fw fa-undo"></i> Quay lại
                  </div>
                </Link>
                <button type="submit" className="btn btn-primary" style={{ width: '80px' }}>
                  <i className="bi bi-download"></i> Lưu
                </button>
              </div>
            </div>
          </div>
        </div>
      </Col>

      {/* Cột bên phải: Profile Admin mẫu */}
      <Col md={4}>
        <div className="card custom-card shadow-none mb-4">
          <div className="card-body">
            <h4 className="mb-4">Profile Admin mẫu</h4>
            <p><strong>Tên:</strong> Nguyễn Văn A</p>
            <p><strong>Email:</strong> nguyenvana@hospital.com</p>
            <p><strong>Số điện thoại:</strong> 0901234567</p>
            <p><strong>Địa chỉ:</strong> 123 Đường ABC, Quận 1, TP.HCM</p>
            <p><strong>Vai trò:</strong> Quản trị viên</p>
            <p><strong>Chức vụ:</strong> Giám đốc điều hành</p>
          </div>
        </div>
      </Col>
    </Row>
  </>

  );
};

export default Profile;
