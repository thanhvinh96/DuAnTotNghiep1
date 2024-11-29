import React, { useState ,useEffect} from "react";
import { Button, Modal, Table } from "react-bootstrap";
import { FormInput } from "../../components/";
import { useNavigate, useLocation } from "react-router-dom";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import {addBankByBracnh,ShowBankByBracnh} from "../../controller/BankController";
interface Bank {
    id: number;
    name: string;
    accountNumber: string;
    accountHolder: string;
    status: "Hiển thị" | "Ẩn";
    logo: string;
    token: string;
}

// const banks: Bank[] = [
//     { id: 10, name: "VCB", accountNumber: "1017898590", accountHolder: "WEB DEMO VUI LÒNG KHÔNG NẠP", status: "Hiển thị", logo: "vcb-logo.png", token: "abc123" },
//     { id: 14, name: "ACB", accountNumber: "123", accountHolder: "WEB DEMO VUI LÒNG KHÔNG NẠP", status: "Hiển thị", logo: "acb-logo.png", token: "xyz789" },
//     { id: 15, name: "MBBank", accountNumber: "123", accountHolder: "NGUYEN TAN THANH", status: "Hiển thị", logo: "mbb-logo.png", token: "mbb456" },
// ];

interface BankTableProps {
    model: string | null;
}

const BankTable: React.FC<BankTableProps> = ({ model }) => {
    const MySwal = withReactContent(Swal);

    const location = useLocation(); // Lấy thông tin URL hiện tại
    const queryParams = new URLSearchParams(location.search);
    const branchs = queryParams.get("model"); // Lấy giá trị của "model" từ URL
  
    const [data, setData] = useState<Bank[]>([]);
    const [showModal, setShowModal] = useState<boolean>(false);
    const [formState, setFormState] = useState({
        name: "",
        accountNumber: "",
        accountHolder: "",
        status: "Hiển thị",
        logo: "",
        token: "",
        branch:"",
    });
   
    //  useEffect(() => {
    //     if (branchs) {
    //         console.log("Giá trị của branchs:", branchs);
    //         setFormState((prevState) => ({
    //             ...prevState,
    //             branch: branchs,
    //         }));
    //     }
    // }, [branchs]); // Theo dõi sự thay đổi của branchs

    
    const handleDelete = (id: number) => {
        const updatedData = data.filter((bank) => bank.id !== id);
        if(updatedData){
            setData(updatedData);

        }else{
            setData([]);

        }
    };

    const toggleModal = () => {
        console.log("Branchs value:", branchs);
        setFormState({
            name: "",
            accountNumber: "",
            accountHolder: "",
            status: "Hiển thị",
            logo: "",
            token: "",
            branch: branchs || "",
        });
        setShowModal(!showModal);
    };
    const showdataTable =async ()=>{
        const data ={
            branch:model
        }
        const res = await ShowBankByBracnh(data);
        console.log(res)
        if(res.status===true){
            setData(res.branch)

        }else{
            setData([])

        }
    }
    useEffect(()=>{
        showdataTable();
    },[])
    const closeModal = () => {
        setShowModal(false);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormState({
            ...formState,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async () => {
        console.log("Form State:", formState); // Log form data to console
    
        try {
            const res = await addBankByBracnh(formState); // Await the result of the async function
            console.log("Response:", res); // Log the response for debugging
    
            if (res.status === true) {
                // Success notification
                setShowModal(false);

                MySwal.fire({
                    icon: "success",
                    title: "Thành công",
                    text: "Ngân hàng đã được thêm thành công!",
                    confirmButtonText: "OK",
                });
                
            } else {
                // Failure notification
                MySwal.fire({
                    icon: "error",
                    title: "Thất bại",
                    text: res.message || "Có lỗi xảy ra khi thêm ngân hàng.",
                    confirmButtonText: "OK",
                });
            }
        } catch (error) {
            console.error("Error adding bank:", error);
    
            // Error notification
            MySwal.fire({
                icon: "error",
                title: "Lỗi",
                text: "Không thể thêm ngân hàng. Vui lòng thử lại sau.",
                confirmButtonText: "OK",
            });
        }
    };

    return (
        <div className="col-xl-12">
            <div className="card custom-card">
                <div className="card-header justify-content-between d-flex">
                    <div className="card-title fw-bold">DANH SÁCH NGÂN HÀNG</div>
                    <Button
                        variant="primary"
                        className="btn-sm"
                        onClick={toggleModal}
                        style={{ width: "250px" }}
                    >
                        <i className="ri-add-line fw-semibold align-middle"></i> Thêm ngân hàng
                    </Button>
                </div>
                <div className="card-body">
                    <div className="dataTables_wrapper">
                        <Table striped bordered hover className="table-sm">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Ngân hàng</th>
                                    <th>Số tài khoản</th>
                                    <th>Chủ tài khoản</th>
                                    <th>Trạng thái</th>
                                    <th>Logo</th>
                                    <th>Token</th>
                                    <th>Thao tác</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((bank, index) => (
                                    <tr key={bank.id}>
                                        <td>{index + 1}</td>
                                        <td>{bank.name}</td>
                                        <td>{bank.accountNumber}</td>
                                        <td>{bank.accountHolder}</td>
                                        <td>
                                            <span
                                                className={`badge ${bank.status === "Hiển thị" ? "bg-success" : "bg-danger"
                                                    }`}
                                            >
                                                {bank.status}
                                            </span>
                                        </td>
                                        <td>{bank.logo}</td>
                                        <td>{bank.token}</td>
                                        <td>
                                            <Button
                                                variant="danger"
                                                size="sm"
                                                onClick={() => handleDelete(bank.id)}
                                            >
                                                <i className="fas fa-trash"></i> Delete
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </div>
                </div>
            </div>

            {/* Modal */}
            <Modal show={showModal} onHide={closeModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Thêm ngân hàng</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <FormInput
                            label="Tên Ngân Hàng"
                            type="text"
                            name="name"
                            containerClass={"mb-3"}
                            value={formState.name}
                            onChange={handleChange}
                        />
                        <FormInput
                            label="Chủ Tài Khoản Ngân Hàng"
                            type="text"
                            name="accountHolder"
                            containerClass={"mb-3"}
                            value={formState.accountHolder}
                            onChange={handleChange}
                        />
                        <FormInput
                            label="Số Tài Khoản Ngân Hàng"
                            type="text"
                            name="accountNumber"
                            containerClass={"mb-3"}
                            value={formState.accountNumber}
                            onChange={handleChange}
                        />
                        <FormInput
                            label="Logo Ngân Hàng"
                            type="text"
                            name="logo"
                            containerClass={"mb-3"}
                            value={formState.logo}
                            onChange={handleChange}
                        />
                        <FormInput
                            label="Token Thanh Toán Online"
                            type="text"
                            name="token"
                            containerClass={"mb-3"}
                            value={formState.token}
                            onChange={handleChange}
                        />
                        <div className="mb-3">
                            <label className="form-label">Trạng thái</label>
                            <select
                                name="status"
                                className="form-select"
                                value={formState.status}
                                onChange={handleChange}
                            >
                                <option value="Hiển thị">Hiển thị</option>
                                <option value="Ẩn">Ẩn</option>
                            </select>
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={closeModal}>
                        Đóng
                    </Button>
                    <Button variant="primary" onClick={handleSubmit}>
                        Thêm
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default BankTable;
