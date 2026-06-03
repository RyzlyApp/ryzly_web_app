"use client"
import { UnauthorisedLayout } from "@/components/shared";
import { usePathname } from "next/navigation";
export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

    const pathname = usePathname()

    return (
        <UnauthorisedLayout footer={pathname === "/portolio" ? true : false} >
            {children}
        </UnauthorisedLayout>
    );
}
