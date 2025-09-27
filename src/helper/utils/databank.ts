import {
  RiCashLine,
  RiChatSmile2Line,
  RiFocus2Line,
  RiLightbulbLine,
  RiMedalLine,
  RiUserCommunityLine,
  RiVipDiamondLine,
} from "react-icons/ri";
import {
  PiGearSix,
  PiGridFourFill,
  PiSquaresFourThin,
  PiUsersFill,
} from "react-icons/pi";
import { FaCheckCircle } from "react-icons/fa";
import { FaAward } from "react-icons/fa6";
import { IoPeopleCircleOutline } from "react-icons/io5";
import { FiUser } from "react-icons/fi";
import { AiOutlineSetting } from "react-icons/ai";

export const sidebarlink = [
  {
    label: "Dashboard",
    link: "/dashboard",
    icon: PiGridFourFill,
  },
  {
    label: "Challenges",
    link: "/dashboard/challenges",
    icon: RiFocus2Line,
  },
  {
    label: "Achievements",
    link: "/dashboard/achievements",
    icon: RiMedalLine,
  },
  {
    label: "Communities",
    link: "/dashboard/communities",
    icon: RiUserCommunityLine,
  },
  {
    label: "Messages",
    link: "/dashboard/messages",
    icon: RiChatSmile2Line,
  },
  {
    label: "Portfolio",
    link: "/dashboard/portfolio",
    icon: RiLightbulbLine,
  },
  {
    label: "Settings",
    link: "/dashboard/settings",
    icon: PiGearSix,
  },
];

export const adminLinks = [
  {
    label: "Dashboard",
    link: "/admin/dashboard",
    icon: PiSquaresFourThin,
  },
  {
    label: "Users",
    link: "/admin/users",
    icon: PiUsersFill,
  },
  {
    label: "Challenges",
    link: "/admin/challenges",
    icon: RiUserCommunityLine,
  },
  {
    label: "Communities",
    link: "/admin/communities",
    icon: IoPeopleCircleOutline,
  },
  {
    label: "Approvals",
    link: "/admin/approvals",
    icon: FaCheckCircle,
  },
  {
    label: "Transactions",
    link: "/admin/transactions",
    icon: RiUserCommunityLine,
  },
  {
    label: "Rewards",
    link: "/admin/rewards",
    icon: FaAward,
  },
  {
    label: "Reports",
    link: "/admin/reports",
    icon: RiUserCommunityLine,
  },
  {
    label: "Admin Roles",
    link: "/admin/roles",
    icon: FiUser,
  },
  {
    label: "Settings",
    link: "/admin/settings",
    icon: AiOutlineSetting,
  },
];

export const bottombarlink = [
  {
    label: "Dashboard",
    link: "/dashboard",
    icon: PiGridFourFill,
  },
  {
    label: "Challenges",
    link: "/dashboard/challenges",
    icon: RiFocus2Line,
  },
  {
    label: "Communities",
    link: "/dashboard/communities",
    icon: RiUserCommunityLine,
  },
  {
    label: "Messages",
    link: "/dashboard/messages",
    icon: RiChatSmile2Line,
  },
  {
    label: "Portfolio",
    link: "/dashboard/portfolio",
    icon: RiLightbulbLine,
  },
];

export const userstats = [
  {
    label: "Prizes won",
    value: "$0.00",
    bgcolor: "#EEF0FF",
    color: "#596AFE",
    icon: RiCashLine,
  },
  {
    label: "Points Earned",
    value: "50",
    bgcolor: "#ECF5CA99",
    color: "#8A9E3C",
    icon: RiVipDiamondLine,
  },
  {
    label: "Challenges Completed",
    value: "0",
    bgcolor: "#FFF1EE",
    color: "#FC7753",
    icon: RiFocus2Line,
  },
];

export const skills = [
  {
    label: "Poster Design",
    value: "Poster Design",
  },
  {
    label: "Vibe Coding",
    value: "Vibe Coding",
  },
  {
    label: "Prototyping",
    value: "Prototyping",
  },
  {
    label: "React",
    value: "React",
  },
  {
    label: "Vue",
    value: "Vue",
  },
  {
    label: "Express",
    value: "Express",
  },
  {
    label: "Nodejs",
    value: "Nodejs",
  },
  {
    label: "Figma",
    value: "Figma",
  },
  {
    label: "UI/UX",
    value: "UI/UX",
  },
];
export const category = [
  {
    label: "Tech",
    value: "Tech",
  },
  {
    label: "Business",
    value: "Business",
  },
  {
    label: "FinTech",
    value: "FinTech",
  },
  {
    label: "HealthTech",
    value: "HealthTech",
  },
  {
    label: "EdTech",
    value: "EdTech",
  },
  {
    label: "AgroTech",
    value: "AgroTech",
  },
];

export const level = [
  {
    label: "Newbie",
    value: "Newbie",
  },
  {
    label: "Beginner",
    value: "Beginner",
  },
  {
    label: "Mid Level",
    value: "Mid Level",
  },
  {
    label: "Advanced",
    value: "Advanced",
  },
];
