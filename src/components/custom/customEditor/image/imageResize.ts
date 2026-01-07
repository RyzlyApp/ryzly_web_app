export const initImageResize = (editor: HTMLElement) => {
    let img: HTMLImageElement | null = null;
    let startX = 0;
    let startWidth = 0;
  
    const down = (e: MouseEvent) => {
      const handle = (e.target as HTMLElement).closest("[data-resize-handle]");
      if (!handle) return;
  
      img = handle
        .closest("[data-image-wrapper]")
        ?.querySelector("img") as HTMLImageElement;
  
      if (!img) return;
  
      startX = e.clientX;
      startWidth = img.offsetWidth;
  
      document.addEventListener("mousemove", move);
      document.addEventListener("mouseup", up);
    };
  
    const move = (e: MouseEvent) => {
      if (img) img.style.width = `${startWidth + e.clientX - startX}px`;
    };
  
    const up = () => {
      img = null;
      document.removeEventListener("mousemove", move);
      document.removeEventListener("mouseup", up);
    };
  
    editor.addEventListener("mousedown", down);
    return () => editor.removeEventListener("mousedown", down);
  };
  