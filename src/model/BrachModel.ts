require('dotenv').config(); // Nạp biến môi trường từ .env

const URL= process.env.PORT_URL;
export const createBrach = async(Brach:any)=>{
    try {
        const response = await fetch(`${URL}create-brach`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(Brach), // Gửi dữ liệu đăng nhập qua body
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
export const getFullBrachByHospital =async(data:any)=>{
    try {
        const response = await fetch(`${URL}getfull-brach`, {
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