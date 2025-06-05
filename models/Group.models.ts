import { Schema, model, Types } from 'mongoose';

const GroupSchema = new Schema({
  name: String,
  slug: { type: String, unique: true },
  city: String,
  category: String,
  description: String,
  posts: [{ type: Types.ObjectId, ref: 'Post' }],
  members: [{ type: Types.ObjectId, ref: 'User' }],
  createdAt: { type: Date, default: Date.now },
});

const Group = model('Group', GroupSchema);
export default Group;

