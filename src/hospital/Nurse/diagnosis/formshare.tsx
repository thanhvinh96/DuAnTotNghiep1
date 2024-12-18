import React, { useEffect, useState } from "react";
import { Row, Col, Card, Table } from "react-bootstrap";
import jwt_decode from 'jwt-decode';

// components
import PageTitle from "../../../components/PageTitle";
import { GetHistoryMedicalDetail,ShareGetHistoryMedicalDetail } from "../../../controller/MedicalController";
import jwtDecode from 'jwt-decode';
import {ShowInfoMedicalBycccd} from "../../../controller/MedicalController";
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
  const tokens = localStorage.getItem('tokenadmin');
 let decoded: any = null;

        if (tokens) {
            try {
                decoded = jwt_decode(tokens);
                console.log('Giá trị của tokenuser:', decoded);
            } catch (error) {
                console.error("Token không hợp lệ hoặc lỗi khi giải mã:", error);
            }
        }
  const [datacheckprofile, setdatacheckprofile] = useState({
    tokenmedical: '',
    cccd: '',
  });

  const getQueryParam = (param: string) => {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
};

  const code = getQueryParam('key');
  const token = localStorage.getItem('jwtToken');
    const [dataccdByshare,setdataccdByshare] = useState({
        tokeorg: '',
        tokenbranch: '',        
        diseasecode: '',
        cccd: '',

    });
  useEffect(() => {
    if (token) {
      try {
        const decodedToken: any = jwtDecode(token);
        setdatacheckprofile({
          tokenmedical: decodedToken.tokenmedical,
          cccd: decodedToken.cccd,
        });
      } catch (err) {
        console.error("Invalid token:", err);
      }
    }
  }, [token]);
  const postData = async(code:any)=>{
    const data = {
        medicalRecordCode:code
    }
    const req:any =await ShowInfoMedicalBycccd(data);
    console.log("hia tri"+req['data'])
    setdataccdByshare({
        tokeorg:decoded['tokeorg'] ,
        tokenbranch:decoded['branch'] ,        
        diseasecode: req['data'].diseasecode ,
        cccd: req['data'].cccd, 
    })
    // console.log(req)
  }
  useEffect(()=>{
    postData(code)
  },[code])


    useEffect(() => {
      const fetchData = async () => {
        // Kiểm tra xem các giá trị cần thiết đã có chưa
        if (!dataccdByshare.cccd || !dataccdByshare.tokeorg || !dataccdByshare.tokenbranch || !code) {
          console.error("Dữ liệu chưa đầy đủ để gọi ShareGetHistoryMedicalDetail");
          return;
        }
    
        try {
          const data = {
            cccd: dataccdByshare.cccd,
            tokeorg: dataccdByshare.tokeorg,
            tokenbranch: dataccdByshare.tokenbranch,
            diseasecode: code,
          };
          console.clear();
          console.log("Đang gọi ShareGetHistoryMedicalDetail với dữ liệu:", data);
    
          // Gọi API
          const res = await ShareGetHistoryMedicalDetail(data);
          console.log("Dữ liệu trả về từ ShareGetHistoryMedicalDetail:", res);
    
          // Xử lý dữ liệu trả về
          const rawData = res?.data?.diseaseInfo?.data;
          try {
            const medicalData = JSON.parse(rawData); // Chuyển chuỗi JSON thành đối tượng
            setMedicalData(medicalData);
          } catch (error) {
            console.error("Lỗi khi phân tích JSON:", error);
          }
        } catch (error) {
          console.error("Lỗi khi gọi API ShareGetHistoryMedicalDetail:", error);
        }
      };
    
      fetchData();
    }, [dataccdByshare, code]);
    

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
                  <p><strong>Họ tên:</strong> {medicalData.patientInfo?.fullname}</p>
                  <p><strong>Ngày sinh:</strong> {medicalData.patientInfo?.birthday}</p>
                  <p><strong>Địa chỉ:</strong> {medicalData.patientInfo?.address}</p>
                  <p><strong>Số bảo hiểm:</strong> {medicalData.patientInfo?.sobh}</p>
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
                                        {record.diagnosis_info?.symptom}
                                      </td>
                                      <td rowSpan={record.exam_records.length}>
                                        {record.diagnosis_info?.conclusion}
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
