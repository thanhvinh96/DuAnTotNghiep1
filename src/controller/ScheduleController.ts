export const CreaterSchedule = async (data:any)=>{
    try {
      const response = await fetch("https://ehrmedical.online/api/schedule-create", {
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
  export const GetScheduleByClinics = async (data:any)=>{
    try {
      const response = await fetch("https://ehrmedical.online/api/schedule/byclinics", {
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
  export const GetScheduleByMedical = async (data:any)=>{
    try {
      const response = await fetch("https://ehrmedical.online/api/schedule/bymedical", {
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

  export const UpdateDoctorByMedical = async (data:any)=>{
    try {
      const response = await fetch("https://ehrmedical.online/api/schedule/update/reception", {
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