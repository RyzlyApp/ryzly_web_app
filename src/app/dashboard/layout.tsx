"use client"
import { BottomBar, Navbar, Sidebar } from "@/components/dashboardlayout"; 


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <div className=" w-screen h-screen flex overflow-hidden pb-6 text-black bg-[#EBE6E8] " >
      <div className=" w-fit h-screen lg:flex hidden " >
        <Sidebar />
      </div>
      <div className=" w-full flex flex-col h-screen overflow-y-hidden relative " >
        <div className=" w-full absolute z-10 bg-white top-0 h-fit " >
          <Navbar />
        </div>
        <div className=" w-full h-screen relative " >
          <div className=" w-full absolute top-[70px] lg:top-[80px] bottom-[56px] overflow-x-hidden overflow-y-auto lg:bottom-0 p-4 inset-x-0 bg-[#f6f6f9] " >
            {children}
          </div>
        </div>
        <div className=" w-full absolute z-10 lg:hidden bg-white bottom-0 inset-x-0 h-fit " >
          <BottomBar />
        </div>
      </div>
    </div>
  );
}
