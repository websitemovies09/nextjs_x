

import connection from "@/lib/db";

export default async function sitemap() {
  let NEXT_BASE_URL ='https://sexnew.xyz'
  const [moviesData] = await connection.execute(`SELECT * FROM movies LIMIT 100 OFFSET 0`);
  let movie = [];
  if (moviesData) {
    movie = moviesData.map((item) => ({
      url: `${NEXT_BASE_URL}/watch/${item.slug}`,
      lastModified: item.created_date,
      changeFrequency: "yearly",
      priority: 1,
    }));
  }

  const [results] = await connection.execute(`SELECT * FROM caterogys`);
  let caterogys = [];
  if (caterogys) {
    caterogys = results.map((item) => ({
      url: `${NEXT_BASE_URL}/movie/${item.id}/${item.slug}`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 1,
    }));
  }

  const routes = [""].map((route) => ({
    url: `${NEXT_BASE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: "yearly",
    priority: 1,
  }));

  return [...routes,...movie,...caterogys];

}

