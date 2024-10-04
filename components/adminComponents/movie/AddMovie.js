"use client"
import { useGetCaterogysQuery } from '@/redux_query/caterogy/caterogyApi';
import { useState } from 'react';
import Cookies from 'js-cookie';
const AddMovie = ({ refetchMovies }) => {
  const [title, setTitle] = useState('');
  const [thumbnail, setThumbnail] = useState('');
  const [videoSource, setVideoSource] = useState('');
  const [source, setSoure] = useState('');
  const [caterogyId, setCaterogyId] = useState('');
  const { data: caterogys, isLoading } = useGetCaterogysQuery();


  const handleSubmit = async (e) => {
    e.preventDefault();

    const movieData = {
      title,
      thumbnail,
      video: videoSource,
      caterogy_id: caterogyId,
      source
    };

    try {
      const token = Cookies.get('tokenadmin');
      const response = await fetch('/api/movies', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(movieData),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const data = await response.json();
      alert("Add Movie  successfully!"); 
      refetchMovies()
    } catch (error) {
      alert(`Failed to add movie: ${error.message}`);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md mt-14">
      <h1 className="text-2xl font-bold mb-4 text-center">Add Movie</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
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
          <label htmlFor="thumbnail" className="block text-sm font-medium text-gray-700">
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
          <label htmlFor="videoSource" className="block text-sm font-medium text-gray-700">
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
          <label htmlFor="videoSource" className="block text-sm font-medium text-gray-700">
            Nguồn Source 
          </label>
          <input
            type="text"
            id="source"
            value={source}
            onChange={(e) => setSoure(e.target.value)}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring focus:ring-blue-500"
          />
        </div>
        <div>
          <label htmlFor="caterogyId" className="block text-sm font-medium text-gray-700">
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
            <option value="" disabled>Select a category</option>
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
          Add Movie
        </button>
      </form>
    </div>
  );
};

export default AddMovie;
