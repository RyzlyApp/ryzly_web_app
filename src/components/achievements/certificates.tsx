"use client";
import { RiDownload2Line } from "react-icons/ri";
import { CustomButton } from "../custom";
import { CertificateCard, LoadingLayout, ModalLayout } from "../shared";
import { useRef, useState } from "react";
import html2canvas from "html2canvas";
import { useFetchData } from "@/hook/useFetchData";
import { ICertificate } from "@/helper/model/challenge";
import { dateFormat } from "@/helper/utils/dateFormat";
import useCertificate from "@/hook/useCertificate";
import { useAtom } from "jotai";
import { userAtom } from "@/helper/atom/user";

export default function Certificates({
    userId,
    portflio,
}: {
    userId: string;
    portflio?: boolean;
}) {
    const [isOpen, setIsOpen] = useState(false);
    const [selected, setSelected] = useState<ICertificate>({} as ICertificate);
    const { handlePayment, creatingOrderLoading } = useCertificate() 

    const [userState] = useAtom(userAtom)

    const { data: user } = userState

    const { data, isLoading } = useFetchData<ICertificate[]>({
        endpoint: `/challenge/certificate`,
        name: "certificate",
        params: { userId },
        enable: Boolean(userId),
    });

    const clickHandler = (item: ICertificate) => {
        setSelected(item);
        setIsOpen(true);
    };

    // We'll capture this ref (offscreen but visible)
    const captureRef = useRef<HTMLDivElement | null>(null);

    // Helper: wait for <img> elements inside the node to finish loading
    const waitForImages = (node: HTMLElement | null) => {
        if (!node) return Promise.resolve();
        const imgs = Array.from(node.querySelectorAll("img"));
        return Promise.all(
            imgs.map(
                (img) =>
                    new Promise<void>((resolve) => {
                        if ((img as HTMLImageElement).complete) return resolve();
                        const cleanup = () => {
                            img.removeEventListener("load", cleanup);
                            img.removeEventListener("error", cleanup);
                            resolve();
                        };
                        img.addEventListener("load", cleanup);
                        img.addEventListener("error", cleanup);
                    })
            )
        );
    };

    const handleDownloadPNG = async () => {
        if (!captureRef.current) {
            console.error("No capture node found");
            return;
        }

        // Ensure selected exists
        if (!selected || !selected.challengeName) {
            console.error("No certificate selected");
            return;
        }

        try {
            // Wait for images inside certificate to load
            await waitForImages(captureRef.current);

            // Determine bounding size — you can adapt these values
            const width = captureRef.current.offsetWidth || 1200;
            const height = captureRef.current.offsetHeight || 800;

            // html2canvas options
            const canvas = await html2canvas(captureRef.current, {
                useCORS: true,
                allowTaint: true,
                backgroundColor: "#ffffff", // change to null if you want transparent
                width,
                height,
                windowWidth: document.documentElement.scrollWidth,
                windowHeight: document.documentElement.scrollHeight,
                scrollX: 0,
                scrollY: 0,
            });

            // Convert to blob and download (more memory-friendly than toDataURL for large images)
            canvas.toBlob((blob) => {
                if (!blob) {
                    console.error("Failed to create blob from canvas");
                    return;
                }
                const url = URL.createObjectURL(blob);
                const link = document.createElement("a");
                // sanitize filename
                const safeName = (selected.challengeName || "certificate")
                    .replace(/[^a-z0-9_\- ]/gi, "_")
                    .slice(0, 100);
                link.href = url;
                link.download = `${safeName}.png`;
                document.body.appendChild(link);
                link.click();
                link.remove();
                URL.revokeObjectURL(url);
            }, "image/png");
        } catch (err) {
            console.error("Error generating PNG:", err);
        }
    };

    const Card = ({ get, item }: { get: boolean; item: ICertificate }) => {
        return (
            <div className="w-full flex justify-between items-center border border-violet-50 px-3 rounded-2xl h-[94px] gap-4">
                <div className="w-full flex items-center gap-4">
                    <div className="w-fit">
                        <div className="w-[56px] h-[62px] rounded flex justify-center items-center bg-gray-100">
                            <div className="w-full flex h-[40vh] justify-center items-center">
                                <div
                                    style={{
                                        transform: "scale(0.04)",
                                        transformOrigin: "center",
                                        transition: "transform 0.3s ease",
                                    }}
                                    className={`w-fit h-fit shadow ${!item?.hasPaid ? "blur-3xl" : ""} `}
                                >
                                    <CertificateCard item={item} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col gap-1">
                        <p className="font-bold">{item?.challengeName}</p>
                        <p className="text-xs font-medium text-violet-300">
                            {dateFormat(item?.createdAt)}
                        </p>
                    </div>
                </div>
                {(item?.hasPaid) ? (
                    <>
                        {(!get && !portflio) && (
                            <div className="flex items-center gap-4">
                                <RiDownload2Line size={"20px"} className="text-violet-500" />
                                <CustomButton onClick={() => setIsOpen(true)}>Share</CustomButton>
                            </div>
                        )}
                        {get && (
                            <div className="flex items-center gap-4">
                                <CustomButton variant="auth" onClick={() => clickHandler(item)}>
                                    {portflio ? "View" : "Get"}
                                </CustomButton>
                            </div>
                        )}
                    </>
                ) : (item?.userId === user?._id) ? (
                    <div className="flex items-center gap-4">
                        <CustomButton isLoading={creatingOrderLoading} variant="auth" onClick={() => handlePayment(item?._id, 20000)}>
                            {"Get"}
                        </CustomButton>
                    </div>
                ) : (
                    ""
                )}
            </div>
        );
    };

    return (
        <LoadingLayout loading={isLoading} lenght={data?.length}>
            <div className="w-full rounded-2xl bg-white flex gap-4 px-4">
                <div className="w-full grid lg:grid-cols-2 gap-4">
                    {data?.map((item, index) => (
                        <Card get={true} item={item} key={index} />
                    ))}
                </div>

                <ModalLayout
                    isOpen={isOpen}
                    size="5xl"
                    onClose={() => setIsOpen(false)}
                >
                    <div className="w-full flex flex-col relative overflow-hidden">
                        <div className="w-full sticky top-0 bg-white z-10 pb-4">
                            <p className="text-3xl font-bold">{selected?.challengeName}</p>
                            <p className="text-xs text-violet-300">
                                {dateFormat(selected?.createdAt)}
                            </p>
                        </div>

                        <div className="w-full hidden lg:flex h-[60vh] justify-center items-center">
                            <div
                                style={{
                                    transform: "scale(0.5)",
                                    transformOrigin: "center",
                                    transition: "transform 0.3s ease",
                                }}
                                className="w-fit h-fit"
                            >
                                <CertificateCard item={selected} />
                            </div>
                        </div>

                        <div className="w-full lg:hidden flex h-[40vh] justify-center items-center">
                            <div
                                style={{
                                    transform: "scale(0.3)",
                                    transformOrigin: "center",
                                    transition: "transform 0.3s ease",
                                }}
                                className="w-fit h-fit"
                            >
                                <CertificateCard item={selected} />
                            </div>
                        </div>

                        {/* OFFSCREEN but visible capture node (not display:none) */}
                        <div
                            ref={captureRef}
                            style={{
                                position: "absolute",
                                left: -9999,
                                top: 0,
                                width: "fit-content", // pick a width that matches your printed certificate
                                padding: 20,
                                height: "fit-content",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                background: "#fff",
                                visibility: "visible",
                            }}
                            className="print-capture"
                        >
                            <CertificateCard item={selected} />
                        </div>

                        <div className="w-full sticky bottom-0 bg-white z-10 flex justify-end gap-3 py-4">
                            <button className="px-5" onClick={handleDownloadPNG}>
                                <RiDownload2Line size={"20px"} />
                            </button>
                            <CustomButton>Share</CustomButton>
                        </div>
                    </div>
                </ModalLayout>
            </div>
        </LoadingLayout>
    );
}
