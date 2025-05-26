import React, { useEffect, useState } from "react";
import { IoCheckmarkCircle, IoCloseCircle } from "react-icons/io5";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import cover from "../../assets/images/bookcover2.png";
import axios from "../../utils/axios";
import { useDispatch, useSelector } from "react-redux";
import { setBooks, addFavorite, removeFavorite } from "../../store/bookSlice";
import { setBorrows, addBorrow, updateBorrow } from "../../store/borrowSlice";
import { toast } from "sonner";

const Search = () => {
  const dispatch = useDispatch();
  const books = useSelector((state) => state.books.all);
  const favorites = useSelector((state) => state.books.favorites);
  const user = useSelector((state) => state.auth.user);
  const borrows = useSelector((state) => state.borrows.all);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedBook, setSelectedBook] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [borrowId, setBorrowId] = useState(null);
  const [borrowLoading, setBorrowLoading] = useState(false);
  const [currentBorrow, setCurrentBorrow] = useState(null);

  // Fetch books and save to redux
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await axios.get("/books");
        dispatch(setBooks(res.data));
      } catch (err) {
        setError(err.message || "Failed to fetch books");
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, [dispatch]);

  // In Home.jsx or a top-level component (App.jsx), fetch borrows for the user:
  useEffect(() => {
    const fetchBorrows = async () => {
      try {
        const res = await axios.get("/borrows");
        dispatch(setBorrows(res.data));
      } catch {}
    };
    if (user) fetchBorrows();
  }, [user, dispatch]);

  const toggleLove = (bookId) => {
    if (favorites.includes(bookId)) {
      dispatch(removeFavorite(bookId));
    } else {
      dispatch(addFavorite(bookId));
    }
  };

  const openPreview = (book) => {
    setSelectedBook(book);
    const borrow = borrows.find((b) => {
      const borrowObj = b.borrow ? b.borrow : b;
      return (
        borrowObj.book === (book._id || book.id) &&
        !b.returned &&
        borrowObj.status !== "returned" &&
        (b.user === user?.id || b.user?._id === user?.id)
      );
    });
    // Always set the unwrapped borrow object
    setCurrentBorrow(borrow ? (borrow.borrow ? borrow.borrow : borrow) : null);
  };
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

  const handleBorrow = async (bookId) => {
    setBorrowLoading(true);
    try {
      const res = await axios.post(`/borrows/${bookId}`);
      toast.success("Book borrowed!");
      dispatch(addBorrow(res.data));
      setCurrentBorrow(res.data); // Update currentBorrow
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to borrow book");
    } finally {
      setBorrowLoading(false);
    }
  };

  const handleReturn = async (borrowId) => {
    setBorrowLoading(true);
    try {
      const res = await axios.post(`/borrows/return/${borrowId}`);
      toast.success("Book returned!");
      dispatch(updateBorrow(res.data));
      setCurrentBorrow(res.data); // Update currentBorrow
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to return book");
    } finally {
      setBorrowLoading(false);
    }
  };

  if (loading) return <p className="text-center mt-10">Loading books...</p>;
  if (error)
    return <p className="text-center mt-10 text-red-600">Error: {error}</p>;

  // List of all possible formats
  const allFormats = ["ebook", "hardcopy", "audio"];

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

        {filteredBooks.length === 0 ? (
          <div className="text-center text-red-600 py-8">
            No books found for your search. Please try another keyword.
          </div>
        ) : (
          filteredBooks.map((book, index) => {
            const bookId = book._id || `book-${_id}`;
            const loved = favorites.includes(bookId);

            return (
              <div
                key={bookId}
                className="h-20 bg-white grid grid-cols-[3fr_1fr_1fr_1fr_1fr_1fr] items-center border border-gray-200 rounded-lg px-4 hide-scrollbar hover:shadow-md transition-all duration-200"
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
                          {format
                            .charAt(0)
                            .toUpperCase()
                            .concat(
                              format
                                .slice(1)
                                .replace("ebook", "E-book")
                                .replace("hardcopy", "Hardcopy")
                                .replace("audio", "Audio")
                            )}
                        </p>
                      </div>
                    );
                  })}
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
                      loved
                        ? "text-red-600"
                        : "text-gray-400 hover:text-red-600"
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
          })
        )}
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

            <div className="mt-6 flex gap-4">
              {!currentBorrow ? (
                // User has never borrowed this book
                <button
                  className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-700 disabled:opacity-50"
                  disabled={borrowLoading}
                  onClick={() =>
                    handleBorrow(selectedBook._id || selectedBook.id)
                  }
                >
                  {borrowLoading ? "Borrowing..." : "Borrow"}
                </button>
              ) : !currentBorrow.returned ? (
                // User has borrowed and not returned: show "Return Book"
                <button
                  className="bg-orange-600 text-white px-4 py-2 rounded-md text-sm hover:bg-orange-700 disabled:opacity-50"
                  disabled={borrowLoading}
                  onClick={() => handleReturn(currentBorrow._id)}
                >
                  {borrowLoading ? "Returning..." : "Return Book"}
                </button>
              ) : (
                // User has borrowed and returned: show "Returned"
                <button
                  className="bg-green-600 text-white px-4 py-2 rounded-md text-sm disabled:opacity-50"
                  disabled
                >
                  Returned
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Search;
