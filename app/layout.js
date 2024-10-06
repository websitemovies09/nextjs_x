import localFont from "next/font/local";
import "./globals.css";
import Narbar from "@/components/narbar";
import ProviderRedux from "./ProviderRedux";
import Header from "@/components/header";
import Footer from "@/components/footer";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
  display: 'swap',
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
  display: 'swap',

});

export const metadata = {
  title: {
    default: "Phim sex Việt Nam - Xem Phim Sex Vietsub Phụ Đề Tiếng Việt",
    template: "%s - Phim sex Việt Nam - Xem Phim Sex hay - sex việt",
  },
  description:
    "SEXNEW - Xem phim sex HD tuyển chọn những bộ phim có nội dung hay và hấp dẫn. Phim có chất lượng tốt, hoàn toàn miễn phí, được cập nhật hằng ngày .",
  verification: {
    google: "CtSzcB_jS-lVpJrAl5pByn_xD2c0mK8WY7WT0I6CUbg",
  },
  openGraph: {
    title: " Phim Sex Việt Nam - Xem Sex Việt Online Hay - Chất Lượng HD ",
    url: "https://www.sexnew.xyz",
    description:
      " Tuyển chọn phim sex Việt Nam hay đỉnh chóp, xem online chất lượng HD không giật lag. Xem phim jav hd online miễn phí nhanh chất lượng cao full HD 1080p 2024, xem phim sex hay full hd không che diễn viên đẹp. Phim jav tuyển chọn nội dung hay và kích thích nhất.",
    type: "website",
  },
  keywords: ["sex viêt", "sẽ viet nam", "sex jav", "jav", "phim sẽ","sex and the city cast","sex offender registry","sex offenders near me","sexy red lip gloss","sex china","chin av","sẽ china","sextop1","javhd","sexviet","viet69","clipsex69","cliphot","sexnew"],
  
};

export default function RootLayout({ children }) {
  return (
    <ProviderRedux>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased p-2 bg-gray-800`}
        >
          <Header />
          <Narbar />
          {children}
          <Footer />
        </body>
      </html>
    </ProviderRedux>
  );
}
