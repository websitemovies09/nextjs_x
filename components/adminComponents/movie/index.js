import Paginations from "@/components/pagination";
import { useGetMoviesQuery } from "@/redux_query/movie/moviesApi";
import axios from "axios";
import Cookies from "js-cookie";
import { useState } from "react";
import AddMovie from "./AddMovie";
import UpdateMovie from "./UpdateMovie";
function AdminMovie() {
  const [currentPage, setCurrentPage] = useState(1);
  const [movieUpdate, setMovieUpdate] = useState({});

  const { data, refetch } = useGetMoviesQuery(currentPage);
  function handleNextPage(page) {
    setCurrentPage(page);
  }

  const handleDelete = async (id) => {
    const token = Cookies.get("tokenadmin");
    try {
      await axios.delete("/api/movies", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        data: { id },
      });
      refetch();
      alert("Movie deleted successfully!");
    } catch (error) {
      alert(
        `Error: ${error.response?.data?.message || "Failed to delete movie."}`
      );
    }
  };
  return (
    <>
      <AddMovie refetchMovies={refetch} />
      <UpdateMovie movieData={movieUpdate} refetchMovies={refetch} />
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-14">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
              <th scope="col" className="px-6 py-3">
                ID
              </th>
              <th scope="col" className="px-6 py-3">
                TITLE
              </th>
              <th scope="col" className="px-6 py-3">
                THUMBNAIL
              </th>
              <th scope="col" className="px-6 py-3">
                VIDEO
              </th>
              <th scope="col" className="px-6 py-3">
                CATEGORY_ID
              </th>
              <th scope="col" className="px-6 py-3">
                NGUỒN COPY
              </th>
              <th scope="col" className="px-6 py-3">
                VIEW
              </th>
            </tr>
          </thead>
          <tbody>
            {data?.movies?.map((item) => {
              return (
                <tr
                  key={item.id}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  <td className="px-6 py-4 font-medium text-blue-600 dark:text-blue-500 hover:underline">
                    <a
                      href="#UpdateMovie"
                      className="cursor-pointer"
                      onClick={() => setMovieUpdate(item)}
                    >
                      Edit
                    </a>
                    <span
                      className="ml-4 text-red-500 cursor-pointer"
                      onClick={() => handleDelete(item.id)}
                    >
                      DELETE
                    </span>
                  </td>
                  <td className="px-6 py-4">{item.id}</td>
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 dark:text-white ellipsis"
                  >
                    {item.title}
                  </th>
                  <td className="px-6 py-4 ellipsis">{item.video}</td>
                  <td className="px-6 py-4 ellipsis">{item.thumbnail}</td>
                  <td className="px-6 py-4 ellipsis">{item.caterogy_id}</td>
                  <td className="px-6 py-4 ellipsis">{item.source}</td>
                  <td className="px-6 py-4 ellipsis">{item.views}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <Paginations
          totalPages={data?.totalPages}
          currentPage={currentPage}
          onPageChange={handleNextPage}
        />
      </div>
    </>
  );
}

export default AdminMovie;
