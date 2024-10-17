import connection from "@/lib/db";
import { NextResponse } from "next/server";

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