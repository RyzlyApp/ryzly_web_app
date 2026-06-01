"use client";
import { RiArrowLeftLine, RiSearchLine, RiUpload2Fill, RiUpload2Line, RiUploadLine, RiVipDiamondLine } from "react-icons/ri";

import { CustomSearch } from "../custom";
import { useAtom, useSetAtom } from "jotai";
import { useEffect } from "react";
import { userActionsAtom, userAtom } from "@/helper/atom/user";
import CreateChallengeBtn from "../dashboard/createChallengeBtn";
import { useParams, usePathname, useRouter } from "next/navigation";
import { ChallengeNavbar } from "../challenges";
import { searchAtom } from "@/helper/atom/search";
import { IoChevronBack } from "react-icons/io5";
import NotificationIcon from "@/modules/notifications/ui/notificationIcon";
import { useFetchData } from "@/hook/useFetchData";
import { organisationAtom } from "@/helper/atom/organization";
import { IOrganisationDetails } from "@/helper/model/user";
import CreateCommunitieBtn from "../communities/createCommunityBtn";
import CommunityDetailsNavbar from "../communities/communityDetailsNavbar";

export default function Navbar() {
    const [userState] = useAtom(userAtom);
    const dispatch = useSetAtom(userActionsAtom);
    const router = useRouter();
    const [search, setSearch] = useAtom(searchAtom);
    const [organization, setOrganisation] = useAtom(organisationAtom);



    const { data: user } = userState;

    const param = useParams();
    const organisationId = param.organisationId;

    const { data } = useFetchData<IOrganisationDetails>({
        endpoint: `/organization/${organisationId}`, name: "organizationdetails", enable: organisationId ? true : false
    })
    // /organization/{id}

    console.log(data);

    useEffect(() => {
        dispatch({ type: "fetch" });
    }, [dispatch]);


    useEffect(() => {
        setSearch("");
    }, [setSearch]);

    const pathname = usePathname();
    // const dirBreadcrumb = (pathname.includes("/dashboard") ? pathname.split("/")[2] : pathname.split("/")[1]) || "Dashboard";

    useEffect(() => {
        setOrganisation(data as IOrganisationDetails)
    }, [data])

    const isCommunityListPage = pathname === "/dashboard/communities";
    const isCommunityDetailsPage = pathname?.startsWith("/dashboard/communities/") &&
        pathname !== "/dashboard/communities" &&
        pathname !== "/dashboard/communities/new"
    const isCommunityPage = pathname?.startsWith("/dashboard/communities/")

    return (
        <>
            {!pathname?.includes("/dashboard/challenges/") &&
                !isCommunityPage &&
                !pathname?.includes("/dashboard/search") && (
                    <div className=" w-full h-[70px] lg:h-[80px] flex justify-between items-center px-5 ">
                        <p className=" text-base lg:text-2xl capitalize font-bold ">
                            Hello {organization?._id ? organization?.name : user?.firstName ? user?.firstName : ""}
                            {/* {dirBreadcrumb} */}
                        </p>
                        <div className=" flex gap-1 items-center ">
                            <RiVipDiamondLine size={"16px"} />
                            <p className=" font-medium text-xs flex gap-1 items-center ">
                                {organisationId ? 0 : user?.ryzlyPoints}{" "}
                                <span className=" lg:flex hidden ">
                                    points available
                                </span>
                            </p>
                        </div>
                        <div className=" flex gap-4 items-center ">
                            <div className=" lg:flex hidden w-[250px]  ">
                                <CustomSearch
                                    value={search}
                                    onClear={() => setSearch("")}
                                    onChange={(e) => setSearch(e.target.value)}
                                />
                            </div>
                            <button
                                onClick={() => router.push("/dashboard/search")}
                                className=" lg:hidden flex cursor-pointer "
                            >
                                <RiSearchLine size={"17px"} />
                            </button>
                            {isCommunityListPage ? <CreateCommunitieBtn  /> : <CreateChallengeBtn />}
                            <NotificationIcon />
                        </div>
                    </div>
                )}
            {pathname?.includes("/dashboard/challenges/") && (
                <ChallengeNavbar />
            )}
            {pathname?.includes("/dashboard/search") && (
                <div className=" w-full h-[70px] lg:h-[80px] flex justify-center items-center gap-3 ">
                    <button
                        onClick={() => router.back()}
                        className=" absolute left-3  "
                    >
                        <IoChevronBack size={"20px"} />
                    </button>
                    <div className=" w-[75%] ">
                        <CustomSearch
                            value={search}
                            onClear={() => setSearch("")}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search for a challenge"
                        />
                    </div>
                </div>
            )}
            {/* ✅ Communities Navbar - shown for /dashboard/communities/:id */}
            {isCommunityDetailsPage && <CommunityDetailsNavbar />}
        </>
    );
}
