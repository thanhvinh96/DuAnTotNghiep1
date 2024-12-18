import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { Form, Row, Col, Button, Card } from "react-bootstrap";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { PostMedicalMetrics } from "../../../controller/MedicalController";

const MySwal = withReactContent(Swal);

interface MetricsState {
    heartRate: string;
    bloodPressure: string;
    bloodType: string;
    height: string;
}

interface MetricsProps {
    initialValue?: any; // Giá trị độc lập không ảnh hưởng đến form
}

const MetricsForm: React.FC<MetricsProps> = ({ initialValue }) => {
    const [metrics, setMetrics] = useState<MetricsState>({
        heartRate: "",
        bloodPressure: "",
        bloodType: "",
        height: "",
    });

    // Xử lý thay đổi giá trị trong form
    const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
        const { name, value } = e.target;
        setMetrics({ ...metrics, [name]: value });
    };

    // Gửi dữ liệu
    const submitMetrics = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        // Hiển thị thông báo đang xử lý
        MySwal.fire({
            title: 'Đang xử lý...',
            text: 'Vui lòng đợi...',
            icon: 'info',
            showConfirmButton: false,
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading();
            }
        });

        const data = {
            cccd: initialValue,
            newMetrics: metrics,
        };

        try {
            const res = await PostMedicalMetrics(data);

            // Đóng thông báo đang xử lý
            Swal.close();

            if (res) {
                // Hiển thị thông báo thành công
                MySwal.fire({
                    title: 'Thành công!',
                    text: 'Thêm thông tin sức khỏe cơ bản thành công.',
                    icon: 'success',
                    confirmButtonText: 'OK'
                });
            } else {
                // Hiển thị thông báo thất bại
                MySwal.fire({
                    title: 'Thất bại!',
                    text: 'Thêm thông tin sức khỏe cơ bản thất bại.',
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
            }
        } catch (error) {
            Swal.close();
            MySwal.fire({
                title: 'Lỗi!',
                text: 'Đã xảy ra lỗi trong quá trình gửi dữ liệu.',
                icon: 'error',
                confirmButtonText: 'OK'
            });
        }
    };

    // Lấy dữ liệu từ localStorage khi component được mount
    useEffect(() => {
        const savedData = localStorage.getItem("metricsData");
        if (savedData) {
            setMetrics(JSON.parse(savedData));
        }
    }, []);

    return (
        <Card>
            <Card.Body>
                <h4 className="header-title mb-4">Biểu Mẫu Thông Tin Sức Khỏe</h4>

                {/* Form */}
                <Form onSubmit={submitMetrics}>
                    <Row className="mb-3">
                        <Col md={6}>
                            <Form.Group controlId="heartRate">
                                <Form.Label>Nhịp tim</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="heartRate"
                                    placeholder="Nhập nhịp tim"
                                    value={metrics.heartRate}
                                    onChange={handleInputChange}
                                />
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group controlId="bloodPressure">
                                <Form.Label>Huyết áp</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="bloodPressure"
                                    placeholder="Nhập huyết áp"
                                    value={metrics.bloodPressure}
                                    onChange={handleInputChange}
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row className="mb-3">
                        <Col md={6}>
                            <Form.Group controlId="bloodType">
                                <Form.Label>Nhóm máu</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="bloodType"
                                    placeholder="Nhập nhóm máu"
                                    value={metrics.bloodType}
                                    onChange={handleInputChange}
                                />
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group controlId="height">
                                <Form.Label>Chiều cao (cm)</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="height"
                                    placeholder="Nhập chiều cao"
                                    value={metrics.height}
                                    onChange={handleInputChange}
                                />
                            </Form.Group>
                        </Col>
                    </Row>

                    <div className="mt-4 text-end">
                        <Button variant="primary" type="submit">
                            Cập nhật thông tin
                        </Button>
                    </div>
                </Form>
            </Card.Body>
        </Card>
    );
};

export default MetricsForm;