"use client";
import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/user/login", {
        username,
        password,
      });
      // Lưu token vào cookie
      if(response.data.role==='admin'){
        Cookies.set("tokenadmin", response.data.token, { expires: 7 });
        router.push('/admin');
      }else{
        router.push('/');
      }
    } catch (error) {
      console.log("Đã có lỗi xảy ra. Vui lòng thử lại.", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 border border-gray-300 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">
          Đăng Nhập
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              className="block text-gray-600 text-sm font-medium mb-2"
              htmlFor="username"
            >
              Tên đăng nhập
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Nhập tên đăng nhập của bạn"
            />
          </div>

          <div className="mb-6">
            <label
              className="block text-gray-600 text-sm font-medium mb-2"
              htmlFor="password"
            >
              Mật khẩu
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Nhập mật khẩu của bạn"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white font-semibold py-3 rounded-lg hover:bg-blue-600 transition duration-300"
          >
            Đăng Nhập
          </button>
        </form>
        <p className="text-sm text-center text-gray-600 mt-6">
          Bạn chưa có tài khoản?{" "}
          <a href="/signup" className="text-blue-500 hover:underline">
            Đăng ký
          </a>
        </p>
      </div>
    </div>
  );
}
