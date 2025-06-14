 import axios from "axios";
 
 export  const followuser = async (id) => {
    try {
      const response = await axios.post("api/home/profile/follow", id, {
        headers: {
          "Content-Type": "application/json"
        }
      })
      // console.log(response.data);
      if (response.status === 200) {
        const data = response.data.follow;
        return data;
      }
    } catch (error) {
      console.error(error)
    }

  }