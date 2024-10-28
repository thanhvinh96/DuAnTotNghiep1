import React, { useEffect, useState } from "react";
// import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import jwtDecode from 'jwt-decode';
import { Row, Col, Card, Button } from "react-bootstrap";
// components
import PageTitle from "../../components/PageTitle";
import Table from "../../components/Table";
import {CreateBranchs,GetFullBranch} from "../../controller/BranchController";
import {GetInfoHospital} from "../../controller/HospitalController";
export default function Hospitalbranch() {
  // import { records as data } from "./data";
  interface Branch {
    tokenbranch: string;
    branchname: string;
    branchphone: String;
    timecreate: String;
  }
  const branchdetail = async () => {
    navigate('/hospital/detail-branch');
  }
  const columns = [
    {
      Header: "Token Branch",
      accessor: "tokenbranch",
      sort: true,
    },
    {
      Header: "Branch Name",
      accessor: "branchname",
      sort: true,
    },
    {
      Header: "Branch Phone",
      accessor: "branchphone",
      sort: true,
    },
    {
      Header: "Time Created",
      accessor: "timecreate",
      sort: true,
    },
    {
      Header: "Action",
      accessor: "action",
      sort: false,
      Cell: ({ row }: any) => (
        <div>
          <Button variant="info" className="btn-sm mx-1" onClick={branchdetail}>Edit</Button>
          <Button variant="danger" className="btn-sm mx-1">Stop</Button>
        </div>
      ),
    },
  ];


  const [branches, setbranches] = useState<Branch[]>([]);
  const navigate = useNavigate(); // Di chuyển useNavigate vào trong component

  const data = branches.map(branch => ({
    tokenbranch: branch.tokenbranch,
    branchname: branch.branchname,
    branchphone: branch.branchphone,
    timecreate: branch.timecreate,
  }));
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
  useEffect(() => {
    const getData = async () => {
      try {

        const token = localStorage.getItem('tokenadmin');
        if (token) {
          const decodedToken: any = jwtDecode(token);
          console.log(decodedToken['tokeorg']);

          const tokeorg = decodedToken['tokeorg'];
          const dataorg = {
            "tokenorg": tokeorg
          };

          const data:any = await GetInfoHospital(dataorg);
          console.log(data);
         
          const _databrach = {

            "value": data.result.nameorg,
            "tokeorg": data.result.tokeorg,
          }
          const res = await GetFullBranch(_databrach)
          console.log(res);
          // const res = await fetch('http://42.96.2.80:3002/getfull-brach', {
          //   method: 'POST',
          //   body: JSON.stringify(_databrach),
          //   headers: {
          //     "Content-Type": "application/json",
          //   },
          // });
          // if (!res.ok) {
          //   throw new Error('Network response was not ok');
          // }

          // const databranch = await res.json();
          // console.log(databranch.data)
          setbranches(res.data); // Lưu dữ liệu vào state


        }
      } catch (error) {
        console.log(error)
      }
    };

    getData();
  }, []); // Mảng phụ thuộc rỗng

  return (
    <>
      <PageTitle
        breadCrumbItems={[
          { label: "Tables", path: "/features/tables/advanced" },
          {
            label: "Information hospital",
            path: "/features/tables/advanced",
            active: true,
          },
        ]}
        title={"Hospital branch"}
      />
      <Row>
        <Col>
          <Card>
            <Card.Body>
              <div className="mb-3">
                <div className="d-flex justify-content-end">
                  <Button
                    variant="primary"
                    href="/hospital/create-branch"
                    className="btn-sm mx-1"
                  >
                    <i className="fa fa-plus"></i> Create new branch
                  </Button>
                </div>
              </div>
              <h4 className="header-title">Search</h4>
              <p className="text-muted font-14">A Table allowing search</p>
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
