export const isGoogleMeetUrl = (url: string): boolean => {
    try {
        const parsed = new URL(url);
        return (
            parsed.hostname === "meet.google.com" &&
            parsed.pathname.length > 1 // has a meeting code e.g. /abc-defg-hij
        );
    } catch {
        return false;
    }
};