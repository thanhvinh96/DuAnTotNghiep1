import React, { useEffect, useState } from "react";
import { Row, Col, Card, Table } from "react-bootstrap";
import jwtDecode from 'jwt-decode';
import { useLocation } from 'react-router-dom';

// components
import PageTitle from "../../components/PageTitle";
import { GetHistoryMedicalShareHospital } from "../../controller/MedicalController";

type RecordType = {
  exam_records: ExamType[];
  patient_image?: string;
  diagnosis_info: {
    symptom: string;
    conclusion: string;
  };
};

type ExamType = {
  examination: string;
  result: string;
};

const MedicalRecordDetail: React.FC = (): JSX.Element => {
  const [medicalData, setMedicalData] = useState<any>(null);
    const location =useLocation();
    const getQueryParam =()=>{
        const queryparams  = new URLSearchParams(location.search);
        const code = queryparams.get('code');
        const cccd = queryparams.get('cccd');
        return {code,cccd}
    }
    const { code, cccd } = getQueryParam();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('tokenadmin');
        if (token) {
            const decodedToken: any = jwtDecode(token);
            console.log(decodedToken);
        const data ={
            "cccd":cccd,
            "tokeorg": decodedToken['tokeorg'],
            "tokenbranch": decodedToken['branch'],
            "diseasecode":code
        };
        const res = await GetHistoryMedicalShareHospital(data);
        const parsedData = JSON.parse(res.data.diseaseDetail.data);
        console.log(parsedData.examinationHistory);
        setMedicalData(parsedData);}
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <PageTitle
        breadCrumbItems={[{ label: "Phiếu Khám Bệnh", path: "/medical/record/detail" }]}
        title="Phiếu Khám Bệnh Chi Tiết"
      />

      <Row>
        <Col lg={12}>
          {medicalData ? (
            <>
              <Card>
                <Card.Body>
                  <h5>Thông tin bệnh nhân tại bệnh viện {medicalData.hospitalName}</h5>
                  <p><strong>Họ tên:</strong> {medicalData.patientInfo.fullname}</p>
                  <p><strong>Ngày sinh:</strong> {medicalData.patientInfo.birthday}</p>
                  <p><strong>Địa chỉ:</strong> {medicalData.patientInfo.address}</p>
                  <p><strong>Số bảo hiểm:</strong> {medicalData.patientInfo.sobh}</p>
                </Card.Body>
              </Card>

             
              <Card>
              <Card.Body>
              <div className="mb-4 mt-3">
                <h5>Quá Trình Khám Bệnh</h5>
                <Table bordered responsive className="text-center">
                  <thead className="thead-light">
                    <tr>
                      <th>STT</th>
                      <th>Chuyên Mục Khám</th>
                      <th>Kết Quả</th>
                      <th>Hình Ảnh</th>
                      <th>Triệu Chứng</th>
                      <th>Kết Luận</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Array.isArray(medicalData.examinationHistory) && medicalData.examinationHistory.length > 0 ? (
                      medicalData.examinationHistory.map((record: RecordType, index: number) => (
                        <React.Fragment key={index}>
                          {record.exam_records.map((exam: ExamType, examIndex: number) => (
                            <tr key={examIndex}>
                              <td>{index + 1}</td>
                              <td>{exam.examination}</td>
                              <td>{exam.result}</td>
                              {examIndex === 0 && (
                                <>
                                  <td rowSpan={record.exam_records.length}>
                                    {record.patient_image && (
                                      <img
                                        src={record.patient_image}
                                        alt="Patient"
                                        className="small-image"
                                        style={{ cursor: "pointer", width: "100px", height: "100px" }}
                                      />
                                    )}
                                  </td>
                                  <td rowSpan={record.exam_records.length}>
                                    {record.diagnosis_info.symptom}
                                  </td>
                                  <td rowSpan={record.exam_records.length}>
                                    {record.diagnosis_info.conclusion}
                                  </td>
                                </>
                              )}
                            </tr>
                          ))}
                        </React.Fragment>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={6}>Không có dữ liệu</td>
                      </tr>
                    )}
                  </tbody>
                </Table>
              </div>
              </Card.Body>
              </Card>
              <Card>
                <Card.Body>
                  <h5>Đơn Thuốc</h5>
                  <Table striped bordered hover>
                    <thead>
                      <tr>
                        <th>Tên Thuốc</th>
                        <th>Giá trị tham chiếu</th>
                        <th>Kết quả</th>
                        <th>Đơn vị</th>
                        <th>Máy xét nghiệm</th>
                      </tr>
                    </thead>
                    <tbody>
                      {Array.isArray(medicalData.Prescription) && medicalData.Prescription.length > 0 ? (
                        medicalData.Prescription.map((item: any, index: number) => (
                          <tr key={index}>
                            <td>{item.testName}</td>
                            <td>{item.referenceValue}</td>
                            <td>{item.result}</td>
                            <td>{item.unit}</td>
                            <td>{item.machine}</td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={5}>Không có kết quả xét nghiệm</td>
                        </tr>
                      )}
                    </tbody>
                  </Table>
                </Card.Body>
              </Card>

              <Card>
                <Card.Body>
                  <h5>Kết luận:</h5>
                  <p><strong>Chẩn đoán:</strong> {medicalData.conclusion?.diagnosis}</p>
                  <p><strong>Phương án điều trị:</strong> {medicalData.conclusion?.treatment}</p>
                  <p><strong>Ghi chú thêm:</strong> {medicalData.conclusion?.additionalNotes}</p>
                </Card.Body>
              </Card>
            </>
          ) : (
            <p>Đang tải dữ liệu...</p>
          )}
        </Col>
      </Row>
    </>
  );
};

export default MedicalRecordDetail;
