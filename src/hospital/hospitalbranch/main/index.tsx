import React ,{useEffect,useState} from "react";
import { Row, Col, Card, Tab, Nav } from "react-bootstrap";
import classnames from "classnames";
import Statistics from "./Statistics";
import { useNavigate, useLocation } from "react-router-dom";

// components
import PageTitle from "../../../components/PageTitle";
import {CountMedicalByBranch,CountUserByBranch} from "../../../controller/HospitalBranch";
import CreateDepartment from "../createdepartment";
import CreatePersonnel from "../../personnel/createpersonnel";
import CreateService from "../createrseveri"

import CreateClinic from "../createrclinic"
import BranchInfo from "../BranchInfo"
// Quản lý
const Management = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const model = queryParams.get("model");

  // State to store the count of medical records
  const [medicalCount, setMedicalCount] = useState(0);
  const [userCount,setuserCount] = useState(0);

  // Fetch the count of medical records by branch
  useEffect(() => {
    const fetchMedicalCount = async () => {
      if (model) {
        try {
          const data = { tokenbranch: model };
          const res = await CountMedicalByBranch(data);
          console.log("gfdfgdfg"+res)
          if (res) {
            setMedicalCount(res.total_records); // Assuming API returns total_records
          } else {
            console.error("Failed to fetch medical count:", res.message);
          }
        } catch (error) {
          console.error("Error fetching medical count:", error);
        }
      }
    };
    const fetchUserCount = async () => {
      if (model) {
        try {
          const data = {branch: model };
          const res = await CountUserByBranch(data);
          console.clear()
          console.log("gfdfgdfg"+res.total_users)
          
          if (res) {
            setuserCount(res.total_users); // Assuming API returns total_records
          } else {
            console.error("Failed to fetch medical count:", res.message);
          }
        } catch (error) {
          console.error("Error fetching medical count:", error);
        }
      }
    };
    fetchMedicalCount();
    fetchUserCount();
  }, [model]); // Re-run when `model` changes

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
                stats={medicalCount} // Use the state value
                description="Tổng Số Bệnh Nhân"
              />
            </Col>
            <Col lg={6} xl={4}>
              <Statistics
                icon="fe-clock"
                variant="warning"
                stats={userCount} // Use the state value
                description="Tổng Số Nhân Viên"
              />
            </Col>
            <Col lg={6} xl={4}>
              <Statistics
                icon="fe-check-circle"
                variant="success"
                stats={medicalCount} // Use the state value
                description="Tổng Doanh Thu"
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
              <Tab.Pane eventKey="5"><BranchInfo /></Tab.Pane>
            </Tab.Content>
          </Card.Body>
        </Card>
      </Tab.Container>
    </>
  );
};

export default Management;
