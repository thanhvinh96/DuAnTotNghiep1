import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Row, Col, Button, Modal,Table } from "react-bootstrap";
import jwtDecode from 'jwt-decode';
import PageTitle from "../../components/PageTitle";
import { GetInfoHospital } from "../../controller/HospitalController";
import { showSuperadmin ,addAdminChangeRequest,ShowAdminChangeRequest} from "../../controller/NetworkManagent";
import { GetInfoFullPersonnel } from "../../controller/PersonnelController";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
const Profile = () => {
  const MySwal = withReactContent(Swal);

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [profileData, setProfileData] = useState<any>(null);
  const [tokenHospital, setTokenHospital] = useState<null | string>(null);
  const [orgData, setOrgData] = useState({
    nameorg: '',  // tên tổ chức
    phoneadmin: '', // địa chỉ
    emailadmin: '', //mật khẩu
    addressadmin: '', //họ tên admin
    tokeorg: '', 
    businessBase64: '',
    timestamp: ''
  });
  const [show, setShow] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [datarequest, setdatarequest] = useState<any[]>([]);
  // Fetch data for organization and hospital profile
  const showdataReuquest = async () => {
    const token = localStorage.getItem('tokenadmin');
    if (token) {
        try {
            const decodedToken: any = jwtDecode(token);
            console.log("Tê tổ chức: " + decodedToken['branch']);

            const tokeorg = decodedToken['tokeorg'];
            if (tokeorg) {
                // Thực hiện hành động khi có 'tokeorg'
                const data = {
                  tokeorg :tokeorg
                }
                const res = await ShowAdminChangeRequest(data);
                if(res){
                  setdatarequest(res);
                }else{
                  console.log('error')
                }
                console.log("Tổ chức:", tokeorg);
            } else {
                console.log("Không có mã tổ chức.");
            }
        } catch (error) {
            console.error("Lỗi khi giải mã token:", error);
        }
    } else {
        console.log("Token không tồn tại.");
    }
};
const getData = async () => {
    const token = localStorage.getItem('tokenadmin');
    if (token) {
      try {
        const decodedToken: any = jwtDecode(token);
        console.log("tê tổ chức: " + decodedToken['branch']);

        const tokeorg = decodedToken['tokeorg'];
        if (tokeorg) {
          const dataorg = { tokenorg: tokeorg };
          const res = await GetInfoHospital(dataorg);
          
          console.log(res.result);
          setTokenHospital(res.result.tokeorg);
          setOrgData({
            nameorg: res.result.nameorg || '',
            phoneadmin: res.result.phoneadmin || '',
            emailadmin: res.result.emailadmin || '',
            addressadmin: res.result.addressadmin || '',
            tokeorg: res.result.tokeorg || '',
            businessBase64: res.result.businessBase64 || '',
            timestamp: res.result.timestamp || '',
          });
        }
      } catch (error) {
        console.error('Có lỗi xảy ra:', error);
      }
    }
  };

  // Fetch the admin profile data
  const showDataProfileHospital = async () => {
    try {
     
  
      const data = { tokenorg: tokenHospital };
      const res = await showSuperadmin(data);
      setProfileData(res);
  
    
  
      console.log('Thông tin admin', res);
    } catch (error) {
      console.log('Lỗi khi lấy thông tin admin:', error);
      Swal.fire({
        title: "Có lỗi xảy ra!",
        text: "Không thể lấy thông tin admin hiện tại. Vui lòng thử lại sau.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };
  
  const [data, setData] = useState<any[]>([]);  // Array state to hold multiple personnel
  const [tokenOrg,settokenOrg] = useState<any>({});

  useEffect(() => {
    const fetchPersonnel = async () => {
      try {
        const token = localStorage.getItem("tokenadmin");
        if (token) {
          const decodedToken: any = jwtDecode(token);
          const tokeorg = decodedToken["tokeorg"];
          const dataorg = { tokenorg: tokeorg };

          const response: any = await GetInfoHospital(dataorg);
          const dataorgs = {
            tokeorg: response.result.tokeorg,
            value: response.result.nameorg,
          };

          const personnelResponse: any = await GetInfoFullPersonnel(dataorgs);
          console.log("gia tri"+personnelResponse);
          setData(personnelResponse.data); // Set the entire array of personnel data to state
          settokenOrg(response.result.tokeorg);
          
        }
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu:", error);
      }
    };

    fetchPersonnel();
    showdataReuquest();
  }, []);
  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (tokenHospital) {
      showDataProfileHospital();
    }
  }, [tokenHospital]);
  const [showModal, setShowModal] = useState(false); // Trạng thái hiển thị modal
  const [oldToken, setOldToken] = useState('');
  const [newToken, setNewToken] = useState('');
  const [status, setStatus] = useState('');

  // Hàm mở modal
  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  // Hàm gửi yêu cầu đổi tài khoản admin
  const handleSubmit = async() => {
    const loadingSwal: any = MySwal.fire({
      title: "Vui lòng đợi...",
      text: "Đang cập nhật thông tin admin, vui lòng chờ!",
      icon: "info",
      allowOutsideClick: false,
      showConfirmButton: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });
    console.log('Mục Đích Đổi Admin:', oldToken);
    console.log('Token Admin Mới:', newToken);
    console.log('token admin ',profileData.tokenuser )
    const data = {
      currentAdminToken:profileData.tokenuser,
      newAdminToken:newToken,
      reason:oldToken,
      tokeorg:tokenOrg,
    }
    const res = await addAdminChangeRequest(data)
    if (res.status === true) {
      handleCloseModal()
      Swal.fire({
        title: "Cập nhật admin thành công!",
        text: "Cập nhật admin mới cho bệnh viện thành công.",
        icon: "success",
        confirmButtonText: "OK",
      });
    } else {
      Swal.fire({
        title: "Cập nhật thất bại!",
        text: "Có lỗi xảy ra trong quá trình cập nhật admin mới.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }    // You can add your logic here to handle the submission (e.g., making an API request)
  };
  return (
    <>
      <PageTitle
        breadCrumbItems={[
          { label: "Trang chủ", path: "/hospital/home" },
          { label: "Thông tin bệnh viện", path: "/features/tables/advanced", active: true },
        ]}
        title={"Thông tin bệnh viện"}
      />
      <Row>
        {/* Left Column: Organization Info */}
        <Col md={8}>
          <div className="card custom-card shadow-none mb-4">
            <div className="card-body">
              <h4 className="mb-4">Thông tin Tổ chức</h4>
              <div className="row">
                <div className="col-md-6 mb-4">
                  <label className="form-label">Tên tổ chức <span className="text-danger">*</span></label>
                  <div className="input-group">
                    <span className="input-group-text"><i className="fa-solid fa-building"></i></span>
                    <input type="text" className="form-control" value={orgData.nameorg} readOnly />
                  </div>
                </div>
                <div className="col-md-6 mb-4">
                  <label className="form-label">Số điện thoại tổ chức <span className="text-danger">*</span></label>
                  <div className="input-group">
                    <span className="input-group-text"><i className="fa-solid fa-phone"></i></span>
                    <input type="text" className="form-control" value={orgData.phoneadmin} readOnly />
                  </div>
                </div>
                <div className="col-md-6 mb-4">
                  <label className="form-label">Email tổ chức <span className="text-danger">*</span></label>
                  <div className="input-group">
                    <span className="input-group-text"><i className="fa-solid fa-envelope"></i></span>
                    <input type="email" className="form-control" value={orgData.emailadmin} readOnly />
                  </div>
                </div>
                <div className="col-md-6 mb-4">
                  <label className="form-label">Địa chỉ tổ chức <span className="text-danger">*</span></label>
                  <div className="input-group">
                    <span className="input-group-text"><i className="fa-solid fa-map-marker-alt"></i></span>
                    <input type="text" className="form-control" value={orgData.phoneadmin} readOnly />
                  </div>
                </div>
                <div className="col-md-6 mb-4">
                  <label className="form-label">Mã Token Bệnh viện <span className="text-danger">*</span></label>
                  <div className="input-group">
                    <input
                      type={passwordVisible ? "text" : "password"}
                      className="form-control"
                      value={orgData.tokeorg}
                      readOnly
                    />
                    <button
                      style={{ width: '80px' }}
                      type="button"
                      className="btn btn-primary"
                      onClick={togglePasswordVisibility}
                    >
                      {passwordVisible ? "Ẩn" : "Hiện"}
                    </button>
                  </div>
                </div>
                <div className="col-md-6 mb-4">
                  <label className="form-label">Giấy phép kinh doanh <span className="text-danger">*</span></label>
                  <Button variant="primary" onClick={handleShow}>Xem</Button>
                  <Modal show={show} onHide={handleClose} centered>
                    <Modal.Header closeButton>
                      <Modal.Title>Giấy phép kinh doanh</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <img
                        src={orgData.businessBase64}
                        alt="Giấy phép kinh doanh"
                        className="img-fluid"
                        style={{ maxHeight: "500px", width: "100%" }}
                      />
                    </Modal.Body>
                    <Modal.Footer>
                      <Button variant="secondary" onClick={handleClose}>Đóng</Button>
                    </Modal.Footer>
                  </Modal>
                </div>
              </div>
            </div>
          </div>
        

      {/* Bảng hiển thị lịch sử thay đổi */}
      <div className="card custom-card shadow-none mb-4">
        <div className="card-body">
        <div className="col-md-6 ">

        <Button
        variant="primary"
        onClick={handleShowModal}
        className="mb-3 custom-btn-small"
        // style={{ position: 'absolute', top: '20px', left: '20px' }}
      >
        Gửi yêu cầu đổi tài khoản admin
      </Button>
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Đổi tài khoản Admin</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="mb-3">
              <label htmlFor="oldToken" className="form-label">Mục Đích Đổi Admin</label>
              <input
                type="text"
                className="form-control"
                id="oldToken"
                value={oldToken}
                onChange={(e) => setOldToken(e.target.value)}
                placeholder="Nhập Mục Đích Đổi Admin"
              />
            </div>
            <div className="mb-3">
  <label htmlFor="newToken" className="form-label">Token Admin Mới</label>
  <select
  className="form-control"
  id="newToken"
  value={newToken}
  onChange={(e) => setNewToken(e.target.value)}
>
  <option value="">Chọn token admin mới</option>
  {data.map((personnel, index) => (
    <option key={index} value={personnel.tokenuser}>
      {personnel.fullname} - {personnel.typeusers}
    </option>
  ))}
  {/* Thêm các tùy chọn token khác nếu cần */}
</select>

</div>

            
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Đóng
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Gửi yêu cầu
          </Button>
        </Modal.Footer>
      </Modal>
      </div>
          <Table responsive striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Thời gian</th>
                <th>Token Admin Cũ</th>
                <th>Token Admin Mới</th>
                <th>Trạng thái</th>
              </tr>
            </thead>
            <tbody>
            {datarequest.map((request, index) => {
          // Chuyển timestamp từ chuỗi sang dạng thời gian
          const timestamp = new Date(parseInt(request.timestamp)).toLocaleString();

          return (
            <tr key={request.requestId}>
              <td>{index + 1}</td>
              <td>{timestamp}</td>
              <td>{request.currentAdminToken}</td>
              <td>{request.newAdminToken}</td>
              <td>{request.status === 'PENDING' ? 'Chưa xử lý' : request.status}</td>
            </tr>
          );
        })}
            </tbody>
          </Table>
        </div>
      </div>

    
        </Col>

        {/* Right Column: Admin Profile */}
        <Col md={4}>
          <div className="card custom-card shadow-none mb-4">
            <div className="card-body">
              <h4 className="mb-4">Quản Trị Viên Bệnh Viện</h4>
              {profileData ? (
                <>
                  <p><strong>Tên:</strong> {profileData.fullname}</p>
                  <p><strong>Email:</strong> {profileData.emailadmin || 'Chưa cập nhật'}</p>
                  <p><strong>Số điện thoại:</strong> {profileData.phone || 'Chưa cập nhật'}</p>
                  <p><strong>Địa chỉ:</strong> {profileData.addressadmin || 'Chưa cập nhật'}</p>
                  <p><strong>Vai trò:</strong> {profileData.typeusers}</p>
                  <p><strong>Chức vụ:</strong> Quản trị viên</p>
                  <p><strong>Ảnh đại diện:</strong></p>
                  <img src={profileData.avatar} alt="Avatar" className="img-fluid" style={{ maxWidth: '150px' }} />
                  <p><strong>Giấy tờ xác nhận:</strong></p>
                  <img src={profileData.imgidentification} alt="Identification" className="img-fluid" style={{ maxWidth: '150px' }} />
                  <p><strong>Giấy phép:</strong></p>
                  <img src={profileData.License} alt="License" className="img-fluid" style={{ maxWidth: '150px' }} />
                </>
              ) : (
                <p>Đang tải dữ liệu...</p>
              )}
            </div>
          </div>
        </Col>
      </Row>
    </>
  );
};

export default Profile;
