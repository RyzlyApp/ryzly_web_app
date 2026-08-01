// hooks/useBack.ts
"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useRef } from "react";

export function useBack() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const isNavigating = useRef(false);

    const buildUrl = (params: URLSearchParams) => {
        const queryString = params.toString();
        return queryString ? `${pathname}?${queryString}` : pathname;
    };

    const back = () => {
        if (isNavigating.current) return;

        const params = new URLSearchParams(searchParams.toString());
        const hasChat = params.get("chat") === "true";
        const hasGroup = params.get("group");

        if (hasChat) {
            isNavigating.current = true;
            params.delete("chat");
            router.replace(buildUrl(params));
            setTimeout(() => { isNavigating.current = false; }, 300);
        } else if (hasGroup) {
            isNavigating.current = true;
            params.delete("group");
            router.replace(buildUrl(params));
            setTimeout(() => { isNavigating.current = false; }, 300);
        } else {
            router.back();
        }
    };

    return { back };
}