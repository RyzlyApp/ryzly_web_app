import { usePathname, useRouter } from "next/navigation";
import { CustomButton, CustomImage } from "../custom";
import { useAtom, useSetAtom } from "jotai";
import { userActionsAtom, userAtom } from "@/helper/atom/user";
import { useEffect, useState } from "react";
import { textLimit } from "@/helper/utils/textlimit";
import {
    Popover,
    PopoverTrigger,
    Avatar,
    PopoverContent,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownTrigger,
} from "@heroui/react";
import { PiGearSix, PiGridFourFill } from "react-icons/pi";
import {
    RiUser3Line,
    RiInformationLine,
    RiLogoutCircleLine,
    RiMedalLine,
} from "react-icons/ri";
import { IoChevronDown } from "react-icons/io5";
import { IUser } from "@/helper/model/user";
import { Menu } from "lucide-react";

interface SubMenuItem {
    name: string;
    link: string;
}

interface MenuItem {
    name: string;
    link: string;
    isList?: boolean;
    sublist?: SubMenuItem[];
}

export default function ExploreChallengeNavbar() {
    const router = useRouter();
    const path = usePathname();

    const linkdata: MenuItem[] = [
        {
            name: "Challenges",
            link: "/challenges",
            isList: false,
        },
        {
            name: "How to Use",
            link: "/main/howtouse",
            isList: false,
        },
        // {
        //     name: "Resources",
        //     link: "/re",
        //     isList: true,
        //     sublist: [
        //         {
        //             name: "Coach",
        //             link: "/coach",
        //         },
        //         {
        //             name: "Organization",
        //             link: "/organised",
        //         },
        //         {
        //             name: "About",
        //             link: "/about",
        //         },
        //     ],
        // },
    ];

    const [userState, setUser] = useAtom(userAtom);
    const [isOpen, setIsOpen] = useState(false);
    const [openSublist, setOpenSublist] = useState<string | null>(null);
    const dispatch = useSetAtom(userActionsAtom);

    const logout = () => {
        localStorage.clear();
        router.push("/main");
        setUser({
            ...userState,
            data: {} as IUser,
        });
        setIsOpen(false);
    };

    const { data: user } = userState;

    useEffect(() => {
        dispatch({ type: "fetch" });
    }, [dispatch]);

    const clickHandler = (link: string) => {
        router.push(link);
        setIsOpen(false);
    };

    const toggleSublist = (name: string) => {
        setOpenSublist((prev) => (prev === name ? null : name));
    };

    return (
        <div className="w-full max-w-[90%] mx-auto lg:max-w-[80%] px-4 py-5 gap-4 bg-white rounded-3xl shadow flex justify-between items-center">
            <button
                onClick={() => router.push("/main")}
                className=" lg:flex hidden "
            >
                <CustomImage
                    src="/images/logo.png"
                    alt="logo"
                    width={100}
                    height={40}
                    className=" cursor-pointer "
                />
            </button>
            <button
                onClick={() => router.push("/main")}
                className=" lg:hidden "
            >
                <CustomImage
                    src="/images/logo.png"
                    alt="logo"
                    width={90}
                    height={40}
                />
            </button>

            {/* Desktop Navigation */}
            <div className=" hidden lg:flex items-center gap-4 ">
                {linkdata?.map((MenuItem, index) => {
                    const isChildActive = MenuItem?.sublist?.some(
                        (sub) => path?.includes(sub.link)
                    );
                    const isActive = path?.includes(MenuItem?.link) || isChildActive;

                    if (MenuItem?.isList) {
                        return (
                            <div key={index}>
                                <Dropdown>
                                    <DropdownTrigger>
                                        <button
                                            className={`${isActive ? "text-primary" : "text-black"} font-medium hover:text-primary gap-2 items-center h-[45px] text-sm flex cursor-pointer`}
                                        >
                                            {MenuItem?.name}
                                            <IoChevronDown />
                                        </button>
                                    </DropdownTrigger>
                                    {MenuItem?.sublist &&
                                        MenuItem?.sublist?.length > 0 && (
                                            <DropdownMenu aria-label={`${MenuItem.name} Menu`}>
                                                {MenuItem?.sublist?.map((item) => (
                                                    <DropdownItem
                                                        onPress={() =>
                                                            clickHandler(item?.link)
                                                        }
                                                        key={item.link}
                                                        className={`${path?.includes(item.link) ? "text-primary font-semibold" : ""}`}
                                                    >
                                                        {item.name}
                                                    </DropdownItem>
                                                ))}
                                            </DropdownMenu>
                                        )}
                                </Dropdown>
                            </div>
                        );
                    } else {
                        return (
                            <button
                                key={index}
                                onClick={() => router.push(MenuItem?.link)}
                                className={` ${isActive ? " text-primary " : " text-black "} font-medium hover:text-primary h-[45px] text-sm flex items-center `}
                            >
                                {MenuItem?.name}
                            </button>
                        );
                    }
                })}
            </div>

            {/* User State & Mobile Trigger */}
            <div className=" flex items-center ">
                {!userState.data?._id && (
                    <div className=" hidden lg:flex gap-4 items-center text-sm">
                        <CustomButton
                            onClick={() => router.push("/auth")}
                            variant="outline"
                            rounded="full"
                        >
                            Login
                        </CustomButton>
                        <CustomButton
                            onClick={() => router.push("/auth/signup")}
                            variant="auth"
                            rounded="full"
                        >
                            Get Started
                        </CustomButton>
                    </div>
                )}

                <Popover
                    isOpen={isOpen}
                    onOpenChange={(value) => setIsOpen(value)}
                    showArrow
                    backdrop={"opaque"}
                    offset={10}
                    placement="top"
                >
                    <PopoverTrigger>
                        {userState.data?._id ? (
                            <button className=" w-fit h-fit border-gray-300 flex gap-2 px-2 py-1 border rounded-full justify-center items-center cursor-pointer ">
                                <Avatar
                                    src={user?.profilePicture}
                                    className=" w-7 h-7 text-[10px] "
                                    name={user?.firstName}
                                />
                                <IoChevronDown />
                            </button>
                        ) : (
                            <button className=" lg:hidden w-fit h-fit border-gray-300 flex gap-2 px-2 py-1 border rounded-full justify-center items-center cursor-pointer ">
                                <Menu size={"17px"} />
                            </button>
                        )}
                    </PopoverTrigger>

                    <PopoverContent className="w-[270px]">
                        <div className="px-1 py-2 w-full flex flex-col text-black  ">
                            <button
                                className={`${!userState.data?._id ? " hidden " : " flex "}  w-full h-[58px] px-3 border-b border-b-gray-200 gap-2 items-center `}
                            >
                                <Avatar
                                    className=" w-9 h-9 text-full  text-black  "
                                    src={user?.profilePicture}
                                    name={user?.firstName}
                                />
                                <div className=" flex flex-col items-start  ">
                                    <p className=" font-semibold text-violet-300 ">
                                        {user?.firstName
                                            ? textLimit(
                                                user?.firstName +
                                                " " +
                                                user?.lastName +
                                                "",
                                                15,
                                            )
                                            : ""}
                                    </p>
                                    {user?.skills && (
                                        <p className=" text-xs ">
                                            {user?.skills[0]}
                                        </p>
                                    )}
                                </div>
                            </button>
                            <div
                                className={` ${!userState.data?._id ? " hidden " : " flex "} border-b border-b-gray-200 flex-col w-full `}
                            >
                                <button
                                    onClick={() =>
                                        clickHandler(
                                            `/dashboard/profile/${user?._id}`,
                                        )
                                    }
                                    className=" px-3 h-[45px] gap-2 items-center flex "
                                >
                                    <RiUser3Line size={"20px"} />
                                    <p className=" font-medium text-violet-300 ">
                                        Your Profile
                                    </p>
                                </button>
                                <button
                                    onClick={() => clickHandler(`/dashboard`)}
                                    className=" px-3 h-[45px] gap-2 items-center flex "
                                >
                                    <PiGridFourFill size={"20px"} />
                                    <p className=" font-medium text-violet-300 ">
                                        Dashboard
                                    </p>
                                </button>
                                <button
                                    onClick={() =>
                                        clickHandler(`/dashboard/achievements`)
                                    }
                                    className=" px-3 h-[45px] gap-2 items-center flex "
                                >
                                    <RiMedalLine size={"20px"} />
                                    <p className=" font-medium text-violet-300 ">
                                        Achievements
                                    </p>
                                </button>
                                <button
                                    onClick={() =>
                                        clickHandler(`/dashboard/settings`)
                                    }
                                    className=" px-3 h-[45px] gap-2 items-center flex "
                                >
                                    <PiGearSix size={"20px"} />
                                    <p className=" font-medium text-violet-300 ">
                                        Settings
                                    </p>
                                </button>
                                <button className=" px-3 h-[45px] gap-2 items-center flex ">
                                    <RiInformationLine size={"20px"} />
                                    <p className=" font-medium text-violet-300 ">
                                        Contact Support
                                    </p>
                                </button>
                            </div>

                            {/* Mobile Navigation List */}
                            <div className=" lg:hidden flex-col pb-0 p-4 flex">
                                {linkdata?.map((MenuItem, index) => {
                                    const isChildActive = MenuItem?.sublist?.some(
                                        (sub) => path?.includes(sub.link)
                                    );
                                    const isActive = path?.includes(MenuItem?.link) || isChildActive;

                                    if (MenuItem?.isList) {
                                        return (
                                            <div key={index} className="flex flex-col w-full">
                                                <button
                                                    onClick={() => toggleSublist(MenuItem.name)}
                                                    className={` ${isActive ? " text-primary " : " text-black "} font-medium hover:text-primary justify-between items-center h-[40px] text-sm flex w-full `}
                                                >
                                                    <span>{MenuItem?.name}</span>
                                                    <IoChevronDown
                                                        className={`transition-transform duration-200 ${openSublist === MenuItem.name
                                                                ? "rotate-180"
                                                                : ""
                                                            }`}
                                                    />
                                                </button>
                                                {openSublist === MenuItem.name &&
                                                    MenuItem?.sublist && (
                                                        <div className="pl-4 flex flex-col gap-1 my-1 border-l-2 border-gray-100">
                                                            {MenuItem.sublist.map(
                                                                (item, subIndex) => (
                                                                    <button
                                                                        key={subIndex}
                                                                        onClick={() =>
                                                                            clickHandler(
                                                                                item?.link,
                                                                            )
                                                                        }
                                                                        className={` ${path?.includes(
                                                                            item?.link,
                                                                        )
                                                                                ? " text-primary font-medium "
                                                                                : " text-gray-600 "
                                                                            } hover:text-primary text-left py-2 text-sm flex items-center `}
                                                                    >
                                                                        {item.name}
                                                                    </button>
                                                                ),
                                                            )}
                                                        </div>
                                                    )}
                                            </div>
                                        );
                                    } else {
                                        return (
                                            <button
                                                key={index}
                                                onClick={() =>
                                                    clickHandler(MenuItem?.link)
                                                }
                                                className={` ${isActive ? " text-primary " : " text-black "} font-medium hover:text-primary h-[40px] text-sm flex items-center `}
                                            >
                                                {MenuItem?.name}
                                            </button>
                                        );
                                    }
                                })}
                            </div>

                            {userState.data?._id ? (
                                <div className=" pb-2 ">
                                    <button
                                        onClick={logout}
                                        className=" px-3 h-[45px] gap-2 items-center flex "
                                    >
                                        <RiLogoutCircleLine size={"20px"} />
                                        <p className=" font-medium text-violet-300 ">
                                            Logout
                                        </p>
                                    </button>
                                </div>
                            ) : (
                                <div className=" flex flex-col gap-2 mt-4 items-center text-sm">
                                    <CustomButton
                                        onClick={() => router.push("/auth")}
                                        variant="outline"
                                        rounded="full"
                                        fullWidth
                                    >
                                        Login
                                    </CustomButton>
                                    <CustomButton
                                        onClick={() =>
                                            router.push("/auth/signup")
                                        }
                                        variant="auth"
                                        rounded="full"
                                        fullWidth
                                    >
                                        Get Started
                                    </CustomButton>
                                </div>
                            )}
                        </div>
                    </PopoverContent>
                </Popover>
            </div>
        </div>
    );
}
