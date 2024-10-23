// Không cần require('dotenv') trong ReactJS frontend

const URL = process.env.REACT_APP_PORT_URL; // Sử dụng biến môi trường REACT_APP

export const CreateMedical = async (formData: any) => {
  try {
    const response = await fetch(`${URL}register-record`, {
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
