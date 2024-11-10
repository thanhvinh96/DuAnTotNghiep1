import React, { useState, useEffect } from 'react';
import { Table, Row, Col, Card } from 'react-bootstrap';
import PageTitle from "../../../components/PageTitle";

const Medicalhistorydetail: React.FC = () => {
    const [conclusionData, setConclusionData] = useState({
        diagnosis: '',
        treatment: '',
        followUp: '',
        additionalNotes: '',
        images: []
    });
    const [cccd, setCccd] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [patientData, setPatientInfo] = useState<any>({});
    const [medicalData, setMedicalData] = useState<any[]>([]);
    const [prescriptionData, setprescriptionData] = useState<any[]>([]);
    const [conclusionDatas, setConclusionDatas] = useState({
        diagnosis: '',
        treatment: '',
        followUp: '',
        additionalNotes: '',
        images: []
    });
        const [previewImages, setPreviewImages] = useState<string[]>([]);

    const handleAccessPatientInfo = async (patientId: any) => {
        try {
            const response = await fetch("http://127.0.0.1:8000/api/medical/code", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ medicalRecordCode: patientId })
            });
            const data = await response.json();
            if (response.ok) {
                setPatientInfo({
                    fullname: data.data.fullname,
                    birthday: data.data.birthday,
                    address: data.data.address,
                    sobh: data.data.sobh,
                    tokenmedical: data.data.tokenmedical,
                    sex: data.data.sex,
                    weight: data.data.weight,
                    height: data.data.height,
                    email: data.data.email,
                    phoneNumber: data.data.phoneNumber,
                    cccd: data.data.cccd,
                    avatar: data.data.avatar || "https://via.placeholder.com/100"
                });
                setError(null);
            } else {
                setError(data.message || "Không tìm thấy thông tin bệnh nhân.");
            }
        } catch (error) {
            console.error("Error fetching patient info:", error);
            setError("Đã xảy ra lỗi khi lấy thông tin bệnh nhân.");
        }
    };

    const showdata = async (patientId: any) => {
        try {
            const response = await fetch("http://127.0.0.1:8000/api/medicaldata/bycode", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ medicalRecordCode: patientId })
            });
            const data = await response.json();
            setMedicalData(data.data);
        } catch (error) {
            console.error("Error fetching medical data:", error);
            setError("Đã xảy ra lỗi khi lấy thông tin khám bệnh.");
        }
    };
    const showdatadetail = async (patientId: any) => {
        try {
            const response = await fetch("http://127.0.0.1:8000/api/medicalconclusion/getbycode", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ diseasecodes: patientId })
            });
            const data = await response.json();
            console.log(data.data[0].newData.Prescription)
            setprescriptionData(data.data[0].newData.Prescription)
            setConclusionDatas(data.data[0].newData.conclusion)
            // setMedicalData(data.data);
        } catch (error) {
            console.error("Error fetching medical data:", error);
            setError("Đã xảy ra lỗi khi lấy thông tin khám bệnh.");
        }
    }

    const getQueryParam = (param: string) => {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(param);
    };

    useEffect(() => {
        const patientId = getQueryParam('patient');
        if (patientId) {
            setCccd(patientId);
            handleAccessPatientInfo(patientId);
            showdata(patientId);
            showdatadetail(patientId);
        }
    }, []);

    return (
        <>
            <PageTitle
                breadCrumbItems={[
                    { label: "Tables", path: "/features/tables/advanced" },
                    { label: "Information hospital", path: "/features/tables/advanced", active: true }
                ]}
                title={"Danh Sách Hồ Sơ Bệnh Án"}
            />
            
            {patientData && (
                <Card className="p-3 mt-3">
                    <h5>Thông tin bệnh nhân</h5>
                    <Row>
                        <Col md={6}>
                            <p><strong>Họ tên:</strong> {patientData.fullname}</p>
                            <p><strong>Ngày sinh:</strong> {patientData.birthday}</p>
                            <p><strong>Địa chỉ:</strong> {patientData.address}</p>
                            <p><strong>Số BH:</strong> {patientData.sobh}</p>
                            <p><strong>Số CCCD:</strong> {patientData.cccd}</p>
                            <p><strong>Token Medical:</strong> {patientData.tokenmedical}</p>
                        </Col>
                        <Col md={6}>
                            <p><strong>Giới tính:</strong> {patientData.sex}</p>
                            <p><strong>Cân nặng:</strong> {patientData.weight} kg</p>
                            <p><strong>Chiều cao:</strong> {patientData.height} cm</p>
                            <p><strong>Email:</strong> {patientData.email}</p>
                            <p><strong>Số điện thoại:</strong> {patientData.phoneNumber}</p>
                        </Col>
                    </Row>
                    <Row className="mt-3">
                        <Col className="d-flex justify-content-center">
                            <img 
                                src={patientData.avatar} 
                                alt="Avatar của bệnh nhân" 
                                style={{ width: '100px', height: '100px', borderRadius: '50%' }}
                            />
                        </Col>
                    </Row>
                </Card>
            )}

<Card className="p-3 mt-3">
                    <Row>
            <div className="mb-4 mt-3">
                <h5>Quá Trình Khám Bệnh</h5>
                <Table bordered responsive className="text-center">
                    <thead className="thead-light">
                        <tr>
                            <th>STT</th>
                            <th>Chuyên Mục Khám</th>
                            <th>Kết Quả</th>
                            <th>Triệu Chứng</th>
                            <th>Kết Luận</th>
                        </tr>
                    </thead>
                    <tbody>
                        {medicalData && medicalData.length > 0 ? (
                            medicalData.map((record, index) => (
                                <React.Fragment key={index}>
                                    {record.exam_records && record.exam_records.map((exam: any, examIndex: number) => (
                                        <tr key={examIndex}>
                                            <td>{index + 1}</td>
                                            <td>{exam.examination}</td>
                                            <td>{exam.result}</td>
                                            {examIndex === 0 && record.diagnosis_info && (
                                                <>
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
                                <td colSpan={5}>Không có dữ liệu</td>
                            </tr>
                        )}
                    </tbody>
                </Table>
           
            </div>
            </Row>

            </Card>
            <Card className="p-3 mt-3">
            <h5>Đơn Thuốc</h5>
            <Table bordered responsive className="text-center">
                <thead className="thead-light">
                    <tr>
                        <th>STT</th>
                        <th>Tên Thuốc</th>
                        <th>Giá Trị Tham Khảo</th>
                        <th>Kết Quả</th>
                        <th>Đơn Vị</th>
                        <th>Máy</th>
                    </tr>
                </thead>
                <tbody>
                    {prescriptionData && prescriptionData.length > 0 ? (
                        prescriptionData.map((item, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{item.testName}</td>
                                <td>{item.referenceValue}</td>
                                <td>{item.result}</td>
                                <td>{item.unit}</td>
                                <td>{item.machine || "Không có"}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={6}>Không có đơn thuốc nào</td>
                        </tr>
                    )}
                </tbody>
            </Table>
        </Card>
        <Card className="p-3 mt-3">
        <h5>Kết Luận Cuối Cùng</h5>
            <Row>
                <Col md={6}>
                    <p><strong>Chẩn đoán:{conclusionDatas.additionalNotes}</strong> </p>
                    <p><strong>Điều trị:{conclusionDatas.diagnosis}</strong> </p>
                </Col>
                <Col md={6}>
                    <p><strong>Hẹn tái khám:{conclusionDatas.followUp}</strong> </p>
                    <p><strong>Ghi chú thêm:{conclusionDatas.treatment
                    }</strong> </p>
                </Col>
            </Row>
        </Card>
        </>
    );
};

export default Medicalhistorydetail;
