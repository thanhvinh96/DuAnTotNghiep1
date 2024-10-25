import React from "react";
import { Row, Col, Card } from "react-bootstrap";

// components
import PageTitle from "../../components/PageTitle";
import Table from "../../components/Table";
import '../../style.css';

// Define types for all sections of the medical record
interface ExaminationData {
  key: string;
  value: string;
}

interface PrescriptionData {
  medicine: string;
  dosage: string;
  usage: string;
}

interface VitalsData {
  vital: string;
  value: string;
}

interface FollowUpData {
  date: string;
  instructions: string;
}

// Example data
const patientDetails: ExaminationData[] = [
  { key: 'Họ tên bệnh nhân', value: 'Nguyễn Văn A' },
  { key: 'Ngày sinh', value: '01/01/1990' },
  { key: 'Giới tính', value: 'Nam' },
  { key: 'Mã bệnh nhân', value: 'BN001' },
  { key: 'Ngày khám', value: '10/10/2024' },
  { key: 'Bác sĩ', value: 'Trần Văn B' },
];

const vitals: VitalsData[] = [
  { vital: 'Huyết áp', value: '120/80 mmHg' },
  { vital: 'Nhiệt độ', value: '37.5°C' },
  { vital: 'Nhịp tim', value: '72 BPM' },
  { vital: 'Nhịp thở', value: '18 nhịp/phút' },
];

const medicalHistory: ExaminationData[] = [
  { key: 'Tiền sử bệnh', value: 'Tiểu đường type 2' },
  { key: 'Dị ứng thuốc', value: 'Không có' },
];

const bloodTestResults: ExaminationData[] = [
  { key: 'Bạch cầu', value: '10,000/mm³' },
  { key: 'Hemoglobin', value: '13.5 g/dL' },
  { key: 'Tiểu cầu', value: '150,000/mm³' },
];

const xrayResults: ExaminationData[] = [
  { key: 'Mô tả hình ảnh', value: 'Mờ phổi, tràn dịch màng phổi' },
  { key: 'Kết luận X-quang', value: 'Viêm phổi' },
];

const diagnosisDetails: ExaminationData[] = [
  { key: 'Chẩn đoán', value: 'Viêm phổi cấp' },
  { key: 'Phương án điều trị', value: 'Nghỉ ngơi tại nhà, dùng kháng sinh' },
];

const prescriptionDetails: PrescriptionData[] = [
  { medicine: 'Amoxicillin', dosage: '500mg', usage: 'Uống 2 viên/ngày' },
  { medicine: 'Paracetamol', dosage: '500mg', usage: 'Uống 1 viên khi sốt' },
  { medicine: 'Vitamin C', dosage: '500mg', usage: 'Uống 1 viên sau ăn' },
];

const followUpInstructions: FollowUpData[] = [
  { date: '20/10/2024', instructions: 'Tái khám để kiểm tra tiến triển.' },
  { date: '30/10/2024', instructions: 'Xét nghiệm máu và chụp X-quang lại.' },
];

// Custom table components for displaying different sections
const DataTable: React.FC<{ title: string, data: ExaminationData[] }> = ({ title, data }) => (
  <Card className="mb-3">
    <Card.Body>
      <h4 className="header-title">{title}</h4>
      <Table columns={[{ Header: 'Thông tin', accessor: 'key' }, { Header: 'Chi tiết', accessor: 'value' }]} data={data} />
    </Card.Body>
  </Card>
);

const PrescriptionTable: React.FC<{ data: PrescriptionData[] }> = ({ data }) => (
  <Card className="mb-3">
    <Card.Body>
      <h4 className="header-title">Đơn Thuốc</h4>
      <Table
        columns={[
          { Header: 'Tên thuốc', accessor: 'medicine' },
          { Header: 'Liều lượng', accessor: 'dosage' },
          { Header: 'Cách dùng', accessor: 'usage' },
        ]}
        data={data}
      />
    </Card.Body>
  </Card>
);

const VitalsTable: React.FC<{ data: VitalsData[] }> = ({ data }) => (
  <Card className="mb-3">
    <Card.Body>
      <h4 className="header-title">Chỉ số sinh tồn</h4>
      <Table columns={[{ Header: 'Chỉ số', accessor: 'vital' }, { Header: 'Giá trị', accessor: 'value' }]} data={data} />
    </Card.Body>
  </Card>
);

const FollowUpTable: React.FC<{ data: FollowUpData[] }> = ({ data }) => (
  <Card className="mb-3">
    <Card.Body>
      <h4 className="header-title">Hướng dẫn tái khám</h4>
      <Table columns={[{ Header: 'Ngày hẹn', accessor: 'date' }, { Header: 'Hướng dẫn', accessor: 'instructions' }]} data={data} />
    </Card.Body>
  </Card>
);

const MedicalRecordDetail: React.FC = (): JSX.Element => {
  return (
    <>
      <PageTitle
        breadCrumbItems={[
          { label: "Phiếu Khám Bệnh", path: "/medical/record/detail" },
        ]}
        title={"Phiếu Khám Bệnh Chi Tiết"}
      />

      <Row>
        {/* Patient Information */}
        <Col lg={6}>
          <DataTable title="Thông tin bệnh nhân" data={patientDetails} />
        </Col>

        {/* Vitals */}
        <Col lg={6}>
          <VitalsTable data={vitals} />
        </Col>

        {/* Medical History */}
        <Col lg={6}>
          <DataTable title="Tiền sử bệnh" data={medicalHistory} />
        </Col>

        {/* Blood Test Results */}
        <Col lg={6}>
          <DataTable title="Kết quả xét nghiệm máu" data={bloodTestResults} />
        </Col>

        {/* X-ray Results */}
        <Col lg={6}>
          <DataTable title="Kết quả X-quang" data={xrayResults} />
        </Col>

        {/* Diagnosis */}
        <Col lg={6}>
          <DataTable title="Chẩn đoán & Điều trị" data={diagnosisDetails} />
        </Col>

        {/* Prescription */}
        <Col lg={12}>
          <PrescriptionTable data={prescriptionDetails} />
        </Col>

        {/* Follow-up Instructions */}
        <Col lg={12}>
          <FollowUpTable data={followUpInstructions} />
        </Col>
      </Row>
    </>
  );
}

export default MedicalRecordDetail;
