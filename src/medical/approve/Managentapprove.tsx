import React, { useState } from "react";
import { Row, Col, Card, Modal, Button } from "react-bootstrap";

// components
import PageTitle from "../../components/PageTitle";
import Table from "../../components/Table";
import '../../style.css';

// Define type for row data
interface RowData {
  id: number;
  time: string;
  hospitalName: string;
  requestContent: string;
  status: string; // Thêm trạng thái
  personalInfo: string[]; // Danh sách thông tin cá nhân
  diseases: string[]; // Danh sách các bệnh
}

// Sample data for hospital details
const expandableRecords: RowData[] = [
  {
    id: 1,
    time: '09:00 - 10:00, 2023-10-01',
    hospitalName: 'Bệnh Viện Chợ Rẫy',
    requestContent: 'Khám tổng quát',
    status: 'Đang chờ', // Trạng thái
    personalInfo: ['Họ và tên: Nguyễn Văn A', 'Tuổi: 30', 'Giới tính: Nam'],
    diseases: ['Viêm phổi', 'Đau dạ dày', 'Viêm gan B', 'Thoát vị đĩa đệm'],
  },
  {
    id: 2,
    time: '14:00 - 15:00, 2023-09-15',
    hospitalName: 'Bệnh Viện Đại Học Y Dược',
    requestContent: 'Kiểm tra sức khỏe',
    status: 'Đã xác nhận', // Trạng thái
    personalInfo: ['Họ và tên: Trần Thị B', 'Tuổi: 25', 'Giới tính: Nữ'],
    diseases: ['Viêm phổi', 'Viêm gan B'],
  },
  // Thêm các đối tượng khác nếu cần
];

function Index(): JSX.Element {
  const [showModal, setShowModal] = useState(false);
  const [selectedRow, setSelectedRow] = useState<RowData | null>(null);
  const [selectedDiseases, setSelectedDiseases] = useState<string[]>([]); // Store selected disease names
  const [showPersonalInfo, setShowPersonalInfo] = useState(false); // New state for showing personal info

  const handleShow = (row: RowData) => {
    setSelectedRow(row);
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
    setSelectedDiseases([]); // Reset selected diseases
    setShowPersonalInfo(false); // Reset personal info selection
  };

  const handleDiseaseChange = (disease: string) => {
    setSelectedDiseases((prev) =>
      prev.includes(disease) ? prev.filter((d) => d !== disease) : [...prev, disease]
    );
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedDiseases(selectedRow?.diseases || []); // Select all diseases
    } else {
      setSelectedDiseases([]); // Deselect all
    }
  };

  const handleConfirm = () => {
    if (selectedRow) {
      const infoMessage = showPersonalInfo
        ? `Đã xác nhận yêu cầu cho Bệnh Viện: ${selectedRow.hospitalName} với thông tin cá nhân: ${selectedRow.personalInfo.join(', ')}`
        : `Đã xác nhận yêu cầu cho Bệnh Viện: ${selectedRow.hospitalName} với các bệnh: ${selectedDiseases.join(', ')}`;

      alert(infoMessage);
      handleClose(); // Close modal after confirmation
    }
  };

  const columns = [
    {
      Header: 'Thời Gian',
      accessor: 'time',
      sort: true,
    },
    {
      Header: 'Tên Bệnh Viện',
      accessor: 'hospitalName',
      sort: true,
    },
    {
      Header: 'Nội Dung Yêu Cầu',
      accessor: 'requestContent',
      sort: true,
    },
    {
      Header: 'Trạng Thái', // Cột trạng thái mới
      accessor: 'status',
      sort: true,
    },
    {
      Header: 'Hành Động',
      accessor: 'action',
      Cell: ({ row }: { row: { original: RowData } }) => (
        <button
          className="btn btn-primary"
          onClick={() => handleShow(row.original)}
        >
          Xem Chi Tiết
        </button>
      ),
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
      text: "Tất Cả",
      value: expandableRecords.length,
    },
  ];

  return (
    <>
      <PageTitle
        breadCrumbItems={[
          { label: "Tables", path: "/features/tables/advanced" },
          {
            label: "Advanced Tables",
            path: "/features/tables/advanced",
            active: true,
          },
        ]}
        title={"Advanced Tables"}
      />

      <Row>
        <Col>
          <Card>
            <Card.Body>
              <h4 className="header-title">Expand Row</h4>
              <p className="text-muted font-14 mb-4">
                Expand row to see more additional details
              </p>

              <Table
                columns={columns}
                data={expandableRecords}
                pageSize={5}
                sizePerPageList={sizePerPageList}
                isSortable={true}
                pagination={true}
                isExpandable={true}
              />
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Modal for displaying detailed information */}
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Thông Tin Chi Tiết</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* Hộp thông tin cá nhân */}
          <div className="mb-3">
            <h5>Thông Tin Cá Nhân:</h5>
            {selectedRow && selectedRow.personalInfo.map((info, index) => (
              <p key={index}>{info}</p>
            ))}
          </div>

          {/* Checkbox để chọn chỉ thông tin cá nhân */}
          <div className="form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="show-personal-info"
              onChange={(e) => setShowPersonalInfo(e.target.checked)}
              checked={showPersonalInfo}
            />
            <label className="form-check-label" htmlFor="show-personal-info">
              Chỉ hiển thị thông tin cá nhân
            </label>
          </div>

          {/* Hộp chọn bệnh */}
          {!showPersonalInfo && (
            <div className="mb-3">
              <h5>Chọn Bệnh:</h5>
              <div className="form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="select-all"
                  onChange={(e) => handleSelectAll(e.target.checked)}
                  checked={selectedDiseases.length === selectedRow?.diseases.length}
                />
                <label className="form-check-label" htmlFor="select-all">
                  Chọn tất cả
                </label>
              </div>
              {selectedRow?.diseases.map((disease) => (
                <div key={disease} className="form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id={`disease-${disease}`}
                    checked={selectedDiseases.includes(disease)}
                    onChange={() => handleDiseaseChange(disease)}
                  />
                  <label className="form-check-label" htmlFor={`disease-${disease}`}>
                    {disease}
                  </label>
                </div>
              ))}
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Đóng
          </Button>
          <Button variant="primary" onClick={handleConfirm}>
            Xác Nhận
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Index;
