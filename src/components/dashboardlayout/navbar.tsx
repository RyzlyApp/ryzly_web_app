"use client";
import {
  RiNotification2Line,
  RiSearchLine,
  RiVipDiamondLine,
} from "react-icons/ri";

import { CustomSearch } from "../custom";
import { useAtom, useSetAtom } from "jotai";
import { useEffect } from "react";
import { userActionsAtom, userAtom } from "@/helper/atom/user";
import { textLimit } from "@/helper/utils/textlimit";
import CreateChallengeBtn from "../dashboard/createChallengeBtn";
import { usePathname, useRouter } from "next/navigation";
import { ChallengeNavbar } from "../challenges";
import { searchAtom } from "@/helper/atom/search";
import { IoChevronBack } from "react-icons/io5"; 
import NotificationIcon from "@/modules/notifications/ui/notificationIcon";

export default function Navbar() {
  const [userState] = useAtom(userAtom);
  const dispatch = useSetAtom(userActionsAtom);
  const router = useRouter();
  const [search, setSearch] = useAtom(searchAtom);

  useEffect(() => {
    dispatch({ type: "fetch" });
  }, [dispatch]);

  const { data: user } = userState;

  useEffect(() => {
    setSearch("");
  }, [setSearch]);
  
  const pathname = usePathname();

  return (
    <>
      {!pathname?.includes("/dashboard/challenges/") &&
        !pathname?.includes("/dashboard/search") && (
          <div className=" w-full h-[70px] lg:h-[80px] flex justify-between items-center px-5 ">
            <p className=" text-base lg:text-2xl font-bold ">
              Hello {user?.firstName ? user?.firstName : ""}
            </p>
            <div className=" flex gap-1 items-center ">
              <RiVipDiamondLine size={"16px"} />
              <p className=" font-medium text-xs flex gap-1 items-center ">
                {user?.ryzlyPoints}{" "}
                <span className=" lg:flex hidden ">points available</span>
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
              <CreateChallengeBtn />
              <NotificationIcon />
            </div>
          </div>
        )}
      {pathname?.includes("/dashboard/challenges/") && <ChallengeNavbar />}
      {pathname?.includes("/dashboard/search") && (
        <div className=" w-full h-[70px] lg:h-[80px] flex justify-center items-center gap-3 ">
          <button onClick={() => router.back()} className=" absolute left-3  ">
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
    </>
  );
}
