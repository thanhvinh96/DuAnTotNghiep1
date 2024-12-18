// import { CreateMedical, LoginMedical } from '../model/MedicalModel'; // Import model tương tác với API

// Controller để tạo hồ sơ y tế
export const showSuperadmin = async (formData: any) => {
  try {
    const response = await fetch(`http://103.179.185.78:3002/org/superadmin`, {
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
export const addAdminChangeRequest = async (formData: any) => {
    try {
      const response = await fetch(`http://103.179.185.78:3002/managentnetwork/changeadmin`, {
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

  export const ShowAdminChangeRequest = async (formData: any) => {
    try {
      const response = await fetch(`http://103.179.185.78:3002/managentnetwork/changeadmin/byorg`, {
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