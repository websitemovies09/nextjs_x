"use client";

import Heading from "@/components/heading";
import MoivieItem from "@/components/movieItem";
import Skeleton from "@/components/Skeleton";
import { useGetMovieDetailQuery, useGetMoviesByCaterogyQuery } from "@/redux_query/movie/moviesApi";
import { useParams } from "next/navigation";

function Watching() {
  const params = useParams();
  const { data } = useGetMovieDetailQuery(params.id);
  const { data:moviesRelate, isLoading} = useGetMoviesByCaterogyQuery({type: data?.movies[0]?.caterogy_id});
  return (
    <div className=" mx-auto p-1 sm:p-4 bg-gray-800">
      <h1 className="text-white mb-4">{data?.movies[0]?.title}</h1>

       <div className="responsive-iframe w-full sm:w-4/5 mx-auto	">
        <iframe src={data?.movies[0]?.video} allowFullScreen />
      </div> 
      <p className="mt-4 text-white">{data?.movies[0]?.description}</p>

      <div className="mt-4 flex flex-col justify-center items-center ">
      <p className="font-bold text-white">
          #
          <span className="font-normal text-white">
            {data?.movies[0]?.id}
          </span>
        </p>
        <p className="font-bold text-white">
          Thể loại:{" "}
          <span className="font-normal text-white">
            {data?.movies[0]?.category}
          </span>
        </p>
        <img
          className="object-contain h-32 sm:h-52	rounded"
          src={data?.movies[0]?.thumbnail}
          alt=""
        />
      </div>
      <div className="bg-slate-900 mt-4 p-4">
        <Heading title="phim sex liên quan" />
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mt-4">
          {isLoading ? (
            <Skeleton itemCount={15} />
          ) : (
            moviesRelate?.movies?.map((item) => <MoivieItem key={item.id} item={item} />)
          )}
        </div>
      </div>
    </div>
  );
}

export default Watching;
