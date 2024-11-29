import React, { useState,useEffect } from "react";
import {ShowBankByClient,ShowBankByIdClient} from "../../controller/BankController";
import { useNavigate, useLocation } from "react-router-dom";
import {getPayCode,getPayCodeUpdate,CrontData} from "../../controller/PayController";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
const PaymentPage: React.FC = () => {

  const location = useLocation(); // Lấy thông tin URL hiện tại
  const queryParams = new URLSearchParams(location.search);
  const branchs = queryParams.get("branch"); // Lấy giá trị của "model" từ URL
  const bill = queryParams.get("bill"); // Lấy giá trị của "model" từ URL
  const MySwal = withReactContent(Swal);

  const [datavalue, setdatavalue] = useState<any[]>([]);
  const showdataSelect = async () => {
    try {
      const data = {
        branch: branchs,
      };
  
      const res = await ShowBankByClient(data); // Gọi API và kiểm tra kết quả
      console.log(res);
      setdatavalue(res.branch);
  
      // Gọi hàm ShowBankByIdClients với ID đầu tiên
      if (res.branch && res.branch.length > 0) {
        await ShowBankByIdClients(res.branch[0]._id);
      } else {
        console.warn("Branch data is empty or undefined.");
      }
    } catch (error) {
      console.error("Error in showdataSelect:", error);
    }
  };
  const [databill, setdatabill] = useState<any>({});
  const checkTrandata = async () => {
    const data = {
        description: databill.medicalRecordCode,
    };

    const res: any = await getPayCodeUpdate(data);
    // if (res.success === true) {
    //     showdatacode();
    //     MySwal.fire({
    //         icon: 'success',
    //         title: 'Thanh toán thành công',
    //         text: 'Thanh toán của bạn đã được xử lý thành công!',
    //         confirmButtonText: 'OK',
    //     }).then(() => {
    //         // Chuyển hướng sau khi nhấn OK trong Swal
    //         window.location.href = `/hospital/branch/pay-bill?bill=${bill}`;
    //     });
    // }
};

  const showdatacode = async () => {
    try {
      const data = {
        medicalRecordCode: bill,
      };
  
      const _res = await getPayCode(data); // Gọi API và kiểm tra kết quả
      console.log(_res);
      setdatabill(_res.branch[0]);
    } catch (error) {
      console.error("Error in showdatacode:", error);
    }
  };
  

  const [selectedBank, setSelectedBank] = useState<string>(""); // Lưu chuỗi, không phải mảng
  const setSelectedBanks =  (e: React.ChangeEvent<HTMLSelectElement>) => {
    // setSelectedBanks(e.target.value);
    console.log("Selected bank:", e.target.value); // Log giá trị được chọn
    ShowBankByIdClients( e.target.value)
  };
  const [databank,setdatabank] =useState<any>([]);
  const ShowBankByIdClients = async (id:string)=>{
    const data ={
      id:id,
      branch:branchs
    }
    const res =  await ShowBankByIdClient(data);
    const datas = res.branch[0];
    const qrcode = `https://api.vietqr.io/${datas.name}/${datas.accountNumber}/${databill.totalsum}/${databill.medicalRecordCode}/vietqr_net_2.jpg?accountName=${datas.accountHolder}`
    setdatabank({
      ...datas, // Sao chép các thuộc tính của `datas`
      qrcode, // Thêm thuộc tính `qrcode`
    });
  }
  useEffect(()=>{
    showdataSelect()
    showdatacode()
  },[])
  
  // const currentBank = banks[selectedBank];

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert("Copied to clipboard!");
  };
  useEffect(() => {
    // Gọi hàm CrontData và checkTrandata khi component mount
    CrontData();
    checkTrandata();
  
    const interval = setInterval(() => {
      window.location.reload(); // Tải lại trang sau mỗi 30 giây
    }, 30000); // 30000ms = 30s
  
    return () => clearInterval(interval); // Xóa interval khi component bị unmount
  }, [databill]); // Mảng phụ thuộc để gọi lại useEffect khi databill thay đổi
  
  return (
    <div
      style={{
        fontFamily: "'Roboto', Arial, sans-serif",
        backgroundColor: "#f5f7fa",
        minHeight: "100vh",
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          maxWidth: "800px",
          width: "100%",
          backgroundColor: "#ffffff",
          borderRadius: "10px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          overflow: "hidden",
          padding: "20px",
        }}
      >
        {/* Header */}
        <div
          style={{
            textAlign: "center",
            marginBottom: "20px",
          }}
        >
          <h2 style={{ color: "#343a40", marginBottom: "10px" }}>Payment Details</h2>
          <p style={{ color: "#6c757d", fontSize: "14px" }}>
            Please select your bank and follow the instructions below.
          </p>
        </div>

        {/* Bank Selection */}
        <div
  style={{
    marginBottom: "20px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "15px", // Tăng khoảng cách giữa label và select box
  }}
>
  <label
    htmlFor="bank-select"
    style={{
      fontSize: "18px", // Kích thước chữ lớn hơn
      color: "#343a40", // Màu chữ tối hơn để rõ nét
      fontWeight: "bold",
      textTransform: "uppercase", // Chữ in hoa để nổi bật hơn
    }}
  >
    Select Bank
  </label>
  <select
    id="bank-select"
    // value={selectedBank}
    onChange={setSelectedBanks}
    style={{
      padding: "12px 15px", // Tăng padding để dễ click hơn
      borderRadius: "8px", // Bo tròn góc
      border: "1px solid #ced4da",
      fontSize: "16px",
      width: "100%",
      maxWidth: "320px", // Điều chỉnh chiều rộng tối đa
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", // Hiệu ứng bóng để nổi bật
      backgroundColor: "#f8f9fa", // Màu nền sáng
      color: "#495057", // Màu chữ tối
      transition: "all 0.3s ease", // Hiệu ứng mượt khi hover
    }}
    onMouseEnter={(e) => {
      (e.target as HTMLSelectElement).style.backgroundColor = "#e9ecef"; // Đổi màu khi hover
    }}
    onMouseLeave={(e) => {
      (e.target as HTMLSelectElement).style.backgroundColor = "#f8f9fa"; // Trở lại màu gốc
    }}
    onFocus={(e) => {
      (e.target as HTMLSelectElement).style.borderColor = "#007bff"; // Border xanh khi focus
      (e.target as HTMLSelectElement).style.boxShadow =
        "0 0 8px rgba(0, 123, 255, 0.5)"; // Hiệu ứng glow xanh
    }}
    onBlur={(e) => {
      (e.target as HTMLSelectElement).style.borderColor = "#ced4da"; // Border trở lại mặc định
      (e.target as HTMLSelectElement).style.boxShadow = "none"; // Loại bỏ hiệu ứng glow
    }}
  >
    {datavalue.map((branch) => (
          <option key={branch._id} value={branch._id}>
            {branch.name}
          </option>
        ))}
  </select>
</div>


        {/* Payment Info */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "20px",
            justifyContent: "center",
          }}
        >
          {/* Left Section */}
          <div
  style={{
    flex: "1 1 300px",
    backgroundColor: "#262626", // Nền màu đen
    borderRadius: "8px",
    padding: "20px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    color: "#ffffff", // Chữ màu trắng
    fontFamily: "'Roboto', Arial, sans-serif",
    fontSize: "20px", // Font chữ lớn hơn
    lineHeight: "1.8", // Tăng khoảng cách dòng
  }}
