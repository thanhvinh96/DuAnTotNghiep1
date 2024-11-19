import React, { useState } from "react";

const PaymentPage: React.FC = () => {
  type BankKey = "ACB" | "Vietcombank" | "Techcombank";

  const [selectedBank, setSelectedBank] = useState<BankKey>("ACB");

  const banks: Record<BankKey, { accountNumber: string; accountHolder: string; qrCode: string }> = {
    ACB: {
      accountNumber: "1017898590",
      accountHolder: "NGUYEN TAN THANH",
      qrCode:
        "https://api.vietqr.io/ACB/1017898590/2147483647/URSY59/vietqr_net_2.jpg?accountName=NGUYEN TAN THANH",
    },
    Vietcombank: {
      accountNumber: "123456789",
      accountHolder: "TRAN VAN ANH",
      qrCode:
        "https://api.vietqr.io/VCB/123456789/2147483647/URSY59/vietqr_net_2.jpg?accountName=TRAN VAN ANH",
    },
    Techcombank: {
      accountNumber: "987654321",
      accountHolder: "LE HOANG NAM",
      qrCode:
        "https://api.vietqr.io/TCB/987654321/2147483647/URSY59/vietqr_net_2.jpg?accountName=LE HOANG NAM",
    },
  };

  const currentBank = banks[selectedBank];

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert("Copied to clipboard!");
  };

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
    value={selectedBank}
    onChange={(e) => setSelectedBank(e.target.value as BankKey)}
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
    <option value="ACB">ACB</option>
    <option value="Vietcombank">Vietcombank</option>
    <option value="Techcombank">Techcombank</option>
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
    <p style={{ fontSize: "18px", fontWeight: "bold", marginBottom: "10px" }}>MMO Solution</p>
  </div>

  {/* Bank Information */}
  <div style={{ marginBottom: "30px", borderBottom: "1px solid #444" }}>
    <p>
      <i className="fas fa-university" style={{ marginRight: "8px" }}></i>
      <strong>Ngân Hàng:</strong>
      <br />
      <span style={{ paddingLeft: "20px", color: "#ffffff" }}>{selectedBank}</span>
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
        onClick={() => copyToClipboard(currentBank.accountNumber)}
      >
        {currentBank.accountNumber}
      </span>
      <i
        className="fas fa-copy"
        style={{
          cursor: "pointer",
          marginLeft: "5px",
          color: "#ffffff",
        }}
        onClick={() => copyToClipboard(currentBank.accountNumber)}
      ></i>
    </p>
  </div>

  <div style={{ marginBottom: "30px", borderBottom: "1px solid #444" }}>
    <p>
      <i className="fas fa-user" style={{ marginRight: "8px" }}></i>
      <strong>Chủ tài khoản:</strong>
      <br />
      <span style={{ paddingLeft: "20px", color: "#ffffff" }}>
        {currentBank.accountHolder}
      </span>
    </p>
  </div>

  <div style={{ marginBottom: "30px", borderBottom: "1px solid #444" }}>
    <p>
      <i className="fas fa-money-bill" style={{ marginRight: "8px" }}></i>
      <strong>Số tiền cần thanh toán:</strong>
      <br />
      <span style={{ paddingLeft: "20px", color: "#00bfff" }}>
        2.147.483.647đ
      </span>
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
        onClick={() => copyToClipboard("URSY59")}
      >
        URSY59
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
    onMouseEnter={(e) => {
      (e.target as HTMLButtonElement).style.backgroundColor = "#0056b3"; // Màu xanh đậm hơn khi hover
      (e.target as HTMLButtonElement).style.transform = "scale(1.05)"; // Hiệu ứng phóng to nhẹ khi hover
    }}
    onMouseLeave={(e) => {
      (e.target as HTMLButtonElement).style.backgroundColor = "#007BFF"; // Quay lại màu ban đầu
      (e.target as HTMLButtonElement).style.transform = "scale(1)"; // Quay lại kích thước ban đầu
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
              src={currentBank.qrCode}
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
