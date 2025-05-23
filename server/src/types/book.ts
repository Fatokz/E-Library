import mongoose from "mongoose";

export interface IBook extends Document {
  title: string;
  description: string;
  image: string;
  author: string;
  category: string;
  pages: number;
  publishedDate: string;
  availability: "hardcopy" | "ebook" | "audio";
  isPaid: boolean;
  price?: number;
  status: "borrowable" | "not-borrowable";
  isInShelf?: boolean;
  rating: number;
  reviewCount: number;
  reviews: mongoose.Types.ObjectId[];
  comments: mongoose.Types.ObjectId[];
  createdBy: mongoose.Types.ObjectId;
}
