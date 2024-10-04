"use client"
import { useState } from "react";
import Cookies from 'js-cookie';
export default function AddCategory() {
  const [title, setTitle] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!title) {
      setError("Title is required.");
      return;
    }

    try {
      const token = Cookies.get('tokenadmin');
      const response = await fetch("/api/caterogys", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
           Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ title }),
      });

      if (response.ok) {
        const data = await response.json();
        setSuccess(`Category added with ID: ${data.id}`);
        setTitle(""); // Reset the input field
      } else {
        const errorData = await response.json();
        setError(errorData.message || "An error occurred.");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <div className="flex justify-center items-center ">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4">Add New Category</h1>
        
        {error && <p className="text-red-500 mb-4">{error}</p>}
        {success && <p className="text-green-500 mb-4">{success}</p>}
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-700">
              Title
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
              placeholder="Enter category title"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200"
          >
            Add Category
          </button>
        </form>
      </div>
    </div>
  );
}
