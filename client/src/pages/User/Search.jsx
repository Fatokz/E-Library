import React, { useEffect, useState } from "react";
import { IoCheckmarkCircle } from "react-icons/io5";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import cover from "../../assets/images/bookcover2.png";
import axios from "../../utils/axios";

const Search = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lovedBooks, setLovedBooks] = useState(new Set());
  const [selectedBook, setSelectedBook] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await axios.get("/books");
        setBooks(res.data);
      } catch (err) {
        setError(err.message || "Failed to fetch books");
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  const toggleLove = (bookId) => {
    setLovedBooks((prev) => {
      const newSet = new Set(prev);
      newSet.has(bookId) ? newSet.delete(bookId) : newSet.add(bookId);
      return newSet;
    });
  };

  const openPreview = (book) => setSelectedBook(book);
  const closePreview = () => setSelectedBook(null);

  const filteredBooks = books.filter((book) => {
    const query = searchQuery.toLowerCase();
    return (
      book.title?.toLowerCase().includes(query) ||
      book.author?.toLowerCase().includes(query) ||
      book.category?.toLowerCase().includes(query) ||
      book.categoryTitle?.toLowerCase().includes(query)
    );
  });

  if (loading) return <p className="text-center mt-10">Loading books...</p>;
  if (error) return <p className="text-center mt-10 text-red-600">Error: {error}</p>;

  return (
    <div className="w-full max-w-7xl mx-auto h-[85vh] overflow-x-auto px-4 py-6">
      {/* 🔍 Search Input */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by title, author, or category..."
          className="w-full max-w-md px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="min-w-[900px] flex flex-col gap-6">
        <ul className="grid grid-cols-[3.5fr_1fr_1fr_1fr_1fr_1fr] text-sm font-medium border-b border-gray-300 pb-2">
          <li>Title</li>
          <li>Ratings</li>
          <li>Category</li>
          <li>Availability</li>
          <li>Status</li>
          <li>Actions</li>
        </ul>

        {filteredBooks.map((book, index) => {
          const bookId = book.id || `book-${index}`;
          const loved = lovedBooks.has(bookId);

          return (
            <div
              key={bookId}
              className="h-20 bg-white grid grid-cols-[3fr_1fr_1fr_1fr_1fr_1fr] items-center border border-gray-200 rounded-lg px-4"
            >
              <div className="flex gap-2 items-center truncate">
                <img
                  src={book.coverUrl || cover}
                  alt={`${book.title} cover`}
                  className="w-16 h-16 rounded-lg object-cover"
                />
                <div className="truncate">
                  <h1 className="text-sm font-semibold truncate">
                    {book.title}
                  </h1>
                  <p className="text-xs text-gray-500 truncate">
                    {book.author}
                  </p>
                </div>
              </div>

              <div className="flex justify-center">
                <p>{book.rating}</p>
              </div>

              <div className="truncate flex flex-col justify-center">
                <h1 className="text-sm ml-8 font-semibold truncate">
                  {book.categoryTitle || book.category}
                </h1>
                <p className="text-xs text-gray-500 truncate">
                  {book.categorySubtitle || book.subCategory}
                </p>
              </div>

              <div className="flex ml-5 flex-col truncate items-start gap-1 text-xs">
                {(Array.isArray(book.availability) &&
                book.availability.length > 0
                  ? book.availability
                  : ["E-book", "Hard Copy"]
                ).map((item, idx) => (
                  <div key={idx} className="flex items-center gap-1">
                    <IoCheckmarkCircle className="text-green-600" />
                    <p>{item}</p>
                  </div>
                ))}
              </div>

              <div className="flex justify-center">
                <button className="bg-green-600 text-white px-2 py-1 cursor-pointer text-xs font-light rounded-md">
                  {book.status}
                </button>
              </div>

              <div className="flex gap-2 justify-center items-center">
                <button
                  aria-label={loved ? "Unlove this book" : "Love this book"}
                  className={`text-xl cursor-pointer ${
                    loved ? "text-red-600" : "text-gray-400 hover:text-red-600"
                  }`}
                  onClick={() => toggleLove(bookId)}
                >
                  {loved ? <AiFillHeart /> : <AiOutlineHeart />}
                </button>

                <button
                  className="bg-blue-600 text-white px-3 py-1 rounded-md text-xs hover:bg-blue-700"
                  onClick={() => openPreview(book)}
                >
                  Preview
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* 📖 Book Preview Modal */}
      {selectedBook && (
        <div
          onClick={closePreview}
          className="fixed inset-0  bg-white/30 backdrop-blur-lg flex justify-center items-center z-50 px-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative bg-white rounded-2xl shadow-2xl max-w-lg w-full p-6 border border-gray-200"
          >
            <button
              onClick={closePreview}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 text-2xl"
              aria-label="Close preview"
            >
              &times;
            </button>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              {selectedBook.title}
            </h2>

            <div className="flex flex-col sm:flex-row gap-4 items-start">
              <img
                src={selectedBook.coverUrl || cover}
                alt={selectedBook.title}
                className="w-32 h-40 object-cover rounded-md shadow"
              />
              <div className="text-sm text-gray-700 flex-1 space-y-1">
                <p>
                  <strong>Author:</strong> {selectedBook.author}
                </p>
                <p>
                  <strong>Rating:</strong> {selectedBook.rating}
                </p>
                <p>
                  <strong>Category:</strong>{" "}
                  {selectedBook.categoryTitle || selectedBook.category}
                </p>
                <p>
                  <strong>Subcategory:</strong>{" "}
                  {selectedBook.categorySubtitle || selectedBook.subCategory}
                </p>
                <p>
                  <strong>Status:</strong> {selectedBook.status}
                </p>
              </div>
            </div>

            <div className="mt-4">
              <p className="font-semibold text-sm mb-2 text-gray-800">
                Availability:
              </p>
              <div className="flex gap-2 flex-wrap">
                {(Array.isArray(selectedBook.availability) &&
                selectedBook.availability.length > 0
                  ? selectedBook.availability
                  : ["E-book", "Hard Copy"]
                ).map((item, idx) => (
                  <span
                    key={idx}
                    className="bg-green-100 text-green-800 text-xs font-medium px-3 py-1 rounded-full"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Search;
