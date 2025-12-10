import { IPortfolioDetails } from "@/helper/model/challenge";
import { dateFormat } from "@/helper/utils/dateFormat";
import { formatNumberWithK } from "@/helper/utils/formatNumberWithK";
import { useFetchData } from "@/hook/useFetchData";
import { Avatar, Spinner } from "@heroui/react"; 
import { BiComment } from "react-icons/bi";
import { FaHandsClapping } from "react-icons/fa6";
import { CustomImage } from "../custom";
import useSubmitChallenge from "@/hook/useSubmitChallenge";
import { LoadingLayout } from "../shared";
import { useRouter } from "next/navigation";


export default function UsersPortfolio(
    { portfolio, unauth }: { portfolio: IPortfolioDetails[], unauth: boolean }
) {

    const router = useRouter()

    const { data = [], isLoading } = useFetchData<IPortfolioDetails[]>({
        name: "portfolio", endpoint: "/portfolio/get-all",
        params: {
            userId: portfolio[0]?.user?._id
        }
    });

    const { likePortfolio } = useSubmitChallenge()

    const handleClick = (item: IPortfolioDetails ) => {
        if(unauth){
            router.push(`/portfolio/${item?.challengeID?._id}?user=${item?.user?._id}`)
        } else {
            router.push(`/dashboard/portfolio/${item?.challengeID?._id}?user=${item?.user?._id}`)
        } 
    }
 
    const WorkComp = ({ item }: { item: IPortfolioDetails }) => {

        const handleLike = (e: React.MouseEvent<HTMLButtonElement>) => {
            e.preventDefault();
            e.stopPropagation();
            likePortfolio.mutate(item?._id)
        };

        return (
            <div onClick={() => handleClick(item)} className=" cursor-pointer w-[400px] bg-white shadow p-5 rounded-2xl flex flex-col gap-4  ">
                <div className={` flex justify-between flex-col-reverse gap-4 lg:gap-6 w-full `} >
                    {/* <p className={` text-xs  ${portfolio ? " " : " lg:hidden "} `} >{textLimit(item?.description, 100)}</p> */}
                    <div className=" flex gap gap-4 items-center " >
                        <div className=" w-fit " >
                            <Avatar src={item?.user?.profilePicture} name={item?.user?.firstName} />
                        </div>
                        <div className=" flex flex-col gap-1 " >
                            <p className=" font-bold " >{item?.user?.firstName} <span className=" font-medium " >completed</span> {item?.title}</p>
                            {/* <p className={` text-xs hidden ${portfolio ? " " : " lg:block "} `} >{textLimit(item?.description, 100)}</p> */}
                        </div>
                    </div>
                    <p className=" text-xs font-semibold  " >{dateFormat(item?.createdAt)}</p>
                </div>
                <div
                    className={` h-[200px]  rounded-lg w-full px-4 `}
                >
                    <CustomImage src={item?.url} style={{ borderRadius: "8px" }} alt={item?.title} fillContainer />
                </div>
                <div className="flex justify-between mt-3">
                    <div className="flex gap-2 items-center">
                        <div className="flex items-center gap-1 cursor-pointer rounded-2xl border py-1 px-2 border-gray-300 ">
                            <BiComment className=" text-primary " size={14} />
                            <p className="text-xs">{formatNumberWithK(item?.comments?.length)}</p>
                        </div>
                        <button onClick={handleLike} className="flex items-center gap-1 rounded-2xl border py-1 px-2 border-gray-300 ">
                            {likePortfolio?.isPending ? (
                                <Spinner size="sm" />
                            ) : (
                                <div className=" flex items-center gap-1 " >
                                    <FaHandsClapping className=" text-warning-400 " size={14} />
                                    <p className="text-xs">{item?.likes}</p>

                                </div>
                            )}
                        </button>
                    </div>
                </div >
            </div >
        );
    };

    return (
        <LoadingLayout loading={isLoading} >
            <div className={` w-full flex-col gap-6 ${data?.length <= 1 ? " hidden " : " flex " } `}>
                <p className="font-semibold">
                    More from {portfolio[0]?.user?.firstName+" "+portfolio[0]?.user?.lastName}
                </p>
                <div className=" w-full flex gap-4 overflow-x-auto " >
                    {data.filter((item)=> item?._id !== portfolio[0]?._id).map((work, index) => (
                        <div key={index}>
                            <WorkComp item={work} />
                        </div>
                    ))}
                </div>
            </div>
        </LoadingLayout>
    )
}