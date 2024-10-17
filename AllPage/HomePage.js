"use client";
import Heading from "@/components/heading";
import MoivieItem from "@/components/movieItem";
import Paginations from "@/components/pagination";
import Skeleton from "@/components/Skeleton";
import { useGetMoviesQuery } from "@/redux_query/movie/moviesApi";
import { useState } from "react";


export default function Home() {
  const [currentPage, setCurrentPage] = useState(1);
  const { data, isLoading } = useGetMoviesQuery(currentPage);

  function handleNextPage(page) {
    setCurrentPage(page);
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }

  return (
    <>
      <main className="p-2 bg-gray-800">
        <div  className="flex items-center space-x-2">
          <span className="text-yellow-500">🔥</span>
          <h1 className="text-white	">Phim Sex Hay</h1>
        </div>
        <div  className="bg-slate-900 mt-4 p-4">
          <Heading title="PHIM SEX MỚI" />
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mt-4">
            {isLoading ? (
              <Skeleton itemCount={15} />
            ) : (
              data?.movies?.map((item) => (
                <MoivieItem key={item.id} item={item} />
              ))
            )}
          </div>
          <Paginations
            totalPages={data?.totalPages}
            currentPage={currentPage}
            onPageChange={handleNextPage}
          />
        </div>
      </main>
    </>
  );
}
