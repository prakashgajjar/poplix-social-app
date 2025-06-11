 import axios from "axios";
 
 export  const getlikes = async () => {
    try {
      const response = await axios.get("api/home/post/getlikes", {
        headers: {
          "Content-Type": "aplication/json"
        }
      })
      console.log(response.data.likedPostIds);
      if (response.status === 200) {
        const data = response.data.likedPostIds;
        return data;
      }
    } catch (error) {
      console.error(error)
    }

  }