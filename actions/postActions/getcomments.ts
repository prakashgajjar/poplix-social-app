 import axios from "axios";
import toast from "react-hot-toast";
 
 export  const getcomments = async (id) => {
    try {
      const response = await axios.post("api/home/post/getcomments", {id}, {
        headers: {
          "Content-Type": "aplication/json"
        }
      })
      if (response.status === 200) {
        const comments = response.data.comments;
        // console.log(comments);
        return comments;
      }
    } catch (error) {
      console.error(error)
      toast.success("error from comments get!");
    }

  }