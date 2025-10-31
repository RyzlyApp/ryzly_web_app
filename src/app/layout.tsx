import type { Metadata } from "next";
import { Onest } from "next/font/google";
import "./globals.css";
import { Provider } from "@/provider";

const onest = Onest({
  variable: "--font-onest",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Rhyzly",
  description: "",
};

export const dynamic = "force-dynamic";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en"> 
      <body className={onest.className}>
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
