import type { Metadata } from "next";
import { Onest } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { Provider } from "@/provider";

const onest = Onest({
  variable: "--font-onest",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ryzly",
  description: "",
};

export const dynamic = "force-dynamic";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <Script
          id="ms-clarity"
          strategy="afterInteractive"
        >
          {`
            (function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "ua49b2z4uj");
          `}
        </Script>
      </head>

      <body className={onest.className}>
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
