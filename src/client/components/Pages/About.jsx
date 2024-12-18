// import React from 'react';
import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Table, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function About() {
  // const [patients, setPatients] = useState([]);
  // useEffect(() => {
  //   // Giả sử bạn có một API để lấy danh sách bệnh nhân chờ khám
  //   const fetchPatients = async () => {
  //     try {
  //       const response = await fetch('/api/patients');
  //       const data = await response.json();
  //       setPatients(data);
  //     } catch (error) {
  //       console.error("Failed to fetch patients:", error);
  //     }
  //   };
  //   fetchPatients();
  // }, []);
  const patients = [
    {
      id: 1, ten: 'thi', tuoi: '12', gioitinh: 'nữ', tinhtrang: 'đau chân', khoakham: 'Khoa Ngoại'
    },
    {
      id: 2, ten: 'thi2', tuoi: '22', gioitinh: 'nữ', tinhtrang: 'nghẽn mạch', khoakham: 'Khoa Nội'
    }
  ]

  const renderActionButton = (khoakham) => {
    if (khoakham === "Khoa Ngoại") {
      return <>
        <Link to='/general-nurse'>
          <button className='btn btn-primary'>Khám bệnh</button>
        </Link>
      </>
    } else if (khoakham === "Khoa Nội") {
      return <>
        <Link to='/internal-medicine-nurse'>
          <button className='btn btn-primary'>Khám bệnh</button>
        </Link>
      </>
    }
    else if (khoakham === "Xét Nghiệm Máu") {
      return <>
        <Link to='/Blood-test-Nurse'>
          <button className='btn btn-primary'>Khám bệnh</button>
        </Link>
      </>
    }
    else if (khoakham === "Xét Nghiệm Nước Tiểu") {
      return <>
        <Link to='/internal-medicine-nurse'>
          <button className='btn btn-primary'>Khám bệnh</button>
        </Link>
      </>
    }
    else if (khoakham === "Chụp X-Quang") {
      return <>
        <Link to='/internal-medicine-nurse'>
          <button className='btn btn-primary'>Khám bệnh</button>
        </Link>
      </>
    }
    else {
      return <>Không Rõ khoa khám</>
    }
  }
  return (
    <>
      <div style={{ marginTop: '150px' }}>
        <Container>
          <h2 className="text-center mt-4">Danh sách bệnh nhân chờ khám</h2>
          <Table striped bordered hover className="mt-4 text-center">
            <thead>
              <tr>
                <th>STT</th>
                <th>Tên bệnh nhân</th>
                <th>Tuổi</th>
                <th>Giới tính</th>
                <th>Tình trạng</th>
                <th>khoa khám</th>
                <th>Hành động</th>
              </tr>
            </thead>
            <tbody>
              {patients.map((patient, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{patient.ten}</td>
                  <td>{patient.tuoi}</td>
                  <td>{patient.gioitinh}</td>
                  <td>{patient.tinhtrang}</td>
                  <td>{patient.khoakham}</td>
                  <td>{renderActionButton(patient.khoakham)}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Container>
      </div>
    </>
  );
}
