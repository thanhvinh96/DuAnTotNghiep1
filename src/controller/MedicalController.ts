import { CreateMedical, LoginMedical } from '../model/MedicalModel'; // Import model tương tác với API

// Controller để tạo hồ sơ y tế
export const handleCreateMedical = async (formData: any) => {
  try {
    const response = await fetch(`http://localhost:3002/register-record`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData), // Gửi dữ liệu đăng nhập qua body
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    const result = await response.json();
  
    return result;
  } catch (error) {
    console.error("Error during create:", error);
    throw error;
  }
};
export const CheckInfoMedical = async (formData: any) => {
  try {
    const response = await fetch(`http://localhost:3002/medical/checkinfo`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData), // Gửi dữ liệu đăng nhập qua body
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    const result = await response.json();
  
    return result;
  } catch (error) {
    console.error("Error during create:", error);
    throw error;
  }
};

// Controller để đăng nhập vào hồ sơ y tế
export const handleLoginMedical = async (formData: any) => {
  try {
    const response = await fetch(`http://localhost:3002/login-record`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData), // Gửi dữ liệu đăng nhập qua body
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error during login:", error);
    throw error;
  }
};

// const showDataTable = async ()=>{
//   const res:any =await ShowFunAccessRequests(datagetshow)
//   console.log(res);
// };
// useState(()=>{
//   showDataTable()
// },[])
 export const showdataprofiles = async (datacheckprofile: any) => { 
  try {
    // Gửi dữ liệu đến endpoint
    const response = await fetch("http://localhost:3002/getinfo-record", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(datacheckprofile), // Chuyển đổi đối tượng thành chuỗi JSON
    });
    const result = await response.json();
    // console.log("res"+result['cccd']);
    return result;

  } catch (error) {
    console.error("Error during login:", error);
    throw error;
  }
 };
 export const updataprofiles = async (data: any) => { 
  try {
    const response = await fetch("http://localhost:3002/update-record", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    // Kiểm tra mã trạng thái
    if (!response.ok) {
      const errorMessage = await response.text(); // Lấy thông báo lỗi từ server nếu có
      throw new Error(`HTTP error! status: ${response.status}, message: ${errorMessage}`);
    }

    const result = await response.json();
    return result;

  } catch (error) {
    console.error("Error during profile update:", error);
    throw error;
  }
};
export const RequestMedical = async (data: any) => { 
  try {
    const response = await fetch("http://localhost:3002/request-record", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    // Kiểm tra mã trạng thái
    if (!response.ok) {
      const errorMessage = await response.text(); // Lấy thông báo lỗi từ server nếu có
      throw new Error(`HTTP error! status: ${response.status}, message: ${errorMessage}`);
    }

    const result = await response.json();
    return result;

  } catch (error) {
    console.error("Error during profile update:", error);
    throw error;
  }
};
export const ShowFunAccessRequests= async (data: any) => { 
  try {
    const response = await fetch("http://localhost:3002/getfull-accessRequests", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    // Kiểm tra mã trạng thái
    if (!response.ok) {
      const errorMessage = await response.text(); // Lấy thông báo lỗi từ server nếu có
      throw new Error(`HTTP error! status: ${response.status}, message: ${errorMessage}`);
    }

    const result = await response.json();
    return result;

  } catch (error) {
    console.error("Error during profile update:", error);
    throw error;
  }
};


export const ApproveAccessRequests= async (data: any) => { 
  try {
    const response = await fetch("http://localhost:3002/approve-access-request", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    // Kiểm tra mã trạng thái
    if (!response.ok) {
      const errorMessage = await response.text(); // Lấy thông báo lỗi từ server nếu có
      throw new Error(`HTTP error! status: ${response.status}, message: ${errorMessage}`);
    }
    const datauser = {
      fullname:data.datauser.record.name,
      birthday:data.datauser.record.birthDate,
      address: data.datauser.record.address,
      tokenmedical: data.datauser.record.tokenmedical,
      sobh: data.datauser.record.medicalinsurance,
      sex: data.datauser.record.gender,
      weight: data.datauser.record.weight,
      height: data.datauser.record.height,
      email: data.datauser.record.email,
      phoneNumber:data.datauser.record.phoneNumber,
      avatar: data.datauser.record.avatar,
      tokenbranch: data.tokenbranch,
      tokeorg: data.tokenbranch,
      cccd: data.datauser.record.cccd,
  };
  
    const _response:any =fetch("http://127.0.0.1:8000/api/medical-record-books", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(datauser),
    });
    // const result = await _response.json();
    return _response;

  } catch (error) {
    console.error("Error during profile update:", error);
    throw error;
  }
};

