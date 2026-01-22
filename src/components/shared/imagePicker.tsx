"use client";
import { previewImageAtom } from "@/helper/atom/image";
import { convertAndCompressToPng } from "@/helper/services/convertImage";
import { addToast, Avatar } from "@heroui/react";
import { useAtom } from "jotai";
import { useEffect, useRef, useState } from "react";
import { RiCameraAiLine, RiCloseLine, RiImage2Line } from "react-icons/ri";
import { CustomImage } from "../custom";
import { BiCamera } from "react-icons/bi";
import { userAtom } from "@/helper/atom/user";

export default function ImagePicker({
    type,
    preview,
    image,
    setImage,
}: {
    type?: "image" | "document" | "video" | "user" | "resources" | "chat" | "organisation";
    preview?: string;
    image: File | null;
    setImage: (by: File | null) => void;
}) {
    const [userState] = useAtom(userAtom);
    const { data } = userState;

    const [imageFile, setImageFile] = useState<File | string | null>(null);
    const [isLoading, setIsLoading] = useState<string | null>(null);
    const [previewUrl, setPreviewUrl] = useAtom(previewImageAtom);

    const fileInputRef = useRef<HTMLInputElement | null>(null);
 
    /* ---------------------------
       HANDLE FILE UPLOAD
    ---------------------------- */
    const handleSingleImage = async (files: FileList | null) => {
        setPreviewUrl(null); 
        setImage(null)

        if (!files || files.length === 0) return;

        const file = files[0];
        const TYPES = ["image/png", "image/jpg", "image/jpeg"];

        if (!TYPES.includes(file.type)) {
            addToast({
                title: "Error",
                description: "Unsupported file type. Use PNG or JPG.",
                color: "danger",
            });
            return;
        }

        try {
            const converted = await convertAndCompressToPng(
                file,
                800,
                1920,
                1080,
                0.9,
                setIsLoading
            );

            setImage(converted)

            setImageFile(converted);
        } catch (err) {
            console.error(err);
            addToast({
                title: "Upload Failed",
                description: "Could not process the image.",
                color: "danger",
            });
        } finally {
            setIsLoading(null);
        }
    };

    /* ---------------------------
       PREVIEW LOGIC PRIORITY:
       1. imageFile (uploaded)
       2. preview (existing)
       3. image (saved value)
    ---------------------------- */
    useEffect(() => {
        if (imageFile instanceof File) {
            const url = URL.createObjectURL(imageFile);
            setPreviewUrl(url);
            return () => URL.revokeObjectURL(url);
        }

        if (typeof imageFile === "string") {
            setPreviewUrl(imageFile);
            return;
        }

        if (preview) {
            setPreviewUrl(preview);
            return;
        }

        // if (image) {
        //     setPreviewUrl(image);
        //     return;
        // }

        setPreviewUrl(null);
    }, [imageFile, preview, image]);

    const openPicker = () => fileInputRef.current?.click();

    /* ---------------------------
       RENDER COMPONENT TYPES
    ---------------------------- */
    return (
        <>
            {/* Default */}
            {!type && (
                <button
                    type="button"
                    onClick={openPicker}
                    className="w-full h-[240px] rounded-xl bg-neonblue-50 flex justify-center items-center relative"
                >
                    {!isLoading ? (
                        <div className="w-11 h-11 bg-white rounded-full grid place-content-center z-10">
                            <RiCameraAiLine size={22} className="text-neonblue-600" />
                        </div>
                    ) : (
                        <p className="text-sm font-semibold z-10 text-white">{isLoading}</p>
                    )}

                    {previewUrl && (
                        <div className="absolute inset-0">
                            <CustomImage src={previewUrl} alt="image" fillContainer />
                        </div>
                    )}
                </button>
            )}

            {/* IMAGE PICKER */}
            {type === "image" && (
                <button
                    type="button"
                    onClick={openPicker}
                    className="bg-neonblue-50 w-full h-full rounded-lg flex flex-col gap-1 justify-center items-center relative"
                >
                    <RiImage2Line size={64} className="text-neonblue-600 z-20" />
                    <p className="text-sm font-semibold">
                        Drag an image here or{" "}
                        <span className="text-neonblue-600">Upload</span>
                    </p>

                    {previewUrl && (
                        <div className="absolute inset-0 bg-black opacity-50 rounded-lg">
                            <CustomImage src={previewUrl} alt="image" fillContainer />
                        </div>
                    )}
                </button>
            )}

            {/* USER AVATAR */}
            {type === "user" && (
                <div className="w-full flex justify-center">
                    <button type="button" onClick={openPicker} className="relative w-fit">
                        <Avatar
                            className="w-[90px] h-[90px] lg:w-[120px] lg:h-[120px]"
                            src={previewUrl || data?.profilePicture}
                            name={data?.firstName}
                        />
                        <div className="absolute bottom-0 right-0 p-2 bg-white rounded-full">
                            <BiCamera color="gray" />
                        </div>
                    </button>
                </div>
            )}


            {/* USER AVATAR */}
            {type === "organisation" && (
                <div className="w-full flex justify-center">
                    <button type="button" onClick={openPicker} className="relative w-fit">
                        <Avatar
                            className="w-[90px] h-[90px] lg:w-[120px] lg:h-[120px]"
                            src={previewUrl as string} 
                        />
                        <div className="absolute bottom-0 right-0 p-2 bg-white rounded-full">
                            <BiCamera color="gray" />
                        </div>
                    </button>
                </div>
            )}

            {/* RESOURCES */}
            {type === "resources" && (
                <div className="flex flex-col gap-2 w-full">
                    {previewUrl && (
                        <div className="w-[100px] h-[100px]">
                            <CustomImage src={previewUrl} fillContainer style={{ borderRadius: 8 }} alt={"add"} />
                        </div>
                    )}
                    <button type="button" onClick={openPicker} className="w-fit">
                        <RiImage2Line />
                    </button>
                </div>
            )}

            {/* CHAT */}
            {type === "chat" && (
                <div className="w-auto flex flex-col gap-2 relative">
                    {previewUrl && (
                        <div className="absolute -top-[210px] w-[200px] h-[200px] p-2 bg-white shadow rounded-2xl">
                            <CustomImage src={previewUrl} fillContainer style={{ borderRadius: 8 }} alt={"add"} />
                            <button
                                onClick={() => {
                                    setImage(null);
                                    setImageFile(null);
                                    setPreviewUrl(null);
                                }}
                                className="absolute top-3 right-3 w-5 h-5 bg-white rounded-full flex items-center justify-center"
                            >
                                <RiCloseLine />
                            </button>
                        </div>
                    )}
                    <button onClick={openPicker}>
                        <RiImage2Line />
                    </button>
                </div>
            )}

            {/* HIDDEN FILE INPUT */}
            <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={(e) => handleSingleImage(e.target.files)}
                hidden
            />
        </>
    );
}
