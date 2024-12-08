import React, { useState, useEffect, ChangeEvent } from "react";
import { Card, Form, Button, Row, Col, Table, Alert } from "react-bootstrap";
import PageTitle from "../../components/PageTitle";
import { getClinicsByDepartmentType } from "../../controller/Appointment";
import { GetDepartByBranch } from "../../controller/DepartController";
import { CreaterSchedule ,GetScheduleByMedical} from "../../controller/ScheduleController";
import { GetTokenBranch, GetTokenOrg } from "../../controller/config";
import { useNavigate, useLocation } from "react-router-dom";
import {ShowCodeMedicalBycccd} from "../../controller/MedicalController";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
interface AppointmentData {
    branch: string;
    department: string;
    patient: any;
    timeschedule: string;
    title: string;
    type: "initial" | "follow_up";
    previousScheduleId?: string;
    notes?: string;
    className:string;
    condition:string;
    tokenorg:string;
    clinic:string;
}
interface service_branch{
    _id:String;
    serviceCode:String;
    serviceName:String;
    serviceType:String;
    serviceFees:String;
}
interface Clinic {
    _id: string;
    code: string;
    name: string;
    address: string;
    phone: string;
    services: string[];
    tokenorg: string;
    branch: string;
    roomType: string;
    departmentType: string;
    service_branch: service_branch;
  }
  interface Departments {
    _id: string;                // ID of the department
    departmentCode: string;     // Code of the department (e.g. 'kn02')
    departmentName: string;     // Name of the department (e.g. 'Khoa Ngoại')
    description: string;        // Description of the department
    tokenbranch: string;        // Token related to the branch
    updated_at: string;         // Timestamp for the last update
    created_at: string;         // Timestamp for the creation of the department
}

  interface Schedule {
    _id: string;
    branch: string;
    className: string;
    condition: string;
    departments: Departments;
    patient: string;
    timeschedule: string;
    title: string;
    tokenorg: string;
    notes: string;
    type: string;
    clinic: string;
    updated_at: string;
    created_at: string;
    clinics: Clinic;
    accepted_by_doctor:string;
  }
