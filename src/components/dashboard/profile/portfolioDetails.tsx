import { CustomImage, CustomButton, CustomInput } from "@/components/custom";
import { LoadingLayout } from "@/components/shared";
import UserCard from "@/components/shared/userCard";
import { IPortfolioComment, IPortfolioDetails } from "@/helper/model/challenge";
import { dateFormat } from "@/helper/utils/dateFormat";
import { useFetchData } from "@/hook/useFetchData";
import useSubmitChallenge from "@/hook/useSubmitChallenge";
import { Avatar } from "@heroui/react";
import { FormikProvider } from "formik";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useRef } from "react";
import { BiComment } from "react-icons/bi";
import { IoChevronBack } from "react-icons/io5";
import { PiHandsClapping } from "react-icons/pi";
import { RiShare2Line } from "react-icons/ri";
import { RxExternalLink } from "react-icons/rx";

const PortfolioInfo = ({ unauth }: { unauth?: boolean }) => {


    const param = useParams();
    const id = param.id;
    const query = useSearchParams();
    const user = query?.get('user');
    const router = useRouter()
    const commentsEndRef = useRef<HTMLDivElement | null>(null);


    const { data = [], isLoading: loading } = useFetchData<IPortfolioDetails[]>({
        name: "portfolio", endpoint: `/portfolio/get-all`,
        params: {
            userId: user,
            challengeID: id
        }
    });

    const { data: comment = [], isLoading: loadingComments, isRefetching } = useFetchData<IPortfolioComment[]>({
        name: "portfolio/comments", endpoint: `/portfolio/comments`,
        params: {
            id: data[0]?._id
        },
        enable: data?.length > 0 ? true : false
    });

    const { formikComment, isLoading, setPortID, likePortfolio } = useSubmitChallenge()

    useEffect(() => {
        if (commentsEndRef.current) {
            commentsEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [isRefetching]);

    useEffect(() => {
        setPortID(data[0]?._id)
    }, [data, setPortID])

    const shareUrl = `/portfolio/${id}/opengraph/${user}`;

    const copyHandler = () => {
        if (navigator.share) {
            navigator.share({
                title: '',
                text: ``,
                url: shareUrl,
            })
                .then(() => console.log('Shared successfully!'))
                .catch((error) => console.error('Error sharing:', error));
        } else {
            alert('Sharing not supported on this device.');
        }
    }

    return (
        <LoadingLayout loading={loading} >
            <FormikProvider value={formikComment} >
                <div className="flex flex-col lg:h-[100vh] w-full lg:flex-row gap-5 lg:p-4 lg:overflow-y-hidden">
                    <div className="w-full lg:w-3/5 space-y-5 h-full ">
                        <div className="bg-white rounded-lg p-4 h-full lg:p-6 pb-0 lg:overflow-y-hidden">
                            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">

                                <div className="flex items-center gap-3" >
                                    <button onClick={() => router?.back()}>
                                        <IoChevronBack size={"20px"} />
                                    </button>
                                    <UserCard item={data[0]?.user} />
                                </div>

                                <div className="flex items-center gap-4">
                                    <div className="flex items-center gap-2 text-gray-600">
                                        <BiComment className="" />
                                        <span className="text-sm font-medium">
                                            {data[0]?.comments?.length}
                                        </span>
                                    </div>
                                    <button onClick={() => likePortfolio.mutate(data[0]?._id)} className="flex items-center gap-2 text-gray-600">
                                        <PiHandsClapping className="" />
                                        <span className="text-sm font-medium">
                                            {data[0]?.likes}
                                        </span>
                                    </button>
                                    <button onClick={() => copyHandler()} className=" text-blue-900 " >
                                        <RiShare2Line size={"20px"} />
                                    </button>
                                </div>
                            </div>
                            <div className=" w-full relative flex flex-col h-full lg:overflow-y-auto gap-2 pb-5 " >

                                <div className=" w-full h-fit " >
                                    <div className="my-6 h-80 ">
                                        <CustomImage
                                            fillContainer
                                            src={data[0]?.url}
                                            alt={data[0]?.title}
                                            className="w-full lg:h-80 object-cover rounded-lg"
                                            fallbackSrc="/images/fallback.png"
                                        />
                                    </div>
                                </div>

                                <div className=" w-full flex flex-col gap-5 ">
                                    <span className="text-xs text-gray-500">
                                        posted on {dateFormat(data[0]?.createdAt)}
                                    </span>
                                    <div className="flex items-center justify-between mt-2">
                                        <h1 className="lg:text-xl font-bold">{data[0]?.title}</h1>
                                    </div>

                                    <div dangerouslySetInnerHTML={{ __html: data[0]?.description || "" }} />

                                    <div className=" w-full flex flex-wrap gap-3 " >
                                        {data[0]?.links?.map((item, index) => {
                                            return (
                                                <a href={item?.link} target="_blank" key={index} >
                                                    <CustomButton startIcon={<RxExternalLink size={"20"} />} variant="flat" size="sm">
                                                        {item?.name?.includes(".") ? "Link" : item?.name}
                                                    </CustomButton>
                                                </a>
                                            )
                                        })}
                                    </div>

                                    <div className="">
                                        <h3 className="text-sm font-semibold mb-2">Tools used</h3>
                                        <div className="flex flex-wrap gap-2">
                                            {data[0]?.tools.map((tool, index) => (
                                                <span
                                                    key={index}
                                                    className="px-3 py-1 bg-[#E9EAEB] text-xs rounded-full"
                                                >
                                                    {tool}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="w-full lg:w-2/5 flex h-full flex-col bg-white rounded-lg p-4 lg:overflow-y-hidden ">
                        <div className="rounded-lg w-full flex flex-col h-full ">
                            <h3 className="text-lg font-bold mb-6">
                                {data[0]?.comments?.length} Comments
                            </h3>

                            <div className="w-full relative flex flex-col-reverse flex-1 max-h-[60vh] lg:max-h-auto overflow-y-auto gap-2 py-1">
                                <LoadingLayout loading={loadingComments} lenght={comment?.length} >
                                <div ref={commentsEndRef} />
                                    {[...comment].reverse().map((comment) => (
                                        <div key={comment._id} className="pb-6 last:border-b-0">
                                            <div className="flex gap-3">
                                                {/* <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center flex-shrink-0">
                                                    <CustomImage src={comment?.user?.profilePicture} fillContainer alt={comment?.user?.fullName} />
                                                </div> */}
                                                <Avatar src={comment?.user?.profilePicture} name={comment?.user?.fullName} />
                                                <div className="flex-1">
                                                    <div className="flex items-center gap-2 mb-2">
                                                        <h4 className="font-semibold text-sm">{comment.user?.fullName}</h4>
                                                        <span className="text-xs text-gray-500">
                                                            {dateFormat(comment?.updatedAt)}
                                                        </span>
                                                    </div>

                                                    <p className="text-gray-700 text-sm leading-relaxed">
                                                        {comment?.comment}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </LoadingLayout>
                            </div>
                            <form onSubmit={formikComment.handleSubmit} className="pt-6">
                                <CustomInput name="comment" textarea={true} />
                                <div className="flex justify-end mt-3">
                                    <CustomButton onClick={() => unauth ? router.push("/auth") : formikComment.handleSubmit} isLoading={isLoading} type="submit" variant="primary" size="md">
                                        Post Comment
                                    </CustomButton>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </FormikProvider>
        </LoadingLayout>
    );
};

export default PortfolioInfo;
