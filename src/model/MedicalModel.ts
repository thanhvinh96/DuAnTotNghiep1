// Không cần require('dotenv') trong ReactJS frontend

import { thongtin } from'../db/db'; // Đường dẫn tới tệp config.ts

export const CreateMedical = async (formData: any) => {
  // console.log(config.API_URL)
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

export const LoginMedical = async (formData: any) => {
  try {
    const response = await fetch(`${URL}login-record`, {
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
