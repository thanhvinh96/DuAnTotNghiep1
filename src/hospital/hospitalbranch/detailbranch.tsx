import React, { useState } from "react";
import { Row, Col, Card, Form, Button, Collapse } from "react-bootstrap";
import Statistics from "./Statistics";
import Table from "../../components/Table";

interface Records {
  id: number;
  age: number;
  name: string;
  company: string;
  phone: string;
}

const data: Records[] = [
  {
    id: 1,
    age: 32,
    name: "Burt",
    company: "Kaggle",
    phone: "+1 (823) 532-2427",
  },
  {
    id: 2,
    age: 23,
    name: "Bruno",
    company: "Magmina",
    phone: "+1 (813) 583-2089",
  },
  {
    id: 60,
    age: 20,
    name: "Manning",
    company: "Handshake",
    phone: "+1 (917) 405-3406",
  },
];

const columns = [
  {
    Header: "Mã",
    accessor: "id",
    sort: true,
  },
  {
    Header: "Tên Chi Nhánh",
    accessor: "Branch name",
    sort: true,
  },
  {
    Header: "Số Điện Thoại",
    accessor: "phone",
    sort: false,
  },
  {
    Header: "Ngày Tạo",
    accessor: "age",
    sort: true,
  },
  {
    Header: "Hành Động",
    accessor: "company",
    sort: false,
  },
];

const sizePerPageList = [
  {
    text: "5",
    value: 5,
  },
  {
    text: "10",
    value: 10,
  },
  {
    text: "25",
    value: 25,
  },
  {
    text: "Tất cả",
    value: data.length,
  },
];

export default function DetailBranch() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Row>
        <Col>
          <div className="page-title-box">
            <div className="page-title-right">
              <form className="d-flex align-items-center mb-3">
                <div className="input-group input-group-sm">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Tìm kiếm..."
                  />
                </div>
                <Button className="btn btn-info btn-sm ms-2">
                  <i className="mdi mdi-autorenew"></i>
                </Button>
                <Button className="btn btn-info btn-sm ms-1">
                  <i className="mdi mdi-filter-variant"></i>
                </Button>
              </form>
            </div>
            <h4 className="page-title">Quản Lý Chi Nhánh</h4>
          </div>
        </Col>
      </Row>

      <Statistics />
      <Row>
        <Col>
          <Card>
            <Card.Body>
              <h4 className="header-title">Thông Tin Chi Nhánh</h4>

              <Button
                onClick={() => setOpen(!open)}
                aria-controls="branchFormCollapse"
                aria-expanded={open}
                variant="primary"
              >
                {open ? "Ẩn Biểu Mẫu" : "Hiện Biểu Mẫu"}
              </Button>

              <Collapse in={open}>
                <div id="branchFormCollapse" className="mt-3">
                  <Form>
                    <Form.Group className="mb-3" controlId="tokenBranch">
                      <Form.Label>Mã Chi Nhánh</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Nhập mã chi nhánh"
                      />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="branchName">
                      <Form.Label>Tên Chi Nhánh</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Nhập tên chi nhánh"
                      />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="branchAddress">
                      <Form.Label>Địa Chỉ Chi Nhánh</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Nhập địa chỉ chi nhánh"
                      />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="branchPhone">
                      <Form.Label>Số Điện Thoại</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Nhập số điện thoại"
                      />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="branchEmail">
                      <Form.Label>Email Chi Nhánh</Form.Label>
                      <Form.Control
                        type="email"
                        placeholder="Nhập email chi nhánh"
                      />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="branchLicense">
                      <Form.Label>Giấy Phép Kinh Doanh</Form.Label>
                      <Form.Control type="file" />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="timeCreate">
                      <Form.Label>Ngày Tạo</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Nhập ngày tạo"
                      />
                    </Form.Group>

                    <Button variant="success" type="submit">
                      Gửi
                    </Button>
                  </Form>
                </div>
              </Collapse>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row>
        <Col>
          <Card>
            <Card.Body>
              <h4 className="header-title">Quản Lý Nhân Sự</h4>
              <p className="text-muted font-14 mb-4">
                Tổng số lượng nhân sự trong chi nhánh
              </p>

              <Table
                columns={columns}
                data={data}
                pageSize={5}
                sizePerPageList={sizePerPageList}
                isSortable={true}
                pagination={true}
                isSearchable={true}
              />
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row>
        <Col>
          <Card>
            <Card.Body>
              <h4 className="header-title">Bệnh Nhân</h4>
              <p className="text-muted font-14 mb-4">
                Tổng số lượng bệnh nhân tiếp nhận
              </p>

              <Table
                columns={columns}
                data={data}
                pageSize={5}
                sizePerPageList={sizePerPageList}
                isSortable={true}
                pagination={true}
                isSearchable={true}
              />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
}
