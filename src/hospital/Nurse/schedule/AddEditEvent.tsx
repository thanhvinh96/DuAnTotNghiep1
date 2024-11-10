import React, { useState, useEffect } from "react";
import { Modal, Row, Col, Button, Form } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import jwtDecode from 'jwt-decode';
import { useLocation } from 'react-router-dom';

import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

interface Department {
  serviceCode: string;
  serviceName: string;
}
const MySwal = withReactContent(Swal);
interface Doctor {
  _id: string;
  tokenuser:string;
  fullname: string;
}

interface AddEditEventProps {
  isOpen?: boolean;
  onClose?: () => void;
  isEditable?: boolean;
  eventData?: any;
  onRemoveEvent?: () => void;
  onUpdateEvent: (value: any) => void;
  onAddEvent: (value: any) => void;
}

const AddEditEvent = ({
  isOpen,
  onClose,
  isEditable,
  eventData,
  onRemoveEvent,
  onUpdateEvent,
  onAddEvent,
}: AddEditEventProps) => {
  const [datadepartments, setdatadepartments] = useState<Department[]>([]);
  const [doctorLists, setDoctorLists] = useState<Doctor[]>([]);
  const [selectedDepartment, setSelectedDepartment] = useState<string>("");
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [formData, setFormData] = useState({
    title: eventData?.title || "",
    className: eventData?.className || "bg-danger",
    department: "",
    doctor: "",
    timeschedule: "",
    tokenorg:"",
    branch:"",
    patient:"",

  });
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const medical = queryParams.get('medical');

  const getDataMedical = async () => {
    if (medical) {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/medical/cccd", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ cccd: medical })
        });

        const data: any = await response.json();
        console.log("Dữ liệu bệnh nhân:", data);

        setFormData(prevData => ({
          ...prevData,
          patient: data.data?.medicalRecordCode || "",
        }));
      } catch (error) {
        console.error("Error fetching medical data:", error);
      }
    }
  };

  // Hàm lấy dữ liệu dịch vụ dựa trên mã chi nhánh
  const fetchDataServices = async (branch: string) => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/services", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ branchId: branch })
      });

      const data = await response.json();
      console.log("Dữ liệu dịch vụ:", data);
      setdatadepartments(data.data || []);
    } catch (error) {
      console.error("Error fetching services data:", error);
    }
  };

  // Lấy thông tin `branch` và `tokenorg` từ token và cập nhật `formData`
  const getData = async () => {
    const token = localStorage.getItem('tokenadmin');
    if (token) {
      try {
        const decodedToken: any = jwtDecode(token);
        const branch = decodedToken['branch'];
        const tokenorg = decodedToken['tokeorg'];

        console.log("Chi nhánh:", branch);
        console.log("Tổ chức:", tokenorg);

        setFormData(prevData => ({
          ...prevData,
          branch: branch || "",
          tokenorg: tokenorg || "",
        }));

        // Gọi API lấy dữ liệu dịch vụ nếu có branch
        if (branch) {
          await fetchDataServices(branch);
        }
      } catch (error) {
        console.error('Có lỗi xảy ra khi giải mã token:', error);
      }
    }
  };

  useEffect(() => {
    // Gọi các hàm lấy dữ liệu khi component mount
    getData();
    getDataMedical();
  }, []); 
  const handleDepartmentChange = async (department: string) => {
    setSelectedDepartment(department);
    setFormData({ ...formData, department });
    try {
      const response = await fetch("http://127.0.0.1:8000/api/check-by-name", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ specialized: department }),
      });
      const data = await response.json();
      setDoctorLists(data.status ? data.data : []);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleInputChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleChange = (e: any) => {
    console.log(e.target.value)
    setSelectedDate(e.target.value);
    setFormData({ ...formData, timeschedule: e.target.value  });
    // setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
    setFormData({ ...formData, timeschedule: date ? date.toISOString() : "" });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("http://127.0.0.1:8000/api/schedule-create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const result = await response.json();
      if (response.ok) {
        isEditable ? onUpdateEvent(formData) : onAddEvent(formData);
        onClose?.();
        MySwal.fire({
          icon: 'success',
          title: 'Tạo lịch hẹn thành công',
          text: 'Lịch hẹn của bạn đã được tạo thành công!',
          confirmButtonText: 'OK',
        }).then(() => {
          window.location.reload(); // Tải lại trang sau khi người dùng nhấn OK
        });
      } else {
        console.error("Error:", result);
        MySwal.fire({
          icon: 'error',
          title: 'Tạo lịch hẹn thất bại',
          text: 'Có lỗi xảy ra trong quá trình tạo lịch hẹn. Vui lòng thử lại!',
          confirmButtonText: 'OK',
        });
      }
    } catch (error) {
      console.error("Request error:", error);
    }
  };

  return (
    <Modal show={isOpen} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>{isEditable ? "Edit Event" : "Add New Event"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={handleSubmit}>
          <Row>
            <Col sm={12}>
              <Form.Group>
                <Form.Label>Tên Sự Kiện</Form.Label>
                <Form.Control
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="Nhập Tên Sự Kiện"
                />
              </Form.Group>
            </Col>
            <Col sm={12}>
              <Form.Group>
                <Form.Label>Trạng Thái Bệnh Nhân</Form.Label>
                <Form.Control
                  as="select"
                  name="className"
                  value={formData.className}
                  onChange={handleInputChange}
                >
                  <option value="Đã có kết quả">Đã có kết quả</option>
                  <option value="Đang chờ tiếp nhận">Đang chờ tiếp nhận</option>
                  <option value="Đã tiếp nhận">Đã tiếp nhận</option>
                </Form.Control>
              </Form.Group>
            </Col>
            <Col sm={12}>
              <Form.Group>
                <Form.Label>Khoa</Form.Label>
                <Form.Control
                  as="select"
                  name="department"
                  value={formData.department}
                  onChange={(e) => handleDepartmentChange(e.target.value)}
                >
                  <option value="">Chọn Khoa</option>
                  {datadepartments.map((dept) => (
                    <option key={dept.serviceCode} value={dept.serviceName}>
                      {dept.serviceName}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
            </Col>
            <Col sm={12}>
              <Form.Group>
                <Form.Label>Bác Sĩ</Form.Label>
                <Form.Control
                  as="select"
                  name="doctor"
                  value={formData.doctor}
                  onChange={handleInputChange}
                  disabled={!selectedDepartment}
                >
                  <option value="">Chọn Bác Sĩ</option>
                  {doctorLists.map((doc) => (
                    <option key={doc._id} value={doc.tokenuser}>
                      {doc.fullname}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
            </Col>
            <Col xs={12}>
            <Form.Group controlId="formDate" className="mt-3">
              <Form.Label>Thời Gian Lịch Hẹn</Form.Label>
              <Form.Control 
                                onChange={handleChange}
                                // selected={selectedDate}

              type="datetime-local" />
            </Form.Group>
              {/* <Form.Label className="fw-bold text-primary">Thời Gian Lịch Hẹn</Form.Label>
              
              <DatePicker
                selected={selectedDate}
                onChange={handleDateChange}
                showTimeSelect
                dateFormat="Pp"
                className="form-control"
                placeholderText="Chọn Ngày và Giờ"
              /> */}
            </Col>
          </Row>
          <Row className="mt-2 d-flex justify-content-end">
            {isEditable && onRemoveEvent && (
              <Button variant="danger" onClick={onRemoveEvent} className="me-2">
                Xóa
              </Button>
            )}
            <Button variant="success" type="submit">
              Lưu
            </Button>
          </Row>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default AddEditEvent;
