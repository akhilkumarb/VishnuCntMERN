import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Main.css";

export default function Mypost() {
  const [commentInput, setCommentInput] = useState("");
  const [tweets, setTweets] = useState([]);
  const [Loginuser, setUser] = useState([]);
  const [tweetBody, setTweetBody] = useState("");
  const [tweetImg, settweetImg] = useState("");

  useEffect(() => {
    fetchTweets();
  }, []);

  const fetchTweets = async () => {
    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.get(
        process.env.REACT_APP_API + "/home/myposts",
        config
      );
      const dataArray = response.data;

      const loginUser = dataArray.find((data) => data.loginUser);
      const tweetsData = dataArray.filter(
        (data) => data.post && data.user && data.comment
      );
      const tweets = tweetsData.map((data) => ({
        post: data.post,
        user: data.user,
        comment: data.comment,
      }));
      setTweets(tweets);
      setUser(loginUser.loginUser);
    } catch (error) {
      console.error("Error fetching tweets:", error);
    }
  };

  const uploadTweet = async (event) => {
    event.preventDefault();
    const loginUserIdU = Loginuser._id;
    try {
      const response = await axios.post(process.env.REACT_APP_API + "/upload", {
        tweetBody,
        tweetImg,
        loginUserIdU,
      });
      if (response.status !== 201) {
        throw new Error("Failed to comments the post");
      }
    } catch (error) {
      console.log("error in uploading tweet", error);
    }
  };
const handleLike = async (postId, userId, event) => {
  event.preventDefault();
  try {
    const response = await axios.post(process.env.REACT_APP_API + "/likes", {
      postId,
      userId,
    });
    if (response.status === 200 || response.status === 201) {
      const { action, newLike, message } = response.data;
      console.log(`${message}:`, newLike);
      setTweets((prevTweets) =>
        prevTweets.map((tweet) => {
          if (tweet.post._id === postId) {
            return {
              ...tweet,
              post: {
                ...tweet.post,
                likesCnt:
                  action === "like"
                    ? tweet.post.likesCnt + 1
                    : tweet.post.likesCnt - 1,
              },
            };
          }
          return tweet;
        })
      );
    } else {
      throw new Error("Failed to process the like action");
    }
  } catch (error) {
    console.error("Error liking the post:", error);
  }
};
  const handleComment = async (
    postId,
    userId,
    comment,
    username,
    userImg,
    event
  ) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        process.env.REACT_APP_API + "/comments",
        {
          postId,
          userId,
          comment,
          username,
          userImg,
        }
      );

      if (response.status !== 201) {
        throw new Error("Failed to comments the post");
      }
      setTweets((prevTweets) =>
        prevTweets.map((tweet) => {
          if (tweet.post._id === postId) {
            return {
              ...tweet,
              post: {
                ...tweet.post,
                commentsCnt: tweet.post.commentsCnt + 1,
              },
            };
          }
          return tweet;
        })
      );
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  const handleBookmark = async (tweetId, LoginUserId, event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        process.env.REACT_APP_API + "/bookmark",
        {
          tweetId,
          LoginUserId,
        }
      );
      if (response.status !== 201) {
        throw new Error("Failed to bookmark the post");
      }
    } catch (error) {
      console.log("error for bookmark(main.js):", error);
    }
  };

  const navigate = useNavigate();
  const handleViewDetails = (tweet) => {
    navigate(`/home/${tweet}`);
  };

  return (
    <main>
      <div className="tweet_box">
        <div className="tweet-profile">
          <div className="post_profile-image">
            <img
              src={Loginuser.profileUrl}
              alt={Loginuser.name}
              id="tweetImg"
            />
          </div>
          <div className="profileUser">
            <h2>@{Loginuser.name}</h2>
          </div>
        </div>
        <div className="tweet-input">
          <input
            type="text"
            placeholder={`What's happening, ${Loginuser.name}?`}
            id="tweetBody"
            onChange={(e) => setTweetBody(e.target.value)}
          />

          <div className="img-upload">
            <input
              type="text"
              placeholder="Enter Image URL"
              onChange={(e) => settweetImg(e.target.value)}
            />
          </div>
          <button className="upload-btn" onClick={uploadTweet}>
            Tweet
          </button>
        </div>
      </div>

      <div className="post-container">
        <h1>My Posts: </h1>
        {tweets.length === 0 ? (
          <h2>No Posts Made..!</h2>
        ) : (
          tweets.map((tweet, index) => (
            <div className="post" key={index}>
              <div className="post-img-name">
                <div className="post_profile-image">
                  <img src={tweet.user.profileUrl} alt={tweet.user.name} />
                </div>
                <div className="post_header-text">
                  <h2>{tweet.user.name}</h2>
                </div>
              </div>
              <div className="post_body">
                <div className="post_header">
                  <div className="post_header-discription">
                    <p>{tweet.post.tweetBody}</p>
                  </div>
                </div>
                <button
                  className="imgButton"
                  onClick={() => handleViewDetails(tweet.post._id)}
                >
                  <img
                    style={{
                      width: "400px",
                      height: "250px",
                    }}
                    src={tweet.post.imgUrl}
                    alt="tweet-img"
                  />
                </button>
                <div className="post_footer">
                  <div>
                    <button
                      onClick={(e) => {
                        console.log("likes:", tweet.post._id, Loginuser._id);
                        handleLike(tweet.post._id, Loginuser._id, e);
                      }}
                    >
                      ({tweet.post.likesCnt})
                      <i class="fa-regular fa-thumbs-up"></i>
                    </button>
                  </div>
                  <div>
                    <input
                      type="text"
                      placeholder="Add your comment"
                      value={commentInput}
                      onChange={(e) => setCommentInput(e.target.value)}
                    />
                    <button
                      className="custom-button"
                      onClick={(e) =>
                        handleComment(
                          tweet.post._id,
                          Loginuser._id,
                          commentInput,
                          Loginuser.name,
                          Loginuser.profileUrl,
                          e
                        )
                      }
                    >
                      <i class="fa-solid fa-comment-dots"></i> (
                      {tweet.post.commentsCnt})
                    </button>
                  </div>
                  <div>
                    <button
                      onClick={(e) =>
                        handleBookmark(tweet.post._id, Loginuser._id, e)
                      }
                    >
                      <i class="fa-solid fa-bookmark"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </main>
  );
}
