import connection from "@/lib/db";
import { NextResponse } from "next/server";



export async function GET(request, params) {
  const allowedOrigins = ["http://localhost:3000",'https://sexnew.xyz'];
  const origin = request.nextUrl.origin;
  if (!allowedOrigins.includes(origin)) {
    return NextResponse.json({ message: origin }, { status: 403 });
  }
  try {
    let id = params.params.id;
    const [movies] = await connection.execute(
      `SELECT movies.*, caterogys.title AS category 
       FROM movies
       JOIN caterogys ON movies.caterogy_id = caterogys.id
       WHERE movies.id = ${id}` 
    );

    return NextResponse.json({ movies }, { status: 200 });
  } catch (err) {
    console.error(err);  // Thêm log lỗi để dễ debug
    return NextResponse.error("Error message", 500);
  }
}


export async function PUT(request, params) {
  try {
    const id = params.params.id;
    const { views } = await request.json();

    await connection.beginTransaction(); 

    try {
      await connection.execute(
        `UPDATE movies 
         SET views = views + ? 
         WHERE id = ?`, [views, id]
      );

      await connection.commit();
      return NextResponse.json({ message: "View count updated successfully." }, { status: 200 });
    } catch (err) {
      await connection.rollback(); // Quay lại giao dịch khi có lỗi
      return NextResponse.error("Error updating view count", 500);
    }
  } catch (err) {
    return NextResponse.error("Error updating view count", 500);
  }
}