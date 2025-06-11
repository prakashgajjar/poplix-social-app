import mongoose , {Schema} from "mongoose";

const InterviewReportSchema = new Schema({
  interview: { type: mongoose.Schema.Types.ObjectId, ref: "Interview" },
  score: { type: Number },
  toneAnalysis: { type: String },
  confidenceLevel: { type: String },
  overallFeedback: { type: String },
});

const InterviewReport = mongoose.model('InterviewReport' , InterviewReportSchema);
export default InterviewReport;