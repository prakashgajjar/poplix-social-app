import { Schema, model, Types } from 'mongoose';

const CommentSchema = new Schema({
  content: String,
  post: { type: Types.ObjectId, ref: 'Post', required: true },
  user: { type: Types.ObjectId, ref: 'User', required: true },
  createdAt: { type: Date, default: Date.now },
});
const Comment = model('Comment', CommentSchema);
export default Comment;