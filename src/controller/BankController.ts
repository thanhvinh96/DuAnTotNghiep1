export const addBankByBracnh = async (formData: any) => {
    try {
        const response = await fetch("http://127.0.0.1:8000/api/brank/add", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });
    
        if (response.ok) {
          const data = await response.json();
          console.log("Success:", data.data);
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

export const ShowBankByBracnh = async (formData: any) => {
    try {
        const response = await fetch("http://127.0.0.1:8000/api/brank/bybranch", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });
    
        if (response.ok) {
          const data = await response.json();
          console.log("Success:", data.data);
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

export const ShowBankByClient = async (formData: any) => {
    try {
        const response = await fetch("http://127.0.0.1:8000/api/brank/client", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });
    
        if (response.ok) {
          const data = await response.json();
          console.log("Success:", data.data);
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

export const ShowBankByIdClient = async (formData: any) => {
    try {
        const response = await fetch("http://127.0.0.1:8000/api/brank/idclient", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });
    
        if (response.ok) {
          const data = await response.json();
          console.log("Success:", data.data);
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

export const ShowBankByMoth = async () => {
  try {
      const response = await fetch("http://127.0.0.1:8000/api/brank/monthly", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        }
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log("Success:", data.data);
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
export const ShowBankByAll = async () => {
  try {
      const response = await fetch("http://127.0.0.1:8000/api/brank/all", {
        method: "GET",
       
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log("Success:", data.data);
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