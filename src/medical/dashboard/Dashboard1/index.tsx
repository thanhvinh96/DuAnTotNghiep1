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


  const checkToken = ()=>{
    const token = localStorage.getItem('jwtToken');
    if(token){
      try{
        const decodedToken:any = jwtDecode(token);
        console.log(jwtDecode(token));
        const requiredFields = ['gender', 'address', 'phoneNumber', 'identityCard'];
        const missing = requiredFields.filter(field=> !decodedToken[field]);
        console.log(missing);
        if(missing.length>0){
          setMissingFields(missing);

          setShowModal(true);
        }
      } catch (error) {
        console.error('Error decoding token:', error);
      }
    }
  }
  /*
   * handle date change
   */
  const handlaNavigate=()=>{
    navigate('/medical/examination-history');
  }
  const onDateChange = (date: Date) => {
    if (date) {
      setSelectedDate(date);
    }
  };
  useEffect(()=>{
    checkToken();
  },[])
  return (
    <> 
            <Statistics />
      <Row>
        <Col xl={12}>
          <UsersBalances balances={balances}/>
        </Col>
      </Row>   
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Missing Information</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>The following fields are missing or empty in your profile:</p>
          <ul>
            {missingFields.map((field, index) => (
              <li key={index}>{field}</li>
            ))}
          </ul>
          <p>Please update your profile to include these fields.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={()=>handlaNavigate()}>
            Update
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Dashboard1;
