import mongoose, { Document, Schema } from "mongoose";

export interface IComment extends Document {
  user: mongoose.Types.ObjectId;
  book: mongoose.Types.ObjectId;
  comment: string;
}

const commentSchema = new Schema<IComment>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    book: { type: Schema.Types.ObjectId, ref: "Book", required: true },
    comment: { type: String, required: true },
  },
  { timestamps: true }
);

const Comment = mongoose.model<IComment>("Comment", commentSchema);
export default Comment;
