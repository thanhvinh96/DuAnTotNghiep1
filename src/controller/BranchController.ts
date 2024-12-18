export const CreateBranchs = async (formData: any) => {
  try {
    // First API call to create the branch
    const response = await fetch("http://103.179.185.78:3002/create-brach", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    // Check if the first API call is successful
    if (!response.ok) {
      // Handle server-side error
      const error = await response.json();
      console.error("Error from first API:", error);
      return { success: false, error };
    }

    const data = await response.json();
    console.log("Success:", data.data);

    // Proceed if the response from the first API was successful
    if (data.success === true) {
      // Second API call to create the branch in a different service
      const _response = await fetch("http://127.0.0.1:8000/api/branches", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data.data),
      });

      if (_response.ok) {
        // Handle success from the second API
        const responseData = await _response.json();
        console.log("Success in second API:", responseData);
        return responseData; // Return data from the second API
      } else {
        // Handle error from the second API
        const error = await _response.json();
        console.error("Error from second API:", error);
        return { success: false, error };
      }
    } else {
      // Handle error from the first API
      const error = await response.json();
      console.error("Error from first API:", error);
      return { success: false, error };
    }
  } catch (err: unknown) {
    console.error("Network error:", err);
    // Handle network error
    if (err instanceof Error) {
      return { success: false, error: err.message }; // Correctly accessing err.message
    } else {
      return { success: false, error: "Unknown error occurred" };
    }
  }
};

export const GetFullBranch = async (formData: any) => {
    try {
        const response = await fetch("http://103.179.185.78:3002/getfull-brach", {
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
      const response = await fetch("http://103.179.185.78:3002/request-record", {
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
      const response = await fetch("http://103.179.185.78:3002/get-request-branch", {
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