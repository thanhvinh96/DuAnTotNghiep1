export const GetInfoFullPersonnel = async (FormData:any) => {
    try {
        const response = await fetch("http://localhost:3002/getfull-personnel", {
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
        const response:any = await fetch("http://localhost:3002/create-user", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(FormData),

        });
        const data = await response.json();

        console.log('gias trij user '+data.result)
        console.log('gias trij user '+data.result.tokeorg)
        // 'fullname' => $request->fullname,
        // 'address' => $request->address,
        // 'typeusers' => $request->typeusers, 
        // 'phone' => $request->phone,
        // 'imgidentification' => '',
        // 'cccd' => $request->cccd,
        // 'tokenuser' => $request->tokenuser,
        // 'branch' => $request->branch,
        // 'tokenorg' => $request->tokeorg,
        const dataUserMo={
          fullname:data.result.fullname,
          address:data.result.address,
          typeusers:data.result.typeusers,
          phone:data.result.phone,
          imgidentification:data.result.imgidentification,
          cccd:data.result.cccd,
          tokenuser:data.result.tokenuser,
          branch:data.result.branch,
          password:data.result.hashedPassword,
          tokeorg:data.result.tokeorg,
          License:data.result.License,
          avatar:data.result.avatar,
          specialized:data.result.specialized,
        }
        console.log(data.success)
        if (data.success ===true) {
        
            const _res =  await fetch("http://127.0.0.1:8000/api/users", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(dataUserMo),
    
            });
            console.log(_res)
            return data
          
         
        //   console.log("Success:", data);
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
        const response = await fetch("http://localhost:3002/getpersonnel-bytoken/", {
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