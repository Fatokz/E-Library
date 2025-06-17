import { useState, useEffect } from "react";
import { FaPlus, FaTrash, FaCheckCircle, FaRegCircle } from "react-icons/fa";
import { toast } from "sonner";
import axios from "../../utils/axios";

const TodoList = () => {
  const [task, setTask] = useState("");
  const [date, setDate] = useState("");
  const [todos, setTodos] = useState([]);
  const [completed, setcompleted] = useState(false);
  const [loading, setLoading] = useState(false);

  async function fetchTodos() {
    setLoading(true);
    try {
      const res = await axios.get("/todos");
      if (res.status === 200) {
        setTodos(res.data);
      } else {
        toast.error("Failed to fetch todos");
      }
    } catch (error) {
      console.error("Failed to fetch todos:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchTodos();
    // eslint-disable-next-line
  }, []);

  const addTask = async () => {
    if (!task.trim() || !date)
      return toast.warning("Please enter task and due date.");

    setLoading(true);
    const newTodo = {
      title: task.trim(),
      targetCompletedDate: date,
    };

    try {
      const res = await axios.post("/todos", newTodo);
      setTask("");
      setDate("");
      await fetchTodos();
      toast.success("Added");
    } catch (error) {
      toast.error("Error adding task");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const toggleComplete = async (id) => {
    const todo = todos.find((t) => t._id === id);
    if (!todo) return;
    setLoading(true);
    try {
      const res = await axios.patch(`/todos/${id}`, {
        completed: !todo.completed,
      });
      await fetchTodos();
      toast.success("Completed");
    } catch (error) {
      console.error("Failed to toggle task:", error);
    } finally {
      setLoading(false);
    }
  };

  const deleteTask = async (id) => {
    setLoading(true);
    try {
      const res = await axios.delete(`/todos/${id}`);
      await fetchTodos();
      toast.success("Deleted");
    } catch (error) {
      console.error("Failed to delete task:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 rounded-xl shadow-lg bg-white">
      <h2 className="text-2xl font-bold text-center mb-6">My Todo List</h2>

      {/* Input Area */}
      <div className="flex flex-col sm:flex-row items-center gap-3 mb-6">
        <input
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addTask()}
          placeholder="Enter a new task..."
          className="flex-1 border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary w-full sm:w-auto"
          disabled={loading}
        />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary transition w-full sm:w-auto"
          disabled={loading}
        />
        <button
          onClick={addTask}
          className="bg-primary cursor-pointer hover:bg-primary/90 text-white px-4 py-3 rounded-lg text-sm flex items-center justify-center w-full sm:w-auto disabled:opacity-50"
          title="Add Task"
          disabled={loading}
        >
          <FaPlus />
        </button>
      </div>

      {/* Loader */}
      {loading && (
        <div className="text-center text-primary py-2 text-sm italic">
          Loading...
        </div>
      )}

      {/* Task List */}
      <ul className="space-y-3">
        {todos.length === 0 && !loading && (
          <p className="text-center text-gray-400 text-sm">No tasks yet.</p>
        )}
        {[...todos]
          .sort((a, b) => {
            // Incomplete first, completed last
            if (a.completed === b.completed) {
              // Optional: newest first (assuming you have a createdAt field)
              // return new Date(b.createdAt) - new Date(a.createdAt);
              return 0;
            }
            return a.completed ? 1 : -1;
          })
          .map((todo) => (
            <li
              key={todo._id}
              className="flex flex-col sm:flex-row sm:items-center justify-between bg-gray-50 border border-gray-200 px-3 py-2 rounded-lg transition hover:shadow-sm"
            >
              <div className="flex items-center gap-3">
                <button
                  onClick={() => toggleComplete(todo?._id)}
                  className="text-primary cursor-pointer text-lg flex-shrink-0"
                  aria-label="Toggle Complete"
                  disabled={loading}
                >
                  {todo.completed ? (
                    <FaCheckCircle className="text-green-500" />
                  ) : (
                    <FaRegCircle />
                  )}
                </button>
                <div>
                  <p
                    className={`text-sm ${
                      todo.completed
                        ? "line-through text-gray-400"
                        : "text-black"
                    }`}
                  >
                    {todo.title}
                  </p>
                  <p
                    className={`text-xs text-gray-500 italic ${
                      todo.completed ? "line-through" : ""
                    }`}
                  >
                    Due:{" "}
                    {new Date(todo.targetCompletedDate).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <button
                onClick={() => deleteTask(todo?._id)}
                className="text-red-500 cursor-pointer hover:text-red-700 mt-2 sm:mt-0 flex-shrink-0"
                aria-label="Delete Task"
                disabled={loading}
              >
                <FaTrash />
              </button>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default TodoList;
