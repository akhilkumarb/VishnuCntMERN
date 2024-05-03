import jwt from "jsonwebtoken";

export default async function authMiddleware(req, res, next) {
  try {
    console.log("middle");
    let token = localStorage.getItem("token");
    if (!token) {
      console.log("torkn is empty");
      return res.status(400).send("token is empty ");
    }
    console.log("middle:", token);
    let decode = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decode.user;
    console.log(req.user);
    next();
  } catch (err) {
    console.log("error in middleware(jwtToken", err);
    return res.status(400).send("authentication error");
  }
}
