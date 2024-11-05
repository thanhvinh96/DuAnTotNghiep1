// src/pages/profile/ProfileMedical.tsx

import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { Row, Col, Form, Button, Card, Modal } from 'react-bootstrap';
import PageTitle from "../../components/PageTitle";
import jwtDecode from 'jwt-decode';
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
// Define an interface for the record object
import { showdataprofiles ,updataprofiles} from '../../controller/MedicalController'; // Import controller

interface Record {
  tokenmedical: string;
  name: string;
  email: string;
  birthDate: string;
  gender: string;
  address: string;
  phoneNumber: string;
  cccd: string;
  avatarImagebase64: string;
  height: string; // New field
  weight: string; // New field
  medicalinsurance: string; // New field
  avatar: string; // New field
}

interface DecodedToken {
  tokenmedical: string;
  name: string;
  birthDate: string;
  gender: string;
  email: string;
  address: string;
  phoneNumber: string;
  cccd: string;
  medicalHistory: Array<{
    disease: string;
    treatment: string;
  }>;
  currentStatus: {
    symptoms: string;
    diagnosis: string;
    treatmentPlan: string;
  };
  authorizedEntities: Array<string>;
  accessRequests: Array<{
    requestor: string;
    status: string;
  }>;
  height: string; // New field
  weight: string; // New field
  medicalinsurance: string; // New field
  avatar: string; // New field
}


const schema = yup.object().shape({
  cccd: yup.string().required("Please enter your CCCD"),
});

const ProfileMedical: React.FC = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [record, setRecord] = useState<Record>({
    tokenmedical: '',
    name: '',
    email: '',
    birthDate: '',
    gender: '',
    address: '',
    phoneNumber: '',
    cccd: '',
    avatarImagebase64: '',
    height: '', // Initialize new field
    weight: '', // Initialize new field
    medicalinsurance: '', // Initialize new field
    avatar: '', // Initialize new field
  });
  const [datacheckprofile, setdatacheckprofile] = useState({
    tokenmedical: '',
    cccd: ''
  });
  

  
