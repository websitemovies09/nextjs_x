import connection from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(request) {
 
  const searchParams = request.nextUrl.searchParams;
  try {
    const page = parseInt(searchParams.get("page")) || 1;
    const perPage = parseInt(searchParams.get("limit")) || 40; // Số mục trên mỗi trang
    const offset = (page - 1) * perPage;
    const searchQuery = searchParams.get("q") || "";

    // Truy vấn để lấy tổng số mục có điều kiện tìm kiếm
    const countQuery = `
      SELECT COUNT(*) as totalCount
      FROM movies
      WHERE active = 1 ${searchQuery ? `AND title LIKE ?` : ""}
    `;
    const [countResults] = await connection.execute(countQuery, [`%${searchQuery}%`]);
    const totalCount = countResults[0].totalCount;
    const totalPages = Math.ceil(totalCount / perPage);
    
    // Truy vấn dữ liệu
    const query = `
    SELECT movies.*, caterogys.title AS category
    FROM movies
    JOIN caterogys ON movies.caterogy_id = caterogys.id
    WHERE movies.active = 1 ${searchQuery ? `AND movies.title LIKE '%${searchQuery}%'` : ""}
    ORDER BY movies.id DESC
    LIMIT ${offset}, ${perPage}
  `;
  
  const [results] = await connection.execute(query);

    return NextResponse.json(
      { movies: results, totalPages, totalCount, perPage },
      { status: 200 }
    );
  } catch (err) {
    console.log(err);
    return NextResponse.error("Error message", 500);
  }
}
