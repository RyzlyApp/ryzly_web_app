import type { Metadata } from "next";
import { capitalizeFLetter } from "@/helper/utils/capitalLetter";
import { IChallenge } from "@/helper/model/challenge";

interface BackendResponse {
  data: { data: IChallenge };
}

interface RouteParams {
  params: { id: string };
}

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";
export const revalidate = 0;

export async function generateMetadata(
  { params }: RouteParams
): Promise<Metadata> {

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL!;
  const domain = process.env.NEXT_PUBLIC_DOMAIN_URL!;

  try {
    const res = await fetch(`${baseUrl}/challenge/single/${params.id}`, {
      cache: "no-store",
      next: { revalidate: 0 }
    });

    if (!res.ok) return {};

    const json: BackendResponse = await res.json();
    const item = json?.data?.data;

    if (!item) return {};

    const title = capitalizeFLetter(item.title);
    const description = item.description || "";

    return {
      title,
      description,
      openGraph: {
        title,
        description,
        url: `${domain}/challenges/${params.id}`,
        images: [{ url: item.url, width: 1200, height: 630 }],
        type: "website"
      },
      twitter: {
        card: "summary_large_image",
        title,
        description,
        images: [item.url]
      }
    };

  } catch {
    return {};
  }
}
