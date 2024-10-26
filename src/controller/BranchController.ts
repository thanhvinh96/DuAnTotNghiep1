export const CreateBranchs = async (formData: any) => {
    try {
        const response = await fetch("http://localhost:3002/create-brach", {
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
export const GetFullBranch = async (formData: any) => {
    try {
        const response = await fetch("http://localhost:3002/getfull-brach", {
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

export const BranchRequestMedical = async (formData: any) => {
  try {
      const response = await fetch("http://localhost:3002/request-record", {
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
export const ShowBranchRequestMedical = async (formData: any) => {
  try {
      const response = await fetch("http://localhost:3002/get-request-branch", {
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