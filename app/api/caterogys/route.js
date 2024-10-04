import connection from "@/lib/db";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.JWT_SECRET;
export const dynamic = 'force-dynamic';


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


export async function GET(request) {
  try {
    const [results] = await connection.execute(`SELECT * FROM caterogys`);
    return NextResponse.json({ results }, { status: 200 });
  } catch (err) {
    return NextResponse.error("Error message", 500);
  }
}



export async function POST(request) {
  try {
    const { title } = await request.json();
    const decoded = authenticateAdmin(request);
    const [result] = await connection.execute(`INSERT INTO caterogys (title) VALUES (?)`, [title]);
    return NextResponse.json({ id: result.insertId, title }, { status: 201 });
  } catch (err) {
    return NextResponse.error("Error message", 500);
  }
}


export async function PUT(request) {
  try {
    const { id, title } = await request.json();
    const decoded = authenticateAdmin(request);
    const [result] = await connection.execute(
      `UPDATE caterogys SET title = ? WHERE id = ?`,
      [title, id] 
    );
    if (result.affectedRows > 0) {
      return NextResponse.json({ message: "Category updated successfully" }, { status: 200 });
    } else {
      return NextResponse.json({ message: "Category not found" }, { status: 404 });
    }
  } catch (err) {
    return NextResponse.error("Error message", 500);
  }
}



export async function DELETE(request) {
  try {
    const { id } = await request.json(); // Lấy id từ yêu cầu

    const decoded = authenticateAdmin(request);

    const [result] = await connection.execute(
      `DELETE FROM caterogys WHERE id = ?`,
      [id]
    );

    if (result.affectedRows > 0) {
      return NextResponse.json({ message: "Category deleted successfully" }, { status: 200 });
    } else {
      return NextResponse.json({ message: "Category not found" }, { status: 404 });
    }
  } catch (err) {
    console.error(err); // In ra lỗi để dễ dàng gỡ lỗi
    return NextResponse.error("Error message", 500);
  }
}