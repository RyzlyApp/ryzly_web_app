import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const url = request.nextUrl.searchParams.get("url");

    if (!url) {
        return new NextResponse("Missing url parameter", { status: 400 });
    }

    try {
        const decodedUrl = decodeURIComponent(url);

        if (!decodedUrl.startsWith("http://") && !decodedUrl.startsWith("https://")) {
            return new NextResponse("Invalid URL", { status: 400 });
        }

        const response = await fetch(decodedUrl, {
            headers: {
                "User-Agent": "Mozilla/5.0 (compatible; Ryzly/1.0)",
            },
        });

        if (!response.ok) {
            return new NextResponse(`Failed to fetch image: ${response.status}`, {
                status: response.status,
            });
        }

        const contentType = response.headers.get("content-type") || "image/png";
        const buffer = await response.arrayBuffer();

        return new NextResponse(buffer, {
            status: 200,
            headers: {
                "Content-Type": contentType,
                "Access-Control-Allow-Origin": "*",
                "Cache-Control": "public, max-age=86400, s-maxage=86400",
            },
        });
    } catch (err: any) {
        console.error("Proxy image error:", err);
        return new NextResponse("Error fetching image", { status: 500 });
    }
}

