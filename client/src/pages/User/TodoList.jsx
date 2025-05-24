import React, { useState } from "react";
import { FaPlus, FaTrash, FaCheckCircle, FaRegCircle } from "react-icons/fa";

const TodoList = () => {
  const [task, setTask] = useState("");
  const [date, setDate] = useState("");
  const [todos, setTodos] = useState([]);

  const addTask = () => {
    if (!task.trim() || !date) return alert("Please enter task and due date.");

    setTodos([
      ...todos,
      { text: task.trim(), dueDate: date, completed: false },
    ]);
    setTask("");
    setDate("");
  };

  const toggleComplete = (index) => {
    const newTodos = [...todos];
    newTodos[index].completed = !newTodos[index].completed;
    setTodos(newTodos);
  };

  const deleteTask = (index) => {
    setTodos(todos.filter((_, i) => i !== index));
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 rounded-xl shadow-lg bg-white">
      <h2 className="text-2xl font-bold text-center mb-4">My Todo List</h2>

      {/* Input Area */}
      <div className="flex items-center gap-2 mb-4">
        <input
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addTask()}
          placeholder="Enter a new task..."
          className="flex-1 border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
        />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="px-4 py-2 text-sm rounded-lg border border-gray-300 focus:ring-2 focus:outline-none focus:ring-primary transition"
        />
        <button
          onClick={addTask}
          className="bg-primary hover:bg-primary/90 text-white px-4 py-3 rounded-lg text-sm flex items-center cursor-pointer"
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
        {todos.map((todo, index) => (
          <li
            key={index}
            className="flex items-center justify-between bg-gray-50 border border-gray-200 px-3 py-2 rounded-lg transition hover:shadow-sm"
          >
            <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4">
              <button
                onClick={() => toggleComplete(index)}
                className="text-primary text-lg"
                aria-label="Toggle Complete"
              >
                {todo.completed ? (
                  <FaCheckCircle className="text-green-500" />
                ) : (
                  <FaRegCircle />
                )}
              </button>
              <span
                className={`text-sm ${
                  todo.completed ? "line-through text-gray-400" : "text-black"
                }`}
              >
                {todo.text}
              </span>
              <span
                className={`text-xs text-gray-500 italic ${
                  todo.completed ? "line-through" : ""
                }`}
              >
                Due: {todo.dueDate}
              </span>
            </div>
            <button
              onClick={() => deleteTask(index)}
              className="text-red-500 hover:text-red-700"
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
