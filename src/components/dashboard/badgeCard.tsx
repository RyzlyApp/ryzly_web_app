import { RiMedalFill } from "react-icons/ri";
import { CustomButton } from "../custom";

export default function BadgeCard() {
    return (
        <div className=" w-full h-[180px] bg-neonblue-500 p-4 flex items-center rounded-2xl " >
            <div className=" lg:w-auto w-full flex flex-col gap-3 " >
                <div className=" w-full flex "  >
                    <div className=" flex flex-col text-xl lg:text-3xl font-bold text-white " >
                        <p>Start Strong.</p>
                        <p>Earn Your First Badge.</p>
                    </div>
                    <div className="  ml-auto lg:hidden -mt-9 " >
                        <RiMedalFill color="white" size={"100px"} />
                    </div>
                </div>
                <div className=" flex gap-2 " >
                    <CustomButton variant="auth" height="36px" >
                        Complete your Profile
                    </CustomButton>
                    <CustomButton variant="auth" height="36px" >
                        Join a Challenge
                    </CustomButton>
                </div>
            </div>
            <div className=" ml-auto relative lg:block hidden h-full " >
                <div className=" -mt-4 " >
                    <RiMedalFill color="white" size={"150px"} />
                </div>
            </div>
        </div>
    )
}