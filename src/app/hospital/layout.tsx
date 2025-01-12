import type { Metadata } from "next";
import "@/styles/reboot.scss";
import "@/styles/utility.scss";
import "./hospital.scss";

export const metadata: Metadata = {
  title: "醫院查詢系統 | 陸龜小學堂",
  description: "陸龜小學堂 醫院查尋系統",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-Hant">
      <body>{children}</body>
    </html>
  );
}
