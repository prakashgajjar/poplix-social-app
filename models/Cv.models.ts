import mongoose , {Schema} from 'mongoose';

const CvSchema = new Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  content: { type: String }, // HTML/Markdown format
  generatedAt: { type: Date, default: Date.now },
});

const Cv = mongoose.model('Cv' , CvSchema);

export default Cv