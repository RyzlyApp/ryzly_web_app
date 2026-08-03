"use client";
import { RiMedalFill } from "react-icons/ri";
import { CustomButton } from "../custom";
import { useRouter } from "next/navigation";
import { useAtom } from "jotai";
import { userAtom } from "@/helper/atom/user";

export default function BadgeCard() {
    const router = useRouter();

    const [userState] = useAtom(userAtom);

    const { data } = userState;

    console.log(data);

    return (
        <div className=" w-full h-[180px] bg-neonblue-500 p-4 flex items-center rounded-2xl ">
            <div className=" lg:w-auto w-full flex flex-col gap-3 ">
                <div className=" w-full flex ">
                    {data?.userType !== "organization" && (
                        <>
                            {!data?.country ||
                            !data?.about ||
                            (data?.interests?.length === 0 &&
                            data?.Interests?.length === 0) ||
                            !data?.phone ||
                            !data?.profilePicture ||
                            data?.skills?.length === 0 ||
                            !data?.username ||
                            data?.track?.length === 0 ||
                            data?.challenges?.length <= 0 ? (
                                <div className=" flex flex-col text-xl lg:text-3xl font-bold text-white ">
                                    <p>Start Strong.</p>
                                    <p>Earn Your First Badge.</p>
                                </div>
                            ) : (
                                <div className=" flex flex-col text-xl lg:text-3xl font-bold text-white ">
                                    <p>
                                        Gain real world Experiences, build your
                                        portfolio, and Grow
                                    </p>
                                </div>
                            )}
                        </>
                    )}
                    {data?.userType === "organization" && (
                        <div className=" flex flex-col text-lg lg:text-lg font-bold text-white ">
                            <p>
                                Launch Your Challenge(Set A Task, Set The Winner Prize and Number of
                                Winners, and fund it — Start Getting Quality
                                Submissions from Talents)
                            </p>
                        </div>
                    )}
                    <div className="  ml-auto lg:hidden -mt-9 ">
                        <RiMedalFill color="white" size={"100px"} />
                    </div>
                </div>
                {data?.userType !== "organization" && (
                    <div className=" flex gap-2 ">
                        {(!data?.country ||
                            !data?.about ||
                            (data?.interests?.length === 0 &&
                            data?.Interests?.length === 0) ||
                            !data?.phone ||
                            !data?.profilePicture ||
                            data?.skills?.length === 0 ||
                            !data?.username ||
                            data?.track?.length === 0) && (
                            <CustomButton
                                onClick={() =>
                                    router.push("/dashboard/settings")
                                }
                                variant="auth"
                                height="36px"
                            >
                                Complete your Profile
                            </CustomButton>
                        )}
                        {data?.challenges && (
                            <>
                                {data?.challenges?.length <= 0 && (
                                    <CustomButton
                                        onClick={() =>
                                            router.push("/dashboard/challenges")
                                        }
                                        variant="auth"
                                        height="36px"
                                    >
                                        Join a Challenge
                                    </CustomButton>
                                )}
                            </>
                        )}
                    </div>
                )}
                {data?.userType === "organization" && (
                    <div className=" flex gap-2 ">
                        <CustomButton
                            onClick={() => router.push("/dashboard/challenges/create")}
                            variant="auth"
                            height="36px"
                        >
                            Launch A Challenge
                        </CustomButton>
                    </div>
                )}
            </div>
            <div className=" ml-auto relative lg:block hidden h-full ">
                <div className=" -mt-4 ">
                    <RiMedalFill color="white" size={"150px"} />
                </div>
            </div>
        </div>
    );
}
