import { CustomImage } from "@/components/custom";
import { LoadingLayout } from "@/components/shared";
import UserCard from "@/components/shared/userCard";
import { userAtom } from "@/helper/atom/user";
import { IPortfolioDetails } from "@/helper/model/challenge";
import { formatNumberWithK } from "@/helper/utils/formatNumberWithK";
import { textLimit } from "@/helper/utils/textlimit";
import { useFetchData } from "@/hook/useFetchData";
import { useAtom } from "jotai";
import { useRouter } from "next/navigation";
import React from "react";
import { BiComment } from "react-icons/bi";
import { FaHandsClapping } from "react-icons/fa6";

const Work = (
  { userId } : { userId?: string }
) => {

  const [user] = useAtom(userAtom)

  const router = useRouter()

  const { data = [], isLoading: loading } = useFetchData<IPortfolioDetails[]>({
    name: "portfolio", endpoint: "/portfolio",
    params: {
      userId: userId ?? user?.data?._id
    }
  });

  const WorkComp = ({ item }: { item: IPortfolioDetails }) => {

    return (
      <div onClick={() => router.push(`/dashboard/portfolio/${item?.challengeID?._id}?user=${item?.user?._id}`)} className=" cursor-pointer ">
        <div
          className="h-[200px] rounded-lg w-full "
        >
          <CustomImage src={item?.url} style={{ borderRadius: "8px" }} alt={item?.title} fillContainer />
        </div>
        <div className="flex justify-between mt-3">
          <UserCard item={item?.user} />
          <div className="flex gap-2 items-center">
            <div className="flex items-center gap-1">
              <BiComment className="" size={14} />
              <p className="text-xs">{formatNumberWithK(item?.comments?.length)}</p>
            </div>
            <div className="flex items-center gap-1">
              <FaHandsClapping className="" size={14} />
              <p className="text-xs">0</p>
            </div>
          </div>
        </div>
        <div className=" flex flex-col mt-2" >
          <p className=" text-lg font-bold capitalize " >{item?.title}</p>
          <p className=" text-xs text-violet-300 " >{textLimit(item?.description, 50)}</p>
        </div>
      </div>
    );
  };


  return (
    <LoadingLayout loading={loading} lenght={data?.length} >
      <div className="grid grid-cols-1 gap-y-10 lg:grid-cols-4 gap-5">
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
