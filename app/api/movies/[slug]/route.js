import connection from "@/lib/db";
import { NextResponse } from "next/server";



export async function GET(request, params) {
  try {
    let slug = params.params.slug; // Thay đổi từ id thành slug
    const [movies] = await connection.execute(
      `SELECT movies.*, caterogys.title AS category 
       FROM movies
       JOIN caterogys ON movies.caterogy_id = caterogys.id
       WHERE movies.slug = ?`, 
      [slug] 
    );

    return NextResponse.json({ movies }, { status: 200 });
  } catch (err) {
    console.error(err);  // Thêm log lỗi để dễ debug
    return NextResponse.error("Error message", 500);
  }
}

