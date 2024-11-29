import React, { useState, useEffect } from "react";
import { Row, Col, Card, Button, Form, Modal } from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";
import PageTitle from "../../components/PageTitle";
import jwtDecode from 'jwt-decode';
import { GetInfoFullPersonnel, CreatePersonnels } from '../../controller/PersonnelController'
import { GetInfoHospital } from '../../controller/HospitalController'
import { GetFullBranch } from '../../controller/BranchController'
import FileUploader from "../../components/FileUploader";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import Select from 'react-select';
import UserManagent from '../hospitalbranch/userManagent';
interface Branch {
    tokenbranch: string;
    branchname: string;
}

export default function CreatePersonnel() {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);

    const [datatypeUser, setdatatypeUser] = useState([]);
    const model: any = queryParams.get("model");
    console.log(model);
    const showDataSeveri = async () => {
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
                // Cập nhật dữ liệu vào state `services`
                console.log('fgidfigidfg')

                console.log(data)
                setdatatypeUser(data.data);  // `data.data` chứa mảng dịch vụ từ server
            } else {
                console.error("Failed to fetch services:", data);
                alert("Có lỗi xảy ra khi lấy dữ liệu dịch vụ.");
            }
        } catch (error) {
            console.error("Error fetching services:", error);
            alert("Có lỗi xảy ra khi kết nối với server.");
        }
    };


    const MySwal = withReactContent(Swal);

    const [showModal, setShowModal] = useState(false);
    const [modalContent, setModalContent] = useState({ title: '', body: '' });
    const handleClose = () => setShowModal(false);
    const [branches, setBranches] = useState<Branch[]>([]);
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        fullname: "",
        address: "",
        phone: "",
        typeusers: "admin",
        branch: "",
        password: "",
        tokeorg: "",
        License: "",
        value: "",
        specialized: [] as { value: string; label: string }[],  // Cập nhật specialized để lưu cả _id và name    avatar: "",
        cccd: "",
        avatar: "",

        imgidentification: "",
    });




    useEffect(() => {
        showDataSeveri();
        const fetchBranches = async () => {
            try {
                const token = localStorage.getItem('tokenadmin');
                if (token) {
                    const decodedToken: any = jwtDecode(token);
                    console.log(decodedToken['tokeorg']);

                    const tokeorg = decodedToken['tokeorg'];
                    const dataorg = {
                        "tokenorg": tokeorg
                    };
                    const response: any = await GetInfoHospital(dataorg);
                    console.log(response);
                    if (response.result != null) {
                        const _data = await response.result;
                        console.log(_data.tokeorg);
                        setFormData({
                            ...formData,
                            tokeorg: _data.tokeorg,
                            value: _data.nameorg,
                            branch: model,

                        });

                        const datagetFullBranch = {
                            tokeorg: _data.tokeorg,
                            value: _data.nameorg,
                        }
                        const _response = await GetFullBranch(datagetFullBranch);
                        if (_response.success === true) {
                            const DataBranch = _response.data;
                            setBranches(_response.data);
                            console.log(DataBranch);

                        }
                    }

                }
            } catch (error) {
                console.error("Error fetching branches:", error);
            }
        };

        fetchBranches();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setFormData({
            ...formData,
            branch: e.target.value,
        });
    };
    // useEffect(()=>{
    //     console.log("gias tri data"+datatypeUser)
    // },[])



    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            // Hiển thị modal thông báo đang xử lý
            setModalContent({ title: 'Đang xử lý...', body: 'Đang tạo chi nhánh, vui lòng đợi...' });
            setShowModal(true);
            console.log(formData);

            // Gửi yêu cầu POST đến server
            const response: any = await CreatePersonnels(formData);

            // Kiểm tra phản hồi từ server
            console.log(response.success);
            if (response) {
                // Không cần chuyển đổi response thành JSON lần nữa
                console.log("Người dùng đã được tạo thành công:", response.result);
                setModalContent({ title: 'Thành công', body: 'Người dùng đã được tạo thành công: ' + response.result.tokenuser });

                // Hiển thị modal SweetAlert với 2 lựa chọn
                MySwal.fire({
                    title: 'Thành công',
                    text: 'Người dùng đã được tạo thành công. Bạn có muốn tạo thêm người dùng mới hay quay về trang quản lý?',
                    icon: 'success',
                    showCancelButton: true,
                    confirmButtonText: 'Tạo thêm',
                    cancelButtonText: 'Quay về quản lý',
                }).then((result: any) => {
                    if (result.isConfirmed) {
                        // Tạo tiếp nhân viên: reset form và tiếp tục
                        setFormData({
                            fullname: "",
                            address: "",
                            phone: "",
                            typeusers: "admin",
                            branch: "",
                            password: "",
                            tokeorg: "",
                            License: "",
                            value: "",
                            specialized: [] as { value: string; label: string }[],  // Cập nhật specialized để lưu cả _id và name
                            avatar: "",
                            cccd: "",
                            imgidentification: "",
                        });
                    } else {
                        // Quay về trang quản lý
                        window.location.href = '/management'; // Đổi link này nếu cần
                    }
                });
            } else {
                setModalContent({ title: 'Lỗi', body: 'Không thể tạo người dùng. Vui lòng thử lại.' });
                MySwal.fire('Lỗi', 'Không thể tạo người dùng. Vui lòng thử lại.', 'error');
            }
        } catch (error) {
            // Xử lý lỗi kết nối hoặc lỗi khác
            console.error("Lỗi bất ngờ:", error);
            setModalContent({ title: 'Lỗi', body: 'Đã xảy ra lỗi bất ngờ. Vui lòng thử lại.' });
            MySwal.fire('Lỗi', 'Đã xảy ra lỗi bất ngờ. Vui lòng thử lại.', 'error');
        }
    };

    const uploadToCloudinaryAvatar = async () => {
        try {
            const fileInput = document.getElementById('avatar') as HTMLInputElement;
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
                    setFormData((prevFormData) => ({
                        ...prevFormData,
                        avatar: result['url'],
                    }));
                    alert('Tải lên thành công!');
                    console.log('Uploaded Avatar URL:', result['url']);
                }
            }
        } catch (error) {
            console.error('Lỗi khi tải ảnh lên:', error);
            alert("Có lỗi xảy ra khi tải ảnh lên. Vui lòng thử lại.");
        }
    };

    const uploadToCloudinaryLicense = async () => {
        try {
            const fileInput = document.getElementById('License') as HTMLInputElement;
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
                    setFormData((prevFormData) => ({
                        ...prevFormData,
                        License: result['url'],
                    }));
                    alert('Tải lên thành công!');
                    console.log('Uploaded License URL:', result['url']);
                }
            }
        } catch (error) {
            console.error('Lỗi khi tải ảnh lên:', error);
            alert("Có lỗi xảy ra khi tải ảnh lên. Vui lòng thử lại.");
        }
    };

    const uploadToCloudinary = async () => {
        try {
            const fileInput = document.getElementById('productImages') as HTMLInputElement;
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
                    setFormData((prevFormData) => ({
                        ...prevFormData,
                        imgidentification: result['url'],
                    }));
                    alert('Upload thành công!');
                    console.log('Uploaded Image URL:', result['url']);
                }
            }
        } catch (error) {
            console.error('Error uploading image:', error);
            alert("Có lỗi xảy ra khi tải ảnh lên. Vui lòng thử lại.");
        }
    };


    const handleBack = () => {
        navigate(-1); // Go back to the previous page
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            const reader = new FileReader();

            reader.onloadend = () => {
                setFormData({
                    ...formData,
                    imgidentification: reader.result as string, // Convert to base64
                });
            };

            reader.readAsDataURL(file); // Convert to base64
        }
    };
    // const handleChangez = (e: React.ChangeEvent<HTMLSelectElement>) => {
    //     setFormData({
    //         ...formData,
    //         specialized: e.target.value,
    //     });
    // };
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
                setFormData((prevFormData) => ({
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

    return (
        <>
            <PageTitle
                breadCrumbItems={[
                    { label: "Bảng", path: "/features/tables/advanced" },
                    {
                        label: "Tạo Nhân Viên",
                        path: "/hospital/Create-personnel",
                        active: true,
                    },
                ]}
                title={"Tạo Nhân Viên"}
            />

<Row>
        <Card>
            <Card.Body>
              
                <Form onSubmit={handleSubmit}>
                    {/* Group 1: Thông tin cơ bản */}
                    <h5 className="text-primary mb-3">Thông tin cơ bản</h5>
                    <Row>
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>Họ Tên</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Nhập họ tên"
                                    name="fullname"
                                    value={formData.fullname}
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>Địa Chỉ</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Nhập địa chỉ"
                                    name="address"
                                    value={formData.address}
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>Số Điện Thoại</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Nhập số điện thoại"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>Số CCCD</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Nhập số CCCD"
                                    name="cccd"
                                    value={formData.cccd}
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>
                        </Col>
                    </Row>

                    {/* Group 2: Phân loại người dùng */}
                    <h5 className="text-primary mb-3">Phân loại</h5>
                    <Row>
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>Loại Người Dùng</Form.Label>
                                <Form.Select
                                    name="typeusers"
                                    value={formData.typeusers}
                                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                                        setFormData({ ...formData, typeusers: e.target.value })
                                    }
                                    required
                                >
                                    <option value="admin">Quản Trị Viên</option>
                                    <option value="doctor">Bác Sĩ</option>
                                    <option value="nurse">Y Tá</option>
                                    <option value="staff">Nhân Viên</option>
                                </Form.Select>
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>Chuyên Khoa</Form.Label>
                                <Select
                                    isMulti
                                    options={datatypeUser.map((user: any) => ({
                                        value: user._id,
                                        label: user.departmentName,
                                    }))}
                                    value={formData.specialized}
                                    onChange={(selectedOptions: { value: string; label: string }[]) => {
                                        setFormData({ ...formData, specialized: selectedOptions });
                                    }}
                                />
                            </Form.Group>
                        </Col>
                    </Row>

                    {/* Group 3: Tài liệu & hình ảnh */}
                    <h5 className="text-primary mb-3">Tài liệu & Hình ảnh</h5>
                    <Row>
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>Ảnh đại diện</Form.Label>
                                <FileUploader
                                    onFileUpload={(files) => handleFileUpload(files[0], "avatar")}
                                />
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>Thẻ CCCD</Form.Label>
                                <FileUploader
                                    onFileUpload={(files) => handleFileUpload(files[0], "imgidentification")}
                                />
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>Giấy phép hành nghề</Form.Label>
                                <FileUploader
                                    onFileUpload={(files) => handleFileUpload(files[0], "License")}
                                />
                            </Form.Group>
                        </Col>
                    </Row>

                    {/* Group 4: Thông tin đăng nhập */}
                    <h5 className="text-primary mb-3">Thông tin đăng nhập</h5>
                    <Row>
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>Mật Khẩu</Form.Label>
                                <Form.Control
                                    type="password"
                                    placeholder="Nhập mật khẩu"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>
                        </Col>
                    </Row>

                    {/* Buttons */}
                    <div className="d-flex justify-content-between">
                        {/* <Button variant="secondary" onClick={handleBack}>
                            Quay Lại
                        </Button> */}
                        <Button variant="primary" type="submit">
                            Tạo Thành Viên
                        </Button>
                    </div>
                </Form>
            </Card.Body>
        </Card>
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

{/* <UserManagent/> */}
        </>

    );
}
