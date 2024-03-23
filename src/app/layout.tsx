import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/src/app/ui/globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Work assistant",
  description: "Increase efficiency and pleasure of your work.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} p-3`}>
          {children}
      </body>
    </html>
  );
}
