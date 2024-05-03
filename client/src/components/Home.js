
import Nav from "./Nav";
import Main from "./Main";
import Post from "./Post.js";
import "./Home.css";
import Mypost from "./Mypost.js"

import {  Routes, Route} from "react-router-dom";
import Bookmark from "./Bookmark.js";
import LikedTweets from "./LikedTweets.js";
import Myprofie from "./Myprofie.js";

export default function Home() {
  
  return (
    <div className="nav-main-aside">
      <Nav />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/myposts" element={<Mypost />} />
        <Route path="/:postId" element={<Post />} />
        <Route path="/bookmark" element={<Bookmark />} />
        <Route path="/likedtweets" element={<LikedTweets />} />
        <Route path="/myprofile" element={<Myprofie />} />
      </Routes>
    </div>
  );
}
