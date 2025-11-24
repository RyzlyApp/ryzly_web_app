import AOSProvider from "@/components/AOSProvider";
import { LenisProvider } from "@/components/landing-page/LenisProvider";
// import Navbar from "@/components/main-landing-page/Navbar";
import Footer from "@/components/main-landing-page/Footer";
import React from "react";
import { UnauthorisedLayout } from "@/components/shared";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AOSProvider>
      <UnauthorisedLayout main={true} >
        <LenisProvider>
          {children}
          <Footer />
        </LenisProvider>
      </UnauthorisedLayout>
    </AOSProvider >
  );
}