>
  {/* Logo Section */}
  <div style={{ textAlign: "center", marginBottom: "30px" }}>
    <img
      src="https://cmsnt.net/logo.png"
      alt="CMSNT Logo"
      style={{ maxWidth: "100%", marginBottom: "10px" }}
    />
    <p style={{ fontSize: "18px", fontWeight: "bold", marginBottom: "10px" }}>EHR Solution</p>
  </div>

  {/* Bank Information */}
  <div style={{ marginBottom: "30px", borderBottom: "1px solid #444" }}>
    <p>
      <i className="fas fa-university" style={{ marginRight: "8px" }}></i>
      <strong>Ngân Hàng:</strong>
      <br />
      <span style={{ paddingLeft: "20px", color: "#ffffff" }}>{databank.accountHolder}</span>
    </p>
  </div>

  <div style={{ marginBottom: "30px", borderBottom: "1px solid #444" }}>
    <p>
      <i className="fas fa-credit-card" style={{ marginRight: "8px" }}></i>
      <strong>Số tài khoản:</strong>
      <br />
      <span
        style={{
          paddingLeft: "20px",
          color: "#00ff00", // Màu xanh lá cho số tài khoản
          cursor: "pointer",
        }}
        // onClick={() => copyToClipboard(currentBank.accountNumber)}
      >
{databank.accountNumber}
      </span>
      <i
        className="fas fa-copy"
        style={{
          cursor: "pointer",
          marginLeft: "5px",
          color: "#ffffff",
        }}
        // onClick={() => copyToClipboard(currentBank.accountNumber)}
      ></i>
    </p>
  </div>

  <div style={{ marginBottom: "30px", borderBottom: "1px solid #444" }}>
    <p>
      <i className="fas fa-user" style={{ marginRight: "8px" }}></i>
      <strong>Chủ tài khoản:</strong>
      <br />
      <span style={{ paddingLeft: "20px", color: "#ffffff" }}>
      {databank.name}
            </span>
    </p>
  </div>

  <div style={{ marginBottom: "30px", borderBottom: "1px solid #444" }}>
    <p>
      <i className="fas fa-money-bill" style={{ marginRight: "8px" }}></i>
      <strong>Số tiền cần thanh toán:</strong>
      <br />
      <span style={{ paddingLeft: "20px", color: "#00bfff" }}>
      {databill.totalsum}      </span>
    </p>
  </div>

  <div style={{ marginBottom: "30px", borderBottom: "1px solid #444" }}>
    <p>
      <i className="fas fa-comment" style={{ marginRight: "8px" }}></i>
      <strong>Nội dung chuyển khoản:</strong>
      <br />
      <span
        style={{
          paddingLeft: "20px",
          color: "#ffc107",
          cursor: "pointer",
        }}
        onClick={() => copyToClipboard(`${databill.medicalRecordCode}`)}
      >
{databill.medicalRecordCode}
      </span>
      <i
        className="fas fa-copy"
        style={{
          cursor: "pointer",
          marginLeft: "5px",
          color: "#ffffff",
        }}
        onClick={() => copyToClipboard("URSY59")}
      ></i>
    </p>
  </div>

  <div style={{ textAlign: "center", marginTop: "20px" }}>
  {databill.status === true ? (
    <button
      style={{
        display: "inline-flex", // Căn chỉnh nội dung theo hàng ngang
        alignItems: "center",
        justifyContent: "center",
        padding: "12px 24px", // Padding rộng hơn cho nút
        backgroundColor: "#28a745", // Màu xanh lá khi thanh toán thành công
        color: "#ffffff", // Chữ màu trắng
        fontWeight: "bold",
        fontSize: "16px", // Kích thước chữ vừa phải
        border: "none",
        borderRadius: "8px", // Bo góc mềm mại
        cursor: "pointer",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)", // Hiệu ứng bóng mềm mại
        transition: "background-color 0.3s ease, transform 0.2s ease", // Hiệu ứng chuyển đổi mượt
      }}
     
    >
      <i
        className="fas fa-check-circle"
        style={{
          marginRight: "10px",
          fontSize: "18px", // Kích thước icon
        }}
      ></i>
      Thanh toán thành công
    </button>
  ) : (
    <button
      style={{
        display: "inline-flex", // Căn chỉnh nội dung theo hàng ngang
        alignItems: "center",
        justifyContent: "center",
        padding: "12px 24px", // Padding rộng hơn cho nút
        backgroundColor: "#007BFF", // Màu xanh đậm
        color: "#ffffff", // Chữ màu trắng
        fontWeight: "bold",
        fontSize: "16px", // Kích thước chữ vừa phải
        border: "none",
        borderRadius: "8px", // Bo góc mềm mại
        cursor: "pointer",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)", // Hiệu ứng bóng mềm mại
        transition: "background-color 0.3s ease, transform 0.2s ease", // Hiệu ứng chuyển đổi mượt
      }}
     
    >
      <i
        className="fas fa-spinner fa-spin"
        style={{
          marginRight: "10px",
          fontSize: "18px", // Kích thước icon
        }}
      ></i>
      Đang chờ thanh toán
    </button>
  )}
</div>



</div>


          {/* Right Section */}
          <div
            style={{
              flex: "1 1 300px",
              textAlign: "center",
              padding: "20px",
              border: "1px solid #e9ecef",
              borderRadius: "8px",
            }}
          >
            <h4 style={{ marginBottom: "15px", color: "#007bff" }}>
              Scan QR Code to Pay
            </h4>
            <img
              src={databank.qrcode}
              alt={`${selectedBank} QR Code`}
              style={{ maxWidth: "100%", borderRadius: "5px", marginBottom: "10px" }}
            />
            <p style={{ fontSize: "14px", color: "#6c757d" }}>
              Use your banking app or QR scanner to complete the payment.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
