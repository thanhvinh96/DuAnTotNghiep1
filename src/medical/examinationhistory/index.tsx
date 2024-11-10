import React, { useState, useEffect } from "react";
import { Row, Col, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

// Components
import PageTitle from "../../components/PageTitle";
import Table from "../../components/Table";
import jwtDecode from 'jwt-decode';

// API
import { GetHistoryMedical } from "../../controller/MedicalController";

// Define type for row data
interface RowData {
  id: number;
  date: string;
  recordCode: string;
  action?: React.ReactNode;
}

function Index(): JSX.Element {
  const [tableData, setTableData] = useState<RowData[]>([]);

  const columns = [
    {
      Header: 'Mã Hồ Sơ',
      accessor: 'recordCode',
      sort: true,
    },
    {
      Header: 'Tên bệnh án',
      accessor: 'date',
      sort: true,
    },
    {
      Header: 'Hành Động',
      accessor: 'action',
      Cell: ({ row }: { row: { original: RowData } }) => (
        <Link to={`/medical/medical-record-detail?record=${row.original.recordCode}`}>
          <button className="btn btn-primary" onClick={() => handleAction(row.original)}>
            Xem Chi Tiết
          </button>
        </Link>
      ),
    },
  ];

  const handleAction = (row: RowData) => {
    // alert(`Chi tiết của Mã Hồ Sơ: ${row.recordCode}`);
  };

  const showdata = async () => {
    try {
      const token:any = localStorage.getItem('jwtToken');
      console.log('du lieu token')
      console.log(token);
      const decodedToken: any = jwtDecode(token);

      const data = {
        tokenmedical: decodedToken.tokenmedical,
        cccd: decodedToken.cccd
      };
      const res = await GetHistoryMedical(data);
      console.log(res.data.diseaseInfo)
      const records = res.data.diseaseInfo.map((item: any, index: number) => ({
        id: index + 1, // tạo ID cho mỗi dòng
        recordCode: item.diseasecode || 'N/A', // giả sử `recordCode` là mã hồ sơ
        date: item.namedisease || 'N/A', // giả sử `date` là thời gian khám
      }));
      setTableData(records);
    } catch (e) {
      console.error("Error fetching medical history:", e);
    }
  };

  useEffect(() => {
    showdata();
  }, []);

  return (
    <>
      <PageTitle
        breadCrumbItems={[
          { label: "Tables", path: "/features/tables/advanced" },
        ]}
        title={"Lịch Sử Bệnh Án"}
      />

      <Row>
        <Col>
          <Card>
            <Card.Body>
              <Table
                columns={columns}
                data={tableData}
                pageSize={5}
                sizePerPageList={[
                  { text: "5", value: 5 },
                  { text: "10", value: 10 },
                  { text: "25", value: 25 },
                  { text: "All", value: tableData.length },
                ]}
                isSortable={true}
                pagination={true}
                isExpandable={false}
              />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
}

export default Index;
