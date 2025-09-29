"use client"
import { imageAtom } from "@/helper/atom/image";
import { convertAndCompressToPng } from "@/helper/services/convertImage";
import { addToast, Avatar } from "@heroui/react";
import { useAtom } from "jotai";
import { useEffect, useRef, useState } from "react";
import { RiCameraAiLine, RiImage2Line } from "react-icons/ri";
import { CustomImage } from "../custom";
import { BiCamera } from "react-icons/bi";
import { userAtom } from "@/helper/atom/user";

export default function ImagePicker(
    { type }: { type?: "image" | "document" | "video" | "user" | "resources" }
) {

    const [image, setImage] = useAtom(imageAtom);
    const [userState] = useAtom(userAtom);
    const [imageFile, setImageFile] = useState<File | null>();
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const [isLoading, setIsLoading] = useState("");

    const { data } = userState


    const handleButtonClick = () => {
        fileInputRef.current?.click();
    };

    const handleSingleImage = async (files: FileList | null) => {

        setImage(null)
        if (!files || files.length === 0) return; // nothing selected

        const file = files[0]; // ✅ get the first file
        const TYPES = ["image/png", "image/jpg", "image/jpeg"];

        if (!TYPES.includes(file.type)) {
            addToast({
                title: "Error",
                description: "Unsupported file type",
                color: "danger",
                timeout: 3000
            })
            return;
        }

        try {
            const convertedFile = await convertAndCompressToPng(
                file,
                800,
                0.9,
                setIsLoading
            );

            // ✅ store converted file (using jotai or local state)
            setImage(convertedFile);
            setImageFile(convertedFile)

        } catch (error) {
            console.error("Error converting image:", error);
        }
    };

    useEffect(() => {
        setImageFile(image)
    }, [image])


    return (
        <>
            {!type && (
                <button type="button" onClick={handleButtonClick} className=" w-full h-[240px] rounded-xl flex justify-center items-center bg-neonblue-50 relative " >

                    {isLoading && (
                        <p className=" text-sm font-semibold z-10 text-white " >{isLoading}</p>
                    )}

                    {!isLoading && (
                        <div className=" w-11 h-11 rounded-full flex justify-center items-center z-10 bg-white " >
                            <RiCameraAiLine className=" text-neonblue-600  " size={"22px"} />
                        </div>
                    )}
                    {imageFile && (
                        <div className=" absolute inset-0 " >
                            <CustomImage
                                src={URL.createObjectURL(imageFile)}
                                alt="image"
                                fillContainer
                            />
                        </div>
                    )}
                </button>
            )}
            {type === "image" && (
                <button type="button" onClick={handleButtonClick} className=" bg-neonblue-50 w-full h-full rounded-lg relative flex justify-center items-center flex-col gap-1 " >
                    <RiImage2Line size={"64px"} className=" z-20 text-neonblue-600 " />
                    <p className=" text-sm font-semibold " >Drag an image here or <span className=" text-neonblue-600 " >Upload</span></p>
                    <p className=" text-xs font-medium text-violet-300 " >PDF, JPG or PNG, less than 10MB</p>

                    {imageFile && (
                        <div className=" absolute inset-0 bg-black opacity-50 rounded-lg " >
                            <CustomImage
                                src={URL.createObjectURL(imageFile)}
                                alt="image"
                                fillContainer
                                style={{ borderRadius: "8px" }}
                            />
                        </div>
                    )}
                </button>
            )}
            {type === "user" && (
                <div className=" w-full flex justify-center " >

                    <button onClick={handleButtonClick} type="button" className=" relative w-fit " >
                        <Avatar
                            className=" w-[90px] h-[90px]  lg:w-[120px] lg:h-[120px] text-full" src={imageFile ? URL.createObjectURL(imageFile) : data?.profilePicture} name={data?.fullName} />
                        <div className="p-2 rounded-full bg-white grid place-content-center absolute right-0 bottom-0 cursor-pointer">
                            <BiCamera color="gray" />
                        </div>
                    </button>
                </div>
            )}
            {type === "resources" && (
                <div className=" w-full flex flex-col gap-2 " >
                    {imageFile && (
                        <div className=" w-[100px] h-[100px] " >
                            <CustomImage
                                src={URL.createObjectURL(imageFile)}
                                alt="image"
                                fillContainer
                                style={{ borderRadius: "8px" }}
                            />
                        </div>
                    )}
                    <button onClick={handleButtonClick} type="button" className=" relative w-fit " >
                        <RiImage2Line />
                    </button>
                </div>
            )}
            <input
                type="file"
                multiple={false}
                accept="image/*"
                onChange={(e) => handleSingleImage(e.target.files)}
                ref={fileInputRef}
                style={{ display: 'none' }}
            />
        </>
    )
}