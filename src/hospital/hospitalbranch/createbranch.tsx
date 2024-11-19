import React, { useState, useEffect } from "react";
import { Row, Col, Card, Button, Form, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";
import "bootstrap/dist/css/bootstrap.min.css";
import PageTitle from "../../components/PageTitle";
import { CreateBranchs } from "../../controller/BranchController";
import { GetInfoHospital } from "../../controller/HospitalController";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

export default function CreateBranch() {
  const MySwal = withReactContent(Swal);
  const navigate = useNavigate();

  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState({ title: "", body: "" });
  const [dataBranch, setDataBranch] = useState({
    value: "",
    tokeorg: "",
    branchname: "",
    branchaddress: "",
    branchphone: "",
    branchemail: "",
    branchbusinesslicense: "",
  });

  useEffect(() => {
    const getData = async () => {
      const token = localStorage.getItem("tokenadmin");
      if (token) {
        const decodedToken: any = jwtDecode(token);
        const tokeorg = decodedToken["tokeorg"];
        const dataorg = {
          tokenorg: tokeorg,
        };
        const res = await GetInfoHospital(dataorg);

        setDataBranch((prevState) => ({
          ...prevState,
          value: res.result.nameorg,
          tokeorg: res.result.tokeorg,
        }));
      }
    };

    getData();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, files } = e.target;

    if (type === "file" && files) {
      const file = files[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setDataBranch((prevState) => ({
            ...prevState,
            [name]: reader.result as string,
          }));
        };
        reader.readAsDataURL(file);
      }
    } else {
      setDataBranch((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const uploadToCloudinary = async () => {
    try {
      const fileInput = document.getElementById(
        "productImages"
      ) as HTMLInputElement;
      const file = fileInput?.files?.[0];
      if (file) {
        const data = new FormData();
        data.append("file", file);
        data.append("upload_preset", "Phanthuyen");

        const response = await fetch(
          "https://api.cloudinary.com/v1_1/dst5yu9ay/image/upload",
          {
            method: "POST",
            body: data,
          }
        );

        const result = await response.json();

        if (result) {
          MySwal.fire({
            title: "Thành công",
            text: "Đã tải lên giấy phép kinh doanh.",
            icon: "success",
          });
          setDataBranch((prevState) => ({
            ...prevState,
            branchbusinesslicense: result["url"],
          }));
        }
      }
    } catch (error) {
      console.error("Lỗi tải lên hình ảnh:", error);
    }
  };

  const createBranch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setModalContent({
      title: "Đang xử lý...",
      body: "Đang tạo chi nhánh, vui lòng đợi...",
    });
    setShowModal(true);

    try {
      const response: any = await CreateBranchs(dataBranch);
      if (response) {
        setModalContent({
          title: "Thành công",
          body: "Chi nhánh đã được tạo thành công!",
        });
      } else {
        setModalContent({
          title: "Lỗi",
          body: "Không thể tạo chi nhánh. Vui lòng thử lại sau.",
        });
      }
    } catch (error) {
      setModalContent({
        title: "Lỗi",
        body: "Không thể tạo chi nhánh. Vui lòng thử lại sau.",
      });
      console.error(error);
    }
  };

  const handleClose = () => setShowModal(false);
  const backlink = () => navigate("/hospital/hospital-branch");

  return (
    <>
      <PageTitle
        breadCrumbItems={[
          { label: "Quản lý bệnh viện", path: "/" },
          {
            label: "Tạo chi nhánh",
            path: "/hospital/create-branch",
            active: true,
          },
        ]}
        title={"Tạo Chi Nhánh"}
      />
      <Row>
        <Col>
          <Card>
            <Card.Body>
              <Form onSubmit={createBranch}>
                <Form.Group controlId="formBranchName">
                  <Form.Label>Tên Chi Nhánh</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Nhập tên chi nhánh"
                    name="branchname"
                    value={dataBranch.branchname}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                <Form.Group controlId="formBranchAddress">
                  <Form.Label>Địa Chỉ</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Nhập địa chỉ chi nhánh"
                    name="branchaddress"
                    value={dataBranch.branchaddress}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                <Form.Group controlId="formBranchPhone">
                  <Form.Label>Số Điện Thoại</Form.Label>
                  <Form.Control
                    type="tel"
                    placeholder="Nhập số điện thoại liên hệ"
                    name="branchphone"
                    value={dataBranch.branchphone}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                <Form.Group controlId="formBranchEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Nhập email chi nhánh"
                    name="branchemail"
                    value={dataBranch.branchemail}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                <Form.Group controlId="formBranchBusinessLicense">
                  <Form.Label>Giấy Phép Kinh Doanh</Form.Label>
                  <Form.Control
                    type="file"
                    name="branchbusinesslicense"
                    accept="image/*"
                    id="productImages"
                    onChange={uploadToCloudinary}
                    required
                  />
                </Form.Group>

                <div className="d-flex justify-content-start mt-3">
                  <Button variant="secondary" className="me-2" onClick={backlink}>
                    Quay Lại
                  </Button>
                  <Button variant="primary" type="submit">
                    Lưu
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Modal show={showModal} onHide={handleClose}>
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
    </>
  );
}
