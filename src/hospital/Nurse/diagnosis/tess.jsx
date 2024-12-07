import React, { useState, useEffect } from "react";
import {
  Form,
  Row,
  Col,
  Button,
  Table,
  Card,
  Alert,
  Image,
} from "react-bootstrap";
import PageTitle from "../../../components/PageTitle";
import jwt_decode from "jwt-decode";
import { PushDataMedical } from "../../../controller/MedicalController"; // Import controller
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { getClinicsByDepartmentType } from "../../../controller/Appointment";
import { GetDepartByBranch } from "../../../controller/DepartController";
import {
  CreaterSchedule,
  GetScheduleByMedical,
} from "../../../controller/ScheduleController";
import { GetTokenBranch, GetTokenOrg } from "../../../controller/config";
const ConclusionForm = ({
  onSubmit,
  patientInfo = {},
  examinationHistory = [],
}) => {
  const MySwal = withReactContent(Swal);

  const [tableData, setTableData] = useState([]);
  // Hàm để thêm dòng mới vào bảng
  const addRow = () => {
    setTableData([
      ...tableData,
      { testName: "", referenceValue: "", result: "", unit: "", machine: "" },
    ]);
  };
  const [conclusionData, setConclusionData] = useState({
    diagnosis: "",
    treatment: "",
    followUp: "",
    additionalNotes: "",
    images: [], // Thêm state để lưu trữ hình ảnh tải lên
  });
  const [cccd, setCccd] = useState("");
  const [error, setError] = useState(null);
  const [patientData, setPatientInfo] = useState({});
  const [medicalData, setMedicalData] = useState([]);
  const [previewImages, setPreviewImages] = useState([]); // State để lưu trữ ảnh xem trước

  const showdata = async (patientId) => {
    try {
      const response = await fetch(
        "http://127.0.0.1:8000/api/medicaldata/bycode",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ medicalRecordCode: patientId }),
        }
      );
      const data = await response.json();
      setMedicalData(data.data); // Lưu dữ liệu vào state
      setError(null);
    } catch (error) {
      console.error("Error fetching medical data:", error);
      setError("Đã xảy ra lỗi khi lấy thông tin khám bệnh.");
    }
  };

  const handleAccessPatientInfo = async (patientId) => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/medical/code", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ medicalRecordCode: patientId }),
      });

      const data = await response.json();
      console.log(data.data.fieldsToShare);
      if (response.ok) {
        setPatientInfo({
          fullname: data.data.fullname,
          birthday: data.data.birthday,
          address: data.data.address,
          sobh: data.data.sobh,
          tokenmedical: data.data.tokenmedical,
          sex: data.data.sex,
          weight: data.data.weight,
          height: data.data.height,
          email: data.data.email,
          phoneNumber: data.data.phoneNumber,
          cccd: data.data.cccd,
          fieldsToShare: data.data.fieldsToShare,
          avatar: data.data.avatar || "https://via.placeholder.com/100",
        });
        setError(null);
      } else {
        setError(data.message || "Không tìm thấy thông tin bệnh nhân.");
      }
    } catch (error) {
      console.error("Error fetching patient info:", error);
      setError("Đã xảy ra lỗi khi lấy thông tin bệnh nhân.");
    }
  };

  const getQueryParam = (param) => {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
  };

  useEffect(() => {
    const patientId = getQueryParam("patient");
    if (patientId) {
      setCccd(patientId);
      handleAccessPatientInfo(patientId);
      showdata(patientId);
    }
  }, []);

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    if (name === "department") {
      showClinicsByDepartment(value);
    }
    setAppointmentData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setConclusionData({ ...conclusionData, images: files });
    setPreviewImages(files.map((file) => URL.createObjectURL(file))); // Hiển thị ảnh xem trước
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("tokenadmin");
    let decoded = null;

    if (token) {
      try {
        decoded = jwt_decode(token);
        console.log("Giá trị của tokenuser:", decoded["tokenuser"]);
      } catch (error) {
        console.error("Token không hợp lệ hoặc lỗi khi giải mã:", error);
      }
    }

    if (!decoded) {
      console.error("Không thể lấy dữ liệu từ token.");
      return;
    }

    const hospitalName = "Bệnh viện Đa khoa Tỉnh";
    const patientId = getQueryParam("patient");

    // Kiểm tra các giá trị trước khi tạo resultData
    const resultData = {
      tokeorg: decoded["tokeorg"] || "",
      tokenbranch: decoded["branch"] || "",
      doctor: decoded["tokenuser"] || "",
      diseasecodes: patientId || "",
      namedisease: conclusionData.diagnosis || "",
      cccd: patientData.cccd || "",
      newData: {
        Prescription: tableData || [], // Chuyển tableData thành chuỗi JSON
        examinationHistory: medicalData || [],
        hospitalName: decoded["nameorg"] || hospitalName,
        patientInfo: patientData || {},
        conclusion: {
          ...conclusionData,
          images: conclusionData.images
            ? conclusionData.images.map((file) => file.name)
            : [],
        },
      },
    };

    try {
      const _res = await PushDataMedical(resultData);
      console.log("Dữ liệu kết luận và bệnh nhân:", _res);
      Swal.fire({
        title: "Thêm Dữ liệu thành công!",
        text: "Bạn muốn ở lại trang này hay chuyển đến trang chủ?",
        icon: "success",
        showCancelButton: true,
        confirmButtonText: "Chuyển đến trang chủ",
        cancelButtonText: "Ở lại trang",
      }).then((result) => {
        if (result.isConfirmed) {
          // Chuyển đến trang chủ
          window.location.href = "/doctor/home";
        } else {
          Swal.fire({
            title: "Thất Bại!",
            text: "Thêm Dữ Thất Bại.",
            icon: "error",
            confirmButtonText: "OK",
          });
        }
      });
      onSubmit(resultData);
    } catch (error) {
      Swal.fire({
        title: "Thất Bại!",
        text: "Thêm Dữ Thất Bại.",
        icon: "error",
        confirmButtonText: "OK",
      });
      console.error("Error in PushDataInHospital handler:", error);
    }
  };

  const handlePrescriptionChange = (index, field, value) => {
    const newTableData = [...tableData];
    newTableData[index][field] = value;
    setTableData(newTableData);
  };
  const [appointmentData, setAppointmentData] = useState({
    branch: "",
    department: "",
    patient: "",
    timeschedule: "",
    title: "",
    type: "initial",
    className: "",
    condition: "",
    notes: "",
    tokenorg: "",
    clinic: "",
  });
  const [dataDepartByBranch, setdataDepartByBranch] = useState([]);
  const [branch, setbranch] = useState(null);
  const showdataconfig = async () => {
    try {
      const res = await GetTokenOrg(); // Sử dụng await để lấy giá trị trả về từ GetTokenOrg
      console.log("sdfsdfsdfsdf gia tri " + res.branch); // Bây giờ res là giá trị trả về thực tế, không phải Promise
      setbranch(res.branch);
      setAppointmentData((prevData) => ({
        ...prevData,
        branch: res.branch,
        tokenorg: res.tokeorg,
      }));
    } catch (error) {
      console.error("Error fetching clinics by department:", error);
      alert("Có lỗi xảy ra khi lấy dữ liệu phòng khám.");
    }
  };
  const showDepartByBranch = async () => {
    try {
      const datas = { tokenbranch: branch };
      const res = await GetDepartByBranch(datas);

      if (res?.data) {
        setdataDepartByBranch(res.data);
      } else {
        setdataDepartByBranch([]); // Nếu không có dữ liệu, bạn có thể set lại là mảng rỗng
      }
    } catch (error) {
      console.error("Error fetching clinics by department:", error);
      alert("Có lỗi xảy ra khi lấy dữ liệu phòng khám.");
    }
  };
  useEffect(() => {
    showdataconfig(); // Lấy branch
    // getCodeMedical();
  }, []); // Chỉ chạy khi component mount lần đầu

  // useEffect để gọi showDepartByBranch khi branch thay đổi
  useEffect(() => {
    if (branch) {
      showDepartByBranch(); // Gọi showDepartByBranch khi branch có giá trị
    }
  }, [branch]); // Chạy khi branch thay đổi
  // useEffect(()=>{
  //     if(medicalRecordCode){
  //         showdataTable();

  //     }
  // },[medicalRecordCode])
  return (
    <>
      {/* <PageTitle
                breadCrumbItems={[
                    { label: "Tables", path: "/features/tables/advanced" },
                    {
                        label: "Chuẩn đoán Kết Luận Bệnh Nhân",
                        path: "/features/tables/advanced",
                        active: true,
                    },
                ]}
                title={"Chuẩn đoán Kết Luận Bệnh Nhân"}
            /> */}
      <Col md={12}>
        <Card>
          <Card.Body>
            <h4 className="header-title mb-4">Tạo Lịch Hẹn Mới</h4>
            <Form>
              {/* Chọn Khoa */}
              <Row className="mb-3">
                <Col md={6}>
                  <Form.Group controlId="department">
                    <Form.Label>Khoa</Form.Label>
                    <Form.Control
                      as="select"
                      name="department"
                      value={appointmentData.department}
                      onChange={handleInputChange}
                    >
                      <option value="">Chọn Khoa</option>
                      {dataDepartByBranch.map((department) => (
                        <option key={department._id} value={department._id}>
                          {department.departmentName}
                        </option>
                      ))}
                    </Form.Control>
                  </Form.Group>
                </Col>

                {/* Chọn Phòng Khám */}
                <Col md={6}>
                  <Form.Group controlId="clinic">
                    <Form.Label>Phòng Khám</Form.Label>
                    {/* <Form.Control
                                        as="select"
                                        name="clinic"
                                        value={appointmentData.clinic}
                                        // onChange={handleInputChange}
                                    >
                                        <option value="">Chọn Phòng Khám</option>
                                        {dataclinic.map((clinic) => (
                                            <option key={clinic.key} value={clinic.key}>
                                                {clinic.value}
                                            </option>
                                        ))}
                                    </Form.Control> */}
                  </Form.Group>
                </Col>
              </Row>

              {/* Các trường còn lại */}
              <Row className="mb-3">
                <Col md={12}>
                  <Form.Group controlId="timeschedule">
                    <Form.Label>Thời Gian Lịch Hẹn</Form.Label>
                    <Form.Control
                      type="datetime-local"
                      name="timeschedule"
                      // value={appointmentData.timeschedule}
                      // onChange={handleInputChange}
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Row className="mb-3">
                <Col md={6}>
                  <Form.Group controlId="title">
                    <Form.Label>Tiêu Đề Lịch Hẹn</Form.Label>
                    <Form.Control
                      type="text"
                      name="title"
                      placeholder="Nhập tiêu đề"
                      // value={appointmentData.title}
                      // onChange={handleInputChange}
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group controlId="type">
                    <Form.Label>Loại Lịch Hẹn</Form.Label>
                    <Form.Control
                      as="select"
                      name="type"
                      // value={appointmentData.type}
                      // onChange={handleInputChange}
                    >
                      <option value="initial">Lịch hẹn trưởng khoa</option>
                      <option value="follow_up">Lịch hẹn khám bác sĩ</option>
                    </Form.Control>
                  </Form.Group>
                </Col>
              </Row>
              <Row className="mb-3">
                <Col md={12}>
                  <Form.Group controlId="className">
                    <Form.Label>Trạng thái lịch hẹn</Form.Label>
                    <Form.Control
                      as="select"
                      name="className"
                      // value={appointmentData.className}
                      // onChange={handleInputChange}
                    >
                      <option value="">Chọn trạng thái lịch hẹn</option>
                      <option value="pending">Tiếp nhận</option>
                      <option value="confirmed">Chờ khám</option>
                      <option value="completed">Kết thúc</option>
                      <option value="cancelled">Đã hủy</option>
                    </Form.Control>
                  </Form.Group>
                </Col>
              </Row>
              <Row className="mb-3">
                <Col md={6}>
                  <Form.Group controlId="condition">
                    <Form.Label>Trạng Thái Bệnh Nhân</Form.Label>
                    <Form.Control
                      as="select"
                      name="condition"
                      // value={appointmentData.condition}
                      // onChange={handleInputChange}
                    >
                      <option value="">Chọn trạng thái bệnh nhân</option>
                      <option value="healthy">Khám</option>
                      <option value="under_treatment">Đang điều trị</option>
                      <option value="recovered">Đã hồi phục</option>
                    </Form.Control>
                  </Form.Group>
                </Col>

                <Col md={6}>
                  <Form.Group controlId="notes">
                    <Form.Label>Ghi Chú</Form.Label>
                    <Form.Control
                      type="text"
                      name="notes"
                      placeholder="Nhập ghi chú"
                      // value={appointmentData.notes}
                      // onChange={handleInputChange}
                    />
                  </Form.Group>
                </Col>
              </Row>

              <div className="mt-4 text-end">
                <Button variant="primary" type="submit">
                  Tạo Lịch Hẹn
                </Button>
              </div>
            </Form>
          </Card.Body>
        </Card>
      </Col>

      <Col md={12}>
        <Card>
          <Card.Body>
            <h4 className="header-title mb-4">Quản Lý Lịch Hẹn</h4>
            {/* <Form.Group controlId="searchBranch" className="mb-3">
                        <Form.Label>Tìm Kiếm Theo Phòng Khám</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Nhập ID phòng khám"
                            value={searchBranch}
                            onChange={handleSearchChange}
                        />
                    </Form.Group> */}

            <Table striped bordered hover responsive className="mt-3">
              <thead>
                <tr>
                  <th>Phòng Khám</th>
                  <th>Khoa</th>
                  <th>Mã Hồ Sơ</th>
                  <th>Trạng Thái</th>
                  <th>Thời Gian</th>

                  <th>Loại Lịch Hẹn</th>
                  <th>Ghi Chú</th>
                  <th>Bác Sĩ Tiếp Nhận</th>
                  <th>Chi Tiết</th>
                </tr>
              </thead>
              {/* <tbody>
                        {dataTable.map((schedule, index) => (
            <tr key={schedule._id}>
              <td>{schedule.clinics?.name}</td>
              <td>{schedule.departments?.departmentName || 'Không có thông tin'}</td>
              <td>{schedule.patient || 'Chưa có chuyên khoa'}</td>
              <td>{schedule.className}</td>
              <td>{new Date(schedule.timeschedule).toLocaleString()}</td>
              <td>{schedule.notes}</td>
            </tr>
          ))}
                        </tbody> */}
            </Table>
          </Card.Body>
        </Card>
      </Col>
      <Card className="border p-4 mt-4">
        <Form onSubmit={handleSubmit}>
          <h4>Chuyên Mục Khám và Kết quả</h4>

          {/* Form nhập CCCD */}
          {!patientData && (
            <Row className="mb-3">
              <Col md={6}>
                <Form.Label>CCCD của Bệnh nhân</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Nhập CCCD của bệnh nhân"
                  value={cccd}
                  onChange={(e) => setCccd(e.target.value)}
                />
              </Col>
              <Col md={6} className="d-flex align-items-end">
                <Button
                  variant="primary"
                  onClick={() => handleAccessPatientInfo(cccd)}
                  style={{ fontSize: "12px", padding: "6px 12px" }}
                >
                  Truy cập thông tin bệnh nhân
                </Button>
              </Col>
            </Row>
          )}
          {patientData.fieldsToShare && (
            <Col md={12}>
              <Form.Label>Lịch sử bệnh nhân đã khám</Form.Label>
              <Form onSubmit={handleSubmit}>
                <Table className="table table-bordered text-center mt-5">
                  <thead className="thead-light">
                    <tr>
                      <th scope="col">STT</th>
                      <th scope="col">Mã bệnh</th>
                      <th scope="col">Tên Bệnh</th>
                      <th scope="col">Hành Động</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* Chuyển đổi fieldsToShare thành mảng các cặp key-value */}
                    {Object.entries(patientData.fieldsToShare).map(
                      ([key, value], index) => (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{key}</td> {/* Hiển thị mã bệnh */}
                          <td>{value}</td>{" "}
                          {/* Hiển thị tên bệnh (chuẩn đoán) */}
                          <td>
                            <a
                              href={`./hospital/medical-share?code=${key}&cccd=${patientData.cccd}`}
                              style={{
                                fontSize: "12px",
                                padding: "4px 10px",
                                width: "150px",
                                display: "inline-block",
                                textAlign: "center",
                                textDecoration: "none",
                                color: "#fff",
                                backgroundColor: "#007bff",
                                borderRadius: "4px",
                              }}
                            >
                              Xem chi tiết bệnh
                            </a>
                          </td>
                        </tr>
                      )
                    )}
                  </tbody>
                </Table>
              </Form>
            </Col>
          )}

          {/* Thông tin bệnh nhân */}
          {patientData && (
            <Card className="p-3 mt-3">
              <h5>Thông tin bệnh nhân</h5>
              <Row>
                <Col md={6}>
                  <p>
                    <strong>Họ tên:</strong> {patientData.fullname}
                  </p>
                  <p>
                    <strong>Ngày sinh:</strong> {patientData.birthday}
                  </p>
                  <p>
                    <strong>Địa chỉ:</strong> {patientData.address}
                  </p>
                  <p>
                    <strong>Số BH:</strong> {patientData.sobh}
                  </p>
                  <p>
                    <strong>Số cccd:</strong> {patientData.sobh}
                  </p>
                  <p>
                    <strong>Token Medical:</strong> {patientData.tokenmedical}
                  </p>
                </Col>
                <Col md={6}>
                  <p>
                    <strong>Giới tính:</strong> {patientData.sex}
                  </p>
                  <p>
                    <strong>Cân nặng:</strong> {patientData.weight} kg
                  </p>
                  <p>
                    <strong>Chiều cao:</strong> {patientData.height} cm
                  </p>
                  <p>
                    <strong>Email:</strong> {patientData.email}
                  </p>
                  <p>
                    <strong>Số điện thoại:</strong> {patientData.phoneNumber}
                  </p>
                </Col>
              </Row>
              <Row className="mt-3">
                <Col className="d-flex justify-content-center">
                  <img
                    src={patientData.avatar}
                    alt="Avatar của bệnh nhân"
                    style={{
                      width: "100px",
                      height: "100px",
                      borderRadius: "50%",
                    }}
                  />
                </Col>
              </Row>
            </Card>
          )}

          {error && (
            <Alert variant="danger" className="mt-3">
              {error}
            </Alert>
          )}

          {/* Quá trình khám bệnh */}
          {/* <p>{patientData.fieldsToShare}</p> */}

          <div className="mb-4 mt-3">
            <h5>Quá Trình Khám Bệnh</h5>
            <Table bordered responsive className="text-center">
              <thead className="thead-light">
                <tr>
                  <th>STT</th>
                  <th>Chuyên Mục Khám</th>
                  <th>Kết Quả</th>
                  <th>Hình Ảnh</th>

                  <th>Triệu Chứng</th>
                  <th>Kết Luận</th>
                </tr>
              </thead>
              <tbody>
                {medicalData.length > 0 ? (
                  medicalData.map((record, index) => (
                    <React.Fragment key={index}>
                      {record.exam_records.map((exam, examIndex) => (
                        <tr key={examIndex}>
                          <td>{index + 1}</td>
                          <td>{exam.examination}</td>
                          <td>{exam.result}</td>
                          {examIndex === 0 && (
                            <>
                              <td rowSpan={record.exam_records.length}>
                                {record.patient_image && (
                                  <img
                                    src={record.patient_image}
                                    alt="Patient"
                                    className="small-image"
                                    style={{
                                      cursor: "pointer",
                                      width: "100px",
                                      height: "100px",
                                    }}
                                  />
                                )}
                              </td>
                              <td rowSpan={record.exam_records.length}>
                                {record.diagnosis_info.symptom}
                              </td>
                              <td rowSpan={record.exam_records.length}>
                                {record.diagnosis_info.conclusion}
                              </td>
                            </>
                          )}
                        </tr>
                      ))}
                    </React.Fragment>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5">Không có dữ liệu</td>
                  </tr>
                )}
              </tbody>
            </Table>
          </div>

          {/* Kết luận cuối cùng */}
          <h5>Kết Luận Cuối Cùng của Bác Sĩ</h5>

          <Row className="mb-3">
            <Col md={12}>
              <Form.Label>Chẩn đoán cuối cùng</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Nhập chẩn đoán cuối cùng"
                value={conclusionData.diagnosis}
                onChange={(e) => handleInputChange("diagnosis", e.target.value)}
              />
            </Col>
          </Row>

          <Row className="mb-3">
            <Col md={12}>
              <Form.Label>Phương pháp điều trị</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Nhập phương pháp điều trị hoặc đơn thuốc"
                value={conclusionData.treatment}
                onChange={(e) => handleInputChange("treatment", e.target.value)}
              />
            </Col>
          </Row>

          <Row className="mb-3">
            <Col md={12}>
              <Form.Label>Hẹn tái khám</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nhập lịch hẹn tái khám nếu cần"
                value={conclusionData.followUp}
                onChange={(e) => handleInputChange("followUp", e.target.value)}
              />
            </Col>
          </Row>

          <Row className="mb-3">
            <Col md={12}>
              <Form.Label>Ghi chú thêm</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Nhập ghi chú bổ sung nếu có"
                value={conclusionData.additionalNotes}
                onChange={(e) =>
                  handleInputChange("additionalNotes", e.target.value)
                }
              />
            </Col>
          </Row>
          <Row className="mb-3">
            <Col md={12}>
              <Form.Label>them don thuoc</Form.Label>
              <Form onSubmit={handleSubmit}>
                <Table className="table table-bordered text-center mt-5">
                  <thead className="thead-light">
                    <tr>
                      <th scope="col">STT</th>
                      <th scope="col">Tên thuốc</th>
                      <th scope="col">ĐVT</th>
                      <th scope="col">Số Lượng</th>
                      <th scope="col">Cách Dùng</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tableData.map((item, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>
                          <Form.Control
                            type="text"
                            value={item.testName}
                            onChange={(e) =>
                              handlePrescriptionChange(
                                index,
                                "testName",
                                e.target.value
                              )
                            }
                          />
                        </td>
                        <td>
                          <Form.Control
                            type="text"
                            value={item.referenceValue}
                            onChange={(e) =>
                              handlePrescriptionChange(
                                index,
                                "referenceValue",
                                e.target.value
                              )
                            }
                          />
                        </td>
                        <td>
                          <Form.Control
                            type="text"
                            value={item.result}
                            onChange={(e) =>
                              handlePrescriptionChange(
                                index,
                                "result",
                                e.target.value
                              )
                            }
                          />
                        </td>
                        <td>
                          <Form.Control
                            type="text"
                            value={item.unit}
                            onChange={(e) =>
                              handlePrescriptionChange(
                                index,
                                "unit",
                                e.target.value
                              )
                            }
                          />
                        </td>
                        =
                      </tr>
                    ))}
                  </tbody>
                </Table>
                <div className="d-flex justify-content-between mt-3">
                  <Button
                    onClick={addRow}
                    style={{
                      fontSize: "12px",
                      padding: "4px 10px",
                      width: "150px",
                    }}
                  >
                    Thêm dòng
                  </Button>
                  <Button
                    type="submit"
                    style={{
                      fontSize: "12px",
                      padding: "4px 10px",
                      width: "150px",
                    }}
                  >
                    Lưu kết quả
                  </Button>
                </div>
              </Form>
            </Col>
          </Row>

          <div className="d-flex justify-content-end mt-3">
            <Button
              type="submit"
              variant="primary"
              style={{ fontSize: "14px", padding: "6px 12px" }}
            >
              Lưu Kết Luận
            </Button>
          </div>
        </Form>
      </Card>
    </>
  );
};

export default ConclusionForm;
