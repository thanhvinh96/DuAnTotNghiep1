import React, { useState, useEffect } from "react";
import { Row, Col, Card, Table, Badge } from "react-bootstrap";
import StatisticsWidget3 from "../../../components/StatisticsWidget3";
import jwtDecode from "jwt-decode";
import { getClinicsByDepartmentDoctor } from "../../../controller/ClinicscController";
import { GetScheduleByClinics, UpdateDoctorByMedical } from "../../../controller/ScheduleController";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { GetScheduleByDoctor } from "../../../controller/PersonnelController";
import { GetpersonnelByToken } from "../../../controller/PersonnelController";

import {GetScheduleID} from "../../../controller/ServerController"
interface Appointment {
  id: number;
  patientName: string;
  examinationContent: string;
  appointmentTime: string;
  status: string;
}

interface Clinic {
  _id: string;
  code: string;
  name: string;
  address: string;
  roomType: string;
  phone: string;
  services: string[];
}

const Dashboard3 = () => {
  const token = localStorage.getItem("tokenadmin");
  const MySwal = withReactContent(Swal);

  const [datatable, setDatatable] = useState<Clinic[]>([]);
  const [dataSchedule, setDataSchedule] = useState<any[]>([]);
  const [totalPatients, setTotalPatients] = useState(0); // Tổng số bệnh nhân
  const [pendingPatients, setPendingPatients] = useState(0); // Số bệnh nhân đang chờ
  const decodedToken: any = token ? jwtDecode(token) : null;
  const [typeForm,settypeForm] = useState(null);
  const showdataClinic = async () => {
    try {
      const data = { doctors: decodedToken?.tokenuser };
      const res = await getClinicsByDepartmentDoctor(data);
      if (res && res.data && res.data.length > 0) {
        
        setDatatable(res.data);
        console.log('gia tri'+res.data[0].selectedService)

        console.log('gia tri'+res.data[0].selectedService)
        const dataZ={
          id:res.data[0].selectedService
        }
        const _resz = await GetScheduleID(dataZ);
        console.log("gia tri type form"+_resz.data[0].serviceType)
                settypeForm(_resz.data[0].serviceType);

        const scheduleRes = await GetScheduleByClinics({ clinic: res.data[0]._id });

        const schedules = scheduleRes || [];
        setDataSchedule(schedules);

        // Tính tổng số bệnh nhân và bệnh nhân đang chờ
        const total = schedules.length;
        const pending = schedules.filter((appt: any) => appt.className === "pending").length;

        setTotalPatients(total);
        setPendingPatients(pending);
      } else {
        setDatatable([]);
        setDataSchedule([]);
        setTotalPatients(0);
        setPendingPatients(0);
      }
    } catch (error) {
      console.error("Error fetching clinic or schedule data:", error);
      setDatatable([]);
      setDataSchedule([]);
      setTotalPatients(0);
      setPendingPatients(0);
    }
  };

  const handleAccept = async (id: string) => {
    try {
      // Log thông tin cơ bản
      console.log(`Attempting to accept appointment with ID: ${id}`);
      
      if (!decodedToken || !decodedToken['tokenuser']) {
        console.error("Token for doctor is missing");
        return MySwal.fire({
          icon: 'error',
          title: 'Lỗi xác thực',
          text: 'Token của bác sĩ không hợp lệ. Vui lòng đăng nhập lại.',
        });
      }
  
      if (!id) {
        console.error("Patient ID is missing");
        return MySwal.fire({
          icon: 'error',
          title: 'Lỗi dữ liệu',
          text: 'ID của bệnh nhân không được để trống.',
        });
      }
  
      // Chuẩn bị dữ liệu để lấy thông tin bác sĩ
      const updatedDataget = {
        tokenuser: decodedToken['tokenuser'],
        tokeorg: decodedToken['tokeorg'],
        value: "org1",
      };
  
      // Lấy thông tin bác sĩ
      const personnelResponse = await GetpersonnelByToken(updatedDataget);
      const doctorInfo = personnelResponse?.data;
  
      if (!doctorInfo?.fullname) {
        console.error("Doctor's full name could not be retrieved");
        return MySwal.fire({
          icon: 'error',
          title: 'Lỗi',
          text: 'Không thể lấy thông tin bác sĩ. Vui lòng thử lại sau.',
        });
      }
  
      console.log(`Doctor's full name: ${doctorInfo.fullname}`);
  
      // Chuẩn bị dữ liệu để cập nhật cuộc hẹn
      const requestData = {
        accepted_by_doctor: decodedToken['tokenuser'], // Token của bác sĩ
        accepted_by_name_doctor: doctorInfo.fullname, // Tên của bác sĩ
        medical: id, // ID của bệnh nhân
      };
  
      // Gửi yêu cầu cập nhật
      const updateResponse = await UpdateDoctorByMedical(requestData);
  
      if (updateResponse?.status === true) {
        console.log("Appointment accepted successfully:", updateResponse.data);
        MySwal.fire({
          icon: 'success',
          title: 'Thành công',
          text: 'Cuộc hẹn đã được tiếp nhận thành công.',
        });
  
        // Làm mới dữ liệu phòng khám
        showdataClinic();
      } else {
        console.error("Failed to accept appointment:", updateResponse);
        MySwal.fire({
          icon: 'error',
          title: 'Lỗi',
          text: 'Không thể tiếp nhận cuộc hẹn. Vui lòng thử lại.',
        });
      }
    } catch (error) {
      // Log lỗi chi tiết
      console.error("Error occurred while accepting appointment:", error);
      MySwal.fire({
        icon: 'error',
        title: 'Lỗi hệ thống',
        text: 'Đã xảy ra lỗi trong quá trình xử lý. Vui lòng thử lại sau.',
      });
    }
  };
  

  const handleExamine = (id: string) => {
    // Logic to examine the patient
    console.log(`Examine patient with ID: ${id}`);
    window.location.href = `/nurse?typeform=${typeForm}&patient=${id}`;
    // Thêm logic điều hướng hoặc xử lý khác tại đây
  };
  
  const handleSchedule = (id: string) => {
    // Logic to schedule the appointment
    console.log(`Schedule for appointment with ID: ${id}`);
    // Thêm logic điều hướng hoặc xử lý khác tại đây
  };

  useEffect(() => {
    showdataClinic();
    // Có thể thêm các phụ thuộc khác nếu cần
  }, []);

  return (
    <>
      <Row className="mb-2">
        <Col md={6}>
          <Card className="shadow-sm border-0">
            <Card.Body>
              <StatisticsWidget3
                title="Tổng số bệnh nhân"
                stats={totalPatients.toString()}
                trend={{
                  label: "Tổng số bệnh nhân",
                  value: totalPatients.toString(),
                  icon: "fa-users",
                  variant: "success",
                  trendStats: "100%",
                }}
              />
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          <Card className="shadow-sm border-0">
            <Card.Body>
              <StatisticsWidget3
                title="Số bệnh nhân đang chờ"
                stats={pendingPatients.toString()}
                trend={{
                  label: "Bệnh nhân đang chờ",
                  value: pendingPatients.toString(),
                  icon: "fa-user-clock",
                  variant: "warning",
                  trendStats: "Hiện tại",
                }}
              />
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="mb-4">
        <Col>
          <Card className="shadow-sm border-0">
            <Card.Header className="bg bg-primary-custom" style={{ color: "white" }}>
              <h4 className="text-custom">Phòng khám hiện tại bác sĩ đang làm việc</h4>
            </Card.Header>
            <Card.Body>
              <div className="table-responsive">
                <Table className="table-hover table-sm text-center">
                  <thead className="table-light">
                    <tr>
                      <th>Mã</th>
                      <th>Tên</th>
                      <th>Địa chỉ</th>
                      <th>Loại phòng</th>
                      <th>Điện thoại</th>
                      <th>Dịch vụ</th>
                    </tr>
                  </thead>
                  <tbody>
                    {datatable.length ? datatable.map(clinic => (
                      <tr key={clinic._id}>
                        <td>{clinic.code}</td>
                        <td>{clinic.name}</td>
                        <td>{clinic.address}</td>
                        <td><Badge bg="info">{clinic.roomType}</Badge></td>
                        <td>{clinic.phone}</td>
                        <td>
                          {clinic.services.map((service, idx) => (
                            <Badge key={idx} bg="secondary" className="me-1">{service}</Badge>
                          ))}
                        </td>
                      </tr>
                    )) : (
                      <tr>
                        <td colSpan={6} className="text-center">Không có dữ liệu</td>
                      </tr>
                    )}
                  </tbody>
                </Table>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row>
        <Col>
          <Card className="shadow-sm border-0">
            <Card.Header className="bg-primary-custom custom-header">
              <h4 className="mb-0 text-custom" >Danh sách lịch hẹn</h4>
            </Card.Header>
            <Card.Body>
              <div className="table-responsive">
                <Table className="table-hover table-sm text-center">
                  <thead className="table-light">
                    <tr>
                      <th>Mã lịch hẹn</th>
                      <th>Tên bệnh nhân</th>
                      <th>Nội dung khám</th>
                      <th>Thời gian</th>
                      <th>Trạng thái</th>
                      <th>Hành Động</th>
                      <th>Truy cập thông tin</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dataSchedule.length ? (
                      dataSchedule.map((appt: any, idx: number) => (
                        <tr key={appt._id || idx}>
                          <td>{appt._id}</td>
                          <td>{appt.patient || "N/A"}</td>
                          <td>{appt.notes || "Nội dung không có"}</td>
                          <td>{appt.timeschedule ? new Date(appt.timeschedule).toLocaleString() : "N/A"}</td>
                          <td>
                            <Badge bg={
                              appt.className === "Hoàn thành" ? "success" :
                              appt.className === "pending" ? "warning" :
                              "info"
                            }>
                              {appt.className || "chưa tiếp nhận"}
                            </Badge>
                          </td>
                          <td>
                            {appt.className === "pending" ? (
                              <button
                                className="btn btn-primary btn-sm"
                                onClick={() => handleAccept(appt._id)}
                              >
                                Tiếp nhận
                              </button>
                            ) : (
                              <>
                                <button
                                  className="btn btn-success btn-sm me-2"
                                  onClick={() => handleExamine(appt.patient)}
                                >
                                  Khám bệnh
                                </button>
                                {/* Bạn có thể thêm các hành động khác ở đây nếu cần */}
                              </>
                            )}
                          </td>
                          <td>
                            <button
                              className="btn btn-info btn-sm"
                              onClick={() => {
                                // Thay thế bằng logic truy cập thông tin bệnh nhân
                                console.log(`Truy cập thông tin bệnh nhân ID: ${appt.patientID}`);
                                // Ví dụ: điều hướng đến trang chi tiết bệnh nhân
                                // history.push(`/patient/${appt.patientID}`);
                              }}
                            >
                              Truy cập
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={7} className="text-center">Không có dữ liệu</td>
                      </tr>
                    )}
                  </tbody>
                </Table>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default Dashboard3;
