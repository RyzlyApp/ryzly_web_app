import { AuthNavbar } from "@/components/auth";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className=" w-screen h-screen flex flex-col overflow-y-auto pb-6 gap-6 bg-[#EBE6E8] " >
      <div className=" w-full lg:sticky lg:pt-0 pt-6 top-6 px-4 flex justify-center " >
        <AuthNavbar />
      </div>
      <div className=" w-full h-full flex px-4 lg:justify-center lg:items-center " >
        {children}
      </div>
    </div>
  );
}
