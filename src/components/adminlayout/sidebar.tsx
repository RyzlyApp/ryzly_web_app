"use client";
import { adminLinks } from "@/helper/utils/databank";
import { CustomImage } from "../custom";
import { usePathname, useRouter } from "next/navigation";
import { RiLogoutBoxLine } from "react-icons/ri";

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <div className=" w-[280px] bg-violet-500 h-screen p-5 flex flex-col ">
      <div className=" w-full h-[78px] ">
        <CustomImage
          src="/images/logowhite.png"
          alt="logo"
          width={140}
          height={40}
          className="w-[140px] h-auto"
        />
      </div>
      <div className=" w-full flex flex-col py-3 ">
        {adminLinks?.map((item, index) => {
          return (
            <button
              onClick={() => router.push(item?.link)}
              key={index}
              className={` w-full flex gap-3 rounded-lg h-[48px] cursor-pointer items-center text-white px-2 ${
                item?.link === pathname ? " bg-neonblue-500 " : "  "
              } `}
            >
              <item.icon size="20px" />
              <p className=" font-semibold text-sm ">{item?.label}</p>
            </button>
          );
        })}
      </div>

      <button className="mt-auto w-full flex gap-3 rounded-lg h-[48px] cursor-pointer items-center text-white px-2">
        <RiLogoutBoxLine size="20px" />
        <p className=" font-semibold text-sm ">Logout</p>
      </button>
    </div>
  );
}
