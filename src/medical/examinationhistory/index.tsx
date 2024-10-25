import React from "react";
import { Row, Col, Card } from "react-bootstrap";

// components
import PageTitle from "../../components/PageTitle";
import Table from "../../components/Table";
import '../../style.css';

// Define type for row data
interface RowData {
  id: number;
  date: string;
  doctorName: string;
  hospitalName: string;
  address: string;
  diagnosis: string;
  action?: React.ReactNode;
}

// Sample data
const expandableRecords: RowData[] = [
  {
    id: 1,
    date: '2023-10-01',
    doctorName: 'Dr. Nguyễn Văn A',
    hospitalName: 'Bệnh Viện Chợ Rẫy',
    address: '201B Nguyễn Chí Thanh, Quận 5, TP.HCM',
    diagnosis: 'Viêm phổi',
    action: 'Xem Chi Tiết',
  },
  {
    id: 2,
    date: '2023-09-15',
    doctorName: 'Dr. Trần Thị B',
    hospitalName: 'Bệnh Viện Đại Học Y Dược',
    address: '215 Hồng Bàng, Quận 5, TP.HCM',
    diagnosis: 'Đau dạ dày',
    action: 'Xem Chi Tiết',
  },
  {
    id: 3,
    date: '2023-08-20',
    doctorName: 'Dr. Phạm Văn C',
    hospitalName: 'Bệnh Viện Bình Dân',
    address: '408 Điện Biên Phủ, Quận 3, TP.HCM',
    diagnosis: 'Viêm gan B',
    action: 'Xem Chi Tiết',
  },
  {
    id: 4,
    date: '2023-07-10',
    doctorName: 'Dr. Lê Thị D',
    hospitalName: 'Bệnh Viện Nhân Dân Gia Định',
    address: '01 Nơ Trang Long, Quận Bình Thạnh, TP.HCM',
    diagnosis: 'Thoát vị đĩa đệm',
    action: 'Xem Chi Tiết',
  },
];

const handleAction = (row: RowData) => {
  alert(`Chi tiết của ID: ${row.id}`);
};

function Index(): JSX.Element {
  const columns = [
    {
      Header: 'Ngày Khám',
      accessor: 'date',
      sort: true,
    },
    {
      Header: 'Tên Bác Sĩ',
      accessor: 'doctorName',
      sort: true,
    },
    {
      Header: 'Tên Bệnh Viện',
      accessor: 'hospitalName',
      sort: true,
    },
    {
      Header: 'Địa chỉ',
      accessor: 'address',
      sort: true,
    },
    {
      Header: 'Chẩn Đoán',
      accessor: 'diagnosis',
      sort: true,
    },
    {
      Header: 'Action',
      accessor: 'action',
      Cell: ({ row }: { row: { original: RowData } }) => (
        <button
          className="btn btn-primary"
          onClick={() => handleAction(row.original)}
        >
          Xem Chi Tiết
        </button>
      ),
    },
  ];

  const sizePerPageList = [
    {
      text: "5",
      value: 5,
    },
    {
      text: "10",
      value: 10,
    },
    {
      text: "25",
      value: 25,
    },
    {
      text: "All",
      value: expandableRecords.length,
    },
  ];

  return (
    <>
      <PageTitle
        breadCrumbItems={[
          { label: "Tables", path: "/features/tables/advanced" },
          {
            label: "Advanced Tables",
            path: "/features/tables/advanced",
            active: true,
          },
        ]}
        title={"Advanced Tables"}
      />

      <Row>
        <Col>
          <Card>
            <Card.Body>
              <h4 className="header-title">Expand Row</h4>
              <p className="text-muted font-14 mb-4">
                Expand row to see more additional details
              </p>

              <Table
                columns={columns}
                data={expandableRecords}
                pageSize={5}
                sizePerPageList={sizePerPageList}
                isSortable={true}
                pagination={true}
                isExpandable={true}
              />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
}

export default Index;
