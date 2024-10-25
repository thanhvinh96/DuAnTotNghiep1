// models/hospitalModel.js
require('dotenv').config(); // Nạp biến môi trường từ .env

const URL= process.env.PORT_URL;
export const LoginHospital = async (credentials:any) => {
  try {
    const response = await fetch(`${URL}login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials), // Gửi dữ liệu đăng nhập qua body
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error during login:", error);
    throw error;
  }
};
export const CreateHospital = async (hospital:any)=>{
    try {
        const response = await fetch(`${URL}creater-org`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(hospital), // Gửi dữ liệu đăng nhập qua body
        });
    
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
    
        const data = await response.json();
        return data;
      } catch (error) {
        console.error("Error during create:", error);
        throw error;
      }
}
export const getInfo =async(data:any)=>{
    try {
        const response = await fetch(`${URL}getinfo-org`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data), // Gửi dữ liệu đăng nhập qua body
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
}
