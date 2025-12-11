import { CustomImage, CustomButton, CustomInput } from "@/components/custom";
import { LoadingLayout } from "@/components/shared";
import UserCard from "@/components/shared/userCard";
import { userAtom } from "@/helper/atom/user";
import { IPortfolioComment, IPortfolioDetails } from "@/helper/model/challenge";
import { dateFormat } from "@/helper/utils/dateFormat";
import { useFetchData } from "@/hook/useFetchData";
import useSubmitChallenge from "@/hook/useSubmitChallenge";
import { Avatar } from "@heroui/react";
import { FormikProvider } from "formik";
import { useAtom } from "jotai";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { BiComment } from "react-icons/bi";
import { IoArrowBack, IoChevronBack } from "react-icons/io5";
import { PiHandsClapping } from "react-icons/pi";
import { RiShare2Line, RiThumbUpLine } from "react-icons/ri";
import { RxExternalLink } from "react-icons/rx";
import UsersPortfolio from "../usersPortfolio";
import { FaRegComment } from "react-icons/fa6";

const PortfolioInfo = ({ }: { unauth?: boolean }) => {
    const param = useParams();
    const id = param.id;
    const query = useSearchParams();
    const user = query?.get('user');
    const router = useRouter();
    const [commentId, setCommentId] = useState("")

    // ✅ New ref for container only
    const commentsContainerRef = useRef<HTMLDivElement | null>(null);

    const [userState] = useAtom(userAtom);

    const [show, setShow] = useState(false)
    const { data: userdata } = userState;

    const { data = [], isLoading: loading } = useFetchData<IPortfolioDetails[]>({
        name: "portfolio",
        endpoint: `/portfolio/get-all`,
        params: {
            userId: user,
            challengeID: id
        }
    });

    const linkifyText = (text: string) => {
        const urlRegex = /(https?:\/\/[^\s]+)/g;

        return text.split(urlRegex).map((part, index) => {
            if (part.match(urlRegex)) {
                return (
                    <a
                        key={index}
                        href={part}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 underline break-all"
                    >
                        {part}
                    </a>
                );
            }
            return part;
        });
    };

    const { data: comment = [], isLoading: loadingComments, isRefetching } = useFetchData<IPortfolioComment[]>({
        name: "portfolio/comments",
        endpoint: `/portfolio/comments`,
        params: {
            id: data[0]?._id
        },
        enable: data?.length > 0
    });

    const { formikComment, isLoading, setPortID, likePortfolio, helpfulComment } = useSubmitChallenge();

    // ✅ Scroll only the comments container
    useEffect(() => {
        if (commentsContainerRef.current) {
            commentsContainerRef.current.scrollTop = 0;
        }
    }, [isRefetching, comment?.length]);

    useEffect(() => {
        if (data[0]?._id) {
            setPortID(data[0]._id);
        }
    }, [data, setPortID]);

    const shareUrl = `/portfolio/${id}/opengraph/${user}`;

    const copyHandler = () => {
        if (navigator.share) {
            navigator.share({
                title: "",
                text: "",
                url: shareUrl
            }).catch((error) => console.error("Error sharing:", error));
        } else {
            alert("Sharing not supported on this device.");
        }
    };

    return (
        <LoadingLayout loading={loading}>
            <div className="w-full flex-1 flex flex-col gap-6  lg:p-4 ">
                <div className="flex flex-col w-full lg:flex-row gap-5">
                    {/* Left Section */}
                    <div className={` ${show ? " lg:block hidden " : " "} p-4 h-full flex rounded-2xl flex-1 bg-white flex-col lg:p-6 pb-0 `}>
                        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                            <div className="flex items-center gap-3">
                                <button onClick={() => router.back()}>
                                    <IoChevronBack size={"20px"} />
                                </button>
                                <UserCard item={data[0]?.user} />
                            </div>

                            <div className="flex items-center gap-4">
                                <button onClick={() => setShow((prev) => !prev)} className="flex items-center gap-2 text-gray-600">
                                    <FaRegComment />
                                    <span className="text-sm font-medium">
                                        {data[0]?.comments?.length}
                                    </span>
                                </button>

                                <button
                                    onClick={() => likePortfolio.mutate(data[0]?._id)}
                                    className="flex items-center gap-2 text-gray-600"
                                >
                                    <PiHandsClapping />
                                    <span className="text-sm font-medium">
                                        {data[0]?.likes}
                                    </span>
                                </button>

                                <button
                                    onClick={copyHandler}
                                    className="text-blue-900"
                                >
                                    <RiShare2Line size={"20px"} />
                                </button>
                                <CustomButton onClick={() => router.push(!userdata?._id ? `/challenges/${data[0]?.challengeID?._id}` : `/dashboard/challenges/${data[0]?.challengeID?._id}`)} >View Challenges</CustomButton>
                            </div>
                        </div>

                        <div className="w-full relative flex flex-col h-full gap-2 pb-5">
                            <div className="w-full h-fit">
                                <div className="my-6 h-[400px]">
                                    <CustomImage
                                        fillContainer
                                        src={data[0]?.url}
                                        alt={data[0]?.title}
                                        style={{ borderRadius: "16px" }}
                                        fallbackSrc="/images/fallback.png"
                                    />
                                </div>
                            </div>

                            <div className="w-full flex flex-col gap-5">
                                <span className="text-xs text-gray-500">
                                    posted on {dateFormat(data[0]?.createdAt)}
                                </span>

                                <div className="flex items-center justify-between mt-2">
                                    <h1 className="lg:text-xl font-bold">
                                        {data[0]?.title}
                                    </h1>
                                </div>

                                <div
                                    dangerouslySetInnerHTML={{
                                        __html: data[0]?.description || ""
                                    }}
                                />

                                <div className="w-full flex flex-wrap gap-3">
                                    {data[0]?.links?.map((item, index) => (
                                        <a href={item?.link} target="_blank" key={index}>
                                            <CustomButton
                                                startIcon={<RxExternalLink size={"20"} />}
                                                variant="flat"
                                                size="sm"
                                            >
                                                {item?.name?.includes(".") ? "Link" : item?.name}
                                            </CustomButton>
                                        </a>
                                    ))}
                                </div>

                                <div>
                                    <h3 className="text-sm font-semibold mb-2">
                                        Tools used
                                    </h3>
                                    <div className="flex flex-wrap gap-2">
                                        {data[0]?.tools?.map((tool, index) => (
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

                    {/* Right Section - Comments */}
                    <div className={` ${!show ? " lg:block hidden " : " "} w-full lg:w-fit `}>
                        <div className="w-full lg:w-[400px] flex h-[70vh] flex-col bg-white rounded-2xl p-4 lg:overflow-y-hidden">
                            <div className="rounded-lg w-full flex flex-col h-full">
                                <div className=" flex items-center gap-4 mb-6 " >
                                    <button onClick={() => setShow((prev) => !prev)} className=" lg:hidden " >
                                        <IoChevronBack size={"20px"} />
                                    </button>
                                    <h3 className="text-lg font-bold ">
                                        {data[0]?.comments?.length} Comments
                                    </h3>
                                </div>

                                {/* ✅ Scroll Only Inside This Container */}
                                <div
                                    ref={commentsContainerRef}
                                    className="w-full relative flex flex-col-reverse flex-1 max-h-[70vh] overflow-y-auto gap-2 py-1"
                                >
                                    <LoadingLayout
                                        loading={loadingComments}
                                        lenght={comment?.length}
                                    >
                                        {[...comment]
                                            .reverse()
                                            .map((comment) => (
                                                <div
                                                    key={comment._id}
                                                    onMouseEnter={() => setCommentId(comment?._id)}
                                                    onMouseLeave={() => setCommentId("")}
                                                    className="py-4 px-2 last:border-b-0 hover:rounded-2xl hover:shadow  "
                                                >
                                                    <div className="flex gap-3">
                                                        <Avatar
                                                            src={comment?.user?.profilePicture}
                                                            name={comment?.user?.fullName}
                                                        />
                                                        <div className="flex-1 flex-col flex gap-2">
                                                            <div className="flex items-center gap-2">
                                                                <h4 className="font-semibold text-sm">
                                                                    {comment?.user?.fullName}
                                                                </h4>
                                                                <span className="text-xs text-gray-500">
                                                                    {dateFormat(comment?.updatedAt)}
                                                                </span>
                                                            </div>

                                                            <p className="text-gray-700 text-sm leading-relaxed whitespace-pre-wrap break-words">
                                                                {linkifyText(comment?.comment || "")}
                                                            </p>
                                                            {commentId === comment?._id && (
                                                                <div className=" w-full flex pr-3 " > 
                                                                    {helpfulComment.isPending && (
                                                                        <button className={` flex ml-auto gap-1 text-xs items-center `} >
                                                                            Loading...
                                                                        </button>
                                                                    )}
                                                                    {!helpfulComment.isPending && (
                                                                        <button onClick={() => helpfulComment.mutate(commentId)} className={` ${comment?.helpful ? " text-primary " : " "} flex ml-auto gap-1 items-center `} >
                                                                            <RiThumbUpLine size={"12px"} />
                                                                            <p className=" text-xs  " >Helpful</p>
                                                                        </button>
                                                                    )}
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                    </LoadingLayout>
                                </div>

                                <FormikProvider value={formikComment}>
                                    <form
                                        onSubmit={formikComment.handleSubmit}
                                        className="pt-6"
                                    >
                                        <CustomInput
                                            name="comment"
                                            textarea={true}
                                        />

                                        <div className="flex justify-end mt-3">
                                            <CustomButton
                                                onClick={() =>
                                                    !userdata?._id
                                                        ? router.push("/auth")
                                                        : null
                                                }
                                                isLoading={isLoading}
                                                type="submit"
                                                variant="primary"
                                                size="md"
                                            >
                                                Post Comment
                                            </CustomButton>
                                        </div>
                                    </form>
                                </FormikProvider>
                            </div>
                        </div>
                    </div>
                </div>
                <UsersPortfolio portfolio={data as IPortfolioDetails[]} unauth={userdata?._id ? false : true} />
            </div>
        </LoadingLayout>
    );
};

export default PortfolioInfo;
