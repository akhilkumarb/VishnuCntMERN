import mongoose from "mongoose";
const { Schema } = mongoose;

const commentSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User" },
  postId: { type: Schema.Types.ObjectId, ref: "Post" }, 
    comment: { type: String, required: true },
  userName: { type: String, required: true },
  userImg: { type: String, required: true },
});

export default mongoose.model("comments", commentSchema);
