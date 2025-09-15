import { AuthNavbar } from "@/components/auth";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className=" w-screen h-screen flex flex-col overflow-y-auto pb-6 gap-6 bg-[#EBE6E8] " > 
        {children} 
    </div>
  );
}
