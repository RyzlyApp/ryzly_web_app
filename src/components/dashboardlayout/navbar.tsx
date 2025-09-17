import { RiNotification2Line, RiSearchLine, RiVipDiamondLine } from "react-icons/ri";
import { CustomSearch } from "../custom";

export default function Navbar() {
    return(
        <div className=" w-full h-[70px] lg:h-[80px] flex justify-between items-center px-5 " >
            <p className=" text-base lg:text-3xl font-bold " >Hello Chidi</p>
            <div className=" flex gap-1 items-center " > 
                <RiVipDiamondLine size={"16px"} />
                <p className=" font-medium text-xs " >50 points available</p>
            </div>
            <div className=" flex gap-4 items-center " >
                <div className=" lg:flex hidden w-[250px]  " >
                    <CustomSearch />
                </div>
                <button className=" lg:hidden flex cursor-pointer " > 
                    <RiSearchLine size={"17px"} />
                </button>
                <button className=" cursor-pointer " > 
                    <RiNotification2Line size={"17px"} />
                </button>
            </div>
        </div>
    )
}