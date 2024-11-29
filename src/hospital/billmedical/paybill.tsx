import React, { useState,useEffect } from "react";
import { Row, Col, Card } from "react-bootstrap";

// components
import PageTitle from "../../components/PageTitle";
import {getPayCode,getPayCodeUpdate,CrontData} from "../../controller/PayController";
import {showDetailBill} from "../../controller/PatientBillController";

import logoDark from "../../assets/images/logo-dark.png";
import logoLight from "../../assets/images/logo-light.png";
import { useNavigate, useLocation } from "react-router-dom";

interface Address {
  line_1: string;
  line_2: string;
  city: string;
  state: string;
  zip: number;
  phone: string;
}

interface Items {
  id: number;
  name: string;
  description: string;
  hour: number;
  hourRate: string;
  total: string;
}

// invoice component
const Invoice = () => {

  const location = useLocation(); // Lấy thông tin URL hiện tại
  const queryParams = new URLSearchParams(location.search);
  const branchs = queryParams.get("branch"); // Lấy giá trị của "model" từ URL
  const bill = queryParams.get("bill"); // Lấy giá trị của "model" từ URL
  const [customer] = useState<string>("Stanley Jones");
  const [notes] = useState<string>(
"Cảm ơn bạn rất nhiều vì đã tin tưởng và sử dụng dịch vụ của chúng tôi. Bệnh viện cam kết cung cấp dịch vụ y tế chất lượng cao cùng với sự chăm sóc tận tâm và chuyên nghiệp cho mỗi lần thăm khám của bạn."
  );
  const [order_date] = useState<string>("Jan 17, 2016");
  const [order_status] = useState<string>("Unpaid");
  const [order_no] = useState<string>("000028");
  const [billing_address] = useState<Address>({
    line_1: "Stanley Jones",
    line_2: "795 Folsom Ave, Suite 600",
    city: "San Francisco",
    state: "CA",
    zip: 94107,
    phone: "(123) 456-7890",
  });
  const [shipping_address] = useState<Address>({
    line_1: "Stanley Jones",
    line_2: "795 Folsom Ave, Suite 600",
    city: "San Francisco",
    state: "CA",
    zip: 94107,
    phone: "(123) 456-7890",
  });
  const [items] = useState<Items[]>([
    {
      id: 1,
      name: "Web Design",
      description: "2 Pages static website - my website",
      hour: 22,
      hourRate: "$30",
      total: "$660.00",
    },
    {
      id: 2,
      name: "Software Development",
      description: "Invoice editor software - AB'c Software",
      hour: 122.5,
      hourRate: "$35",
      total: "$3937.50",
    },
  ]);
  const [sub_total] = useState<string>("$4597.50");
  const [vat] = useState<string>("$459.75");
  const [total] = useState<string>("$4137.75");
  const[infobill,setinfobill] = useState<any>({});
  const[infodatabill,setinfodatabill] = useState<any>([]);
  const showdatacode = async () => {
    try {
      const data = {
        medicalRecordCode: bill,
      };
  
      const _res = await getPayCode(data); // Gọi API và kiểm tra kết quả


      setinfobill(_res.branch[0]);
      console.clear();
    
    } catch (error) {
      console.error("Error in showdatacode:", error);
    }
  };
  const showDetailBills = async ()=>{
    console.log("gias trij"+infobill._id )
    const data = {
      idpatientbill: infobill._id
    }
    const  res = await showDetailBill(data)
    setinfodatabill(res.data)
    console.log('duw lieuj hoa don'+res)
  }
  useEffect(()=>{
    showdatacode();
  },[])
  useEffect(()=>{
    showDetailBills();
  },[infobill._id ])
  return (
<React.Fragment>
  {/* <PageTitle
    breadCrumbItems={[
      { label: "Trang phụ", path: "/pages/invoice" },
      { label: "Hóa đơn", path: "/pages/invoice", active: true },
    ]}
    title={"Hóa Đơn"}
  /> */}

  <Row>
    <Col>
      <Card>
        <Card.Body>
          <div className="clearfix">
            {/* <div className="float-start">
              <div className="auth-logo">
                <div className="logo logo-light">
                  <span className="logo-lg">
                    <img src={logoLight} alt="" height="22" />
                  </span>
                </div>
              </div>
            </div> */}
            <div className="float-end">
              <h4 className="m-0 d-print-none">Hóa Đơn</h4>
            </div>
          </div>

          <Row>
            <Col md={6}>
              <div className="mt-3">
                <p>
                  <b>Xin Chào Quý Khách</b>
                </p>
                <p className="text-muted">{notes}</p>
              </div>
            </Col>

            <Col md={{ span: 4, offset: 2 }}>
              <div className="mt-3 float-end">
                <p>
                  <strong>Ngày Lập Hóa Đơn </strong>{" "}
                  <span className="float-end">
                    {new Date(infobill.created_at).toLocaleString('vi-VN')}
                  </span>
                </p>
                <p>
                <strong>Tình Trạng Hóa Đơn: </strong>
<span className="float-end">
  <span 
    className={`badge ${infobill.status===true ? 'bg-success' : 'bg-danger'}`}
  >
    {infobill.status===true ? 'Đã Thanh Toán' : 'Chưa Thanh Toán'}
  </span>
</span>

                </p>
                <p>
                  <strong>Mã Đơn Hàng: </strong>
                  <span className="float-end">
                    <span className="float-end">{infobill._id}</span>
                  </span>
                </p>
              </div>
            </Col>
          </Row>

          <Row>
            <Col xs={12}>
              <div className="table-responsive">
                <table className="table mt-4 table-centered">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Sản Phẩm</th>
                      <th style={{ width: "10%" }}>Giờ</th>
                      <th style={{ width: "10%" }} className="text-end">
                        Tổng
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {infodatabill.map((bill: any) => (
                      <tr key={bill.item}>
                        <td>{bill.id}</td>
                        <td>{bill.titleserver}</td>
                        <td>{new Date(bill.updated_at).toLocaleString('vi-VN')}</td>
                        <td>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(bill.server.serviceFees)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Col>
          </Row>

          <Row>
            <Col sm={6}>
              <div className="clearfix pt-5">
                <h6 className="text-muted">Ghi Chú:</h6>
                <small className="text-muted">
                  Tất cả các tài khoản phải được thanh toán trong vòng 7 ngày
                  kể từ ngày nhận hóa đơn. Thanh toán có thể thực hiện bằng séc,
                  thẻ tín dụng hoặc thanh toán trực tuyến. Nếu tài khoản không
                  được thanh toán trong vòng 7 ngày, chi tiết tín dụng đã cung
                  cấp sẽ được tính phí theo mức phí đã thỏa thuận.
                </small>
              </div>
            </Col>
            <Col sm={6}>
              <div className="float-end">
                <p>
                  <b>Giảm Bảo Hiểm Y tế </b>{" "}
                  <span className="float-end">{infobill.insurancestatus}</span>
                </p>
                <p>
                  <b>Tổng tiền</b>{" "}
                  <span className="float-end">{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(infobill.totalsum)}</span>
                </p>
              </div>
              <div className="clearfix"></div>
            </Col>
          </Row>

          <div className="mt-4 mb-1">
            <div className="d-flex justify-content-end d-print-none">
              <button
                className="btn btn-primary waves-effect waves-light me-2"
                style={{ width: '190px' }}
                onClick={(e) => {
                  window.print();
                }}
              >
                <i className="mdi mdi-printer me-1"></i> In Hóa Đơn
              </button>
              <button
                className="btn btn-info waves-effect waves-light me-2"
                style={{ width: '190px' }}
              >
                Xác Nhận Thanh Toán
              </button>
              {/* Thêm nút Chuyển đến Cổng Thanh Toán */}
              <button
                className="btn btn-success waves-effect waves-light"
                style={{ width: '190px' }}
                onClick={() => {
                  window.location.href = `/hospital/branch/pay-online?bill=${bill}&branch=${infodatabill[0]['server']['tokenbranch']}`; // Thay bằng URL cổng thanh toán của bạn
                }}
              >
                Chuyển đến Cổng Thanh Toán
              </button>
            </div>
          </div>

        </Card.Body>
      </Card>
    </Col>
  </Row>
</React.Fragment>

  );
};

export default Invoice;
