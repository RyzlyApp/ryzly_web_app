"use client";
import { AdminSidebar, AdminNavbar } from "@/components/adminlayout";
import { ModalProvider } from "@/contexts/ModalContext";
import { ReactNode } from "react";
import { usePathname } from "next/navigation";

interface AdminLayoutProps {
  children: ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const pathname = usePathname();

  const isAuthPage =
    pathname?.includes("/admin/login") || pathname?.includes("/admin/signup");

  if (isAuthPage) {
    return <>{children}</>;
  }

  return (
    <ModalProvider>
      <div className="w-screen h-screen flex overflow-hidden text-black bg-[#EBE6E8]">
        <div className="w-fit h-screen lg:flex hidden">
          <AdminSidebar />
        </div>
        <div className="w-full flex flex-col h-screen overflow-y-hidden relative">
          <div className="w-full absolute z-10 bg-white top-0 h-fit">
            <AdminNavbar />
          </div>
          <div className="w-full h-screen relative">
            <div className="w-full absolute top-[70px] lg:top-[80px] bottom-0 overflow-x-hidden overflow-y-auto p-4 inset-x-0 bg-[#f6f6f9]">
              {children}
            </div>
          </div>
        </div>
      </div>
    </ModalProvider>
  );
}
