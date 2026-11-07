"use client";

import React, { useEffect, useRef, useState } from "react";
import { Modal, ModalContent, ModalBody, Avatar } from "@heroui/react";
import { addToast } from "@heroui/toast";
import {
    RiCloseLine,
    RiTwitterXFill,
    RiFacebookFill,
    RiLinkedinFill,
    RiInstagramFill,
    RiImageLine,
    RiDownload2Line,
    RiShareLine,
} from "react-icons/ri";
import { IChallenge, ILeadboard } from "@/helper/model/challenge";
import httpService from "@/helper/services/httpService";
import html2canvas from "html2canvas";

interface WinnerCardModalProps {
    isOpen: boolean;
    onClose: () => void;
    challenge: IChallenge;
    winner?: {
        name?: string;
        role?: string;
        avatar?: string;
        prize?: string | number;
    };
    currentUser?: any;
    winnerRecord?: ILeadboard;
}

// Convert any avatar key or partial path to a valid full URL
const formatAvatarUrl = (url?: string): string => {
    if (!url || typeof url !== "string") return "";
    const trimmed = url.trim();
    if (!trimmed || trimmed === "undefined" || trimmed === "null") return "";
    if (
        trimmed.startsWith("http://") ||
        trimmed.startsWith("https://") ||
        trimmed.startsWith("data:") ||
        trimmed.startsWith("/")
    ) {
        return trimmed;
    }
    const bucket = process.env.NEXT_PUBLIC_AWS_BUCKET_NAME || "ryzly-apps";
    const region = process.env.NEXT_PUBLIC_AWS_REGION || "eu-north-1";
    return `https://${bucket}.s3.${region}.amazonaws.com/${trimmed.replace(/^\/+/, "")}`;
};

// Safely format avatar url and route through proxy to prevent CORS canvas tainting
const getSafeAvatarSrc = (url?: string): string => {
    const formatted = formatAvatarUrl(url);
    if (!formatted) return "";
    if (formatted.startsWith("http://") || formatted.startsWith("https://")) {
        return `/api/proxy-image?url=${encodeURIComponent(formatted)}`;
    }
    return formatted;
};

// Safely load an image with CORS (uses server-side proxy for cross-origin URLs so canvas is never tainted)
const loadImageSafe = (src?: string): Promise<HTMLImageElement | null> => {
    return new Promise((resolve) => {
        if (!src) {
            resolve(null);
            return;
        }

        // Route external URLs directly through our local CORS proxy first for speed and reliability
        if (src.startsWith("http://") || src.startsWith("https://")) {
            const proxyImg = new Image();
            proxyImg.crossOrigin = "anonymous";
            proxyImg.onload = () => resolve(proxyImg);
            proxyImg.onerror = () => resolve(null);
            proxyImg.src = `/api/proxy-image?url=${encodeURIComponent(src)}`;
            return;
        }

        const img = new Image();
        img.crossOrigin = "anonymous";
        img.onload = () => resolve(img);
        img.onerror = () => resolve(null);
        img.src = src;
    });
};

