import React, { useEffect, useState } from "react";
import { Row, Col, Card, Table } from "react-bootstrap";

// components
import PageTitle from "../../components/PageTitle";
import { GetHistoryMedicalDetail } from "../../controller/MedicalController";

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = {
          cccd: "0869895748",
          tokenmedical: "b1f5c5a9d6c40afdc5e428c4051cf033c748fd491d13fcbdeb76f0bc257fc2b2",
          diseasecode: "3ca539b5a10bd53c8ba6"
        };
        const res = await GetHistoryMedicalDetail(data);
        const parsedData = JSON.parse(res.data.diseaseDetail.data);
        console.log(parsedData.examinationHistory);
        setMedicalData(parsedData);
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
                  <h5>Chi tiết khám bệnh</h5>
                  <Table striped bordered hover>
                    <thead>
                      <tr>
                        <th>Chuyên Mục</th>
                        <th>Kết Mục</th>
                      </tr>
                    </thead>
                    <tbody>
                      {Array.isArray(medicalData.examinationHistory) && medicalData.examinationHistory.length > 0 ? (
                        medicalData.examinationHistory.map((historyItem: any, index: number) => (
                          <React.Fragment key={index}>
                            {Array.isArray(historyItem.exam_records) && historyItem.exam_records.length > 0 ? (
                              historyItem.exam_records.map((item: any, idx: number) => (
                                <tr key={idx}>
                                  <td>{item.examination}</td>
                                  <td>{item.result}</td>
                                </tr>
                              ))
                            ) : (
                              <tr>
                                <td colSpan={2}>Không có kết quả xét nghiệm</td>
                              </tr>
                            )}
                          </React.Fragment>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={2}>Không có lịch sử khám bệnh</td>
                        </tr>
                      )}
                    </tbody>
                  </Table>

                  {Array.isArray(medicalData.examinationHistory) &&
                    medicalData.examinationHistory.map((historyItem: any, index: number) => (
                      <div key={index}>
                        <p><strong>Triệu chứng:</strong> {historyItem.diagnosis_info.symptom}</p>
                        <p><strong>Kết quả:</strong> {historyItem.diagnosis_info.conclusion}</p>
                      </div>
                    ))}
                </Card.Body>
              </Card>

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
