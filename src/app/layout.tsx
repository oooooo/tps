import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Index | 陸龜小學堂",
  description: "陸龜小學堂",
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
