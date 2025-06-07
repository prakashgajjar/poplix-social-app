import mongoose from 'mongoose';
const { Schema, model, models, Types } = mongoose;

const UserSchema = new Schema({
  username: { type: String, unique: true, required: true, trim: true },
  email: { type: String, unique: true, required: true, lowercase: true, index: true },
  password: { type: String, required: true },
  otp: { type: String, required: true },

  avatar: String,
  banner: String,
  bio: String,
  phone: { type: String, unique: true, sparse: true },
  website: String,
  city: String,
  area: String,
  gender: String,
  birthday: Date,

  isVerified: { type: Boolean, default: false },
  role: { type: String, enum: ['USER', 'ADMIN'], default: 'USER' },
  status: { type: String, enum: ['ACTIVE', 'SUSPENDED', 'DELETED'], default: 'ACTIVE' },

  posts: [{ type: Types.ObjectId, ref: 'Post' }],
  comments: [{ type: Types.ObjectId, ref: 'Comment' }],
  likes: [{ type: Types.ObjectId, ref: 'User' }],
  followers: [{ type: Types.ObjectId, ref: 'User' }],
  following: [{ type: Types.ObjectId, ref: 'User' }],
  blockedUsers: [{ type: Types.ObjectId, ref: 'User' }],
  blockedBy: [{ type: Types.ObjectId, ref: 'User' }],
  savedPosts: [{ type: Types.ObjectId, ref: 'Post' }],
  notifications: [{ type: Types.ObjectId, ref: 'Notification' }],
  messagesSent: [{ type: Types.ObjectId, ref: 'Message' }],
  messagesReceived: [{ type: Types.ObjectId, ref: 'Message' }],
}, { timestamps: true });

const User = models.User || model('User', UserSchema);
export default User;
