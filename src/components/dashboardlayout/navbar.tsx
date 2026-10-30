"use client";
import Link from "next/link";
import Image from "next/image";
import { RiBriefcaseLine, RiSearchLine, RiVipDiamondLine } from "react-icons/ri";

import { CustomSearch } from "../custom";
import { useAtom, useSetAtom } from "jotai";
import { useEffect } from "react";
import { userActionsAtom, userAtom } from "@/helper/atom/user";
import CreateChallengeBtn from "../dashboard/createChallengeBtn";
import { usePathname, useRouter } from "next/navigation";
import { ChallengeNavbar } from "../challenges";
import { searchAtom } from "@/helper/atom/search";
import { IoChevronBack } from "react-icons/io5";
import NotificationIcon from "@/modules/notifications/ui/notificationIcon";
import CreateCommunitieBtn from "../communities/createCommunityBtn";
import CommunityDetailsNavbar from "../communities/communityDetailsNavbar";

export default function Navbar() {
    const [userState] = useAtom(userAtom);
    const dispatch = useSetAtom(userActionsAtom);
    const router = useRouter();
    const [search, setSearch] = useAtom(searchAtom);

    const { data: user } = userState;

    // const { data } = useFetchData<IOrganisationDetails>({
    //     endpoint: `/organization/${organisationId}`,
    //     name: "organizationdetails",
    //     enable: organisationId ? true : false,
    // });

    useEffect(() => {
        dispatch({ type: "fetch" });
    }, [dispatch]);

    useEffect(() => {
        setSearch("");
    }, [setSearch]);

    const pathname = usePathname();
    // const dirBreadcrumb = (pathname.includes("/dashboard") ? pathname.split("/")[2] : pathname.split("/")[1]) || "Dashboard";

    // useEffect(() => {
    //     setOrganisation(data as IOrganisationDetails);
    // }, [data]);

    const isCommunityListPage = pathname === "/dashboard/communities";
    const isCommunityDetailsPage =
        pathname?.startsWith("/dashboard/communities/") &&
        pathname !== "/dashboard/communities" &&
        pathname !== "/dashboard/communities/new";
    const isCommunityPage = pathname?.startsWith("/dashboard/communities/");

    return (
        <>
            {!pathname?.includes("/dashboard/challenges/") &&
                !isCommunityPage &&
                !pathname?.includes("/dashboard/search") && (
                    <div className=" w-full h-[70px] lg:h-[80px] flex justify-between items-center px-5 bg-white text-black">
                        <div className="flex items-center gap-3">
                            {pathname === "/workexp" && (
                                <Link href="/dashboard" className="flex items-center gap-2">
                                    <Image
                                        src="/MainBrandLogo.png"
                                        alt="Ryzly Logo"
                                        width={90}
                                        height={30}
                                        className="w-[75px] sm:w-[90px] h-auto object-contain cursor-pointer"
                                    />
                                </Link>
                            )}
                            <p className=" text-base lg:text-2xl capitalize font-bold ">
                                {pathname === "/workexp" && !user?.firstName
                                    ? "Work Experience"
                                    : `Hello ${
                                          user?.userType === "organization"
                                              ? user?.companyName || ""
                                              : user?.firstName || ""
                                      }`}
                                {/* {dirBreadcrumb} */}
                            </p>
                        </div>
                        {user?.userType !== "organization" && (
                            <div className=" flex gap-1 items-center ">
                                <RiVipDiamondLine size={"16px"} />
                                <p className=" font-medium text-xs flex gap-1 items-center ">
                                    {user?.userType === "organization"
                                        ? 0
                                        : user?.ryzlyPoints || 0}{" "}
                                    <span className=" lg:flex hidden ">
                                        points available
                                    </span>
                                </p>
                            </div>
                        )}
                        <div className=" flex gap-3 sm:gap-4 items-center ">
                            <Link
                                href="/workexp"
                                title="Work Experience"
                                className={`h-[36px] px-3 sm:px-4 rounded-full flex items-center gap-1.5 text-xs sm:text-sm font-semibold transition-all duration-200 ${
                                    pathname === "/workexp"
                                        ? "bg-[#5160E7] text-white shadow-sm"
                                        : "bg-gray-100 text-gray-700 hover:bg-[#EEF0FF] hover:text-[#5160E7] border border-gray-200/60"
                                }`}
                            >
                                <RiBriefcaseLine size={"16px"} className="shrink-0" />
                                <span className="hidden sm:inline whitespace-nowrap">
                                    Work Experience
                                </span>
                            </Link>

                            {pathname === "/workexp" && (
                                <Link
                                    href="/dashboard"
                                    className="hidden md:flex text-xs sm:text-sm font-medium text-gray-600 hover:text-[#5160E7] px-3 py-1.5 rounded-full hover:bg-gray-100 transition-colors"
                                >
                                    Dashboard
                                </Link>
                            )}
                            {pathname === "/dashboard/challenges" && (
                                <div className=" lg:flex hidden w-[250px]  ">
                                    <CustomSearch
                                        value={search}
                                        onClear={() => setSearch("")}
                                        onChange={(e) =>
                                            setSearch(e.target.value)
                                        }
                                    />
                                </div>
                            )}
                            <button
                                onClick={() => router.push("/dashboard/search")}
                                className=" lg:hidden flex cursor-pointer "
                            >
                                <RiSearchLine size={"17px"} />
                            </button>
                            {isCommunityListPage ? (
                                <CreateCommunitieBtn />
                            ) : (
                                <CreateChallengeBtn />
                            )}
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
