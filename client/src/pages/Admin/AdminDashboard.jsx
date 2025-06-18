import { useEffect, useState } from "react";
import axios from "../../utils/axios";
import cover from "../../assets/images/bookcover2.png";

const AdminDashboard = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch all books on mount
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await axios.get("/books");
        setBooks(res.data);
      } catch (err) {
        setBooks([]);
      } finally {
        setLoading(false);
      }
    };
    fetchBooks();
  }, []);

  // Delete book handler
  const handleDelete = async (bookId) => {
    if (!window.confirm("Are you sure you want to delete this book?")) return;
    try {
      await axios.delete(`/books/${bookId}`);
      setBooks((prev) => prev.filter((b) => b._id !== bookId));
    } catch (err) {
      alert("Failed to delete book.");
    }
  };

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

  return (
    <div className="w-full max-w-5xl mx-auto h-[85vh] px-2 py-6">
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

      <div className="w-full overflow-x-auto">
        {/* Table header for md+ screens */}
        <ul className="hidden md:grid grid-cols-5 text-sm font-medium border-b border-gray-300 pb-2">
          <li>Title</li>
          <li>Ratings</li>
          <li>Category</li>
          <li>Status</li>
          <li>Actions</li>
        </ul>

        {/* Book list */}
        <div className="flex flex-col gap-4">
          {filteredBooks.length === 0 ? (
            <div className="text-center text-red-600 py-8">
              No books found for your search. Please try another keyword.
            </div>
          ) : (
            filteredBooks.map((book) => (
              <div
                key={book._id}
                className="
    bg-white border border-gray-200 rounded-lg px-4 py-2 hover:shadow-md transition-all duration-200
    flex flex-col md:grid md:grid-cols-5 md:items-center
    md:max-h-none max-h-56 overflow-y-auto md:overflow-visible
  "
              >
                {/* Title & Author */}
                <div className="flex gap-2 items-center truncate mb-2 md:mb-0">
                  <img
                    src={book.image || book.coverUrl || cover}
                    alt={`${book.title} cover`}
                    className="w-14 h-14 rounded-lg object-cover"
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

                {/* Ratings */}
                <div className="flex justify-start md:justify-center mb-2 md:mb-0">
                  <p>
                    {typeof book.rating === "number" && !isNaN(book.rating)
                      ? book.rating
                      : "N/A"}
                  </p>
                </div>

                {/* Category */}
                <div className="truncate text-start flex flex-col justify-center mb-2 md:mb-0">
                  <h1 className="text-sm font-semibold truncate">
                    {book.categoryTitle || book.category}
                  </h1>
                  <p className="text-xs text-gray-500 truncate">
                    {book.categorySubtitle || book.subCategory}
                  </p>
                </div>

                {/* Status */}
                <div className="flex justify-start md:justify-center mb-2 md:mb-0">
                  <button className="bg-green-600 text-white px-2 py-1 cursor-not-allowed text-xs font-light rounded-md">
                    {book.status}
                  </button>
                </div>

                {/* Actions */}
                <div className="flex gap-2 justify-start md:justify-center items-center">
                  <button
                    onClick={() => handleDelete(book._id)}
                    className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 text-xs"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
