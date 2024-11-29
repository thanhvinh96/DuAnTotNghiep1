import React, { useState, useEffect } from 'react';
import { Form, Row, Col, Button, Table, Card, Alert } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import jwt_decode from 'jwt-decode';
import FileUploader from "../../../components/FileUploader";

const MedicalForm = ({ onSubmit }) => {
    const MySwal = withReactContent(Swal);
    const [patientImage, setPatientImage] = useState(null);

    const [tableData, setTableData] = useState([]);
    const [symptomData, setSymptomData] = useState({ symptom: '', conclusion: '' });
    const [cccd, setCccd] = useState('');
    const [patientInfo, setPatientInfo] = useState(null);
    const [addedData, setAddedData] = useState(null); // State để lưu dữ liệu sau khi thêm
    const [error, setError] = useState(null);
    const [tokeorg,settokeorg] = useState(null);
    const [tokenbranch,settokenbranch] = useState(null);
    const [tokenuser,settokenuser] = useState(null);
    const location = useLocation();

    const getQueryParam = (param) => {
        const urlParams = new URLSearchParams(location.search);
        return urlParams.get(param);
    };
    const getRoleFromToken = () => {
        const token = localStorage.getItem('tokenadmin');
        if (token) {
          const decoded = jwt_decode(token);
          console.log('gias tri')
          console.log(decoded['tokenuser'])
          settokenuser(decoded['tokenuser'])
          settokenbranch(decoded['tokenuser'])
          settokeorg(decoded['tokenuser'])
      
        }
      };
    const addRow = () => {
        setTableData([...tableData, { examination: '', result: '' }]);
    };

    const handleInputChange = (index, field, value) => {
        const newData = [...tableData];
        newData[index][field] = value;
        setTableData(newData);
    };

    const handleSymptomChange = (field, value) => {
        setSymptomData({ ...symptomData, [field]: value });
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
                    fieldsToShare: data.data.fieldsToShare,
                    cccd: data.data.cccd,

                    avatar: data.data.avatar || "https://via.placeholder.com/100"
                });
                setError(null);
            } else {
                setPatientInfo(null);
                setError(data.message || "Không tìm thấy thông tin bệnh nhân.");
            }
        } catch (error) {
            console.error("Error fetching patient info:", error);
            setPatientInfo(null);
            setError("Đã xảy ra lỗi khi lấy thông tin bệnh nhân.");
        }
    };
    

    useEffect(() => {
        const patientId = getQueryParam('patient');
        if (patientId) {
            setCccd(patientId); 
            handleAccessPatientInfo(patientId);
            getRoleFromToken();
        }
    }, []);

    const handlePatientImageChange = async (e) => {
        try {
            const file = e.target.files[0];
            if (file) {
                const data = new FormData();
                data.append('file', file);
                data.append('upload_preset', 'Phanthuyen');
                
                const response = await fetch('https://api.cloudinary.com/v1_1/dst5yu9ay/image/upload', {
                    method: 'POST',
                    body: data,
                });

                const result = await response.json();
                
                if (result && result.url) {
                    alert('Upload thành công');
                    setPatientImage(result.url); // Sử dụng URL của ảnh đã tải lên
                }
            }
        } catch (error) {
            console.error('Error uploading image:', error);
        }
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const requestData = {
            tableData,
            symptomData,
            cccd,
            tokeorg,
            tokenbranch,
            tokenuser,
            patientImage,
        };
        console.log(requestData);
    
        try {
            const response = await fetch("http://127.0.0.1:8000/api/medicaldata/add", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(requestData)
            });
    
            const result = await response.json();
    
            if (response.ok) {
                console.log("Dữ liệu đã được gửi thành công:", result.data); // Kiểm tra dữ liệu
                Swal.fire({
                    title: 'Thêm Dữ liệu thành công!',
                    text: 'Bạn muốn ở lại trang này hay chuyển đến trang chủ?',
                    icon: 'success',
                    showCancelButton: true,
                    confirmButtonText: 'Chuyển đến trang chủ',
                    cancelButtonText: 'Ở lại trang',
                }).then((result) => {
                    if (result.isConfirmed) {
                        // Chuyển đến trang chủ
                        window.location.href = '/home';
                    } else {
                        // Người dùng chọn ở lại trang, không làm gì
                    }
                });
                setAddedData(result.data); // Lưu dữ liệu đã thêm vào state
                onSubmit(requestData); 
            } else {
                Swal.fire({
                    title: 'Thất Bại!',
                    text: 'Thêm Dữ Thất Bại.',
                    icon: 'error',
                    confirmButtonText: 'OK',
                });
                console.error("Lỗi khi gửi dữ liệu:", result);
            }
        } catch (error) {
            console.error("Lỗi kết nối đến API:", error);
        }
    };
    
    const handleFileUpload = async (file, field) => {
        try {
            const data = new FormData();
            data.append("file", file);
            data.append("upload_preset", "Phanthuyen");

            const response = await fetch("https://api.cloudinary.com/v1_1/dst5yu9ay/image/upload", {
                method: "POST",
                body: data,
            });

            const result = await response.json();
            if (result.url) {
                setPatientImage(result.url); // Sử dụng URL của ảnh đã tải lên

                alert(`${field} tải lên thành công!`);
            }
        } catch (error) {
            console.error(`Error uploading ${field}:`, error);
            alert(`Có lỗi xảy ra khi tải ${field}. Vui lòng thử lại.`);
        }
    };
    return (
        <Card>
            <Card.Body>
                            <Form onSubmit={handleSubmit}>
                <h4>Chuyên Mục Khám và Kết quả</h4>

                {/* Form nhập CCCD */}
                {!patientInfo && (
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
                {patientInfo && (
                    <Card className="p-3 mt-3">
                        <h5>Thông tin bệnh nhân</h5>
                        <Row>
                            <Col md={6}>
                                <p><strong>Họ tên:</strong> {patientInfo.fullname}</p>
                                <p><strong>Ngày sinh:</strong> {patientInfo.birthday}</p>
                                <p><strong>Địa chỉ:</strong> {patientInfo.address}</p>
                                <p><strong>Số BH:</strong> {patientInfo.sobh}</p>
                                <p><strong>Token Medical:</strong> {patientInfo.tokenmedical}</p>
                            </Col>
                            <Col md={6}>
                                <p><strong>Giới tính:</strong> {patientInfo.sex}</p>
                                <p><strong>Cân nặng:</strong> {patientInfo.weight} kg</p>
                                <p><strong>Chiều cao:</strong> {patientInfo.height} cm</p>
                                <p><strong>Email:</strong> {patientInfo.email}</p>
                                <p><strong>Số điện thoại:</strong> {patientInfo.phoneNumber}</p>
                            </Col>
                        </Row>
                        <Row className="mt-3">
                            <Col className="d-flex justify-content-center">
                                <img 
                                    src={patientInfo.avatar} 
                                    alt="Avatar của bệnh nhân" 
                                    style={{ width: '100px', height: '100px', borderRadius: '50%' }}
                                />
                            </Col>
                        </Row>
                        {patientInfo.fieldsToShare && (
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
                                        {Object.entries(patientInfo.fieldsToShare).map(([key, value], index) => (
                                            <tr key={index}>
                                                <td>{index + 1}</td>
                                                <td>{key}</td> {/* Hiển thị mã bệnh */}
                                                <td>{value}</td> {/* Hiển thị tên bệnh (chuẩn đoán) */}
                                                <td>
                                                <a 
    href={`./hospital/medical-share?code=${key}&cccd=${patientInfo.cccd}`} 
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
                    </Card>
                )}

                {error && (
                    <Alert variant="danger" className="mt-3">
                        {error}
                    </Alert>
                )}

                <Table className="table table-bordered text-center mt-3"> 
                    <thead className="thead-light">
                        <tr>
                            <th>STT</th>
                            <th>Chuyên Mục Khám</th>
                            <th>Kết quả</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tableData.map((item, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>
                                    <Form.Control
                                        type="text"
                                        placeholder="Nhập chuyên mục khám"
                                        value={item.examination}
                                        onChange={(e) => handleInputChange(index, 'examination', e.target.value)}
                                    />
                                </td>
                                <td>
                                    <Form.Control
                                        type="text"
                                        placeholder="Nhập kết quả"
                                        value={item.result}
                                        onChange={(e) => handleInputChange(index, 'result', e.target.value)}
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
                
                <div className="d-flex justify-content-end">
                    <Button onClick={addRow} style={{ fontSize: '12px', padding: '4px 10px' }}>Thêm dòng</Button>
                </div>
 <div className="mt-4">
                    {/* <h4>Upload Image</h4>
                    <Form.Group>
                        <Row>
                            <Col md={9}>
                                <Form.Label>Chọn ảnh để tải lên</Form.Label>
                                <Form.Control type="file" id="ImagesMedical" onChange={handlePatientImageChange} />
                            </Col>
                        </Row>
                    </Form.Group> */}
                    <Col md={12}>
                            <Form.Group className="mb-3">
                            <Form.Label>Chọn ảnh để tải lên</Form.Label>
                            <FileUploader
                                    onFileUpload={(files) => handleFileUpload(files[0], "ImagesMedical")}
                                />
                            </Form.Group>
                        </Col>
                </div>
                <div className="mt-4">
                    <h5>Biểu hiện và Kết luận</h5>
                    <Row className="mb-3">
                        <Col md={6}>
                            <Form.Label>Biểu hiện</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Nhập biểu hiện"
                                value={symptomData.symptom}
                                onChange={(e) => handleSymptomChange('symptom', e.target.value)}
                            />
                        </Col>
                        <Col md={6}>
                            <Form.Label>Kết luận</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Nhập kết luận"
                                value={symptomData.conclusion}
                                onChange={(e) => handleSymptomChange('conclusion', e.target.value)}
                            />
                        </Col>
                    </Row>
                </div>
                
                <div className="d-flex justify-content-end mt-3">
                    <Button type="submit" style={{ fontSize: '12px', padding: '4px 10px' }}>Thêm kết quả</Button>
                </div>
            </Form>
            </Card.Body>

            {/* Hiển thị dữ liệu đã thêm nếu có */}
           {/* Hiển thị dữ liệu đã thêm nếu có */}
{/* Hiển thị dữ liệu đã thêm nếu có */}
{addedData && (
    <Card className="p-3 mt-4">
        <h5>Thông tin kết quả đã thêm</h5>
        <Table className="table table-bordered text-center mt-3">
            <thead className="thead-light">
                <tr>
                    <th>STT</th>
                    <th>Chuyên Mục Khám</th>
                    <th>Kết quả</th>
                </tr>
            </thead>
            <tbody>
                {addedData.exam_records && addedData.exam_records.map((item, index) => (
                    <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{item.examination}</td>
                        <td>{item.result}</td>
                    </tr>
                ))}
            </tbody>
        </Table>
        <div className="mt-3">
            <p><strong>Biểu hiện:</strong> {addedData.diagnosis_info?.symptom || "N/A"}</p>
            <p><strong>Kết luận:</strong> {addedData.diagnosis_info?.conclusion || "N/A"}</p>
            <p><strong>CCCD:</strong> {addedData.patient_cccd || "N/A"}</p>
        </div>
    </Card>
)}


        </Card>
    );
};
export default MedicalForm;
