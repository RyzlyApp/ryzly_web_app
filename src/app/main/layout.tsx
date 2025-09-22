import { LenisProvider } from "@/components/landing-page/LenisProvider";
import Navbar from "@/components/main-landing-page/Navbar";
import Footer from "@/components/main-landing-page/Footer";
import React from "react";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <LenisProvider>
      <Navbar />
      {children}
      <Footer />
    </LenisProvider>
  );
}
