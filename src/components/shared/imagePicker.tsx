"use client";
import { imageAtom, previewImageAtom } from "@/helper/atom/image";
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
}: {
    type?: "image" | "document" | "video" | "user" | "resources" | "chat";
    preview?: string;
}) {
    const [image, setImage] = useAtom(imageAtom);
    const [userState] = useAtom(userAtom);
    const [imageFile, setImageFile] = useState<File | string | null>(preview ?? null);
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const [isLoading, setIsLoading] = useState<string | null>(null);

    const { data } = userState;

    const handleButtonClick = () => {
        fileInputRef.current?.click();
    };

    const handleSingleImage = async (files: FileList | null) => {
        setPreviewUrl(null)
        setImage(null);
        if (!files || files.length === 0) return;

        const file = files[0];
        const TYPES = ["image/png", "image/jpg", "image/jpeg"];

        if (!TYPES.includes(file.type)) {
            addToast({
                title: "Error",
                description: "Unsupported file type. Use PNG or JPG.",
                color: "danger",
                timeout: 3000,
            });
            return;
        }

        try {
            const convertedFile = await convertAndCompressToPng(
                file,
                800,
                0.9,
                setIsLoading
            );

            setImage(convertedFile);
            setImageFile(convertedFile);
            
            // setPreviewUrl(URL?.createObjectURL(file));
        } catch (error) {
            console.error("Error converting image:", error);
            addToast({
                title: "Upload Failed",
                description: "Could not process the image.",
                color: "danger",
                timeout: 3000,
            });
        } finally {
            setIsLoading(null);
        }
    };

    // Sync Jotai atom -> local state
    useEffect(() => {
        setImageFile(image ?? null);
    }, [image]);

    // Preview URL management (handles File vs string)
    const [previewUrl, setPreviewUrl] = useAtom(previewImageAtom);

    useEffect(() => {
        setPreviewUrl(preview ?? null)
    }, [preview])

    useEffect(() => {
        // if (!imageFile) {
        //     setPreviewUrl(preview ?? null);
        //     return;
        // }

        if (imageFile instanceof File) {
            const objectUrl = URL?.createObjectURL(imageFile);
            setPreviewUrl(objectUrl);
            return () => URL.revokeObjectURL(objectUrl);
        }

        // imageFile is a string
        // setPreviewUrl(imageFile);
    }, [imageFile, preview]);

    return (
        <>
            {/* Default type */}
            {!type && (
                <button
                    type="button"
                    onClick={handleButtonClick}
                    className="w-full h-[240px] rounded-xl flex justify-center items-center bg-neonblue-50 relative"
                >
                    {isLoading ? (
                        <p className="text-sm font-semibold z-10 text-white">{isLoading}</p>
                    ) : (
                        <div className="w-11 h-11 rounded-full flex justify-center items-center z-10 bg-white">
                            <RiCameraAiLine className="text-neonblue-600" size={22} />
                        </div>
                    )}

                    {previewUrl && (
                        <div className="absolute inset-0">
                            <CustomImage src={previewUrl} alt="image" fillContainer />
                        </div>
                    )}
                </button>
            )}

            {/* Type = image */}
            {type === "image" && (
                <button
                    type="button"
                    onClick={handleButtonClick}
                    className="bg-neonblue-50 w-full h-full rounded-lg relative flex justify-center items-center flex-col gap-1"
                >
                    <RiImage2Line size={64} className="z-20 text-neonblue-600" />
                    <p className="text-sm font-semibold">
                        Drag an image here or{" "}
                        <span className="text-neonblue-600">Upload</span>
                    </p>
                    <p className="text-xs font-medium text-violet-300">
                        PDF, JPG or PNG, less than 10MB
                    </p>

                    {previewUrl && (
                        <div className="absolute inset-0 bg-black opacity-50 rounded-lg">
                            <CustomImage
                                src={previewUrl}
                                alt="image"
                                fillContainer
                                style={{ borderRadius: "8px" }}
                            />
                        </div>
                    )}
                </button>
            )}

            {/* Type = user */}
            {type === "user" && (
                <div className="w-full flex justify-center">
                    <button
                        onClick={handleButtonClick}
                        type="button"
                        className="relative w-fit"
                    >
                        <Avatar
                            className="w-[90px] h-[90px] lg:w-[120px] lg:h-[120px] text-full"
                            src={previewUrl || data?.profilePicture}
                            name={data?.fullName}
                        />
                        <div className="p-2 rounded-full bg-white grid place-content-center absolute right-0 bottom-0 cursor-pointer">
                            <BiCamera color="gray" />
                        </div>
                    </button>
                </div>
            )}

            {/* Type = resources */}
            {type === "resources" && (
                <div className="w-full flex flex-col gap-2">
                    {previewUrl && (
                        <div className="w-[100px] h-[100px]">
                            <CustomImage
                                src={previewUrl}
                                alt="image"
                                fillContainer
                                style={{ borderRadius: "8px" }}
                            />
                        </div>
                    )}
                    <button onClick={handleButtonClick} type="button" className="relative w-fit">
                        <RiImage2Line />
                    </button>
                </div>
            )}

            {/* Type = chat */}
            {type === "chat" && (
                <div className="w-auto flex flex-col gap-2">
                    {previewUrl && (
                        <div className="w-[200px] h-[200px] bg-white absolute p-2 rounded-2xl shadow -top-[210px] inset-x-0">
                            <CustomImage
                                src={previewUrl}
                                alt="image"
                                fillContainer
                                style={{ borderRadius: "8px" }}
                            />
                            <button
                                type="button"
                                onClick={() => {
                                    setImage(null)
                                    setPreviewUrl(null);
                                                                    }}
                                className="absolute top-3 right-3 w-5 h-5 rounded-full bg-white flex justify-center items-center"
                            >
                                <RiCloseLine />
                            </button>
                        </div>
                    )}
                    <button onClick={handleButtonClick} type="button" className="relative w-fit">
                        <RiImage2Line />
                    </button>
                </div>
            )}

            {/* Hidden file input */}
            <input
                type="file"
                multiple={false}
                accept="image/*"
                onChange={(e) => handleSingleImage(e.target.files)}
                ref={fileInputRef}
                style={{ display: "none" }}
            />
        </>
    );
}
