import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Jalani Bandele | Quant Finance, CS, Infrastructure",
  description:
    "A technical portfolio for Jalani Bandele across quantitative finance, computer science, infrastructure engineering, and community leadership.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
