import React, { useState } from "react";
import { Card, Form, Button, Table, Dropdown } from "react-bootstrap";
import { Row, Col } from "react-bootstrap";
// components
import Statistics from "../Dashboard1/Statistics";
const Dashboard2 = () => {
  return (
    <>
      <Statistics />

      <Row>
        <Col xl={12}>
          <Card>
            <Card.Body>
              <div className="container mt-5">
                <h2 className="text-center m-0">CHI TIẾT KHÁM BỆNH</h2>
                <p className="text-center m-0">Bệnh viện: BỆNH VIỆN SÀI GÒN</p>
                <p className="text-center m-0">Điện thoại: 0764771159</p>
                <p className="text-center m-0">Ngày khám: 13 tháng 05 năm 2024</p>
                <Form>
                  <Form.Group className="mb-3 col-9 m-auto ">
                    <Form.Label>Họ tên:</Form.Label>
                    {/* <Form.Control type="text" value="Dương Tiến Công" readOnly /> */}
                    <span> Dương Tiến Công</span> <br/>
                    <Form.Label>Giới tính:</Form.Label>
                    <span> Nam</span> <br/>
                    {/* <Form.Control type="text" value="N" readOnly /> */}
                    <Form.Label>Tuổi:</Form.Label>
                    <span> 25</span> <br/>
                    {/* <Form.Control type="text" value="24 tuổi" readOnly /> */}
                    <Form.Label>Địa chỉ:</Form.Label>
                    <span> 123 Nguyễn Văn Cừ, P. Nguyễn Cư Trinh, Q1, TP.HCM</span> <br/>
                    {/* <Form.Control type="text" value="Thanh Xuân" readOnly /> */}
                    <Form.Label>Số bảo hiểm:</Form.Label>
                    <span> 1234567890</span> <br/>
                    {/* <Form.Control type="text" value="cd 00000000" readOnly /> */}
                    <Form.Label>Tên Bác Sĩ:</Form.Label>
                    <span> Nguyễn Văn A</span> <br/>
                    {/* <Form.Control type="text" value="cd 00000000" readOnly /> */}
                    <Form.Label>Chuẩn đoán:</Form.Label>
                    <Form.Control type="text" value="Chuẩn đoán mẫu" readOnly />
                    <Form.Label>Kết quả kiểm tra:</Form.Label>
                    <Form.Control type="text" value="Kết quả kiểm tra mẫu" readOnly />
                  </Form.Group>

                  <h2 className="text-center">Thuốc kê đơn</h2>
                  <Table striped bordered hover>
                    <thead>
                      <tr>
                        <th>Tên thuốc</th>
                        <th>DVT</th>
                        <th>SL</th>
                        <th>Cách dùng</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Thuốc A</td>
                        <td>viên</td>
                        <td>10</td>
                        <td>Uống 2 lần/ngày</td>
                      </tr>
                      <tr>
                        <td>Thuốc B</td>
                        <td>chai</td>
                        <td>1</td>
                        <td>Uống 1 lần/ngày</td>
                      </tr>
                    </tbody>
                  </Table>
                </Form>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default Dashboard2;
