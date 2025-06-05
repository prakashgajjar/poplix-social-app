import { Schema, model, Types } from "mongoose";

export const PostType = [
  "GENERAL",
  "EVENT",
  "MARKETPLACE",
  "FOOD",
  "QUESTION",
  "CONFESSION",
];
export const UserStatus = ["ACTIVE", "SUSPENDED", "DELETED"];
export const PlaceType = ["video", "image", "location", "text"];

const PostSchema = new Schema({
  type: {
    type: String,
    enum: PostType,
    default: "text",
  },
  user: { type: Types.ObjectId, ref: "User", required: true },
  title: String,
  content: String,
  images: [String],
  video: String,
  tags: [String],
  city: String,
  area: String,
  price: Number,
  condition: String,
  expiresAt: Date,
  eventDate: Date,
  place: {
    name: String,
    type: { type: String, enum: PlaceType },
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

const Post = model("Post", PostSchema);
export default Post;
