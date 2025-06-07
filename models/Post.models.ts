import { Schema, model,models, Types } from "mongoose";

const PostSchema = new Schema({
  user: { type: Types.ObjectId, ref: "User", required: true },
  title: String,
  content: String,
  url: String,
  type: {
    type: String,
    enum: ["text", "image", "video"],
    required: true,
  },
  tags: [String],
  city: String,
  area: String,
  price: Number,
  condition: String,
  expiresAt: Date,
  eventDate: Date,
  place: {
    name: String,
    address: String,
    coordinates: {
      lat: Number,
      lng: Number,
    },
  },
  views: { type: Number, default: 0 },
  isPinned: { type: Boolean, default: false },
  likes: [{ type: Types.ObjectId, ref: "User" }],
  upvotes: { type: Number, default: 0 },
  comments: [{ type: Types.ObjectId, ref: "Comment" }],
  createdAt: { type: Date, default: Date.now },
});


const Post = models.Post ||  model("Post", PostSchema);
export default Post;
