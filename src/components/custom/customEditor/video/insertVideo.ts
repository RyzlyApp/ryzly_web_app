import { escapeAttr, ensureUrl, getYouTubeEmbedUrl } from "../utils";

export const insertVideoHTML = (rawUrl: string) => {
  const embedUrl = getYouTubeEmbedUrl(ensureUrl(rawUrl.trim()));
  if (!embedUrl) return "";

  return `
    <div
      data-editable-video
      contenteditable="false"
      draggable="true"
      style="margin:8px 0;position:relative;display:block;"
    >
      <div style="position:relative;padding-bottom:56.25%;height:0;overflow:hidden;">
        <iframe
          src="${escapeAttr(embedUrl)}"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
          style="position:absolute;inset:0;width:100%;height:100%;border:0;"
        ></iframe>
      </div>
    </div>
    <p><br/></p>
  `;
};
