import { userAtom } from "@/helper/atom/user";
import {
    bottombarlink,
    bottombarOrganisationlink,
} from "@/helper/utils/databank";
import { textLimit } from "@/helper/utils/textlimit";
import { Avatar, Popover, PopoverContent, PopoverTrigger } from "@heroui/react";
import { useAtom } from "jotai";
import { useParams, usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import {
    RiUser3Line,
    RiInformationLine,
    RiAddLine,
    RiLogoutCircleLine,
} from "react-icons/ri";
import { IOrganisationDetails, IUser } from "@/helper/model/user";
import useOrganisation from "@/hook/useOrganisation";
import { ModalLayout } from "../shared";
import { OrganisationForm } from "../forms";
import { useFetchData } from "@/hook/useFetchData";
import { organisationAtom } from "@/helper/atom/organization";
import { CustomImage } from "../custom";

export default function BottomBar() {
    const [userState, setUser] = useAtom(userAtom); 
    const { data: user } = userState;
    const [organisation] = useAtom(organisationAtom);
    const AWS_BUCKET_NAME = process.env.NEXT_PUBLIC_AWS_BUCKET_NAME as string;
    const AWS_REGION = process.env.NEXT_PUBLIC_AWS_REGION as string;

    const param = useParams();
    const organisationId = param.organisationId;

    const { data = [] } = useFetchData<IOrganisationDetails[]>({
        endpoint: `/organization/user/${user?._id}`,
        name: "organization",
        enable: user?._id ? true : false,
    });
    const {
        isOpen: open,
        setIsOpen: setOpen,
        formik,
        image,
        setImage,
        isLoading,
    } = useOrganisation();

    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);

    const logout = () => {
        localStorage.clear();
        setUser({
            ...userState,
            data: {} as IUser,
        });
        router.push("/main");
    };

    const clickHandler = (link: string) => {
        router.push(link);
        setIsOpen(false);
    };

    const openHandler = () => {
        setOpen(true);
        setIsOpen(false);
    };

    return (
        <div
            className={` h-[56px] w-full flex justify-between items-center `}
        >
            {/* bottombarOrganisationlink */}
            {(organisationId ? bottombarOrganisationlink(organisationId+"") : bottombarlink)?.map((item, index) => {
                if (item?.label === "Profile") {
                    return (
                        <div key={index} className=" w-full h-full "> 
                            <Popover
                                isOpen={isOpen}
                                onOpenChange={(value) => setIsOpen(value)}
                                showArrow
                                backdrop={"opaque"}
                                offset={10}
                                placement="top"
                            >
                                <PopoverTrigger>
                                    <button className=" w-full h-[58px] py-2 px-3 mt-auto text-white flex gap-2 items-center ">
                                        <Avatar
                                            className=" w-9 h-9 text-full  text-black  "
                                            src={
                                                organisationId
                                                    ? `https://${AWS_BUCKET_NAME}.s3.${AWS_REGION}.amazonaws.com/${organisation?.profilePicture}`
                                                    : user?.profilePicture
                                            }
                                            name={
                                                organisationId
                                                    ? organisation?.name
                                                    : user?.firstName +
                                                      " " +
                                                      user?.lastName
                                            }
                                        /> 
                                    </button>
                                </PopoverTrigger>

                                <PopoverContent className="w-[330px]">
                                    <div className="px-1 py-2 w-full flex flex-col text-black  ">
                                        <button className=" w-full h-[58px] px-3 border-b border-b-gray-200 flex gap-2 items-center ">
                                            <Avatar
                                                className=" w-9 h-9 text-full  text-black  "
                                                src={
                                                    organisationId
                                                        ? `https://${AWS_BUCKET_NAME}.s3.${AWS_REGION}.amazonaws.com/${organisation?.profilePicture}`
                                                        : user?.profilePicture
                                                }
                                                name={
                                                    organisationId
                                                        ? organisation?.name
                                                        : user?.firstName +
                                                          " " +
                                                          user?.lastName
                                                }
                                            />
                                            <div className=" flex flex-col items-start  ">
                                                <p className=" font-semibold capitalize text-violet-300 ">
                                                    {organisationId
                                                        ? organisation?.name
                                                        : user?.firstName
                                                          ? textLimit(
                                                                user?.firstName +
                                                                    " " +
                                                                    user?.lastName +
                                                                    "",
                                                                15,
                                                            )
                                                          : ""}
                                                </p>
                                                {user?.skills &&
                                                    !organisationId && (
                                                        <p className=" text-xs ">
                                                            {user?.skills[0]}
                                                        </p>
                                                    )}
                                            </div>
                                        </button>
                                        <div className=" border-b border-b-gray-200 pb-2 flex flex-col w-full">
                                            <button
                                                onClick={() =>
                                                    clickHandler(
                                                        `/dashboard/profile/${user?._id}`,
                                                    )
                                                }
                                                className=" px-3 w-full  h-[45px] gap-2 items-center flex "
                                            >
                                                <RiUser3Line size={"20px"} />
                                                <p className=" font-medium text-violet-300 ">
                                                    Your Profile
                                                </p>
                                            </button>
                                            <a
                                                href="mailto:ryzlyapps@gmail.com"
                                                className="px-3 h-[45px] gap-2 items-center w-full flex"
                                            >
                                                <RiInformationLine size="20px" />
                                                <p className="font-medium text-violet-300">
                                                    Contact Support
                                                </p>
                                            </a>
                                            {!user?.isCoach && (
                                                <button
                                                    onClick={() =>
                                                        router.push(
                                                            "/dashboard/challenges/create",
                                                        )
                                                    }
                                                    className=" px-3 w-full lg:hidden h-[45px] gap-2 items-center flex "
                                                >
                                                    <RiAddLine size={"20px"} />
                                                    <p className=" font-medium text-violet-300 ">
                                                        Become A Coach
                                                    </p>
                                                </button>
                                            )}
                                        </div>
                                        {organisationId && (
                                            <div className=" gap-2 py-2 border-b border-b-gray-200 flex flex-col w-full">
                                                <p className=" text-xs ">
                                                    User
                                                </p>
                                                <div className=" py-3 flex flex-col gap-2 ">
                                                    <button
                                                        onClick={() =>
                                                            router.push(
                                                                `/dashboard`,
                                                            )
                                                        }
                                                        className=" text-left flex items-center gap-3 capitalize "
                                                    >
                                                        {/* <CustomImage src={item?.profilePicture} alt="logo" /> */}

                                                        <div className=" w-[40px] h-[40px] rounded-2xl bg-amber-400 ">
                                                            <CustomImage
                                                                src={
                                                                    user?.profilePicture +
                                                                    ""
                                                                }
                                                                alt="blue"
                                                                fillContainer
                                                                style={{
                                                                    borderRadius:
                                                                        "8px",
                                                                }}
                                                            />
                                                        </div>
                                                        {user?.firstName}
                                                    </button>
                                                </div>
                                            </div>
                                        )}
                                        <div className=" py-2 ">
                                            <button
                                                onClick={logout}
                                                className=" px-3 h-[45px] w-full gap-2 items-center flex "
                                            >
                                                <RiLogoutCircleLine
                                                    size={"20px"}
                                                />
                                                <p className=" font-medium text-violet-300 ">
                                                    Logout
                                                </p>
                                            </button>
                                        </div>
                                    </div>
                                </PopoverContent>
                            </Popover>
                        </div>
                    );
                } else {
                    return (
                        <button
                            onClick={() =>
                                router.push(
                                    item?.link === "/dashboard/profile"
                                        ? `/dashboard/profile/${user?._id}`
                                        : item?.link,
                                )
                            }
                            key={index}
                            className=" w-full h-full flex flex-col justify-center items-center cursor-pointer "
                        >
                            {item?.label !== "Profile" && (
                                <item.icon size={"24px"} />
                            )}
                            {item?.label === "Profile" && (
                                <Avatar
                                    src={user?.profilePicture}
                                    size="sm"
                                    name={user?.firstName}
                                />
                            )}
                            {/* <p className=" text-[10px] ">{item?.label}</p> */}
                        </button>
                    );
                }
            })}

            <ModalLayout
                title="Add Organization"
                isOpen={open}
                onClose={() => setOpen(false)}
            >
                <div className="w-full flex flex-col gap-4 items-center">
                    <OrganisationForm
                        formik={formik}
                        isLoading={isLoading}
                        image={image}
                        setImage={setImage}
                    />
                </div>
            </ModalLayout>
        </div>
    );
}



