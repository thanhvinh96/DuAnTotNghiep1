import React, { useEffect, ChangeEvent, FormEvent, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Navigate, Link } from "react-router-dom";
import { Button, Alert, Row, Col, Form, Modal } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import classNames from "classnames";
import jwtDecode from 'jwt-decode';

//actions
import { resetAuth, signupUser } from "../../redux/actions";

import { RootState, AppDispatch } from "../../redux/store";

// components
import { VerticalForm, FormInput } from "../../components/";
import PageTitle from "../../components/PageTitle";

/* social links */
const Profile = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

 const [orgData,setorgData] = useState({
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
        // console.log("phanthuyen"+decodedToken['branch']);
        console.log(decodedToken['tokeorg']);
        console.log("tê tổ chức"+decodedToken['nameorg']);
  
        const tokeorg = decodedToken['tokeorg'];
        if(tokeorg){
          const dataorg = {
            "tokenorg": tokeorg
          };
    
          const response = await fetch('http://127.0.0.1:8000/api/organizations', {
            method: 'POST',
            body: JSON.stringify(dataorg),
            headers: {
              "Content-Type": "application/json",
            },
          });
    
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
    
          const data = await response.json();
          console.log(data.result)
          console.log(data.result.nameorg);
          setorgData({
            nameorg: data.result.nameorg|| '',
            phoneadmin: data.result.phoneadmin|| '',
            emailadmin: data.result.emailadmin|| '',
            addressadmin: data.result.addressadmin|| '',
            tokeorg: data.result.tokeorg|| '',
            businessBase64: data.result.businessBase64|| '',
            timestamp: data.result.timestamp|| '',
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
  },[])
  return (
    <>
      <PageTitle
        breadCrumbItems={[
          { label: "Tables", path: "/features/tables/advanced" },
          {
            label: "Information hospital",
            path: "/features/tables/advanced",
            active: true,
          },
        ]}
        title={"Information hospital"}
      />
      <div className="col-12">
        <div className="card custom-card shadow-none mb-4">
          <div className="card-body">
            <div className="row">
              {/* Organization Name */}
              <div className="col-md-6">
                <div className="mb-4">
                  <label className="form-label">
                    Organization Name (<span className="text-danger">*</span>)
                  </label>
                  <div className="input-group">
                    <span className="input-group-text">
                      <i className="fa-solid fa-building"></i>
                    </span>
                    <input
                      type="text"
                      className="form-control"
                      value={orgData.nameorg}
                      placeholder="Enter organization name"
                      // defaultValue="trasnminhfhong" // Pre-filled from JSON
                    />
                  </div>
                </div>
              </div>

              {/* Admin Name */}
              <div className="col-md-6">
                <div className="mb-4">
                  <label className="form-label">
                    Phone Organization (<span className="text-danger">*</span>)
                  </label>
                  <div className="input-group">
                    <span className="input-group-text">
                      <i className="fa-solid fa-user"></i>
                    </span>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter admin name"
                      value={orgData.phoneadmin}
                    />
                  </div>
                </div>
              </div>

              {/* Admin Email */}
              <div className="col-md-6">
                <div className="mb-4">
                  <label className="form-label">
                  Email Organization (<span className="text-danger">*</span>)
                  </label>
                  <div className="input-group">
                    <span className="input-group-text">
                      <i className="fa-solid fa-envelope"></i>
                    </span>
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Enter admin email"
                      value={orgData.emailadmin}
                    />
                  </div>
                </div>
              </div>

              {/* Admin Address */}
              <div className="col-md-6">
                <div className="mb-4">
                  <label className="form-label">
                    Admin Address (<span className="text-danger">*</span>)
                  </label>
                  <div className="input-group">
                    <span className="input-group-text">
                      <i className="fa-solid fa-map-marker-alt"></i>
                    </span>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter admin address"
                      value={orgData.addressadmin}
                    />
                  </div>
                </div>
              </div>

              {/* Admin CCCD */}
              <div className="col-md-6">
                <label className="form-label">
                  Token Hospital (<span className="text-danger">*</span>)
                </label>
                <div className="mb-4">
                  <div className="input-group">
                    <input
                      type={passwordVisible ? "text" : "password"} // Điều chỉnh type dựa trên trạng thái
                      className="form-control"
                      placeholder="Enter admin password"
                      value={orgData.tokeorg}
                    />
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={togglePasswordVisibility}
                    >
                      {passwordVisible ? "Hide" : "Show"} {/* Hiển thị "Show" hoặc "Hide" */}
                    </button>
                  </div>
                </div>
              </div>

              {/* Admin Phone */}
              <div className="col-md-6">
                <div className="mb-4">
                  <label className="form-label">
                    Time Creates (<span className="text-danger">*</span>)
                  </label>
                  <div className="input-group">
                    <span className="input-group-text">
                      <i className="fa-solid fa-phone"></i>
                    </span>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter admin phone number"
                      value={orgData.timestamp}
                    />
                  </div>
                </div>
              </div>

              {/* Admin Password */}
             
              {/* Business License (Base64 Image) */}
              <div className="col-6">
                <div className="mb-4">
                  <label className="form-label">
                    Business License (<span className="text-danger">*</span>)
                  </label>
                  <div className="input-group">
                    <Button variant="primary" onClick={handleShow}>
                      Show
                    </Button>
                  </div>
                </div>

                {/* Modal */}
                <Modal show={show} onHide={handleClose} centered>
                  <Modal.Header closeButton>
                    <Modal.Title>Business License</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <img
                      src={orgData.businessBase64} // Pre-filled from JSON
                      alt="Business License"
                      className="img-fluid"
                      style={{ maxHeight: "500px", width: "100%" }}
                    />
                  </Modal.Body>
                  <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                      Close
                    </Button>
                  </Modal.Footer>
                </Modal>
              </div>
           
              <div>
      {/* Nút "Back" */}
      <a
        type="button"
        className="btn btn-danger"
        href="https://zshopclone7.cmsnt.net/?module=admin&action=users"
        style={{ marginRight: '10px' }} // Thêm khoảng cách giữa các nút

      >
        <i className="fa fa-fw fa-undo"></i> Back
      </a>

      {/* Nút "Save" */}
      <button type="submit" className="btn btn-primary">
        <i className="bi bi-download"></i> Save
      </button>
    </div>
       
            </div>
          </div>
        </div>
      </div>

    </>
  );
};

export default Profile;
