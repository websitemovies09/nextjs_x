"use client"

import Heading from "@/components/heading";
import MoivieItem from "@/components/movieItem";
import Paginations from "@/components/pagination";
import Skeleton from "@/components/Skeleton";
import { useGetMoviesBySearchQuery } from "@/redux_query/movie/moviesApi";
import { useSearchParams } from "next/navigation";
import { useState } from "react";


export default function Search() {
  const [currentPage, setCurrentPage] = useState(1);
  const searchParams = useSearchParams()
  const query = searchParams.get('query')
  const { data, isLoading} = useGetMoviesBySearchQuery({query:query,page:currentPage});
  function handleNextPage(page){
    setCurrentPage(page)
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }
  return (
    <>
      <main className="p-4 bg-gray-800">
        <div className="flex items-center space-x-2">
          <span className="text-yellow-500">🔥</span>
          <span className="text-white	">Phim Sex Hay</span>
        </div>
        <div className="bg-slate-900 mt-4 p-4">
          <Heading title={`TÌM KIẾM : ${query}`}/>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mt-4">
          {isLoading ? (
              <Skeleton itemCount={15} />
            ) : (
              data?.movies?.map((item) => <MoivieItem key={item.id} item={item} />)
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
