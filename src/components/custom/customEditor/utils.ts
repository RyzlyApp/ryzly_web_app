export const ensureUrl = (url: string) =>
    /^https?:\/\//i.test(url) ? url : `https://${url}`;

export const escapeAttr = (str: string) =>
    str
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");

export function getYouTubeEmbedUrl(url: string): string {
    try {
        const ytUrl = new URL(url);

        if (ytUrl.hostname.includes("youtu.be")) {
            return `https://www.youtube.com/embed/${ytUrl.pathname.slice(1)}`;
        }

        if (ytUrl.searchParams.has("v")) {
            return `https://www.youtube.com/embed/${ytUrl.searchParams.get("v")}`;
        }

        if (ytUrl.pathname.includes("/shorts/")) {
            const id = ytUrl.pathname.split("/shorts/")[1];
            return `https://www.youtube.com/embed/${id}`;
        }

        if (ytUrl.pathname.includes("/embed/")) {
            return url;
        }

        return url;
    } catch {
        return url;
    }
}
