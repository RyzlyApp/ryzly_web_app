import { NextRequest, NextResponse } from "next/server";

export async function GET(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const searchParams = req.nextUrl.searchParams;

        const escape = (str: string) =>
            str
                .replace(/&/g, "&amp;")
                .replace(/</g, "&lt;")
                .replace(/>/g, "&gt;")
                .replace(/"/g, "&quot;");

        const rawImage =
            searchParams.get("image") ||
            "https://ryzly-web.vercel.app/LogoLight.png";
        const imageUrl = escape(rawImage);
        const title = escape(searchParams.get("title") || "Ryzly");
        const description = escape(searchParams.get("desc") || "");
        const currentUrl = escape(req.url);

        const html = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>${title}</title>
    
    <!-- Open Graph (Facebook, LinkedIn) -->
    <meta property="og:type" content="website" />
    <meta property="og:title" content="${title}" />
    <meta property="og:description" content="${description}" />
    <meta property="og:image" content="${imageUrl}" />
    <meta property="og:image:secure_url" content="${imageUrl}" />
    <meta property="og:image:type" content="image/png" />
    <meta property="og:image:width" content="1080" />
    <meta property="og:image:height" content="1350" />
    <meta property="og:url" content="${currentUrl}" />

    <!-- Twitter / X -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${title}" />
    <meta name="twitter:image" content="${imageUrl}" />
  </head>
  <body style="margin:0;display:flex;align-items:center;justify-content:center;min-height:100vh;background:#EAEBFE;font-family:sans-serif;">
    <img src="${imageUrl}" alt="${title}" style="max-width:420px;width:100%;border-radius:24px;box-shadow:0 10px 25px rgba(0,0,0,0.12);" />
    <script>
      window.location.replace('/dashboard/challenges/${id}/ended');
    </script>
  </body>
</html>`;

        return new NextResponse(html, {
            headers: {
                "Content-Type": "text/html; charset=utf-8",
                "Cache-Control": "public, max-age=3600, s-maxage=3600",
            },
        });
    } catch (error) {
        console.error("Share win route error:", error);
        return new NextResponse("Server error", { status: 500 });
    }
}
