import React from "react";
import { Row, Col } from "react-bootstrap";
// componets
import StatisticsWidget from "../../../components/StatisticsWidget";
import StatisticsWidgetvv from "../../../components/StatisticsWidgetvv";

const Statistics = () => {
  
  return (
    <>
      <Row>
        <Col md={6} xl={3}>
          <StatisticsWidget
            variant="primary"
            description="Nhịp Tim"
            stats="100"
            icon="fe-heart"
            values="Nhịp/Phút"
          />
        </Col>
        <Col md={6} xl={3}>
          <StatisticsWidget
            variant="success"
            description="Huyết áp"
            stats="120"
            icon="fe-activity"
            values="mmHg"
          />
        </Col>
        <Col md={6} xl={3}>
          <StatisticsWidgetvv
            variant="danger"
            description="Nhóm Máu"
            stats=""
            icon="fe-droplet"
          />
        </Col>
        <Col md={6} xl={3}>
          <StatisticsWidget
            variant="warning"
            description="Chiều Cao"
            stats="170"
            icon="fe-bar-chart"
            values="cm"
          />
        </Col>
      </Row>
    </>
  );
};

export default Statistics;
