import axios from "axios";
import toast from "react-hot-toast";
 
 export  const sendcomment = async (id : string , content :string) => {
    try {
      const response = await axios.post("/api/home/post/comment", {
        id,content
      }, {
       headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true
      })
      // console.log(response.data);
      if (response.status === 200) {
        const data = response.data;
        if(data){
          toast.success("comment addes!");
        }else{
          toast.success("something wrong”");
        }
        return data;
      }
    } catch (error) {
      console.error(error)
    }

  }