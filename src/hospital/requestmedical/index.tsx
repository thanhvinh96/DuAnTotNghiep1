import React, { useState ,useEffect} from "react";
import { Row, Col, Card, Button, Modal, Form } from "react-bootstrap";
import PageTitle from "../../components/PageTitle";
import Table from "../../components/Table";
import { records as data } from "./data";
import jwtDecode from 'jwt-decode';

export default function Index() {
    interface datapush {
        cccd: string;
        brach: string;
        tokeorg: string;
        content: string;
        value: String;
    }
    
    const [datapost, setdatapost] = useState<datapush>({
        cccd: '',
        brach: '',
        tokeorg: '',
        content: '',
        value:'',
    });
    
    const [showModal, setShowModal] = useState(false);


    const handleShowModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setdatapost(item => ({
            ...item,             
            cccd: e.target.value,
        }));
        
    };

    const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setdatapost(item => ({
            ...item,             
            content: e.target.value,
        }));
    };

    const handleRequest = () => {
        console.log(datapost);
        // alert('Sending request to medical examination book in progress');
        fetch('http://42.96.2.80:3002/request-record', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(datapost),
        })
        .then(response => response.json())        
        .then(data => {
            alert('If successful, please wait');
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Connection failure');
        });
        
        
    };

    const columns = [
        {
          Header: "ID",
          accessor: "id",
          sort: true,
        },
        {
          Header: "Name",
          accessor: "name",
          sort: true,
        },
        {
          Header: "Phone Number",
          accessor: "phone",
          sort: false,
        },
        {
          Header: "Age",
          accessor: "age",
          sort: true,
        },
        {
          Header: "Company",
          accessor: "company",
          sort: false,
        },
    ];

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
    const getData = async () => {
        const token = localStorage.getItem('tokenadmin');
        if (token) {
          try {
            const decodedToken: any = jwtDecode(token);
            // console.log("phanthuyen"+decodedToken['branch']);
            const tokeorg = decodedToken['tokeorg'];
            const brach = decodedToken['branch'];
            console.log(decodedToken['nameorg']);
            console.log("tê tổ chức"+decodedToken['branch']);
            setdatapost(item => ({
                ...item,             
                tokeorg: tokeorg,
                brach: brach,
                value:decodedToken['nameorg']
            }));
            
            
      
          } catch (error) {
            console.error('Có lỗi xảy ra:', error);
          }
        }
      };
      
      useEffect(() => {
        getData()
      },[])
    return (
        <>
            <Row className="align-items-center">
                <Col>
                    <div className="d-flex justify-content-between align-items-center">
                        <PageTitle
                            breadCrumbItems={[
                                { label: "Tables", path: "/features/tables/advanced" },
                                {
                                    label: "Information hospital",
                                    path: "/features/tables/advanced",
                                    active: true,
                                },
                            ]}
                            title={"Information hospital"}
                        />
                      
                    </div>
                </Col>
            </Row>

            <Row>
                <Col>
                    <Card>
                        <Card.Body>
                            <div className="d-flex justify-content-between align-items-center mb-4">
                                <div>
                                    <h4 className="header-title">Search</h4>
                                    <p className="text-muted font-14 mb-0">A Table allowing search</p>
                                </div>
                                <Button variant="primary" onClick={handleShowModal}>
                                    Show Modal
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

            {/* Modal Component */}
            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Request Information</Modal.Title>
                </Modal.Header>
                <Modal.Body>
    <Form>
        {/* Nhập liệu đầu tiên */}
        <Form.Group controlId="formBasicInput">
            <Form.Label>Input</Form.Label>
            <Form.Control
                type="text"
                placeholder="Enter something"
                onChange={handleInputChange}
            />
        </Form.Group>

        {/* Thêm phần nhập nội dung */}
        <Form.Group controlId="formContentInput">
            <Form.Label>Content</Form.Label>
            <Form.Control
                as="textarea"
                onChange={handleTextChange}
                rows={3} // Sử dụng textarea cho phần nhập nội dung
                placeholder="Enter content"
         
            />
        </Form.Group>
    </Form>
</Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleRequest}>
                        Request
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
