"use client";
import { Chip, Avatar } from "@heroui/react";
import { CustomImage } from "@/components/custom";
import { RiThumbUpLine } from "react-icons/ri";

interface Resource {
  id: string;
  author: {
    name: string;
    role: string;
    avatar: string;
    isCoach: boolean;
  };
  title: string;
  description: string;
  image: string;
  date: string;
  helpfulCount: number;
}

const mockResources: Resource[] = [
  {
    id: "1",
    author: {
      name: "Adebola Ogunde",
      role: "UI/UX Designer",
      avatar: "/work.jpg",
      isCoach: true,
    },
    title: "Responsive Design with Figma Auto Layout",
    description:
      "A 10-minute video that walks you through creating responsive designs using Figma's auto layout feature. Perfect for making your layouts flexible and clean.",
    image: "/work.jpg",
    date: "19 June, 2025",
    helpfulCount: 24,
  },
  {
    id: "2",
    author: {
      name: "Oluwaseun Obioma",
      role: "UI/UX Designer",
      avatar: "/work.jpg",
      isCoach: true,
    },
    title: "High-Converting Headlines Guide",
    description:
      "A concise article with examples of high-converting headlines and call-to-action text. Use these principles to strengthen your landing page challenge entry.",
    image: "/work.jpg",
    date: "18 June, 2025",
    helpfulCount: 18,
  },
];

const ChallengeResources = () => {
  return (
    <div className="space-y-6">
      {mockResources.map((resource) => (
        <div
          key={resource.id}
          className="bg-white border-b border-gray-200 p-4"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <Avatar
                src={resource.author.avatar}
                alt={resource.author.name}
                className="w-10 h-10"
              />
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="text-sm font-semibold text-gray-900">
                    {resource.author.name}
                  </h4>
                  {resource.author.isCoach && (
                    <Chip
                      //   color="#596AFE"
                      className="bg-[#596AFE] text-white"
                      size="sm"
                      variant="flat"
                    >
                      Coach
                    </Chip>
                  )}
                </div>
                <p className="text-xs text-gray-600">{resource.author.role}</p>
              </div>
            </div>
            <span className="text-xs text-gray-500">{resource.date}</span>
          </div>
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {resource.title}
            </h3>
            <p className="text-sm text-gray-700 leading-relaxed">
              {resource.description}
            </p>
          </div>
          <div className="mb-4">
            <CustomImage
              src={resource.image}
              alt={resource.title}
              width={800}
              height={400}
              className="w-full h-64 object-cover rounded-lg"
            />
          </div>
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-2 text-sm text-gray-600 hover:text-blue-600 transition-colors">
              <RiThumbUpLine className="w-4 h-4" />
              <span>Helpful</span>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ChallengeResources;
