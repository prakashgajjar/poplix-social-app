 import axios from "axios";
 
 export  const getpostfollowing = async () => {
    try {
      const response = await axios.get("api/home/post/followingpost", {
        headers: {
          "Content-Type": "aplication/json"
        }
      })
      if (response.status === 200) {
        const data = response.data.posts;
        return data;
      }
    } catch (error) {
      console.error(error)
      return null
    }

  }