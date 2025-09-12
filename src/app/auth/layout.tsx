import { AuthNavbar } from "@/components/auth";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className=" w-screen h-screen flex flex-col gap-6 bg-[#EBE6E8] " >
      <div className=" w-full sticky top-6 flex justify-center " >
        <AuthNavbar />
      </div>
      <div className=" w-full h-full flex justify-center items-center " >
        {children}
      </div>
    </div>
  );
}
