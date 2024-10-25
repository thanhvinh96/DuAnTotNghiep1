import React, { useState, useEffect } from "react";
import { Row, Col, Card, Button, Form, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import PageTitle from "../../components/PageTitle";
import jwtDecode from 'jwt-decode';
import { GetInfoFullPersonnel,CreatePersonnels } from '../../controller/PersonnelController'
import { GetInfoHospital } from '../../controller/HospitalController'
import { GetFullBranch } from '../../controller/BranchController'

interface Branch {
    tokenbranch: string;
    branchname: string;
}

export default function CreatePersonnel() {
    const [formData, setFormData] = useState({
        fullname: "",
        address: "",
        phone: "",
        typeusers: "Doctor",
        branch: "",
        password: "",
        tokeorg: "",
        value: "",
        cccd: "",
        imgidentification: "", // Đã cập nhật tên biến cho phù hợp
    });
    const [showModal, setShowModal] = useState(false);
    const [modalContent, setModalContent] = useState({ title: '', body: '' });
    const handleClose = () => setShowModal(false);
    const [branches, setBranches] = useState<Branch[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchBranches = async () => {
            try {
                const token = localStorage.getItem('tokenadmin');
                if (token) {
                    const decodedToken: any = jwtDecode(token);
                    console.log(decodedToken['tokeorg']);

                    const tokeorg = decodedToken['tokeorg'];
                    const dataorg = {
                        "tokenorg": tokeorg
                    };
                    const response: any = await GetInfoHospital(dataorg);
                    console.log(response);
                    if (response.result != null) {
                        const _data = await response.result;
                        console.log(_data.tokeorg);
                        setFormData({
                            ...formData,
                            tokeorg: _data.tokeorg,
                            value: _data.nameorg,
                        });
                        const datagetFullBranch={
                            tokeorg: _data.tokeorg,
                            value: _data.nameorg,
                        }
                        const _response = await GetFullBranch(datagetFullBranch);
                    if (_response.success === true) {
                      const DataBranch = _response.data;
                      setBranches(_response.data);
                      console.log(DataBranch);

                    }
                    }
                   
                }
            } catch (error) {
                console.error("Error fetching branches:", error);
            }
        };

        fetchBranches();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setFormData({
            ...formData,
            branch: e.target.value,
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
    
        try {
            // Hiển thị modal thông báo đang xử lý
            setModalContent({ title: 'Processing...', body: 'Creating branch, please wait...' });
            setShowModal(true);
            console.log(formData);
            
            // Gửi yêu cầu POST đến server
            const response: any = await CreatePersonnels(formData);
            
            // Kiểm tra phản hồi từ server
            console.log(response.success);
            if (response.success === true) {
                // Không cần chuyển đổi response thành JSON lần nữa
                console.log("User created successfully:", response.result);
                setModalContent({ title: 'Success', body: 'User created successfully: ' + response.result });
    
            } else {
                setModalContent({ title: 'Error', body: 'Failed to create user. Please try again.' });
            }
        } catch (error) {
            // Xử lý lỗi kết nối hoặc lỗi khác
            console.error("Unexpected error:", error);
            setModalContent({ title: 'Error', body: 'An unexpected error occurred. Please try again.' });
        }
    };
    

    const handleBack = () => {
        navigate(-1); // Go back to the previous page
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            const reader = new FileReader();

            reader.onloadend = () => {
                setFormData({
                    ...formData,
                    imgidentification: reader.result as string, // Convert to base64
                });
            };

            reader.readAsDataURL(file); // Convert to base64
        }
    };

    return (
        <>
            <PageTitle
                breadCrumbItems={[
                    { label: "Tables", path: "/features/tables/advanced" },
                    {
                        label: "Create Personnel",
                        path: "/hospital/Create-personnel",
                        active: true,
                    },
                ]}
                title={"Create Personnel"}
            />

            <Row>
                <Col>
                    <Card>
                        <Card.Body>
                            <h4 className="header-title">Create Personnel</h4>
                            <p className="text-muted font-14 mb-4">
                                Fill out the following information to create a new member
                            </p>

                            <Form onSubmit={handleSubmit}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Full Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder={formData.fullname}
                                        name="fullname"
                                        value={formData.fullname}
                                        onChange={handleChange}
                                        required
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>Address</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder={formData.address}
                                        name="address"
                                        value={formData.address}
                                        onChange={handleChange}
                                        required
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>Phone Number</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder={formData.phone}
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        required
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>cccd Number</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder={formData.cccd}
                                        name="cccd"
                                        value={formData.cccd}
                                        onChange={handleChange}
                                        required
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>ID Card (CCCD)</Form.Label>
                                    <Form.Control
                                        type="file"
                                        accept="image/*"
                                        onChange={handleFileChange}
                                        required
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>User Type</Form.Label>
                                    <Form.Select
                                        name="typeusers"
                                        value={formData.typeusers}
                                        onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                                            setFormData({ ...formData, typeusers: e.target.value })
                                        }
                                        required
                                    >
                                        <option value="admin">Admin</option>
                                        <option value="doctor">Doctor</option>
                                        <option value="nurse">Nurse</option>
                                        <option value="staff">Staff</option>
                                    </Form.Select>
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>Branch</Form.Label>
                                    <Form.Select
                                        name="branch"
                                        value={formData.branch}
                                        onChange={handleSelectChange}
                                        required
                                    >
                                        <option value="">Select a branch</option>
                                        {branches.map((branch) => (
                                            <option key={branch.tokenbranch} value={branch.tokenbranch}>
                                                {branch.branchname}
                                            </option>
                                        ))}
                                    </Form.Select>
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control
                                        type="password"
                                        placeholder="********"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        required
                                    />
                                </Form.Group>

                                <div className="d-flex">
                                    <Button variant="secondary" className="me-2" onClick={handleBack}>
                                        Back
                                    </Button>
                                    <Button variant="primary" type="submit">
                                        Create Member
                                    </Button>
                                </div>

                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <Modal show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{modalContent.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>{modalContent.body}</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
