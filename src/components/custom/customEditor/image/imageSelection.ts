export const initImageSelection = (
    editor: HTMLElement,
    setHasImage: (v: boolean) => void
  ) => {
    const clear = () => {
      editor.querySelectorAll("[data-image-wrapper]").forEach((el) => {
        (el as HTMLElement).style.outline = "none";
        const handle = el.querySelector("[data-resize-handle]") as HTMLElement;
        if (handle) handle.style.display = "none";
      });
    };
  
    const onClick = (e: MouseEvent) => {
      const wrapper = (e.target as HTMLElement).closest(
        "[data-image-wrapper]"
      ) as HTMLElement | null;
  
      clear();
      if (!wrapper) return setHasImage(false);
  
      wrapper.style.outline = "2px solid #2563eb";
      const handle = wrapper.querySelector("[data-resize-handle]") as HTMLElement;
      if (handle) handle.style.display = "block";
      setHasImage(true);
    };
  
    editor.addEventListener("click", onClick);
    return () => editor.removeEventListener("click", onClick);
  };
  