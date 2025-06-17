import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "../../utils/axios";
import { setBorrows } from "../../store/borrowSlice";

const Catalog = () => {
  const dispatch = useDispatch();
  const borrows = useSelector((state) => state.borrows.all);
  const loading = borrows === null;

  useEffect(() => {
    const fetchBorrows = async () => {
      try {
        const res = await axios.get("/admin/borrowed-books");
        await dispatch(setBorrows(res.data));
        console.log("Fetched borrows:", res.data);
      } catch (err) {
        dispatch(setBorrows([]));
      }
    };
    fetchBorrows();
  }, [dispatch]);

  if (loading) return <div className="p-8 text-center">Loading...</div>;
  if (!borrows || borrows.length === 0)
    return (
      <div className="p-8 text-center text-red-600">
        No borrow records found.
      </div>
    );

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-6">All Borrowed Books</h2>
      <table className="w-full border border-gray-200 rounded-lg overflow-hidden">
        <thead className="bg-gray-100">
          <tr>
            <th className="py-2 px-4 text-left">User</th>
            <th className="py-2 px-4 text-left">Email</th>
            <th className="py-2 px-4 text-left">Book Title</th>
            <th className="py-2 px-4 text-left">Author</th>
            <th className="py-2 px-4 text-left">Status</th>
          </tr>
        </thead>
        <tbody>
          {borrows.borrows?.map((borrow, idx) => {
            const borrowObj = borrow.borrow ? borrow.borrow : borrow;
            return (
              <tr key={borrowObj._id || idx} className="border-t">
                <td className="py-2 px-4">
                  {borrowObj.user?.name || "Unknown"}
                </td>
                <td className="py-2 px-4">
                  {borrowObj.user?.email || "Unknown"}
                </td>
                <td className="py-2 px-4">
                  {borrowObj.book?.title || "Unknown"}
                </td>
                <td className="py-2 px-4">
                  {borrowObj.book?.author || "Unknown"}
                </td>
                <td className="py-2 px-4">
                  {borrowObj.status === "returned" || borrowObj.returned ? (
                    <span className="bg-green-200 text-green-800 px-2 py-1 rounded text-xs">
                      Returned
                    </span>
                  ) : (
                    <span className="bg-red-200 text-red-800 px-2 py-1 rounded text-xs">
                      Not Returned
                    </span>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Catalog;
