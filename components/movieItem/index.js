"use client";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
function MoivieItem({ item }) {
  const router = useRouter();

  const [imageUrl, setImageUrl] = useState(item?.thumbnail || "");

  // useEffect(() => {
  //   if (imageUrl) {
  //     const link = document.createElement("link");
  //     link.rel = "preload";
  //     link.as = "image";
  //     link.href = imageUrl;
  //     document.head.appendChild(link);
  //   }
  // }, [imageUrl]);

  function handloWatchTV() {
    router.push(`/watch/${item.slug}`);
    const fetchData = async () => {
      try {
        const response = await axios.put(`/api/movies/id/${item.id}`, {
          views: 1,
        });
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:");
      }
    };
    fetchData();
  }
  return (
    <div
      className="bg-gray-700 rounded cursor-pointer relative"
      onClick={handloWatchTV}
    >
      <div className="absolute text-xs top-2 left-2 text-white flex items-center bg-gray-800 bg-opacity-75 px-2 py-1 rounded">
        <p>{item?.views} views</p>
      </div>
      <Image
        alt="Mountains"
        src={imageUrl}
        width={170}
        height={128}
        className="w-full h-28 object-contain md:h-32 image_s"
        style={{
          width: '100%',
        }}
        onError={(e) => {setImageUrl('https://media.discordapp.net/attachments/1291952724505792514/1291961961667366963/23-677x400.jpg?ex=670200d7&is=6700af57&hm=f429036bc151c64d1c92a7fbb3ac65e588b88cdeb77d2e849b8d2c103771c4b8&=&format=webp')}}
      />

      <p className="p-2 text-white text-sm		line-clamp-1">{item?.title}</p>
    </div>
  );
}

export default MoivieItem;
