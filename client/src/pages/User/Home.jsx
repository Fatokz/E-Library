import { useEffect, useState, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateBorrow } from "../../store/borrowSlice";
import { setBooks } from "../../store/bookSlice";
import { toast } from "sonner";
import cover from "../../assets/images/bookcover2.png";
import js from "../../assets/images/js.png";
import harry from "../../assets/images/harry.png";
import richdad from "../../assets/images/richdad.png";
import react from "../../assets/images/react.png";
import learn from "../../assets/images/learn.png";
import axios from "../../utils/axios";
import { useNavigate } from "react-router-dom";
import { logout } from "../../store/authSlice";

const Home = () => {
  const [greeting, setGreeting] = useState("");
  const [loading, setLoading] = useState(true);
  const user = useSelector((state) => state.auth.user);
  const userBorrows = useSelector((state) => state.borrows.all);
  const booksList = useSelector((state) => state.books.all);
  const myBorrows = useMemo(
    () =>
      userBorrows.filter((b) => {
        const borrowObj = b.borrow ? b.borrow : b;
        // Check both returned and status
        const isReturned =
          b.returned ?? borrowObj.returned ?? borrowObj.status === "returned";
        return (b.user === user?.id || b.user?._id === user?.id) && !isReturned;
      }),
    [userBorrows, user]
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // Get all users from Redux or localStorage
  const users =
    useSelector((state) => state.users?.all || []) ||
    JSON.parse(localStorage.getItem("users")) ||
    [];

  useEffect(() => {
    const getGreeting = () => {
      const hour = new Date().toLocaleString("en-US", {
        timeZone: "Africa/Lagos",
        hour: "2-digit",
        hour12: false,
      });
      const hourInt = parseInt(hour, 10);
      if (hourInt >= 5 && hourInt < 12) return "Good morning";
      if (hourInt >= 12 && hourInt < 17) return "Good afternoon";
      if (hourInt >= 17 && hourInt < 24) return "Good evening";
      return "Good morning"; // 0-4 AM
    };

    setGreeting(getGreeting());
    const interval = setInterval(() => setGreeting(getGreeting()), 3600000);
    return () => clearInterval(interval);
  }, []);

  // Fetch books from backend and update Redux
  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true);
      try {
        const res = await axios.get("/books");
        dispatch(setBooks(res.data));
      } catch (err) {
        dispatch(setBooks([]));
      } finally {
        setLoading(false);
      }
    };
    fetchBooks();
  }, [dispatch]);

  // Check if user still exists
  useEffect(() => {
    if (user && !users.some((u) => u._id === user.id || u.id === user.id)) {
      dispatch(logout());
      navigate("/signin");
    }
  }, [user, users, dispatch, navigate]);

  // Use books from Redux
  const books = booksList;

  const handleReturn = async (borrowId) => {
    try {
      const res = await axios.post(`/borrows/return/${borrowId}`);
      dispatch(updateBorrow(res.data)); // Update Redux
      toast.success("Book returned!");
    } catch (err) {
      toast.error("Failed to return book.");
    }
  };

  const getBookById = (id) =>
    booksList.find((b) => b._id === id || b.id === id);

  console.log("myBorrows", myBorrows);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        <span className="ml-4 text-lg font-semibold">Loading books...</span>
      </div>
    );
  }

  return (
    <div className="w-[100%] max-w-7xl mx-auto h-[85vh]  flex  flex-col gap-6 overflow-x-hidden px-4 py-6 hide-scrollbar">
      {/* Top Section */}
      <div className="flex flex-col lg:flex-row gap-4 w-full">
        {/* Quote Box */}
        <div className="h-40 w-full lg:w-1/2 text-white rounded-lg p-4 bg-gradient-to-r from-[#833AB4] to-[#EB5231]">
          <div className="flex flex-col gap-3 h-full justify-center">
            <h3 className="text-lg font-semibold">Today's Quote</h3>
            <p className="text-sm">
              "There's more treasure in books than in a pirate's loot on
              Treasure Land."
            </p>
            <p className="ml-auto text-sm">- Walt Disney</p>
          </div>
        </div>

        {/* New Arrivals (hardcoded) */}
        <div className="flex h-40 w-full lg:w-1/2 rounded-lg border border-primary overflow-hidden">
          <div className="flex items-center justify-center h-full w-14 bg-gradient-to-r from-[#833AB4] to-[#EB5231] text-white font-semibold">
            <p className="transform -rotate-90 whitespace-nowrap">
              New Arrivals
            </p>
          </div>
          <div className="flex items-center gap-4 px-3 overflow-x-auto w-full scrollbar-hide">
            {/* Hardcoded books */}
            <div className="h-36 min-w-[100px] md:min-w-[120px] rounded-lg flex items-center flex-shrink-0">
              <img
                src={cover}
                alt="Book 1"
                className="h-full w-full object-cover rounded-lg"
              />
            </div>
            <div className="h-36 min-w-[100px] md:min-w-[120px] rounded-lg flex items-center flex-shrink-0">
              <img
                src={js}
                alt="Book 2"
                className="h-full w-full object-cover rounded-lg"
              />
            </div>
            <div className="h-36 min-w-[100px] md:min-w-[120px] rounded-lg flex items-center flex-shrink-0">
              <img
                src={react}
                alt="Book 3"
                className="h-full w-full object-cover rounded-lg"
              />
            </div>
            <div className="h-36 min-w-[100px] md:min-w-[120px] rounded-lg flex items-center flex-shrink-0">
              <img
                src={richdad}
                alt="Book 3"
                className="h-full w-full object-cover rounded-lg"
              />
            </div>
            <div className="h-36 min-w-[100px] md:min-w-[120px] rounded-lg flex items-center flex-shrink-0">
              <img
                src={harry}
                alt="Book 3"
                className="h-full w-full object-cover rounded-lg"
              />
            </div>
            {/* Add more hardcoded items as needed */}
          </div>
        </div>
      </div>

      {/* Greeting */}
      <div className="flex flex-col gap-3">
        <p className="text-lg md:text-2xl font-medium">{greeting}</p>
        <p className="font-medium text-sm text-gray-700">All Books</p>

        {/* Map ALL books here */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 w-full">
          {books.map((book, i) => (
            <div
              key={book._id || i}
              className="rounded-lg p-2 bg-white shadow-md flex flex-col"
            >
              <div className="w-full h-32 mb-2 bg-gray-100 rounded flex items-center justify-center overflow-hidden">
                <img
                  src={book.image || learn}
                  alt={book.title}
                  className="w-full h-full object-cover rounded"
                />
              </div>
              <div className="text-xs font-medium space-y-1">
                <p className="truncate">{book.title}</p>
                <p className="text-gray-600">{book.author}</p>
                <p className="text-yellow-500">
                  {typeof book.rating === "number" && !isNaN(book.rating)
                    ? book.rating
                    : "N/A"}{" "}
                  <span className="text-gray-400">/5</span>
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* User's Borrowed Books */}
        {myBorrows.length > 0 && (
          <div className="mt-8">
            <p className="font-medium text-sm text-gray-700 mb-2">
              Books You Have Borrowed
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 w-full">
              {Array.from(
                new Map(
                  myBorrows.map((borrow) => {
                    const borrowObj = borrow.borrow ? borrow.borrow : borrow;
                    const book =
                      borrowObj.book && typeof borrowObj.book === "object"
                        ? borrowObj.book
                        : getBookById(borrowObj.book);
                    return [borrowObj._id, { ...borrowObj, book }];
                  })
                ).values()
              ).map((borrowObj) => (
                <div
                  key={borrowObj._id}
                  className="rounded-lg p-2 bg-blue-50 shadow-md flex flex-col"
                >
                  <div className="w-full h-32 mb-2 flex items-center justify-center bg-gray-100 rounded">
                    {borrowObj.book ? (
                      <img
                        src={borrowObj.book.image || learn}
                        alt={borrowObj.book.title}
                        className="w-full h-full object-fit rounded"
                      />
                    ) : (
                      <span className="text-xs text-red-500 text-center">
                        Book deleted
                      </span>
                    )}
                  </div>
                  <div className="text-xs font-medium space-y-1">
                    <p className="truncate">
                      {borrowObj.book ? (
                        borrowObj.book.title
                      ) : (
                        <span className="text-red-500">Book deleted</span>
                      )}
                    </p>
                    <p className="text-gray-600">
                      {borrowObj.book ? borrowObj.book.author : ""}
                    </p>
                    <p className="text-yellow-500">
                      {borrowObj.book
                        ? typeof borrowObj.book.rating === "number" &&
                          !isNaN(borrowObj.book.rating)
                          ? borrowObj.book.rating
                          : "N/A"
                        : "--"}{" "}
                      <span className="text-gray-400">/5</span>
                    </p>
                    <button
                      className="bg-orange-600 cursor-pointer text-white px-2 py-1 rounded text-xs mt-2 hover:bg-orange-700"
                      onClick={() => handleReturn(borrowObj._id)}
                      disabled={!borrowObj.book}
                      title={
                        !borrowObj.book ? "Book already deleted" : "Return"
                      }
                    >
                      Return
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
