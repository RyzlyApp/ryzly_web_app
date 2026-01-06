import { useRef } from "react";

export const useEditorSelection = () => {
  const savedRange = useRef<Range | null>(null);

  const capture = () => {
    const sel = window.getSelection();
    if (sel && sel.rangeCount > 0) {
      savedRange.current = sel.getRangeAt(0).cloneRange();
    }
  };

  const restore = (editor?: HTMLElement | null) => {
    const sel = window.getSelection();
    if (!sel || !savedRange.current) return;
    sel.removeAllRanges();
    sel.addRange(savedRange.current);
    editor?.focus();
  };

  return { capture, restore };
};
