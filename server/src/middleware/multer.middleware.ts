import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../utils/cloudinary";

const storage = new CloudinaryStorage({
  cloudinary,
  params: (req, file) => ({
    folder: "booksync/books",
    format: file.mimetype.split("/")[1], // or just 'jpg'
    transformation: [{ width: 500, height: 750, crop: "limit" }],
  }),
});

const upload = multer({ storage });

export default upload;
