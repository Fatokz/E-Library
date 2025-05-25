import React, { useEffect, useState } from "react";
import { IoCheckmarkCircle } from "react-icons/io5";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import cover from "../../assets/images/bookcover2.png";

const Search = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lovedBooks, setLovedBooks] = useState(new Set());
  const [selectedBook, setSelectedBook] = useState(null); // for preview modal

  useEffect(() => {
    fetch("http://localhost:8080/api/books")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch books");
        return res.json();
      })
      .then((data) => {
        setBooks(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const toggleLove = (bookId) => {
    setLovedBooks((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(bookId)) newSet.delete(bookId);
      else newSet.add(bookId);
      return newSet;
    });
  };

  const openPreview = (book) => {
    setSelectedBook(book);
  };

  const closePreview = () => {
    setSelectedBook(null);
  };

  if (loading) return <p className="text-center mt-10">Loading books...</p>;
  if (error)
    return <p className="text-center mt-10 text-red-600">Error: {error}</p>;

  return (
    <div className="w-full max-w-7xl mx-auto h-[85vh] flex flex-col gap-6 overflow-x-hidden px-4 py-6 hide-scrollbar">
      {/* Header */}
      <ul className="w-[80%] grid grid-cols-[3.5fr_1fr_1fr_1fr_1fr_1fr] text-sm font-medium border-b border-gray-300 pb-2">
        <li>Title</li>
        <li>Ratings</li>
        <li>Category</li>
        <li>Availability</li>
        <li>Status</li>
        <li>Actions</li>
      </ul>

      {/* Book list */}
      {books.map((book, index) => {
        const loved = lovedBooks.has(book.id);

        return (
          <div
            key={book.id || index}
            className="w-[80%] h-20 bg-white grid grid-cols-[3fr_1fr_1fr_1fr_1fr_1fr] items-center border border-gray-200 rounded-lg px-4"
          >
            <div className="flex gap-2 items-center truncate">
              <img
                src={book.coverUrl || cover}
                alt={`${book.title} cover`}
                className="w-16 h-16 rounded-lg object-cover"
              />
              <div className="truncate">
                <h1 className="text-sm font-semibold truncate">{book.title}</h1>
                <p className="text-xs text-gray-500 truncate">{book.author}</p>
              </div>
            </div>

            <div className="flex justify-center">
              <p>{book.rating}</p>
            </div>

            <div className="truncate flex flex-col justify-center">
              <h1 className="text-sm font-semibold truncate">
                {book.categoryTitle || book.category}
              </h1>
              <p className="text-xs text-gray-500 truncate">
                {book.categorySubtitle || book.subCategory}
              </p>
            </div>

            <div className="flex ml-5 flex-col truncate items-start gap-1 text-xs">
              {Array.isArray(book.availability) ? (
                book.availability.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-1">
                    <IoCheckmarkCircle className="text-green-600" />
                    <p>{item}</p>
                  </div>
                ))
              ) : (
                <p className="text-gray-400 italic">No availability info</p>
              )}
            </div>

            <div className="flex justify-center">
              <button className="bg-green-600 text-white px-2 py-1 cursor-pointer text-xs font-light rounded-md">
                {book.status}
              </button>
            </div>

            {/* Actions */}
            <div className="flex gap-2 justify-center items-center">
              <button
                aria-label={loved ? "Unlove this book" : "Love this book"}
                className={`text-xl cursor-pointer ${
                  loved ? "text-red-600" : "text-gray-400 hover:text-red-600"
                }`}
                onClick={() => toggleLove(book.id)}
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

      {/* Preview Modal */}
      {selectedBook && (
        <div
          onClick={closePreview}
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-lg p-6 max-w-md w-full relative"
          >
            <button
              onClick={closePreview}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-900"
              aria-label="Close preview"
            >
              ✖
            </button>
            <h2 className="text-xl font-bold mb-4">{selectedBook.title}</h2>
            <img
              src={selectedBook.coverUrl || cover}
              alt={selectedBook.title}
              className="w-32 h-32 rounded-lg object-cover mb-4"
            />
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
            <div className="mt-2">
              <strong>Availability:</strong>
              <ul className="list-disc list-inside">
                {Array.isArray(selectedBook.availability)
                  ? selectedBook.availability.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))
                  : "No availability info"}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Search;
