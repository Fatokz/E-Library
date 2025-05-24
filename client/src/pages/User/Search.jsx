import React from "react";

const Search = () => {
  return (
    <>
      <div className="w-[100%] max-w-7xl mx-auto  h-[85vh]  flex flex-col gap-6 overflow-x-hidden px-4 py-6 hide-scrollbar">
        <ul className="w-[80%] flex text-sm font-medium justify-between ">
          <li>Title</li>
          <li>Ratings</li>
          <li>Category</li>
          <li>Avaliabilty</li>
          <li>Status</li>
        </ul>
        <div className="w-[80%] h-20 bg-white flex justify-between">
          <div className="flex gap-2 items-center">
            <img
              src="https://images.unsplash.com/photo-1677630986480-4f3a1b8c5d7e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60"
              alt=""
              className="w-16 h-16 rounded-lg object-cover"
            />
            <div>
              <h1 className="text-sm font-semibold">Don't Make Me Think</h1>
              <p className="text-xs text-gray-500">Author</p>
            </div>
          </div>
          <div className="flex items-center">
            <p>4.5</p>
          </div>
          <div className="flex items-center">
            <p>Category</p>
          </div>
          <div className="flex items-center">
            <p>Available</p>
          </div>
          <div className="flex items-center">
            <button className="bg-blue-500 text-white px-4 py-2 rounded-md">
              Borrow
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Search;
