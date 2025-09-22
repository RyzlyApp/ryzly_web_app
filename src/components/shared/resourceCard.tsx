import { RiThumbUpLine } from "react-icons/ri";

export default function ResourceCard(
    { withImg }: { withImg?: boolean }
) {
    return (
        <div className=" w-full flex gap-4 flex-col  " > 
            <div className=" w-full flex items-center justify-between " >
                <div className=" flex gap-2 items-center " >
                    <div className=" w-9 h-9 rounded-full bg-neonblue-600 " >

                    </div>
                    <div className=" flex flex-col " >
                        <div className=" flex items-center gap-1 " >
                            <p className=" text-sm font-semibold " >Adebola Ogunde</p>
                            <div className=" px-2 rounded-full bg-neonblue-600 text-white font-semibold h-[18px] flex justify-center items-center text-xs " >
                                Coach
                            </div>
                        </div>
                        <p className=" text-violet-300 text-xs " >UI/UX Designer</p>
                    </div>
                </div>
                <p className=" text-xs font-medium text-violet-300 " >19 June, 2025</p>
            </div>
            <p>{`You've made a strong start here  the overall layout is clean and easy to follow. I like how you've used color to guide the user's eye, but be mindful of contrast for accessibility. Your typography choices work well, though you might explore adding more hierarchy to headings. Consider refining the spacing between sections to make the design feel more balanced. Keep up the great work, and I'm looking forward to seeing your next iteration!`}</p>
            {withImg && (
                <div className=" w-full h-[300px] rounded-lg bg-amber-300 " >

                </div>
            )}
            <div className=" flex items-center gap-1 text-violet-300 " >
                <RiThumbUpLine size={"12px"} />
                <p className=" text-xs  " >Helpful</p>
            </div>
        </div>

    )
}