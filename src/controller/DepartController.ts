export const CreaterDepart = async (formData: any) => {
    try {
        const response = await fetch("https://ehrmedical.online/api/department/add", {
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

export const GetDepartByBranch = async (formData: any) => {
  try {
      const response = await fetch("https://ehrmedical.online/api/department/bybranch", {
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

export const DeleTeDepartByBranch = async (formData: any) => {
  try {
      const response = await fetch("https://ehrmedical.online/api/department/delete", {
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

