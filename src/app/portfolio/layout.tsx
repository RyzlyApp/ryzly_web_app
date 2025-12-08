
import { UnauthorisedLayout } from "@/components/shared";
export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <UnauthorisedLayout>
            {children}
        </UnauthorisedLayout>
    );
}
