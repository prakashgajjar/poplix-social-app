 import axios from "axios";
import toast from "react-hot-toast";
 
 export  const repost = async (postId) => {
    try {
      const response = await axios.post("api/home/post/repost",{postId}
      , {
        headers: {
          "Content-Type": "aplication/json"
        }
      })
      console.log(response.data.liked);
      if (response.status === 200) {
        const data = response
         toast.success("✨ New post just dropped!");
        return data;
      }
    } catch (error) {
      console.error(error)
      toast.success("Oops! Something went wrong. Please try again. 😔");
    }

  }