import { useEffect, useState } from "react";
import axios from "../../utils/axios";
import { toast } from "sonner";
import { AiOutlineDelete } from "react-icons/ai";

const PAGE_SIZE = 10;

const User = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const res = await axios.get("/admin/users");
        setUsers(res.data.users || res.data);
      } catch (err) {
        toast.error("Failed to fetch users");
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const handleDelete = async (userId) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    try {
      await axios.delete(`/admin/users/${userId}`);
      setUsers((prev) =>
        prev.filter((u) => u._id !== userId && u.id !== userId)
      );
      toast.success("User deleted");
    } catch (err) {
      toast.error("Failed to delete user");
    }
  };

  // Filter users by search query
  const filteredUsers = users.filter((user) => {
    const q = searchQuery.toLowerCase();
    return (
      user.name?.toLowerCase().includes(q) ||
      user.email?.toLowerCase().includes(q) ||
      (user.role || "user").toLowerCase().includes(q)
    );
  });

  const totalPages = Math.ceil(filteredUsers.length / PAGE_SIZE);
  const paginatedUsers = filteredUsers.slice(
    (page - 1) * PAGE_SIZE,
    page * PAGE_SIZE
  );

  if (loading) return <p className="text-center mt-10">Loading users...</p>;

  return (
    <div className="w-full max-w-7xl mx-auto h-[85vh] px-2 py-6">
      <h2 className="text-2xl font-semibold mb-6">All Users</h2>

      {/* Search Input */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by name, email, or role..."
          className="w-full max-w-md px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setPage(1); // Reset to first page on search
          }}
        />
      </div>

      <div className="w-full overflow-x-auto">
        {/* Table header for md+ screens */}
        <ul className="hidden md:grid grid-cols-4 text-sm font-medium border-b border-gray-300 pb-2">
          <li>Name</li>
          <li>Email</li>
          <li>Role</li>
          <li>Actions</li>
        </ul>

        {/* User list */}
        <div
          className="overflow-y-auto mt-2 flex flex-col gap-4 pr-2"
          style={{ maxHeight: "55vh" }}
        >
          {paginatedUsers.length === 0 ? (
            <div className="text-center  text-red-700 py-8">No users found.</div>
          ) : (
            paginatedUsers.map((user) => (
              <div
                key={user._id || user.id}
                className="bg-white border border-gray-200 rounded-lg px-4 py-2 hover:shadow-md transition-all duration-200
                  flex flex-col md:grid md:grid-cols-4 md:items-center h-auto md:h-16"
              >
                <div className="truncate font-medium">{user.name || "N/A"}</div>
                <div className="truncate text-gray-700">{user.email}</div>
                <div className="truncate capitalize">{user.role || "user"}</div>
                <div className="flex gap-2 justify-start md:justify-center items-center mt-2 md:mt-0">
                  <button
                    className="bg-red-600 text-white px-3 py-1 rounded-md text-xs hover:bg-red-700 flex items-center gap-1"
                    onClick={() => handleDelete(user._id || user.id)}
                    title="Delete user"
                  >
                    <AiOutlineDelete /> Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Pagination controls */}
      <div className="mt-4 flex justify-center gap-3 items-center">
        <button
          className="px-3 py-1 rounded border bg-white hover:bg-gray-100 disabled:opacity-50"
          onClick={() => setPage((p) => Math.max(p - 1, 1))}
          disabled={page === 1}
        >
          Prev
        </button>
        <span className="text-sm font-medium">
          Page {page} of {totalPages}
        </span>
        <button
          className="px-3 py-1 rounded border bg-white hover:bg-gray-100 disabled:opacity-50"
          onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
          disabled={page === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default User;
