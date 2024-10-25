export const RegisterHospital = async (formData: any) => {
    try {
        const response = await fetch("http://localhost:3002/creater-org", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });
    
        if (response.ok) {
          const data = await response.json();
          console.log("Success:", data);
          return data;
        //   alert('Success')
          // You can add navigation or success handling here
        } else {
          const error = await response.json();
          console.error("Error:", error);
          return error
          // Handle error response from server
        }
      } catch (err) {
        console.error("Network error:", err);
        // Handle network errors here
      }
};
export const FetchHospital = async () => {
    try {
        const response = await fetch("http://localhost:3002/getall-org", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          
        });
    
        if (response.ok) {
          const data = await response.json();
        //   console.log("Success:", data);
          return data;
        //   alert('Success')
          // You can add navigation or success handling here
        } else {
          const error = await response.json();
          console.error("Error:", error);
          return error
          // Handle error response from server
        }
      } catch (err) {
        console.error("Network error:", err);
        // Handle network errors here
      }
};
export const LoginHospital = async (updatedFormData:any) => {
    try {
        const response = await fetch("http://localhost:3002/login-org", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedFormData),

        });
    
        if (response.ok) {
          const data = await response.json();
        //   console.log("Success:", data);
          return data;
        //   alert('Success')
          // You can add navigation or success handling here
        } else {
          const error = await response.json();
          console.error("Error:", error);
          return error
          // Handle error response from server
        }
      } catch (err) {
        console.error("Network error:", err);
        // Handle network errors here
      }
};
export const GetInfoHospital = async (updatedFormData:any) => {
    try {
        const response = await fetch("http://localhost:3002/getinfo-org", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedFormData),

        });
    
        if (response.ok) {
          const data = await response.json();
        //   console.log("Success:", data);
          return data;
        //   alert('Success')
          // You can add navigation or success handling here
        } else {
          const error = await response.json();
          console.error("Error:", error);
          return error
          // Handle error response from server
        }
      } catch (err) {
        console.error("Network error:", err);
        // Handle network errors here
      }
};