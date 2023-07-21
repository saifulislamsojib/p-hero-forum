import Navbar from "@/components/Navbar/Navbar";
import Toaster from "@/components/ui/toast";
import Providers from "@/providers/Providers";
import LayoutProps from "@/types/LayoutProps";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

const inter = Poppins({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "900"],
  variable: "--font-roboto",
});

export const metadata: Metadata = {
  title: "P.H Forum",
  description: "This a forum for programmers and developers",
};

const RootLayout = ({ children }: LayoutProps) => {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-roboto`}>
        <Providers>
          <Navbar />
          <main className="container mt-5">{children}</main>
        </Providers>
        <Toaster />
      </body>
    </html>
  );
};

export default RootLayout;
