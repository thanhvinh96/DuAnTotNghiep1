import jwtDecode from 'jwt-decode';
import { useNavigate, useLocation } from "react-router-dom";

export const GetTokenOrg = async () => {
    try {
        const token = localStorage.getItem('tokenadmin');
        if (token) {
            const decodedToken: any = jwtDecode(token);
          
          
            return decodedToken
        }
      } catch (err) {
        console.error("Network error:", err);
        // Handle network errors here
      }
  };
  export const GetTokenBranch = (): string | null => {
    const location = useLocation(); // Lấy thông tin location từ React Router
    const queryParams = new URLSearchParams(location.search); // Lấy query params từ URL
    
    const model = queryParams.get("model"); // Lấy giá trị của query param 'model'
    console.log('Model:', model); // In giá trị của query param 'model'
    return model; // Trả về giá trị 'model'
};