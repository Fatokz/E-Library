import mongoose, { Document, Schema } from "mongoose";

export interface IBorrow extends Document {
  user: mongoose.Types.ObjectId;
  book: mongoose.Types.ObjectId;
  borrowDate: Date;
  returnDate?: Date;
  status: "borrowed" | "returned";
}

const borrowSchema = new Schema<IBorrow>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    book: { type: Schema.Types.ObjectId, ref: "Book", required: true },
    borrowDate: { type: Date, default: Date.now },
    returnDate: { type: Date },
    status: { type: String, enum: ["borrowed", "returned"], default: "borrowed" },
  },
  { timestamps: true }
);

const Borrow = mongoose.model<IBorrow>("Borrow", borrowSchema);
export default Borrow;