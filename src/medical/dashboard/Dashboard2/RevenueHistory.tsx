import React from "react";
import { Card, Form, Button, Table, Dropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import classNames from "classnames";

interface RevenueHistoryProps {
  revenueHistory: {
    id: number;
    marketplaces: string;
    date: string;
    payouts: string;
    status: string;
  }[];
}

const RevenueHistory = ({ revenueHistory }: RevenueHistoryProps) => {
  return (
    <>
      <Card>
        <Card.Body>
          <div className="container mt-5">
            <h1 className="text-center">CHI TIẾT KHÁM BỆNH</h1>
            <p>Bệnh viện: BỆNH VIỆN SÀI GÒN</p>
            <p>Điện thoại: 0764771159</p>
            <p>Ngày khám: 13 tháng 05 năm 2024</p>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Họ tên:</Form.Label>
                <Form.Control type="text" value="Dương Tiến Công" readOnly />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Giới tính:</Form.Label>
                <Form.Control type="text" value="N" readOnly />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Tuổi:</Form.Label>
                <Form.Control type="text" value="24 tuổi" readOnly />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Địa chỉ:</Form.Label>
                <Form.Control type="text" value="Thanh Xuân" readOnly />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Số bảo hiểm:</Form.Label>
                <Form.Control type="text" value="cd 00000000" readOnly />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Kết quả kiểm tra:</Form.Label>
                <Form.Control as="textarea" value="Kết quả kiểm tra mẫu" readOnly />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Chuẩn đoán:</Form.Label>
                <Form.Control as="textarea" value="Chuẩn đoán mẫu" readOnly />
              </Form.Group>

              <h2>Thuốc kê đơn</h2>
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
    </>
  );
};

export default RevenueHistory;
