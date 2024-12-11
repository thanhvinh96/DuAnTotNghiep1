import React, { useState, useEffect } from "react";
import { Row, Col, Card, Modal, ListGroup, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import Statistics from "./Statistics";

// Components
import PageTitle from "../../../components/PageTitle";
import Table from "../../../components/Table";
import jwtDecode from "jwt-decode";

// API
import { GetHistoryMedical } from "../../../controller/MedicalController";

// Define type for row data
interface RowData {
  id: number;
  date: string;
  recordCode: string;
  action?: React.ReactNode;
}

function Index(): JSX.Element {
  const [tableData, setTableData] = useState<RowData[]>([]);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [missingFields, setMissingFields] = useState<string[]>([]);
  const navigate = useNavigate();

  const columns = [
    {
      Header: "Mã Hồ Sơ",
      accessor: "recordCode",
      sort: true,
    },
    {
      Header: "Tên bệnh án",
      accessor: "date",
      sort: true,
    },
    {
      Header: "Hành Động",
      accessor: "action",
      Cell: ({ row }: { row: { original: RowData } }) => (
        <Link
          to={`/medical/medical-record-detail?record=${row.original.recordCode}`}
        >
          <button
            className="btn btn-info waves-effect waves-light"
            style={{
              background: "#102A50",
              border: "none",
            }}
            onClick={() => handleAction(row.original)}
          >
            Xem Chi Tiết
          </button>
        </Link>
      ),
    },
  ];

  const handleAction = (row: RowData) => {
    // alert(`Chi tiết của Mã Hồ Sơ: ${row.recordCode}`);
  };
  const checkToken = () => {
    const token = localStorage.getItem('jwtToken');
    if (token) {
      try {
        const decodedToken: any = jwtDecode(token);
        const requiredFields = ['identityCard'];
        const missing = requiredFields.filter(field => !decodedToken[field]);
        if (missing.length > 0) {
          setMissingFields(missing);
          setShowModal(true);
        }
      } catch (error) {
        console.error('Error decoding token:', error);
      }
    }
  };

  const handleNavigate = () => {
    navigate('/medical/profile-medical');
  };

  useEffect(() => {
    checkToken();
  }, []);

  const showdata = async () => {
    try {
      const token: any = localStorage.getItem("jwtToken");
      console.log("du lieu token");
      console.log(token);
      const decodedToken: any = jwtDecode(token);

      const data = {
        tokenmedical: decodedToken.tokenmedical,
        cccd: decodedToken.cccd,
      };
      const res = await GetHistoryMedical(data);
      console.log(res.data.diseaseInfo);
      const records = res.data.diseaseInfo.map((item: any, index: number) => ({
        id: index + 1, // tạo ID cho mỗi dòng
        recordCode: item.diseasecode || "N/A", // giả sử `recordCode` là mã hồ sơ
        date: item.namedisease || "N/A", // giả sử `date` là thời gian khám
      }));
      setTableData(records);
    } catch (e) {
      console.error("Error fetching medical history:", e);
    }
  };

  useEffect(() => {
    showdata();
  }, []);

  return (
    <>
      <div className="dashboard-container">
        {/* Statistics Section */}
        <Statistics />
        {/* User Balances Section */}
        <Modal
          show={showModal}
          onHide={() => setShowModal(false)}
          centered
        // size="md"
        >
          <Modal.Header closeButton>
            <Modal.Title>
              <i className="bi bi-exclamation-triangle-fill text-warning"></i> Missing Information
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p className="text-muted">
              The following fields are missing or incomplete in your profile:
            </p>
            <ListGroup className="mb-3">
              {missingFields.map((field, index) => (
                <ListGroup.Item
                  key={index}
                  className="d-flex align-items-center"
                >
                  <i className="bi bi-dash text-danger me-2"></i> {field}
                </ListGroup.Item>
              ))}
            </ListGroup>
            <p className="text-muted">
              Please update your profile to fill in these fields.
            </p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Close
            </Button>
            <Button variant="primary" onClick={handleNavigate}>
              Update Profile
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
      <PageTitle
        breadCrumbItems={[
          { label: "Tables", path: "/features/tables/advanced" },
        ]}
        title={"Lịch Sử Bệnh Án"}
      />
      <Row>
        <Col>
          <Card>
            <Card.Body>
              <Table
                columns={columns}
                data={tableData}
                pageSize={5}
                sizePerPageList={[
                  { text: "5", value: 5 },
                  { text: "10", value: 10 },
                  { text: "25", value: 25 },
                  { text: "All", value: tableData.length },
                ]}
                isSortable={true}
                pagination={true}
                isExpandable={false}
              />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
}

export default Index;