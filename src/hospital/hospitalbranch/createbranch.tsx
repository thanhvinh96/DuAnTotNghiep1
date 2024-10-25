import React, { useState, useEffect } from "react";
import { Row, Col, Card, Button, Form, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import jwtDecode from 'jwt-decode';
import 'bootstrap/dist/css/bootstrap.min.css';
import PageTitle from "../../components/PageTitle";
import {CreateBranchs} from "../../controller/BranchController";
import {GetInfoHospital} from "../../controller/HospitalController";
export default function CreateBranch() {
    const navigate = useNavigate(); // Initialize useNavigate

    const [showModal, setShowModal] = useState(false);
    const [modalContent, setModalContent] = useState({ title: '', body: '' });
    const [dataBranch, setDataBranch] = useState({
        value: '',
        tokeorg: '',
        branchname: '',
        branchaddress: '',
        branchphone: '',
        branchemail: '',
        branchbusinesslicense: '',
    });

    useEffect(() => {
        const getData = async () => {
            const token = localStorage.getItem('tokenadmin');
            if (token) {
                const decodedToken: any = jwtDecode(token);
                console.log(decodedToken['tokeorg']);
            
                const tokeorg = decodedToken['tokeorg'];
                const dataorg = {
                    "tokenorg": tokeorg
                  };
                const res = await GetInfoHospital(dataorg);
                  console.log(res);
            
                // const response = await fetch('http://42.96.2.80:3002/getinfo-org/', {
                //   method: 'POST',
                //   body: JSON.stringify(dataorg),
                //   headers: {
                //     "Content-Type": "application/json",
                //   },
                // });
            
                // if (!response.ok) { 
                //   throw new Error('Network response was not ok');
                // }
            
                // const data = await response.json();
                // console.log('giá trị data');
                // console.log(data.result.nameorg);
                setDataBranch(prevState => ({
                    ...prevState,
                    value: res.result.nameorg,
                    tokeorg: res.result.tokeorg,
                }));
            }
        };

        getData();
    }, []); // Mảng phụ thuộc rỗng

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, files } = e.target;

        if (type === 'file' && files) {
            const file = files[0];
            if (file) {
                const reader = new FileReader();
                reader.onloadend = () => {
                    setDataBranch(prevState => ({
                        ...prevState,
                        [name]: reader.result as string
                    }));
                };
                reader.readAsDataURL(file);
            }
        } else {
            setDataBranch(prevState => ({
                ...prevState,
                [name]: value
            }));
        }
    };

    const createBranch = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); // Prevent form from submitting and reloading the page
        setModalContent({ title: 'Processing...', body: 'Creating branch, please wait...' });
        setShowModal(true); // Show the modal

        try {
            console.log(dataBranch);
            const response:any = await CreateBranchs(dataBranch);
            console.log(response);
            if(response.success===true){
                setModalContent({ title: 'Success', body: 'Branch created successfully!' });

            }else{
                const error = await response.json();
                setModalContent({ title: 'Error', body: 'Failed to create branch. Please try again later.' });
            }

          

        } catch (error) {
            setModalContent({ title: 'Error', body: 'Failed to create branch. Please try again later.' });
            console.error(error);
        }
    };

    const handleClose = () => setShowModal(false);
    const backlink = () => navigate('/hospital/hospital-branch');

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
                title={"Create Branch"}
            />
            <Row>
                <Col>
                    <Card>
                        <Card.Body>
                            <Form onSubmit={createBranch}>
                                <Form.Group controlId="formBranchName">
                                    <Form.Label>Branch Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter branch name"
                                        name="branchname"
                                        value={dataBranch.branchname}
                                        onChange={handleChange}
                                        required
                                    />
                                </Form.Group>

                                <Form.Group controlId="formBranchAddress">
                                    <Form.Label>Address</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter branch address"
                                        name="branchaddress"
                                        value={dataBranch.branchaddress}
                                        onChange={handleChange}
                                        required
                                    />
                                </Form.Group>

                                <Form.Group controlId="formBranchPhone">
                                    <Form.Label>Phone Number</Form.Label>
                                    <Form.Control
                                        type="tel"
                                        placeholder="Enter contact phone number"
                                        name="branchphone"
                                        value={dataBranch.branchphone}
                                        onChange={handleChange}
                                        required
                                    />
                                </Form.Group>

                                <Form.Group controlId="formBranchEmail">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control
                                        type="email"
                                        placeholder="Enter branch email"
                                        name="branchemail"
                                        value={dataBranch.branchemail}
                                        onChange={handleChange}
                                        required
                                    />
                                </Form.Group>

                                <Form.Group controlId="formBranchBusinessLicense">
                                    <Form.Label>Business License</Form.Label>
                                    <Form.Control
                                        type="file"
                                        name="branchbusinesslicense"
                                        accept="image/*"
                                        onChange={handleChange}
                                        required
                                    />
                                </Form.Group>

                                <div className="d-flex justify-content-start mt-2">
    <Button
        variant="secondary"
        className="btn-sm me-2" // Sử dụng me-2 để tạo khoảng cách giữa các nút
        onClick={backlink}
    >
        Back
    </Button>
    <Button
        variant="primary"
        type="submit"
        className="btn-sm"
    >
        Save
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
