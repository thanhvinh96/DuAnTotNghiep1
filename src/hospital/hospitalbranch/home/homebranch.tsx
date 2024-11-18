import React, { useState, useEffect } from 'react';
import { Table, Form, Button, Container, Row, Col, Alert, Card, Tooltip, OverlayTrigger } from 'react-bootstrap';
import PageTitle from "../../../components/PageTitle";
import { ShowBranchRequestMedical } from "../../../controller/BranchController";
import Statistics from "./Statistics";
import PerformanceChart from "./PerformanceChart";
import CreateService from "../createrseveri"
import CreateDepartment from "../createdepartment"
import CreatePersonnel from "../../personnel/createpersonnel"
import CreateClinic from "../createrclinic"

const ManagementRequest: React.FC = () => {
  const [datagetshow, setdatagetshow] = useState<{ tokeorg: string; value: string; tokenbranch: string }>({
    tokeorg: '',
    value: '',
    tokenbranch: '',
  });
  const [datatable, setdatatanle] = useState<any[]>([]);

  const showdatarequest = async () => {
    const res: any = await ShowBranchRequestMedical(datagetshow);
    if (Array.isArray(res)) {
      setdatatanle(res);
    } else {
      setdatatanle([]); // Reset to empty array if response is not valid
    }
  };

  useEffect(() => {
    showdatarequest();
  }, [datagetshow]);

  // State to handle which section to show
  const [activeSection, setActiveSection] = useState<string | null>(null);

  const handleButtonClick = (section: string) => {
    // Toggle the section content
    if (activeSection === section) {
      setActiveSection(null); // Hide the section if it's already active
    } else {
      setActiveSection(section); // Show the clicked section's content
    }
  };

  return (
    <>
      <Card>
        <Card.Body>
          <Row>
            <Col lg={12}>
              <h4>Quản Lý Yêu Cầu</h4>
            </Col>
          </Row>

          {/* Statistics Section */}
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
          <Row className="mt-4">
            {/* Tạo Tổ Dịch Vụ */}
            <Col lg={2} xs={6}>
              <OverlayTrigger
                placement="top"
                overlay={<Tooltip id="create-service-tooltip">Tạo một tổ dịch vụ mới</Tooltip>}
              >
                <Card className="shadow-sm">
                  <Card.Body>
                    <h5>Tạo Tổ Dịch Vụ</h5>
                    <Button
                      variant="primary"
                      className="w-100 btn-hover-shadow"
                      onClick={() => handleButtonClick("createService")}
                    >
                      <i className="fe-plus me-2"></i> Tạo Mới
                    </Button>
                  </Card.Body>
                </Card>
              </OverlayTrigger>
            </Col>

            {/* Tạo Khoa */}
            <Col lg={2} xs={6}>
              <OverlayTrigger
                placement="top"
                overlay={<Tooltip id="create-department-tooltip">Tạo khoa bệnh viện mới</Tooltip>}
              >
                <Card className="shadow-sm">
                  <Card.Body>
                    <h5>Tạo Khoa</h5>
                    <Button
                      variant="secondary"
                      className="w-100 btn-hover-shadow"
                      onClick={() => handleButtonClick("createDepartment")}
                    >
                      <i className="fe-plus me-2"></i> Tạo Mới
                    </Button>
                  </Card.Body>
                </Card>
              </OverlayTrigger>
            </Col>

            {/* Tạo Thành Viên */}
            <Col lg={2} xs={6}>
              <OverlayTrigger
                placement="top"
                overlay={<Tooltip id="create-member-tooltip">Thêm thành viên mới</Tooltip>}
              >
                <Card className="shadow-sm">
                  <Card.Body>
                    <h5>Tạo Thành Viên</h5>
                    <Button
                      variant="success"
                      className="w-100 btn-hover-shadow"
                      onClick={() => handleButtonClick("createMember")}
                    >
                      <i className="fe-user-plus me-2"></i> Tạo Mới
                    </Button>
                  </Card.Body>
                </Card>
              </OverlayTrigger>
            </Col>

            {/* Cập Nhật Thông Tin */}
            <Col lg={2} xs={6}>
              <OverlayTrigger
                placement="top"
                overlay={<Tooltip id="update-info-tooltip">Cập nhật thông tin</Tooltip>}
              >
                <Card className="shadow-sm">
                  <Card.Body>
                    <h5>Cập Nhật Thông Tin</h5>
                    <Button
                      variant="warning"
                      className="w-100 btn-hover-shadow"
                      onClick={() => handleButtonClick("updateInfo")}
                    >
                      <i className="fe-refresh-ccw me-2"></i> Cập Nhật
                    </Button>
                  </Card.Body>
                </Card>
              </OverlayTrigger>
              {activeSection === "updateInfo" && (
                <Card className="mt-3">
                  <Card.Body>
                    <h6>Thông tin cập nhật</h6>
                    <p>Hiển thị các chi tiết cập nhật thông tin ở đây...</p>
                  </Card.Body>
                </Card>
              )}
            </Col>

            {/* Tạo Phòng Khám */}
            <Col lg={2} xs={6}>
              <OverlayTrigger
                placement="top"
                overlay={<Tooltip id="create-clinic-tooltip">Tạo phòng khám mới</Tooltip>}
              >
                <Card className="shadow-sm">
                  <Card.Body>
                    <h5>Tạo Phòng Khám</h5>
                    <Button
                      variant="info"
                      className="w-100 btn-hover-shadow"
                      onClick={() => handleButtonClick("createClinic")}
                    >
                      <i className="fe-hospital me-2"></i> Tạo Mới
                    </Button>
                  </Card.Body>
                </Card>
              </OverlayTrigger>
            </Col>
          </Row>


          {/* Performance Chart Section */}
          <Row>
            <Col xl={12}>
              {/* Show content based on the active section */}
              {activeSection === "createService" && (
                <CreateService />
              )}

              {activeSection === "createMember" && (
                <CreatePersonnel />
              )}
              {activeSection==="createClinic"&&(
                <CreateClinic/>
              )}

              {activeSection === "createDepartment"&&(
                <CreateDepartment />
              )}
                
            </Col>
          </Row>

        </Card.Body>
      </Card>
    </>
  );
};

export default ManagementRequest;
// <PerformanceChart />
              // )}