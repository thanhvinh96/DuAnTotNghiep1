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
                                            <Form.Label>Chiều Cao</Form.Label>
                                            <Form.Control type="text" />
                                        </Col>
                                        <Col md={3}>
                                            <Form.Label>Cân Nặng</Form.Label>
                                            <Form.Control type="text" />
                                        </Col>
                                        <Col md={6}>
                                            <Form.Label>Da Liễu</Form.Label>
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
                                    <Row>
                                        <Col md={6}>
                                            <Row>
                                                <Col md={12}>
                                                    <h3 className='text-center'>Thị Giác</h3>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col md={6}>
                                                    <Form.Label>Tình Trạng Mắt Trái</Form.Label>
                                                    <Form.Control type='text'></Form.Control>
                                                </Col>
                                                <Col md={6}>
                                                    <Form.Label>Tình Trạng Mắt Phải</Form.Label>
                                                    <Form.Control type='text'></Form.Control>
                                                </Col>
                                            </Row>
                                        </Col>
                                        <Col md={6}>
                                            <Row>
                                                <Col md={12}>
                                                    <h3 className='text-center'>Thính Giác</h3>
                                                </Col>
                                                <Col md={6}>
                                                    <Form.Label>Tình Trạng Tai Trái</Form.Label>
                                                    <Form.Control type='text'></Form.Control>
                                                </Col>
                                                <Col md={6}>
                                                    <Form.Label>Tình Trạng Tai Phải</Form.Label>
                                                    <Form.Control type='text'></Form.Control>
                                                </Col>
                                            </Row>
                                        </Col>
                                    </Row>
                                    <hr />
                                    <Row>
                                        <Col md={6}>
                                            <Row>
                                                <Col md={12}>
                                                    <h3 className='text-center'>Khứu Giác</h3>
                                                </Col>
                                                <Col md={6}>
                                                    <Form.Label>Tình Trạng Mũi Trái</Form.Label>
                                                    <Form.Control type='text'></Form.Control>
                                                </Col>
                                                <Col md={6}>
                                                    <Form.Label>Tình Trạng Mũi Phải</Form.Label>
                                                    <Form.Control type='text'></Form.Control>
                                                </Col>
                                            </Row>
                                        </Col>
                                        <Col md={6}>
                                            <Row>
                                                <Col md={12}>
                                                    <h3 className='text-center'>Răng Hàm Mặt</h3>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col md={6}>
                                                    <Form.Label>Tình Trạng Răng</Form.Label>
                                                    <Form.Control type='text'></Form.Control>
                                                </Col>
                                                <Col md={6}>
                                                    <Form.Label>Tình Trạng Hàm Mặt</Form.Label>
                                                    <Form.Control type='text'></Form.Control>
                                                </Col>
                                            </Row>
                                        </Col>
                                    </Row>
                                    <hr/>
                                    <Row>
                                        <Col md={12}>
                                            <Row>
                                                <Col md={12}>
                                                    <h3 className='text-center'>Hậu Môn-Trực Tràng-Thoát Vị</h3>
                                                </Col>
                                                <Col md={3}>
                                                    <Form.Label>Tình Trạng Hậu Môn</Form.Label>
                                                    <Form.Control type='text'></Form.Control>
                                                </Col>
                                                <Col md={3}>
                                                    <Form.Label>Tình Trạng Trĩ Nội</Form.Label>
                                                    <Form.Control type='text'></Form.Control>
                                                </Col>
                                                <Col md={3}>
                                                    <Form.Label>Tình Trạng Trĩ Ngoại</Form.Label>
                                                    <Form.Control type='text'></Form.Control>
                                                </Col>
                                                <Col md={3}>
                                                    <Form.Label>Tình Trạng Thoát Vị Bẹn</Form.Label>
                                                    <Form.Control type='text'></Form.Control>
                                                </Col>
                                            </Row>
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