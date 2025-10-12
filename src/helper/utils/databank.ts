import { RiCashLine, RiChatSmile2Line, RiFocus2Line, RiLightbulbLine, RiMedalLine, RiUserCommunityLine, RiVipDiamondLine } from "react-icons/ri";
import { PiGearSix, PiGridFourFill } from "react-icons/pi";

export const sidebarlink = [
    {
        label: "Dashboard", 
        link: "/dashboard",
        icon: PiGridFourFill
    },
    {
        label: "Challenges", 
        link: "/dashboard/challenges",
        icon: RiFocus2Line
    },
    {
        label: "Achievements", 
        link: "/dashboard/achievements",
        icon: RiMedalLine
    },
    {
        label: "Communities", 
        link: "/dashboard/communities",
        icon: RiUserCommunityLine
    },
    {
        label: "Messages", 
        link: "/dashboard/messages",
        icon: RiChatSmile2Line
    },
    {
        label: "Portfolio", 
        link: "/dashboard/portfolio",
        icon: RiLightbulbLine
    },
    {
        label: "Settings", 
        link: "/dashboard/settings",
        icon: PiGearSix
    }
] 

export const bottombarlink = [
    {
        label: "Dashboard", 
        link: "/dashboard",
        icon: PiGridFourFill
    },
    {
        label: "Challenges", 
        link: "/dashboard/challenges",
        icon: RiFocus2Line
    }, 
    {
        label: "Portfolio", 
        link: "/dashboard/portfolio",
        icon: RiLightbulbLine
    },
    {
        label: "Messages", 
        link: "/dashboard/messages",
        icon: RiChatSmile2Line
    },
    {
        label: "Profile", 
        link: "/dashboard/profile",
        icon: RiLightbulbLine
    }
] 


export const userstats = [
    {
        label: "Prizes won", 
        value: "$0.00", 
        bgcolor: "#EEF0FF",
        color: "#596AFE",
        icon: RiCashLine
    },
    {
        label: "Points Earned", 
        value: "50", 
        bgcolor: "#ECF5CA99",
        color: "#8A9E3C",
        icon: RiVipDiamondLine
    },
    {
        label: "Challenges Completed", 
        value: "0", 
        bgcolor: "#FFF1EE",
        color: "#FC7753",
        icon: RiFocus2Line
    },
] 

export const skills = [
    {
        label: "Poster Design",
        value: "Poster Design"
    },
    {
        label: "Vibe Coding",
        value: "Vibe Coding"
    },
    {
        label: "Prototyping",
        value: "Prototyping"
    },
    {
        label: "React",
        value: "React"
    },
    {
        label: "Vue",
        value: "Vue"
    },
    {
        label: "Express",
        value: "Express"
    },
    {
        label: "Nodejs",
        value: "Nodejs"
    },
    {
        label: "Figma",
        value: "Figma"
    },
    {
        label: "UI/UX",
        value: "UI/UX"
    }
]