import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SidebarComponent } from "@toko-buku/components";

const inter = Inter({ subsets: ["latin"] });


export const metadata: Metadata = {
  title: {
    default: "Toko Buku",
    template: "%s | Toko Buku",
  },
  description: "Toko Buku website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
      <body className={inter.className}>

        <SidebarComponent></SidebarComponent>
        <div className="relative sm:fixed sm:left-64 sm:right-0 px-10">
          <div>
            {children}
          </div>
        </div>
        </body>
    </html>
  );
}
