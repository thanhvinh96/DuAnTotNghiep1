import React from "react";
import { Card, Nav, Tab, Row, Col } from "react-bootstrap";

// Định nghĩa kiểu dữ liệu cho BankDetails
interface BankDetailsProps {
  bankName: string;
  accountNumber: string;
  accountName: string;
  transferNote: string;
  imageUrl: string;
}

const DepositInstructions: React.FC = () => {
  return (
    <Row className="g-4">
      {/* Hướng dẫn nạp tiền */}
      <Col md={6}>
        <Card className="shadow-lg border-0">
          <Card.Header className="bg-primary text-white text-center py-4">
            <h4 className="mb-0">Hướng dẫn nạp tiền</h4>
          </Card.Header>
          <Card.Body>
            <ul className="list-unstyled">
              <li className="d-flex align-items-center mb-3">
                <span className="me-3 text-success">&#10003;</span>Nhập đúng nội dung chuyển tiền.
              </li>
              <li className="d-flex align-items-center mb-3">
                <span className="me-3 text-success">&#10003;</span>Cộng tiền trong vài giây.
              </li>
              <li className="d-flex align-items-center mb-3">
                <span className="me-3 text-success">&#10003;</span>Liên hệ BQT nếu nhập sai nội dung chuyển.
              </li>
            </ul>
          </Card.Body>
        </Card>
      </Col>

      {/* Ngân hàng */}
      <Col md={6}>
        <Card className="shadow-lg border-0">
          <Card.Body>
            <Tab.Container defaultActiveKey="nav-pay_1">
              <Nav variant="pills" className="nav-justified mb-4">
                <Nav.Item>
                  <Nav.Link eventKey="nav-pay_1" className="d-flex align-items-center justify-content-center">
                    <img
                      src="/uploads/22-05-2024/ea6926de-74d5-44a9-89b7-267741766f30.svg"
                      alt="TPBank"
                      width="35"
                      className="me-2"
                    />
                    TPBank
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="nav-pay_2" className="d-flex align-items-center justify-content-center">
                    <img
                      src="/uploads/22-05-2024/2faebf22-584a-46d9-9de9-920143d3d114.svg"
                      alt="Vietcombank"
                      width="35"
                      className="me-2"
                    />
                    Vietcombank
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="nav-pay_3" className="d-flex align-items-center justify-content-center">
                    <img
                      src="/uploads/22-05-2024/499b778b-9bae-4cd2-af3c-c5d52d7262c6.svg"
                      alt="MOMO"
                      width="35"
                      className="me-2"
                    />
                    MOMO
                  </Nav.Link>
                </Nav.Item>
              </Nav>
              <Tab.Content>
                <Tab.Pane eventKey="nav-pay_1">
                  <BankDetails
                    bankName="TPBank"
                    accountNumber="0000000001"
                    accountName="TAI KHOAN TEST"
                    transferNote="donate 1"
                    imageUrl="https://api.vietqr.io/TPBank/0000000001/0/donate 1/vietqr_net_2.jpg?accountName=TAI KHOAN TEST"
                  />
                </Tab.Pane>
                <Tab.Pane eventKey="nav-pay_2">
                  <BankDetails
                    bankName="Vietcombank"
                    accountNumber="0000000002"
                    accountName="TAI KHOAN TEST"
                    transferNote="donate 1"
                    imageUrl="https://api.vietqr.io/Vietcombank/0000000002/0/donate 1/vietqr_net_2.jpg?accountName=TAI KHOAN TEST"
                  />
                </Tab.Pane>
                <Tab.Pane eventKey="nav-pay_3">
                  <BankDetails
                    bankName="MOMO"
                    accountNumber="0000000003"
                    accountName="VI DIEN TU"
                    transferNote="donate 1"
                    imageUrl="https://api.qrserver.com/v1/create-qr-code/?size=300x300&amp;data=2|99|0000000003|||0|0|10000|donate 1|transfer_myqr"
                  />
                </Tab.Pane>
              </Tab.Content>
            </Tab.Container>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

const BankDetails: React.FC<BankDetailsProps> = ({
  bankName,
  accountNumber,
  accountName,
  transferNote,
  imageUrl,
}) => (
  <div className="text-center">
    <img
      src={imageUrl}
      alt={bankName}
      style={{ width: "250px", borderRadius: "8px" }}
      className="mb-4 shadow-sm"
    />
    <div className="fw-bold">
      <p>
        <strong>Ngân hàng:</strong> <span className="text-danger">{bankName}</span>
      </p>
      <p>
        <strong>Số tài khoản:</strong>{" "}
        <span className="text-danger">{accountNumber}</span>
      </p>
      <p>
        <strong>Chủ tài khoản:</strong> <span className="text-danger">{accountName}</span>
      </p>
      <p>
        <strong>Nội dung chuyển:</strong> <span className="text-danger">{transferNote}</span>
      </p>
    </div>
  </div>
);

export default DepositInstructions;