const CreateAppointment: React.FC = () => {
    const location = useLocation(); // Lấy thông tin location từ React Router
    const queryParams = new URLSearchParams(location.search); // Lấy query params từ URL
    const MySwal = withReactContent(Swal);

    const medical:any = queryParams.get("medical"); // Lấy giá trị của query param 'model'
    const patient:any = queryParams.get("patient"); // Lấy giá trị của query param 'model'
    const [branch, setbranch] = useState(null);
    const [medicalRecordCode,setmedicalRecordCode] = useState(null);
    const getCodeMedical = async ()=>{
        try{
            const data = {
                cccd: medical 
            };
            const _res =await ShowCodeMedicalBycccd(data)
            console.log('du lieu mau');
            console.log(_res);
            setAppointmentData(prevData => ({
                ...prevData,
                patient:_res.data.medicalRecordCode,
            }));      
            setmedicalRecordCode(_res.data.medicalRecordCode)

        } catch (error) {
            console.error('Error fetching clinics by department:', error);
            alert("Có lỗi xảy ra khi lấy dữ liệu phòng khám.");
        }
    }
    const setdatapatient =  async()=>{
        setAppointmentData(prevData => ({
            ...prevData,
            patient:patient,
        }));      
        setmedicalRecordCode(patient)
    }
    const [appointmentData, setAppointmentData] = useState<AppointmentData>({
        branch: "",
        department: "",
        patient:"",
        timeschedule: "",
        title: "",
        type: "initial",
        className:"",
        condition:"",
        notes:"",
        tokenorg:"",
        clinic:"",
    });

    const [typeclinics, setTypeclinics] = useState<{ _id: string, name: string }[]>([]);
    const [appointments, setAppointments] = useState<AppointmentData[]>([]);
    const [searchBranch, setSearchBranch] = useState<string>("");

    const showdataconfig = async () => {
        try {
            const res: any = await GetTokenOrg();  // Sử dụng await để lấy giá trị trả về từ GetTokenOrg
            console.log('sdfsdfsdfsdf gia tri ' + res.branch);  // Bây giờ res là giá trị trả về thực tế, không phải Promise
            setbranch(res.branch)
            setAppointmentData(prevData => ({
                ...prevData,
                branch: res.branch,
                tokenorg:res.tokeorg,
            }));        
        } catch (error) {
            console.error('Error fetching clinics by department:', error);
            alert("Có lỗi xảy ra khi lấy dữ liệu phòng khám.");
        }
    };
    const [dataTable, setDataTable] = useState<Schedule[]>([]);
        const showdataTable = async ()=>{
        try {
           const data = {
            patient:medicalRecordCode
           }
            const res = await GetScheduleByMedical(data)
            console.log(res);
            if(res.status===true){
                setDataTable(res.data);  // Lưu dữ liệu vào state

            }else{
                setDataTable([]);  // Lưu dữ liệu vào state

            }
        } catch (error) {
            console.error('Error fetching clinics by department:', error);
            alert("Có lỗi xảy ra khi lấy dữ liệu phòng khám.");
        }
    }

    // Fetch clinics by department  
    const [dataDepartByBranch, setdataDepartByBranch] = useState<{ _id: string, departmentName: string }[]>([]);
    const showDepartByBranch = async () => {
        try {
            const datas = { tokenbranch: branch };
            const res = await GetDepartByBranch(datas);

            if (res?.data) {
                setdataDepartByBranch(res.data);
            } else {
                setdataDepartByBranch([]);  // Nếu không có dữ liệu, bạn có thể set lại là mảng rỗng
            }
        } catch (error) {
            console.error('Error fetching clinics by department:', error);
            alert("Có lỗi xảy ra khi lấy dữ liệu phòng khám.");
        }
    };
  
    const showClinicsByDepartment = async (index: string) => {
        const datas = { departmentType: index };

        try {
            const res: any = await getClinicsByDepartmentType(datas);
            // console.log('sdfsdfsdfsdfsdfsdf' + JSON.stringify(res.data)); // In ra chuỗi JSON

            if (res.data) {
                setTypeclinics(res.data); // Update state with fetched clinics
                console.log(res)
            } else {
                setTypeclinics([]); // Update state with fetched clinics

                console.log('No data received');
            }
        } catch (error) {
            console.error('Error fetching clinics by department:', error);
            alert("Có lỗi xảy ra khi lấy dữ liệu phòng khám.");
        }
    };
    const showdataDepartByBranch = dataDepartByBranch.length > 0
        ? dataDepartByBranch
            .filter(item => item.departmentName)  // Lọc chỉ các mục có departmentName
            .map(item => ({
                value: item.departmentName,
                key: item._id
            }))
        : [{ value: "Không có dữ liệu", key: "" }];  // Nếu không có dữ liệu, hiển thị lựa chọn "Không có dữ liệu"

    const dataclinic = typeclinics.length > 0
        ? typeclinics.map(item => ({
            value: item.name,
            key: item._id
        }))
        : [{ value: "Không có dữ liệu", key: "" }];  // Nếu không có phòng khám, hiển thị "Không có dữ liệu"

        useEffect(() => {
            showdataconfig(); // Lấy branch
            if(medical){
                getCodeMedical();

            }

        }, []); // Chỉ chạy khi component mount lần đầu
        
        // useEffect để gọi showDepartByBranch khi branch thay đổi
        useEffect(() => {
            if (branch) {
                showDepartByBranch(); // Gọi showDepartByBranch khi branch có giá trị
            }
        }, [branch]); // Chạy khi branch thay đổi
        useEffect(()=>{
            if(medicalRecordCode){
                showdataTable();

            }else{
                setdatapatient()
            }

        },[medicalRecordCode])
    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        if (name === 'department') {
            showClinicsByDepartment(value);

        }
        setAppointmentData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };
    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchBranch(e.target.value);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        try {
            e.preventDefault();
            console.log(appointmentData);
            
            // Gọi API tạo lịch hẹn
            const res = await CreaterSchedule(appointmentData);
            console.log(res);
    
            if (res) {
                // Hiển thị thông báo thành công
                MySwal.fire({
                    icon: 'success',
                    title: 'Tạo lịch hẹn thành công',
                    text: 'Lịch hẹn của bạn đã được tạo thành công!',
                    confirmButtonText: 'OK',
                }).then((result) => {
                    if (result.isConfirmed) {
                        // Hiển thị lựa chọn chuyển hướng hoặc ở lại trang
                        MySwal.fire({
                            title: 'Bạn muốn làm gì tiếp theo?',
                            text: 'Chọn một trong hai lựa chọn:',
                            icon: 'question',
                            showCancelButton: true,
                            confirmButtonText: 'Chuyển về trang quản lý',
                            cancelButtonText: 'Tạo thêm lịch hẹn',
                        }).then((nextAction) => {
                            if (nextAction.isConfirmed) {
                                // Chuyển về trang quản lý
                                window.location.href = '/request-medical-nurse'; // Thay đổi đường dẫn trang quản lý nếu cần
                            } else {
                                // Giữ lại trang tạo lịch hẹn
                                window.location.reload(); // Tải lại trang hiện tại
                            }
                        });
                    }
                });
            } else {
                console.error("Error:", res);
                MySwal.fire({
                    icon: 'error',
                    title: 'Tạo lịch hẹn thất bại',
                    text: 'Có lỗi xảy ra trong quá trình tạo lịch hẹn. Vui lòng thử lại!',
                    confirmButtonText: 'OK',
                });
            }
        } catch (error) {
            console.error('Error fetching clinics by department:', error);
            alert("Có lỗi xảy ra khi lấy dữ liệu phòng khám.");
        }
    };
    const handleExportInvoice = () => {
        // const invoiceData: any = [];
    
        // // Duyệt qua tất cả các lịch hẹn trong dataTable
        // dataTable.forEach((schedule: any) => {
        //     const patient = schedule.patient || 'Chưa có thông tin bệnh nhân';
    
        //     // Tìm xem bệnh nhân đã có trong mảng invoiceData chưa
        //     let existingPatient = invoiceData.find((item: any) => item.medical === patient);
    
        //     if (!existingPatient) {
        //         // Nếu chưa có, tạo mới đối tượng cho bệnh nhân này
        //         existingPatient = {
        //             medical: patient,
        //             dataservers: []  // Mảng chứa các lịch hẹn của bệnh nhân
        //         };
        //         // Thêm đối tượng bệnh nhân vào invoiceData
        //         invoiceData.push(existingPatient);
        //     }
    
        //     // Thêm lịch hẹn vào mảng dataservers của bệnh nhân
        //     existingPatient.dataservers.push(schedule);
        // });
    
        // // Log kết quả ra ngoài vòng lặp
        // console.log(invoiceData);
        window.location.href =`hospital/medicalbill?medical=${patient}`;
    };
    
    

    const filteredAppointments = appointments.filter(
        (appointment) => appointment.branch.includes(searchBranch)
    );

    return (
       <>
 

    <Row className="justify-content-center">
        <Col md={12}>
            <Card>
                <Card.Body>
                    <h4 className="header-title mb-4">Tạo Lịch Hẹn Mới</h4>
                    <Form onSubmit={handleSubmit}>
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
                                        {showdataDepartByBranch.map((department) => (
                                            <option key={department.key} value={department.key}>
                                                {department.value}
                                            </option>
                                        ))}
                                    </Form.Control>
                                </Form.Group>
                            </Col>

                            {/* Chọn Phòng Khám */}
                            <Col md={6}>
                                <Form.Group controlId="clinic">
                                    <Form.Label>Phòng Khám</Form.Label>
                                    <Form.Control
                                        as="select"
                                        name="clinic"
                                        value={appointmentData.clinic}
                                        onChange={handleInputChange}
                                    >
                                        <option value="">Chọn Phòng Khám</option>
                                        {dataclinic.map((clinic) => (
                                            <option key={clinic.key} value={clinic.key}>
                                                {clinic.value}
                                            </option>
                                        ))}
                                    </Form.Control>
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
                                        value={appointmentData.timeschedule}
                                        onChange={handleInputChange}
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
                                        value={appointmentData.title}
                                        onChange={handleInputChange}
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group controlId="type">
                                    <Form.Label>Loại Lịch Hẹn</Form.Label>
                                    <Form.Control
                                        as="select"
                                        name="type"
                                        value={appointmentData.type}
                                        onChange={handleInputChange}
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
                                        value={appointmentData.className}
                                        onChange={handleInputChange}
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
                value={appointmentData.condition}
                onChange={handleInputChange}
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
                value={appointmentData.notes}
                onChange={handleInputChange}
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
    </Row>

        <Col md={12}>
            <Card>
                <Card.Body>
                    <h4 className="header-title mb-4">Quản Lý Lịch Hẹn</h4>
                    <Form.Group controlId="searchBranch" className="mb-3">
                        <Form.Label>Tìm Kiếm Theo Phòng Khám</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Nhập ID phòng khám"
                            value={searchBranch}
                            onChange={handleSearchChange}
                        />
                    </Form.Group>
                    <div style={{ overflowX: 'auto' }}>
  <Table bordered hover className="mt-4 text-center table-responsive">
    <thead className="bg-primary text-white">
      <tr style={{ background: '#38adc1' }}>
        <th style={{ color: 'white' }}>Phòng Khám</th>
        <th style={{ color: 'white' }}>Khoa</th>
        <th style={{ color: 'white' }}>Mã Hồ Sơ</th>
        <th style={{ color: 'white' }}>Trạng Thái</th>
        <th style={{ color: 'white' }}>Thời Gian</th>
        <th style={{ color: 'white' }}>Loại Lịch Hẹn</th>
        <th style={{ color: 'white' }}>Bác Sĩ Tiếp Nhận</th>
        <th style={{ color: 'white' }}>Phí Dịch Vụ</th>
      </tr>
    </thead>
    <tbody>
      {dataTable.map((schedule, index) => (
        <tr key={schedule._id}>
          <td>{schedule.clinics?.name}</td>
          <td>{schedule.departments?.departmentName || 'Không có thông tin'}</td>
          <td>{schedule.patient || 'Chưa có chuyên khoa'}</td>
          <td>{schedule.className === 'Received' ? 'Đã tiếp nhận' : schedule.className}</td>
          <td>{new Date(schedule.timeschedule).toLocaleString()}</td>
          <td>{schedule.notes}</td>
          <td>{schedule.accepted_by_doctor || 'Chưa cập nhật'}</td>
          <td>{schedule.clinics?.service_branch?.serviceFees || 'Không có phí'}</td>
        </tr>
      ))}
    </tbody>
  </Table>
</div>


                    <div className="d-flex justify-content-between mt-4">
                          
                            <Button
                                type="submit"
                                variant="primary"
                                style={{
                                    fontSize: "14px",
                                    padding: "6px 20px",
                                    width: "150px",
                                }}
                                onClick={handleExportInvoice} // Gọi hàm khi nhấn nút

                            >
                               Xuất Hóa Đơn
                            </Button>
                        </div>
                </Card.Body>
            </Card>
        </Col>
</>

    );
};

export default CreateAppointment;
