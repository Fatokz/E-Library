import mongoose, { Document, Schema } from "mongoose";
import { IBook } from "../types/book";

const bookSchema = new Schema<IBook>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    author: { type: String, required: true },
    category: { type: String, required: true },
    pages: { type: Number, required: true },
    publishedDate: { type: String, required: true },
    availability: {
      type: String,
      enum: ["hardcopy", "ebook", "audio"],
      required: true,
    },
    isPaid: { type: Boolean, required: true },
    price: { type: Number },
    status: {
      type: String,
      enum: ["borrowable", "not-borrowable"],
      required: true,
    },
    isInShelf: { type: Boolean },
    rating: { type: Number, default: 0 },
    reviewCount: { type: Number, default: 0 },
    reviews: [{ type: Schema.Types.ObjectId, ref: "Review" }],
    comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
    createdBy: { type: Schema.Types.ObjectId, ref: "Admin", required: true },
  },
  { timestamps: true }
);

const Book = mongoose.model<IBook>("Book", bookSchema);
export default Book;
