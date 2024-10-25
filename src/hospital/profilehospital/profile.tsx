import React, { useEffect, useState } from "react";
// import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
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
        // console.log("phanthuyen"+decodedToken['branch']);
        console.log(decodedToken['tokeorg']);
        console.log("tê tổ chức" + decodedToken['nameorg']);

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
        { label: "Tables", path: "/features/tables/advanced" },
        {
          label: "Information Hospital",
          path: "/features/tables/advanced",
          active: true,
        },
      ]}
      title={"Information Hospital"}
    />
    <div className="col-12">
      <div className="card custom-card shadow-none mb-4">
        <div className="card-body">
          <div className="row">
            {/* Organization Name */}
            <div className="col-md-6">
              <div className="mb-4">
                <label className="form-label">
                  Organization Name <span className="text-danger">*</span>
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
  
            {/* Admin Phone */}
            <div className="col-md-6">
              <div className="mb-4">
                <label className="form-label">
                  Phone Organization <span className="text-danger">*</span>
                </label>
                <div className="input-group">
                  <span className="input-group-text">
                    <i className="fa-solid fa-phone"></i>
                  </span>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter admin phone number"
                    value={orgData.phoneadmin}
                  />
                </div>
              </div>
            </div>
  
            {/* Admin Email */}
            <div className="col-md-6">
              <div className="mb-4">
                <label className="form-label">
                  Email Organization <span className="text-danger">*</span>
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
                  Admin Address <span className="text-danger">*</span>
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
  
            {/* Token Hospital */}
            <div className="col-md-6">
              <label className="form-label">
                Token Hospital <span className="text-danger">*</span>
              </label>
              <div className="mb-2">
                <div className="input-group">
                  <input
                    type={passwordVisible ? "text" : "password"} // Toggle password visibility
                    className="form-control"
                    placeholder="Enter admin password"
                    value={orgData.tokeorg}
                  />
                  <button
                    style={{ width: '80px' }}
                    type="button"
                    className="btn btn-primary"
                    onClick={togglePasswordVisibility}
                  >
                    {passwordVisible ? "Hide" : "Show"} {/* Toggle button text */}
                  </button>
                </div>
              </div>
            </div>
  
            {/* Business License (Base64 Image) */}
            <div className="col-6">
              <div className="mb-4">
                <label className="form-label">
                  Business License <span className="text-danger">*</span>
                </label>
                <div className="input-group">
                  <Button
                    style={{ width: '80px' }}
                    variant="primary"
                    onClick={handleShow}
                  >
                    Show
                  </Button>
                </div>
              </div>
              {/* Modal for Business License */}
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
  
            {/* Save Button */}
            <div className="col-12 d-flex justify-content-between mt-4">
              <Link to='/hospital/home'>
                <div className="btn btn-danger" style={{ width: '100px' }}>
                  <i className="fa fa-fw fa-undo"></i> Back
                </div>
              </Link>
              <button type="submit" className="btn btn-primary" style={{ width: '80px' }}>
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
