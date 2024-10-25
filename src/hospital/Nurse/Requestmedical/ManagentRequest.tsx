import React, { useState } from 'react';
import { Table, Form, Button, Container, Row, Col, Alert } from 'react-bootstrap';
import PageTitle from "../../../components/PageTitle";
import {CheckInfoMedical} from "../../../controller/MedicalController";
interface Request {
    cccd: string;
    email: string;     // Thêm email vào interface Request
    content: string;
    timestamp: string; // Thời gian
    status: string;    // Trạng thái
}

interface CccdInfo {
    cccd: string;      // Tên người dùng
    email: string;       // Ngày sinh
}

const ManagementRequest: React.FC = () => {
    const [formData, setFormData] = useState<{ cccd: string; requestContent: string; email: string }>({
        cccd: '',
        requestContent: '',
        email: ''
    });

    const [requests, setRequests] = useState<Request[]>([]);
    const [cccdExists, setCccdExists] = useState<boolean | null>(null); // null = chưa kiểm tra, true = tồn tại, false = không tồn tại
    const [cccdInfo, setCccdInfo] = useState<CccdInfo | null>(null); // Thông tin CCCD
    const [filter, setFilter] = useState<string>(''); // Bộ lọc nội dung
    const [statusFilter, setStatusFilter] = useState<string>(''); // Bộ lọc trạng thái
    const [dateFilter, setDateFilter] = useState<string>(''); // Bộ lọc thời gian

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleCheckCccd = async () => {
        try {
            // Ví dụ kiểm tra CCCD và lấy thông tin
            console.log(formData);
    
            // Call the function to check CCCD info
            const res = await CheckInfoMedical(formData);
            console.log(res);
            if (res.success===true) {
                // Assuming res contains medical data with name and dob
                setCccdInfo({
                    cccd: res.record.cccd,  // Update with the correct response structure
                    email: res.record.email,    // Update with the correct response structure
                });
                setCccdExists(true); // Set CCCD as found
            } else {
                setCccdExists(false); // Set CCCD as not found
            }
        } catch (error) {
            console.error("Error checking CCCD:", error);
            setCccdExists(false); // Set CCCD as not found if an error occurs
        }
    };
    
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (cccdExists) {
            const newRequest: Request = {
                cccd: formData.cccd,
                email: formData.email, // Lưu email vào yêu cầu
                content: formData.requestContent,
                timestamp: new Date().toLocaleString(), // Lưu thời gian
                status: 'Đang xử lý' // Trạng thái ban đầu
            };
            setRequests([...requests, newRequest]);
            setFormData({ cccd: '', requestContent: '', email: '' });
            setCccdExists(null);
            setCccdInfo(null);
        }
    };

    // Bộ lọc yêu cầu dựa trên nội dung, trạng thái, thời gian, và CCCD
    const filteredRequests = requests.filter(req => {
        const matchesContent = req.content.toLowerCase().includes(filter.toLowerCase());
        const matchesCccd = req.cccd.toLowerCase().includes(filter.toLowerCase());
        const matchesStatus = req.status.toLowerCase().includes(statusFilter.toLowerCase());
        const matchesDate = dateFilter ? req.timestamp.includes(dateFilter) : true; // Kiểm tra thời gian

        return (matchesContent || matchesCccd) && matchesStatus && matchesDate;
    });

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
                                        <Form.Group controlId="requestContent">
                                            <Form.Label>Nội dung yêu cầu</Form.Label>
                                            <Form.Control
                                                type="text"
                                                name="requestContent"
                                                value={formData.requestContent}
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
                                    disabled={!cccdExists}
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

                            <h3 className="my-4">List of requests</h3>
                            <Table striped bordered hover>
                                <thead>
                                    <tr>
                                        <th>CCCD</th>
                                        <th>Email</th> {/* Hiển thị email */}
                                        <th>Nội dung yêu cầu</th>
                                        <th>Thời gian</th>
                                        <th>Trạng thái</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredRequests.map((req, index) => (
                                        <tr key={index}>
                                            <td>{req.cccd}</td>
                                            <td>{req.email}</td> {/* Hiển thị email */}
                                            <td>{req.content}</td>
                                            <td>{req.timestamp}</td>
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
