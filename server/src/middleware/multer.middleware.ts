import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../utils/cloudinary";
import path from "path";

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: (req, file) => ({
    folder: 'booksync/books',
    format: file.mimetype.split("/")[1], // or file.mimetype.split('/')[1] for dynamic
    public_id: `${file.fieldname}-${Date.now()}`, // or your logic here
  }),
});


const upload = multer({ storage: storage });

export default upload;