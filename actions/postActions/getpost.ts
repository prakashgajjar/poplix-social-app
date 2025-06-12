 import axios from "axios";
 
 export  const getPosts = async () => {
    try {
      const response = await axios.post("api/home/post/getposts", {}, {
        headers: {
          "Content-Type": "aplication/json"
        }
      })
      if (response.status === 200) {
        const data = response.data.data;
        return data;
      }
    } catch (error) {
      console.error(error)
      return null
    }

  }