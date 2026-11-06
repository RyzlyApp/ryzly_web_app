import { Metadata } from "next";
import { redirect } from "next/navigation";

interface Props {
    params: Promise<{ id: string }>;
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export async function generateMetadata({
    params,
    searchParams,
}: Props): Promise<Metadata> {
    const { id } = await params;
    const search = await searchParams;

    const imageUrl =
        typeof search.image === "string"
            ? search.image
            : "https://ryzly-web.vercel.app/LogoLight.png";
    const title =
        typeof search.title === "string"
            ? search.title
            : "I WON! Winner on Ryzly";
    const description =
        typeof search.desc === "string"
            ? search.desc
            : "Check out my winner card on Ryzly!";

    return {
        title,
        description,
        openGraph: {
            title,
            description,
            images: [
                {
                    url: imageUrl,
                    width: 1080,
                    height: 1350,
                    alt: title,
                },
            ],
            type: "website",
        },
        twitter: {
            card: "summary_large_image",
            title,
            description,
            images: [imageUrl],
        },
    };
}

export default async function ShareWinPage({
    params,
}: Props) {
    const { id } = await params;
    // Redirect visitors directly to the challenge ended page
    redirect(`/dashboard/challenges/${id}/ended`);
}