export default function WinnerCardModal({
    isOpen,
    onClose,
    challenge,
    winner,
    currentUser,
    winnerRecord,
}: WinnerCardModalProps) {
    const cardRef = useRef<HTMLDivElement | null>(null);
    const [isProcessing, setIsProcessing] = useState(false);
    const preparedCardRef = useRef<{
        blob: Blob;
        file: File;
        dataUrl: string;
    } | null>(null);
    const uploadedCardUrlRef = useRef<string | null>(null);

    // Industry & Category details
    const rawIndustry =
        challenge?.industry?.name ||
        (typeof challenge?.industry === "string" ? challenge?.industry : "") ||
        "Technology";

    const rawCategory =
        challenge?.category ||
        challenge?.tracks?.[0]?.name ||
        "Marketing";

    const challengeIndustry = rawIndustry;
    const challengeCategory =
        rawCategory.toLowerCase() === rawIndustry.toLowerCase() && challenge?.tracks?.[0]?.name
            ? challenge.tracks[0].name
            : rawCategory;

    // Winner details
    const winnerName =
        winner?.name ||
        winnerRecord?.fullName ||
        winnerRecord?.userFullname ||
        (winnerRecord?.firstName && winnerRecord?.lastName
            ? `${winnerRecord.firstName} ${winnerRecord.lastName}`
            : winnerRecord?.firstName) ||
        (currentUser?.firstName && currentUser?.lastName
            ? `${currentUser.firstName} ${currentUser.lastName}`
            : currentUser?.firstName) ||
        currentUser?.fullName ||
        "Jane Doe";

    const winnerRole =
        winner?.role ||
        (winnerRecord as any)?.track ||
        (winnerRecord as any)?.role ||
        challenge?.tracks?.[0]?.name ||
        currentUser?.track ||
        "Product Designer";

    const rawWinnerAvatar =
        winner?.avatar ||
        winnerRecord?.profilePicture ||
        currentUser?.profilePicture ||
        (currentUser as any)?.avatar ||
        (currentUser as any)?.image ||
        "";

    const winnerAvatar = getSafeAvatarSrc(rawWinnerAvatar);

    // Host details
    const hostName =
        challenge?.organization?.name ||
        (challenge?.creator?.firstName
            ? `${challenge.creator.firstName} ${challenge.creator.lastName || ""}`.trim()
            : "Prepfora");

    const rawHostLogo =
        challenge?.organization?.profilePicture ||
        challenge?.creator?.profilePicture ||
        "";

    const hostLogo = getSafeAvatarSrc(rawHostLogo);

    const challengeTitle =
        challenge?.title || "Prepfora Video Content marketing Challenge";

    // High-Resolution 1080x1350 Canvas 2D Generator
    const generateWinnerCardCanvas = async (): Promise<{
        blob: Blob;
        file: File;
        dataUrl: string;
    } | null> => {
        try {
            const canvas = document.createElement("canvas");
            canvas.width = 1080;
            canvas.height = 1350;
            const ctx = canvas.getContext("2d");
            if (!ctx) return null;

            // 1. Background Gradient (Soft Lavender)
            const bgGrad = ctx.createLinearGradient(0, 0, 0, 1350);
            bgGrad.addColorStop(0, "#EAEBFE");
            bgGrad.addColorStop(1, "#DCE1FE");
            ctx.fillStyle = bgGrad;
            ctx.fillRect(0, 0, 1080, 1350);

            // 2. Confetti & festive shapes (subtle pastel)
            ctx.save();
            ctx.globalAlpha = 0.35;
            ctx.fillStyle = "#F472B6";
            ctx.beginPath();
            ctx.arc(120, 140, 12, 0, Math.PI * 2);
            ctx.fill();

            ctx.fillStyle = "#818CF8";
            ctx.fillRect(220, 180, 24, 12);

            ctx.fillStyle = "#C084FC";
            ctx.beginPath();
            ctx.arc(920, 130, 14, 0, Math.PI * 2);
            ctx.fill();

            ctx.fillStyle = "#FACC15";
            ctx.fillRect(800, 210, 14, 28);

            ctx.fillStyle = "#60A5FA";
            ctx.beginPath();
            ctx.arc(180, 360, 10, 0, Math.PI * 2);
            ctx.fill();

            ctx.fillStyle = "#F472B6";
            ctx.fillRect(900, 420, 18, 18);

            ctx.fillStyle = "#A78BFA";
            ctx.beginPath();
            ctx.arc(100, 540, 12, 0, Math.PI * 2);
            ctx.fill();

            ctx.fillStyle = "#FDE047";
            ctx.beginPath();
            ctx.arc(960, 600, 14, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();

            // 3. Bottom Layered Wavy Curves
            // Layer 1
            ctx.save();
            ctx.fillStyle = "#D5D9FC";
            ctx.globalAlpha = 0.45;
            ctx.beginPath();
            ctx.moveTo(0, 950);
            ctx.bezierCurveTo(240, 840, 480, 1020, 720, 910);
            ctx.bezierCurveTo(860, 840, 980, 960, 1080, 920);
            ctx.lineTo(1080, 1350);
            ctx.lineTo(0, 1350);
            ctx.closePath();
            ctx.fill();
            ctx.restore();

            // Layer 2
            ctx.save();
            ctx.fillStyle = "#C7CCFB";
            ctx.globalAlpha = 0.65;
            ctx.beginPath();
            ctx.moveTo(0, 1050);
            ctx.bezierCurveTo(220, 960, 500, 1100, 750, 990);
            ctx.bezierCurveTo(890, 930, 990, 1030, 1080, 1000);
            ctx.lineTo(1080, 1350);
            ctx.lineTo(0, 1350);
            ctx.closePath();
            ctx.fill();
            ctx.restore();

            // 4. Ryzly Logo (Top Center)
            const logoY = 130;
            ctx.save();
            ctx.fillStyle = "#596AFE";
            ctx.beginPath();
            ctx.arc(460, logoY, 32, 0, Math.PI * 2);
            ctx.fill();

            ctx.fillStyle = "#FFFFFF";
            ctx.font = "bold 24px system-ui, -apple-system, sans-serif";
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillText("•r•", 460, logoY);

            ctx.fillStyle = "#1D1348";
            ctx.font = "800 52px system-ui, -apple-system, sans-serif";
            ctx.textAlign = "left";
            ctx.textBaseline = "middle";
            ctx.fillText("ryzly", 508, logoY + 2);
            ctx.restore();

            // 5. "I WON!" Headline
            const wonY = 360;
            ctx.save();
            ctx.fillStyle = "#1D1348";
            ctx.font = "900 130px system-ui, -apple-system, sans-serif";
            ctx.textAlign = "center";
            ctx.textBaseline = "alphabetic";
            ctx.fillText("I WON!", 540, wonY);

            const wonMetrics = ctx.measureText("I WON!");
            const exclamationRight = 540 + wonMetrics.width / 2;
            const exclamationTop = wonY - 110;

            // Action burst lines at top-right of !
            ctx.strokeStyle = "#1D1348";
            ctx.lineWidth = 7;
            ctx.lineCap = "round";
            ctx.beginPath();
            ctx.moveTo(exclamationRight + 12, exclamationTop + 30);
            ctx.lineTo(exclamationRight + 44, exclamationTop + 6);
            ctx.stroke();

            ctx.beginPath();
            ctx.moveTo(exclamationRight + 20, exclamationTop + 54);
            ctx.lineTo(exclamationRight + 65, exclamationTop + 40);
            ctx.stroke();

            ctx.beginPath();
            ctx.moveTo(exclamationRight + 4, exclamationTop + 8);
            ctx.lineTo(exclamationRight + 20, exclamationTop - 24);
            ctx.stroke();

            // Stylized Underline under "I WON!"
            const underlineY = wonY + 24;
            const ulStart = 540 - 240;
            const ulEnd = 540 + 240;
            ctx.beginPath();
            ctx.moveTo(ulStart, underlineY);
            ctx.bezierCurveTo(540 - 100, underlineY - 10, 540 + 100, underlineY - 12, ulEnd, underlineY + 2);
            ctx.bezierCurveTo(540 + 100, underlineY + 8, 540 - 100, underlineY + 6, ulStart, underlineY);
            ctx.fill();

            ctx.beginPath();
            ctx.moveTo(ulStart + 20, underlineY + 12);
            ctx.bezierCurveTo(540 - 60, underlineY + 6, 540 + 80, underlineY + 5, ulEnd - 20, underlineY + 14);
            ctx.lineWidth = 4;
            ctx.stroke();
            ctx.restore();

            // Helper for drawing rounded pill
            const drawPill = (
                c: CanvasRenderingContext2D,
                x: number,
                y: number,
                w: number,
                h: number,
                r: number,
                fillColor: string,
                strokeColor?: string
            ) => {
                c.save();
                c.beginPath();
                if (typeof (c as any).roundRect === "function") {
                    (c as any).roundRect(x, y, w, h, r);
                } else {
                    c.moveTo(x + r, y);
                    c.lineTo(x + w - r, y);
                    c.arcTo(x + w, y, x + w, y + r, r);
                    c.lineTo(x + w, y + h - r);
                    c.arcTo(x + w, y + h, x + w - r, y + h, r);
                    c.lineTo(x + r, y + h);
                    c.arcTo(x, y + h, x, y + h - r, r);
                    c.lineTo(x, y + r);
                    c.arcTo(x, y, x + r, y, r);
                    c.closePath();
                }
                c.fillStyle = fillColor;
                c.fill();
                if (strokeColor) {
                    c.strokeStyle = strokeColor;
                    c.lineWidth = 2.5;
                    c.stroke();
                }
                c.restore();
            };

            // 6. Challenge Title (Auto-wrapped, directly under "I WON!")
            const titleY = 490;
            ctx.save();
            ctx.fillStyle = "#111827";
            ctx.font = "700 44px system-ui, -apple-system, sans-serif";
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";

            const words = challengeTitle.split(" ");
            let line = "";
            const lines: string[] = [];
            const maxTitleWidth = 860;
            for (let n = 0; n < words.length; n++) {
                const testLine = line + words[n] + " ";
                const metrics = ctx.measureText(testLine);
                if (metrics.width > maxTitleWidth && n > 0) {
                    lines.push(line.trim());
                    line = words[n] + " ";
                } else {
                    line = testLine;
                }
            }
            lines.push(line.trim());

            const titleLineHeight = 56;
            const startY = titleY - ((lines.length - 1) * titleLineHeight) / 2;
            lines.forEach((l, idx) => {
                ctx.fillText(l, 540, startY + idx * titleLineHeight);
            });
            ctx.restore();

            // 7. Hosted by [Logo] [Host Name]
            const hostY = startY + lines.length * titleLineHeight + 36;
            ctx.save();
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";

            ctx.font = "400 30px system-ui, -apple-system, sans-serif";
            const hostedText = "Hosted by ";
            const hostedWidth = ctx.measureText(hostedText).width;

            ctx.font = "700 32px system-ui, -apple-system, sans-serif";
            const hostNameWidth = ctx.measureText(hostName).width;

            const hostBadgeRadius = 18;
            const totalHostWidth = hostedWidth + hostBadgeRadius * 2 + 14 + hostNameWidth;
            let currentX = 540 - totalHostWidth / 2;

            ctx.fillStyle = "#6B7280";
            ctx.font = "400 30px system-ui, -apple-system, sans-serif";
            ctx.textAlign = "left";
            ctx.fillText(hostedText, currentX, hostY);
            currentX += hostedWidth;

            // Draw Host Logo Badge
            const hostImg = await loadImageSafe(hostLogo);
            ctx.save();
            ctx.beginPath();
            ctx.arc(currentX + hostBadgeRadius, hostY, hostBadgeRadius, 0, Math.PI * 2);
            ctx.clip();
            if (hostImg) {
                ctx.drawImage(
                    hostImg,
                    currentX,
                    hostY - hostBadgeRadius,
                    hostBadgeRadius * 2,
                    hostBadgeRadius * 2
                );
            } else {
                ctx.fillStyle = "#2563EB";
                ctx.fill();
                ctx.fillStyle = "#FFFFFF";
                ctx.font = "bold 16px system-ui, -apple-system, sans-serif";
                ctx.textAlign = "center";
                ctx.fillText(
                    hostName?.charAt(0)?.toUpperCase() || "P",
                    currentX + hostBadgeRadius,
                    hostY + 1
                );
            }
            ctx.restore();
            currentX += hostBadgeRadius * 2 + 14;

            ctx.fillStyle = "#111827";
            ctx.font = "700 32px system-ui, -apple-system, sans-serif";
            ctx.textAlign = "left";
            ctx.fillText(hostName, currentX, hostY);
            ctx.restore();

            // 8. Industry & Category Section (matching user's edited component with top labels)
            const badgesSectionY = hostY + 90;
            const pillH = 72;
            const pillRadius = 36;

            ctx.save();
            ctx.font = "700 32px system-ui, -apple-system, sans-serif";
            const indTextWidth = ctx.measureText(challengeIndustry).width;
            const catTextWidth = ctx.measureText(challengeCategory).width;

            const indPillW = indTextWidth + 84;
            const catPillW = catTextWidth + 84;
            const pillGap = 24;
            const totalBadgesW = indPillW + pillGap + catPillW;
            const startPillX = 540 - totalBadgesW / 2;
            const pillY = badgesSectionY + 36;
            const pillCenterY = pillY + pillH / 2;

            // Column 1 Label: "INDUSTRY"
            ctx.fillStyle = "#6B7280";
            ctx.font = "600 22px system-ui, -apple-system, sans-serif";
            ctx.textAlign = "center";
            ctx.fillText("INDUSTRY", startPillX + indPillW / 2, badgesSectionY + 12);

            // Industry Pill (Clean White with lavender border)
            drawPill(
                ctx,
                startPillX,
                pillY,
                indPillW,
                pillH,
                pillRadius,
                "rgba(255, 255, 255, 0.95)",
                "#C7CCFB"
            );

            // Industry Dot indicator
            ctx.fillStyle = "#596AFE";
            ctx.beginPath();
            ctx.arc(startPillX + 32, pillCenterY, 7, 0, Math.PI * 2);
            ctx.fill();

            // Industry Text
            ctx.fillStyle = "#1D1348";
            ctx.font = "700 32px system-ui, -apple-system, sans-serif";
            ctx.textAlign = "left";
            ctx.textBaseline = "middle";
            ctx.fillText(challengeIndustry, startPillX + 50, pillCenterY);

            // Column 2 Label: "CATEGORY"
            const catPillX = startPillX + indPillW + pillGap;
            ctx.fillStyle = "#6B7280";
            ctx.font = "600 22px system-ui, -apple-system, sans-serif";
            ctx.textAlign = "center";
            ctx.fillText("CATEGORY", catPillX + catPillW / 2, badgesSectionY + 12);

            // Category Pill (Navy)
            drawPill(
                ctx,
                catPillX,
                pillY,
                catPillW,
                pillH,
                pillRadius,
                "#1D1348"
            );

            // Category Dot indicator
            ctx.fillStyle = "#F472B6";
            ctx.beginPath();
            ctx.arc(catPillX + 32, pillCenterY, 6, 0, Math.PI * 2);
            ctx.fill();

            // Category Text
            ctx.fillStyle = "#FFFFFF";
            ctx.font = "700 32px system-ui, -apple-system, sans-serif";
            ctx.textAlign = "left";
            ctx.textBaseline = "middle";
            ctx.fillText(challengeCategory, catPillX + 50, pillCenterY);
            ctx.restore();

            // 9. Winner Profile (Bottom)
            const winnerY = 1170;
            const avatarRadius = 66;

            ctx.save();
            ctx.font = "800 48px system-ui, -apple-system, sans-serif";
            const nameWidth = ctx.measureText(winnerName).width;
            const totalWinnerBlockWidth = avatarRadius * 2 + 24 + nameWidth;

            const avatarCenterX = 540 - totalWinnerBlockWidth / 2 + avatarRadius;
            const textStartX = avatarCenterX + avatarRadius + 24;

            // Avatar Drop Shadow & White Border
            ctx.shadowColor = "rgba(0, 0, 0, 0.12)";
            ctx.shadowBlur = 16;
            ctx.shadowOffsetY = 6;
            ctx.fillStyle = "#FFFFFF";
            ctx.beginPath();
            ctx.arc(avatarCenterX, winnerY, avatarRadius + 5, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();

            // Avatar Image or Monogram
            const winnerImg = await loadImageSafe(winnerAvatar);
            ctx.save();
            ctx.beginPath();
            ctx.arc(avatarCenterX, winnerY, avatarRadius, 0, Math.PI * 2);
            ctx.clip();
            if (winnerImg) {
                ctx.drawImage(
                    winnerImg,
                    avatarCenterX - avatarRadius,
                    winnerY - avatarRadius,
                    avatarRadius * 2,
                    avatarRadius * 2
                );
            } else {
                const avatarGrad = ctx.createLinearGradient(
                    avatarCenterX - avatarRadius,
                    winnerY - avatarRadius,
                    avatarCenterX + avatarRadius,
                    winnerY + avatarRadius
                );
                avatarGrad.addColorStop(0, "#4E5EE4");
                avatarGrad.addColorStop(1, "#8B5CF6");
                ctx.fillStyle = avatarGrad;
                ctx.fill();

                ctx.fillStyle = "#FFFFFF";
                ctx.font = "bold 44px system-ui, -apple-system, sans-serif";
                ctx.textAlign = "center";
                ctx.textBaseline = "middle";
                const initials = winnerName
                    .split(" ")
                    .map((n: string) => n[0])
                    .join("")
                    .slice(0, 2)
                    .toUpperCase() || "W";
                ctx.fillText(initials, avatarCenterX, winnerY);
            }
            ctx.restore();

            // Winner Name ONLY (No winnerRole, matching user's edited component)
            ctx.save();
            ctx.textAlign = "left";
            ctx.textBaseline = "middle";
            ctx.fillStyle = "#1D1348";
            ctx.font = "800 48px system-ui, -apple-system, sans-serif";
            ctx.fillText(winnerName, textStartX, winnerY);
            ctx.restore();

            return new Promise((resolve) => {
                canvas.toBlob((blob) => {
                    if (!blob) {
                        resolve(null);
                        return;
                    }
                    const fileName = `${challengeTitle.replace(/[^a-zA-Z0-9_-]/g, "_")}_winner_card.png`;
                    const file = new File([blob], fileName, { type: "image/png" });
                    const dataUrl = canvas.toDataURL("image/png");
                    resolve({ blob, file, dataUrl });
                }, "image/png");
            });
        } catch (error) {
            console.error("Canvas card generation error:", error);
            return null;
        }
    };

    // Helper: Capture live DOM element via html2canvas so downloads match user's live JSX
    const captureFromDOM = async (): Promise<{
        blob: Blob;
        file: File;
        dataUrl: string;
    } | null> => {
        if (!cardRef.current) return null;
        try {
            if (typeof document !== "undefined" && document.fonts) {
                await document.fonts.ready;
            }

            const canvas = await html2canvas(cardRef.current, {
                scale: 3,
                useCORS: true,
                allowTaint: false,
                backgroundColor: null,
                logging: false,
            });

            return new Promise((resolve) => {
                canvas.toBlob((blob) => {
                    if (!blob) {
                        resolve(null);
                        return;
                    }
                    const fileName = `${challengeTitle.replace(/[^a-zA-Z0-9_-]/g, "_")}_winner_card.png`;
                    const file = new File([blob], fileName, { type: "image/png" });
                    const dataUrl = canvas.toDataURL("image/png");
                    resolve({ blob, file, dataUrl });
                }, "image/png");
            });
        } catch (e) {
            console.warn("DOM capture failed, falling back to Canvas 2D engine:", e);
            return null;
        }
    };

    // Helper: Get winner card data (Prioritizes exact DOM component, fallbacks to Canvas 2D)
    const getWinnerCardData = async (
        forceFresh = false
    ): Promise<{
        blob: Blob;
        file: File;
        dataUrl: string;
    } | null> => {
        if (!forceFresh && preparedCardRef.current) {
            return preparedCardRef.current;
        }

        const domData = await captureFromDOM();
        if (domData) {
            preparedCardRef.current = domData;
            return domData;
        }

        const canvasData = await generateWinnerCardCanvas();
        if (canvasData) {
            preparedCardRef.current = canvasData;
            return canvasData;
        }

        return null;
    };

    // Helper: Trigger browser file download
    const downloadImageFile = (dataUrl: string) => {
        const link = document.createElement("a");
        link.href = dataUrl;
        link.download = `${challengeTitle.replace(/[^a-zA-Z0-9_-]/g, "_")}_winner_card.png`;
        link.click();
    };

    // Helper: Upload image file to server for direct public S3 image URL
    const uploadCardImage = async (file: File): Promise<string | null> => {
        try {
            const formData = new FormData();
            formData.append("file", file);
            const res = await httpService.post("/upload/file", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            const rawUrl = res?.data?.data?.url || res?.data?.url;
            if (!rawUrl || typeof rawUrl !== "string") return null;
            if (rawUrl.startsWith("http://") || rawUrl.startsWith("https://")) {
                return rawUrl;
            }
            const bucket = process.env.NEXT_PUBLIC_AWS_BUCKET_NAME || "ryzly-apps";
            const region = process.env.NEXT_PUBLIC_AWS_REGION || "eu-north-1";
            return `https://${bucket}.s3.${region}.amazonaws.com/${rawUrl.replace(/^\/+/, "")}`;
        } catch (e) {
            console.error("Upload error:", e);
            return null;
        }
    };

    // Pre-generate the winner card image & pre-upload to S3 as soon as the modal opens
    useEffect(() => {
        if (!isOpen) return;
        let cancelled = false;

        const timer = setTimeout(async () => {
            const cardData = await getWinnerCardData(true);
            if (cancelled || !cardData) return;
            preparedCardRef.current = cardData;

            const uploadedUrl = await uploadCardImage(cardData.file);
            if (!cancelled && uploadedUrl) {
                uploadedCardUrlRef.current = uploadedUrl;
            }
        }, 300);

        return () => {
            cancelled = true;
            clearTimeout(timer);
        };
    }, [isOpen, challenge?._id, winnerName, winnerRole, winnerAvatar, hostName, hostLogo, challengeIndustry, challengeCategory, challengeTitle]);

    // 1. Direct Download Button
    const handleDownloadCard = async () => {
        try {
            setIsProcessing(true);
            const cardData = await getWinnerCardData(true);
            if (cardData) {
                preparedCardRef.current = cardData;
                downloadImageFile(cardData.dataUrl);
                addToast({
                    title: "Image Downloaded",
                    description: "Your winner card image has been downloaded!",
                    color: "success",
                });
            } else {
                addToast({
                    title: "Error",
                    description: "Failed to generate image. Please try again.",
                    color: "danger",
                });
            }
        } catch (error) {
            console.error("Error downloading card:", error);
            addToast({
                title: "Download Failed",
                description: "Failed to download winner card image.",
                color: "danger",
            });
        } finally {
            setIsProcessing(false);
        }
    };

    // 2. Primary "Share Image" button (Uses Web Share API for native file sharing - image only)
    const handleShareImage = async () => {
        setIsProcessing(true);
        try {
            const cardData = await getWinnerCardData();
            if (!cardData) {
                addToast({
                    title: "Error",
                    description: "Failed to generate card image. Please try again.",
                    color: "danger",
                });
                return;
            }
            preparedCardRef.current = cardData;

            // If browser supports Web Share with files, share ONLY the image file (no text, no link)
            if (typeof navigator !== "undefined" && navigator.canShare && navigator.canShare({ files: [cardData.file] })) {
                try {
                    await navigator.share({
                        files: [cardData.file],
                    });
                    return;
                } catch (e: any) {
                    if (e?.name === "AbortError") return;
                    console.warn("Native share error, falling back to download:", e);
                }
            }

            // Fallback for browsers that don't support native file sharing:
            let copied = false;
            if (navigator.clipboard && window.ClipboardItem) {
                try {
                    await navigator.clipboard.write([
                        new ClipboardItem({ "image/png": cardData.blob }),
                    ]);
                    copied = true;
                } catch (err) {
                    console.warn("Clipboard write failed:", err);
                }
            }
            downloadImageFile(cardData.dataUrl);

            addToast({
                title: copied ? "Image Copied!" : "Image Downloaded",
                description: copied
                    ? "Winner card image copied to clipboard & downloaded! Paste it directly into your post."
                    : "Winner card image downloaded!",
                color: "success",
            });
        } catch (error: any) {
            console.error("Share failed:", error);
            addToast({
                title: "Error",
                description: "Failed to share image. Please try again.",
                color: "danger",
            });
        } finally {
            setIsProcessing(false);
        }
    };

    // 3. Copy Image to clipboard
    const handleCopyImage = async () => {
        setIsProcessing(true);
        try {
            const cardData = await getWinnerCardData();
            if (!cardData) {
                addToast({
                    title: "Error",
                    description: "Failed to generate image.",
                    color: "danger",
                });
                return;
            }
            preparedCardRef.current = cardData;

            let copied = false;
            if (navigator.clipboard && window.ClipboardItem) {
                try {
                    await navigator.clipboard.write([
                        new ClipboardItem({ "image/png": cardData.blob }),
                    ]);
                    copied = true;
                } catch (err) {
                    console.warn("Clipboard write failed:", err);
                }
            }

            downloadImageFile(cardData.dataUrl);

            addToast({
                title: copied ? "Image Copied!" : "Image Downloaded!",
                description: copied
                    ? "Winner card image copied to clipboard & downloaded! Paste it anywhere to post only the image."
                    : "Winner card image downloaded!",
                color: "success",
            });
        } catch (e) {
            console.error(e);
        } finally {
            setIsProcessing(false);
        }
    };

    // 4. Social Platform Sharing (Shows ONLY the winner card image on the post - no caption text)
    const handlePlatformShare = async (
        platform: "twitter" | "facebook" | "linkedin" | "instagram"
    ) => {
        setIsProcessing(true);

        try {
            // If mobile/tablet supports native file sharing, share ONLY the image file directly
            const isMobileDevice =
                typeof navigator !== "undefined" &&
                /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

            if (
                isMobileDevice &&
                preparedCardRef.current &&
                typeof navigator !== "undefined" &&
                navigator.canShare &&
                navigator.canShare({ files: [preparedCardRef.current.file] })
            ) {
                try {
                    await navigator.share({
                        files: [preparedCardRef.current.file],
                    });
                    return;
                } catch (e: any) {
                    if (e?.name === "AbortError") return;
                }
            }

            // Copy pre-generated card image to clipboard immediately while document is focused
            if (preparedCardRef.current && navigator.clipboard && window.ClipboardItem) {
                try {
                    navigator.clipboard
                        .write([
                            new ClipboardItem({
                                "image/png": preparedCardRef.current.blob,
                            }),
                        ])
                        .catch(() => null);
                } catch {
                    // ignore
                }
            }

            const domain = (
                process.env.NEXT_PUBLIC_DOMAIN_URL ||
                (typeof window !== "undefined"
                    ? window.location.origin
                    : "https://ryzly-web.vercel.app")
            ).replace(/\/$/, "");

            // Use the uploaded winner card image URL (no caption text added to the post)
            const cardImageUrl = uploadedCardUrlRef.current || "";
            const shareUrl = cardImageUrl
                ? `${domain}/share/win/${challenge._id}?image=${encodeURIComponent(cardImageUrl)}`
                : `${domain}/share/win/${challenge._id}`;

            let destinationUrl = "";
            if (platform === "twitter") {
                destinationUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}`;
            } else if (platform === "linkedin") {
                destinationUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`;
            } else if (platform === "facebook") {
                destinationUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
            } else if (platform === "instagram") {
                destinationUrl = "https://www.instagram.com/";
            }

            if (destinationUrl && typeof window !== "undefined") {
                window.open(destinationUrl, "_blank", "noopener,noreferrer");
            }

            // Ensure card image is also generated & uploaded if it wasn't ready yet
            const cardData = await getWinnerCardData();
            if (cardData) {
                preparedCardRef.current = cardData;
                if (platform === "instagram") {
                    downloadImageFile(cardData.dataUrl);
                }
                if (!uploadedCardUrlRef.current) {
                    const url = await uploadCardImage(cardData.file);
                    if (url) uploadedCardUrlRef.current = url;
                }
            }

            const platformName =
                platform === "twitter"
                    ? "X (Twitter)"
                    : platform.charAt(0).toUpperCase() + platform.slice(1);

            addToast({
                title: "Post Opened!",
                description: `Winner card image ready on ${platformName}! (Also copied to your clipboard — press Cmd+V / Ctrl+V to paste directly).`,
                color: "success",
            });
        } catch (error) {
            console.warn("Platform share error:", error);
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            placement="center"
            size="md"
            hideCloseButton
            classNames={{
                base: "rounded-[32px] p-2 bg-white max-w-[480px] w-full mx-4 shadow-2xl overflow-hidden",
                backdrop: "bg-black/60 backdrop-blur-sm",
            }}
        >
            <ModalContent>
                {() => (
                    <ModalBody className="p-4 sm:p-6 flex flex-col gap-4">
                        {/* Modal Header */}
                        <div className="w-full flex items-start justify-between">
                            <div className="flex flex-col gap-1 pr-4">
                                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">
                                    Share your win
                                </h2>
                                <p className="text-xs sm:text-[13px] text-gray-500 font-normal leading-relaxed">
                                    Let your network know what you have achieved. Download the winner card, share it on social media and tag @ryzly
                                </p>
                            </div>
                            <button
                                type="button"
                                onClick={onClose}
                                className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 flex items-center justify-center transition-colors shrink-0 cursor-pointer"
                                aria-label="Close dialog"
                            >
                                <RiCloseLine size={20} />
                            </button>
                        </div>

                        {/* Winner Card Graphic (Reference: Image 1 & Image 2) */}
                        <div className="w-full flex justify-center py-1">
                            <div
                                ref={cardRef}
                                style={{
                                    background: "linear-gradient(180deg, #EAEBFE 0%, #DCE1FE 100%)",
                                }}
                                className="w-full max-w-[380px] rounded-3xl p-6 sm:p-7 relative overflow-hidden flex flex-col items-center shadow-lg border border-indigo-100/60 select-none"
                            >
                                {/* Background Decorative Confetti */}
                                <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-40">
                                    <div className="absolute top-5 left-7 w-2 h-2 rounded-full bg-pink-400 rotate-12" />
                                    <div className="absolute top-8 left-16 w-3 h-1.5 rounded-sm bg-indigo-400 rotate-45" />
                                    <div className="absolute top-4 right-8 w-2.5 h-2.5 rounded-full bg-purple-400" />
                                    <div className="absolute top-12 right-16 w-2 h-3 rounded-sm bg-yellow-400 -rotate-12" />
                                    <div className="absolute top-20 left-10 w-2.5 h-1.5 rounded-full bg-blue-400 rotate-12" />
                                    <div className="absolute top-28 right-10 w-3 h-3 rounded-sm bg-pink-400 rotate-45" />
                                    <div className="absolute top-36 left-6 w-2 h-2 rounded-full bg-purple-300" />
                                    <div className="absolute top-44 right-7 w-2 h-2.5 rounded-full bg-yellow-300 rotate-12" />
                                </div>

                                {/* Background Organic Waves at bottom */}
                                <svg
                                    viewBox="0 0 380 130"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="absolute bottom-0 inset-x-0 w-full pointer-events-none"
                                >
                                    <path
                                        d="M0 65C80 35 150 85 240 55C310 30 350 70 380 55V130H0V65Z"
                                        fill="#D5D9FC"
                                        fillOpacity="0.45"
                                    />
                                    <path
                                        d="M0 85C70 60 160 100 250 70C320 50 355 80 380 75V130H0V85Z"
                                        fill="#C7CCFB"
                                        fillOpacity="0.65"
                                    />
                                </svg>

                                {/* 1. Ryzly Logo */}
                                <div className="relative z-10 flex items-center gap-2 mb-6 sm:mb-7">
                                    <svg className=" w-24 " viewBox="0 0 239 68" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M34 0C52.7778 0 68.0008 15.2223 68.001 34C68.001 52.7779 52.7779 68.001 34 68.001C15.2223 68.0008 0 52.7778 0 34C0.000224727 15.2224 15.2224 0.000224713 34 0ZM31.0264 27.1562C29.3857 27.1562 28.4482 28.0361 28.4482 29.6768V42.4502H33.2529V31.376L40.9287 31.5518V27.3906L31.0264 27.1562ZM16.5537 25.3447C14.2885 25.3448 12.4523 27.1811 12.4521 29.4463C12.4521 31.7116 14.2885 33.5478 16.5537 33.5479C18.819 33.5479 20.6553 31.7116 20.6553 29.4463C20.6551 27.1811 18.819 25.3447 16.5537 25.3447ZM51.7695 25.3447C49.5044 25.3449 47.6681 27.1812 47.668 29.4463C47.668 31.7115 49.5043 33.5477 51.7695 33.5479C54.0349 33.5479 55.8711 31.7116 55.8711 29.4463C55.871 27.1811 54.0348 25.3447 51.7695 25.3447Z" fill="#596AFE" />
                                        <path d="M91.6475 26.061C91.6475 23.3403 93.4858 21.7962 96.7947 21.8697L116.501 22.2374V29.2229L101.133 28.9288V47.459H91.6475V25.9875V26.061Z" fill="#1D1348" />
                                        <path d="M155.637 21.7969V28.9295L183.285 29.4442L155.637 33.7827V41.5036L158.064 41.0624L185.712 35.5474V21.7969H155.637Z" fill="#1D1348" />
                                        <path d="M227.625 21.8672L219.757 40.0297L211.816 21.8672H200.859L214.904 45.9858L210.051 58.1922H219.684L224.537 45.9858L238.582 21.8672H227.625Z" fill="#1D1348" />
                                        <path d="M144.017 21.8672L136.149 40.0297L128.208 21.8672H117.325L131.296 45.9858L126.443 58.1922H136.149L141.003 45.9858L154.974 21.8672H144.017Z" fill="#1D1348" />
                                        <path d="M205.712 40.3981V47.5307H187.549V9.95566L191.961 9.80859H197.256V40.3981H205.712Z" fill="#1D1348" />
                                        <path d="M224.961 9.80859L220.549 9.95566V9.80859H224.961Z" fill="#1D1348" />
                                        <path d="M185.712 40.9883V47.5327H155.637V41.8707L158.064 41.4295L185.712 40.9883Z" fill="#1D1348" />
                                    </svg>
                                </div>

                                {/* 2. "I WON!" Headline with Action Rays & Underline */}
                                <div className="relative z-10 flex flex-col items-center">
                                    <div className="relative inline-block">
                                        <h1 className="text-5xl sm:text-6xl font-black text-[#1D1348] tracking-tight leading-none">
                                            I WON!
                                        </h1>

                                        {/* Action burst lines at top-right of the exclamation mark */}
                                        <svg
                                            width="30"
                                            height="30"
                                            viewBox="0 0 30 30"
                                            fill="none"
                                            className="absolute -top-3 -right-6 text-[#1D1348]"
                                        >
                                            <path
                                                d="M3 18L13 11"
                                                stroke="currentColor"
                                                strokeWidth="3.2"
                                                strokeLinecap="round"
                                            />
                                            <path
                                                d="M8 26L22 21"
                                                stroke="currentColor"
                                                strokeWidth="3.2"
                                                strokeLinecap="round"
                                            />
                                            <path
                                                d="M2 9L7 2"
                                                stroke="currentColor"
                                                strokeWidth="3.2"
                                                strokeLinecap="round"
                                            />
                                        </svg>
                                    </div>

                                    {/* Stylized Underline */}
                                    <svg
                                        width="230"
                                        height="14"
                                        viewBox="0 0 230 14"
                                        fill="none"
                                        className="mt-1 text-[#1D1348] w-full max-w-[210px] sm:max-w-[230px]"
                                    >
                                        <path
                                            d="M3 8C45 4 120 3 227 8C165 10 95 11 3 8Z"
                                            fill="currentColor"
                                        />
                                        <path
                                            d="M10 11C60 9 140 8 218 11"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                        />
                                    </svg>
                                </div>

                                {/* 4. Challenge Title */}
                                <div className="relative z-10 text-center mt-6 sm:mt-7 max-w-[280px]">
                                    <h3 className="text-base sm:text-lg font-bold text-gray-900 leading-snug">
                                        {challengeTitle}
                                    </h3>
                                </div>

                                {/* 5. Host Info */}
                                <div className="relative z-10 flex items-center gap-1.5 text-xs sm:text-sm text-gray-600 mt-2">
                                    <span className="font-normal text-gray-500">Hosted by</span>
                                    <div className="flex items-center gap-1.5">
                                        {hostLogo ? (
                                            <Avatar
                                                src={hostLogo}
                                                name={hostName}
                                                size="sm"
                                                className="w-4 h-4 rounded-full"
                                            />
                                        ) : (
                                            <div className="w-4 h-4 rounded-full bg-blue-600 text-white text-[9px] font-bold flex items-center justify-center">
                                                {hostName?.charAt(0)?.toUpperCase() || "P"}
                                            </div>
                                        )}
                                        <span className="font-bold text-gray-900 text-xs sm:text-sm">
                                            {hostName}
                                        </span>
                                    </div>
                                </div>

                                {/* 3. Industry & Category */}
                                <div className="relative z-10 flex flex-col items-center mt-5 sm:mt-6">

                                    <div className="flex items-center justify-center gap-2 flex-wrap max-w-[320px]">
                                        {/* Industry Pill */}
                                        <div className=" flex flex-col items-center gap-2 " >
                                            <span className="text-[10px] sm:text-[11px] font-semibold text-gray-500 uppercase tracking-widest mt-1.5">
                                                Industry
                                            </span>
                                            <div className="px-3.5 py-1.5 rounded-full bg-white/90 backdrop-blur-sm border border-indigo-200/70 shadow-sm flex items-center gap-1.5">
                                                <span className="w-2 h-2 rounded-full bg-[#596AFE]" />
                                                <span className="text-xs sm:text-[13px] font-bold text-[#1D1348] tracking-tight">
                                                    {challengeIndustry}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Category Pill */}
                                        <div className=" flex flex-col items-center gap-2 " >
                                            <span className="text-[10px] sm:text-[11px] font-semibold text-gray-500 uppercase tracking-widest mt-1.5">
                                                Category
                                            </span>
                                            <div className="px-3.5 py-1.5 rounded-full bg-[#1D1348] text-white shadow-sm flex items-center gap-1.5 border border-indigo-900/40">
                                                <span className="w-1.5 h-1.5 rounded-full bg-pink-400" />
                                                <span className="text-xs sm:text-[13px] font-bold tracking-tight">
                                                    {challengeCategory}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* 6. Winner Avatar & Details */}
                                <div className="relative z-10 flex items-center gap-3 mt-7 sm:mt-8 mb-2">
                                    <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white shadow-md bg-white shrink-0 flex items-center justify-center">
                                        <Avatar
                                            src={winnerAvatar || "/user.png"}
                                            name={winnerName}
                                            className="w-full h-full text-xs font-bold"
                                            classNames={{
                                                base: "w-full h-full bg-white",
                                                img: "object-cover w-full h-full",
                                            }}
                                        />
                                    </div>
                                    <div className="flex flex-col text-left">
                                        <h4 className="text-sm sm:text-base font-bold text-[#1D1348] leading-tight">
                                            {winnerName}
                                        </h4>
                                        {/* <p className="text-xs text-gray-600 font-medium leading-tight mt-0.5">
                                            {winnerRole}
                                        </p> */}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Social Share Section (Platforms supporting image display on posts) */}
                        <div className="w-full flex flex-col items-center gap-2.5 mt-1">
                            {/* <span className="text-xs sm:text-sm font-semibold text-gray-900">
                                Share 
                            </span> */}
                            <div className="flex items-center justify-center gap-4 px-1">
                                {/* Twitter / X */}
                                {/* <button
                                    type="button"
                                    disabled={isProcessing}
                                    onClick={() => handlePlatformShare("twitter")}
                                    className="w-11 h-11 rounded-full bg-black text-white flex items-center justify-center hover:opacity-85 transition-opacity cursor-pointer shadow-sm disabled:opacity-50"
                                    title="Share image on X (Twitter)"
                                >
                                    <RiTwitterXFill size={20} />
                                </button> */}

                                {/* LinkedIn */}
                                {/* <button
                                    type="button"
                                    disabled={isProcessing}
                                    onClick={() => handlePlatformShare("linkedin")}
                                    className="w-11 h-11 rounded-full bg-[#0A66C2] text-white flex items-center justify-center hover:opacity-85 transition-opacity cursor-pointer shadow-sm disabled:opacity-50"
                                    title="Share image on LinkedIn"
                                >
                                    <RiLinkedinFill size={21} />
                                </button> */}

                                {/* Facebook */}
                                {/* <button
                                    type="button"
                                    disabled={isProcessing}
                                    onClick={() => handlePlatformShare("facebook")}
                                    className="w-11 h-11 rounded-full bg-[#1877F2] text-white flex items-center justify-center hover:opacity-85 transition-opacity cursor-pointer shadow-sm disabled:opacity-50"
                                    title="Share image on Facebook"
                                >
                                    <RiFacebookFill size={22} />
                                </button> */}

                                {/* Instagram */}
                                {/* <button
                                    type="button"
                                    disabled={isProcessing}
                                    onClick={() => handlePlatformShare("instagram")}
                                    className="w-11 h-11 rounded-full bg-gradient-to-tr from-[#FD1D1D] via-[#E1306C] to-[#833AB4] text-white flex items-center justify-center hover:opacity-85 transition-opacity cursor-pointer shadow-sm disabled:opacity-50"
                                    title="Share image on Instagram"
                                >
                                    <RiInstagramFill size={21} />
                                </button> */}

                                {/* Copy Image to Clipboard */}
                                {/* <button
                                    type="button"
                                    disabled={isProcessing}
                                    onClick={handleCopyImage}
                                    className="w-11 h-11 rounded-full bg-[#5160E7] text-white flex items-center justify-center hover:opacity-85 transition-opacity cursor-pointer shadow-sm disabled:opacity-50"
                                    title="Copy card image to clipboard"
                                >
                                    <RiImageLine size={21} />
                                </button> */}
                            </div>
                        </div>

                        {/* Action Buttons: Share Image & Download Card */}
                        <div className="w-full flex justify-center flex-col sm:flex-row items-center gap-2.5 pt-1">
                            {/* <button
                                type="button"
                                disabled={isProcessing}
                                onClick={handleShareImage}
                                className="w-full py-2.5 px-4 rounded-full bg-[#5160E7] hover:bg-[#4351d4] text-white text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer shadow-sm disabled:opacity-50"
                            >
                                <RiShareLine size={17} />
                                <span>{isProcessing ? "Preparing Image..." : "Share Image"}</span>
                            </button> */}
                            <button
                                type="button"
                                disabled={isProcessing}
                                onClick={handleDownloadCard}
                                className="w-fit py-2.5 px-4 rounded-full border border-gray-200 hover:bg-gray-50 text-gray-700 text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-50"
                            >
                                <RiDownload2Line size={16} />
                                <span>Download Card</span>
                            </button>
                        </div>
                    </ModalBody>
                )}
            </ModalContent>
        </Modal>
    );
}
