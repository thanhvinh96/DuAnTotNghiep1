import React, { useState, useEffect } from 'react';
import { Table, Form, Button, Container, Row, Col, Alert } from 'react-bootstrap';
import PageTitle from "../../../components/PageTitle";
import { CheckInfoMedical, RequestMedical } from "../../../controller/MedicalController";
import { ShowBranchRequestMedical } from "../../../controller/BranchController";
import jwt_decode from 'jwt-decode';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

interface Request {
    cccd: string;
    email: string;     // Thêm email vào interface Request
    content: string;
    timerequest: string; // Thời gian
    status: string;    // Trạng thái
}

interface CccdInfo {
    cccd: string;      // Tên người dùng
    email: string;     // Email
}

const ManagementRequest: React.FC = () => {
    const [datagetshow, setdatagetshow] = useState<{ tokeorg: string; value: string; tokenbranch: string }>({
        tokeorg: '',
        value: '',
        tokenbranch: '',
    });
    const [datatable, setdatatanle] = useState<Request[]>([]); // Đảm bảo kiểu dữ liệu là Request[]
    
    const showdatarequest = async () => {
        const res: any = await ShowBranchRequestMedical(datagetshow);
        console.log(res);
        if (Array.isArray(res)) {
            setdatatanle(res);
        } else {
            console.error('Expected an array but got:', res);
            setdatatanle([]); // Reset to empty array if response is not valid
        }
    };

    const [formData, setFormData] = useState<{ cccd: string; content: string; email: string; branch: string; tokeorg: string; value: string }>({
        cccd: '',
        content: '',
        email: '',
        tokeorg: '',
        value: '',
        branch: ''
    });

    const showdata = async () => {
        const token = localStorage.getItem('tokenadmin');
        if (token) {
            const decoded: any = jwt_decode(token);
            setFormData(prev => ({
                ...prev,
                branch: decoded['branch'],
                value: decoded['nameorg'],
                tokeorg: decoded['tokeorg'],
            }));
            setdatagetshow(prev => ({
                ...prev,
                tokeorg: decoded['tokeorg'],
                value: decoded['nameorg'],
                tokenbranch: decoded['branch'],
            }));
        }
    }

    useEffect(() => {
        showdata(); 
    }, []);
    
    useEffect(() => {
        showdatarequest();
    }, [datagetshow]); // Chạy lại khi datagetshow thay đổi
    
    const [requests, setRequests] = useState<Request[]>([]);
    const [cccdExists, setCccdExists] = useState<boolean | null>(null);
    const [cccdInfo, setCccdInfo] = useState<CccdInfo | null>(null);
    const [filter, setFilter] = useState<string>('');
    const [statusFilter, setStatusFilter] = useState<string>('');
    const [dateFilter, setDateFilter] = useState<string>('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleCheckCccd = async () => {
        try {
            const res = await CheckInfoMedical(formData);
            console.log(res);
            if (res.success === true) {
                setCccdInfo({
                    cccd: res.record.cccd,
                    email: res.record.email,
                });
                setCccdExists(true);
            } else {
                setCccdExists(false);
            }
        } catch (error) {
            console.error("Error checking CCCD:", error);
            setCccdExists(false);
        }
    };

    const MySwal = withReactContent(Swal);
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(formData);

        try {
            const loadingSwal = MySwal.fire({
                title: 'Please wait...',
                text: 'Request Medical, please wait!',
                icon: 'info',
                allowOutsideClick: false,
                showConfirmButton: false,
                didOpen: () => {
                    Swal.showLoading();
                },
            });

            const res = await RequestMedical(formData);
            console.log(res);

            if (res.status === true) {
                Swal.close();
                Swal.fire({
                    title: 'Request Medical Success!',
                    text: 'Your Request Medical was successful.',
                    icon: 'success',
                    confirmButtonText: 'OK',
                });
                showdatarequest();

                setFormData({
                    cccd: '',
                    content: '',
                    email: '',
                    tokeorg: '',
                    value: '',
                    branch: ''
                });
            } else {
                Swal.close();
                alert('Có lỗi xảy ra khi gửi yêu cầu: ' + res.message);
            }
        } catch (error) {
            console.error("Error submitting request:", error);
            Swal.close();
            alert('Đã xảy ra lỗi: ' ); // Cung cấp thông tin lỗi chi tiết
        }
    };

    const filteredRequests = Array.isArray(datatable) ? datatable.filter(req => {
        const matchesContent = req.content.toLowerCase().includes(filter.toLowerCase());
        const matchesCccd = req.cccd.toLowerCase().includes(filter.toLowerCase());
        const matchesStatus = req.status.toLowerCase().includes(statusFilter.toLowerCase());
        const matchesDate = dateFilter ? req.timerequest.includes(dateFilter) : true;
    
        return (matchesContent || matchesCccd) && matchesStatus && matchesDate;
    }) : [];
    return (
        <>
            <PageTitle
                breadCrumbItems={[
                    { label: "Tables", path: "/features/tables/advanced" },
                    {
                        label: "Manage requests to access medical records",
                        path: "/features/tables/advanced",
                        active: true,
                    },
                ]}
                title={"Information Hospital"}
            />
            <div className="col-12">
                <div className="card custom-card shadow-none mb-4">
                    <div className="card-body">
                        <div className="row">
                            <Form onSubmit={handleSubmit}>
                                <Row>
                                    <Col md={3}>
                                        <Form.Group controlId="cccd">
                                            <Form.Label>CCCD</Form.Label>
                                            <Form.Control
                                                type="text"
                                                name="cccd"
                                                value={formData.cccd}
                                                onChange={handleChange}
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col md={3}>
                                        <Form.Group controlId="email">
                                            <Form.Label>Email</Form.Label>
                                            <Form.Control
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col md={3}>
                                        <Form.Group controlId="content">
                                            <Form.Label>Nội dung yêu cầu</Form.Label>
                                            <Form.Control
                                                type="text"
                                                name="content"
                                                value={formData.content}
                                                onChange={handleChange}
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col md={3} className="d-flex align-items-end">
                                        <Button variant="secondary" onClick={handleCheckCccd}>
                                            Kiểm tra CCCD
                                        </Button>
                                    </Col>
                                </Row>

                                {cccdExists === false && <Alert variant="danger" style={{ marginTop: '20px' }}>CCCD không tồn tại!</Alert>}
                                {cccdExists === true && (
                                    <Alert variant="success" style={{ marginTop: '20px' }}>
                                        CCCD hợp lệ! <br />
                                        Cccd: {cccdInfo?.cccd} <br />
                                        Email: {cccdInfo?.email}
                                    </Alert>
                                )}

                                <Button
                                    variant="primary"
                                    type="submit"
                                    // disabled={!cccdExists}
                                    style={{ width: '200px', marginTop: '20px', marginLeft: '0' }}
                                >
                                    Gửi yêu cầu
                                </Button>
                            </Form>

                            <Row className="my-4" style={{ marginTop: '20px' }}>
                                <Col md={4}>
                                    <Form.Group controlId="filter">
                                        <Form.Label>Tìm kiếm yêu cầu (Nội dung/CCCD)</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Nhập nội dung hoặc CCCD để tìm kiếm..."
                                            value={filter}
                                            onChange={(e) => setFilter(e.target.value)}
                                        />
                                    </Form.Group>
                                </Col>
                                <Col md={4}>
                                    <Form.Group controlId="statusFilter">
                                        <Form.Label>Trạng thái</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Nhập trạng thái để tìm kiếm..."
                                            value={statusFilter}
                                            onChange={(e) => setStatusFilter(e.target.value)}
                                        />
                                    </Form.Group>
                                </Col>
                                <Col md={4}>
                                    <Form.Group controlId="dateFilter">
                                        <Form.Label>Thời gian (dd/mm/yyyy)</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Nhập ngày để tìm kiếm..."
                                            value={dateFilter}
                                            onChange={(e) => setDateFilter(e.target.value)}
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>

                            <h3 className="my-4">Danh sách yêu cầu</h3>
                            <Table striped bordered hover>
                                <thead>
                                    <tr>
                                        <th>CCCD</th>
                                        <th>Email</th>
                                        <th>Nội dung yêu cầu</th>
                                        <th>Thời gian</th>
                                        <th>Trạng thái</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredRequests.map((req, index) => (
                                        <tr key={index}>
                                            <td>{req.cccd}</td>
                                            <td>{req.email}</td>
                                            <td>{req.content}</td>
                                            <td>{req.timerequest}</td>
                                            <td>{req.status}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ManagementRequest;

