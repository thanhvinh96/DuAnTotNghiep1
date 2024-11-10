import React, { useState, useMemo, useEffect } from "react";
import { Row, Col, Card, Button, Modal } from "react-bootstrap";
import { useTable, usePagination, useSortBy, useGlobalFilter, Column, Row as TableRow } from "react-table";
import StatisticsWidget3 from "../../../components/StatisticsWidget3";
import jwtDecode from 'jwt-decode';

// Định nghĩa kiểu dữ liệu cho lịch hẹn
interface Appointment {
  id: number;
  patientName: string;
  examinationContent: string;
  appointmentTime: string;
  status: string;
}

// Định nghĩa kiểu dữ liệu mà API trả về
interface AppointmentData {
  id: number;
  patient: string;
  title: string;
  timeschedule: string;
  status?: string;
}

// Định nghĩa kiểu dữ liệu cho dịch vụ
interface Service {
  _id: string;
  serviceCode: string;
  serviceType:string;
  serviceName: string;
}

// Dashboard3 Component
const Dashboard3 = () => {
  const token = localStorage.getItem('tokenadmin');
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [services, setServices] = useState<Service[]>([]); // State lưu danh sách dịch vụ
  const [showModal, setShowModal] = useState(false); // State điều khiển modal
  const [selectedPatient, setSelectedPatient] = useState<string | null>(null); // Bệnh nhân đã chọn để chỉnh sửa
  const decodedToken: any = token ? jwtDecode(token) : null;

  const showdata = async () => {
    try {
      const res = await fetch('http://127.0.0.1:8000/api/schedule/bydoctor', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          doctor: decodedToken ? decodedToken['tokenuser'] : "",
        }),
      });
  
      // Kiểm tra phản hồi đầu tiên
      if (!res.ok) {
        throw new Error("Error fetching schedule by doctor");
      }
  
      const _res = await fetch("http://127.0.0.1:8000/api/check-services", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          serviceName: decodedToken ? decodedToken['specialized'] : "",
        }),
      });
  
      // Kiểm tra phản hồi thứ hai
      if (!_res.ok) {
        throw new Error("Error fetching check-services");
      }
  
      // Đảm bảo rằng `decodedToken['specialized']` có giá trị
      const serviceData: { data: Service[] } = await _res.json();
      console.log('Loại dịch vụ: ' + JSON.stringify(serviceData));
      setServices(serviceData.data); // Đúng vì truy cập vào mảng dịch vụ qua thuộc tính `data`
      
      const data: AppointmentData[] = await res.json();
      const transformedData = data.map((item: AppointmentData) => ({
        id: item.id,
        patientName: item.patient,
        examinationContent: item.title,
        appointmentTime: new Date(item.timeschedule).toLocaleString(),
        status: item.status || "Chờ khám",
      }));
  
      setAppointments(transformedData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  
  // Gọi showdata khi component mount
  useEffect(() => {
    showdata();
  }, []);

  // Định nghĩa cột với kiểu Column<Appointment>
  const columns: Column<Appointment>[] = useMemo(
    () => [
      {
        Header: "Tên bệnh nhân",
        accessor: "patientName",
      },
      {
        Header: "Nội dung khám",
        accessor: "examinationContent",
      },
      {
        Header: "Thời gian",
        accessor: "appointmentTime",
      },
      {
        Header: "Trạng thái",
        accessor: "status",
        Cell: ({ value }) => (
          <span className={`badge ${value === "Đã khám" ? "badge-success" : "badge-warning"}`}>
            {value}
          </span>
        ),
      },
      {
        Header: "Hành động",
        Cell: ({ row }: { row: TableRow<Appointment> }) => (
          <div className="d-flex gap-2">
            <Button
              variant="outline-primary"
              size="sm"
              onClick={() => handleEdit(row.original.patientName)}
            >
              Chỉnh sửa
            </Button>
            <a
              href={`/delete?model=${row.original.patientName}`}
              className="btn btn-outline-danger btn-sm"
            >
              Xóa
            </a>
          </div>
        ),
      },
    ],
    []
  );

  const data = useMemo(() => appointments, [appointments]);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    state,
    setGlobalFilter,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
    gotoPage,
    setPageSize,
  } = useTable(
    {
      columns,
      data,
      initialState: { pageSize: 5 },
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  const handleEdit = (patientName: string) => {
    setSelectedPatient(patientName);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedPatient(null);
  };

  return (
    <>
      <Row>
        <Col md={6}>
          <StatisticsWidget3
            title="Tổng số bệnh nhân đã khám"
            stats={appointments.length.toString()}
            trend={{
              label: "Tổng số bệnh nhân",
              value: appointments.length.toString(),
              icon: "fa-users",
              variant: "success",
              trendStats: "100%",
            }}
          />
        </Col>
        <Col md={6}>
          <StatisticsWidget3
            title="Số bệnh nhân đang chờ"
            stats={appointments.filter((appt) => appt.status === "Chờ khám").length.toString()}
            trend={{
              label: "Bệnh nhân đang chờ",
              value: appointments.filter((appt) => appt.status === "Chờ khám").length.toString(),
              icon: "fa-user-clock",
              variant: "warning",
              trendStats: "Hiện tại",
            }}
          />
        </Col>
      </Row>

      <Row className="mt-4">
        <Col>
          <Card>
            <Card.Body>
              <h4 className="header-title">Lịch hẹn bệnh nhân</h4>
              <p className="text-muted font-14 mb-4">
                Bảng hiển thị cho phép tìm kiếm, sắp xếp và phân trang.
              </p>

              {/* Search input */}
              <input
                value={state.globalFilter || ""}
                onChange={(e) => setGlobalFilter(e.target.value)}
                placeholder="Tìm kiếm bệnh nhân..."
                className="form-control mb-3"
              />

              {/* Table */}
              <table {...getTableProps()} className="table table-bordered table-hover table-striped table-responsive mb-0 text-dark">
                <thead className="thead-dark">
                  {headerGroups.map((headerGroup) => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                      {headerGroup.headers.map((column) => (
                        <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                          {column.render("Header")}
                          {column.isSorted ? (column.isSortedDesc ? " 🔽" : " 🔼") : ""}
                        </th>
                      ))}
                    </tr>
                  ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                  {page.map((row) => {
                    prepareRow(row);
                    return (
                      <tr {...row.getRowProps()} className="align-middle">
                        {row.cells.map((cell) => (
                          <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                        ))}
                      </tr>
                    );
                  })}
                </tbody>
              </table>

              {/* Pagination */}
              {pageOptions.length > 1 && (
                <div className="pagination mt-3">
                  <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
                    {"<<"}
                  </button>
                  <button onClick={() => previousPage()} disabled={!canPreviousPage}>
                    {"<"}
                  </button>
                  <button onClick={() => nextPage()} disabled={!canNextPage}>
                    {">"}
                  </button>
                  <button onClick={() => gotoPage(pageOptions.length - 1)} disabled={!canNextPage}>
                    {">>"}
                  </button>
                  <span className="mx-3">
                    Page{" "}
                    <strong>
                      {state.pageIndex + 1} of {pageOptions.length}
                    </strong>{" "}
                  </span>
                  <select
                    value={state.pageSize}
                    onChange={(e) => setPageSize(Number(e.target.value))}
                  >
                    {[5, 10, 20].map((pageSize) => (
                      <option key={pageSize} value={pageSize}>
                      Show {pageSize}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </Card.Body>
        </Card>
      </Col>
    </Row>

    {/* Modal hiển thị danh sách dịch vụ */}
    <Modal show={showModal} onHide={handleCloseModal}>
      <Modal.Header closeButton>
        <Modal.Title>Danh sách dịch vụ cho bệnh nhân: {selectedPatient}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {services.length > 0 ? (
          <ul>
            {services.map((service) => (
              <li key={service.serviceType}>
<a href={`/nurse?typeform=${service.serviceType}&patient=${selectedPatient}`} target="_blank" rel="noopener noreferrer">
    {service.serviceName} - {service.serviceCode}
                </a>
              </li>
            ))}
          </ul>
        ) : (
          <p>Không có dịch vụ nào được tìm thấy.</p>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleCloseModal}>
          Đóng
        </Button>
      </Modal.Footer>
    </Modal>
  </>
);
};

export default Dashboard3;
