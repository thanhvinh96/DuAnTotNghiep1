import React from "react";
import { Card, Dropdown } from "react-bootstrap";
import { Link, Route } from "react-router-dom";
import classNames from "classnames";

interface UsersBalancesProps {
  balances: {
    id: number;
    ngaykham: string;
    nameBS: string;
    nameBV: string;
    diaChi: string;
    chandoan: string;
  }[];
}

const UsersBalances = ({ balances }: UsersBalancesProps) => {
  return (
    <>
      <Card>
        <Card.Body>
          <Dropdown className="float-end" align="end">
            <Dropdown.Toggle as="a" className="card-drop cursor-pointer">
              <i className="mdi mdi-dots-vertical"></i>
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item>Edit Report</Dropdown.Item>
              <Dropdown.Item>Export Report</Dropdown.Item>
              <Dropdown.Item>Action</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>

          <h4 className="header-title mb-3">LỊCH SỬ KHÁM BỆNH</h4>
          <div className="table-responsive">
            <table className="table table-borderless table-hover table-nowrap table-centered m-0">
              <thead className="table-light">
                <tr>
                  <th>Ngày Khám</th>
                  <th>Tên Bác Sĩ</th>
                  <th>Tên Bệnh Viện</th>
                  <th>Địa chỉ</th>
                  <th>Chẩn Đoán</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {(balances || []).map((item, i) => {
                  return (
                    <tr key={i}>
                      <td hidden>{item.id}</td>
                      <td>
                        <h5 className="m-0 fw-normal">{item.ngaykham}</h5>
                        <p className="mb-0 text-muted">
                          <small>Member Since 2017</small>
                        </p>
                      </td>

                      <td>
                        {item.nameBS}
                      </td>

                      <td>{item.nameBV}</td>

                      <td>{item.diaChi}</td>
                      <td>{item.chandoan}</td>

                      <td>
                        <Link to="/medical/medical record details" className="btn btn-xs">
                          <button >Xem Chi tiết</button>
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          
        </Card.Body>
      </Card>
    </>
  );
};

export default UsersBalances;
