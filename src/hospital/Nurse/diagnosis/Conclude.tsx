import React, { useState, useEffect } from 'react';
import { Form, Row, Col, Button, Table, Card, Alert, Image } from 'react-bootstrap';
import PageTitle from "../../../components/PageTitle";
import jwt_decode from 'jwt-decode';
import { PushDataMedical } from "../../../controller/MedicalController"; // Import controller
import CreateAppointment from "../../hospitalbranch/CreateAppointment"; // Import controller
import { useNavigate } from 'react-router-dom';
import Ts from './basicexamination';
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
interface Product {
    sku: string;
    name: string;
    category?: {
        name: string;
    };
    price?: {
        measureUnitName: string;
    };
}

interface Prescription {
    testName: string;
    referenceValue: string;
    result: string;
    unit: string;
}

interface MedicalData {
    // Define structure based on the API response you expect
    [key: string]: any; // Placeholder for actual data fields
}
interface DiseaseCodeData {
    key: string;
    value: string;
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
    const navigate = useNavigate();

    const MySwal = withReactContent(Swal);
    // Hàm để thêm dòng mới vào bảng
    const [tableData, setTableData] = useState<Prescription[]>([]);
    const [searchKeyword, setSearchKeyword] = useState<string>("");
    const [searchResults, setSearchResults] = useState<Product[]>([]);
    const addRow = () => {
        setTableData([
            ...tableData,
            { testName: "", referenceValue: "", result: "", unit: "" },
        ]);
    };

    const handlePrescriptionChange = (index: number, field: keyof Prescription, value: string) => {
        const newTableData = [...tableData];
        newTableData[index][field] = value;
        setTableData(newTableData);
    };

