import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, Form, Row, Col, Button, Table } from 'react-bootstrap';

const Internalmedicine = () => {
    const [tableData, setTableData] = useState([]);

    // Hàm để xử lý khi thay đổi giá trị input
    const handleInputChange = (index, field, value) => {
        const newData = [...tableData];
        newData[index][field] = value;
        setTableData(newData);
    };
    return (
        <>
            <div className='container'>
                <Card>
                    <Card.Body>
                        <h2 className='text-center'>PHIẾU KHÁM NGOẠI KHOA</h2>
                        <div className="container border p-4">
                            <Form>
                                <Form.Group>
                                    <Row>
                                        <Col md={4}>
                                            <Form.Label>Full Name</Form.Label>
                                            <Form.Control type="text" />
                                        </Col>
                                        <Col md={4}>
                                            <Form.Label>Age</Form.Label>
                                            <Form.Control type="text" />
                                        </Col>
                                        <Col md={4}>
                                            <Form.Label>Gender</Form.Label>
                                            <Form.Control type="text" />
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md={6}>
                                            <Form.Label>Address</Form.Label>
                                            <Form.Control type="text" />
                                        </Col>
                                        <Col md={6}>
                                            <Form.Label>Insurance number</Form.Label>
                                            <Form.Control type="text" />
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md={6}>
                                            <Form.Label>Date</Form.Label>
                                            <Form.Control type="date" />
                                        </Col>
                                        <Col md={6}>
                                            <Form.Label>Doctor Name</Form.Label>
                                            <Form.Control type="text" />
                                        </Col>
                                    </Row>
                                    <hr />
                                    <Row>
                                        <Col md={3}>
                                            <Form.Label>Nhịp Mạch</Form.Label>
                                            <Form.Control type="text" />
                                        </Col>
                                        <Col md={3}>
                                            <Form.Label>Huyết Áp</Form.Label>
                                            <Form.Control type="text" />
                                        </Col>
                                        <Col md={3}>
                                            <Form.Label>Nhiệt Độ Cơ Thể</Form.Label>
                                            <Form.Control type="text" />
                                        </Col>
                                        <Col md={3}>
                                            <Form.Label>Nhịp Thở</Form.Label>
                                            <Form.Control type="text" />
                                        </Col>
                                    </Row>
                                    <hr />
                                    <h3 className='text-start'>Hệ Tim mạch</h3>
                                    <Row>
                                        <Col md={3}>
                                            <Form.Label>Tình Trạng Tim</Form.Label>
                                            <Form.Control type='text'></Form.Control>
                                        </Col>
                                        <Col md={3}>
                                            <Form.Label>Tình Trạng Mạch Máu</Form.Label>
                                            <Form.Control type='text'></Form.Control>
                                        </Col>
                                        <Col md={6}>
                                            <Form.Label>Điện Tâm Đồ</Form.Label>
                                            <Form.Control type='file'></Form.Control>
                                        </Col>
                                    </Row>
                                    <hr />
                                    <h3 className='text-start'>Hệ Hô Hấp</h3>
                                    <Row>
                                        <Col md={3}>
                                            <Form.Label>Tình Trạng Phổi</Form.Label>
                                            <Form.Control type='text'></Form.Control>
                                        </Col>
                                        <Col md={3}>
                                            <Form.Label>Tình Trạng Đường Hô Hấp</Form.Label>
                                            <Form.Control type='text'></Form.Control>
                                        </Col>
                                        <Col md={6}>
                                            <Form.Label>Đo Chức Năng Hô Hấp</Form.Label>
                                            <Form.Control type='file'></Form.Control>
                                        </Col>
                                    </Row>
                                    <hr />
                                    <h3 className='text-start'>Hệ Tiêu Hóa</h3>
                                    <Row>
                                        <Col md={3}>
                                            <Form.Label>Tình Trạng Dạ Dày</Form.Label>
                                            <Form.Control type='text'></Form.Control>
                                        </Col>
                                        <Col md={3}>
                                            <Form.Label>Tình Trạng Ruột</Form.Label>
                                            <Form.Control type='text'></Form.Control>
                                        </Col>
                                        <Col md={3}>
                                            <Form.Label>Tình Trạng Gan</Form.Label>
                                            <Form.Control type='text'></Form.Control>
                                        </Col>
                                        <Col md={3}>
                                            <Form.Label>Tình Trạng Túi Mật</Form.Label>
                                            <Form.Control type='text'></Form.Control>
                                        </Col>
                                    </Row>
                                    <hr />
                                    <h3 className='text-start'>Hệ Tiết Niệu</h3>
                                    <Row>
                                        <Col md={3}>
                                            <Form.Label>Tình Trạng Thận</Form.Label>
                                            <Form.Control type='text'></Form.Control>
                                        </Col>
                                        <Col md={3}>
                                            <Form.Label>Tình Trạng Bàng Quang</Form.Label>
                                            <Form.Control type='text'></Form.Control>
                                        </Col>
                                        <Col md={6}>
                                            <Form.Label>Hình Ảnh Siêu Âm</Form.Label>
                                            <Form.Control type='file'></Form.Control>
                                        </Col>
                                    </Row>
                                    <hr />
                                    <h3 className='text-start'>Hệ Thần Kinh</h3>
                                    <Row>
                                        <Col md={3}>
                                            <Form.Label>Đánh Giá Các Phản Xạ</Form.Label>
                                            <Form.Control type='text'></Form.Control>
                                        </Col>
                                        <Col md={3}>
                                            <Form.Label>Đánh Giá Các Cảm Giác</Form.Label>
                                            <Form.Control type='text'></Form.Control>
                                        </Col>
                                        <Col md={6}>
                                            <Form.Label>Tình Trạng Vận Động</Form.Label>
                                            <Form.Control type='text'></Form.Control>
                                        </Col>
                                    </Row>
                                    <hr />
                                    <h3 className='text-start'>Hệ Nội Tiết</h3>
                                    <Row>
                                        <Col md={3}>
                                            <Form.Label>Tình Trạng Tuyến Giáp</Form.Label>
                                            <Form.Control type='text'></Form.Control>
                                        </Col>
                                        <Col md={3}>
                                            <Form.Label>Tình Trạng Tuyến Tụy</Form.Label>
                                            <Form.Control type='text'></Form.Control>
                                        </Col>
                                        <Col md={6}>
                                            <Form.Label>Tình Trạng Tuyến Nội Tiết Khác</Form.Label>
                                            <Form.Control type='text'></Form.Control>
                                        </Col>
                                    </Row>
                                    <hr />
                                    <Row>
                                        <Col md={12}>
                                            <Form.Label>Diagnose</Form.Label>
                                            <Form.Control type='text' />
                                        </Col>
                                        <Col md={12}>
                                            <Form.Label>Notes</Form.Label>
                                            <Form.Control as="textarea" />
                                        </Col>
                                    </Row>
                                    <Button style={{ fontSize: '12px', padding: '4px 10px', width: '100px' }} type='submit' className='btn btn primary mt-3 float-end'> Submit </Button>
                                </Form.Group>
                            </Form>
                        </div>
                    </Card.Body>
                </Card>
            </div>
        </>
    );
};
export default Internalmedicine;