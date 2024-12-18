export const AddBillMedical = async (data: any) => { 
    try {
      const response = await fetch("http://127.0.0.1:8000/api/PatientBillController/add", {
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

  export const showDetailBill = async (data: any) => { 
    try {
      const response = await fetch("http://127.0.0.1:8000/api/PatientBillController/pyid", {
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