"use client";

import React, { useEffect, useRef, useState } from "react";
import { useField } from "formik";
import Editor, {
  BtnBold,
  BtnItalic,
  BtnUnderline,
  Toolbar,
  createButton,
} from "react-simple-wysiwyg";
import {
  RiAlignCenter,
  RiAlignLeft,
  RiAlignRight,
  RiCameraFill,
  RiCameraOffFill,
  RiListOrdered,
  RiListUnordered,
  RiIndentIncrease,
  RiIndentDecrease,
} from "react-icons/ri";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import httpService from "@/helper/services/httpService";
import { handleError } from "@/helper/utils/hanlderAxoisError";

/* ---------------- Utils ---------------- */

const ensureUrl = (url: string) =>
  /^https?:\/\//i.test(url) ? url : `https://${url}`;

const escapeAttr = (str: string) =>
  str
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");

/* ---------------- Props ---------------- */

interface Props {
  name: string;
  label?: string;
  placeholder?: string;
  height?: string | number;
}

/* ---------------- Component ---------------- */

const FormikSimpleWYSIWYG: React.FC<Props> = ({
  name,
  label,
  placeholder = "Type something...",
  height = "220px",
}) => {
  const [field, meta, helpers] = useField(name);
  const editorRef = useRef<HTMLDivElement | null>(null);
  const savedRangeRef = useRef<Range | null>(null);

  const [showImageModal, setShowImageModal] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState("");
  const [uploadProgress, setUploadProgress] = useState(0);
  const [hasSelectedImage, setHasSelectedImage] = useState(false);

  /* ---------------- Selection ---------------- */

  const captureSelection = () => {
    const sel = window.getSelection();
    if (sel && sel.rangeCount > 0) {
      savedRangeRef.current = sel.getRangeAt(0).cloneRange();
    }
  };

  const restoreSelection = () => {
    const sel = window.getSelection();
    if (!sel || !savedRangeRef.current) return;
    sel.removeAllRanges();
    sel.addRange(savedRangeRef.current);
    editorRef.current?.focus();
  };

  const exec = (cmd: string) => {
    restoreSelection();
    document.execCommand(cmd);
  };

  /* ---------------- Image Upload ---------------- */

  const AWS_BUCKET_NAME = process.env.NEXT_PUBLIC_AWS_BUCKET_NAME as string;
  const AWS_REGION = process.env.NEXT_PUBLIC_AWS_REGION as string;

  const uploadImage = useMutation({
    mutationFn: (data: FormData) =>
      httpService.post("/upload/file", data, {
        headers: { "Content-Type": "multipart/form-data" },
        onUploadProgress: (e) => {
          if (e.total) {
            setUploadProgress(Math.round((e.loaded * 100) / e.total));
          }
        },
      }),
    onError: (err: AxiosError) => handleError(err),
    onSuccess: (res) => {
      const url = res?.data?.data?.url;
      if (url) insertImage(`https://${AWS_BUCKET_NAME}.s3.${AWS_REGION}.amazonaws.com/${url}`);

      console.log(`https://${AWS_BUCKET_NAME}.s3.${AWS_REGION}.amazonaws.com/${url}`);
      
      setUploadProgress(0);
    },
  });


  const BtnNumbered = createButton(
    "Numbered list",
    <RiListOrdered />,
    () => exec("insertOrderedList")
  );

  const BtnBullet = createButton(
    "Bullet list",
    <RiListUnordered />,
    () => exec("insertUnorderedList")
  );

  const BtnIndent = createButton(
    "Indent",
    <RiIndentIncrease />,
    () => exec("indent")
  );

  const BtnOutdent = createButton(
    "Outdent",
    <RiIndentDecrease />,
    () => exec("outdent")
  );

  /* ---------------- Insert Image ---------------- */

  const insertImage = (rawUrl: string) => {
    restoreSelection();
    const url = ensureUrl(rawUrl.trim());

    const html = `
      <figure
        data-image-wrapper
        draggable="true"
        style="position:relative;margin:12px auto;text-align:center;"
      >
        <img
          src="${escapeAttr(url)}"
          style="max-width:100%;height:auto;cursor:pointer;"
        />

        <span
          data-resize-handle
          style="
            position:absolute;
            right:6px;
            bottom:28px;
            width:12px;
            height:12px;
            background:#2563eb;
            cursor:se-resize;
            display:none;
          "
        ></span>

        <figcaption
          contenteditable="true"
          style="margin-top:6px;font-size:14px;color:#555;outline:none;"
        >
          Type caption here...
        </figcaption>
      </figure>
      <p><br/></p>
    `;

    document.execCommand("insertHTML", false, html);
    setShowImageModal(false);
    setImageFile(null);
    setImageUrl("");
  };

  /* ---------------- Image Selection ---------------- */

  useEffect(() => {
    const editor = editorRef.current;
    if (!editor) return;

    const clearSelection = () => {
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

      clearSelection();

      if (wrapper) {
        wrapper.style.outline = "2px solid #2563eb";
        const handle = wrapper.querySelector(
          "[data-resize-handle]"
        ) as HTMLElement;
        if (handle) handle.style.display = "block";
        setHasSelectedImage(true);
      } else {
        setHasSelectedImage(false);
      }
    };

    editor.addEventListener("click", onClick);
    return () => editor.removeEventListener("click", onClick);
  }, []);

  /* ---------------- Resize Image ---------------- */

  useEffect(() => {
    const editor = editorRef.current;
    if (!editor) return;

    let img: HTMLImageElement | null = null;
    let startX = 0;
    let startWidth = 0;

    const onMouseDown = (e: MouseEvent) => {
      const handle = (e.target as HTMLElement).closest(
        "[data-resize-handle]"
      );
      if (!handle) return;

      e.preventDefault();
      img = handle
        .closest("[data-image-wrapper]")
        ?.querySelector("img") as HTMLImageElement;

      if (!img) return;

      startX = e.clientX;
      startWidth = img.offsetWidth;

      document.addEventListener("mousemove", onMouseMove);
      document.addEventListener("mouseup", onMouseUp);
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!img) return;
      img.style.width = `${startWidth + (e.clientX - startX)}px`;
    };

    const onMouseUp = () => {
      img = null;
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    };

    editor.addEventListener("mousedown", onMouseDown);
    return () => editor.removeEventListener("mousedown", onMouseDown);
  }, []);

  /* ---------------- Drag Image Reorder ---------------- */

  useEffect(() => {
    const editor = editorRef.current;
    if (!editor) return;

    let dragged: HTMLElement | null = null;

    const onDragStart = (e: DragEvent) => {
      dragged = (e.target as HTMLElement).closest(
        "[data-image-wrapper]"
      ) as HTMLElement;
    };

    const onDrop = (e: DragEvent) => {
      e.preventDefault();
      const target = (e.target as HTMLElement).closest(
        "[data-image-wrapper]"
      ) as HTMLElement | null;

      if (!dragged || !target || dragged === target) return;

      const rect = target.getBoundingClientRect();
      const after = e.clientY > rect.top + rect.height / 2;

      target.parentNode?.insertBefore(
        dragged,
        after ? target.nextSibling : target
      );
    };

    editor.addEventListener("dragstart", onDragStart);
    editor.addEventListener("dragover", (e) => e.preventDefault());
    editor.addEventListener("drop", onDrop);

    return () => {
      editor.removeEventListener("dragstart", onDragStart);
      editor.removeEventListener("drop", onDrop);
    };
  }, []);

  /* ---------------- Align & Remove ---------------- */

  const alignImage = (align: "left" | "center" | "right") => {
    const img = editorRef.current?.querySelector(
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

  const removeImage = () => {
    const img = editorRef.current?.querySelector(
      "[data-image-wrapper][style*='outline']"
    );
    img?.remove();
    setHasSelectedImage(false);
  };

  /* ---------------- Toolbar ---------------- */

  const BtnImage = createButton("Insert image", <RiCameraFill />, () => {
    captureSelection();
    setShowImageModal(true);
  });

  return (
    <div className="space-y-2">
      {label && <label className="font-medium">{label}</label>}

      <Editor
        ref={editorRef}
        value={field.value || ""}
        onChange={(e) =>
          helpers.setValue((e.target as HTMLTextAreaElement).value)
        }
        placeholder={placeholder}
        style={{ minHeight: height }}
      >
        <Toolbar>
          <BtnBold />
          <BtnItalic />
          <BtnUnderline />
          <BtnNumbered />
          <BtnBullet />
          <BtnIndent />
          <BtnOutdent />
          {/* {createButton("Ordered", <RiListOrdered />, () => exec("insertOrderedList"))}
          {createButton("Bullet", <RiListUnordered />, () => exec("insertUnorderedList"))}
          {createButton("Indent", <RiIndentIncrease />, () => exec("indent"))}
          {createButton("Outdent", <RiIndentDecrease />, () => exec("outdent"))} */}
          <BtnImage />

          {hasSelectedImage && (
            <>
              {createButton("Left", <RiAlignLeft />, () =>
                alignImage("left")
              )}
              {createButton("Center", <RiAlignCenter />, () =>
                alignImage("center")
              )}
              {createButton("Right", <RiAlignRight />, () =>
                alignImage("right")
              )}
              {createButton("Remove", <RiCameraOffFill />, removeImage)}
            </>
          )}
        </Toolbar>
      </Editor>

      {meta.touched && meta.error && (
        <p className="text-sm text-red-500">{meta.error}</p>
      )}

      {/* Image Modal */}
      {showImageModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-md rounded bg-white p-4">
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImageFile(e.target.files?.[0] || null)}
            />

            <div className="my-2 text-center text-xs">OR</div>

            <input
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="https://image-url.com"
              className="w-full rounded border px-3 py-2"
            />

            <div className="mt-4 flex justify-end gap-2">
              <button onClick={() => setShowImageModal(false)}>Cancel</button>
              {imageFile ? (
                <button
                  onClick={() => {
                    const fd = new FormData();
                    fd.append("file", imageFile);
                    uploadImage.mutate(fd);
                  }}
                >
                  Upload
                </button>
              ) : (
                <button onClick={() => insertImage(imageUrl)}>Insert</button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FormikSimpleWYSIWYG;
