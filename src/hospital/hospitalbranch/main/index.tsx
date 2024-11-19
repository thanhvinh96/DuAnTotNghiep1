import React from "react";
import { Row, Col, Card, Tab, Nav } from "react-bootstrap";
import classnames from "classnames";
import Statistics from "./Statistics";

// components
import PageTitle from "../../../components/PageTitle";

import CreateDepartment from "../createdepartment";
import CreatePersonnel from "../../personnel/createpersonnel";
import CreateService from "../createrseveri"

import CreateClinic from "../createrclinic"
// Quản lý
const Management = () => {
  return (
    <>
      <PageTitle
        breadCrumbItems={[
          { label: "Quản lý", path: "/apps/management", active: true },
        ]}
        title={"Hệ thống quản lý"}
      />
                <Row>
            <Col lg={6} xl={4}>
              <Statistics
                icon="fe-book"
                variant="primary"
                stats="1234"
                description="Tổng Số Bệnh Nhân"
              />
            </Col>
            <Col lg={6} xl={4}>
              <Statistics
                icon="fe-clock"
                variant="warning"
                stats="567"
                description="Tổng Số Nhân Viên"
              />
            </Col>
            <Col lg={6} xl={4}>
              <Statistics
                icon="fe-check-circle"
                variant="success"
                stats="345"
                description="Tổng Số Token"
              />
            </Col>
          </Row>
      <Tab.Container defaultActiveKey="1">
        <Card>
          <Card.Body>
            <Nav
              variant="pills"
              className="nav nav-pills navtab-bg nav-justified mb-3"
            >
              <Nav.Item>
                <Nav.Link eventKey="1" className="nav-link cursor-pointer py-2">
                  <i
                    className={classnames(
                      "mdi mdi-account-circle",
                      "d-block",
                      "font-24"
                    )}
                  ></i>
                  <span className="d-none d-md-block">Tạo thành viên</span>
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="2" className="nav-link cursor-pointer py-2">
                  <i
                    className={classnames(
                      "mdi mdi-clipboard-plus",
                      "d-block",
                      "font-24"
                    )}
                  ></i>
                  <span className="d-none d-md-block">Tạo dịch vụ</span>
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="3" className="nav-link cursor-pointer py-2">
                  <i
                    className={classnames(
                      "mdi mdi-office-building",
                      "d-block",
                      "font-24"
                    )}
                  ></i>
                  <span className="d-none d-md-block">Tạo khoa</span>
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="4" className="nav-link cursor-pointer py-2">
                  <i
                    className={classnames(
                      "mdi mdi-hospital-building",
                      "d-block",
                      "font-24"
                    )}
                  ></i>
                  <span className="d-none d-md-block">Tạo phòng khám</span>
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="5" className="nav-link cursor-pointer py-2">
                  <i
                    className={classnames(
                      "mdi mdi-pencil",
                      "d-block",
                      "font-24"
                    )}
                  ></i>
                  <span className="d-none d-md-block">Cập nhật thông tin</span>
                </Nav.Link>
              </Nav.Item>
            </Nav>
            <Tab.Content className="p-3">
              <Tab.Pane eventKey="1">
                <CreatePersonnel />
              </Tab.Pane>
              <Tab.Pane eventKey="2"> <CreateService /></Tab.Pane>
              <Tab.Pane eventKey="3">
                <CreateDepartment />
              </Tab.Pane>
              <Tab.Pane eventKey="4"> <CreateClinic /> </Tab.Pane>
              <Tab.Pane eventKey="5">{/* <UpdateInfo /> */}</Tab.Pane>
            </Tab.Content>
          </Card.Body>
        </Card>
      </Tab.Container>
    </>
  );
};

export default Management;
