"use client"

import AdminCaterogy from "@/components/adminComponents/caterogy";
import AdminMovie from "@/components/adminComponents/movie";
import { useState } from "react";

function Page() {
  const [activeComponent, setActiveComponent] = useState(null);

  const handleShowCategory = () => {
    setActiveComponent("category");
  };

  const handleShowMovie = () => {
    setActiveComponent("movie");
  };

  return (
    <div className="p-6 min-h-screen">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-4 text-white">ADMIN</h2>
        <div className="flex space-x-4">
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200"
            onClick={handleShowCategory}
          >
            Category
          </button>
          <button
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition duration-200"
            onClick={handleShowMovie}
          >
            Movie
          </button>
        </div>
      </div>

      {/* Hiển thị <AddCategory /> hoặc <AddMovie /> tùy thuộc vào lựa chọn */}
      {activeComponent === "category" && <AdminCaterogy />}
      {activeComponent === "movie" && <AdminMovie />}
    </div>
  );
}

export default Page;
