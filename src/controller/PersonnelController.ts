export const GetInfoFullPersonnel = async (FormData:any) => {
    try {
        const response = await fetch("http://103.179.185.78:3002/getfull-personnel", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(FormData),

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
export const CreatePersonnels = async(FormData:any)=>{
    try {
        const response = await fetch("http://103.179.185.78:3002/create-user", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(FormData),

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
}

export const GetpersonnelByToken = async(FormData:any)=>{
    try {
        const response = await fetch("http://103.179.185.78:3002/getpersonnel-bytoken/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(FormData),

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
}