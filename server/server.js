import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/mongoose.js";
import logins from "./models/login.js";
import posts from "./models/postSchema.js";
import comments from "./models/comments.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import authMiddleware from "./middleware.js";
import cors from "cors";
import cookiParser from "cookie-parser";
import Like from "./models/postLikes.js";
import bookMark from "./models/bookmark.js";

const app = express();
app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"],
    credentials: true,
  })
);
dotenv.config();
connectDB();
app.use(express.json());
app.use(cookiParser());

const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: maxAge,
  });
};

app.get("/", (req, res) => {
  return res.send("hello world");
});

app.post("/register", async (req, res) => {
  try {
    const { register_Name, register_email, register_password, profileUrl } =
      req.body;
    const exist = await logins.findOne({ email: register_email });
    if (exist) {
      return res.status(400).send("user already exists");
    }
    const hashedPassword = await bcrypt.hash(register_password, 10);
    const user = new logins({
      name: register_Name,
      email: register_email,
      password: hashedPassword,
      profileUrl: profileUrl,
    });
    await user.save();
    res.status(200).send("user resistered successfully");
  } catch (err) {
    console.log("error in registration:", err);
    return res.status(500).send("server error in registrations");
  }
});

app.post("/login", async function (req, res) {
  try {
    console.log(".login");
    const { email, password } = req.body;
    const exist = await logins.findOne({ email: email });
    if (!exist) {
      console.log("User not found");
      return res.status(300).send({
        success: false,
        message: "email does not exist",
      });
    }

    const isMatch = await bcrypt.compare(password, exist.password);
    if (!isMatch) {
      return res.status(500).send({
        success: false,
        message: "Password not matched",
      });
    }
    let payload = {
      user: {
        id: exist._id,
      },
    };
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: 360000000 },
      (err, token) => {
        if (err) throw err;
        return res.json({ token });
      }
    );
  } catch (err) {
    console.log(err);
    return res.status(500).send("Server error:", err);
  }
});

app.get("/home", async (req, res) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: "No token provided" });
  }

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.user.id;
    let loginUser = await logins.findById(userId);
    const tweets = await posts.find();
    const allTweets = [];
    for (const post of tweets) {
      const uid = post.userid;
      const user = await logins.findById(uid);
      const comment = await comments.find({ postId: post._id });
      const likes = await Like.find({ postId: post.id });
      const obj = {
        post,
        user,
        comment,
        likes,
      };
      allTweets.push(obj);
    }
    const obj = {
      loginUser,
    };
    allTweets.push(obj);
    console.log("/home data:", allTweets);

    return res.json(allTweets);
  } catch (err) {
    console.log("error in get home", err);
    return res.status(500).send("error in get home");
  }
});

app.get("/home/myposts", async (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ message: "No token provided" });
  }
  const token = authHeader.split(" ")[1];
  try {
    console.log(".home/myposts");
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.user.id;
    let loginUser = await logins.findById(userId);
    const tweets = await posts.find({ userid: userId });
    const allTweets = [];
    for (const post of tweets) {
      const uid = post.userid;
      const user = await logins.findById(uid);
      const comment = await comments.find({ postId: post._id });
      const likes = await Like.find({ postId: post.id });
      const obj = {
        post,
        user,
        comment,
        likes,
      };
      allTweets.push(obj);
    }
    const obj = {
      loginUser,
    };
    allTweets.push(obj);
    console.log("/home/myposts data:", allTweets);
    return res.json(allTweets);
  } catch (err) {
    console.log("error in get home", err);
    return res.status(500).send("error in get home");
  }
});

app.get("/home/likedtweets", async (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ message: "No token provided" });
  }
  const token = authHeader.split(" ")[1];
  try {
    console.log(".home/likedtweets");
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.user.id;
    let loginUser = await logins.findById(userId);
    const tweets = await posts.find({ userid: userId, likesCnt: { $gt: 0 } });
    const allTweets = [];
    for (const post of tweets) {
      const uid = post.userid;
      const user = await logins.findById(uid);
      const comment = await comments.find({ postId: post._id });
      const likes = await Like.find({ postId: post.id });
      const obj = {
        post,
        user,
        comment,
        likes,
      };
      allTweets.push(obj);
    }
    const obj = {
      loginUser,
    };
    allTweets.push(obj);
    console.log("/home/likedtweets data:", allTweets);
    return res.json(allTweets);
  } catch (err) {
    console.log("error in get home", err);
    return res.status(500).send("error in get home");
  }
});

