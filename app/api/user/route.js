import connection from "@/lib/db";
import { NextResponse } from "next/server";
import bcrypt from 'bcrypt';
export async function POST(request) {
    const { username, email, password } = await request.json();
  
    // Kiểm tra các trường bắt buộc
    if (!username || !email || !password) {
      return NextResponse.json(
        { message: "Tất cả các trường là bắt buộc." },
        { status: 400 }
      );
    }
  
    try {
      // Kiểm tra xem người dùng đã tồn tại hay chưa
      const [existingUser] = await connection.execute(
        "SELECT * FROM users WHERE email = ?",
        [email]
      );
      if (existingUser.length > 0) {
        return NextResponse.json(
          { message: "Email đã tồn tại." },
          { status: 409 }
        );
      }
  
      // Mã hóa mật khẩu trước khi lưu
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Chèn người dùng mới vào cơ sở dữ liệu
      const [result] = await connection.execute(
        "INSERT INTO users (username, email, password) VALUES (?, ?, ?)",
        [username, email, hashedPassword] // Lưu mật khẩu đã mã hóa
      );
  
      return NextResponse.json(
        { message: "Đăng ký thành công!" },
        { status: 201 }
      );
    } catch (error) {
      console.error("Error registering user:", error);
      return NextResponse.json(
        { message: "Đã có lỗi xảy ra, vui lòng thử lại." },
        { status: 500 }
      );
    }
  }