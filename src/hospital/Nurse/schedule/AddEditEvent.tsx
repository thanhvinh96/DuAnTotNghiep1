import React, { useState, useEffect } from "react";
import { Modal, Row, Col, Button, Form } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import jwtDecode from 'jwt-decode';
import { useLocation } from 'react-router-dom';
interface Department {
  serviceCode: string;
  serviceName: string;
}

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
    try {
      const response = await fetch("http://127.0.0.1:8000/api/medical/cccd", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ cccd: medical }) // Gửi cccd trong body
      });
      
      const data:any = await response.json();
      // Xử lý dữ liệu nhận được, ví dụ: setdatadepartments(data.data || []);
      setFormData({ ...formData, 
     
        patient: data.data.medicalRecordCode || "",         
      });
      console.log(data); // Kiểm tra dữ liệu nhận được
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/services");
        const data = await response.json();
        setdatadepartments(data.data || []);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    getDataMedical();
    fetchData();
  }, []);
  const getData = async () => {
    const token = localStorage.getItem('tokenadmin');
    // console.log(token)
    if (token) {
      try {
        const decodedToken: any = jwtDecode(token);
  
        console.log("chi nhanh" + decodedToken['branch']);
        console.log("to chuc " + decodedToken['tokeorg']);
        setFormData({ ...formData, 
          branch:decodedToken['branch'],
          tokenorg:decodedToken['tokeorg'],
        });

        const tokeorg = decodedToken['tokeorg'];
        if (tokeorg) {
          const dataorg = {
            "tokenorg": tokeorg
          };
         
        }


      } catch (error) {
        console.error('Có lỗi xảy ra:', error);
      }
    }
  };
  useEffect(()=>{
    getData()
  },[])
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
      } else {
        console.error("Error:", result);
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
              <Form.Label className="fw-bold text-primary">Thời Gian Lịch Hẹn</Form.Label>
              <DatePicker
                selected={selectedDate}
                onChange={handleDateChange}
                showTimeSelect
                dateFormat="Pp"
                className="form-control"
                placeholderText="Chọn Ngày và Giờ"
              />
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
