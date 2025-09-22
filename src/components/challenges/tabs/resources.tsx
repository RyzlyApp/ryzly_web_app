import { ResourceCard } from "@/components/shared";
import { coachAtom } from "@/helper/atom/coach";
import { useAtom } from "jotai";
import { RiAddLine, RiThumbUpLine } from "react-icons/ri";


export default function Resources() {

    const [isCoach] = useAtom(coachAtom);

    return (
        <div className=" w-full flex flex-col p-4 gap-4" >
            {isCoach && (
                <div className=" flex items-center gap-3 text-neonblue-600 " >
                    <div className=" w-8 h-8 rounded-full flex justify-center items-center bg-neonblue-50 " >
                        <RiAddLine size={"18px"} />
                    </div>
                    <p className=" text-sm font-medium " >Add resources</p>
                </div>
            )}
            <div className=" w-full flex flex-col gap-3 shadow p-4 rounded-2xl " >
                <ResourceCard withImg={true} />
            </div>
        </div>
    )
}