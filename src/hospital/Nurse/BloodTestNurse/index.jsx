import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, Form, Row, Col, Button, Table } from 'react-bootstrap';

const BloodTestForm = () => {
    const [tableData, setTableData] = useState([]);

    // Hàm để thêm dòng mới vào bảng
    const addRow = () => {
        setTableData([...tableData, { testName: '', referenceValue: '', result: '', unit: '', machine: '' }]);
    };

    // Hàm để xử lý khi thay đổi giá trị input
    const handleInputChange = (index, field, value) => {
        const newData = [...tableData];
        newData[index][field] = value;
        setTableData(newData);
    };
    return (
        <>
            <Card>
                <Card.Body>
                    <h2 className='text-center'>PHIẾU XÉT NGHIỆM MÁU</h2>
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
                                        <Form.Label>Số bảo hiểm</Form.Label>
                                        <Form.Control type="text" />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={6}>
                                        <Form.Label>Date</Form.Label>
                                        <Form.Control type="date" />
                                    </Col>
                                    <Col md={6}>
                                        <Form.Label>Doctor</Form.Label>
                                        <Form.Control type="text" />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={6}>
                                        <Form.Label>Chẩn Đoán</Form.Label>
                                        <Form.Control type="text" />
                                    </Col>
                                </Row>
                            </Form.Group>

                            <Table className='table table-bordered text-center mt-5'>
                                <thead className="thead-light">
                                    <tr>
                                        <th scope="col">STT</th>
                                        <th scope="col">Xét nghiệm</th>
                                        <th scope="col">Giá trị tham chiếu</th>
                                        <th scope="col">Kết quả</th>
                                        <th scope="col">Đơn vị</th>
                                        <th scope="col">Máy/QTKT</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {tableData.map((item, index) => (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>
                                                <Form.Control type="text" />
                                            </td>
                                            <td>
                                                <Form.Control type="text" />
                                            </td>
                                            <td>
                                                <Form.Control type="text" />
                                            </td>
                                            <td>
                                                <Form.Control type="text" />
                                            </td>
                                            <td>
                                                <Form.Control type="text" />
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                            <div className="d-flex justify-content-between mt-3">
                                <Button onClick={addRow} style={{ fontSize: '12px', padding: '4px 10px', width: '150px' }}>Thêm dòng</Button>
                                <Button style={{ fontSize: '12px', padding: '4px 10px', width: '150px' }} >Thêm kết quả</Button>
                            </div>
                        </Form>
                    </div>
                </Card.Body>
            </Card>
        </>
    );
};

export default BloodTestForm;