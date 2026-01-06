export const alignSelectedImage = (
    editor: HTMLElement,
    align: "left" | "center" | "right"
  ) => {
    const img = editor.querySelector(
      "[data-image-wrapper][style*='outline']"
    ) as HTMLElement | null;
  
    if (!img) return;
  
    img.style.textAlign = align;
    img.style.margin =
      align === "left"
        ? "12px auto 12px 0"
        : align === "right"
        ? "12px 0 12px auto"
        : "12px auto";
  };
  
  export const removeSelectedImage = (editor: HTMLElement) => {
    editor
      .querySelector("[data-image-wrapper][style*='outline']")
      ?.remove();
  };
  