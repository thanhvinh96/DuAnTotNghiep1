import React, { useState, useEffect } from 'react';
import { Table, Form, Button, Container, Row, Col, Alert,Card } from 'react-bootstrap';
import PageTitle from "../../../components/PageTitle";
import { CheckInfoMedical, RequestMedical } from "../../../controller/MedicalController";
import { ShowBranchRequestMedical } from "../../../controller/BranchController";
import jwt_decode from 'jwt-decode';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import Statistics from "./Statistics";
import classNames from "classnames";


import PerformanceChart from "./PerformanceChart";
interface RibbonProps {
    label: string;
    color: string;
    direction?: string;
  }
const Ribbon1 = ({ label, color, direction }: RibbonProps) => {
    return (
      <Card className="ribbon-box">
        <Card.Body>
          <div
            className={classNames(
              "ribbon",
              "ribbon-" + color,
              direction === "left" ? "float-start" : "float-end"
            )}
          >
            <i className="mdi mdi-access-point me-1"></i> {label}
          </div>
        
          <div className="ribbon-content">
    <p className="mb-0">
        Hệ thống quản lý chi nhánh bệnh viện cung cấp đầy đủ thông tin về các chi nhánh và đội ngũ nhân viên,
        hỗ trợ giám sát và quản lý hiệu quả. Các chi nhánh bệnh viện trên toàn quốc đều được kết nối và cập nhật thông tin
        liên tục để đảm bảo chất lượng phục vụ tốt nhất cho bệnh nhân.
    </p>
</div>

        </Card.Body>
      </Card>
    );
  };
const ManagementRequest: React.FC = () => {
    const [datagetshow, setdatagetshow] = useState<{ tokeorg: string; value: string; tokenbranch: string }>({
        tokeorg: '',
        value: '',
        tokenbranch: '',
    });
    const [datatable, setdatatanle] = useState<Request[]>([]); // Đảm bảo kiểu dữ liệu là Request[]
    
    const showdatarequest = async () => {
        const res: any = await ShowBranchRequestMedical(datagetshow);
        console.log(res);
        if (Array.isArray(res)) {
            setdatatanle(res);
        } else {
            console.error('Expected an array but got:', res);
            setdatatanle([]); // Reset to empty array if response is not valid
        }
    };


  

  
    useEffect(() => {
        showdatarequest();
    }, [datagetshow]); // Chạy lại khi datagetshow thay đổi
    


    const MySwal = withReactContent(Swal);
   
    return (
        <>
              <Card>
              <Card.Body>
                 <Row>
        <Col lg={12}>
          <Ribbon1 label="Thông báo" color="blue" direction="left" />
        </Col>
        
      </Row>
            <Row>
  <Col lg={6} xl={4}>
    <Statistics
      icon="fe-book"
      variant="primary"
      stats="1234" // Giá trị của tổng số yêu cầu sổ khám bệnh
      description="Tổng Số Bệnh Nhân"
    />
  </Col>
  <Col lg={6} xl={4}>
    <Statistics
      icon="fe-clock"
      variant="warning"
      stats="567" // Giá trị của yêu cầu chưa được phê duyệt
      description="Tổng Số Nhân Viên"
    />
  </Col>
  <Col lg={6} xl={4}>
    <Statistics
      icon="fe-check-circle"
      variant="success"
      stats="345" // Giá trị của yêu cầu đã được phê duyệt
      description="Tổng Số Token"
    />
  </Col>
</Row>

          
<Row>
        <Col xl={12}>
        
          <PerformanceChart />
        </Col>
      </Row>
      </Card.Body>
      </Card>
        </>
    );
};

export default ManagementRequest;

