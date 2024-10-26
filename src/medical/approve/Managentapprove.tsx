import React, { useState, useEffect } from "react";
import { Row, Col, Card, Modal, Button } from "react-bootstrap";
import jwtDecode from "jwt-decode";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
// components
import PageTitle from "../../components/PageTitle";
import Table from "../../components/Table";
import "../../style.css";
import { showdataprofiles, ApproveAccessRequests, ShowFunAccessRequests } from "../../controller/MedicalController"; // Import controller

interface Disease {
  id: string;
  name: string;
}

interface RowData {
  id: number;
  time: string;
  value: string;
  requestContent: string;
  status: string;
  personalInfo: string[];
  diseases: Disease[];
  tokeorg?: string; // Add these properties as optional
  tokenbranch?: string; // Add these properties as optional
}


const Index: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedRow, setSelectedRow] = useState<RowData | null>(null);
  const [fieldsToShare, setfieldsToShare] = useState<string[]>([]);
  const [showPersonalInfo, setShowPersonalInfo] = useState(false);
  const [expandableRecords, setExpandableRecords] = useState<RowData[]>([]);
  const [datacheckprofile, setDatacheckprofile] = useState({
    tokenmedical: "",
    cccd: "",
  });

  useEffect(() => {
    const token = localStorage.getItem("jwtToken");
    if (token) {
      const decodedToken: any = jwtDecode(token);
      setDatacheckprofile({
        tokenmedical: decodedToken.tokenmedical,
        cccd: decodedToken.cccd,
      });
    }
  }, []);

  const showdata = async () => {
    try {
      const res = await ShowFunAccessRequests(datacheckprofile);
      
      if (res.status === true) {
        const accessRequests = res.data.accessRequests.map((request: any, index: number) => ({
          id: index + 1,
          time: new Date(request.timestamp).toLocaleString(),
          value: request.nameorganization || 'Unknown Hospital',
          requestContent: request.content || 'No Content',
          status: request.approved ? 'Approved' : 'Pending',
          personalInfo: request.personalInfo || [],
          diseases: request.diseases || [],
          tokeorg: request.tokeorg,      // New field
          tokenbranch: request.tokenbranch // New field
        }));
  
        console.log(accessRequests);
        setExpandableRecords(accessRequests);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const MySwal = withReactContent(Swal);


  useEffect(() => {
    showdata();
  }, [datacheckprofile]);

  const handleShow = (row: RowData) => {
    setSelectedRow(row);
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
    setfieldsToShare([]);
    setShowPersonalInfo(false);
  };

  const handleDiseaseChange = (disease: string) => {
    setfieldsToShare((prev) =>
      prev.includes(disease) ? prev.filter((item) => item !== disease) : [...prev, disease]
    );
  };

  const handleSelectAll = (isChecked: boolean) => {
    if (isChecked) {
      const allDiseases = selectedRow?.diseases.map((disease) => disease.name) || [];
      setfieldsToShare(allDiseases);
    } else {
      setfieldsToShare([]);
    }
  };

  const handleShowPersonalInfoChange = (checked: boolean) => {
    setShowPersonalInfo(checked);
    if (checked) {
      setfieldsToShare(["privatedata"]);
    }
  };

  const handleConfirm = async() => {
    const loadingSwal: any = MySwal.fire({
      title: 'Please wait...',
      text: 'Approve Request medical, please wait!',
      icon: 'info',
      allowOutsideClick: false,
      showConfirmButton: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });
    const token = localStorage.getItem("jwtToken");
    if (token) {
      const decodedToken: any = jwtDecode(token);
   
    const confirmedData = {
      personalInfo: selectedRow?.personalInfo,
      fieldsToShare: fieldsToShare,
      value: selectedRow?.value,
      time: selectedRow?.time,
      status: selectedRow?.status,
      tokeorg: selectedRow?.tokeorg,
      tokenbranch: selectedRow?.tokenbranch,
      requestContent: selectedRow?.requestContent,
      cccd:decodedToken.cccd
      
    }; 
  
    console.log("Confirmed Data:", confirmedData);
    const res = await ApproveAccessRequests(confirmedData);
    if(res){
      loadingSwal.close();
      Swal.fire({
        title: 'Update Success!',
        text: 'Approve Request medicalsuccessful.',
        icon: 'success',
        confirmButtonText: 'OK',
      });
      }else{
                Swal.fire({
        title: 'Update Error!',
        text: 'Approve Request medical Please try again.',
        icon: 'error',
        confirmButtonText: 'OK',
      });
  }}
    // Có thể thực hiện bất kỳ thao tác nào khác với confirmedData
  };
  

  const columns = [
    {
      Header: "Thời Gian",
      accessor: "time",
      sort: true,
    },
    {
      Header: "Tên Bệnh Viện",
      accessor: "value",
      sort: true,
    },
    {
      Header: "Nội Dung Yêu Cầu",
      accessor: "requestContent",
      sort: true,
    },
    {
      Header: "Trạng Thái",
      accessor: "status",
      sort: true,
    },
    {
      Header: "Hành Động",
      accessor: "action",
      Cell: ({ row }: { row: { original: RowData } }) => (
        <button className="btn btn-primary" onClick={() => handleShow(row.original)}>
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
              <p className="text-muted font-14 mb-4">Expand row to see more additional details</p>

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

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Thông Tin Chi Tiết</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="mb-3">
            <h5>Thông Tin Cá Nhân:</h5>
            {selectedRow && selectedRow.personalInfo.map((info, index) => <p key={index}>{info}</p>)}
          </div>

          <div className="form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="show-personal-info"
              onChange={(e) => handleShowPersonalInfoChange(e.target.checked)}
              checked={showPersonalInfo}
            />
            <label className="form-check-label" htmlFor="show-personal-info">
              Chỉ hiển thị thông tin cá nhân
            </label>
          </div>

          {!showPersonalInfo ? (
            <div className="mb-3">
              <h5>Chọn Bệnh:</h5>
              {selectedRow?.diseases && selectedRow.diseases.length > 0 ? (
                <>
                  <div className="form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="select-all"
                      onChange={(e) => handleSelectAll(e.target.checked)}
                      checked={fieldsToShare.length === selectedRow.diseases.length}
                    />
                    <label className="form-check-label" htmlFor="select-all">
                      Chọn tất cả
                    </label>
                  </div>
                  {selectedRow.diseases.map((disease) => (
                    <div key={disease.id} className="form-check">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        id={`disease-${disease.id}`}
                        checked={fieldsToShare.includes(disease.name)}
                        onChange={() => handleDiseaseChange(disease.name)}
                      />
                      <label className="form-check-label" htmlFor={`disease-${disease.id}`}>
                        {disease.name}
                      </label>
                    </div>
                  ))}
                </>
              ) : (
                <p>Không có loại bệnh nào để chọn.</p>
              )}
            </div>
          ) : null}
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
};

export default Index;
