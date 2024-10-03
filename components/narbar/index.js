"use client";
import { useGetCaterogysQuery } from "@/redux_query/caterogy/caterogyApi";
import Link from "next/link";
import { useParams } from "next/navigation";
import SkeletonNar from "./SkeletonNar";

function Narbar() {

  const params = useParams();
  const type = params.caterogy;
  const { data, error, isLoading } = useGetCaterogysQuery();

  return (
    <nav className="bg-gray-800 p-2 flex flex-wrap space-x-4">
      {isLoading ? (
        <SkeletonNar itemCount ={7}/>
      ) : (
        <>
          <Link
            className={`${
              type === undefined ? "bg-red-600" : ""
            } p-2 rounded text-white cursor-pointer`}
            href="/"
          >
            Trang chủ
          </Link>
          {data?.results?.map((item, index) => {
            return (
              <Link
                key={index}
                className={`${
                  type == item.id ? "bg-red-600 rounded" : ""
                } p-2  text-white cursor-pointer`}
                href={`/movie/${item?.id}`}
              >
                {item?.title}
              </Link>
            );
          })}
        </>
      )}
    </nav>
  );
}

export default Narbar;
