import React, { useState, useEffect } from "react";
import { Card, Form, Button, Row, Col, Alert, Table } from "react-bootstrap";
import PageTitle from "../../components/PageTitle";
import { useNavigate, useLocation } from "react-router-dom";
import { CreaterDepart, GetDepartByBranch,DeleTeDepartByBranch } from "../../controller/DepartController";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

export default function CreateDepartment() {
    const [departmentCode, setDepartmentCode] = useState<string>("");
    const [departmentName, setDepartmentName] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [tokenbranch, setTokenbranch] = useState<string>("");
    const [message, setMessage] = useState<string>("");
    const [isSuccess, setIsSuccess] = useState<boolean>(false);
    const [departments, setDepartments] = useState<any[]>([]); // Initialize as empty array
    const [searchQuery, setSearchQuery] = useState<string>(""); // State for search query
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const model: any = queryParams.get("model");

    const Swals = withReactContent(Swal);

    // Fetch departments data when the component mounts
    useEffect(() => {
        const fetchDepartments = async () => {
            try {
                const datas = { tokenbranch: model };
                const res = await GetDepartByBranch(datas);
                console.log(res);
                setDepartments(res.data); // Store the fetched data into state
            } catch (error) {
                console.error("Error fetching departments:", error);
                Swal.fire({
                    icon: 'error',
                    title: 'Lỗi mạng',
                    text: 'Không thể tải danh sách khoa.',
                });
            }
        };

        fetchDepartments(); // Fetch data on component mount
    }, [model]); // Re-run if model changes

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!departmentCode || !departmentName) {
            Swal.fire({
                icon: 'error',
                title: 'Lỗi',
                text: 'Vui lòng nhập đầy đủ thông tin.',
            });
            return;
        }

        const departmentData = {
            departmentCode,
            departmentName,
            description,
            model,
        };

        try {
            const res = await CreaterDepart(departmentData);

            if (res) {
                Swal.fire({
                    icon: 'success',
                    title: 'Thành công',
                    text: 'Khoa mới đã được tạo thành công!',
                });
                setDepartments([...departments, res]); // Add new department to the list
                setDepartmentCode("");
                setDepartmentName("");
                setDescription("");
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Thất bại',
                    text: 'Có lỗi xảy ra khi tạo khoa.',
                });
            }
        } catch (error) {
            console.error("Error creating department:", error);
            Swal.fire({
                icon: 'error',
                title: 'Lỗi mạng',
                text: 'Có lỗi xảy ra khi kết nối với server.',
            });
        }
    };

    // Filter departments based on search query
    const filteredDepartments = (departments || []).filter(department =>
        department.departmentCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
        department.departmentName.toLowerCase().includes(searchQuery.toLowerCase())
    );
   
    
    const handleDelete = async (departmentCode: string) => {
        // Hiển thị hộp thoại xác nhận trước khi xóa
        const result = await Swal.fire({
            title: 'Xác nhận',
            text: `Bạn có chắc chắn muốn xóa khoa có mã ${departmentCode}?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'OK',
            cancelButtonText: 'Hủy',
            reverseButtons: true
        });
    
        if (result.isConfirmed) {
            // Nếu người dùng xác nhận xóa, thực hiện xóa khoa
            const data = {
                departmentCode: departmentCode,
            };
                console.log(data);
            try {
                const res = await DeleTeDepartByBranch(data);  // Gọi API xóa khoa
    
                if (res) {
                    // Thông báo xóa thành công
                    Swal.fire({
                        icon: 'success',
                        title: 'Thành công',
                        text: `Khoa với mã ${departmentCode} đã được xóa thành công!`,
                    });
                    // Xóa khoa khỏi danh sách (nếu cần)
                    setDepartments(departments.filter(department => department.departmentCode !== departmentCode));
                } else {
                    // Thông báo lỗi khi xóa thất bại
                    Swal.fire({
                        icon: 'error',
                        title: 'Thất bại',
                        text: 'Có lỗi xảy ra khi xóa khoa.',
                    });
                }
            } catch (error) {
                // Thông báo lỗi khi gặp sự cố khi gọi API
                console.error("Error deleting department:", error);
                Swal.fire({
                    icon: 'error',
                    title: 'Lỗi mạng',
                    text: 'Có lỗi xảy ra khi kết nối với server.',
                });
            }
        }
    };
    
    return (
        <>
            <PageTitle
                breadCrumbItems={[
                    { label: "Trang chủ", path: "/" },
                    { label: "Quản lý khoa", path: "/departments" },
                    { label: "Tạo khoa", path: "/departments/create", active: true },
                ]}
                title={"Tạo Khoa Mới"}
            />
            <Row className="justify-content-center">
                <Col md={12} lg={12}>
                    <Card>
                        <Card.Body>
                            <h4 className="header-title mb-4">Tạo Khoa Mới</h4>
                            <Form onSubmit={handleSubmit}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Mã Khoa</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Nhập mã khoa"
                                        value={departmentCode}
                                        onChange={(e) => setDepartmentCode(e.target.value)}
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>Tên Khoa</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Nhập tên khoa"
                                        value={departmentName}
                                        onChange={(e) => setDepartmentName(e.target.value)}
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>Mô Tả</Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        rows={3}
                                        placeholder="Mô tả (nếu có)"
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                    />
                                </Form.Group>

                                <Button variant="primary" type="submit">Tạo Khoa</Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            {/* Quản lý Khoa */}
            <Row className="justify-content-center">
                <Col md={12} lg={12}>
                    <Card>
                        <Card.Body>
                            <Row className="mt-4">
                                <Col>
                                    <h4 className="header-title mb-4">Quản Lý Khoa</h4>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Tìm kiếm Khoa</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Nhập mã khoa hoặc tên khoa"
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                        />
                                    </Form.Group>
                                    <div className="table-responsive">
                                        <Table striped bordered hover>
                                            <thead>
                                                <tr>
                                                    <th>#</th>
                                                    <th>Mã Khoa</th>
                                                    <th>Tên Khoa</th>
                                                    <th>Mô Tả</th>
                                                    <th>Token Branch</th>
                                                    <th>Hành Động</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {filteredDepartments.length > 0 ? (
                                                    filteredDepartments.map((department, index) => (
                                                        <tr key={index}>
                                                            <td>{index + 1}</td>
                                                            <td>{department.departmentCode}</td>
                                                            <td>{department.departmentName}</td>
                                                            <td>{department.description}</td>
                                                            <td>{department.tokenbranch}</td>
                                                            <td>
                                                                <Button
                                                                    variant="danger"
                                                                    size="sm"
                                                                    onClick={() => handleDelete(department.departmentCode)}
                                                                >
                                                                    Xóa
                                                                </Button>
                                                            </td>
                                                        </tr>
                                                    ))
                                                ) : (
                                                    <tr>
                                                        <td colSpan={6} className="text-center">
                                                            Chưa có khoa nào
                                                        </td>
                                                    </tr>
                                                )}
                                            </tbody>
                                        </Table>
                                    </div>
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </>
    );
}
