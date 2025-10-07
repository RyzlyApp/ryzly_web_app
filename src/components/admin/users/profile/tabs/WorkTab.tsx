"use client";
import { CustomImage } from "@/components/custom";
import { BiComment } from "react-icons/bi";
import { PiHandsClapping } from "react-icons/pi";
import { RiEyeLine, RiHeartLine } from "react-icons/ri";

interface WorkItem {
  id: string;
  title: string;
  description: string;
  image: string;
  views: number;
  likes: number;
  author: {
    name: string;
    avatar: string;
  };
}

interface WorkTabProps {
  userId: string;
}

const mockWorkItems: WorkItem[] = [
  {
    id: "1",
    title: "Mobile Banking App UI",
    description:
      "A sleek and secure mobile banking application with modern design principles",
    image: "/work.jpg",
    views: 34,
    likes: 1000,
    author: {
      name: "Ngozi Nnamani",
      avatar: "/work.jpg",
    },
  },
  {
    id: "2",
    title: "E-commerce Dashboard",
    description: "Comprehensive admin dashboard for online store management",
    image: "/work.jpg",
    views: 28,
    likes: 850,
    author: {
      name: "Ngozi Nnamani",
      avatar: "/work.jpg",
    },
  },
  {
    id: "3",
    title: "Weather Widget Design",
    description: "Beautiful and responsive weather widget with animations",
    image: "/work.jpg",
    views: 45,
    likes: 1200,
    author: {
      name: "Ngozi Nnamani",
      avatar: "/work.jpg",
    },
  },
  {
    id: "4",
    title: "Social Media App",
    description: "Modern social media application with clean UI design",
    image: "/work.jpg",
    views: 52,
    likes: 1500,
    author: {
      name: "Ngozi Nnamani",
      avatar: "/work.jpg",
    },
  },
  {
    id: "5",
    title: "Portfolio Website",
    description: "Creative portfolio website showcasing design work",
    image: "/work.jpg",
    views: 67,
    likes: 2000,
    author: {
      name: "Ngozi Nnamani",
      avatar: "/work.jpg",
    },
  },
  {
    id: "6",
    title: "Food Delivery App",
    description: "User-friendly food delivery application design",
    image: "/work.jpg",
    views: 41,
    likes: 1100,
    author: {
      name: "Ngozi Nnamani",
      avatar: "/work.jpg",
    },
  },
];

export default function WorkTab({ userId }: WorkTabProps) {
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {mockWorkItems.map((item) => (
          <div key={item.id} className="bg-white rounded-lg overflow-hidden">
            <div className="relative">
              <CustomImage
                src={item.image}
                alt={item.title}
                width={400}
                height={300}
                className="w-full h-48 object-cover rounded-lg"
              />

              {/* {item.id === "1" && (
                <div className="absolute top-4 left-4 bg-black bg-opacity-75 text-white px-3 py-1 rounded-lg">
                  <h4 className="text-sm font-semibold">{item.title}</h4>
                  <p className="text-xs opacity-90">{item.description}</p>
                </div>
              )} */}
            </div>

            <div className="py-2">
              <div className="flex items-center gap-2 mb-3">
                <CustomImage
                  src={item.author.avatar}
                  alt={item.author.name}
                  width={32}
                  height={32}
                  className="w-8 h-8 rounded-full"
                />
                <div className="flex-1">
                  <p className="text-xs font-medium text-gray-900 text-nowrap">
                    {item.author.name}
                  </p>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <BiComment size={14} />
                    <span className="text-xs">{item.views}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <PiHandsClapping size={14} />
                    <span className="text-xs">
                      {item.likes > 1000
                        ? `${(item.likes / 1000).toFixed(1)}K`
                        : item.likes}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