app.get("/home/bookmark", async (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ message: "No token provided" });
  }
  const token = authHeader.split(" ")[1];
  try {
    console.log(".home/bookmarks");
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.user.id;
    let loginUser = await logins.findById(userId);
    const bookPostId = await bookMark.find(
      { userId: userId },
      { postId: 1, _id: 0 }
    );
    console.log("bookpostId", bookPostId);
    const tweets = [];
    for (const item of bookPostId) {
      const { postId } = item;
      const post = await posts.findOne({ _id: postId });
      if (post) {
        tweets.push(post);
      }
    }
    console.log(tweets);
    const allTweets = [];
    for (const post of tweets) {
      const uid = post.userid;
      const user = await logins.findById(uid);
      const comment = await comments.find({ postId: post._id });
      const likes = await Like.find({ postId: post._id });
      const obj = {
        post,
        user,
        comment,
        likes,
      };
      allTweets.push(obj);
    }
    const obj = {
      loginUser,
    };
    allTweets.push(obj);
    console.log("/home/likedtweets data:", allTweets);
    return res.json(allTweets);
  } catch (err) {
    console.log("error in get home", err);
    return res.status(500).send("error in get home");
  }
});

app.post("/upload", async (req, res) => {
  const tweetText = req.body.tweetBody;
  const tweetImg = req.body.tweetImg;
  const postuser = req.body.loginUserIdU;
  console.log(req.body.data);
  try {
    const newPost = new posts({
      userid: postuser,
      postedOn: new Date(),
      tweetBody: tweetText,
      imgUrl: tweetImg,
    });
    await newPost.save();
  } catch (error) {
    console.log("error in upload(server", error);
    res
      .status(500)
      .json({ message: "error in upload(server", error: error.message });
  }
});

app.post("/likes", async (req, res) => {
  const { postId, userId } = req.body;

  try {
    // Prevent duplicate likes
    const existingLike = await Like.findOne({ postId, userId });
    if (existingLike) {
       await Like.deleteOne({ postId, userId });
       await posts.findByIdAndUpdate(postId, { $inc: { likesCnt: -1 } });
       return res
         .status(200)
         .json({ message: "Like removed", action: "unlike" });

    }
    // Create a new like
    const newLike = new Like({ postId, userId });
    await newLike.save();
    await posts.findByIdAndUpdate(postId, {
      $inc: { likesCnt: 1 },
    });
    res.status(201).json({ message: "Like added", action: "like", newLike });

  } catch (error) {
    res
      .status(500)
      .json({ message: "Error processing like", error: error.message });
  }
});

app.post("/comments", async (req, res) => {
  console.log("/comments");
  const { postId, userId, comment, username, userImg } = req.body;
  console.log(req.body);
  try {
    const newComment = new comments({
      userId,
      postId,
      comment,
      userName: username,
      userImg,
    });
    await newComment.save();
    await posts.findByIdAndUpdate(postId, {
      $inc: { commentsCnt: 1 },
    });
    res.status(201).json(newComment);
  } catch (err) {
    console.log("comment err:", err);
    res
      .status(500)
      .json({ message: "error processing comment", error: err.message });
  }
});

app.get("/home/:postId", async (req, res) => {
  console.log("Route hit!");
  console.log(req.params.postId);
  try {
    const postId = req.params.postId;
    const post = await posts.findById(postId);
    const likes = await Like.find({ postId: postId });
    const comment = await comments.find({ postId: postId });
    const userData = await logins.findById(post.userid);
    const likedUsers = [];
    for (const like of likes) {
      const LikedUser = await logins.findById(like.userId);
      likedUsers.push(LikedUser);
    }
    const tweet = [];
    const obj = {
      post,
      likedUsers,
      comment,
      userData,
    };
    tweet.push(obj);

    console.log("/post:", tweet);
    return res.json(tweet);
  } catch (error) {
    console.log("error in get post", error);
    return res.status(500).send("error in get post");
  }
});

app.get("/myprofile", async (req, res) => {
  try {
    let user = await logins.findById(req.user.id);
    return res.json(user);
  } catch (err) {
    console.log("error in get home", err);
    return res.status(500).send("error in get myprofile", err);
  }
});

app.get("/bookmark", async (req, res) => {
  try {
    let bookPost = await bookmark.find({
      userId: "6631be7831ba9172eb432201",
    });
    console.log("/bookmark:", bookPost);
    const bookMarkPost = await post.findById(bookPost.postId);
    return res.json(bookMarkPost);
  } catch (error) {
    return res.status(400).send("error in getting bookmarks", error);
  }
});

app.post("/bookmark", async (req, res) => {
  try {
    const data = req.body;
    const exist = await bookMark.findOne({
      postId: data.tweetId,
      userId: data.LoginUserId,
    });
    if (exist) {
      return res.status(400).send("post already bookmarked");
    }
    const newBookmark = new bookMark({
      postId: data.tweetId,
      userId: data.LoginUserId,
    });
    await newBookmark.save();
    res.status(201).json(newBookmark);
  } catch (error) {
    console.log("error in post bookmark", err);
    return res.status(500).send("error in get bookmark", error);
  }
});

app.listen(process.env.PORT, () => {
  console.log("server running on port:", process.env.PORT);
});
