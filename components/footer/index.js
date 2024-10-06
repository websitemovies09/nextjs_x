"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

function Footer() {
  const [currentDateTime, setCurrentDateTime] = useState("");
  const [onlineUsers, setOnlineUsers] = useState(0);
  const [usersDaySub, setUsersDaySub] = useState(0);
  const [usersCurDate, setUsersCurDate] = useState(0);

  useEffect(() => {
    const updateUserCounts = async () => {
      try {
        const [onlineResponse, yesterdayResponse, todayResponse] =
          await Promise.all([
            fetch("/api/usersOnline"),
            fetch("/api/usersOnline/usersdaysub"),
            fetch("/api/usersOnline/usercurday"),
          ]);
        if (!onlineResponse.ok || !yesterdayResponse.ok || !todayResponse.ok) {
          throw new Error("Error fetching user data");
        }
        const [onlineData, yesterdayData, todayData] = await Promise.all([
          onlineResponse.json(),
          yesterdayResponse.json(),
          todayResponse.json(),
        ]);
        setOnlineUsers(onlineData.onlineUsers);
        setUsersDaySub(
          yesterdayData.yesterdayOnlineUsers[0]?.max_online_count || 0
        );
        setUsersCurDate(todayData.todayOnlineUsers[0]?.max_online_count || 0);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    updateUserCounts();
  }, []);

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      setCurrentDateTime(now.toLocaleString());
    };

    updateDateTime();
    const interval = setInterval(updateDateTime, 1000);
    return () => clearInterval(interval);
  }, []);
  return (
    <footer className="flex flex-col items-center bg-gray-800 text-center text-surface dark:bg-neutral-700 dark:text-white lg:text-left">
      <div className="container p-6">
        <div className="grid gap-4 lg:grid-cols-2">
          <div className="mb-6 md:mb-0">
            <Link
              href="/"
              className="text-2xl font-bold mb-2 font-medium uppercase text-white"
            >
              <span className="text-yellow-400">SEX</span>
              NEW.XYZ
            </Link>
            <p className="mb-4 text-white text-sm		">
              SEXNEW.XYZ là trang web phim sex chỉ dành cho các bạn trên 20
              tuổi, xem phim JAV chỉ để giải trí, giải tỏa nhu cầu sinh lý,
              không bắt chước theo phim, tránh vi phạm pháp luật.
            </p>
          </div>
          <div className="mb-6 md:mb-0 text-center	lg:text-right">
            <h2 className="mb-2 font-medium uppercase text-yellow-400 text-lg	">
              {currentDateTime}
            </h2>
            <p className="mb-4 text-white">👩🏿‍🤝‍👩🏽 Hôm nay : {usersCurDate}</p>
            <p className="mb-4 text-white">👩🏿‍🤝‍👩🏽 Hôm qua : {usersDaySub}</p>
            <p className="mb-4 text-white">
              👩🏿‍🤝‍👩🏽 Người đang online : {onlineUsers}
            </p>
          </div>
          <div className="mb-6 md:mb-0">
            <h3 className="text-white font-bold	text-yellow-400 text-lg">
              Trải Nghiệm Giải Trí Dành Riêng Cho Người Trưởng Thành
            </h3>
            <p className="mb-4 text-white text-sm		">
              Chào mừng bạn đến với trang web giải trí chuyên biệt dành cho
              người trên 18 tuổi, nơi mang đến những bộ phim chất lượng cao được
              chọn lọc kỹ càng. Với kho tàng phong phú bao gồm các thể loại đa
              dạng, từ tình cảm lãng mạn đến những câu chuyện đầy cảm xúc, chúng
              tôi cam kết mang đến cho bạn trải nghiệm điện ảnh độc đáo, mới mẻ
              và không kém phần hấp dẫn.
            </p>
          </div>
          <div className="mb-6 md:mb-0">
            <h3 className="text-white font-bold	text-yellow-400 text-lg">An Toàn & Bảo Mật</h3>
            <p className="mb-4 text-white text-sm		">
              Sự an toàn của bạn là ưu tiên hàng đầu của chúng tôi. Chính vì
              vậy, mọi nội dung trên trang web đều được kiểm duyệt kỹ lưỡng để
              tuân thủ các quy định về pháp luật và an toàn thông tin. Chúng tôi
              bảo vệ quyền riêng tư của bạn với các công nghệ bảo mật tiên tiến,
              đảm bảo dữ liệu cá nhân và thói quen xem phim của bạn luôn được
              bảo vệ tối đa.
            </p>
          </div>
          <div className="mb-6 md:mb-0">
            <h3 className="text-white font-bold	text-yellow-400 text-lg">Trải Nghiệm Đỉnh Cao</h3>
            <p className="mb-4 text-white text-sm		">
              Đến với trang web, bạn sẽ được tận hưởng những bộ phim với chất
              lượng hình ảnh sắc nét, âm thanh sống động, mang lại trải nghiệm
              giải trí vượt trội. Với giao diện thân thiện và dễ sử dụng, chúng
              tôi đảm bảo bạn sẽ có những phút giây thư giãn thoải mái nhất. Dù
              là trên máy tính, điện thoại hay máy tính bảng, bạn đều có thể dễ
              dàng truy cập vào kho phim phong phú của chúng tôi.
            </p>
          </div>
          <div className="mb-6 md:mb-0">
            <h3 className="text-white font-bold	text-yellow-400 text-lg">
              Giới Hạn Độ Tuổi & Trách Nhiệm Người Dùng
            </h3>
            <p className="mb-4 text-white text-sm		">
              Chúng tôi cam kết chỉ cung cấp nội dung giải trí cho những người
              dùng trên 18 tuổi, và mọi người cần xác nhận độ tuổi trước khi
              truy cập. Đây là không gian dành riêng cho người trưởng thành, và
              chúng tôi luôn khuyến khích người dùng tuân thủ trách nhiệm cá
              nhân khi tham gia các hoạt động giải trí trực tuyến.
            </p>
          </div>
        </div>
      </div>
      {/*Copyright section*/}
      <div className="w-full bg-black/5 p-4 text-center text-white ">
        © 2023 Copyright:
        <a href="https://sexnew.xyz/">SEXNEW.XYZ</a>
      </div>
    </footer>
  );
}

export default Footer;
