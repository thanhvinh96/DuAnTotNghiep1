import React, { useState, useEffect } from "react";
import { Row, Col, Card, Button } from "react-bootstrap";
import PageTitle from "../../components/PageTitle";
import { useNavigate } from "react-router-dom";
import Table from "../../components/Table";
import jwtDecode from "jwt-decode";
import { GetInfoHospital } from "../../controller/HospitalController";
import { GetInfoFullPersonnel } from "../../controller/PersonnelController";

export default function Index() {
  interface Personnel {
    address: string;
    fullname: string;
    organizationalvalue: string;
    phone: string;
    typeusers: string;
    tokenuser: string;
  }

  const [data, setData] = useState<Personnel[]>([]);

  const columns = [
    {
      Header: "Loại người dùng",
      accessor: "typeusers",
      sort: false,
    },
    {
      Header: "Họ và tên",
      accessor: "fullname",
      sort: true,
    },
    {
      Header: "Số điện thoại",
      accessor: "phone",
      sort: false,
    },
    {
      Header: "Tổ chức",
      accessor: "organizationalvalue",
      sort: true,
    },
    {
      Header: "Địa chỉ",
      accessor: "address",
      sort: true,
    },
    {
      Header: "Hành động",
      accessor: "actions",
      Cell: ({ row }: any) => {
        const navigate = useNavigate();

        const clickEdit = () => {
          const { tokenuser } = row.original;
          navigate(`/hospital/edit-personnel?tokenuser=${tokenuser}`);
        };

        return (
          <div className="d-flex justify-content-center align-items-center">
            <Button
              variant="primary"
              className="btn-sm me-2"
              onClick={clickEdit}
            >
              <i className="fa fa-pencil"></i> Chỉnh sửa
            </Button>
            <Button variant="danger" className="btn-sm">
              <i className="fa fa-trash"></i> Xóa
            </Button>
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
    { text: "Tất cả", value: data.length },
  ];

  const navigate = useNavigate();

  const handleCreateMember = () => {
    navigate("/hospital/create-personnel");
  };

  useEffect(() => {
    const fetchPersonnel = async () => {
      try {
        const token = localStorage.getItem("tokenadmin");
        if (token) {
          const decodedToken: any = jwtDecode(token);
          const tokeorg = decodedToken["tokeorg"];
          const dataorg = { tokenorg: tokeorg };

          const response: any = await GetInfoHospital(dataorg);
          const dataorgs = {
            tokeorg: response.result.tokeorg,
            value: response.result.nameorg,
          };

          const personnelResponse: any = await GetInfoFullPersonnel(dataorgs);
          const filteredRecords = personnelResponse.data.map((item: any) => ({
            typeusers: item.typeusers,
            fullname: item.fullname,
            organizationalvalue: item.organizationalvalue,
            phone: item.phone,
            address: item.address,
            tokenuser: item.tokenuser,
          }));

          setData(filteredRecords);
        }
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu:", error);
      }
    };

    fetchPersonnel();
  }, []);

  return (
    <>
      <PageTitle
        breadCrumbItems={[
          { label: "Trang chủ", path: "/features/tables/advanced" },
          {
            label: "Quản lý nhân sự",
            path: "/hospital/personnel-management",
            active: true,
          },
        ]}
        title={"Quản lý nhân sự"}
      />

      <Row>
        <Col>
          <Card>
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h4 className="header-title mb-0">Danh sách nhân sự</h4>
                <Button
                  style={{ width: "150px" }}
                  variant="primary"
                  onClick={handleCreateMember}
                >
                  <i className="fa fa-plus"></i> Thêm nhân sự
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
