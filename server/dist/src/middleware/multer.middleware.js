"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer"));
const multer_storage_cloudinary_1 = require("multer-storage-cloudinary");
const cloudinary_1 = __importDefault(require("../utils/cloudinary"));
const storage = new multer_storage_cloudinary_1.CloudinaryStorage({
    cloudinary: cloudinary_1.default,
    params: (req, file) => ({
        folder: 'booksync/books',
        format: file.mimetype.split("/")[1], // or file.mimetype.split('/')[1] for dynamic
        public_id: `${file.fieldname}-${Date.now()}`, // or your logic here
    }),
});
const upload = (0, multer_1.default)({ storage: storage });
exports.default = upload;
