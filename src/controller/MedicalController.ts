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
}
