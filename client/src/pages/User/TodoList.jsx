import React, { useState, useEffect } from "react";
import { FaPlus, FaTrash, FaCheckCircle, FaRegCircle } from "react-icons/fa";
import { toast } from "sonner";

const BACKEND_URL = "http://localhost:8080";

const TodoList = () => {
  const [task, setTask] = useState("");
  const [date, setDate] = useState("");
  const [todos, setTodos] = useState([]);

  // Fetch todos from backend
  useEffect(() => {
    async function fetchTodos() {
      try {
        const res = await fetch(`${BACKEND_URL}/api/todos`);
        if (res.ok) {
          const data = await res.json();
          setTodos(data);
        }
      } catch (error) {
        console.error("Failed to fetch todos:", error);
      }
    }
    fetchTodos();
  }, []);

  const addTask = async () => {
    if (!task.trim() || !date)
      return toast.warning("Please enter task and due date.");

    const newTodo = { text: task.trim(), dueDate: date, completed: false };

    try {
      const res = await fetch(`${BACKEND_URL}/api/todos`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newTodo),
      });
      if (res.ok) {
        const savedTodo = await res.json();
        setTodos([...todos, savedTodo]);
        setTask("");
        setDate("");
      } else {
        toast.error("Failed to add task");
      }
    } catch (error) {
      toast.error("Error adding task");
      console.error(error);
    }
  };

  const toggleComplete = async (id) => {
    const todo = todos.find((t) => t.id === id);
    if (!todo) return;

    try {
      const res = await fetch(`${BACKEND_URL}/todos/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ completed: !todo.completed }),
      });

      if (res.ok) {
        setTodos((prev) =>
          prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
        );
      }
    } catch (error) {
      console.error("Failed to toggle task:", error);
    }
  };

  const deleteTask = async (id) => {
    try {
      const res = await fetch(`${BACKEND_URL}/todos/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setTodos((prev) => prev.filter((t) => t.id !== id));
      }
    } catch (error) {
      console.error("Failed to delete task:", error);
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
        />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary transition w-full sm:w-auto"
        />
        <button
          onClick={addTask}
          className="bg-primary cursor-pointer hover:bg-primary/90 text-white px-4 py-3 rounded-lg text-sm flex items-center justify-center w-full sm:w-auto"
          title="Add Task"
        >
          <FaPlus />
        </button>
      </div>

      {/* Task List */}
      <ul className="space-y-3">
        {todos.length === 0 && (
          <p className="text-center text-gray-400 text-sm">No tasks yet.</p>
        )}
        {todos.map((todo) => (
          <li
            key={todo.id}
            className="flex flex-col sm:flex-row sm:items-center justify-between bg-gray-50 border border-gray-200 px-3 py-2 rounded-lg transition hover:shadow-sm"
          >
            <div className="flex items-center gap-3">
              <button
                onClick={() => toggleComplete(todo.id)}
                className="text-primary cursor-pointer text-lg flex-shrink-0"
                aria-label="Toggle Complete" 
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
                    todo.completed ? "line-through text-gray-400" : "text-black"
                  }`}
                >
                  {todo.text}
                </p>
                <p
                  className={`text-xs text-gray-500 italic ${
                    todo.completed ? "line-through" : ""
                  }`}
                >
                  Due: {todo.dueDate}
                </p>
              </div>
            </div>
            <button
              onClick={() => deleteTask(todo.id)}
              className="text-red-500 cursor-pointer hover:text-red-700 mt-2 sm:mt-0 flex-shrink-0"
              aria-label="Delete Task"
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
