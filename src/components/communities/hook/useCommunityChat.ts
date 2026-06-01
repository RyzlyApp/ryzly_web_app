// hooks/useCommunityChat.ts
"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";

export function useCommunityChat() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const pathname = usePathname();

    const isExpanded = searchParams.get("chat") === "true";

    const toggleChat = () => {
        const params = new URLSearchParams(searchParams.toString());

        if (isExpanded) {
            params.delete("chat");
        } else {
            params.set("chat", "true");
        }

        const newUrl = params.size > 0 ? `${pathname}?${params.toString()}` : pathname;
        router.replace(newUrl);
    };

    return { isExpanded, toggleChat };
}