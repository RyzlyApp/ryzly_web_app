import { useEffect } from "react";

export function useScrollToInput(containerRef?: React.RefObject<HTMLElement | null>) {
  useEffect(() => {
    const ua = navigator.userAgent;
    const isIOS = /iPhone|iPad|iPod/.test(ua);

    if (!isIOS) return;

    const handler = (event: Event) => {
      const target = event.target as HTMLElement;
      if (!target || !(target instanceof HTMLInputElement || target instanceof HTMLTextAreaElement))
        return;

      // Delay scroll a bit until keyboard opens
      setTimeout(() => {
        const rect = target.getBoundingClientRect();
        const offset = 100; // padding space above keyboard

        // Scroll container or window so input is visible
        if (containerRef?.current) {
          containerRef.current.scrollTop += rect.top - offset;
        } else {
          window.scrollTo({
            top: window.scrollY + rect.top - offset,
            behavior: "smooth",
          });
        }
      }, 300);
    };

    document.addEventListener("focusin", handler);
    return () => document.removeEventListener("focusin", handler);
  }, [containerRef]);
}
