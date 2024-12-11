import React, { useEffect, useState } from 'react';
import { Row, Col, Card } from "react-bootstrap";
import StatisticsWidget2 from "../../../components/StatisticsWidget2";
import jwtDecode from 'jwt-decode';
import RevenueChart from "./RevenueChart";
import SalesAnalyticsChart from "./SalesAnalyticsChart";
import { useNavigate } from 'react-router-dom';

const Dashboard1 = () => {
  const [dataCoutn, setdataCoutn] = useState({
    branch_count: '0',
    user_count: '0',
    medical_record_count: '0',
    medical_record_bay: '0',
  });

  const [dataProfile, setDataProfile] = useState({
    tokenuser: '',
    tokeorg: '',
    value: 'org1',
  });

  const navigate = useNavigate();

  const showdata = async () => {
    try {
      const token = localStorage.getItem('tokenadmin');

      if (token) {
        // Decode token
        const decodedToken: any = jwtDecode(token);
        setDataProfile({
          tokenuser: decodedToken['tokenuser'] || '',
          tokeorg: decodedToken['tokeorg'] || '',
          value: decodedToken['tokeorg'] ? 'org1' : '',
        });

        console.log("Decoded Token tokeorg:", decodedToken.tokeorg);

        // Fetch data from the API
        try {
          const data = { tokeorg: decodedToken.tokeorg };
          const response = await fetch("http://127.0.0.1:8000/api/branches/count", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          });

          if (!response.ok) {
            console.error(`API Error: ${response.status} - ${response.statusText}`);
            return;
          }

          const responseData = await response.json();
          console.log("API Response:", responseData);

          // Update state with API response
          setdataCoutn({
            branch_count: responseData.branch_count || '0',
            user_count: responseData.user_count || '0',
            medical_record_count: responseData.medical_record_count || '0',
            medical_record_bay: responseData.medical_record_bay || '0',
          });
        } catch (fetchError) {
          console.error('Error in fetch:', fetchError);
        }
      }
    } catch (error) {
      console.error('Error decoding token or fetching data:', error);
    }
  };

  // Fetch data on component mount
  useEffect(() => {
    showdata();
  }, []);

  return (
    <>
      <Row className="mb">
        <Col md={3} className="mb-3">
          <StatisticsWidget2
            variant="blue"
            description="Tổng Chi Nhánh"
            stats={dataCoutn.branch_count}
            icon="fe-aperture"
            progress={60}
          />
        </Col>
        <Col md={3} className="mb-3">
          <StatisticsWidget2
            variant="success"
            description="Tổng Nhân Viên"
            stats={dataCoutn.user_count}
            icon="fe-shopping-cart"
            progress={49}
          />
        </Col>
        <Col md={3} className="mb-3">
          <StatisticsWidget2
            variant="warning"
            description="Tổng sổ khám bệnh"
            stats={dataCoutn.medical_record_count}
            icon="fe-bar-chart-2"
            progress={18}
          />
        </Col>
        <Col md={3} className="mb-3">
          <StatisticsWidget2
            variant="info"
            description="Tổng thu nhập bệnh"
            stats={dataCoutn.medical_record_bay}
            icon="fe-dollar-sign"
            progress={18}
          />
        </Col>
      </Row>

      <Card className="border-0 shadow-lg thuyen-custom">
        <Card.Body>
          <h4 className="text-danger">
            <strong>Lưu ý:</strong>
          </h4>
          <p>
            Hãy đảm bảo tài khoản đăng nhập và mật khẩu của bạn không khớp với thông tin
            đăng nhập trên các website khác để tránh trường hợp chủ website khác sử dụng thông tin
            của bạn để đăng nhập vào phần mềm quản lý bệnh viện này!
          </p>
          <p>
            <img
              alt="hospital-management"
              src="http://localhost/CMSNT.CO/SHOPCLONE7/public/ckeditor/plugins/smiley/images/thumbs_up.png"
              title="hospital-management"
              className="img-fluid"
            />{" "}
            Thay đổi nội dung tại -&gt; <strong>Trang Quản Trị</strong> -&gt;{" "}
            <strong>Cài Đặt</strong> -&gt; <strong>Thông báo ngoài trang chủ</strong>
          </p>
        </Card.Body>
      </Card>

      <Card className="border-0 shadow-lg p-4 mb-4 bg-gray-100">
        <Card.Body>
          <h4 className="font-semibold text-lg text-primary">
            <strong>Thông tin phần mềm quản lý bệnh viện:</strong>
          </h4>
          <ul className="list-disc ml-5 mt-3">
            <li>
              <strong>Quản lý bệnh nhân:</strong> Tạo, cập nhật thông tin bệnh nhân, lịch sử thăm khám,
              và các thông tin liên quan đến điều trị.
            </li>
            <li>
              <strong>Quản lý bác sĩ:</strong> Thêm, sửa, xóa bác sĩ, phân công công việc, và theo dõi lịch khám bệnh.
            </li>
            <li>
              <strong>Quản lý thuốc:</strong> Quản lý kho thuốc, kiểm soát tồn kho, và theo dõi việc cấp phát thuốc.
            </li>
            <li>
              <strong>Chăm sóc khách hàng:</strong> Gửi thông báo, lịch hẹn khám, và theo dõi phản hồi từ bệnh nhân.
            </li>
            <li>
              <strong>Báo cáo thống kê:</strong> Tạo báo cáo về số lượng bệnh nhân, doanh thu, chi phí, và các chỉ số quan trọng khác.
            </li>
          </ul>
        </Card.Body>
      </Card>

      {/* Uncomment if you want to display the charts */}
      {/* <Row>
        <Col lg={4}>
          <RevenueChart />
        </Col>
        <Col lg={8}>
          <SalesAnalyticsChart />
        </Col>
      </Row> */}
    </>
  );
};

export default Dashboard1;
