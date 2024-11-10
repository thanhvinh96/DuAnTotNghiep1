import React, { useState, useEffect } from 'react';
import { Form, Button, Card, Row, Col,Modal } from 'react-bootstrap';
import PageTitle from "../../components/PageTitle";
import { useLocation } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import {GetInfoHospital} from '../../controller/HospitalController'
import {GetInfoFullPersonnel,GetpersonnelByToken} from '../../controller/PersonnelController'
export default function UserForm() {
  const [formData, setFormData] = useState({
    address: '',
    branch: '',
    cccd: '',
    fullname: '',
    imgidentification: '',
    password: '',
    phone: '', 
    tokenuser: '',
    timecreats: '',
    typeusers: '',
  });

  interface datapost {
    tokeorg: string;
    tokenuser: string;
    value: string;
  }

  // Khởi tạo state với kiểu dữ liệu là mảng các đối tượng `datapost`
  const [dataget, setDataget] = useState<datapost[]>([]);

  const location = useLocation();

  const getQueryParams = () => {
    const params = new URLSearchParams(location.search);
    return params.get('tokenuser');
  };
  const [showModal, setShowModal] = useState(false);

  // Handle modal close
  const handleCloseModal = () => setShowModal(false);

  // Handle modal show
  const handleShowModal = () => setShowModal(true);

  const getData = async () => {
    try {
      const token = localStorage.getItem('tokenadmin');
      if (token) {
        const decodedToken: any = jwtDecode(token);
        console.log(decodedToken['tokeorg']);
  
        const tokeorg = decodedToken['tokeorg'];
        const dataorg = { tokenorg: tokeorg };
  
        const response = await GetInfoHospital(dataorg);
        console.log(response);
        if (!response) {
          throw new Error('Network response was not ok');
        }
  
        // const _data = await response.json();
        const tokenuser = getQueryParams(); // Đảm bảo getQueryParams() được định nghĩa
  
        if (tokenuser) {
        //   // Cập nhật trạng thái với dữ liệu mới
          const updatedDataget = {
            tokenuser: tokenuser,
            tokeorg: response.result.tokeorg,
            value: 'org1',
            // value: _data.result.nameorg,
          };
          const _response:any = await GetpersonnelByToken(updatedDataget)
          console.log(_response);
          if(_response.success===true){
            const data = _response.data
                            setFormData({
                    address: data.address,
                    branch: data.branch,
                    cccd: data.cccd,
                    fullname: data.fullname,
                    imgidentification: data.imgidentification,
                    password: data.password,
                    phone: data.phone,
                    tokenuser: data.tokenuser,
                    timecreats: data.timecreats, // Chuyển đổi thành đối tượng Date
                    typeusers: data.typeusers,
                });
          }
        //   // Gọi fetch với dữ liệu đã cập nhật
        //   const _response = await fetch('http://42.96.2.80:3002/getpersonnel-bytoken/', {
        //     method: 'POST',
        //     body: JSON.stringify(updatedDataget),
        //     headers: { 'Content-Type': 'application/json' },
        //   });
  
        //   if (_response.ok) {
        //     const personnelData = await _response.json();
        //     console.log(personnelData.data);
        //     if (personnelData.data && typeof personnelData.data === 'object' && !Array.isArray(personnelData.data)) {
        //         // Nếu là đối tượng, tiếp tục cập nhật dữ liệu vào formData
        //         const data = personnelData.data;

        //         setFormData({
        //             address: data.address,
        //             branch: data.branch,
        //             cccd: data.cccd,
        //             fullname: data.fullname,
        //             imgidentification: data.imgidentification,
        //             password: data.password,
        //             phone: data.phone,
        //             tokenuser: data.tokenuser,
        //             timecreats: data.timecreats, // Chuyển đổi thành đối tượng Date
        //             typeusers: data.typeusers,
        //         });
        //     } else {
        //         // Xử lý khi personnelData.data không phải là đối tượng hoặc không tồn tại
        //         console.error('Expected an object but got:', personnelData.data);
        //     }
        //   } else {
        //     throw new Error('Network response was not ok');
        //   }
        }
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  
  
  useEffect(() => {
    getData(); // Gọi getData để lấy dữ liệu khi component mount
  }, []);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Xử lý khi người dùng nhấn nút submit, ví dụ: gửi formData tới API
    console.log('Form data:', formData);
  };

  return (
    <>
      <PageTitle
        breadCrumbItems={[
          { label: "Tables", path: "/features/tables/advanced" },
          {
            label: "Edit Personnel",
            path: "/hospital/Edit-personnel",
            active: true,
          },
        ]}
        title={"Edit Personnel"}
      />

      <Row>
        <Col>
          <Card>
            <Card.Body>
              <h4 className="header-title">User Information Form</h4>
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formAddress">
                  <Form.Label>Address</Form.Label>
                  <Form.Control
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    placeholder="Enter address"
                  />
                </Form.Group>

                <Form.Group controlId="formCccd">
                  <Form.Label>CCCD</Form.Label>
                  <Form.Control
                    type="text"
                    name="cccd"
                    value={formData.cccd}
                    onChange={(e) => setFormData({ ...formData, cccd: e.target.value })}
                    placeholder="Enter CCCD"
                  />
                </Form.Group>

                <Form.Group controlId="formFullname">
                  <Form.Label>Fullname</Form.Label>
                  <Form.Control
                    type="text"
                    name="fullname"
                    value={formData.fullname}
                    onChange={(e) => setFormData({ ...formData, fullname: e.target.value })}
                    placeholder="Enter fullname"
                  />
                </Form.Group>

                <Form.Group controlId="formOrganizationalvalue">
                  <Form.Label>Branch Value</Form.Label>
                  <Form.Control
                    type="text"
                    name="branch"
                    value={formData.branch}
                    onChange={(e) => setFormData({ ...formData, branch: e.target.value })}
                    placeholder="Enter organizational value"
                  />
                </Form.Group>

                <Form.Group controlId="formPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    placeholder="Enter password"
                  />
                </Form.Group>

                <Form.Group controlId="formPhone">
                  <Form.Label>Phone</Form.Label>
                  <Form.Control
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="Enter phone number"
                  />
                </Form.Group>

                <Form.Group controlId="formTokenuser">
                  <Form.Label>Token User</Form.Label>
                  <Form.Control
                    type="text"
                    name="tokenuser"
                    value={formData.tokenuser}
                    onChange={(e) => setFormData({ ...formData, tokenuser: e.target.value })}
                    placeholder="Enter token user"
                  />
                </Form.Group>

                <Form.Group controlId="formTypeusers">
                  <Form.Label>Type of User</Form.Label>
                  <Form.Control
                    type="text"
                    name="typeusers"
                    value={formData.typeusers}
                    onChange={(e) => setFormData({ ...formData, typeusers: e.target.value })}
                    placeholder="Enter type of user"
                  />
                </Form.Group>
             
                <Form.Group controlId="formTypeusers">
                  <Form.Label>Timecreats Creat User</Form.Label>
                  <Form.Control
                    type="text"
                    name="timecreats"
                    value={formData.timecreats}
                    onChange={(e) => setFormData({ ...formData, timecreats: e.target.value })}
                    placeholder="Enter type of user"
                  />
                </Form.Group>
                <Form.Group controlId="formTypeusers">
                  <Form.Label>Cccd User</Form.Label>
              
                  <Button variant="info" className="mt-3 ms-2" onClick={handleShowModal}>
                  Show Modal
                </Button></Form.Group>

                <Button variant="primary" type="submit" className="mt-3">
                  Submit
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Information</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <img
            src={formData.imgidentification}
            alt="Identification"
            style={{ width: '100%', height: 'auto', maxHeight: '400px' }}
          />        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
