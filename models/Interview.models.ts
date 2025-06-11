import mongoose , {Schema} from "mongoose";

const InterviewSchema = new Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  mode: { type: String, enum: ["video", "audio", "text"], required: true },
  questions: [{ type: String }],
  answers: [{ type: String }],
  date: { type: Date, default: Date.now },
  summary: { type: String }, // AI generated summary
  report: { type: mongoose.Schema.Types.ObjectId, ref: "InterviewReport" },
  suggestions: { type: mongoose.Schema.Types.ObjectId, ref: "Suggestion" },
});

 const Interview = mongoose.model('Interview' , InterviewSchema);

 export default Interview;

