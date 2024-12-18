import React, { useState, useEffect } from "react";
import { Card, Table, Button, Modal, Row, Col } from "react-bootstrap";
import PageTitle from "../../components/PageTitle";
import { ShowInfoMedicalByBranch ,ShowInfoMedicalByOrg} from "../../controller/MedicalController";
import { useLocation } from "react-router-dom";
import jwtDecode from "jwt-decode";

// Define the patient data type
interface Patient {
    id: string;
    name: string;
    visitDate: string;
    service: string;
    notes: string;
    fieldsToShare?: { [key: string]: string }; // Make fieldsToShare optional
}

export default function CreateClinic(): JSX.Element {
    const [patients, setPatients] = useState<any[]>([]); // List of patients
    const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null); // Selected patient
    const [showModal, setShowModal] = useState<boolean>(false); // Modal visibility
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const model = queryParams.get("model");
    const token = localStorage.getItem("tokenadmin");
  const decodedToken: any = token ? jwtDecode(token) : null;
console.log(decodedToken);
    const showData = async () => {
        try {
            const data = {
                tokeorg: decodedToken.tokeorg
            };
            // Call your API here
            const response = await ShowInfoMedicalByOrg(data);
            await setPatients(response.data);

            console.log("Received data:", response);
        } catch (error) {
            console.error("An error occurred:", error);
        }
    };

    useEffect(() => {
        showData();
      
    }, [decodedToken.tokeorg]);
    const handleShow = (patient: any): void => {
        // Set the selected patient and show modal (you commented this part out)
        // setSelectedPatient(patient);
        // setShowModal(true);
        console.log(patient)
        // Correct usage of window.location.href to navigate to a new page
        window.location.href = `/hospital/patientdetails?type=branch&code=${patient.medicalRecordCode}`;
    };
    

    const handleClose = (): void => {
        setShowModal(false);
        setSelectedPatient(null);
    };

    return (
        <>
            <PageTitle
                breadCrumbItems={[
                    { label: "Trang chủ", path: "/" },
                    { label: "Quản lý bệnh viện", path: "/hospital" },
                    { label: "Bệnh nhân khám tại chi nhánh", path: "/hospital/patients", active: true },
                ]}
                title={"Danh Sách Bệnh Nhân"}
            />

            <Row className="justify-content-center">
                <Col md={12} lg={12}>
                    <Card>
                        <Card.Body>
                            <h4 className="header-title mb-4">Bệnh Nhân Khám Tại Chi Nhánh</h4>
                            <div className="table-responsive">
                                <Table striped bordered hover>
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Mã Bệnh Nhân</th>
                                            <th>Họ Tên</th>
                                            <th>cccd</th>
                                            <th>Chi Tiết</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {patients.length > 0 ? (
                                            patients.map((patient, index) => (
                                                <tr key={patient.id}>
                                                    <td>{index + 1}</td>
                                                    <td>{patient.medicalRecordCode                                                    }</td>
                                                    <td>{patient.fullname}</td>
                                                    <td>{patient.cccd}</td>
                                                    <td>
                                                        <Button
                                                            variant="info"
                                                            size="sm"
                                                            onClick={() => handleShow(patient)}
                                                        >
                                                            Xem Chi Tiết
                                                        </Button>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan={7} className="text-center">
                                                    Không có bệnh nhân nào
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </Table>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            {selectedPatient && (
                <Modal show={showModal} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Chi Tiết Bệnh Nhân</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p><strong>Mã Bệnh Nhân:</strong> {selectedPatient.id}</p>
                        <p><strong>Họ Tên:</strong> {selectedPatient.name}</p>
                        <p><strong>Ngày Khám:</strong> {selectedPatient.visitDate}</p>
                        <p><strong>Dịch Vụ:</strong> {selectedPatient.service}</p>
                        <p><strong>Ghi Chú:</strong> {selectedPatient.notes}</p>
                        {selectedPatient.fieldsToShare && selectedPatient.fieldsToShare["424e20b70e2d19cf2c62"] ? (
                            <p><strong>Chia sẻ thông tin:</strong> {selectedPatient.fieldsToShare["424e20b70e2d19cf2c62"]}</p>
                        ) : (
                            <p><strong>Không có thông tin chia sẻ</strong></p>
                        )}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>Đóng</Button>
                    </Modal.Footer>
                </Modal>
            )}
        </>
    );
}
