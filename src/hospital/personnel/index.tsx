import React, { useState, useEffect } from "react";
import { Row, Col, Card, Button } from "react-bootstrap";
import PageTitle from "../../components/PageTitle";
import { useNavigate } from "react-router-dom";
import Table from "../../components/Table";
import jwtDecode from 'jwt-decode';
import {GetInfoHospital} from '../../controller/HospitalController'
import {GetInfoFullPersonnel} from '../../controller/PersonnelController'
export default function Index() {

  interface Persinnel {
    address: string;
    fullname: string;
    organizationalvalue: string;
    phone: string;
    typeusers: string;
    tokenuser: string;
  }

  const [data, setdata] = useState<Persinnel[]>([]);
  
  const columns = [
    {
      Header: "User Type",
      accessor: "typeusers",
      sort: false,
    },
    {
      Header: "Full Name",
      accessor: "fullname",
      sort: true,
    },
    {
      Header: "Phone Number",
      accessor: "phone",
      sort: false,
    },
    {
      Header: "Organizational Value",
      accessor: "organizationalvalue",
      sort: true,
    },
  
    {
      Header: "Address",
      accessor: "address", 
      sort: true,
    },
    {
      Header: "Actions",
      accessor: "actions",
    Cell: ({ row }: any) => {
      const navigate = useNavigate();

      const clickEdit = () => {
        const { tokenuser } = row.original;
        navigate(`/hospital/edit-personnel?tokenuser=${tokenuser}`);
      };

      return (
        <div>
          <Button variant="primary" onClick={clickEdit} style={{ marginRight: '10px' }}>Edit</Button>
          <Button variant="danger">Delete</Button>
        </div>
      );
    },
    sort: false,
    },
  ];
 

  const sizePerPageList = [
    { text: "5", value: 5 },
    { text: "10", value: 10 },
    { text: "25", value: 25 },
    { text: "All", value: data.length },
  ];

  const navigate = useNavigate();

  const handleCreateMember = () => {
    navigate('/hospital/create-personnel');
  };

  useEffect(() => {
    const fetchBranches = async () => {
      try {
        const token = localStorage.getItem('tokenadmin');
        if (token) {
          const decodedToken: any = jwtDecode(token);
          console.log(decodedToken['tokeorg']);

          const tokeorg = decodedToken['tokeorg'];
          const dataorg = { "tokenorg": tokeorg };

          const response:any = await GetInfoHospital(dataorg);
          console.log(response.result.tokeorg);
          const dataorgs={
          "tokeorg": response.result.tokeorg,
          "value": response.result.nameorg 
          }
          // if (!response.ok) {
          //   throw new Error('Network response was not ok');
          // }

          // const _data = await response.json();
          const _res:any = await GetInfoFullPersonnel(dataorgs)
          console.log(_res);
         

          // // Kiểm tra cấu trúc của responseData
          const filteredRecords = _res.data.map((item: any) => ({
            typeusers: item.typeusers,
            fullname: item.fullname,
            organizationalvalue: item.organizationalvalue,
            phone: item.phone,
            address: item.address,
            tokenuser: item.tokenuser,

          }));
          
          setdata(filteredRecords);
        }
      } catch (error) {
        console.error("Error fetching branches:", error);
      }
    };

    fetchBranches();
  }, []);

  return (
    <>
      <PageTitle
        breadCrumbItems={[
          { label: "Tables", path: "/features/tables/advanced" },
          {
            label: "Personnel Management",
            path: "/hospital/personnel-management",
            active: true,
          },
        ]}
        title={"Hospital branch"}
      />

      <Row>
        <Col>
          <Card>
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h4 className="header-title">Search</h4>
                  <p className="text-muted font-14 mb-4">A Table allowing search</p>
                </div>
                <Button style={{width:'130px'}} variant="primary" onClick={handleCreateMember}>
                  Tạo thành viên
                </Button>
              </div>

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
  );
}
