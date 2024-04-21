import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/src/app/ui/globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    template: '%s | Work assistant',
    default: 'Work assistant',
  },
  description: "Increase efficiency and pleasure of your work.",
  metadataBase: new URL('https://work-assistant-puce.vercel.app'),
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className}`}>
          {children}
      </body>
    </html>
  );
}
