import { useState } from "react";
import { useSelector } from "react-redux";
import { IoCheckmarkCircle, IoCloseCircle } from "react-icons/io5";
import cover from "../../assets/images/bookcover2.png";

const Shelf = () => {
  const books = useSelector((state) => state.books.all);
  const favorites = useSelector((state) => state.books.favorites);

  const favoriteBooks = books.filter((book) =>
    favorites.includes(book._id || book.id)
  );

  const [selectedBook, setSelectedBook] = useState(null);

  // List of all possible formats
  const allFormats = ["ebook", "hardcopy", "audio"];

  if (favoriteBooks.length === 0) {
    return (
      <div className="w-full max-w-7xl mx-auto h-[85vh] flex items-center justify-center text-gray-500">
        <p>No favorite books yet.</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto h-[85vh] overflow-x-auto px-4 py-6">
      <h2 className="text-2xl font-semibold mb-6">My Shelf</h2>
      <div className="min-w-[900px] flex flex-col gap-6">
        <ul className="grid grid-cols-[3.5fr_1fr_1fr_1fr_1fr] text-sm font-medium border-b border-gray-300 pb-2">
          <li>Title</li>
          <li>Ratings</li>
          <li>Category</li>
          <li>Availability</li>
          <li>Status</li>
        </ul>

        {favoriteBooks.map((book) => {
          const bookId = book._id || book.id;

          return (
            <div
              key={bookId}
              className="h-20 bg-white grid grid-cols-[3fr_1fr_1fr_1fr_1fr] items-center border border-gray-200 rounded-lg px-4 hide-scrollbar hover:shadow-md transition-all duration-200"
            >
              <div className="flex gap-2 items-center truncate">
                <img
                  src={book.image || book.coverUrl || cover}
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

              {/* Availability section */}
              <div className="flex ml-5 flex-col truncate items-start gap-1 text-xs hide-scrollbar">
                {allFormats.map((format) => {
                  const available = Array.isArray(book.availability)
                    ? book.availability
                        .map((a) => a.toLowerCase())
                        .includes(format)
                    : (book.availability || "").toLowerCase() === format;
                  return (
                    <div key={format} className="flex items-center gap-1">
                      {available ? (
                        <IoCheckmarkCircle className="text-green-600" />
                      ) : (
                        <IoCloseCircle className="text-red-600" />
                      )}
                      <p
                        className={
                          available ? "text-green-700" : "text-red-700"
                        }
                      >
                        {format.charAt(0).toUpperCase() +
                          format
                            .slice(1)
                            .replace("ebook", "E-book")
                            .replace("hardcopy", "Hardcopy")
                            .replace("audio", "Audio")}
                      </p>
                    </div>
                  );
                })}
              </div>

              <div className="flex justify-center">
                <button
                  className="bg-green-600 text-white px-2 py-1 cursor-pointer text-xs font-light rounded-md"
                  onClick={() => setSelectedBook(book)}
                >
                  {book.status}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Book Preview Modal */}
      {selectedBook && (
        <div
          onClick={() => setSelectedBook(null)}
          className="fixed inset-0 bg-white/30 backdrop-blur-lg flex justify-center items-center z-50 px-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative bg-white rounded-2xl shadow-2xl max-w-lg w-full p-6 border border-gray-200"
          >
            <button
              onClick={() => setSelectedBook(null)}
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
                src={selectedBook.image || selectedBook.coverUrl || cover}
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
                <p>
                  <strong>Description:</strong>{" "}
                  {selectedBook.description || "No description available"}
                </p>
                <p>
                  <strong>Pages:</strong> {selectedBook.pages || "N/A"}
                </p>
                <p>
                  <strong>Rating:</strong> {selectedBook.rating || "N/A"}
                </p>
              </div>
            </div>

            <div className="mt-4">
              <p className="font-semibold text-sm mb-2 text-gray-800">
                Availability:
              </p>
              <div className="flex gap-2 flex-wrap">
                {allFormats.map((format) => {
                  const available = Array.isArray(selectedBook.availability)
                    ? selectedBook.availability
                        .map((a) => a.toLowerCase())
                        .includes(format)
                    : (selectedBook.availability || "").toLowerCase() ===
                      format;
                  return (
                    <span
                      key={format}
                      className={
                        (available
                          ? "bg-green-100 text-green-800 "
                          : "bg-red-100 text-red-800 ") +
                        "flex items-center gap-1 text-xs font-medium px-3 py-1 rounded-full"
                      }
                    >
                      {available ? (
                        <IoCheckmarkCircle className="text-green-600" />
                      ) : (
                        <IoCloseCircle className="text-red-600" />
                      )}
                      {format.charAt(0).toUpperCase() +
                        format
                          .slice(1)
                          .replace("ebook", "E-book")
                          .replace("hardcopy", "Hardcopy")
                          .replace("audio", "Audio")}
                    </span>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Shelf;
