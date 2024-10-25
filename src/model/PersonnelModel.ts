require('dotenv').config(); // Nạp biến môi trường từ .env

const URL= process.env.PORT_URL;
export const createPersonnel = async(FromData:any)=>{
    try {
        const response = await fetch(`${URL}create-user `, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(FromData), // Gửi dữ liệu đăng nhập qua body
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
export const getPersonnel = async(FromData:any)=>{
    try {
        const response = await fetch(`${URL}getfull-personnel `, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(FromData), // Gửi dữ liệu đăng nhập qua body
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