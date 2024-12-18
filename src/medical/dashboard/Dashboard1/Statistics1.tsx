import React from "react";
import { Row, Col } from "react-bootstrap";
// Components
import StatisticsWidget from "../../../components/StatisticsWidget";
import StatisticsWidgetvv from "../../../components/StatisticsWidgetvv";

interface StatisticsProps {
  data: {
    bloodType?: string;
    heartRate?: string;
    bloodPressure?: string;
    height?: string;
  };
}

const Statistics: React.FC<StatisticsProps> = ({ data }) => {
  return (
    <>
      <Row style={{ display: 'flex', flexWrap: 'wrap' }}>
        <Col md={6} xl={3} style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
          <StatisticsWidget
            variant="primary"
            description="Nhịp Tim"
            stats={data.heartRate || "N/A"} // Dữ liệu từ API
            icon="fe-heart"
            values="Nhịp/Phút"
          />
        </Col>
        <Col md={6} xl={3} style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
          <StatisticsWidget
            variant="success"
            description="Huyết áp 130/"
            stats={data.bloodPressure || "N/A"} // Dữ liệu từ API
            icon="fe-activity"
            values="mmHg"
          />
        </Col>
        <Col md={6} xl={3} style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
          <StatisticsWidgetvv
            variant="danger"
            description="Nhóm Máu"
            stats={data.bloodType || "N/A"} // Dữ liệu từ API
            icon="fe-droplet"
            // values="Nhóm Máu"

          />
        </Col>
        <Col md={6} xl={3} style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
          <StatisticsWidget
            variant="warning"
            description="Chiều Cao"
            stats={data.height || "N/A"} // Dữ liệu từ API
            icon="fe-bar-chart"
            values="cm"
          />
        </Col>
      </Row>
    </>
  );
};

export default Statistics;
