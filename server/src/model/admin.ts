import mongoose, { Document, Schema } from "mongoose";

export interface IAdmin extends Document {
  name: string;
  email: string;
  password: string;
}

const adminSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  },
  password: {
    type: String,
    required: true,
  },
});

const Admin = mongoose.model<IAdmin>("Admin", adminSchema);

export default Admin;