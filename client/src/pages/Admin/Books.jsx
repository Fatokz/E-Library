import React, { useState } from "react";
import axios from "../../utils/axios";
import { toast } from "sonner";
import Loader from "../../components/General/Loader";
import { useDispatch } from "react-redux";
import { setBooks } from "../../store/bookSlice";

const initialState = {
  title: "",
  description: "",
  author: "",
  category: "",
  pages: "",
  publishedDate: "",
  availability: "hardcopy",
  isPaid: false,
  price: "",
  status: "borrowable",
  isInShelf: false,
  rating: "",
  reviewCount: "",
};

const Books = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState(initialState);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === "file") {
      setFormData({
        ...formData,
        image: files[0],
      });
      setImagePreview(files[0] ? URL.createObjectURL(files[0]) : null);
    } else if (type === "checkbox") {
      setFormData({
        ...formData,
        [name]: checked,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  // Helper to check if all required fields are filled
  const isFormValid = () => {
    const requiredFields = [
      "title",
      "description",
      "author",
      "category",
      "pages",
      "publishedDate",
      "availability",
      "status",
      "rating",
      "reviewCount",
    ];
    for (let field of requiredFields) {
      if (
        !formData[field] ||
        (typeof formData[field] === "string" && formData[field].trim() === "")
      ) {
        return false;
      }
    }
    if (formData.isPaid && (!formData.price || formData.price === "")) {
      return false;
    }
    if (!formData.image) {
      return false;
    }
    // Ebooks cannot be borrowable
    if (formData.availability === "ebook" && formData.status === "borrowable") {
      return false;
    }
    return true;
  };

  const isEbookBorrowable =
    formData.availability === "ebook" && formData.status === "borrowable";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (key === "image" && value) {
        data.append("image", value);
      } else {
        data.append(key, value);
      }
    });

    try {
      await axios.post("/admin/add-book", data);
      toast.success("Book added!");
      // Refetch books and update Redux
      const res = await axios.get("/books");
      dispatch(setBooks(res.data));
      setFormData(initialState);
      setImagePreview(null);
      document.getElementById("book-image-input").value = "";
    } catch (error) {
      toast.error("Failed to add book");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full h-[85vh] overflow-y-scroll hide-scrollbar max-w-7xl mx-auto p-6 bg-white shadow-md rounded-lg space-y-6"
    >
      <h2 className="text-2xl font-semibold text-primary">Add a New Book</h2>

      {/* Image File */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Book Image
        </label>
        <input
          id="book-image-input"
          type="file"
          name="image"
          accept="image/*"
          onChange={handleChange}
          className="w-full mt-1 px-3 py-2 border rounded-lg focus:ring-primary focus:border-primary"
        />
        {imagePreview && (
          <img src={imagePreview} alt="Preview" className="mt-2 h-24 rounded" />
        )}
      </div>

      {/* Title */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Title</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className="w-full mt-1 px-3 py-2 border rounded-lg focus:ring-primary focus:border-primary"
          required
        />
      </div>

      {/* Description */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Description
        </label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows="3"
          className="w-full mt-1 px-3 py-2 border rounded-lg focus:ring-primary focus:border-primary"
          required
        />
      </div>

      {/* Author */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Author
        </label>
        <input
          type="text"
          name="author"
          value={formData.author}
          onChange={handleChange}
          className="w-full mt-1 px-3 py-2 border rounded-lg focus:ring-primary focus:border-primary"
          required
        />
      </div>

      {/* Category */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Category
        </label>
        <input
          type="text"
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="w-full mt-1 px-3 py-2 border rounded-lg focus:ring-primary focus:border-primary"
          required
        />
      </div>

      {/* Pages */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Pages</label>
        <input
          type="number"
          name="pages"
          value={formData.pages}
          onChange={handleChange}
          className="w-full mt-1 px-3 py-2 border rounded-lg focus:ring-primary focus:border-primary"
          required
        />
      </div>

      {/* Published Date */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Published Date
        </label>
        <input
          type="date"
          name="publishedDate"
          value={formData.publishedDate}
          onChange={handleChange}
          className="w-full mt-1 px-3 py-2 border rounded-lg focus:ring-primary focus:border-primary"
          required
        />
      </div>

      {/* Availability */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Availability
        </label>
        <select
          name="availability"
          value={formData.availability}
          onChange={handleChange}
          className="w-full mt-1 px-3 py-2 border rounded-lg focus:ring-primary focus:border-primary"
          required
        >
          <option value="hardcopy">Hardcopy</option>
          <option value="ebook">Ebook</option>
          <option value="audio">Audio</option>
        </select>
      </div>

      {/* Is Paid */}
      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          name="isPaid"
          checked={formData.isPaid}
          onChange={handleChange}
          className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
        />
        <label className="text-sm text-gray-700">Is Paid</label>
      </div>

      {/* Price */}
      {formData.isPaid && (
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Price
          </label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="w-full mt-1 px-3 py-2 border rounded-lg focus:ring-primary focus:border-primary"
            placeholder="₦0.00"
            required={formData.isPaid}
          />
        </div>
      )}

      {/* Status */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Status
        </label>
        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="w-full mt-1 px-3 py-2 border rounded-lg focus:ring-primary focus:border-primary"
          required
        >
          <option
            value="borrowable"
            disabled={formData.availability === "ebook"}
          >
            Borrowable
          </option>
          <option value="not-borrowable">Not Borrowable</option>
        </select>
        {formData.availability === "ebook" && (
          <p className="text-xs text-red-500 mt-1">
            Ebooks cannot be borrowable.
          </p>
        )}
      </div>

      {/* Is In Shelf */}
      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          name="isInShelf"
          checked={formData.isInShelf}
          onChange={handleChange}
          className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
        />
        <label className="text-sm text-gray-700">Is in Shelf</label>
      </div>

      {/* Rating */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Rating
        </label>
        <input
          type="number"
          name="rating"
          value={formData.rating}
          onChange={handleChange}
          className="w-full mt-1 px-3 py-2 border rounded-lg focus:ring-primary focus:border-primary"
          min="0"
          max="5"
          step="0.1"
          required
        />
      </div>

      {/* Review Count */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Review Count
        </label>
        <input
          type="number"
          name="reviewCount"
          value={formData.reviewCount}
          onChange={handleChange}
          className="w-full mt-1 px-3 py-2 border rounded-lg focus:ring-primary focus:border-primary"
          min="0"
          required
        />
      </div>

      <button
        type="submit"
        className={`w-full py-2 px-4 cursor-pointer bg-primary text-white font-semibold rounded-lg hover:bg-[#EB5232] transition flex items-center justify-center ${
          !isFormValid() || loading ? "opacity-50" : "opacity-100"
        }`}
        disabled={!isFormValid() || loading}
      >
        {loading ? <Loader /> : "Add Book"}
      </button>
    </form>
  );
};

export default Books;
