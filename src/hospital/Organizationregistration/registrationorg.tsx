import React, { useEffect , ChangeEvent, FormEvent,useState} from "react";
import { useSelector, useDispatch } from "react-redux";
import { Navigate, Link } from "react-router-dom";
import { Button, Alert, Row, Col ,Form,Modal} from "react-bootstrap";
import { useTranslation } from "react-i18next";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import classNames from "classnames";

//actions
import { resetAuth, signupUser } from "../../redux/actions";

import { RootState, AppDispatch } from "../../redux/store";

// components
import { VerticalForm, FormInput } from "../../components/";

import AuthLayout from "./AuthLayout";

interface UserData {
  fullname: string;
  email: string;
  password: string;
}

/* bottom links */
const BottomLink = () => {
  const { t } = useTranslation();

  return (
    <Row className="mt-3">
      <Col className="text-center">
        <p className="text-white-50">
          {t("Already have account?")}{" "}
          <Link to={"/hospital/organization-loginorg"} className="text-white ms-1">
            <b>{t("Sign In")}</b>
          </Link>
        </p>
      </Col>
    </Row>
  );
};

/* social links */

const Register = () => {
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState({ title: '', body: '' });
  const handleClose = () => setShowModal(false);
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();
  interface Record {
    
    cccdImagebase64: string;
  }
  const {  userSignUp, error } = useSelector((state: RootState) => ({
    loading: state.Auth.loading,
    error: state.Auth.error,
    userSignUp: state.Auth.userSignUp,
  }));

  useEffect(() => {
    dispatch(resetAuth());
  }, [dispatch]);
  const [record, setRecord] = useState<Record>({
  
    cccdImagebase64: '',

  });
  /*
   * form validation schema
   */
  
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        console.log("Base64 String: ", base64String); // For debugging
        setRecord((prevRecord) => ({
          ...prevRecord,
          cccdImagebase64: base64String, // Set base64 string to state
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
  /*
   * handle form submission
   */
  const onSubmit = (formData: UserData) => {
    const nameorg = (document.getElementById('nameorg') as HTMLInputElement)?.value || '';
    const nameadmin = (document.getElementById('nameadmin') as HTMLInputElement)?.value || '';
    const emailadmin = (document.getElementById('emailadmin') as HTMLInputElement)?.value || '';
    const addressadmin = (document.getElementById('addressadmin') as HTMLInputElement)?.value || '';
    const cccdadmin = (document.getElementById('cccdadmin') as HTMLInputElement)?.value || '';
    const phoneadmin = (document.getElementById('phoneadmin') as HTMLInputElement)?.value || '';
    const passworkadmin = (document.getElementById('passworkadmin') as HTMLInputElement)?.value || '';
    const businessBase64 = (document.getElementById('cccdImagebase64') as HTMLInputElement)?.value || '';
    console.log("Name of Organization:", nameorg);
console.log("Admin Name:", nameadmin);
console.log("Admin Email:", emailadmin);
console.log("Admin Address:", addressadmin);
console.log("Admin CCCD:", cccdadmin);
console.log("Admin Phone:", phoneadmin);
console.log("Admin Password:", passworkadmin);
console.log("CCCD Image Base64:", businessBase64);
const data = {
  nameorg,
  nameadmin,
  emailadmin,
  addressadmin,
  cccdadmin,
  phoneadmin,
  passworkadmin,
  businessBase64,
};

console.log('Submitted data:', data);
setModalContent({ title: 'Processing...', body: 'Register hospitab, please wait...' });

fetch("http://42.96.2.80:3002/creater-org/", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify(data),
})
.then(response => response.json())
.then(result => {


 
  console.log('Success:'+result);
  setModalContent({ title: 'Success...', body: 'Register hospitab,' });
  window.location.href = "/hospital/organization-loginorg"; // Thay đổi "/new-page" thành URL bạn muốn chuyển đến

})
.catch(error => {
  console.error('Error:', error);
  setModalContent({ title: 'Enroll...', body: 'Register hospitab,' });

});

  };
  

  return (
    <>
      {userSignUp ? <Navigate to={"/auth/confirm"}></Navigate> : null}

      <AuthLayout
        helpText={t(
          "Don't have an account? Create your account, it takes less than a minute"
        )}
        bottomLinks={<BottomLink />}
      >
        {error && (
          <Alert variant="danger" className="my-2">
            {error}
          </Alert>
        )}

<VerticalForm
      onSubmit={onSubmit}
  
    >
      <div className="d-flex flex-wrap mb-3">
      <div className="col-md-6 p-2">
      <FormInput
            label="Organization Name"
            type="text"
            name="nameorg"
            placeholder="Enter organization name"
            containerClass="mb-3"
            // {...register('nameorg', { required: "Organization name is required" })}
          />
          {/* {errors.nameorg && <p className="text-danger">{errors.nameorg.message}</p>} */}

          <FormInput
            label="Admin Email"
            type="email"
            name="emailadmin"
            placeholder="Enter admin email"
            containerClass="mb-3"
            // {...register('emailadmin', { required: "Email is required" })}
          />
          {/* {errors.emailadmin && <p className="text-danger">{errors.emailadmin.message}</p>} */}

          <FormInput
            label="Admin CCCD"
            type="text"
            name="cccdadmin"
            placeholder="Enter admin CCCD"
            containerClass="mb-3"
            // {...register('cccdadmin', { required: "CCCD is required" })}
          />
          {/* {errors.cccdadmin && <p className="text-danger">{errors.cccdadmin.message}</p>} */}

          <FormInput
            label="Admin Password"
            type="password"
            name="passworkadmin"
            placeholder="Enter admin password"
            containerClass="mb-3"
            // {...register('passworkadmin', { required: "Password is required" })}
          />
          {/* {errors.passworkadmin && <p className="text-danger">{errors.passworkadmin.message}</p>} */}
        </div>

        <div className="col-md-6 p-2">
        <FormInput
            label="Admin Name"
            type="text"
            name="nameadmin"
            placeholder="Enter admin name"
            containerClass="mb-3"
            // {...register('nameadmin', { required: "Admin name is required" })}
          />
          {/* {errors.nameadmin && <p className="text-danger">{errors.nameadmin.message}</p>} */}

          <FormInput
            label="Admin Address"
            type="text"
            name="addressadmin"
            placeholder="Enter admin address"
            containerClass="mb-3"
            // {...register('addressadmin', { required: "Address is required" })}
          />
          {/* {errors.addressadmin && <p className="text-danger">{errors.addressadmin.message}</p>} */}

          <FormInput
            label="Admin Phone Number"
            type="text"
            name="phoneadmin"
            placeholder="Enter admin phone number"
            containerClass="mb-3"
            // {...register('phoneadmin', { required: "Phone number is required" })}
          />
          {/* {errors.phoneadmin && <p className="text-danger">{errors.phoneadmin.message}</p>} */}

          <Form.Group controlId="formCccdImage">
                  <Form.Label>CCCD Image</Form.Label>
                  <div className="d-flex align-items-center">
                    <Form.Control
                      type="file"
                      name="cccdImage"
                      className="me-2"
                      onChange={handleFileChange}
                    />
                   
                  </div>
                </Form.Group>
                <Form.Group controlId="cccdImagebase64">
                  <Form.Control
                    type="hidden"
                    id="cccdImagebase64"
                    defaultValue={record.cccdImagebase64}
                  />
                </Form.Group>
        </div>
      </div>

      <div className="text-center d-grid">
        <Button variant="success" type="submit">
          Sign Up
        </Button>
      </div>
    </VerticalForm>

        <div className="text-center">
        </div>
      </AuthLayout>
      <Modal show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{modalContent.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>{modalContent.body}</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
    </>
  );
};

export default Register;
