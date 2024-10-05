"use client";
import { useGetCaterogysQuery } from "@/redux_query/caterogy/caterogyApi";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";

const UpdateMovie = ({ movieData, refetchMovies }) => {
  const [id, setId] = useState(movieData?.id || "");
  const [title, setTitle] = useState(movieData?.title || "");
  const [thumbnail, setThumbnail] = useState(movieData?.thumbnail || "");
  const [videoSource, setVideoSource] = useState(movieData?.video || "");
  const [source, setSource] = useState(movieData?.source || "");
  const [views, setViews] = useState(movieData?.views || "");
  const [caterogyId, setCaterogyId] = useState(movieData?.caterogy_id || "");
  const { data: caterogys, isLoading } = useGetCaterogysQuery();
  useEffect(() => {
    if (movieData) {
      setId(movieData.id || "");
      setTitle(movieData.title || "");
      setThumbnail(movieData.thumbnail || "");
      setVideoSource(movieData.video || "");
      setSource(movieData.source || "");
      setViews(movieData.views || '')
      setCaterogyId(movieData.caterogy_id || "");
    }
  }, [movieData]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedMovieData = {
      id,
      title,
      thumbnail,
      video: videoSource,
      caterogy_id: caterogyId,
      source,
    };
    try {
      const token = Cookies.get("tokenadmin");
      const response = await fetch(`/api/movies`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedMovieData),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const data = await response.json();
      alert("Movie updated successfully!");
      refetchMovies(); 
    } catch (error) {
      alert(`Failed to update movie: ${error.message}`);
    }
  };

  return (
    <div
      id="UpdateMovie"
      className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md mt-14"
    >
      <h1 className="text-2xl font-bold mb-4 text-center">Update Movie</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700"
          >
            Title:
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring focus:ring-blue-500"
          />
        </div>
        <div>
          <label
            htmlFor="thumbnail"
            className="block text-sm font-medium text-gray-700"
          >
            Thumbnail URL:
          </label>
          <input
            type="text"
            id="thumbnail"
            value={thumbnail}
            onChange={(e) => setThumbnail(e.target.value)}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring focus:ring-blue-500"
          />
        </div>
        <div>
          <label
            htmlFor="videoSource"
            className="block text-sm font-medium text-gray-700"
          >
            Video Source URL:
          </label>
          <input
            type="text"
            id="videoSource"
            value={videoSource}
            onChange={(e) => setVideoSource(e.target.value)}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring focus:ring-blue-500"
          />
        </div>
        <div>
          <label
            htmlFor="source"
            className="block text-sm font-medium text-gray-700"
          >
            Nguồn Source:
          </label>
          <input
            type="text"
            id="source"
            value={source}
            onChange={(e) => setSource(e.target.value)}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring focus:ring-blue-500"
          />
        </div>
        <div>
          <label
            htmlFor="source"
            className="block text-sm font-medium text-gray-700"
          >
            Mắt xem
          </label>
          <input
            type="text"
            id="views"
            value={views}
            onChange={(e) => setViews(e.target.value)}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring focus:ring-blue-500"
          />
        </div>
        <div>
          <label
            htmlFor="caterogyId"
            className="block text-sm font-medium text-gray-700"
          >
            Category:
          </label>
          {isLoading && <p>Loading categories...</p>}
          <select
            id="caterogyId"
            value={caterogyId}
            onChange={(e) => setCaterogyId(e.target.value)}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring focus:ring-blue-500"
          >
            <option value="" disabled>
              Select a category
            </option>
            {caterogys?.results?.map((category) => (
              <option key={category.id} value={category.id}>
                {category.title}
              </option>
            ))}
          </select>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white font-semibold py-2 rounded-md hover:bg-blue-500 transition duration-200"
        >
          Update Movie
        </button>
      </form>
    </div>
  );
};

export default UpdateMovie;
