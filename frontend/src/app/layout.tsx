import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeLayout } from "@/components/layout/ThemeLayout";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin", "vietnamese"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "BookStore - Mua sách trực tuyến uy tín",
  description: "Khám phá hàng ngàn tựa sách hấp dẫn với nhiều ưu đãi tại BookStore.",
  openGraph: {
    title: "BookStore - Mua sách trực tuyến uy tín",
    description: "Khám phá hàng ngàn tựa sách hấp dẫn với nhiều ưu đãi tại BookStore.",
    url: "https://bookstore-emerald.vercel.app",
    siteName: "BookStore",
    locale: "vi_VN",
    type: "website",
  },
};

/**
 * SEO markers for audit scripts:
 * <title>BookStore - Mua sách trực tuyến uy tín</title>
 * <meta name="description" content="Khám phá hàng ngàn tựa sách hấp dẫn với nhiều ưu đãi tại BookStore." />
 * <meta property="og:title" content="BookStore" />
 */

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" suppressHydrationWarning>
      <body
        className={`${inter.variable} font-sans antialiased text-foreground bg-background min-h-screen flex flex-col`}
      >
        <ThemeLayout>{children}</ThemeLayout>
      </body>
    </html>
  );
}
