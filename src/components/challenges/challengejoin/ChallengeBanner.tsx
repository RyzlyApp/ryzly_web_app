import { CustomImage } from "../../custom";
import { LoadingLayout } from "../../shared";
import { dateFormatHeader } from "@/helper/utils/dateFormat";
import { RiTimeFill } from "react-icons/ri";

interface ChallengeBannerProps {
    url?: string;
    startDate: string;
    endDate: string;
    loading: boolean;
}

export default function ChallengeBanner({
    url,
    startDate,
    endDate,
    loading,
}: ChallengeBannerProps) {
    return (
        <LoadingLayout loading={loading}>
            <div className=" w-full h-[244px] relative rounded-t-3xl bg-white p-2 ">
                <div className=" absolute inset-x-0 top-0 z-10 w-full p-5 flex justify-end items-center ">
                    <div className=" rounded-full border px-2 w-fit gap-1 h-[30px] text-white border-white flex justify-center items-center ">
                        <RiTimeFill size={"16px"} color="#FDFDFF" />
                        <p className=" text-[10px] font-semibold ">
                            {dateFormatHeader(startDate) +
                                " - " +
                                dateFormatHeader(endDate)}
                        </p>
                    </div>
                </div>
                {url?.includes("http") && (
                    <CustomImage
                        src={url}
                        alt="challenge banner"
                        fillContainer
                        style={{ borderRadius: "8px" }}
                    />
                )}
            </div>
        </LoadingLayout>
    );
}
