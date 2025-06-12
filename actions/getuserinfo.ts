 import axios from "axios";
 
 export  const getuserinfo = async () => {
    try {
      const response = await axios.get("api/home/getuserinfo", {
        headers: {
          "Content-Type": "aplication/json"
        }
      })
      console.log("userinfo : ",response.data);
      if (response.status === 200) {
        const data = response.data;
        return data;
      }
    } catch (error) {
      console.error(error)
    }

  }