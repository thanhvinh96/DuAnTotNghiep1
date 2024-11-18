import React, { useState, useEffect } from "react";
import { Row, Col, Card, Form, Button, Table } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom"; // Import useLocation
import { ShowInfoMedicalBycccd } from "../../controller/MedicalController";
import { CreaterSchedule, GetScheduleByMedical } from "../../controller/ScheduleController";

// components
import PageTitle from "../../components/PageTitle";

const formatCurrency = (value: number) => {
    return value.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
};

const calculateTotal = (data: any[]) => {
    // Tính tổng phụ (Tổng chi phí) bằng cách sử dụng `reduce`
    const totalBeforeDiscount = data.reduce((sum, item) => {
        // Giả sử bạn muốn tính tổng giá trị từ `serviceFees`
        const floatValue = parseFloat(item.clinics?.service_branch?.serviceFees || "0");
        return sum + floatValue;
    }, 0); // Giá trị khởi tạo là 0

    // Tính bảo hiểm (Giảm 20% tổng chi phí)
    const insurance = totalBeforeDiscount * 0.2;

    // Tính thuế (0.2% của tổng chi phí)
    const tax = totalBeforeDiscount * 0.002;

    // Tính tổng cộng
    const total = (totalBeforeDiscount - insurance) + tax;

    return { totalBeforeDiscount, insurance, tax, total };
};
// Tạo giao diện tính tiền cho bệnh nhân
const PatientInvoiceDetails = () => {
    const [hasCCCD, setHasCCCD] = useState(false);
    // const [insurance, setInsurance] = useState<string>("");
    const [subTotal, setSubTotal] = useState(610); // Tổng phụ ban đầu
    const [insuranceAmount, setInsuranceAmount] = useState(subTotal * 0.2); // Bảo hiểm là 20%

    // Hàm tính thuế (4% của subTotal)
    const calculateTax = () => {
        return subTotal * 0.04;
    };

    // Hàm tính tổng cộng (subTotal + bảo hiểm + thuế)

    const location = useLocation();  // Lấy location từ useLocation hook

    // Tính tổng tiền

    const getQueryParam = (param: string): string | null => {
        const urlParams = new URLSearchParams(location.search);
        return urlParams.get(param);
    };
    const [patientInfo, setpatientInfo] = useState<any>([]);
    const [dataTable, setDataTable] = useState<any>([]);
    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND'
        }).format(amount);
    };

    const showInfo = async () => {
        const medical = getQueryParam('medical')
        const data = {
            medicalRecordCode: medical
        }
        // console.log(medical)

        const res: any = await ShowInfoMedicalBycccd(data);

        // console.log(res.data);
        setpatientInfo(res.data)
        const datas = {
            patient: medical
        }
        console.clear();
        const _res: any = await GetScheduleByMedical(datas)
        console.log("gia tri" + _res);
        setDataTable(_res.data);
    }
    const { totalBeforeDiscount, insurance, tax, total } = calculateTotal(dataTable);

    useEffect(() => {
        showInfo();

    }, [])

    // Cập nhật trạng thái có CCCD
    const [selectedOption, setSelectedOption] = useState<any>(null);

    const handleOptionChange = (option: string) => {
        if (selectedOption === option) {
            setSelectedOption(null); // Bỏ chọn nếu đang chọn cái này
        } else {
            setSelectedOption(option); // Chọn option mới
        }

        // Log phần trăm giảm giá tùy theo lựa chọn
        if (option === "healthInsurance") {
            console.log("Giảm giá bảo hiểm y tế là 20%.");
        } else if (option === "noHealthInsurance") {
            console.log("Không có bảo hiểm y tế.");
        } else if (option === "specialCitizen") {
            console.log("Giảm giá cho người có công là 100%."); // Giảm 100% ví dụ
        } else if (option === "student") {
            console.log("Giảm giá cho học sinh là 50%."); // Giảm 50% ví dụ
        }
    };

    // // Thông tin bệnh nhân
    // const patientInfo = {
    //     fullname: "Phan Thành Vinh",
    //     birthday: "2024-11-05",
    //     address: "ThanhThuyenDev",
    //     tokenmedical: "d457d1f9f6a92377362854220a956d7c19087b583f6acdcc3fc66169a1a7dbf0",
    //     sex: "Male",
    //     weight: "12 kg",
    //     height: "12 cm",
    //     email: "thanhvinh@gmail.com",
    //     phoneNumber: "123123123123",
    //     avatar: "http://res.cloudinary.com/dst5yu9ay/image/upload/v1731891223/ghtnpqidg9hk9ofjk6rz.jpg",
    //     tokenbranch: "dd4f2dbf295005c585e0d03b658375acb249488f81aa41b2d7515a936a76854f",
    //     tokeorg: "dd4f2dbf295005c585e0d03b658375acb249488f81aa41b2d7515a936a76854f",
    //     cccd: "123123123123123",
    //     medicalRecordCode: "fccc6422d6cf45637806",
    // };

    return (
        <React.Fragment>
            <Row>
                <Col lg={4}>
                    <Card>
                        <Card.Body>
                            <h4 className="header-title mb-3">Thông tin bệnh nhân</h4>

                            <Row>
                                <Col lg={6}>
                                    <div className="mb-4">
                                        <h5 className="mt-0">Tên:</h5>
                                        <p>{patientInfo.fullname}</p>
                                    </div>
                                </Col>
                                <Col lg={6}>
                                    <div className="mb-4">
                                        <h5 className="mt-0">Ngày sinh:</h5>
                                        <p>{patientInfo.birthday}</p>
                                    </div>
                                </Col>
                            </Row>

                            <Row>
                                <Col lg={6}>
                                    <div className="mb-4">
                                        <h5 className="mt-0">Địa chỉ:</h5>
                                        <p>{patientInfo.address}</p>
                                    </div>
                                </Col>
                                <Col lg={6}>
                                    <div className="mb-4">
                                        <h5 className="mt-0">Giới tính:</h5>
                                        <p>{patientInfo.sex}</p>
                                    </div>
                                </Col>
                            </Row>

                            <Row>
                                <Col lg={6}>
                                    <div className="mb-4">
                                        <h5 className="mt-0">Cân nặng:</h5>
                                        <p>{patientInfo.weight}</p>
                                    </div>
                                </Col>
                                <Col lg={6}>
                                    <div className="mb-4">
                                        <h5 className="mt-0">Chiều cao:</h5>
                                        <p>{patientInfo.height}</p>
                                    </div>
                                </Col>
                            </Row>

                            <div className="mb-4">
                                <h5 className="mt-0">Email:</h5>
                                <p>{patientInfo.email}</p>
                            </div>

                            <div className="mb-4">
                                <h5 className="mt-0">Số điện thoại:</h5>
                                <p>{patientInfo.phoneNumber}</p>
                            </div>

                            <div className="mb-4">
                                <h5 className="mt-0">Mã bệnh nhân:</h5>
                                <p>{patientInfo.tokenmedical}</p>
                            </div>

                            <h5 className="mb-3">Lựa chọn bảo hiểm và CCCD</h5>

                <Form.Check
                    type="checkbox"
                    label="Có bảo hiểm y tế"
                    checked={selectedOption === "healthInsurance"}
                    onChange={() => handleOptionChange("healthInsurance")}
                />
                <Form.Check
                    type="checkbox"
                    label="Không có bảo hiểm y tế"
                    checked={selectedOption === "noHealthInsurance"}
                    onChange={() => handleOptionChange("noHealthInsurance")}
                />
                <Form.Check
                    type="checkbox"
                    label="Người có công"
                    checked={selectedOption === "specialCitizen"}
                    onChange={() => handleOptionChange("specialCitizen")}
                />
                <Form.Check
                    type="checkbox"
                    label="Học sinh"
                    checked={selectedOption === "student"}
                    onChange={() => handleOptionChange("student")}
                />
                            <div className="text-start mt-4">
                                <Link to="#" className="btn btn-primary">
                                    Lập hóa đơn
                                </Link>
                            </div>

                        </Card.Body>
                    </Card>
                </Col>

                <Col lg={8}>
                <Card>
            <Card.Body>
                <h4 className="header-title mb-3">Dịch vụ</h4>
                <div className="table-responsive">
                    <Table bordered hover className="mt-4 text-center">
                        <thead className="bg-primary text-white">
                            <tr>
                                <th style={{ color: 'white' }}>Phòng Khám</th>
                                <th style={{ color: 'white' }}>Mã Hồ Sơ</th>
                                <th style={{ color: 'white' }}>Thời gian</th>
                                <th style={{ color: 'white' }}>Chi Phí</th>
                            </tr>
                        </thead>
                        <tbody>
                            {dataTable.map((schedule: any) => (
                                <tr key={schedule._id}>
                                    <td>{schedule.clinics?.name || 'Không có thông tin'}</td>
                                    <td>{schedule.patient || 'Chưa có chuyên khoa'}</td>
                                    <td>{new Date(schedule.timeschedule).toLocaleString()}</td>
                                    <td>{formatCurrency(schedule.clinics?.service_branch?.serviceFees) || 'Không có thông tin'}</td>
                                </tr>
                            ))}
                            {/* Các dòng tính toán tổng */}
                            <tr>
                                <th scope="row" colSpan={3} className="text-end">
                                    Tổng phụ:
                                </th>
                                <td>
                                    <div className="fw-bold">{formatCurrency(totalBeforeDiscount)}</div>
                                </td>
                            </tr>
                            <tr>
                                <th scope="row" colSpan={3} className="text-end">
                                    Bảo hiểm (20%):
                                </th>
                                <td>{formatCurrency(insurance)}</td>
                            </tr>
                            <tr>
                                <th scope="row" colSpan={3} className="text-end">
                                    Thuế (0.2%):
                                </th>
                                <td>{formatCurrency(tax)}</td>
                            </tr>
                            <tr>
                                <th scope="row" colSpan={3} className="text-end">
                                    Tổng cộng:
                                </th>
                                <td>
                                    <div className="fw-bold">{formatCurrency(total)}</div>
                                </td>
                            </tr>
                        </tbody>
                    </Table>
                </div>
            </Card.Body>
        </Card>
                </Col>
            </Row>
        </React.Fragment>
    );
};

export default PatientInvoiceDetails;
