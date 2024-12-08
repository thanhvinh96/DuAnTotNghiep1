import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Card, Form, Button, Row, Col, Table, Modal } from "react-bootstrap";
import PageTitle from "../../components/PageTitle";
import {GetSchedule} from "../../controller/ServerController"
import Select from 'react-select';
import jwtDecode from 'jwt-decode';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
interface Doctor {
    _id: string;
    fullname: string;
    tokenuser: string;
    specialized: { value: string, label: string }[]; // Cập nhật kiểu specialized là mảng đối tượng có value và label
}

interface Clinic {
    _id: string;
    code: string;
    name: string;
    address: string;
    phone: string;
    doctors: Doctor[];
    services: string[];
    tokenorg: string;
    branch: string;
}

export default function CreateClinic() {
    const [code, setCode] = useState<string>("");
    const [name, setName] = useState<string>("");
    const [address, setAddress] = useState<string>("");
    const [phone, setPhone] = useState<string>("");
    const [doctors, setDoctors] = useState<Doctor[]>([]); // Tất cả bác sĩ
    const [selectedDoctors, setSelectedDoctors] = useState<any[]>([]); // Bác sĩ đã chọn
    const [services, setServices] = useState<string>("");
    const [tokenorg, setTokenorg] = useState<string>("");
    const [branch, setBranch] = useState<string>("");
    const [clinics, setClinics] = useState<Clinic[]>([]);
    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);

    const [datatypeUser, setdatatypeUser] = useState([]);
    const model: any = queryParams.get("model");
    // Lấy danh sách bác sĩ từ API
    const fetchDoctors = async () => {
        try {
            console.clear()
            console.log(" duwx lieu mafu"+model)
            const s = {
                branch: model, // Thay bằng token branch thật
            };
            
            const response = await fetch("http://127.0.0.1:8000/api/users/bybranch", {
                method: "POST", // Method nên là POST
                headers: {
                    "Content-Type": "application/json", // Xác định kiểu dữ liệu gửi
                },
                body: JSON.stringify(s), // Chuyển object thành JSON string
            });
            
            if (!response.ok) {
                console.error("Error:", response.status, response.statusText);
            // } else {
            //     const data = await response.json(); // Parse kết quả JSON từ API
            //     console.log("Response data:", data);
            }
            
            const data = await response.json();
            console.log("sdfsdf"+data.data)
            setDoctors(data.data); // Giả sử API trả về mảng bác sĩ
        } catch (error) {
            console.error("Lỗi khi lấy danh sách bác sĩ:", error);
        }
    };
    const showdata = async () => {
        const token = localStorage.getItem('tokenadmin');
        if (token) {
            const decodedToken: any = jwtDecode(token);
            console.log(decodedToken['tokeorg']);
            await setTokenorg(decodedToken['tokeorg']);
            await setBranch(model);

        }
    }
    const [dataserver, setdataserver] = useState<any[]>([]);  // Dữ liệu server
    const [selectedService, setSelectedService] = useState<string | null>(null);

    // Hàm lấy dữ liệu từ server
    const showdataserver = async () => {
        try {
            const data = { branchId: model };
            const res: any = await GetSchedule(data); // Chắc chắn rằng đây là một hàm trả về Promise
            if (res && res.data) {
                setdataserver(res.data);  // Cập nhật dữ liệu vào state
            } else {
                console.error("No data found in the response");
            }
        } catch (error) {
            console.error("Error occurred while fetching data: ", error);
        }
    };
    const handleServiceChange = (selectedOption: any) => {
        console.log('Selected service ID:', selectedOption?.value); // In ra giá trị id (value)
        setSelectedService(selectedOption?.value);  // Lưu giá trị id vào state
    };
    
    const showdataTable = async () => {
        try {
            const datas = {
                branch: model
            };
            const _res = await fetch('http://127.0.0.1:8000/api/clinics', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(datas),
            });

            if (!_res.ok) {
                throw new Error(`HTTP error! Status: ${_res.status}`);
            }

            const data = await _res.json();
            console.log(data);
            setClinics(data.data);  // Update the clinics with the fetched data
        } catch (error) {
            console.error("Error occurred: ", error);
        }
    };
    const [showModal, setShowModal] = useState(false);  // State quản lý modal


    // Hàm mở modal và hiển thị danh sách bác sĩ
    const handleShow = (doctors: any) => {
        setSelectedDoctors(doctors);  // Cập nhật danh sách bác sĩ của phòng khám
        setShowModal(true);  // Hiển thị modal
    };

    const handleClose = () => {
        setShowModal(false);  // Đóng modal
        setSelectedDoctors([]);  // Reset danh sách bác sĩ
    };
    useEffect(()=>{
        fetchDoctors(); // Gọi API khi component mount

    },[model])
    useEffect(() => {
        showdata();
        showdataserver();
        showdataTable();
        showdepartmentByBranch();
    }, []);
    const [roomType, setRoomType] = useState<string>('');
    const [departmentType, setdepartmentType] = useState<string>('');
    const MySwal = withReactContent(Swal);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const newClinic = {
            code,
            name,
            address,
            phone,
            doctors: selectedDoctors,
            services: services.split(","),
            tokenorg,
            branch,
            roomType,
            departmentType,
            selectedService,
        };
        console.log(newClinic);
        try {
            const _res = await fetch('http://127.0.0.1:8000/api/clinics/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify(newClinic),
            });

            if (!_res.ok) {
                // Nếu mã trạng thái HTTP không phải là 2xx (thất bại)
                throw new Error(`HTTP error! Status: ${_res.status}`);
            }

            const data = await _res.json();  // Chuyển đổi phản hồi thành JSON
            console.log(data);  // Log dữ liệu trả về

            // Hiển thị thông báo thành công
            MySwal.fire({
                title: 'Thành Công!',
                text: 'Phòng khám đã được tạo thành công.',
                icon: 'success',
                confirmButtonText: 'OK',
            }).then(() => {
                // Modal hỏi người dùng có muốn đăng ký thêm phòng khám không
                MySwal.fire({
                    title: 'Bạn muốn làm gì tiếp theo?',
                    text: 'Bạn có muốn đăng ký thêm phòng khám hoặc quay về trang chủ?',
                    icon: 'question',
                    showCancelButton: true,
                    confirmButtonText: 'Đăng ký thêm',
                    cancelButtonText: 'Về trang chủ',
                }).then((result) => {
                    if (result.isConfirmed) {
                        // Nếu người dùng chọn đăng ký thêm, reset form và tiếp tục
                        setCode('');
                        setName('');
                        setAddress('');
                        setPhone('');
                        setSelectedDoctors([]);
                        setServices('');
                        setRoomType('');
                        showdataTable();
                    } else {
                        // Nếu người dùng chọn về trang chủ, điều hướng về trang chủ
                        navigate('/');
                    }
                });
            });

        } catch (error) {
            console.error("Error occurred: ", error);

            // Hiển thị thông báo thất bại
            MySwal.fire({
                title: 'Thất Bại!',
                text: 'Có lỗi xảy ra trong quá trình tạo phòng khám.',
                icon: 'error',
                confirmButtonText: 'OK',
            });
        }
    };
    const [datadepartment, setdatadepartment] = useState<any[]>([]);

    // Hàm để gọi API và cập nhật datadepartment
    const showdepartmentByBranch = async () => {
        try {
            const res = await fetch('http://127.0.0.1:8000/api/department/bybranch', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    tokenbranch: model
                })
            });

            const data = await res.json();

            if (res.ok) {
                setdatadepartment(data.data);  // `data.data` chứa mảng dịch vụ từ server
            } else {
                console.error("Failed to fetch services:", data);
                alert("Có lỗi xảy ra khi lấy dữ liệu dịch vụ.");
            }
        } catch (error) {
            console.error("Error fetching services:", error);
            alert("Có lỗi xảy ra khi kết nối với server.");
        }
    };
    const departmentOptions = datadepartment.map(department => ({
        value: department._id,  // Hoặc trường dữ liệu nào khác phù hợp làm giá trị
        label: department.departmentName // Hoặc trường dữ liệu nào khác phù hợp làm nhãn
    }))
    const handleDoctorChange = (selectedOptions: any) => {
        const selectedDoctorIds = selectedOptions.map((option: { value: string }) => option.value);
        console.log(selectedDoctorIds)
        setSelectedDoctors(selectedDoctorIds); // Chỉ lưu danh sách tokenuser
    };


    const handleDeleteClinic = async (index: string) => {
        try {
            const response = await fetch('http://127.0.0.1:8000/api/clinics/delete', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify({
                    id: index,
                }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();

            // Hiển thị thông báo thành công
            if (data) {
                MySwal.fire({
                    title: 'Thành Công!',
                    text: 'Phòng khám đã được xóa thành công.',
                    icon: 'success',
                    confirmButtonText: 'OK',
                });
                showdataTable();

            }
            // Cập nhật danh sách phòng khám

        } catch (error) {
            console.error("Error occurred while deleting the clinic: ", error);

            // Hiển thị thông báo thất bại
            MySwal.fire({
                title: 'Thất Bại!',
                text: 'Có lỗi xảy ra khi xóa phòng khám.',
                icon: 'error',
                confirmButtonText: 'OK',
            });
        }
    };

    return (
        <>
            <PageTitle
                breadCrumbItems={[
                    { label: "Trang chủ", path: "/" },
                    { label: "Quản lý bệnh viện", path: "/hospital" },
                    { label: "Tạo phòng khám", path: "/hospital/create-clinic", active: true },
                ]}
                title={"Tạo Phòng Khám"}
            />
            <Row className="justify-content-center">
                <Col md={12} lg={12}>
                    <Card>
                        <Card.Body>
                            <h4 className="header-title mb-4">Tạo Phòng Khám Mới</h4>
                            <Form onSubmit={handleSubmit}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Mã Phòng Khám</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Nhập mã phòng khám"
                                        value={code}
                                        onChange={(e) => setCode(e.target.value)}
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>Tên Phòng Khám</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Nhập tên phòng khám"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>Địa Chỉ</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Nhập địa chỉ"
                                        value={address}
                                        onChange={(e) => setAddress(e.target.value)}
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>Số Điện Thoại</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Nhập số điện thoại"
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Chọn Loại Phòng</Form.Label>
                                    <Select
                                        options={[
                                            { value: 'phong-kham', label: 'Phòng Khám' },
                                            { value: 'tiep-nhan-benh-nhan', label: 'Tiếp Nhận Bệnh Nhân' }
                                        ]}
                                        value={roomType ? { value: roomType, label: roomType === 'phong-kham' ? 'Phòng Khám' : 'Tiếp Nhận Bệnh Nhân' } : null}
                                        onChange={(selectedOption: any) => setRoomType(selectedOption?.value || '')}
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>Chọn Khoa Phòng Khám</Form.Label>
                                    <Select
                                        options={departmentOptions}
                                        value={roomType ? departmentOptions.find(option => option.value === departmentType) : null}
                                        onChange={(selectedOption: any) => setdepartmentType(selectedOption?.value || '')}
                                        placeholder="Chọn Khoa Phòng Khám..."
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3">
    <Form.Label>Bác Sĩ</Form.Label>
    <Select
        isMulti
        options={doctors.map((doctor) => ({
            value: doctor.tokenuser,
            label: doctor.fullname
        }))}
        value={selectedDoctors.map((tokenuser) => {
            const doctor = doctors.find((doc) => doc.tokenuser === tokenuser);
            return doctor ? { value: doctor.tokenuser, label: doctor.fullname } : null;
        }).filter(Boolean)}
        onChange={handleDoctorChange}
    />
</Form.Group>

<Form.Group className="mb-3">
            <Form.Label>Chọn Loại Dịch Vụ</Form.Label>
            <Select
    options={dataserver.map((item) => ({
        value: item._id,  // Sử dụng _id làm giá trị
        label: `${item.serviceName}`,  // Hiển thị tên dịch vụ
    }))}
    onChange={handleServiceChange}  // Gọi hàm khi người dùng chọn
    placeholder="Chọn dịch vụ..."
    value={
        selectedService
            ? dataserver.map((item) => ({
                value: item._id,
                label: `${item.serviceName}`,
            })).find((option) => option.value === selectedService)
            : null
    }
/>


        </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>Dịch Vụ (Ngăn cách bởi dấu phẩy)</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Nhập dịch vụ"
                                        value={services}
                                        onChange={(e) => setServices(e.target.value)}
                                    />
                                </Form.Group>


                                <Button variant="primary" type="submit">
                                    Tạo Phòng Khám
                                </Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            {/* Bảng quản lý phòng khám */}
            {/* Bảng quản lý phòng khám */}
            <Row className="justify-content-center">
                <Col md={12} lg={12}>
                    <Card>
                        <Card.Body>
                            <Row className="mt-4">
                                <Col>
                                    <h4 className="header-title mb-4">Quản Lý Phòng Khám</h4>
                                    <div className="table-responsive">
                                        <Table striped bordered hover>
                                            <thead>
                                                <tr>
                                                    <th>#</th>
                                                    <th>Mã Phòng Khám</th>
                                                    <th>Tên Phòng Khám</th>
                                                    <th>Địa Chỉ</th>
                                                    <th>Số Điện Thoại</th>
                                                    <th>Dịch Vụ</th>
                                                    <th>Bác Sĩ</th>

                                                    <th>Hành Động</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {clinics.length > 0 ? (
                                                    clinics.map((clinic, index) => (
                                                        <tr key={index}>
                                                            <td>{index + 1}</td>
                                                            <td>{clinic.code}</td>
                                                            <td>{clinic.name}</td>
                                                            <td>{clinic.address}</td>
                                                            <td>{clinic.phone}</td>

                                                            <td>{clinic.services.join(", ")}</td>
                                                            <td>
                                                                {/* Hiển thị tất cả bác sĩ trong phòng khám */}
                                                                <Button
                                                                    variant="info"
                                                                    size="sm"
                                                                    onClick={() => handleShow(clinic.doctors)}  // Mở modal hiển thị bác sĩ của phòng khám
                                                                    className="ml-2"
                                                                >
                                                                    Xem Chi Tiết Bác Sĩ
                                                                </Button>
                                                            </td>
                                                            <td>
                                                                <Button
                                                                    variant="danger"
                                                                    size="sm"
                                                                    onClick={() => handleDeleteClinic(clinic._id)}
                                                                >
                                                                    Xóa
                                                                </Button>
                                                            </td>
                                                        </tr>
                                                    ))
                                                ) : (
                                                    <tr>
                                                        <td colSpan={9} className="text-center">
                                                            Chưa có phòng khám nào
                                                        </td>
                                                    </tr>
                                                )}
                                            </tbody>
                                        </Table>
                                    </div>
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            {/* Modal Hiển Thị Chi Tiết Tất Cả Bác Sĩ */}
            {selectedDoctors.length > 0 && (
                <Modal show={showModal} onHide={handleClose} size={'lg'}
                >
                    <Modal.Header closeButton>
                        <Modal.Title>Chi Tiết Các Bác Sĩ</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>Mã Bác Sĩ</th>
                                    <th>Tên Bác Sĩ</th>
                                    <th>Chuyên Khoa</th>
                                    <th>Truy Cập Thông Tin</th>
                                </tr>
                            </thead>
                            <tbody>
                                {selectedDoctors.map((doctor) => (
                                    <tr key={doctor._id}>
                                        <td>{doctor._id}</td>
                                        <td>{doctor.fullname}</td>
                                        <td>{doctor.specialized && doctor.specialized.length > 0 ? doctor.specialized[0].label : 'Chưa có chuyên khoa'}</td>
                                        <td>
                                            <a
                                                href={`/doctor-detail/${doctor._id}`}  // Dẫn đến trang chi tiết bác sĩ, bạn có thể thay URL này theo yêu cầu
                                                className="btn btn-info btn-sm"
                                            >
                                                Xem Chi Tiết
                                            </a>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Đóng
                        </Button>
                    </Modal.Footer>
                </Modal>
            )}
        </>
    );
}
