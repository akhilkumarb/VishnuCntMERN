import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./Post.css";

export default function Post() {
  const [post, setPost] = useState({});
  const [loading, setLoading] = useState(true);
  const { postId } = useParams();
  console.log(postId);

  useEffect(() => {
    fetchPost();
  }, []);

  const fetchPost = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/home/${postId}`);
      const postData = response.data;
      console.log(postData);
      setPost(postData);
      setLoading(false);
    } catch (error) {
      console.log("error in fetching post", error);
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

 return (
   <div className="main">
     <div className="post-container">
       <div className="post">
           <div className="post-img-name">
             <div className="post_profile-image">
               <img
                 src={post[0].userData.profileUrl}
                 alt={post[0].userData.name}
               />
             </div>
             <div className="post_header-text">
               <h2>
                 {post[0].userData.name}
                 
               </h2>
             </div>
           </div>
           <div className="post_body">
             <div className="post_header">
               <div className="post_header-discription">
                 <p>{post[0].post.tweetBody}</p>
               </div>
             </div>
             <img src={post[0].post.imgUrl} alt="tweet-img" />
             <div className="post_footer"></div>
           </div>
       </div>
     </div>
     <div className="likes-comments">
       <div className="likes">
         <h2>Likes:</h2>

         {post[0].likedUsers.map((like, idx) => (
           <div className="post-img-name" key={idx}>
             <div className="post_profile-image">
               <img src={like.profileUrl} alt="profile" />
             </div>
             <div className="post_header-text">
               <h3>{like.name}</h3>
             </div>
           </div>
         ))}
       </div>
       <div className="Comments">
         <h2>comments:</h2>
         {post[0].comment.map((com, idx) => (
           <div className="post-img-name" key={idx}>
             <div className="post_profile-image">
               <img src={com.userImg} alt="profile" />
             </div>
             <div className="post_header-text">
               <h3>
                 {com.userName}: {com.comment}
               </h3>
             </div>
           </div>
         ))}
         
       </div>
     </div>
   </div>
 );

}
