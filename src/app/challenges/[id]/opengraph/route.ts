import { NextRequest, NextResponse } from "next/server";
import { IChallenge } from "@/helper/model/challenge"; 

interface BackendResponse {
  data: IChallenge;
}

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL as string; 

    if (!baseUrl) {
      console.error("Missing env vars", { baseUrl });
      return new NextResponse("Server Misconfiguration", { status: 500 });
    }

    const apiUrl = `${baseUrl}challenge/single/${id}`;
    console.log("Calling backend:", apiUrl);

    const res: any = await fetch(apiUrl, { cache: "no-store" });

    if (!res.ok) {
      console.error("Backend fetch failed:", res.status, res.statusText);
      return new NextResponse("Failed to fetch challenge "+id, { status: 500 });
    }

    const json: BackendResponse = await res.json();
    const item = json?.data;

    if (!item) {
      console.error("Challenge not found for id:", id);
      return new NextResponse("Not found", { status: 404 });
    }

    console.log("Fetched challenge:", item);

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
          <meta property="og:url" content="/challenges/${id}" />

          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content="${title}" />
          <meta name="twitter:description" content="${description}" />
          <meta name="twitter:image" content="${imageUrl}" />

          <meta http-equiv="refresh" content="0; url='/challenges/${id}?share=true'">
        </head>
        <body>Redirecting…</body>
      </html>
    `;

    return new NextResponse(html, {
      headers: { "Content-Type": "text/html" },
    });
  } catch (error) {

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL as string; 
    console.error("OG route error:", error);
    return new NextResponse(`Server error ${baseUrl}challenge/single/`, { status: 500 });
  }
}
