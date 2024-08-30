import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Service Wallah",
  description: "Find the best service at Service Wallah",
  icons: {
    icon: '/icon.ico',
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Toaster position="bottom-right" richColors  />
      <body className={`${inter.className} bg-gray-100`}>{children}</body>
    </html>
  );
}
