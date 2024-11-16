import React, { useState, useEffect } from 'react';
import { Table, Container, Button, Row, Col, Card, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import PageTitle from "../../../components/PageTitle";
import { getMedicalRecordByDoctorToken } from '../../../controller/HospitalController';
import jwt_decode from 'jwt-decode';

interface PatientRecord {
  recordId: string;
  creationDate: string;
}

const PatientList: React.FC = () => {
  const navigate = useNavigate();
  const [records, setRecords] = useState<PatientRecord[]>([
   
  ]);


  const [searchTerm, setSearchTerm] = useState('');

  // Hàm lấy dữ liệu từ API
  const showData = async () => {
    try {
      const token = localStorage.getItem('tokenadmin');
      if (!token) {
        console.log("Token không tồn tại");
        return;
      }
  
      const decoded: any = jwt_decode(token);
      console.log("Decoded Token:", decoded);
  
      if (!decoded.tokenuser) {
        console.log("Token user không tồn tại trong decoded token");
        return;
      }
      const data = {
        "token_doctor": decoded.tokenuser
      };
      
      const res = await getMedicalRecordByDoctorToken(data);
      console.log("API Response:", res);
  
      if (res && Array.isArray(res.data)) {
        // Chuyển đổi danh sách các bản ghi từ API sang định dạng phù hợp với `PatientRecord`
        const transformedRecords = res.data.map((record: any) => ({
          recordId: record.patient_cccd ? record.patient_cccd : record.diseasecodes,
          creationDate: record.created_at,
        }));
        
        setRecords(transformedRecords); // cập nhật state với danh sách đã được chuyển đổi
      }
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu:", error);
    }
  };
  
  // Gọi hàm `showData` khi component được mount
  useEffect(() => {
    showData();
  }, []);

  // Lọc các bản ghi theo mã khám bệnh
  const filteredRecords = records.filter(record =>
    record.recordId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleViewDetails = (recordId: string) => {
    navigate(`/doctor/history-detail?patient=${recordId}`);
  };

  return (
    <>   
      <PageTitle
        breadCrumbItems={[
          { label: "Tables", path: "/features/tables/advanced" },
          {
            label: "Information hospital",
            path: "/features/tables/advanced",
            active: true,
          },
        ]}
        title={"Danh Sách Hồ Sơ Bệnh Án"}
      />
      <Row>
        <Col>
          <Card>
            <Card.Body>
              <Form>
                <Form.Group controlId="search">
                  <Form.Label>Tìm kiếm mã khám bệnh</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Nhập mã khám bệnh..."
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                  />
                </Form.Group>
              </Form>
              <Table className="table table-bordered text-center mt-3">
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Mã Khám Bệnh</th>
                    <th scope="col">Ngày Tạo Sổ</th>
                    <th scope="col">Xem Chi Tiết</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredRecords.map((record, index) => (
                    <tr key={index}>
                      <td>{record.recordId}</td>
                      <td>{record.creationDate}</td>
                      <td>
                        <Button variant="info" onClick={() => handleViewDetails(record.recordId)}>
                          Xem Chi Tiết
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default PatientList;
