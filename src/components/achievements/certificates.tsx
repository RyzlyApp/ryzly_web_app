import { RiDownload2Line } from "react-icons/ri";
import { CustomButton } from "../custom";


export default function Certificates() {

    const Card = ({ get }: { get: boolean }) => {
        return (
            <div className=" w-full flex justify-between items-center border border-violet-50 px-3 rounded-2xl h-[94px] gap-4 " >
                <div className=" w-full flex items-center gap-4 " >
                    <div className=" w-[56px] h-[62px] rounded bg-gray-100 " ></div>
                    <div className=" flex flex-col gap-1 " >
                        <p className=" font-bold " >Designing for Dark Mode</p>
                        <p className=" text-xs font-medium text-violet-300 " >25 Aug 2025</p>
                    </div>
                </div>
                {!get && (
                    <div className=" flex items-center gap-4 " >
                        <RiDownload2Line size={"20px"} className=" text-violet-500 " />
                        <CustomButton >Share</CustomButton>
                    </div>
                )}
                {get && (
                    <div className=" flex items-center gap-4 " >
                        <CustomButton variant="auth" >Get</CustomButton>
                    </div>
                )}
            </div>
        )
    }

    return (
        <div className=" w-full rounded-2xl bg-white flex gap-4 p-4 " >
            <div className=" w-full flex flex-col gap-4 " >
                <Card get={false} />
                <Card get={false} />
                <Card get={false} />
            </div> 
            <div className=" w-full flex flex-col gap-4 " >
                <Card get={true} />
                <Card get={true} />
                <Card get={true} />
            </div>
        </div>
    )
}