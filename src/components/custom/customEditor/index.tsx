"use client";

import React, { useEffect, useRef, useState } from "react";
import { useField } from "formik";
import Editor, {
    BtnBold,
    BtnItalic,
    BtnUnderline,
    createButton,
    Toolbar,
} from "react-simple-wysiwyg";
import { FormikWysiwygProps } from "./types";
import { useEditorSelection } from "./hooks/useEditorSelection";

import { insertImageHTML } from "./image/insertImage";
import { initImageSelection } from "./image/imageSelection";
import { initImageResize } from "./image/imageResize";
import { initImageDrag } from "./image/imageDrag";
import ImageModal from "./modal/imageModal";

import {
    RiListOrdered,
    RiListUnordered,
    RiIndentIncrease,
    RiIndentDecrease,
    RiCameraFill,
    RiCameraOffFill,
    RiVideoOnFill,
    RiVideoOffFill,
} from "react-icons/ri";
import VideoModal from "./modal/videoModal";
import { insertVideoHTML } from "./video/insertVideo";
import { useImageUpload } from "./image/useImageUpload";
import { Spinner } from "@heroui/react";

const FormikSimpleWYSIWYG = ({
    name,
    label,
    placeholder,
    height = "300px",
}: FormikWysiwygProps) => {
    const [field, , helpers] = useField(name);
    const editorRef = useRef<HTMLDivElement | null>(null);
    const { capture, restore } = useEditorSelection();
    const savedRangeRef = useRef<Range | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const [showImageModal, setShowImageModal] = useState(false);
    const [showVideoModal, setShowVideoModal] = useState(false);
    const [hasImage, setHasImage] = useState(false);
    const [hasVideo, setHasVideo] = useState(false);

    const [selectedVideo, setSelectedVideo] = useState<HTMLElement | null>(null);
    const [selectedImage, setSelectedImage] = useState<HTMLElement | null>(null);
    const [uploadProgress, setUploadProgress] = useState(0);

    const AWS_BUCKET_NAME = process.env.NEXT_PUBLIC_AWS_BUCKET_NAME as string;
    const AWS_REGION = process.env.NEXT_PUBLIC_AWS_REGION as string;

    // ---------------- Image Upload ----------------
    const uploadImageMutation = useImageUpload(
        (url: string) => {
            insertImage(`https://${AWS_BUCKET_NAME}.s3.${AWS_REGION}.amazonaws.com/${url}`)
        },
        (p: number) => setUploadProgress(p)
    );

    const handleFileSelect = (file: File) => {
        const formData = new FormData();
        formData.append("file", file);
        uploadImageMutation.mutate(formData);
    };

    // ---------------- Selection helpers ----------------
    const captureSelection = () => {
        const sel = window.getSelection();
        if (sel && sel.rangeCount > 0) savedRangeRef.current = sel.getRangeAt(0).cloneRange();
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

    const execInsertHTML = (html: string) => {
        restoreSelection();
        document.execCommand("insertHTML", false, html);
    };

    const ensureSelection = () => {
        const editor = editorRef.current;
        if (!editor) return;
    
        const sel = window.getSelection();
        if (sel && sel.rangeCount > 0) return;
    
        const range = document.createRange();
        range.selectNodeContents(editor);
        range.collapse(false); // move to end
    
        sel?.removeAllRanges();
        sel?.addRange(range);
    };
    
    const insertImage = (url: string) => {
        ensureSelection(); // 🔥 GUARANTEE cursor exists
    
        const html = insertImageHTML(url);
        document.execCommand("insertHTML", false, html);
    
        const editor = editorRef.current;
        if (!editor) return;
    
        // create spacer paragraph
        const p = document.createElement("p");
        p.innerHTML = "<br />";
        editor.appendChild(p);
    
        // move cursor below image
        const range = document.createRange();
        range.setStart(p, 0);
        range.collapse(true);
    
        const sel = window.getSelection();
        sel?.removeAllRanges();
        sel?.addRange(range);
    
        setIsLoading(false);
        setUploadProgress(0);
        setShowImageModal(false);
    };
    
    const insertVideo = (url: string) => {
        execInsertHTML(insertVideoHTML(url));
        setShowVideoModal(false);
    };

    const removeClosest = (selector: string) => {
        const sel = window.getSelection();
        if (sel?.anchorNode) {
            let node = sel.anchorNode;
            if (node.nodeType === Node.TEXT_NODE) node = node.parentNode!;
            const target = (node as HTMLElement).closest(selector);
            if (target) target.remove();
        }
    };

    // ---------------- Toolbar Buttons ----------------
    const BtnNumbered = createButton(
        "Numbered list",
        <button type="button" className=" w-full flex items-center justify-center">
            <RiListOrdered />
        </button>,
        () => exec("insertOrderedList")
    );
    const BtnBullet = createButton(
        "Bullet list",
        <button type="button" className=" w-full flex items-center justify-center">
            <RiListUnordered />
        </button>,
        () => exec("insertUnorderedList")
    );
    const BtnIndent = createButton(
        "Indent",
        <button type="button" className=" w-full flex items-center justify-center">
            <RiIndentIncrease />
        </button>,
        () => exec("indent")
    );
    const BtnOutdent = createButton(
        "Outdent",
        <button type="button" className=" w-full flex items-center justify-center">
            <RiIndentDecrease />
        </button>,
        () => exec("outdent")
    );

    const BtnImage = createButton(
        "Insert image",
        <button type="button" className=" w-full flex items-center justify-center">
            <RiCameraFill />
        </button>,
        () => {
            capture();
            setShowImageModal(true);
        }
    );

    const BtnRemoveImage = createButton(
        "Remove image",
        <button type="button" className=" w-full flex items-center justify-center">
            <RiCameraOffFill />
        </button>,
        () => {
            if (selectedImage) {
                selectedImage.remove();
                setSelectedImage(null);
                setHasImage(false);
            }
        }
    );

    const BtnVideo = createButton(
        "Insert video",
        <button type="button" className=" w-full flex items-center justify-center">
            <RiVideoOnFill />
        </button>,
        () => {
            captureSelection();
            setShowVideoModal(true);
        }
    );

    const BtnRemoveVideo = createButton(
        "Remove video",
        <button type="button" className=" w-full flex items-center justify-center">
            <RiVideoOffFill />
        </button>,
        () => {
            if (selectedVideo) {
                selectedVideo.remove();
                setSelectedVideo(null);
                setHasVideo(false);
            }
        }
    );

    // ---------------- Click-to-select for images/videos ----------------
    useEffect(() => {
        const editor = editorRef.current;
        if (!editor) return;

        const onClick = (e: MouseEvent) => {
            const target = e.target as HTMLElement;

            // Video selection
            const videoWrapper = target.closest("[data-editable-video]") as HTMLElement | null;
            if (videoWrapper) {
                e.preventDefault();
                setSelectedVideo(videoWrapper);
                editor.querySelectorAll("[data-editable-video]").forEach(
                    (v) => ((v as HTMLElement).style.outline = "")
                );
                videoWrapper.style.outline = "2px solid #3b82f6";
            } else {
                setSelectedVideo(null);
                editor.querySelectorAll("[data-editable-video]").forEach(
                    (v) => ((v as HTMLElement).style.outline = "")
                );
            }

            // Image selection
            const imageWrapper = target.closest("figure[data-image-wrapper]") as HTMLElement | null;
            if (imageWrapper) {
                e.preventDefault();
                setSelectedImage(imageWrapper);
                editor.querySelectorAll("figure[data-image-wrapper]").forEach(
                    (i) => ((i as HTMLElement).style.outline = "")
                );
                imageWrapper.style.outline = "2px solid #3b82f6";
            } else {
                setSelectedImage(null);
                editor.querySelectorAll("figure[data-image-wrapper]").forEach(
                    (i) => ((i as HTMLElement).style.outline = "")
                );
            }
        };

        editor.addEventListener("click", onClick);
        return () => editor.removeEventListener("click", onClick);
    }, []);

    // ---------------- Drag & Drop ----------------
    useEffect(() => {
        const editor = editorRef.current;
        if (!editor) return;

        const handleDragOver = (e: DragEvent) => e.preventDefault();

        const handleDrop = (e: DragEvent) => {
            setIsLoading(true);
            e.preventDefault();
            if (!e.dataTransfer?.files) return;

            const file = e.dataTransfer.files[0];
            if (file && file.type.startsWith("image/")) {
                handleFileSelect(file);
            }
        };

        editor.addEventListener("dragover", handleDragOver);
        editor.addEventListener("drop", handleDrop);
        return () => {
            editor.removeEventListener("dragover", handleDragOver);
            editor.removeEventListener("drop", handleDrop);
        };
    }, [uploadImageMutation]);

    // ---------------- Init image features ----------------
    useEffect(() => {
        const editor = editorRef.current;
        if (!editor) return;
        const cleanups = [initImageSelection(editor, setHasImage), initImageResize(editor), initImageDrag(editor)];
        return () => cleanups.forEach((c) => typeof c === "function" && c());
    }, []);

    // ---------------- Mutation Observer ----------------
    useEffect(() => {
        const editor = editorRef.current;
        if (!editor) return;
        const observer = new MutationObserver(() => {
            setHasImage(editor.querySelector("figure[data-image-wrapper]") !== null);
            setHasVideo(editor.querySelector("[data-editable-video]") !== null);
        });
        observer.observe(editor, { childList: true, subtree: true });
        return () => observer.disconnect();
    }, []);

    return (
        <>
            {label && <label>{label}</label>}

            <Editor
                ref={editorRef}
                value={field.value || ""}
                onChange={(e) => helpers.setValue(e.target.value)}
                placeholder={placeholder}
                style={{ minHeight: height, padding: "8px", lineHeight: "1.5" }}
            >
                <Toolbar>
                    <BtnBold />
                    <BtnItalic />
                    <BtnUnderline />
                    <BtnNumbered />
                    <BtnBullet />
                    <BtnIndent />
                    <BtnOutdent />
                    <BtnImage />
                    {hasImage && <BtnRemoveImage />}
                    <BtnVideo />
                    {hasVideo && <BtnRemoveVideo />}
                </Toolbar>
            </Editor>

            {showImageModal && (
                <ImageModal
                    onInsertFile={handleFileSelect}
                    onClose={() => setShowImageModal(false)}
                    progress={uploadProgress}
                />
            )}
            {showVideoModal && <VideoModal onInsert={insertVideo} onClose={() => setShowVideoModal(false)} />}
            {isLoading && <div className=" fixed inset-0 flex items-center justify-center bg-white/70 backdrop-blur-sm z-10">
                <Spinner size="lg" color="primary" />
            </div>}
        </>
    );
};

export default FormikSimpleWYSIWYG;
