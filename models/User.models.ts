import mongoose from "mongoose";
const { Schema, model, models, Types } = mongoose;

const UserSchema = new Schema(
  {
    username: { type: String, unique: true, required: true, trim: true },
    profileName : {type:String},
    email: {
      type: String,
      unique: true,
      required: true,
      lowercase: true,
      index: true,
    },
    password: { type: String, required: true },
    otp: {
      type: String,
      required: false,
      default: null,
    },

    avatar: {
      type: String,
      default:
        "https://res.cloudinary.com/dsndcjfwh/image/upload/v1749358852/user_irazfm.png",
    },
    banner: {
      type: String,
      default:
        "https://res.cloudinary.com/dsndcjfwh/image/upload/v1749621169/2_wojlgk.jpg",
    },
    bio: String,
    phone: { type: String, unique: true, sparse: true },
    website: String,
    gender: String,
    birthday: Date,

    isVerified: { type: Boolean, default: false },
    role: { type: String, enum: ["USER", "ADMIN"], default: "USER" },
    status: {
      type: String,
      enum: ["ACTIVE", "SUSPENDED", "DELETED"],
      default: "ACTIVE",
    },

    posts: [{ type: Types.ObjectId, ref: "Post" }],
    comments: [{ type: Types.ObjectId, ref: "Comment" }],
    likes: [{ type: Types.ObjectId, ref: "User" }],
    followers: [{ type: Types.ObjectId, ref: "User" }],
    following: [{ type: Types.ObjectId, ref: "User" }],
    blockedUsers: [{ type: Types.ObjectId, ref: "User" }],
    blockedBy: [{ type: Types.ObjectId, ref: "User" }],
    savedPosts: [{ type: Types.ObjectId, ref: "Post" }],
    notifications: [{ type: Types.ObjectId, ref: "Notification" }],
    messagesSent: [{ type: Types.ObjectId, ref: "Message" }],
    messagesReceived: [{ type: Types.ObjectId, ref: "Message" }],

    interviewHistory: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Interview" },
    ],
    cvGenerated: { type: Boolean, default: false },
    portfolioGenerated: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const User = models.User || model("User", UserSchema);
export default User;