    const handleSearch = async () => {
        try {
            const response = await fetch(
                `https://api.nhathuoclongchau.com.vn/lccus/search-product-service/api/products/ecom/product/suggest?keyword=${searchKeyword}&KeywordSuggestSize=1&CatEcomSuggestSize=1&ProductSuggestSize=5`
            );
            if (!response.ok) {
                throw new Error("Failed to fetch data");
            }
            const data = await response.json();
            setSearchResults(data.products || []);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const addProductToTable = (product: Product) => {
        setTableData([
            ...tableData,
            {
                testName: product.name,
                referenceValue: product.category?.name || "",
                result: "",
                unit: product.price?.measureUnitName || "",
            },
        ]);
        setSearchResults([]); // Clear search results after adding
    };

    const handleDeleteRow = (index: number) => {
        const updatedData = tableData.filter((_, i) => i !== index);
        setTableData(updatedData);
    };

    const [conclusionData, setConclusionData] = useState<ConclusionData>({
        diagnosis: '',
        treatment: '',
        followUp: '',
        additionalNotes: '',
        images: []
    });
    const [cccd, setCccd] = useState<string>('');
    const [CccdValue, setCccdValue] = useState<string>('');
    const [error, setError] = useState<string | null>(null);
    const [patientData, setPatientInfo] = useState<PatientInfo>({} as PatientInfo);
    const [medicalData, setMedicalData] = useState<MedicalData[]>([]);
    const [previewImages, setPreviewImages] = useState<string[]>([]); // Store preview images

    const [Viewingrights, setViewingrights] = useState<any>({});
    const [DiseasecodeData,setDiseasecodeData] = useState<any>([]); // Store preview images
    const [diseaseCodeData, setDiseaseCodeData] = useState<DiseaseCodeData[]>([]);

    const showViewingrights = async () => {
        try {
          const token = localStorage.getItem('tokenadmin');
          let decoded: any = null;
    
          if (token) {
            decoded = jwt_decode(token);
            const response = await fetch('http://103.179.185.78:3002/medical/diseasecode/org', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                tokeorg: decoded['tokeorg'],
                tokenbranch: decoded['branch'],
                cccd: CccdValue,
              }),
            });
    
            const result = await response.json();
            if (result.data?.datashare) {
              // Parse datashare and save to state
              const parsedData = result.data.datashare.flatMap((item: string) => {
                try {
                  const obj = JSON.parse(item);
                  return Object.entries(obj).map(([key, value]) => ({ key, value }));
                } catch {
                  return [];
                }
              });
              console.log("data trar ve "+parsedData)
              setDiseaseCodeData(parsedData);
            } else {
              setDiseaseCodeData([]);
            }
          }
        } catch (error) {
          console.error('Error fetching medical data:', error);
          setError('Đã xảy ra lỗi khi lấy thông tin khám bệnh.');
        }
      };
    
    useEffect(()=>{
        showViewingrights();
    },[CccdValue])
    const showdata = async (patientId: string) => {
        try {
            
            const token = localStorage.getItem('tokenadmin');
            let decoded: any = null;

            if (token) {

                decoded = jwt_decode(token);
                console.clear()
                console.log("sdfsdfsdf"+decoded['branch']);
                const response = await fetch("https://ehrmedical.online/api/medicaldata/code", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        token_branch: decoded['branch'],
                        medicalRecordCode: patientId
                    })
                });
                const data = await response.json();
                setMedicalData(data.data); // Save data into state
                setError(null);
            }
        } catch (error) {
            console.error("Error fetching medical data:", error);
            setError("Đã xảy ra lỗi khi lấy thông tin khám bệnh.");
        }
    };

    const handleAccessPatientInfo = async (patientId: string) => {
        try {
            const response = await fetch("https://ehrmedical.online/api/medical/code", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ medicalRecordCode: patientId })
            });

            const data = await response.json();
            console.log(data.data.fieldsToShare)
            if (response.ok) {
                setCccdValue(data.data.cccd)
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

const gotoshare=async(item:any)=>{
    // alert(item)
    navigate(`/nurse?typeform=form-share&key=${item}`);

}

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
            <Ts initialValue={CccdValue} />
            <CreateAppointment />
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
                            <Table bordered hover className="mt-4 text-center">
          <thead className="bg-primary text-white">
            <tr style={{ background: '#38adc1' }}>
              <th scope="col" style={{ color: 'white' }}>STT</th>
              <th scope="col" style={{ color: 'white' }}>Mã bệnh</th>
              <th scope="col" style={{ color: 'white' }}>Tên Bệnh</th>
              <th scope="col" style={{ color: 'white' }}>Hành Động</th>
            </tr>
          </thead>
          <tbody>
          {diseaseCodeData.length > 0 ? (
  diseaseCodeData.map((item, index) => (
    <tr key={index}>
      <td>{index + 1}</td>
      <td>{item.key}</td>
      <td>{item.value}</td>
      <td>
        <button
          onClick={() => gotoshare(item.key)} // Sửa: truyền item.key thay vì index.key
          className="btn btn-primary"
        >
          Xem chi tiết
        </button>
      </td>
    </tr>
  ))
) : (
  <tr>
    <td colSpan={4}>Không có dữ liệu</td>
  </tr>
)}

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
                        <Table bordered hover className="mt-4 text-center">
                            <thead className="bg-primary text-white">
                                <tr style={{ background: '#38adc1' }}>
                                    <th style={{ color: 'white' }}>STT</th>
                                    <th style={{ color: 'white' }}>Chuyên Mục Khám</th>
                                    <th style={{ color: 'white' }}>Kết Quả</th>
                                    <th style={{ color: 'white' }}>Hình Ảnh</th>

                                    <th style={{ color: 'white' }}>Triệu Chứng</th>
                                    <th style={{ color: 'white' }}>Kết Luận</th>
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
                    <div className="mb-4 mt-3">
                        <h5>Kê Đơn Thuốc</h5>
                        <Form onSubmit={handleSubmit}>
                            <Row className="align-items-center mb-4">
                                <Col md={9}>
                                    <div className="d-flex align-items-center">
                                        <Form.Control
                                            type="text"
                                            placeholder="Tìm tên thuốc"
                                            value={searchKeyword}
                                            onChange={(e) => setSearchKeyword(e.target.value)}
                                            className="me-2"
                                        />
                                        <Button variant="primary" onClick={handleSearch}>
                                            Tìm thuốc
                                        </Button>
                                    </div>
                                </Col>

                            </Row>
                            {searchResults.length > 0 && (
                                <div className="border p-3 rounded mb-3 bg-light">
                                    <strong>Kết quả tìm kiếm:</strong>
                                    <ul className="list-unstyled mt-2">
                                        {searchResults.map((product) => (
                                            <li
                                                key={product.sku}
                                                onClick={() => addProductToTable(product)}
                                                className="p-2 border-bottom"
                                                style={{ cursor: "pointer" }}
                                            >
                                                {product.name}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            <Table bordered hover className="mt-4 text-center">
                                <thead className="bg-primary text-white">
                                    <tr style={{ background: '#38adc1' }}>                                    <th style={{ color: 'white' }}>STT</th>
                                        <th style={{ color: 'white' }}>Tên thuốc</th>
                                        <th style={{ color: 'white' }}>ĐVT</th>
                                        <th style={{ color: 'white' }}>Số lượng</th>
                                        <th style={{ color: 'white' }}>Cách dùng</th>
                                        <th style={{ color: 'white' }}>Thao tác</th>
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
                                                    onChange={(e) =>
                                                        handlePrescriptionChange(
                                                            index,
                                                            "testName",
                                                            e.target.value
                                                        )
                                                    }
                                                />
                                            </td>
                                            <td>
                                                <Form.Control
                                                    type="text"
                                                    value={item.referenceValue}
                                                    onChange={(e) =>
                                                        handlePrescriptionChange(
                                                            index,
                                                            "referenceValue",
                                                            e.target.value
                                                        )
                                                    }
                                                />
                                            </td>
                                            <td>
                                                <Form.Control
                                                    type="text"
                                                    value={item.result}
                                                    onChange={(e) =>
                                                        handlePrescriptionChange(
                                                            index,
                                                            "result",
                                                            e.target.value
                                                        )
                                                    }
                                                />
                                            </td>
                                            <td>
                                                <Form.Control
                                                    type="text"
                                                    value={item.unit}
                                                    onChange={(e) =>
                                                        handlePrescriptionChange(
                                                            index,
                                                            "unit",
                                                            e.target.value
                                                        )
                                                    }
                                                />
                                            </td>
                                            <td>
                                                <Button
                                                    variant="danger"
                                                    size="sm"
                                                    onClick={() => handleDeleteRow(index)}
                                                >
                                                    Xóa
                                                </Button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>

                            <div className="d-flex justify-content-between mt-4">
                                <Button
                                    variant="danger"
                                    onClick={addRow}
                                    style={{
                                        fontSize: "14px",
                                        padding: "6px 20px",
                                        width: "150px",
                                    }}
                                >
                                    Thêm dòng
                                </Button>

                                <Button
                                    type="submit"
                                    variant="primary"
                                    style={{
                                        fontSize: "14px",
                                        padding: "6px 20px",
                                        width: "150px",
                                    }}
                                >
                                    Lưu kết quả
                                </Button>
                            </div>
                        </Form>
                    </div>

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
