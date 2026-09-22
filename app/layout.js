import { Manrope } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata = {
  title: "ZenlyHR — Timeless & Central HR Solutions",
  description: "ZenlyHR brings timeless HR solutions together — payroll, compliance, and people management unified.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={manrope.variable}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
