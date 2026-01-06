import { ensureUrl, escapeAttr } from "../utils";

export const insertImageHTML = (rawUrl: string) => {
  const url = ensureUrl(rawUrl.trim());

  return `
    <figure data-image-wrapper draggable="true"
      contenteditable="false"
      style="position:relative;margin:8px 0;text-align:center;display:block;">
      
      <img src="${escapeAttr(url)}"
        style="max-width:100%;height:auto;display:block;cursor:pointer;" />
      
      <span data-resize-handle
        style="position:absolute;right:6px;bottom:6px;
        width:12px;height:12px;background:#2563eb;
        cursor:se-resize;display:none;"></span>
      
      <figcaption contenteditable="true"
        style="margin-top:4px;font-size:14px;color:#555;">
        Type caption here...
      </figcaption>
    </figure>
    <p><br/></p>
  `;
};
