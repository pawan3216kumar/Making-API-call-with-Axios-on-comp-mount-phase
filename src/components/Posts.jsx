import { useState, useEffect } from "react";
import axios from "axios";
import Post from "./Post";
import LoadingIndicator from "./LoadingIndicator";
import ErrorIndicator from "./ErrorIndicator";

function Posts() {
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(false);

  async function fetchAndUpdateData() {
    {
      setLoading(true);
    }
    try {
      
        let res = await axios.get("https://reqres.in/api/users")
        setPosts(res.data.data)
         setLoading(false);
      
    } catch (error) {
      console.log(error)
      setLoading(true)
      setError(false)
      
    }
  }

  useEffect(()=>{
    fetchAndUpdateData()
  } , []);

  if (loading) {
    return <LoadingIndicator />;
  }

  if (error) {
    return <ErrorIndicator />;
  }

  return (
    <div>
      <h1>List of Posts</h1>
      {posts.map((user , i)=>{
         return (
            <div key = {i}>
                <Post {...user}/>
            </div>

         )
      })}
    </div>
  );
}

export default Posts;
