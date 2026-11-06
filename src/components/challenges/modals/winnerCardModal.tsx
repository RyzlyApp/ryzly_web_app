"use client";

import React, { useRef, useState } from "react";
import { Modal, ModalContent, ModalBody, Avatar } from "@heroui/react";
import { addToast } from "@heroui/toast";
import {
    RiCloseLine,
    RiTwitterXFill,
    RiFacebookFill,
    RiLinkedinFill,
    RiImageLine,
    RiDownload2Line,
    RiShareLine,
} from "react-icons/ri";
import { IChallenge, ILeadboard } from "@/helper/model/challenge";
import httpService from "@/helper/services/httpService";

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
    return `https://${bucket}.s3.${region}.amazonaws.com/${trimmed}`;
};

// Safely load an image with CORS (uses server-side proxy for cross-origin URLs so canvas is never tainted)
const loadImageSafe = (src?: string): Promise<HTMLImageElement | null> => {
    return new Promise((resolve) => {
        if (!src) {
            resolve(null);
            return;
        }

        const img = new Image();
        img.crossOrigin = "anonymous";
        img.onload = () => resolve(img);
        img.onerror = () => {
            // If direct crossOrigin load failed, fetch via our local image proxy
            if (src.startsWith("http://") || src.startsWith("https://")) {
                const proxyImg = new Image();
                proxyImg.crossOrigin = "anonymous";
                proxyImg.onload = () => resolve(proxyImg);
                proxyImg.onerror = () => resolve(null);
                proxyImg.src = `/api/proxy-image?url=${encodeURIComponent(src)}`;
            } else {
                resolve(null);
            }
        };

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

    // Calculate individual prize
    const winnerSlots = Number(challenge?.numberOfWinners) || 1;
    const totalPrize = Number(challenge?.winnerPrice) || 0;
    const individualPrizeNumber =
        winner?.prize !== undefined
            ? Number(winner.prize)
            : winnerSlots > 1
                ? Math.floor(totalPrize / winnerSlots)
                : totalPrize;

    // Display formatted prize e.g. #500,000
    const formattedPrize =
        individualPrizeNumber > 0
            ? `#${individualPrizeNumber.toLocaleString()}`
            : "#500,000";

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

    const winnerAvatar = formatAvatarUrl(rawWinnerAvatar);

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

    const hostLogo = formatAvatarUrl(rawHostLogo);

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

            // 6. Prize Section
            const prizeY = 530;
            ctx.save();
            ctx.fillStyle = "#1D1348";
            ctx.font = "900 90px system-ui, -apple-system, sans-serif";
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillText(formattedPrize, 540, prizeY);

            ctx.fillStyle = "#6B7280";
            ctx.font = "500 32px system-ui, -apple-system, sans-serif";
            ctx.fillText("Prize", 540, prizeY + 65);
            ctx.restore();

            // 7. Challenge Title (Auto-wrapped)
            const titleY = 700;
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

            // 8. Hosted by [Logo] [Host Name]
            const hostY = startY + lines.length * titleLineHeight + 40;
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

            // 9. Winner Profile (Bottom)
            const winnerY = 1140;
            const avatarRadius = 66;

            ctx.save();
            ctx.font = "800 44px system-ui, -apple-system, sans-serif";
            const nameWidth = ctx.measureText(winnerName).width;
            ctx.font = "500 30px system-ui, -apple-system, sans-serif";
            const roleWidth = ctx.measureText(winnerRole).width;
            const maxTextWidth = Math.max(nameWidth, roleWidth);
            const totalWinnerBlockWidth = avatarRadius * 2 + 24 + maxTextWidth;

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

            // Winner Name & Role
            ctx.save();
            ctx.textAlign = "left";
            ctx.textBaseline = "middle";

            ctx.fillStyle = "#1D1348";
            ctx.font = "800 44px system-ui, -apple-system, sans-serif";
            ctx.fillText(winnerName, textStartX, winnerY - 22);

            ctx.fillStyle = "#4B5563";
            ctx.font = "500 30px system-ui, -apple-system, sans-serif";
            ctx.fillText(winnerRole, textStartX, winnerY + 26);
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

    // Helper: Trigger browser file download
    const downloadImageFile = (dataUrl: string) => {
        const link = document.createElement("a");
        link.href = dataUrl;
        link.download = `${challengeTitle.replace(/[^a-zA-Z0-9_-]/g, "_")}_winner_card.png`;
        link.click();
    };

    // Helper: Upload image file to server for direct image URL
    const uploadCardImage = async (file: File): Promise<string | null> => {
        try {
            const formData = new FormData();
            formData.append("file", file);
            const res = await httpService.post("/upload/file", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            return res?.data?.data?.url || null;
        } catch {
            return null;
        }
    };

    // 1. Direct Download Button
    const handleDownloadCard = async () => {
        try {
            setIsProcessing(true);
            const cardData = await generateWinnerCardCanvas();
            if (cardData) {
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

    // 2. Primary "Share Image" button (Uses Web Share API for actual file sharing)
    const handleShareImage = async () => {
        setIsProcessing(true);
        try {
            const cardData = await generateWinnerCardCanvas();
            if (!cardData) {
                addToast({
                    title: "Error",
                    description: "Failed to generate card image. Please try again.",
                    color: "danger",
                });
                return;
            }

            // Share actual image file directly if supported (e.g. mobile Safari / Chrome)
            if (navigator.canShare && navigator.canShare({ files: [cardData.file] })) {
                await navigator.share({
                    files: [cardData.file],
                    title: `I WON! ${formattedPrize}`,
                    text: `I won ${formattedPrize} in the ${challengeTitle} on Ryzly! 🏆`,
                });
                return;
            }

            // Fallback for browsers that don't support native file sharing:
            // Copy image directly to clipboard + download image file
            if (navigator.clipboard && window.ClipboardItem) {
                try {
                    await navigator.clipboard.write([
                        new ClipboardItem({ "image/png": cardData.blob }),
                    ]);
                } catch (err) {
                    console.warn(err);
                }
            }
            downloadImageFile(cardData.dataUrl);

            addToast({
                title: "Winner Image Ready",
                description:
                    "Card image copied to clipboard & downloaded! You can paste or upload it directly.",
                color: "success",
            });
        } catch (error: any) {
            if (error?.name !== "AbortError") {
                console.error("Share failed:", error);
            }
        } finally {
            setIsProcessing(false);
        }
    };

    // 3. Copy Image to clipboard
    const handleCopyImage = async () => {
        setIsProcessing(true);
        try {
            const cardData = await generateWinnerCardCanvas();
            if (!cardData) {
                addToast({
                    title: "Error",
                    description: "Failed to generate image.",
                    color: "danger",
                });
                return;
            }

            let copied = false;
            if (navigator.clipboard && window.ClipboardItem) {
                try {
                    await navigator.clipboard.write([
                        new ClipboardItem({ "image/png": cardData.blob }),
                    ]);
                    copied = true;
                } catch (err) {
                    console.warn(err);
                }
            }

            downloadImageFile(cardData.dataUrl);

            addToast({
                title: copied ? "Image Copied!" : "Image Downloaded!",
                description: copied
                    ? "Winner card image copied to clipboard & downloaded! Paste it anywhere."
                    : "Winner card image downloaded!",
                color: "success",
            });
        } catch (e) {
            console.error(e);
        } finally {
            setIsProcessing(false);
        }
    };

    // 4. Social Platform Sharing (Shows the large winner card image on the post)
    const handlePlatformShare = async (
        platform: "twitter" | "facebook" | "linkedin"
    ) => {
        setIsProcessing(true);

        // Pre-open blank tab synchronously in the user gesture so popup blocker doesn't block it
        let targetWindow: Window | null = null;
        if (typeof window !== "undefined") {
            try {
                targetWindow = window.open("about:blank", "_blank");
            } catch {
                targetWindow = null;
            }
        }

        try {
            const cardData = await generateWinnerCardCanvas();
            if (!cardData) {
                if (targetWindow) targetWindow.close();
                addToast({
                    title: "Error",
                    description: "Failed to generate image. Please try again.",
                    color: "danger",
                });
                return;
            }

            // Copy image to clipboard so user can also paste it if desired
            if (navigator.clipboard && window.ClipboardItem) {
                try {
                    await navigator.clipboard.write([
                        new ClipboardItem({ "image/png": cardData.blob }),
                    ]);
                } catch (err) {
                    console.warn("Clipboard write failed:", err);
                }
            }

            // Download image file to device
            downloadImageFile(cardData.dataUrl);

            // Upload image to server for public S3 URL
            const uploadedUrl = await uploadCardImage(cardData.file);
            const domain = (
                process.env.NEXT_PUBLIC_DOMAIN_URL ||
                (typeof window !== "undefined"
                    ? window.location.origin
                    : "https://ryzly-web.vercel.app")
            ).replace(/\/$/, "");

            // Construct Open Graph share URL that displays the full card image on the post
            const shareUrl = uploadedUrl
                ? `${domain}/share/win/${challenge._id}?image=${encodeURIComponent(uploadedUrl)}&title=${encodeURIComponent(`I WON! ${formattedPrize}`)}&desc=${encodeURIComponent(`I won the ${challengeTitle} on Ryzly! 🏆`)}`
                : (typeof window !== "undefined" ? window.location.href : "");

            const caption = `I won ${formattedPrize} in the ${challengeTitle} on Ryzly! 🏆`;
            let destinationUrl = "";

            if (platform === "twitter") {
                destinationUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(caption)}&url=${encodeURIComponent(shareUrl)}`;
            } else if (platform === "linkedin") {
                destinationUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`;
            } else if (platform === "facebook") {
                destinationUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
            }

            if (targetWindow) {
                targetWindow.location.href = destinationUrl;
            } else {
                window.location.href = destinationUrl;
            }

            addToast({
                title: "Post Ready!",
                description: `Card image preview prepared for ${
                    platform.charAt(0).toUpperCase() + platform.slice(1)
                }! Image also downloaded & copied to clipboard.`,
                color: "success",
            });
        } catch (error) {
            if (targetWindow) targetWindow.close();
            console.error("Platform share error:", error);
            addToast({
                title: "Error",
                description: "Something went wrong. Please try again.",
                color: "danger",
            });
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
                                    Let your network know what you have achieved. Download the winner card or share it directly on social media
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
                                    <div className="w-7 h-7 rounded-full bg-[#596AFE] flex items-center justify-center text-white text-[11px] font-bold shadow-sm">
                                        •r•
                                    </div>
                                    <span className="text-[#1D1348] text-xl font-extrabold tracking-tight">
                                        ryzly
                                    </span>
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

                                {/* 3. Prize Amount */}
                                <div className="relative z-10 flex flex-col items-center mt-5 sm:mt-6">
                                    <h2 className="text-3xl sm:text-4xl font-black text-[#1D1348] tracking-tight">
                                        {formattedPrize}
                                    </h2>
                                    <span className="text-xs sm:text-sm font-medium text-gray-500 mt-0.5">
                                        Prize
                                    </span>
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
                                        <p className="text-xs text-gray-600 font-medium leading-tight mt-0.5">
                                            {winnerRole}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Social Share Section (Platforms supporting image display on posts) */}
                        <div className="w-full flex flex-col items-center gap-2.5 mt-1">
                            <span className="text-xs sm:text-sm font-semibold text-gray-900">
                                Share On:
                            </span>
                            <div className="flex items-center justify-center gap-4 px-1">
                                {/* Twitter / X */}
                                <button
                                    type="button"
                                    disabled={isProcessing}
                                    onClick={() => handlePlatformShare("twitter")}
                                    className="w-11 h-11 rounded-full bg-black text-white flex items-center justify-center hover:opacity-85 transition-opacity cursor-pointer shadow-sm disabled:opacity-50"
                                    title="Share image on X (Twitter)"
                                >
                                    <RiTwitterXFill size={20} />
                                </button>

                                {/* LinkedIn */}
                                <button
                                    type="button"
                                    disabled={isProcessing}
                                    onClick={() => handlePlatformShare("linkedin")}
                                    className="w-11 h-11 rounded-full bg-[#0A66C2] text-white flex items-center justify-center hover:opacity-85 transition-opacity cursor-pointer shadow-sm disabled:opacity-50"
                                    title="Share image on LinkedIn"
                                >
                                    <RiLinkedinFill size={21} />
                                </button>

                                {/* Facebook */}
                                <button
                                    type="button"
                                    disabled={isProcessing}
                                    onClick={() => handlePlatformShare("facebook")}
                                    className="w-11 h-11 rounded-full bg-[#1877F2] text-white flex items-center justify-center hover:opacity-85 transition-opacity cursor-pointer shadow-sm disabled:opacity-50"
                                    title="Share image on Facebook"
                                >
                                    <RiFacebookFill size={22} />
                                </button>

                                {/* Copy Image to Clipboard */}
                                <button
                                    type="button"
                                    disabled={isProcessing}
                                    onClick={handleCopyImage}
                                    className="w-11 h-11 rounded-full bg-[#5160E7] text-white flex items-center justify-center hover:opacity-85 transition-opacity cursor-pointer shadow-sm disabled:opacity-50"
                                    title="Copy card image to clipboard"
                                >
                                    <RiImageLine size={21} />
                                </button>
                            </div>
                        </div>

                        {/* Action Buttons: Share Image & Download Card */}
                        <div className="w-full flex flex-col sm:flex-row items-center gap-2.5 pt-1">
                            <button
                                type="button"
                                disabled={isProcessing}
                                onClick={handleShareImage}
                                className="w-full py-2.5 px-4 rounded-full bg-[#5160E7] hover:bg-[#4351d4] text-white text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer shadow-sm disabled:opacity-50"
                            >
                                <RiShareLine size={17} />
                                <span>{isProcessing ? "Preparing Image..." : "Share Image"}</span>
                            </button>
                            <button
                                type="button"
                                disabled={isProcessing}
                                onClick={handleDownloadCard}
                                className="w-full py-2.5 px-4 rounded-full border border-gray-200 hover:bg-gray-50 text-gray-700 text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-50"
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
