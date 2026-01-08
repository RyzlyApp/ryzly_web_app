"use client";
import { Popover, PopoverTrigger, PopoverContent } from "@heroui/react";
import { RiShare2Line } from "react-icons/ri";
import { CustomImage } from "../custom";
import { addToast } from "@heroui/toast";

export default function ShareBtn({ id, type, user }: { id: string, type: "challenge" | "portfolio", user?: string }) {

    const DOMAIN_URL = process.env.NEXT_PUBLIC_DOMAIN_URL as string;
    const shareUrl = `${DOMAIN_URL}${type === "challenge" ? "challenges" : "portfolio"}/${id}/opengraph${user ? `/${user}` : ""}`;

    const shareTo = (platform: "twitter" | "facebook" | "linkedin" | "whatsapp" | "copy") => {
        const encodedUrl = encodeURIComponent(shareUrl);
        const text = encodeURIComponent(type === "challenge" ? "Check out this challenge!" : "Check out this portfolio!");

        const links = {
            twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${text}`,
            facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
            linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
            whatsapp: `https://wa.me/?text=${text}%20${encodedUrl}`,
        };

        if (platform === "copy") {
            navigator.clipboard.writeText(shareUrl);

            addToast({
                description: "Copied",
                color: "primary",
            })
            return;
        }

        window.open(links[platform], "_blank", "noopener,noreferrer");
    };

    return (
        <Popover placement="bottom-end" showArrow={true}>
            <PopoverTrigger>
                <button className=" text-blue-900 px-2 " >
                    <RiShare2Line size={"20px"} />
                </button>
            </PopoverTrigger>
            <PopoverContent>
                <div className=" flex flex-col gap-3 items-center p-2 " >
                    <p className=" text-sm font-semibold " >Share to</p>
                    <div className=" flex gap-3 pb-2 items-center " >
                        <button onClick={() => shareTo("twitter")} className=" w-10 h-10 " >
                            <CustomImage src={"/social/twitter.png"} alt="twitter" fillContainer />
                        </button>
                        <button onClick={() => shareTo("facebook")} className=" w-10 h-10 " >
                            <CustomImage src={"/social/facebook.png"} alt="facebook" fillContainer />
                        </button>
                        <button onClick={() => shareTo("linkedin")} className=" w-10 h-10 " >
                            <CustomImage src={"/social/linkedin.png"} alt="linkedin" fillContainer />
                        </button>
                        {/* <button onClick={()=> shareTo("twitter")} className=" w-10 h-10 " >
                            <CustomImage src={"/social/instagram.png"} alt="instagram" fillContainer />
                        </button> */}
                        <button onClick={() => shareTo("whatsapp")} className=" w-10 h-10 " >
                            <CustomImage src={"/social/whatsapp.png"} alt="whatsapp" fillContainer />
                        </button>
                        <button onClick={() => shareTo("copy")} className=" w-10 h-10 " >
                            <CustomImage src={"/social/copy.png"} alt="copy" fillContainer />
                        </button>
                    </div>
                </div>
            </PopoverContent>
        </Popover> 
    )
}