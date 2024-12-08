import React, { useState ,useEffect} from "react";
import BarChart from "./BarChart";
import StatisticsWidget from "../../components/StatisticsWidget";
import BankTable from "./BankInfo";
import { useNavigate, useLocation } from "react-router-dom";
import {ShowBankByMoth,ShowBankByAll} from "../../controller/BankController";

const Dashboard = () => {
    const [showConfig, setShowConfig] = useState(false);

    const handleConfigClick = () => {
        setShowConfig(true); // Chuyển sang giao diện cấu hình
    };
    const [dataAll,setdataAll] = useState<any>([]) 
    const showdata =async ()=>{
        const res =ShowBankByMoth()
        const _res = await ShowBankByAll()
        setdataAll(_res)
        console.log("tia tri")
        console.log(_res)
      }
      useEffect(()=>{
        showdata()
      },[])
    const handleBackClick = () => {
        setShowConfig(false); // Quay lại giao diện ban đầu
    };
    const location = useLocation();

const queryParams = new URLSearchParams(location.search);
const model = queryParams.get("model");
console.log('fdf gia tri mode'+model)
    return (
        <div className="row">
            
            {!showConfig && (
                <div className="col-xl-12">
                    <div>
                        <button
                            className="btn btn-primary btn-sm label-btn mb-3 fw-bold"
                            onClick={handleConfigClick} 
                            style={{ width: "150px" }} // Sửa thành width đúng cú pháp
                                                    >
                            <i className="ri-settings-4-line label-btn-icon me-2"></i> CẤU HÌNH
                        </button>
                    </div>
                </div>
            )}

                
            {showConfig ? (
                <div className="col-xl-12">
                     <button
                                className="btn btn-secondary btn-sm label-btn mb-3 fw-bold"
                                onClick={handleBackClick}
                                style={{ width: "150px" }} // Sửa thành width đúng cú pháp

                            >
                                <i className="ri-arrow-left-line label-btn-icon me-2"></i> BACK
                            </button>
                    <div className="card custom-card">
                    <BankTable model={model} />
                                        </div>
                </div>
            ) : (
                <>
                    <div className="col-xl-12">
                        <div className="row">
                            {[
                                {
                                    amount: "1.880.000đ",
                                    label: "Toàn thời gian",
                                    bg: "danger",
                                    icon: "fe-heart",
                                },
                                { amount: "0đ", label: "Tháng 11", bg: "info", icon: "fe-star" },
                                { amount: "0đ", label: "Trong tuần", bg: "warning", icon: "fe-bar-chart" },
                                { amount: "0đ", label: "Hôm nay", bg: "primary", icon: "fe-calendar" },
                            ].map((item, index) => (
                                <div className="col-xl-6" key={index}>
                                    <StatisticsWidget
                                        variant={item.bg}
                                        counterOptions={{
                                            prefix: "",
                                            suffix: "đ",
                                        }}
                                        description={item.label}
                                        stats={item.amount}
                                        icon={item.icon}
                                        values="345345"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                    {/* <div className="col-xl-7">
                        <div className="card custom-card">
                            <div className="card-header">
                                <div className="card-title fw-bold">Thống Kê Giao Dịch THÁNG 11</div>
                            </div>
                            <div className="card-body">
                                <BarChart />
                            </div>
                        </div>
                    </div> */}
                    <div className="col-xl-12">
                        <div className="card custom-card">
                            <div className="card-header justify-content-between">
                                <div className="card-title fw-bold">LỊCH SỬ NẠP TIỀN TỰ ĐỘNG</div>
                            </div>
                            <div className="card-body">
                                <form
                                    action=""
                                    className="align-items-center mb-3"
                                    name="formSearch"
                                    method="GET"
                                >
                                    <div className="row row-cols-lg-auto g-3 mb-3">
                                        <input type="hidden" name="module" value="admin" />
                                        <input type="hidden" name="action" value="recharge-bank" />
                                        {[
                                            { name: "user_id", placeholder: "Tìm ID thành viên" },
                                            { name: "username", placeholder: "Tìm Username" },
                                            { name: "tid", placeholder: "Mã giao dịch" },
                                            { name: "method", placeholder: "Ngân hàng" },
                                            { name: "description", placeholder: "Nội dung chuyển khoản" },
                                        ].map((field, index) => (
                                            <div className="col-md-3 col-6" key={index}>
                                                <input
                                                    className="form-control form-control-sm fw-bold"
                                                    name={field.name}
                                                    placeholder={field.placeholder}
                                                />
                                            </div>
                                        ))}
                                        <div className="col-lg col-md-4 col-6">
                                            <input
                                                type="text"
                                                name="create_gettime"
                                                className="form-control form-control-sm flatpickr-input fw-bold"
                                                id="daterange"
                                                placeholder="Chọn thời gian"
                                                readOnly
                                            />
                                        </div>
                                        <div className="col-12">
                                            <div className="d-flex align-items-center gap-2">
                                                <button className="btn btn-sm btn-primary fw-bold">
                                                    <i className="fa fa-search"></i> Search
                                                </button>
                                                <a
                                                    className="btn btn-sm btn-danger fw-bold"
                                                    href="https://zshopclone7.cmsnt.net/?module=admin&amp;action=recharge-bank"
                                                    style={{
                                                        width: "100px",
                                                        textAlign: "center",
                                                    }}
                                                >
                                                    <i className="fa fa-trash"></i>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                                <div className="table-responsive mb-3">
                                    <table className="table text-nowrap table-striped table-hover table-bordered">
                                        <thead>
                                            <tr>
                                                <th className="fw-bold">Username</th>
                                                <th className="fw-bold">Thời gian</th>
                                                <th className="text-right fw-bold">Số tiền nạp</th>
                                                <th className="text-right fw-bold">Thực nhận</th>
                                                <th className="text-center fw-bold">Ngân hàng</th>
                                                <th className="text-center fw-bold">Mã giao dịch</th>
                                                {/* <th className="fw-bold">Nội dung chuyển khoản</th> */}
                                            </tr>
                                        </thead>
                                        <tbody>
                                        {dataAll.map((bank:any, index:any) => (

                                                <tr key={index}>
                                                    <td className="text-center fw-bold">
                                                        <a
                                                            className="text-primary"
                                                        >
                                                            ID [{bank._id}]
                                                        </a>
                                                    </td>
                                                    <td className="fw-bold">
                                                        <span
                                                            data-toggle="tooltip"
                                                            data-placement="bottom"
                                                            data-bs-original-title="8 tháng trước"
                                                        >
                                                           {bank.transactionDate}
                                                        </span>
                                                    </td>
                                                    <td className="text-right fw-bold">
                                                        <b style={{ color: "green" }}> {bank.amount}</b>
                                                    </td>
                                                    <td className="text-right fw-bold">
                                                        <b style={{ color: "red" }}>{bank.amount}</b>
                                                    </td>
                                                    <td className="text-center fw-bold">
                                                        <b>MBBANK</b>
                                                    </td>
                                                    <td className="text-center fw-bold">
                                                        <b>{bank.description}</b>
                                                    </td>
                                                    {/* <td className="fw-bold">
                                                        <small></small>
                                                    </td> */}
                                                </tr>
                                                                           ))}

                                        </tbody>
                                        <tfoot>
                                            {/* <tr>
                                                <td>
                                                    <div className="float-right fw-bold">
                                                        Đã thanh toán:
                                                        <strong style={{ color: "red" }}>1.880.000đ</strong> | Thực nhận:{" "}
                                                        <strong style={{ color: "blue" }}>1.880.000đ</strong>
                                                    </div>
                                                </td>
                                            </tr> */}
                                        </tfoot>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default Dashboard;
