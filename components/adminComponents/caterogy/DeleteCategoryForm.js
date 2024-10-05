"use client";
import { useGetCaterogysQuery } from "@/redux_query/caterogy/caterogyApi";
import { useState } from "react";
import Cookies from "js-cookie";
function DeleteCategoryForm({caterogys,refetch}) {
  
  const [id, setId] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = Cookies.get("tokenadmin");
      const response = await fetch("/api/caterogys", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ id }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("Category deleted successfully!");
        setId("");
        refetch()
      } else {
        setMessage(`Error: ${data.message}`);
      }
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    }
  };

  const handleCategoryChange = (event) => {
    const selectedId = event.target.value;
    setId(selectedId); // Set ID directly from the selected value
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-md shadow-md mt-14">
      <h2 className="text-xl font-bold mb-4">Delete Category</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1" htmlFor="category">
            Select Category
          </label>
          <select
            id="category"
            onChange={handleCategoryChange}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-500"
          >
            <option value="">Select a category</option>
            {caterogys?.results?.map((category) => (
              <option key={category.id} value={category.id}>
                {category.title}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1" htmlFor="id">
            ID
          </label>
          <input
            type="text"
            id="id"
            value={id}
            required
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-500"
            readOnly
          />
        </div>
        <button
          type="submit"
          className="w-full px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition duration-200"
        >
          Delete Category
        </button>
      </form>
      {message && <p className="mt-4 text-sm text-green-500">{message}</p>}
    </div>
  );
}

export default DeleteCategoryForm;
