import React, { useState, useEffect } from 'react';
import { Form, Row, Col, Button, Table, Card, Alert, Image } from 'react-bootstrap';
import PageTitle from "../../../components/PageTitle";
import jwt_decode from 'jwt-decode';

const ConclusionForm = ({ onSubmit, patientInfo = {}, examinationHistory = [] }) => {
    const [conclusionData, setConclusionData] = useState({
        diagnosis: '',
        treatment: '',
        followUp: '',
        additionalNotes: '',
        images: [] // Thêm state để lưu trữ hình ảnh tải lên
    });
    const [cccd, setCccd] = useState('');
    const [error, setError] = useState(null);
    const [patientData, setPatientInfo] = useState({});
    const [medicalData, setMedicalData] = useState([]);
    const [previewImages, setPreviewImages] = useState([]); // State để lưu trữ ảnh xem trước

    const showdata = async (patientId) => {
        try {
            const response = await fetch("http://127.0.0.1:8000/api/medicaldata/bycode", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ medicalRecordCode: patientId })
            });
            const data = await response.json();
            setMedicalData(data.data); // Lưu dữ liệu vào state
            setError(null);
        } catch (error) {
            console.error("Error fetching medical data:", error);
            setError("Đã xảy ra lỗi khi lấy thông tin khám bệnh.");
        }
    };

    const handleAccessPatientInfo = async (patientId) => {
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

    const getQueryParam = (param) => {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(param);
    };

    useEffect(() => {
        const patientId = getQueryParam('patient');
        if (patientId) {
            setCccd(patientId);
            handleAccessPatientInfo(patientId);
            showdata(patientId);
        }
    }, []);

    const handleInputChange = (field, value) => {
        setConclusionData({ ...conclusionData, [field]: value });
    };

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);
        setConclusionData({ ...conclusionData, images: files });
        setPreviewImages(files.map(file => URL.createObjectURL(file))); // Hiển thị ảnh xem trước
    };

    const handleSubmit = (e) => {
        e.preventDefault();
    
        // Lấy token từ localStorage
        const token = localStorage.getItem('tokenadmin');
        let decoded = null;
        
        // Giải mã token nếu có
        if (token) {
            try {
                decoded = jwt_decode(token);
                console.log('Giá trị của tokenuser:', decoded['tokenuser']);
            } catch (error) {
                console.error("Token không hợp lệ hoặc lỗi khi giải mã:", error);
            }
        }
    
        // Kiểm tra xem decoded có dữ liệu không
        if (!decoded) {
            console.error("Không thể lấy dữ liệu từ token.");
            return; // Dừng lại nếu không có dữ liệu từ token
        }
    
        // Giả sử tên bệnh viện là một giá trị cố định hoặc được lấy từ một nguồn khác
        const hospitalName = "Bệnh viện Đa khoa Tỉnh"; // Bạn có thể thay bằng tên bệnh viện cụ thể
    
        // Gom tất cả dữ liệu thành một đối tượng duy nhất trong key "reportData"
        const resultData = {
            reportData: {
                tokeorg: decoded['tokeorg'] || "", // Kiểm tra tồn tại của trường
                branch: decoded['branch'] || "",   // Kiểm tra tồn tại của trường
                doctor: decoded['tokenuser'] || "",// Kiểm tra tồn tại của trường
                examinationHistory: medicalData,   // Lịch sử khám bệnh
                hospitalName: decoded['nameorg']||"",        // Tên bệnh viện khám
                patientInfo: patientData,          // Thông tin bệnh nhân
                conclusion: {                      // Dữ liệu kết luận
                    ...conclusionData,
                    images: conclusionData.images.map((file) => file.name), // Chỉ lấy tên tệp cho dễ hiển thị
                }
            }
        };
    
        console.log("Dữ liệu kết luận và bệnh nhân:", resultData);
        
        // Thực hiện gửi dữ liệu nếu cần
        onSubmit(resultData); // Gọi hàm onSubmit với đối tượng gom toàn bộ dữ liệu
    };
    
    
    return (
        <>
            <PageTitle
                breadCrumbItems={[
                    { label: "Tables", path: "/features/tables/advanced" },
                    {
                        label: "Chuẩn đoán Kết Luận Bệnh Nhân",
                        path: "/features/tables/advanced",
                        active: true,
                    },
                ]}
                title={"Chuẩn đoán Kết Luận Bệnh Nhân"}
            />
            <Card className="border p-4 mt-4">
                <Form onSubmit={handleSubmit}>
                    <h4>Chuyên Mục Khám và Kết quả</h4>

                    {/* Form nhập CCCD */}
                    {!patientData && (
                        <Row className="mb-3">
                            <Col md={6}>
                                <Form.Label>CCCD của Bệnh nhân</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Nhập CCCD của bệnh nhân"
                                    value={cccd}
                                    onChange={(e) => setCccd(e.target.value)}
                                />
                            </Col>
                            <Col md={6} className="d-flex align-items-end">
                                <Button 
                                    variant="primary" 
                                    onClick={() => handleAccessPatientInfo(cccd)}
                                    style={{ fontSize: '12px', padding: '6px 12px' }}
                                >
                                    Truy cập thông tin bệnh nhân
                                </Button>
                            </Col>
                        </Row>
                    )}

                    {/* Thông tin bệnh nhân */}
                    {patientData && (
                        <Card className="p-3 mt-3">
                            <h5>Thông tin bệnh nhân</h5>
                            <Row>
                                <Col md={6}>
                                    <p><strong>Họ tên:</strong> {patientData.fullname}</p>
                                    <p><strong>Ngày sinh:</strong> {patientData.birthday}</p>
                                    <p><strong>Địa chỉ:</strong> {patientData.address}</p>
                                    <p><strong>Số BH:</strong> {patientData.sobh}</p>
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

                    {error && (
                        <Alert variant="danger" className="mt-3">
                            {error}
                        </Alert>
                    )}

                    {/* Quá trình khám bệnh */}
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
                                {medicalData.length > 0 ? (
                                    medicalData.map((record, index) => (
                                        <React.Fragment key={index}>
                                            {record.exam_records.map((exam, examIndex) => (
                                                <tr key={examIndex}>
                                                    <td>{index + 1}</td>
                                                    <td>{exam.examination}</td>
                                                    <td>{exam.result}</td>
                                                    {examIndex === 0 && (
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
                                        <td colSpan="5">Không có dữ liệu</td>
                                    </tr>
                                )}
                            </tbody>
                        </Table>
                    </div>

                    {/* Kết luận cuối cùng */}
                    <h5>Kết Luận Cuối Cùng của Bác Sĩ</h5>
                    
                    <Row className="mb-3">
                        <Col md={12}>
                            <Form.Label>Chẩn đoán cuối cùng</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                placeholder="Nhập chẩn đoán cuối cùng"
                                value={conclusionData.diagnosis}
                                onChange={(e) => handleInputChange('diagnosis', e.target.value)}
                            />
                        </Col>
                    </Row>

                    <Row className="mb-3">
                        <Col md={12}>
                            <Form.Label>Phương pháp điều trị</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                placeholder="Nhập phương pháp điều trị hoặc đơn thuốc"
                                value={conclusionData.treatment}
                                onChange={(e) => handleInputChange('treatment', e.target.value)}
                                />
                                </Col>
                            </Row>
        
                            <Row className="mb-3">
                                <Col md={12}>
                                    <Form.Label>Hẹn tái khám</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Nhập lịch hẹn tái khám nếu cần"
                                        value={conclusionData.followUp}
                                        onChange={(e) => handleInputChange('followUp', e.target.value)}
                                    />
                                </Col>
                            </Row>
        
                            <Row className="mb-3">
                                <Col md={12}>
                                    <Form.Label>Ghi chú thêm</Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        rows={3}
                                        placeholder="Nhập ghi chú bổ sung nếu có"
                                        value={conclusionData.additionalNotes}
                                        onChange={(e) => handleInputChange('additionalNotes', e.target.value)}
                                    />
                                </Col>
                            </Row>
                            
                            {/* Trường tải lên hình ảnh */}
                            {/* <Row className="mb-3">
                                <Col md={12}>
                                    <Form.Label>Hình ảnh kết quả khám (nếu có)</Form.Label>
                                    <Form.Control
                                        type="file"
                                        multiple
                                        onChange={handleFileChange}
                                    />
                                    <div className="mt-3 d-flex flex-wrap">
                                        {previewImages.map((image, index) => (
                                            <Image 
                                                key={index} 
                                                src={image} 
                                                alt={`Hình ảnh kết quả ${index + 1}`} 
                                                rounded 
                                                style={{ width: '100px', height: '100px', marginRight: '10px', marginBottom: '10px' }}
                                            />
                                        ))}
                                    </div>
                                </Col>
                            </Row> */}
                            
                            <div className="d-flex justify-content-end mt-3">
                                <Button type="submit" variant="primary" style={{ fontSize: '14px', padding: '6px 12px' }}>
                                    Lưu Kết Luận
                                </Button>
                            </div>
                        </Form>
                    </Card>
                </>
            );
        };
        
        export default ConclusionForm;
        