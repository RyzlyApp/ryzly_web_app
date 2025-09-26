import { CustomImage, CustomButton } from "@/components/custom";
import React from "react";
import { BiBookmark, BiComment } from "react-icons/bi";
import { PiHandsClapping } from "react-icons/pi";

const PortfolioPage = () => {
  const comments = [
    {
      id: 1,
      name: "Adebayo Nwosu",
      date: "29 Jul 2025",
      comment:
        "Really loved how clean your layout is! The spacing and typography make it super easy to read. One small note: maybe consider adding a little more contrast on the CTA button so it pops more.",
      avatar: "/avatars/adebayo.jpg",
    },
    {
      id: 2,
      name: "Adaobi Adeyemi",
      date: "29 Jul 2025",
      comment:
        "Nice work! Your idea for a gamified savings tracker is really creative. I'd love to see a bit more detail around how users actually earn rewards maybe a short user flow or example?",
      avatar: "/avatars/adaobi.jpg",
    },
    {
      id: 3,
      name: "Oluwakemi Ogunde",
      date: "29 Jul 2025",
      comment:
        "Your color palette is on point. It feels very Gen Z-friendly. If I could suggest anything, it might be to simplify the onboarding flow just a bit 3–4 steps max to keep it snappy.",
      avatar: "/avatars/oluwakemi.jpg",
    },
    {
      id: 4,
      name: "Adaobi Nwosu",
      date: "29 Jul 2025",
      comment:
        "I really like how you explained your thought process in the case study. It helped me understand your design choices better. Maybe add 1-2 visuals of your early wireframes to show how the idea evolved.",
      avatar: "/avatars/adaobi2.jpg",
    },
    {
      id: 5,
      name: "Chukwu Nnamani",
      date: "29 Jul 2025",
      comment:
        "You nailed the tone in your copy super relatable! One thing that confused me slightly was the savings goal screen. Could you clarify how progress is tracked visually?",
      avatar: "/avatars/chukwu.jpg",
    },
  ];

  const projectDetails = {
    title: "Mobile Banking App UI",
    date: "29 Jul 2025",
    description:
      "A sleek and secure mobile banking experience designed for today's digital-first users. This solution combines modern UI patterns with intuitive navigation, enabling seamless money management, real-time insights, and strong user trust all in one beautifully crafted app.",
    tools: ["Finance", "Illustration", "Drive", "After Effects"],
    likes: 24,
    commentsCount: 34,
    projectLink: "#",
  };

  return (
    <div className="flex flex-col lg:flex-row gap-5 lg:p-6">
      <div className="w-full lg:w-3/5 space-y-5">
        <div className="bg-white rounded-lg p-4 lg:p-6">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <CustomImage
                width={100}
                height={100}
                src="/landingPage/impactDummyImage.png"
                alt="Profile Picture"
                className="rounded-full h-[30px] w-[30px]"
              />
              <div>
                <h2 className="font-semibold text-lg">Emeka Oludare</h2>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-gray-600">
                <BiComment className="" />
                <span className="text-sm font-medium">
                  {projectDetails.commentsCount}
                </span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <PiHandsClapping className="" />
                <span className="text-sm font-medium">
                  {projectDetails.likes}
                </span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <BiBookmark className="" />
              </div>
            </div>
          </div>

          <div className="my-6">
            <CustomImage
              width={100}
              height={100}
              src="/productImage.jpg"
              alt="Mobile Banking App UI"
              className="w-full h-64 lg:h-80 object-cover rounded-lg"
              fallbackSrc="/images/fallback.png"
            />
          </div>

          <div className="">
            <span className="text-xs text-gray-500">
              posted on {projectDetails.date}
            </span>
            <div className="flex items-center justify-between mb-4 mt-2">
              <h1 className="lg:text-xl font-bold">{projectDetails.title}</h1>
            </div>

            <p className="text-sm text-gray-700 leading-relaxed mb-6">
              {projectDetails.description}
            </p>

            <div className="mb-6 flex justify-between items-center">
              <h3 className="text-xs font-semibold mb-2">Attached link</h3>
              <CustomButton variant="primary" size="sm">
                link to project
              </CustomButton>
            </div>

            <div className="mb-6">
              <h3 className="text-sm font-semibold mb-2">Tools used</h3>
              <div className="flex flex-wrap gap-2">
                {projectDetails.tools.map((tool, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-[#E9EAEB] text-xs rounded-full"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full lg:w-2/5 bg-white rounded-lg p-4">
        <div className="rounded-lg">
          <h3 className="text-lg font-bold mb-6">
            {projectDetails.commentsCount} Comments
          </h3>

          <div className="space-y-3">
            {comments.map((comment) => (
              <div key={comment.id} className="pb-6 last:border-b-0">
                <div className="flex gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold text-sm">
                      {comment.name.charAt(0)}
                    </span>
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h4 className="font-semibold text-sm">{comment.name}</h4>
                      <span className="text-xs text-gray-500">
                        {comment.date}
                      </span>
                    </div>

                    <p className="text-gray-700 text-sm leading-relaxed">
                      {comment.comment}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6">
            <textarea
              placeholder="Got feedback share it!!..."
              className="w-full p-3 border border-gray-300 rounded-lg resize-none min-h-10 text-sm"
            />
            <div className="flex justify-end mt-3">
              <CustomButton variant="primary" size="md">
                Post Comment
              </CustomButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PortfolioPage;
