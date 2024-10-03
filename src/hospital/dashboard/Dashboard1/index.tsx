import React, { useEffect, useState } from 'react';
import { Row, Col } from "react-bootstrap";

// components
import HyperDatepicker from "../../../components/Datepicker";

import Statistics from "./Statistics";
import RevenueChart from "./RevenueChart";
import SalesAnalyticsChart from "./SalesAnalyticsChart";
import UsersBalances from "./UsersBalances";
import RevenueHistory from "./RevenueHistory";
import jwtDecode from 'jwt-decode'; // Sử dụng thư viện jwt-decode để giải mã token
import { Modal, Button } from 'react-bootstrap';
import { useNavigate} from 'react-router-dom';
import { balances, revenueHistory } from "./data";

const Dashboard1 = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [showModal, setShowModal] = useState<boolean>(false);
  const [missingFields, setMissingFields] = useState<string[]>([]);
  const navigate = useNavigate(); // Khai báo biến navigate



  /*
   * handle date change
   */

  const onDateChange = (date: Date) => {
    if (date) {
      setSelectedDate(date);
    }
  };
  useEffect(()=>{
  },[])
  return (
    <>
      <Statistics />
      <Row>
        <Col lg={4}>
          <RevenueChart />
        </Col>
        <Col lg={8}>
          <SalesAnalyticsChart />
        </Col>
      </Row>

      <Row>
        <Col xl={6}>
          <UsersBalances balances={balances} />
        </Col>
        <Col xl={6}>
          <RevenueHistory revenueHistory={revenueHistory} />
        </Col>
        
      </Row>
   
      
    </>
  );
};

export default Dashboard1;