const showdataprofile = async () => {
  try {
    // Gửi dữ liệu đến endpoint
    const response:any = await showdataprofiles(datacheckprofile);
    // console.log("kq"+response);

    // Kiểm tra nếu phản hồi không thành công
    // if (!response.ok) {
    //   throw new Error('Network response was not ok');
    // }

    // // Chuyển đổi phản hồi thành JSON
    // const result = await response.json();
    // // const data:any = JSON.stringify(result)
    // // Xử lý kết quả nhận được
    if(response.success===true){
      console.log('thành công');
      console.log('Data received:', response.record);
      setRecord({
        tokenmedical: response.record.tokenmedical || '',
        name: response.record.name || '',
        email: response.record.email || '',
        birthDate: response.record.birthDate || '',
        gender: response.record.gender || '',
        address: response.record.address || '',
        phoneNumber: response.record.phoneNumber || '',
        cccd: response.record.cccd || '',
        avatarImagebase64: response.record.avatarImagebase64 || '', // Ensure this is included
        height: response.record.height || '', // New field
        weight: response.record.weight || '', // New field
        medicalinsurance: response.record.medicalinsurance || '', // New field
        avatar: response.record.avatar || '', // New field
      });
    }
    
    // // Bạn có thể cập nhật state hoặc làm gì đó với dữ liệu nhận được ở đây

  } catch (error) {
    console.error('Error fetching data:', error);
    // Xử lý lỗi (ví dụ: hiển thị thông báo lỗi)
  }
};
useEffect(() => {
  if (datacheckprofile.tokenmedical && datacheckprofile.cccd) {
    showdataprofile();
  }
}, [datacheckprofile]);

  useEffect(() => {
    const token = localStorage.getItem('jwtToken');
    if (token) {
      const decodedToken: any = jwtDecode(token);
      setdatacheckprofile(prevState => ({
        ...prevState, // Giữ lại các thuộc tính cũ
        tokenmedical: decodedToken.tokenmedical , // Cập nhật giá trị mới
        cccd: decodedToken.cccd , // Cập nhật giá trị mới
        // Nếu cần cập nhật cccd cũng có thể làm tương tự
      }));
    
    }
  }, []);
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        console.log("Base64 String: ", base64String); // For debugging
        setRecord((prevRecord) => ({
          ...prevRecord,
          avatarImagebase64: base64String, // Set base64 string to state
        }));
      };
      reader.onerror = (error) => {
        console.error("Error reading file: ", error);
      };
      reader.readAsDataURL(file); // Read the file as a Data URL (base64 string)
    } else {
      console.error("No file selected");
    }
  };
  const MySwal = withReactContent(Swal);

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
  
    const loadingSwal: any = MySwal.fire({
      title: 'Please wait...',
      text: 'Update Profile medical, please wait!',
      icon: 'info',
      allowOutsideClick: false,
      showConfirmButton: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });
  
    // Creating data object with required fields
    const data = {
      tokenmedical: record.tokenmedical,
      birthDate: record.birthDate,
      gender: record.gender,
      address: record.address,
      phoneNumber: record.phoneNumber,
      cccd: record.cccd,
      height: record.height,
      weight: record.weight,
      medicalinsurance: record.medicalinsurance,
      avatar: record.avatarImagebase64,
    };
  
    console.log('Submitted data:', data);
  
    try {
      updataprofiles(data)
      .then((response) => {
        loadingSwal.close();

        console.log(response.transactionResult.success); // Bây giờ response sẽ là kết quả thực tế
        if(response.transactionResult.success===true){
        Swal.fire({
          title: 'Update Success!',
          text: 'Your Update Profile was successful.',
          icon: 'success',
          confirmButtonText: 'OK',
        });
        }else{
                  Swal.fire({
          title: 'Update Error!',
          text: 'There was an error during registration. Please try again.',
          icon: 'error',
          confirmButtonText: 'OK',
        });
        }
      })
      .catch((error) => {
        console.error("Error updating profile:", error);
      });
    
      // const result = await response;
  
      // if (response.ok) {
      //   Swal.fire({
      //     title: 'Update Success!',
      //     text: 'Your Update Profile was successful.',
      //     icon: 'success',
      //     confirmButtonText: 'OK',
      //   });
  
      //   // localStorage.removeItem("jwtToken");
  
      //   // const decoded = jwtDecode<DecodedToken>(result.transactionResult.token);
      //   // console.log(result.transactionResult.token);
      //   // localStorage.setItem("jwtToken", result.transactionResult.token);
      //   // console.log("User info:", decoded);
      //   console.log('Success:', result);
      // } else {
      //   Swal.fire({
      //     title: 'Update Error!',
      //     text: result.message || 'There was an error during registration. Please try again.',
      //     icon: 'error',
      //     confirmButtonText: 'OK',
      //   });
      // }
    } catch (error) {
      loadingSwal.close();
      Swal.fire({
        title: 'Update Error!',
        text: 'There was an error during registration. Please try again.',
        icon: 'error',
        confirmButtonText: 'OK',
      });
      console.error('Error:', error);
    }
  };
  const uploadToCloudinaryAvatar = async () => {
    try {
        const fileInput = document.getElementById('uploadsavatart') as HTMLInputElement;
        const file = fileInput?.files?.[0];
        
        if (file) {
            const data = new FormData();
            data.append('file', file);
            data.append('upload_preset', 'Phanthuyen');

            const response = await fetch('https://api.cloudinary.com/v1_1/dst5yu9ay/image/upload', {
                method: 'POST',
                body: data
            });

            const result = await response.json();

            if (result) {
              setRecord((prevRecord) => ({
                ...prevRecord,
                avatarImagebase64: result['url'], // Set base64 string to state
              }));
                // setFormData((prevFormData) => ({
                //     ...prevFormData,
                //     avatar: result['url'], 
                // }));
                alert('Tải lên thành công!');
                console.log('Uploaded Avatar URL:', result['url']);
            }
        }
    } catch (error) {
        console.error('Lỗi khi tải ảnh lên:', error);
        alert("Có lỗi xảy ra khi tải ảnh lên. Vui lòng thử lại.");
    }
};

  return (
    <>
<PageTitle
  breadCrumbItems={[
    { label: "Profile Medical", path: "/profile/medical" },
    { label: "Profile Medical", path: "/profile/medical", active: true },
  ]}
  title={"Profile Medical"}
/>
<Card>
  <Card.Body>
    <Form onSubmit={onSubmit}>
      {/* Token Medical and Name */}
      <Row>
        <Col md={6}>
          <Form.Group controlId="formTokenMedical">
            <Form.Label>Token Medical</Form.Label>
            <Form.Control
              type="text"
              id="formTokenMedical"
              value={record.tokenmedical}
              readOnly
            />
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group controlId="formName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              id="formName"
              value={record.name}
              onChange={(e) => setRecord({ ...record, name: e.target.value })}
            />
          </Form.Group>
        </Col>
      </Row>

      {/* Email and Birth Date */}
      <Row>
        <Col md={6}>
          <Form.Group controlId="formEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              id="formEmail"
              value={record.email}
              onChange={(e) => setRecord({ ...record, email: e.target.value })}
            />
          </Form.Group>
        </Col>
        <Col md={6}>
  <Form.Group controlId="formBirthDate">
    <Form.Label>Birth Date</Form.Label>
    <Form.Control
      type="date"
      id="formBirthDate"
      value={record.birthDate || ""}
      onChange={(e) => setRecord({ ...record, birthDate: e.target.value })}
    />
  </Form.Group>
</Col>

      </Row>

      {/* Gender and Address */}
      <Row>
        <Col md={6}>
          <Form.Group controlId="formGender">
            <Form.Label>Gender</Form.Label>
            <Form.Control
              as="select"
              id="formGender"
              value={record.gender}
              onChange={(e) => setRecord({ ...record, gender: e.target.value })}
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </Form.Control>
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group controlId="formAddress">
            <Form.Label>Address</Form.Label>
            <Form.Control
              type="text"
              id="formAddress"
              value={record.address}
              onChange={(e) => setRecord({ ...record, address: e.target.value })}
            />
          </Form.Group>
        </Col>
      </Row>

      {/* Phone Number and CCCD */}
      <Row>
        <Col md={6}>
          <Form.Group controlId="formPhoneNumber">
            <Form.Label>Phone Number</Form.Label>
            <Form.Control
              type="text"
              id="formPhoneNumber"
              value={record.phoneNumber}
              onChange={(e) => setRecord({ ...record, phoneNumber: e.target.value })}
            />
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group controlId="formCCCD">
            <Form.Label>CCCD</Form.Label>
            <Form.Control
              type="text"
              id="numbercccd"
              value={record.cccd}
              onChange={(e) => setRecord({ ...record, cccd: e.target.value })}
            />
          </Form.Group>
        </Col>
      </Row>
      <Row>
      <Col md={6}>
    <Form.Group controlId="formHeight">
      <Form.Label>Height</Form.Label>
      <Form.Control
        type="text"
        id="formHeight"
        value={record.height}
        onChange={(e) => setRecord({ ...record, height: e.target.value })}
      />
    </Form.Group>
  </Col>
  <Col md={6}>
    <Form.Group controlId="formWeight">
      <Form.Label>Weight</Form.Label>
      <Form.Control
        type="text"
        id="formWeight"
        value={record.weight}
        onChange={(e) => setRecord({ ...record, weight: e.target.value })}
      />
    </Form.Group>
  </Col>
      </Row>

      <Row>
      <Col md={12}>
    <Form.Group controlId="formmedicalinsurance">
      <Form.Label>Medical Insurance</Form.Label>
      <Form.Control
        type="text"
        id="formmedicalinsurance"
        value={record.medicalinsurance}
        onChange={(e) => setRecord({ ...record, medicalinsurance: e.target.value })}
      />
    </Form.Group>
  </Col>
        <Col md={6}>
          <Form.Group controlId="avatarImagebase64">
            <Form.Label>Avatar Image</Form.Label>
            <div className="d-flex align-items-center">
              <Form.Control
                id="uploadsavatart"
                type="file"
                name="avatarImage"
                className="me-2"
                onChange={uploadToCloudinaryAvatar}
              />
              <Button variant="primary" onClick={() => setShowModal(true)}>
                Show
              </Button>
            </div>
          </Form.Group>
          <Form.Group controlId="avatarImagebase64">
            <Form.Control
              type="hidden"
              id="avatarImagebase64"
              defaultValue={record.avatarImagebase64}
            />
          </Form.Group>
        </Col>
      </Row>
      {/* CCCD Image */}
   

      {/* Save Button */}
      <Button variant="primary" type="submit" className="mt-3">
        Save
      </Button>
    </Form>
  </Card.Body>
</Card>

{/* CCCD Image Modal */}
<Modal show={showModal} onHide={() => setShowModal(false)}>
  <Modal.Header closeButton>
    <Modal.Title>CCCD Image</Modal.Title>
  </Modal.Header>
  <Modal.Body>
    {record.avatarImagebase64 && (
      <img src={record.avatarImagebase64} alt="CCCD" style={{ width: '100%' }} />
    )}
  </Modal.Body>
  <Modal.Footer>
    <Button variant="secondary" onClick={() => setShowModal(false)}>
      Close
    </Button>
  </Modal.Footer>
</Modal>

    </>
  );
};

export default ProfileMedical;