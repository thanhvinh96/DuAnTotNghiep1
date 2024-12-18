import { CreateMedical, LoginMedical } from '../model/MedicalModel'; // Import model tương tác với API

// Controller để tạo hồ sơ y tế
export const handleCreateMedical = async (formData: any) => {
  try {
    const response = await fetch(`http://103.179.185.78:3002/register-record`, {
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
export const Forgotpassword = async (formData: any) => {
  try {
    const response = await fetch(`http://103.179.185.78:3002/medical/forgot-password`, {
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
export const Newpassword = async (formData: any) => {
  try {
    const response = await fetch(`http://103.179.185.78:3002/medical/verify-password`, {
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
    const response = await fetch(`http://103.179.185.78:3002/medical/checkinfo`, {
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
    const response = await fetch(`http://103.179.185.78:3002/login-record`, {
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
    const response = await fetch("http://103.179.185.78:3002/getinfo-record", {
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
    const response = await fetch("http://103.179.185.78:3002/update-record", {
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
    const response = await fetch("http://103.179.185.78:3002/request-record", {
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
    const response = await fetch("http://103.179.185.78:3002/getfull-accessRequests", {
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

export const ShowFunDiseasecode= async (data: any) => { 
  try {
    const response = await fetch("http://103.179.185.78:3002/medical/diseasecode", {
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
    const response = await fetch("http://103.179.185.78:3002/approve-access-request", {
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
      fieldsToShare: data.fieldsToShare,
  };
  
    const _response:any = await fetch("https://ehrmedical.online/api/medical-record-books", {
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
export const GetHistoryMedical = async (data:any)=>{
  try{
    const response1 = await fetch("http://103.179.185.78:3002/medical/diseasecode", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!response1.ok) {
      const errorMessage = await response1.text(); // Lấy thông báo lỗi từ server nếu có
      throw new Error(`HTTP error on first API! status: ${response1.status}, message: ${errorMessage}`);
    }

    const result = await response1.json();
    console.log("First API call successful:", result);
    return result;
  } catch (error) {
    console.error("Error during API calls:", error);
    throw error;
  }
}
export const PostMedicalMetrics = async (data:any)=>{
  try{
    const response1 = await fetch("http://103.179.185.78:3002/medical/update/metrics", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!response1.ok) {
      const errorMessage = await response1.text(); // Lấy thông báo lỗi từ server nếu có
      throw new Error(`HTTP error on first API! status: ${response1.status}, message: ${errorMessage}`);
    }

    const result = await response1.json();
    console.log("First API call successful:", result);
    return result;
  } catch (error) {
    console.error("Error during API calls:", error);
    throw error;
  }
}
export const ShowMedicalMetrics = async (data:any)=>{
  try{
    const response1 = await fetch("http://103.179.185.78:3002/medical/get/metrics", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!response1.ok) {
      const errorMessage = await response1.text(); // Lấy thông báo lỗi từ server nếu có
      throw new Error(`HTTP error on first API! status: ${response1.status}, message: ${errorMessage}`);
    }

    const result = await response1.json();
    console.log("First API call successful:", result);
    return result;
  } catch (error) {
    console.error("Error during API calls:", error);
    throw error;
  }
}
export const GetHistoryMedicalDetail = async (data:any)=>{
  try {

    const response1 = await fetch("http://103.179.185.78:3002/medical/diseasecodedetail", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!response1.ok) {
      const errorMessage = await response1.text(); // Lấy thông báo lỗi từ server nếu có
      throw new Error(`HTTP error on first API! status: ${response1.status}, message: ${errorMessage}`);
    }

    const result = await response1.json();
    console.log("First API call successful:", result);
    return result;
  } catch (error) {
    console.error("Error during API calls:", error);
    throw error;
  }
}
export const ShareGetHistoryMedicalDetail = async (data:any)=>{
  try {

    const response1 = await fetch("http://103.179.185.78:3002/medical/diseasecode/org/detail", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!response1.ok) {
      const errorMessage = await response1.text(); // Lấy thông báo lỗi từ server nếu có
      throw new Error(`HTTP error on first API! status: ${response1.status}, message: ${errorMessage}`);
    }

    const result = await response1.json();
    console.log("First API call successful:", result);
    return result;
  } catch (error) {
    console.error("Error during API calls:", error);
    throw error;
  }
}
export const GetHistoryMedicalShareHospital = async (data:any)=>{
  try {

    const response1 = await fetch("http://103.179.185.78:3002/medical/diseasecode-byhospital", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!response1.ok) {
      const errorMessage = await response1.text(); // Lấy thông báo lỗi từ server nếu có
      throw new Error(`HTTP error on first API! status: ${response1.status}, message: ${errorMessage}`);
    }

    const result = await response1.json();
    console.log("First API call successful:", result);
    return result;
  } catch (error) {
    console.error("Error during API calls:", error);
    throw error;
  }
}
export const PushDataMedical = async (data: any) => { 
  try {
    // Gửi dữ liệu đến API đầu tiên
    const response1 = await fetch("http://103.179.185.78:3002/medical/pushdata", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    // Kiểm tra mã trạng thái của API đầu tiên
    if (!response1.ok) {
      const errorMessage = await response1.text(); // Lấy thông báo lỗi từ server nếu có
      throw new Error(`HTTP error on first API! status: ${response1.status}, message: ${errorMessage}`);
    }

    const result1 = await response1.json();
    console.log("First API call successful:", result1);

    // Nếu API đầu tiên thành công, tiếp tục gửi đến API thứ hai
    const response2 = await fetch("https://ehrmedical.online/api/medicalconclusion/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    // Kiểm tra mã trạng thái của API thứ hai
    if (!response2.ok) {
      const errorMessage = await response2.text();
      throw new Error(`HTTP error on second API! status: ${response2.status}, message: ${errorMessage}`);
    }

    const result2 = await response2.json();
    console.log("Second API call successful:", result2);

    // Trả về kết quả từ cả hai API
    return {
      firstApiResult: result1,
      secondApiResult: result2,
    };

  } catch (error) {
    console.error("Error during API calls:", error);
    throw error;
  }
};
export const ShowCodeMedicalBycccd = async (data: any) => { 
  try {
    const response = await fetch("https://ehrmedical.online/api/medical/cccd", {
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

export const ShowInfoMedicalBycccd = async (data: any) => { 
  try {
    const response = await fetch("https://ehrmedical.online/api/medical/code", {
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
export const ShowInfoMedicalByBranch = async (data: any) => { 
  try {
    const response = await fetch("http://127.0.0.1:8000/api/medicalbook/bybranch", {
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
export const ShowInfoMedicalByOrg = async (data: any) => { 
  try {
    const response = await fetch("http://127.0.0.1:8000/api/medicalbook/byorg", {
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

export const ShowMedicalByCode = async (data: any) => { 
  try {
    const response = await fetch("http://127.0.0.1:8000/api/medicalconclusion/show/branch", {
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

