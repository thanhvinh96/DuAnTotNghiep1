import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, Form, Row, Col, Button, Table, FormLabel } from 'react-bootstrap';

const InternalmedicineNurse = () => {
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
                    <h2 className='text-center'>PHIẾU KHÁM NỘI</h2>
                    <div className='text-center'>
                        <Form>
                            <Row className="justify-content-center">
                                <Col md={2}>
                                    <FormLabel>Mã Số Sổ Khám</FormLabel>
                                    <Form.Control as="select">
                                        <option value=""></option>
                                        <option value=""></option>
                                    </Form.Control>
                                </Col>
                            </Row>
                        </Form>
                    </div>
                    <div className="container border p-4">
                        <Form>
                            <Table className='table table-bordered text-center mt-5'>
                                <thead className="thead-light">
                                    <tr>
                                        <th scope="col">STT</th>
                                        <th scope="col">Chuyên Mục Khám </th>
                                        <th scope="col">Kết quả</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {tableData.map((item, index) => (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>
                                                <Form.Control type="text" onChange={(e) => handleInputChange(index, 'testName', e.target.value)} />
                                            </td>
                                            <td>
                                                <Form.Control type="text" onChange={(e) => handleInputChange(index, 'result', e.target.value)} />
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                            <div className="d-flex justify-content-between mt-3">
                                <Button onClick={addRow} style={{ fontSize: '12px', padding: '4px 10px', width: '150px' }}>Thêm dòng</Button>
                                <Button style={{ fontSize: '12px', padding: '4px 10px', width: '150px' }}>Thêm kết quả</Button>
                            </div>
                        </Form>
                    </div>
                </Card.Body>
            </Card>
        </>
    );
};

export default InternalmedicineNurse;
