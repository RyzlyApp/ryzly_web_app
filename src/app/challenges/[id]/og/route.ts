import { NextRequest, NextResponse } from "next/server";
import { IChallenge } from "@/helper/model/challenge";

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";
export const revalidate = 0;

interface BackendResponse {
    data: { data: IChallenge };
}

export async function GET(
    req: NextRequest,
    context: { params: Promise<{ id: string }> }
) {
    const { id } = await context.params;

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL!;
    const domain = process.env.NEXT_PUBLIC_DOMAIN_URL!;

    try {
        const res = await fetch(`${baseUrl}/challenge/single/${id}`, {
            cache: "no-store",
        });

        if (!res.ok) {
            return new NextResponse("Failed to fetch", { status: 500 });
        }

        const json: BackendResponse = await res.json();
        const item = json?.data?.data;

        if (!item) {
            return new NextResponse("Not found", { status: 404 });
        }

        const escape = (str: string) =>
            str
                .replace(/&/g, "&amp;")
                .replace(/</g, "&lt;")
                .replace(/>/g, "&gt;")
                .replace(/"/g, "&quot;");

        const title = escape(item.title);
        const description = escape(item.description);
        const imageUrl = item.url;

        const html = `
      <!DOCTYPE html>
      <html lang="en">
        <head>

          <meta property="og:type" content="website" />
          <meta property="og:title" content="${title}" />
          <meta property="og:description" content="${description}" />
          <meta property="og:image" content="${imageUrl}" />
          <meta property="og:url" content="${domain}/challenges/${id}" />

          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content="${title}" />
          <meta name="twitter:description" content="${description}" />
          <meta name="twitter:image" content="${imageUrl}" />

          <meta http-equiv="refresh" 
            content="0; url='${domain}/challenges/${id}?share=true'">

        </head>
        <body>Redirecting…</body>
      </html>
    `;

        return new NextResponse(html, {
            headers: {
                "Content-Type": "text/html",
            },
        });
    } catch (error) {
        console.error("OG route error:", error);
        return new NextResponse("Server error", { status: 500 });
    }
}
