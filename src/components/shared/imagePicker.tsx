import { imageAtom } from "@/helper/atom/image";
import { convertAndCompressToPng } from "@/helper/services/convertImage";
import { addToast } from "@heroui/react";
import { useAtom } from "jotai";
import { useEffect, useRef, useState } from "react";
import { RiCameraAiLine } from "react-icons/ri";
import { CustomImage } from "../custom";

export default function ImagePicker() {

    const [image, setImage] = useAtom(imageAtom);
    const [imageFile, setImageFile] = useState<File | null>();
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const [isLoading, setIsLoading] = useState("");


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
        <div onClick={handleButtonClick} className=" w-full h-[240px] rounded-xl flex justify-center items-center bg-neonblue-50 relative " >
            <input
                type="file"
                multiple={false}
                accept="image/*"
                onChange={(e) => handleSingleImage(e.target.files)}
                ref={fileInputRef}
                style={{ display: 'none' }}
            />
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
        </div>
    )
}