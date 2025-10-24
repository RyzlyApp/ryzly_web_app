import { CustomImage } from "@/components/custom";
import { LoadingLayout } from "@/components/shared";
import UserCard from "@/components/shared/userCard";
import { userAtom } from "@/helper/atom/user";
import { IPortfolioDetails } from "@/helper/model/challenge";
import { dateFormat } from "@/helper/utils/dateFormat";
import { formatNumberWithK } from "@/helper/utils/formatNumberWithK";
import { textLimit } from "@/helper/utils/textlimit";
import { useFetchData } from "@/hook/useFetchData";
import { Avatar } from "@heroui/react";
import { useAtom } from "jotai";
import { useRouter } from "next/navigation";
import React from "react";
import { BiComment } from "react-icons/bi";
import { FaHandsClapping } from "react-icons/fa6";

const Work = (
  { userId, selected }: { userId?: string, selected?: string }
) => {

  const [user] = useAtom(userAtom)

  const router = useRouter()

  const { data = [], isLoading: loading } = useFetchData<IPortfolioDetails[]>({
    name: "portfolio", endpoint: "/portfolio",
    params: {
      userId: selected ? "" : userId ? userId : user?.data?._id
    }
  });

  console.log(data);
  

  const WorkComp = ({ item }: { item: IPortfolioDetails }) => {

    return (
      <div className=" w-full shadow p-5 rounded-2xl flex flex-col gap-4 cursor-pointer ">
        <div className=" flex justify-between lg:flex-row flex-col-reverse gap-4 lg:gap-6 w-full " >
        <p className=" text-xs lg:hidden " >{textLimit(item?.description, 100)}</p>
          <div className=" flex gap gap-4 " >
            <div className=" w-fit " >
              <Avatar src={item?.user?.profilePicture} name={item?.user?.fullName} />
            </div>
            <div className=" flex flex-col gap-1 " >
              <p className=" font-bold " >{item?.user?.fullName} <span className=" font-medium " >completed</span> {item?.title}</p>
              <p className=" text-xs lg:block hidden " >{textLimit(item?.description, 100)}</p>
            </div>
          </div>
          <p className=" text-xs font-semibold  " >{dateFormat(item?.updatedAt)}</p>
        </div>
        <div
          className=" h-[200px] lg:h-[400px] rounded-lg w-full px-4 "
        >
          <CustomImage src={item?.url} style={{ borderRadius: "8px" }} alt={item?.title} fillContainer />
        </div>
        <div className="flex justify-between mt-3">
          <div className="flex gap-2 items-center">
            <div onClick={() => router.push(`/dashboard/portfolio/${item?.challengeID?._id}?user=${item?.user?._id}`)} className="flex items-center gap-1 cursor-pointer rounded-2xl border py-1 px-2 border-gray-300 ">
              <BiComment className=" text-primary " size={14} />
              <p className="text-xs">{formatNumberWithK(item?.comments?.length)}</p>
            </div>
            <div className="flex items-center gap-1 rounded-2xl border py-1 px-2 border-gray-300 ">
              <FaHandsClapping className=" text-warning-400 " size={14} />
              <p className="text-xs">{item?.likes}</p>
            </div>
          </div>
        </div> 
      </div>
    );
  };


  return (
    <LoadingLayout loading={loading} lenght={data?.length} >
      <div className="grid grid-cols-1 gap-5">
        {data.map((work, index) => (
          <div key={index}>
            <WorkComp item={work} />
          </div>
        ))}
      </div>
    </LoadingLayout>
  );
};

export default Work;
