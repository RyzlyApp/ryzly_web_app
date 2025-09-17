import { CustomImage } from "../custom";

export default function BadgeEarned() {
    return (
        <div className=" w-full rounded-2xl bg-white flex flex-col gap-4 p-4 " >
            <div className=" w-full flex justify-between items-center " >
                <p className=" font-semibold " >Badges Earned</p>
                <p className=" text-xs text-neonblue-600 font-medium " >See All</p>
            </div>
            <div className=" w-full flex flex-col justify-center py-7 items-center " >
                <CustomImage
                    src="/images/medal.png"
                    alt="logo"
                    width={40}
                    height={40}
                    className="w-[40px] h-[40px] "
                />
                <p className=" text-xl font-bold " >No badges earned yet </p>
                <p className=" max-w-[222px] text-center text-xs font-medium  text-violet-300 " >{`You haven't earned a badge yet but your first one is just a challenge away!`}</p>
            </div>
        </div>
    )
}