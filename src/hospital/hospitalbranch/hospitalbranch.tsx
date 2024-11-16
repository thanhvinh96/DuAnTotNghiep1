import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import jwtDecode from 'jwt-decode';
import { Row, Col, Card, Button, InputGroup, FormControl, Dropdown, DropdownButton, ButtonGroup } from "react-bootstrap";
import PageTitle from "../../components/PageTitle";
import Table from "../../components/Table";
import { CreateBranchs, GetFullBranch } from "../../controller/BranchController";
import { GetInfoHospital } from "../../controller/HospitalController";

export default function HospitalBranch() {
  interface Branch {
    tokenbranch: string;
    branchname: string;
    branchphone: String;
    timecreate: String;
  }

  const [branches, setBranches] = useState<Branch[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const branchDetail = async () => {
    navigate('/hospital/detail-branch');
  };

  const columns = [
    {
      Header: "Mã chi nhánh",
      accessor: "tokenbranch",
      sort: true,
    },
    {
      Header: "Tên chi nhánh",
      accessor: "branchname",
      sort: true,
    },
    {
      Header: "Số điện thoại chi nhánh",
      accessor: "branchphone",
      sort: true,
    },
    {
      Header: "Ngày tạo",
      accessor: "timecreate",
      sort: true,
    },
    {
      Header: "Hành động",
      accessor: "action",
      sort: false,
      Cell: ({ row }: any) => (
        <>
          <div className="d-none d-md-inline"> {/* Hidden on small screens */}
            <ButtonGroup className="action-buttons">
              <Button variant="info" className="btn-sm" onClick={branchDetail}>
                <i className="fa fa-pencil"></i> Sửa
              </Button>
              <Button variant="danger" className="btn-sm">
                <i className="fa fa-stop"></i> Dừng
              </Button>
              <Button
                variant="secondary"
                className="btn-sm"
                onClick={() => navigate(`/hospital/branch/home?model=${row.original.tokenbranch}`)}
              >
                <i className="fa fa-cog"></i>Truy cập quản lý
              </Button>
             
            </ButtonGroup>
          </div>
          <div className="d-md-none"> {/* Show on small screens */}
            <DropdownButton
              as={ButtonGroup}
              id="dropdown-button-drop-end"
              drop="end"
              title="Thao tác"
              variant="secondary"
              className="btn-sm"
            >
              <Dropdown.Item onClick={branchDetail}><i className="fa fa-pencil"></i> Sửa</Dropdown.Item>
              <Dropdown.Item><i className="fa fa-stop"></i> Dừng</Dropdown.Item>
              <Dropdown.Item onClick={() => navigate(`/hospital/brach/create-service?model=${row.original.tokenbranch}`)}>
                <i className="fa fa-cog"></i> Tạo dịch vụ
              </Dropdown.Item>
              <Dropdown.Item onClick={() => navigate(`/hospital/create-personnel?model=${row.original.tokenbranch}`)}>
                <i className="fa fa-user-plus"></i> Tạo thành viên
              </Dropdown.Item>
              <Dropdown.Item onClick={() => navigate(`/hospital/create-clinic?model=${row.original.tokenbranch}`)}>
                <i className="fa fa-hospital"></i> Tạo phòng khám
              </Dropdown.Item>
            </DropdownButton>
          </div>
        </>
      ),
    },
  ];

  const data = branches
    .filter(branch =>
      branch.branchname.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .map(branch => ({
      tokenbranch: branch.tokenbranch,
      branchname: branch.branchname,
      branchphone: branch.branchphone,
      timecreate: branch.timecreate,
    }));

  const sizePerPageList = [
    { text: "5", value: 5 },
    { text: "10", value: 10 },
    { text: "25", value: 25 },
    { text: "Tất cả", value: data.length },
  ];

  useEffect(() => {
    const getData = async () => {
      try {
        const token = localStorage.getItem('tokenadmin');
        if (token) {
          const decodedToken: any = jwtDecode(token);
          const tokeorg = decodedToken['tokeorg'];
          const dataorg = { tokenorg: tokeorg };
          const data: any = await GetInfoHospital(dataorg);
          const _databrach = {
            value: data.result.nameorg,
            tokeorg: data.result.tokeorg,
          };
          const res = await GetFullBranch(_databrach);
          setBranches(res.data);
        }
      } catch (error) {
        console.log(error);
      }
    };

    getData();
  }, []);

  return (
    <>
      <PageTitle
        breadCrumbItems={[
          { label: "Trang chủ", path: "/" },
          { label: "Quản lý bệnh viện", path: "/hospital" },
          { label: "Chi nhánh bệnh viện", path: "/hospital/branch", active: true },
        ]}
        title={"Quản lý chi nhánh bệnh viện"}
      />
      <Row>
        <Col>
          <Card>
            <Card.Body>
              <div className="d-flex justify-content-between mb-3">
                <h4 className="header-title">Tìm kiếm chi nhánh</h4>
                <Button
                  variant="primary"
                  href="/hospital/create-branch"
                  className="btn-sm mx-1"
                >
                  <i className="fa fa-plus"></i> Tạo chi nhánh mới
                </Button>
              </div>
              <InputGroup className="mb-3">
                <FormControl
                  placeholder="Nhập tên chi nhánh để tìm kiếm..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </InputGroup>

              <div className="table-responsive">
                <Table
                  columns={columns}
                  data={data}
                  pageSize={5}
                  sizePerPageList={sizePerPageList}
                  isSortable={true}
                  pagination={true}
                  isSearchable={true}
                />
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
}
