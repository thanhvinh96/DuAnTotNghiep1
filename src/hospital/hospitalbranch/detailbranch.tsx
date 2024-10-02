import React, { useEffect, ChangeEvent, FormEvent, useState } from "react";
import Statistics from "./Statistics";
import { Row, Col, Card, Form, Button,Collapse } from 'react-bootstrap';
import { useNavigate} from 'react-router-dom';
import PageTitle from "../../components/PageTitle";
import Table from "../../components/Table";
interface Records {
    id: number;
    age: number;
    name: string;
    company: string;
    phone: string;
  }
  
const data: Records[] = [
    {
      id: 1,
      age: 32,
      name: "Burt",
      company: "Kaggle",
      phone: "+1 (823) 532-2427",
    },
    {
      id: 2,
      age: 23,
      name: "Bruno",
      company: "Magmina",
      phone: "+1 (813) 583-2089",
    },
  
    {
      id: 60,
      age: 20,
      name: "Manning",
      company: "Handshake",
      phone: "+1 (917) 405-3406",
    },
  ];
  
const columns = [
  {
    Header: "ID",
    accessor: "id",
    sort: true,
  },
  {
    Header: "Branch Name",
    accessor: "Branch name",
    sort: true,
  },
  {
    Header: "Branch Phone",
    accessor: "phone",
    sort: false,
  },
  {
    Header: "Time Creact",
    accessor: "age",
    sort: true,
  },
  {
    Header: "Action",
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

export default function Detailbranch() {
  const [open, setOpen] = useState(false);

  return (
   <>
    <Row>
    <Col>
      <div className="page-title-box">
        <div className="page-title-right">
          <form className="d-flex align-items-center mb-3">
            <div className="input-group input-group-sm">
             
            </div>
            <button className="btn btn-blue btn-sm ms-2">
              <i className="mdi mdi-autorenew"></i>
            </button>
            <button className="btn btn-blue btn-sm ms-1">
              <i className="mdi mdi-filter-variant"></i>
            </button>
          </form>
        </div>
        <h4 className="page-title">Dashboard</h4>
      </div>
    </Col>
  </Row>

    <Statistics />
    <Row>
      <Col>
        <Card>
          <Card.Body>
            <h4 className="header-title">Branch Information</h4>
            
            <Button
              onClick={() => setOpen(!open)}
              aria-controls="branchFormCollapse"
              aria-expanded={open}
              variant="secondary"
            >
              {open ? 'Hide Form' : 'Show Form'}
            </Button>

            <Collapse in={open}>
              <div id="branchFormCollapse">
                <Form className="mt-3">
                  <Form.Group className="mb-3" controlId="tokenbrach">
                    <Form.Label>Token Branch</Form.Label>
                    <Form.Control type="text" placeholder="Enter token branch" />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="branchname">
                    <Form.Label>Branch Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter branch name" />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="branchaddress">
                    <Form.Label>Branch Address</Form.Label>
                    <Form.Control type="text" placeholder="Enter branch address" />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="branchphone">
                    <Form.Label>Branch Phone</Form.Label>
                    <Form.Control type="text" placeholder="Enter branch phone" />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="branchemail">
                    <Form.Label>Branch Email</Form.Label>
                    <Form.Control type="email" placeholder="Enter branch email" />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="branchbusinesslicense">
                    <Form.Label>Branch Business License</Form.Label>
                    <Form.Control type="file" />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="timecreate">
                    <Form.Label>Time Create</Form.Label>
                    <Form.Control type="text" placeholder="Enter time created" />
                  </Form.Group>

                  <Button variant="primary" type="submit">
                    Submit
                  </Button>
                </Form>
              </div>
            </Collapse>
          </Card.Body>
        </Card>
      </Col>
    </Row>
    <Row>
        <Col>
          <Card>
            <Card.Body>
              <h4 className="header-title">Personnel management</h4>
              <p className="text-muted font-14 mb-4">Total number of branch team members</p>

              <Table
                columns={columns}
                data={data}
                pageSize={5}
                sizePerPageList={sizePerPageList}
                isSortable={true}
                pagination={true}
                isSearchable={true}
              />
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col>
          <Card>
            <Card.Body>
              <h4 className="header-title">Patient</h4>
              <p className="text-muted font-14 mb-4">Total number of patient admissions</p>

              <Table
                columns={columns}
                data={data}
                pageSize={5}
                sizePerPageList={sizePerPageList}
                isSortable={true}
                pagination={true}
                isSearchable={true}
              />
            </Card.Body>
          </Card>
        </Col>
      </Row>
   </>
  )
}
