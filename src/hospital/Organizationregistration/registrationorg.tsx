import React, { useEffect, ChangeEvent, FormEvent, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Navigate, Link } from "react-router-dom";
import { Button, Alert, Row, Col, Form, Modal, Card } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import classNames from "classnames";
import { RegisterHospital } from "../../controller/HospitalController";

//actions
import { resetAuth, signupUser } from "../../redux/actions";

import { RootState, AppDispatch } from "../../redux/store";
import FileUploader from "../../components/FileUploader";

// components
import { VerticalForm, FormInput } from "../../components/";

import AuthLayout from "./AuthLayout";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
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
          {t("Đã có tài khoản?")}{" "}
          <Link
            to={"/hospital/organization-loginorg"}
            className="text-white ms-1"
          >
            <b>{t("Đăng nhập")}</b>
          </Link>
        </p>
      </Col>
    </Row>
  );
};

/* social links */

const Register = () => {
  const MySwal = withReactContent(Swal);

  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState({ title: "", body: "" });
  const handleClose = () => setShowModal(false);
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();
  interface Record {
    cccdImagebase64: string;
  }
  const { userSignUp, error } = useSelector((state: RootState) => ({
    loading: state.Auth.loading,
    error: state.Auth.error,
    userSignUp: state.Auth.userSignUp,
  }));

  useEffect(() => {
    dispatch(resetAuth());
  }, [dispatch]);

  /*
   * form validation schema
   */
  const [orgData, setOrgData] = useState<any>({
    nameorg: "",
    nameadmin: "",
    emailadmin: "",
    addressadmin: "",
    cccdadmin: "",
    phoneadmin: "",
    passwordadmin: "",
    businessBase64: "",
    imgidentification: "",
    cccdImage: "",
    license: "",
    avatar: "",
    businesslicense:"",
    License:"",
  });
  const handleFileUpload = async (file: File, field: string) => {
    try {
      const data = new FormData();
      data.append("file", file);
      data.append("upload_preset", "Phanthuyen");

      const response = await fetch("https://api.cloudinary.com/v1_1/dst5yu9ay/image/upload", {
        method: "POST",
        body: data,
      });

      const result = await response.json();
      if (result.url) {
        setOrgData((prevFormData: any) => ({
          ...prevFormData,
          [field]: result.url,
        }));
        alert(`${field} tải lên thành công!`);
      }
    } catch (error) {
      console.error(`Error uploading ${field}:`, error);
      alert(`Có lỗi xảy ra khi tải ${field}. Vui lòng thử lại.`);
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    console.log(`Changing ${name} to ${value}`); // Kiểm tra giá trị input
    setOrgData((prevOrgData: any) => ({
      ...prevOrgData,
      [name]: value,
    }));
  };
  const handleInputPassword = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    console.log(`Changing ${name} to ${value}`); // Log giá trị
    setOrgData((prevOrgData: any) => ({
      ...prevOrgData,
      [name]: value,
    }));
  };

  /*
   * handle form submission
   */
  const onSubmit = async () => {
    console.log(orgData)
    // const nameorg =
    //   (document.getElementById("nameorg") as HTMLInputElement)?.value || "";
    // const nameadmin =
    //   (document.getElementById("nameadmin") as HTMLInputElement)?.value || "";
    // const emailadmin =
    //   (document.getElementById("emailadmin") as HTMLInputElement)?.value || "";
    // const addressadmin =
    //   (document.getElementById("addressadmin") as HTMLInputElement)?.value ||
    //   "";
    // const cccdadmin =
    //   (document.getElementById("cccdadmin") as HTMLInputElement)?.value || "";
    // const phoneadmin =
    //   (document.getElementById("phoneadmin") as HTMLInputElement)?.value || "";
    // const passwordadmin =
    //   (document.getElementById("passworkadmin") as HTMLInputElement)?.value ||
    //   ""; // Đảm bảo tên đúng
    // const businessBase64 =
    //   (document.getElementById("cccdImagebase64") as HTMLInputElement)?.value ||
    //   "";

    // const data = {
    //   nameorg,
    //   nameadmin,
    //   emailadmin,
    //   addressadmin,
    //   cccdadmin,
    //   phoneadmin,
    //   passwordadmin,
    //   businessBase64,
    // };

    // console.log("Submitted data:", data);

    const loadingSwal: any = MySwal.fire({
      title: "Please wait...",
      text: "Registering hospital group, please wait!",
      icon: "info",
      allowOutsideClick: false,
      showConfirmButton: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    try {
      const res: any = await RegisterHospital(orgData);
      console.log(res);
      console.log("giá trị res");

      if (res.success === true) {
        loadingSwal.close();
        MySwal.fire({
          title: "Hospital Success",
          text: "Register Hospital Successfully",
          icon: "success",
        }).then(() => {
          // Chuyển hướng đến trang login sau khi đăng ký thành công
          window.location.href = "/hospital/organization-loginorg"; // hoặc sử dụng phương pháp điều hướng của framework (React Router)
        });
      } else {
        loadingSwal.close();
        MySwal.fire({
          title: "Hospital Error",
          text: "Register Hospital Failed",
          icon: "error",
        });
      }
    } catch (error) {
      console.error("Error registering hospital:", error);
      loadingSwal.close();
      MySwal.fire({
        title: "Hospital Error",
        text: "Register Hospital Failed",
        icon: "error",
      });
    }
  };


  return (
    <>
      {userSignUp && <Navigate to={"/auth/confirm"} />}

      <AuthLayout
        helpText={t(
          "Chưa có tài khoản? Tạo tài khoản của bạn, chỉ mất chưa đầy một phút."
        )}
        bottomLinks={<BottomLink />}
      >
        {error && (
          <Alert variant="danger" className="my-2">
            {error}
          </Alert>
        )}

<VerticalForm onSubmit={onSubmit}>
  <div className="row g-4">
    {/* Organization Information */}
    <div className="col-md-6">
      <Card className="p-4 shadow border-0 rounded">
        <h5 className="mb-4 text-primary">Thông Tin Tổ Chức</h5>
        <FormInput
          label="Tên Bệnh Viện"
          type="text"
          name="nameorg"
          placeholder="Nhập tên tổ chức"
          value={orgData.nameorg}
          onChange={handleInputChange}
          containerClass="mb-4"
        />
        <FormInput
          label="Email Admin"
          type="email"
          name="emailadmin"
          placeholder="Nhập email admin"
          value={orgData.emailadmin}
          onChange={handleInputChange}
          containerClass="mb-4"
        />
        <Form.Group className="mb-4">
          <Form.Label className="fw-bold">Giấy phép kinh doanh</Form.Label>
          <FileUploader
            onFileUpload={(files) => handleFileUpload(files[0], "businesslicense")}
          />
        </Form.Group>
      </Card>
    </div>

    {/* Admin Information */}
    <div className="col-md-6">
      <Card className="p-4 shadow border-0 rounded">
        <h5 className="mb-4 text-primary">Thông Tin Admin</h5>
        <FormInput
          label="Tên Admin"
          type="text"
          name="nameadmin"
          placeholder="Nhập tên admin"
          value={orgData.nameadmin}
          onChange={handleInputChange}
          containerClass="mb-4"
        />
        <FormInput
          label="CCCD Admin"
          type="text"
          name="cccdadmin"
          placeholder="Nhập CCCD admin"
          value={orgData.cccdadmin}
          onChange={handleInputChange}
          containerClass="mb-4"
        />
        <FormInput
          label="Địa Chỉ Admin"
          type="text"
          name="addressadmin"
          placeholder="Nhập địa chỉ admin"
          value={orgData.addressadmin}
          onChange={handleInputChange}
          containerClass="mb-4"
        />
        <FormInput
          label="Số Điện Thoại Admin"
          type="text"
          name="phoneadmin"
          placeholder="Nhập số điện thoại admin"
          value={orgData.phoneadmin}
          onChange={handleInputChange}
          containerClass="mb-4"
        />
        <Form.Group className="mb-4">
          <Form.Label className="fw-bold">Ảnh đại diện</Form.Label>
          <FileUploader
            onFileUpload={(files) => handleFileUpload(files[0], "avatar")}
          />
        </Form.Group>
        <Form.Group className="mb-4">
          <Form.Label className="fw-bold">Thẻ CCCD</Form.Label>
          <FileUploader
            onFileUpload={(files) => handleFileUpload(files[0], "imgidentification")}
          />
        </Form.Group>
        <Form.Group className="mb-4">
          <Form.Label className="fw-bold">Giấy phép hành nghề</Form.Label>
          <FileUploader
            onFileUpload={(files) => handleFileUpload(files[0], "License")}
          />
        </Form.Group>
        <FormInput
          label="Mật Khẩu Admin"
          // type="password"
          name="passwordadmin"
          placeholder="Nhập mật khẩu"
          value={orgData.passwordadmin}
          onChange={handleInputPassword}
          containerClass="mb-4"
        />
      </Card>
    </div>
  </div>

  {/* Submit Button */}
  <div className="text-center mt-4">
    <Button variant="primary" type="submit" className="px-5 py-2 fw-bold shadow">
      Đăng Kí
    </Button>
  </div>
</VerticalForm>

        <Modal show={showModal} onHide={handleClose} centered>
          <Modal.Header closeButton>
            <Modal.Title>{modalContent.title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>{modalContent.body}</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Đóng
            </Button>
          </Modal.Footer>
        </Modal>
      </AuthLayout>
    </>

  );
};

export default Register;
