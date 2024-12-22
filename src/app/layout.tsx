import type { Metadata } from "next";
import "@/styles/reboot.scss";
import "@/styles/utility.scss";

export const metadata: Metadata = {
  title: "陸龜小學堂",
  description: "陸龜小學堂",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-Hant">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Noto+Sans:wght@400;700&family=Noto+Serif:wght@400;700&display=swap" rel="stylesheet" />
      </head>
      <body>{children}</body>
    </html>
  );
}
