import type { Metadata } from "next";
import "./globals.css";
import SocketProvider from "../context/SocketProvider";

export const metadata: Metadata = {
  title: "ChatMon",
  description: "A Scalable Chat Application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <SocketProvider>

      <body>
        {children}
      </body>
      </SocketProvider>
    </html>
  );
}
