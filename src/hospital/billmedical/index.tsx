import React, { useState, useEffect } from "react";
import { Row, Col, Card, Form, Button, Table } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom"; // Import useLocation
import { ShowInfoMedicalBycccd } from "../../controller/MedicalController";
import { CreaterSchedule, GetScheduleByMedical } from "../../controller/ScheduleController";
import {AddBillMedical} from"../../controller/PatientBillController";
// components
import {getPayCode,getPayCodeUpdate,CrontData} from "../../controller/PayController";

import PageTitle from "../../components/PageTitle";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
const formatCurrency = (value: number) => {
    return value.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
};

const calculateTotal = (data: any[], valueisu: any) => {
    // Tính tổng phụ (Tổng chi phí) bằng cách sử dụng `reduce`
    const totalBeforeDiscount = data.reduce((sum, item) => {
        // Giả sử bạn muốn tính tổng giá trị từ `serviceFees`
        const floatValue = parseFloat(item.clinics?.service_branch?.serviceFees || "0");
        return sum + floatValue;
    }, 0); // Giá trị khởi tạo là 0

    // Tính bảo hiểm (Giảm 20% tổng chi phí)
    const insurance = totalBeforeDiscount * (valueisu / 100);

    // Tính thuế (0.2% của tổng chi phí)
    const tax = totalBeforeDiscount * 0.002;

    // Tính tổng cộng
    let total = (totalBeforeDiscount - insurance) + tax;

    // Kiểm tra nếu tổng nhỏ hơn 0
    if (total < 0) {
        total = 0;
    }

    return { totalBeforeDiscount, insurance, tax, total };
};

// Tạo giao diện tính tiền cho bệnh nhân
const PatientInvoiceDetails = () => {
    const MySwal = withReactContent(Swal);

    const [hasCCCD, setHasCCCD] = useState(false);
    // const [insurance, setInsurance] = useState<string>("");
    const [subTotal, setSubTotal] = useState(610); // Tổng phụ ban đầu
    const [insuranceAmount, setInsuranceAmount] = useState(subTotal * 0.2); // Bảo hiểm là 20%
    const [valueisu,setvalueisu] =useState<any>(null);

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
    const medical = getQueryParam('medical')
    const [branchInfo, setbranchInfo] = useState<any>([]);

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
        console.log("gia tri" + _res.data[0].branch);
        setbranchInfo(_res.data[0].branch);
        setDataTable(_res.data);
    }
    const { totalBeforeDiscount, insurance, tax, total } = calculateTotal(dataTable,valueisu);

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
        alert(`giảm 80%`)
        setvalueisu(80)
      console.log("Giảm giá bảo hiểm y tế là 80%.");
    } else if (option === "noHealthInsurance") {
        setvalueisu(0)
        alert(`giảm 0%`)


      console.log("Không có bảo hiểm y tế.");
    } else if (option === "specialCitizen") {
      console.log("Giảm giá cho người có công là 100%."); // Giảm 100% ví dụ
      setvalueisu(100)
      alert(`giảm 100%`)

    } else if (option === "relatives") {
        setvalueisu(95)
        alert(`giảm 95%`)

      console.log(
        "Người hưởng lương hưu, trợ cấp mất sức lao động hằng tháng là 95%."

      ); // Giảm 95% ví dụ
    }
    };

    // // Thông tin bệnh nhân
    // const patientInfo = {
    //     fullname: "Phan Thành Vinh",brnac
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
    const saverBill = async () => {
        const data = {
            server: dataTable,
            totalsum: totalBeforeDiscount,
            insurancestatus: valueisu,
            medicalRecordCode: medical
        }
    
        try {
            const res: any = await AddBillMedical(data); // Make the API call
            console.log(res.data._id)
            if (res.status === true) {
                // Success case
                MySwal.fire({
                    title: 'Hóa đơn đã được thêm thành công!',
                    text: 'Chọn một trong hai lựa chọn:',
                    icon: 'success',
                    showCancelButton: true,
                    confirmButtonText: 'Đến trang thanh toán',
                }).then(result => {
                    // Mặc định là chuyển đến trang thanh toán online
                    window.location.href = `/hospital/branch/pay-bill?bill=${res.data._id}`;
                });
                
            } else {
                // Failure case
                MySwal.fire({
                    title: 'Có lỗi xảy ra!',
                    text: 'Không thể thêm hóa đơn. Hãy thử lại.',
                    icon: 'error',
                    confirmButtonText: 'Thử lại',
                });
            }
        } catch (error) {
            // Error handling if the API call fails
            console.error("Error:", error);
            MySwal.fire({
                title: 'Lỗi kết nối!',
                text: 'Đã xảy ra lỗi khi kết nối với hệ thống. Vui lòng thử lại sau.',
                icon: 'error',
                confirmButtonText: 'Thử lại',
            });
        }
    }
    
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
    label={<span className="small">Có bảo hiểm y tế</span>}
    checked={selectedOption === "healthInsurance"}
    onChange={() => handleOptionChange("healthInsurance")}
/>
<Form.Check
    type="checkbox"
    label={<span className="small">Không có bảo hiểm y tế</span>}
    checked={selectedOption === "noHealthInsurance"}
    onChange={() => handleOptionChange("noHealthInsurance")}
/>
<Form.Check
    type="checkbox"
    label={<span className="small">Người có công</span>}
    checked={selectedOption === "specialCitizen"}
    onChange={() => handleOptionChange("specialCitizen")}
/>
<Form.Check
    type="checkbox"
    label={<span className="small">Học sinh</span>}
    checked={selectedOption === "student"}
    onChange={() => handleOptionChange("student")}
/>

                 {/* Lựa chọn thanh toán */}
                 {/* <h5 className="mb-3 mt-4">Lựa chọn phương thức thanh toán</h5>
                 <Form.Check
    type="radio"
    label={<span className="small">Thanh toán tiền mặt</span>}
    name="paymentMethod"
    // checked={paymentMethod === "cash"}
    // onChange={() => handlePaymentChange("cash")}
/>
<Form.Check
    type="radio"
    label={<span className="small">Thanh toán online</span>}
    name="paymentMethod"
    // checked={paymentMethod === "online"}
    // onChange={() => handlePaymentChange("online")}
/> */}


                            <div className="text-start mt-4">
                                <Button className="btn btn-primary"                                     onClick={saverBill}
>
                                Lập hóa đơn

                                </Button>
                               
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
                        <tr style={{ background: '#38adc1' }}>
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
