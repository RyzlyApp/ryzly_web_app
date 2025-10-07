"use client";
import { CustomImage } from "@/components/custom";
import { BiCheck } from "react-icons/bi";

const ChallengeOverview = () => {
  const challengeIncludes = [
    "Step-by-step challenge guide and learning resources",
    "Daily/weekly tasks with clear objectives",
    "Exclusive video tutorials and expert insights",
    "Access to a private online community for support & networking",
    "Templates, checklists, and downloadable materials",
    "Lifetime access to the challenge materials after completion",
    "Certificate of completion to showcase your achievement",
  ];

  const requirements = [
    "A stable internet connection",
    "Basic understanding of the challenge topic (no advanced skills required)",
    "A commitment to follow through with the tasks for the full challenge duration",
  ];

  const targetAudience = [
    "Beginners looking to learn new skills",
    "Professionals wanting to upskill or reskill",
    "Anyone seeking structured learning with accountability",
    "Individuals who prefer hands-on, practical learning approaches",
  ];

  return (
    <div className="space-y-6">
      <div className="bg-[#F5F5F5] rounded-lg p-6">
        <h2 className="text-lg font-bold text-gray-900 mb-4">About Host</h2>
        <div className="flex gap-4 mb-4">
          <CustomImage
            src="/work.jpg"
            alt="avatar"
            width={1000}
            height={1000}
            className="w-12 h-12 rounded-full"
          />
          <div>
            <h3 className="font-bold text-gray-900">Ngozi Nnamani</h3>
            <p className="text-sm text-gray-600">200 Challenges hosted</p>
          </div>
        </div>
        <p className="text-sm text-gray-700 leading-relaxed">
          Passionate UI/UX designer crafting intuitive and visually engaging
          digital experiences. Blending creativity with usability to turn ideas
          into seamless interfaces that delight and inspire.
        </p>
      </div>

      <div>
        <h4 className="font-semibold text-gray-900 mb-4">
          This Challenge Includes
        </h4>
        <div className="space-y-3">
          {challengeIncludes.map((item, index) => (
            <div key={index} className="flex gap-3 items-start">
              <BiCheck className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
              <p className="text-sm text-gray-700">{item}</p>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h4 className="font-semibold text-gray-900 mb-4">Requirements</h4>
        <div className="space-y-3">
          {requirements.map((item, index) => (
            <div key={index} className="flex gap-3 items-start">
              <BiCheck className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
              <p className="text-sm text-gray-700">{item}</p>
            </div>
          ))}
        </div>
      </div>
      <div>
        <h4 className="font-semibold text-gray-900 mb-4">
          Who This Challenge Is For
        </h4>
        <div className="space-y-3">
          {targetAudience.map((item, index) => (
            <div key={index} className="flex gap-3 items-start">
              <BiCheck className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
              <p className="text-sm text-gray-700">{item}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChallengeOverview;
