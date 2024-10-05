"use client";

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
    <>
      <div className='flex justify-center	mb-14 mt-14'>
        <div className="bg-gray-500 p-10 rounded-lg shadow-lg max-w-md w-full">
          <h1 className="text-white text-4xl font-bold mb-8 text-center">
            ADMIN
          </h1>
          <div className="grid grid-cols-2 gap-4">
            <button
              className="bg-blue-500 text-white py-3 rounded-lg shadow-lg hover:bg-blue-600 transition duration-300 flex items-center justify-center"
                onClick={handleShowCategory}
            >
              <i className="fas fa-list-alt mr-2" />
              Category
            </button>
            <button
              className="bg-green-500 text-white py-3 rounded-lg shadow-lg hover:bg-green-600 transition duration-300 flex items-center justify-center"
              onClick={handleShowMovie}
            >
              Movie
            </button>
          </div>
        </div>
      </div>

      {/* Hiển thị <AddCategory /> hoặc <AddMovie /> tùy thuộc vào lựa chọn */}
      {activeComponent === "category" && <AdminCaterogy />}
      {activeComponent === "movie" && <AdminMovie />}
    </>
  );
}

export default Page;
