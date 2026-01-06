export const initImageDrag = (editor: HTMLElement) => {
    let dragged: HTMLElement | null = null;
  
    editor.addEventListener("dragstart", (e) => {
      dragged = (e.target as HTMLElement).closest("[data-image-wrapper]");
    });
  
    editor.addEventListener("dragover", (e) => e.preventDefault());
  
    editor.addEventListener("drop", (e) => {
      e.preventDefault();
      const target = (e.target as HTMLElement).closest("[data-image-wrapper]");
      if (!dragged || !target || dragged === target) return;
  
      const rect = target.getBoundingClientRect();
      const after = e.clientY > rect.top + rect.height / 2;
  
      target.parentNode?.insertBefore(
        dragged,
        after ? target.nextSibling : target
      );
    });
  };
  