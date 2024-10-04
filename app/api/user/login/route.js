import connection from "@/lib/db";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Khóa bí mật dùng để ký token
const SECRET_KEY = process.env.JWT_SECRET;

export async function POST(request) {
  const { username, password } = await request.json();

  // Kiểm tra các trường bắt buộc
  if (!username || !password) {
    return NextResponse.json(
      { message: "Tất cả các trường là bắt buộc." },
      { status: 400 }
    );
  }
  try {
    // Kiểm tra xem người dùng có tồn tại hay không
    const [user] = await connection.execute(
      "SELECT * FROM users WHERE username = ?",
      [username]
    );
    if (user.length === 0) {
      return NextResponse.json(
        { message: "Tên đăng nhập không tồn tại." },
        { status: 404 }
      );
    }

    // So sánh mật khẩu
    const isPasswordValid = await bcrypt.compare(password, user[0].password);
    if (!isPasswordValid) {
      return NextResponse.json(
        { message: "Mật khẩu không chính xác." },
        { status: 401 }
      );
    }

    // Tạo token
    const token = jwt.sign(
      { id: user[0].id, username: user[0].username ,role: user[0].role},
      SECRET_KEY,
      { expiresIn: "1h" }
    );
    return NextResponse.json(
      { message: "Đăng nhập thành công!", token, role: user[0].role},
      { status: 200 }
    );
  } catch (error) {
    console.error("Error logging in user:", error);
    return NextResponse.json(
      { message: "Đã có lỗi xảy ra, vui lòng thử lại." },
      { status: 500 }
    );
  }
}
