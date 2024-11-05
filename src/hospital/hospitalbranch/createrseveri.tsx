import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Card, Form, Button, Row, Col, Table } from "react-bootstrap";
import PageTitle from "../../components/PageTitle";

interface Service {
    serviceCode: string;
    serviceName: string;
    serviceType: string;
    model: string | null;
}

export default function CreateService() {
    const [serviceCode, setServiceCode] = useState<string>("");
    const [serviceName, setServiceName] = useState<string>("");
    const [serviceType, setServiceType] = useState<string>("");
    const [services, setServices] = useState<Service[]>([]);
    const navigate = useNavigate();
    const location = useLocation();

    const queryParams = new URLSearchParams(location.search);
    const model = queryParams.get("model");

    const showDataSeveri = async () => {
        try {
            const res = await fetch('http://127.0.0.1:8000/api/services', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    branchId: model
                })
            });

            const data = await res.json();

            if (res.ok) {
                // Cập nhật dữ liệu vào state `services`
                setServices(data.data);  // `data.data` chứa mảng dịch vụ từ server
            } else {
                console.error("Failed to fetch services:", data);
                alert("Có lỗi xảy ra khi lấy dữ liệu dịch vụ.");
            }
        } catch (error) {
            console.error("Error fetching services:", error);
            alert("Có lỗi xảy ra khi kết nối với server.");
        }
    };

    useEffect(() => {
        showDataSeveri();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Service Data:");

        if (!serviceCode || !serviceName || !serviceType || !model) {
            alert("Vui lòng nhập đầy đủ thông tin.");
            return;
        }

        const newService: Service = {
            serviceCode,
            serviceName,
            serviceType,
            model,
        };
        console.log("Service Data:", newService);

        try {
            const res = await fetch('http://127.0.0.1:8000/api/services/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(newService)
            });

            if (!res.ok) {
                throw new Error("Failed to create service");
            }

            const data = await res.json();
            console.log(data);

            // Cập nhật danh sách dịch vụ
            setServices([...services, newService]);

            // Reset form
            setServiceCode("");
            setServiceName("");
            setServiceType("");
            alert("Dịch vụ đã được tạo thành công!");

        } catch (error) {
            console.error("Error creating service:", error);
            alert("Có lỗi xảy ra khi tạo dịch vụ.");
        }
    };

    const handleDelete = (index: number) => {
        const updatedServices = services.filter((_, i) => i !== index);
        setServices(updatedServices);
    };

    return (
        <>
            <PageTitle
                breadCrumbItems={[
                    { label: "Trang chủ", path: "/" },
                    { label: "Quản lý bệnh viện", path: "/hospital" },
                    { label: "Chi nhánh bệnh viện", path: "/hospital/branch" },
                    { label: "Tạo dịch vụ", path: "/hospital/create-service", active: true },
                ]}
                title={"Tạo Dịch Vụ"}
            />
            <Row className="justify-content-center">
                <Col md={12} lg={12}>
                    <Card>
                        <Card.Body>
                            <h4 className="header-title mb-4">Tạo Dịch Vụ Mới</h4>
                            <Form onSubmit={handleSubmit}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Mã Dịch Vụ</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Nhập mã dịch vụ"
                                        value={serviceCode}
                                        onChange={(e) => setServiceCode(e.target.value)}
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>Tên Dịch Vụ</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Nhập tên dịch vụ"
                                        value={serviceName}
                                        onChange={(e) => setServiceName(e.target.value)}
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>Loại Dịch Vụ</Form.Label>
                                    <Form.Select
                                        value={serviceType}
                                        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setServiceType(e.target.value)}
                                    >
                                        <option value="">Chọn loại dịch vụ</option>
                                        <option value="chuyen_muc">Tạo số lượng chuyên mục</option>
                                        <option value="up_file">Thêm file ảnh</option>
                                        <option value="up_ketluan">Kết luận bệnh nhân</option>
                                    </Form.Select>
                                </Form.Group>

                                <Button variant="primary" type="submit">
                                    Up Dịch Vụ
                                </Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <Row className="justify-content-center">
                <Col md={12} lg={12}>
                    <Card>
                        <Card.Body>
                            <Row className="mt-4">
                                <Col>
                                    <h4 className="header-title mb-4">Quản Lý Dịch Vụ</h4>
                                    <div className="table-responsive">
                                        <Table striped bordered hover>
                                            <thead>
                                                <tr>
                                                    <th>#</th>
                                                    <th>Mã Dịch Vụ</th>
                                                    <th>Tên Dịch Vụ</th>
                                                    <th>Loại Dịch Vụ</th>
                                                    <th>Hành Động</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {services.length > 0 ? (
                                                    services.map((service, index) => (
                                                        <tr key={index}>
                                                            <td>{index + 1}</td>
                                                            <td>{service.serviceCode}</td>
                                                            <td>{service.serviceName}</td>
                                                            <td>{service.serviceType}</td>
                                                            <td>
                                                                <Button
                                                                    variant="danger"
                                                                    size="sm"
                                                                    onClick={() => handleDelete(index)}
                                                                >
                                                                    Xóa
                                                                </Button>
                                                            </td>
                                                        </tr>
                                                    ))
                                                ) : (
                                                    <tr>
                                                        <td colSpan={5} className="text-center">
                                                            Chưa có dịch vụ nào
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
        </>
    );
}
