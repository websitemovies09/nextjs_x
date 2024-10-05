import connection from "@/lib/db";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.JWT_SECRET;
export const authenticateAdmin = (req) => {
  const token = req.headers.get("Authorization")?.split(" ")[1];
  if (!token) {
    throw new Error("Token is required");
  }
  
  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    if (decoded.role !== 'admin') {
      throw new Error("Access denied. Admins only.");
    }
    return decoded; // Trả về thông tin đã giải mã nếu hợp lệ
  } catch (error) {
    throw new Error(error.message === 'jwt malformed' ? "Invalid token" : error.message);
  }
};


function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export async function GET(request) {
  
  const searchParams = request.nextUrl.searchParams;
  try {
    const page = parseInt(searchParams.get("page")) || 1;
    const perPage = parseInt(searchParams.get("limit")) || 40;
    const offset = (page - 1) * perPage;
    const [countResults] = await connection.execute(
      "SELECT COUNT(*) as totalCount FROM `movies`"
    );

    const totalCount = countResults[0].totalCount;
    const totalPages = Math.ceil(totalCount / perPage);
    const [results] = await connection.execute(
      `SELECT movies.*, caterogys.title AS category
       FROM movies
       JOIN caterogys ON movies.caterogy_id = caterogys.id
       WHERE movies.active = 1
       ORDER BY movies.id DESC
       LIMIT ${offset}, ${perPage}`
    );
    return NextResponse.json(
      { movies: results, totalPages, totalCount, perPage },
      { status: 200 }
    );
  } catch (err) {
    console.log(err)
    return NextResponse.error("Error message", 500);
  }
}


export async function POST(request) {
  try {
    const { title, thumbnail, video, caterogy_id,source='main' } = await request.json();

    const decoded = authenticateAdmin(request);

    const [result] = await connection.execute(
      `INSERT INTO movies (title, thumbnail, video , source, caterogy_id, active,views) 
       VALUES (?, ?, ?,?, ?, ?,?)`,
      [title, thumbnail, video ,source, caterogy_id, 1,getRandomNumber(10,50)] 
    );

    if (result.affectedRows === 1) {
      return NextResponse.json({ message: "Movie added successfully", movieId: result.insertId }, { status: 201 });
    } else {
      return NextResponse.json({ message: "Failed to add movie" }, { status: 500 });
    }
  } catch (err) {
    console.error(err);
    return NextResponse.error("Server error", 500);
  }
}




export async function DELETE(request) {
  try {
    const { id } = await request.json(); 

    const decoded = authenticateAdmin(request);

    const [result] = await connection.execute(
      `DELETE FROM movies WHERE id = ?`,
      [id]
    );

    if (result.affectedRows > 0) {
      return NextResponse.json({ message: "Category deleted successfully" }, { status: 200 });
    } else {
      return NextResponse.json({ message: "Category not found" }, { status: 404 });
    }
  } catch (err) {
    return NextResponse.error("Error message", 500);
  }
}






export async function PUT(request) {
  try {
    const { id, title, thumbnail, video, caterogy_id, source } = await request.json();
    const [result] = await connection.execute(
      `UPDATE movies 
       SET title = ?, thumbnail = ?, video = ?, source = ?, caterogy_id = ?, active = ? 
       WHERE id = ?`,
      [title, thumbnail, video, source, caterogy_id, 1, id]
    );

    if (result.affectedRows === 1) {
      return NextResponse.json({ message: "Movie updated successfully" }, { status: 200 });
    } else {
      return NextResponse.json({ message: "Movie not found" }, { status: 404 });
    }
  } catch (err) {
    return NextResponse.error("Server error", 500);
  }
}
