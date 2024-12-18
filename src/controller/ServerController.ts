export const GetSchedule = async (data:any)=>{
    try {
      const response = await fetch("https://ehrmedical.online/api/services", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
  
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
  export const GetScheduleID = async (data:any)=>{
    try {
      const response = await fetch("https://ehrmedical.online/api/services/id", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
  
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
