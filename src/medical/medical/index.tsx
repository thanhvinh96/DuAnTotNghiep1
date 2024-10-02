import React from "react";
import { Row, Col, Card } from "react-bootstrap";

// components
import PageTitle from "../../components/PageTitle";
import Table from "../../components/Table";
import { records as data, expandableRecords } from "./data";
import '../../style.css';

function Index() {
  const columns = [
    {
      Header: "ID",
      accessor: "id",
      sort: true,
    },
    {
      Header: "Name",
      accessor: "name",
      sort: true,
    },
    {
      Header: "Phone Number",
      accessor: "phone",
      sort: false,
    },
    {
      Header: "Age",
      accessor: "age",
      sort: true,
    },
    {
      Header: "Company",
      accessor: "company",
      sort: false,
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
      value: data.length,
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

Index.propTypes = {};

export default Index;