// {/* <div className=" gap-2 py-2 border-b border-b-gray-200 flex flex-col w-full">
// <p className=" text-xs ">
//     Organization
// </p>
// <div className=" py-3 flex flex-col gap-2 ">
//     {data
//         ?.filter(
//             (item) =>
//                 item._id !==
//                 organisationId,
//         )
//         ?.map((item) => {
//             return (
//                 <button
//                     onClick={() =>
//                         router.push(
//                             `/organisation/${item?._id}`,
//                         )
//                     }
//                     key={item?._id}
//                     className=" text-left flex items-center gap-3 capitalize "
//                 >
//                     {/* <CustomImage src={item?.profilePicture} alt="logo" /> */}

//                     <div className=" w-[40px] h-[40px] rounded-2xl bg-gray-200 ">
//                         <CustomImage
//                             src={`https://${AWS_BUCKET_NAME}.s3.${AWS_REGION}.amazonaws.com/${item?.profilePicture}`}
//                             alt="blue"
//                             fillContainer
//                             style={{
//                                 borderRadius:
//                                     "8px",
//                             }}
//                         />
//                     </div>
//                     {item.name}
//                 </button>
//             );
//         })}
// </div>
// <button
//     onClick={openHandler}
//     className=" lg:flex hidden items-center gap-3 text-neonblue-600 "
// >
//     <div className=" w-8 h-8 rounded-full flex justify-center items-center bg-neonblue-50 ">
//         <RiAddLine size={"18px"} />
//     </div>
//     <p className=" font-medium text-violet-300 ">
//         Add an organization
//     </p>
// </button>
// </div> */}