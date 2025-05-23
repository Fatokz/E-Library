import mongoose, { Document, Schema } from "mongoose";

export interface ITodo extends Document {
  user: mongoose.Types.ObjectId;
  title: string;
  completed: boolean;
  targetCompletedDate: Date;
}

const todoSchema = new Schema<ITodo>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true },
    completed: { type: Boolean, default: false },
    targetCompletedDate: { type: Date, required: true },
  },
  { timestamps: true }
);

const Todo = mongoose.model<ITodo>("Todo", todoSchema);
export default Todo;