import React, { useState, useEffect } from 'react';
import { Form, Row, Col, Button, Table, Card, Alert, Image } from 'react-bootstrap';
import PageTitle from "../../../components/PageTitle";
import jwt_decode from 'jwt-decode';
import { PushDataMedical } from "../../../controller/MedicalController"; // Import controller
import CreateAppointment from "../../hospitalbranch/CreateAppointment"; // Import controller

import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
// Define types for props and state
interface PatientInfo {
    fullname: string;
    birthday: string;
    address: string;
    sobh: string;
    tokenmedical: string;
    sex: string;
    weight: string;
    height: string;
    email: string;
    phoneNumber: string;
    cccd: string;
    fieldsToShare: string[];
    avatar: string;
}

interface MedicalData {
    // Define structure based on the API response you expect
    [key: string]: any; // Placeholder for actual data fields
}

interface ConclusionFormProps {
    onSubmit: (resultData: any) => void;
    patientInfo?: PatientInfo;
    examinationHistory?: MedicalData[];
}

interface ConclusionData {
    diagnosis: string;
    treatment: string;
    followUp: string;
    additionalNotes: string;
    images: File[]; // Store the images as files
}

const ConclusionForm: React.FC<ConclusionFormProps> = ({ onSubmit, patientInfo = {}, examinationHistory = [] }) => {
    const MySwal = withReactContent(Swal);
    // Hàm để thêm dòng mới vào bảng
    const addRow = () => {
        setTableData([...tableData, { testName: '', referenceValue: '', result: '', unit: '', machine: '' }]);
    };

    const [tableData, setTableData] = useState<{ testName: string; referenceValue: string; result: string; unit: string; machine: string }[]>([]);
    const [conclusionData, setConclusionData] = useState<ConclusionData>({
        diagnosis: '',
        treatment: '',
        followUp: '',
        additionalNotes: '',
        images: []
    });
    const [cccd, setCccd] = useState<string>('');
    const [error, setError] = useState<string | null>(null);
    const [patientData, setPatientInfo] = useState<PatientInfo>({} as PatientInfo);
    const [medicalData, setMedicalData] = useState<MedicalData[]>([]);
    const [previewImages, setPreviewImages] = useState<string[]>([]); // Store preview images

    const showdata = async (patientId: string) => {
        try {
            const response = await fetch("http://127.0.0.1:8000/api/medicaldata/bycode", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ medicalRecordCode: patientId })
            });
            const data = await response.json();
            setMedicalData(data.data); // Save data into state
            setError(null);
        } catch (error) {
            console.error("Error fetching medical data:", error);
            setError("Đã xảy ra lỗi khi lấy thông tin khám bệnh.");
        }
    };

    const handleAccessPatientInfo = async (patientId: string) => {
        try {
            const response = await fetch("http://127.0.0.1:8000/api/medical/code", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ medicalRecordCode: patientId })
            });

            const data = await response.json();
            console.log(data.data.fieldsToShare)
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
                    fieldsToShare: data.data.fieldsToShare,
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
        }
    }, []);

    const handleInputChange = (field: keyof ConclusionData, value: string) => {
        setConclusionData({ ...conclusionData, [field]: value });
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const files = Array.from(e.target.files);
            setConclusionData({ ...conclusionData, images: files });
            setPreviewImages(files.map(file => URL.createObjectURL(file))); // Show preview images
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const loadingSwal: any = MySwal.fire({
            title: 'Please wait...',
            text: 'Login Hospital, please wait!',
            icon: 'info',
            allowOutsideClick: false,
            showConfirmButton: false,
            didOpen: () => {
                Swal.showLoading();
            },
        });
        const token = localStorage.getItem('tokenadmin');
        let decoded: any = null;

        if (token) {
            try {
                decoded = jwt_decode(token);
                console.log('Giá trị của tokenuser:', decoded['tokenuser']);
            } catch (error) {
                console.error("Token không hợp lệ hoặc lỗi khi giải mã:", error);
            }
        }

        if (!decoded) {
            console.error("Không thể lấy dữ liệu từ token.");
            return;
        }

        const hospitalName = "Bệnh viện Đa khoa Tỉnh";
        const patientId = getQueryParam('patient');

        const resultData = {
            tokeorg: decoded['tokeorg'] || "",
            tokenbranch: decoded['branch'] || "",
            doctor: decoded['tokenuser'] || "",
            diseasecodes: patientId || "",
            namedisease: conclusionData.diagnosis || "",
            cccd: patientData.cccd || "",
            newData: {
                Prescription: tableData || [],
                examinationHistory: medicalData || [],
                hospitalName: decoded['nameorg'] || hospitalName,
                patientInfo: patientData || {},
                conclusion: {
                    ...conclusionData,
                    images: conclusionData.images ? conclusionData.images.map((file) => file.name) : []
                }
            }
        };

        try {
            const _res = await PushDataMedical(resultData);
            loadingSwal.close();

            console.log("Dữ liệu kết luận và bệnh nhân:", _res);
            Swal.fire({
                title: 'Thêm Dữ liệu thành công!',
                text: 'Bạn muốn ở lại trang này hay chuyển đến trang chủ?',
                icon: 'success',
                showCancelButton: true,
                confirmButtonText: 'Chuyển đến trang chủ',
                cancelButtonText: 'Ở lại trang',
            }).then((result) => {
                if (result.isConfirmed) {
                    window.location.href = '/doctor/home';
                }
            });
            onSubmit(resultData);
        } catch (error) {
            Swal.fire({
                title: 'Thất Bại!',
                text: 'Thêm Dữ Thất Bại.',
                icon: 'error',
                confirmButtonText: 'OK',
            });
            console.error("Error in PushDataInHospital handler:", error);
        }
    };

    const handlePrescriptionChange = (index: number, field: keyof typeof tableData[0], value: string) => {
        const newTableData = [...tableData];
        newTableData[index][field] = value;
        setTableData(newTableData);
    };

    return (
        <>

            {/* <PageTitle
                breadCrumbItems={[
                    { label: "Tables", path: "/features/tables/advanced" },
                    {
                        label: "Chuẩn đoán Kết Luận Bệnh Nhân",
                        path: "/features/tables/advanced",
                        active: true,
                    },
                ]}
                title={"Chuẩn đoán Kết Luận Bệnh Nhân"}
            /> */}
            <CreateAppointment/>
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
                    {patientData.fieldsToShare && (
                        <Col md={12}>
                            <Form.Label>Lịch sử bệnh nhân đã khám</Form.Label>
                            <Form onSubmit={handleSubmit}>
                                <Table className='table table-bordered text-center mt-5'>
                                    <thead className="thead-light">
                                        <tr>
                                            <th scope="col">STT</th>
                                            <th scope="col">Mã bệnh</th>
                                            <th scope="col">Tên Bệnh</th>
                                            <th scope="col">Hành Động</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {/* Chuyển đổi fieldsToShare thành mảng các cặp key-value */}
                                        {Object.entries(patientData.fieldsToShare).map(([key, value], index) => (
                                            <tr key={index}>
                                                <td>{index + 1}</td>
                                                <td>{key}</td> {/* Hiển thị mã bệnh */}
                                                <td>{value}</td> {/* Hiển thị tên bệnh (chuẩn đoán) */}
                                                <td>
                                                    <a
                                                        href={`./hospital/medical-share?code=${key}&cccd=${patientData.cccd}`}
                                                        style={{ fontSize: '12px', padding: '4px 10px', width: '150px', display: 'inline-block', textAlign: 'center', textDecoration: 'none', color: '#fff', backgroundColor: '#007bff', borderRadius: '4px' }}
                                                    >
                                                        Xem chi tiết bệnh
                                                    </a>

                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>

                            </Form>
                        </Col>
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
                                    <p><strong>Số cccd:</strong> {patientData.sobh}</p>
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
                    {/* <p>{patientData.fieldsToShare}</p> */}

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
                                {medicalData.length > 0 ? (
                                    medicalData.map((record, index) => (
                                        <React.Fragment key={index}>
                                            {record.exam_records.map((exam: any, examIndex: any) => (
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
                                                                        style={{ cursor: 'pointer', width: '100px', height: '100px' }}
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
                                        <td >Không có dữ liệu</td>
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
                        <Col md={12}>
                            <Form.Label>them don thuoc</Form.Label>
                            <Form onSubmit={handleSubmit}>
                                <Table className='table table-bordered text-center mt-5'>
                                    <thead className="thead-light">
                                        <tr>
                                            <th scope="col">STT</th>
                                            <th scope="col">Tên thuốc</th>
                                            <th scope="col">ĐVT</th>
                                            <th scope="col">Số Lượng</th>
                                            <th scope="col">Cách Dùng</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {tableData.map((item, index) => (
                                            <tr key={index}>
                                                <td>{index + 1}</td>
                                                <td>
                                                    <Form.Control
                                                        type="text"
                                                        value={item.testName}
                                                        onChange={(e) => handlePrescriptionChange(index, 'testName', e.target.value)}
                                                    />
                                                </td>
                                                <td>
                                                    <Form.Control
                                                        type="text"
                                                        value={item.referenceValue}
                                                        onChange={(e) => handlePrescriptionChange(index, 'referenceValue', e.target.value)}
                                                    />
                                                </td>
                                                <td>
                                                    <Form.Control
                                                        type="text"
                                                        value={item.result}
                                                        onChange={(e) => handlePrescriptionChange(index, 'result', e.target.value)}
                                                    />
                                                </td>
                                                <td>
                                                    <Form.Control
                                                        type="text"
                                                        value={item.unit}
                                                        onChange={(e) => handlePrescriptionChange(index, 'unit', e.target.value)}
                                                    />
                                                </td>
                                                
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>
                                <div className="d-flex justify-content-between mt-3">
                                    <Button onClick={addRow} style={{ fontSize: '12px', padding: '4px 10px', width: '150px' }}>Thêm dòng</Button>
                                    <Button type="submit" style={{ fontSize: '12px', padding: '4px 10px', width: '150px' }}>Lưu kết quả</Button>
                                </div>
                            </Form>

                        </Col>

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
