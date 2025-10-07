import { Avatar } from "@heroui/react";
import CustomImage from "@/components/custom/customImage";

interface Challenge {
  id: string;
  title: string;
  host: string;
  status: "Ongoing" | "Pending" | "Completed" | "Banned";
  date: string;
  participants: number;
  thumbnail: string;
}

interface ChallengesTableProps {
  challenges: Challenge[];
  onChallengeClick?: (challenge: Challenge) => void;
}

export default function ChallengesTable({
  challenges,
  onChallengeClick,
}: ChallengesTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-gray-50">
          <tr>
            <th className="text-left py-3 px-6 text-sm font-medium text-gray-600">
              Title
            </th>
            <th className="text-left py-3 px-6 text-sm font-medium text-gray-600">
              Host
            </th>
            <th className="text-left py-3 px-6 text-sm font-medium text-gray-600">
              Status
            </th>
            <th className="text-left py-3 px-6 text-sm font-medium text-gray-600">
              Date
            </th>
            <th className="text-left py-3 px-6 text-sm font-medium text-gray-600">
              Participants
            </th>
          </tr>
        </thead>
        <tbody>
          {challenges.map((challenge) => (
            <tr
              key={challenge.id}
              className="border-b border-gray-100 hover:bg-gray-50"
              onClick={() => onChallengeClick && onChallengeClick(challenge)}
            >
              <td className="py-4 px-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gray-200 rounded-lg flex-shrink-0">
                    <CustomImage
                      src={challenge.thumbnail}
                      alt={challenge.title}
                      width={48}
                      height={48}
                      className="w-full h-full object-cover rounded-lg"
                      fallbackSrc="/images/fallback.png"
                    />
                  </div>
                  <span className="text-sm font-medium text-gray-900">
                    {challenge.title}
                  </span>
                </div>
              </td>
              <td className="py-4 px-6">
                <div className="flex items-center gap-2">
                  <Avatar
                    className="w-6 h-6 text-xs"
                    name={challenge.host
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                    color="primary"
                  />
                  <span className="text-sm text-gray-900">
                    {challenge.host}
                  </span>
                </div>
              </td>
              <td className="py-4 px-6">
                <div className="flex items-center gap-2">
                  <div
                    className={`w-2 h-2 rounded-full ${
                      challenge.status === "Ongoing"
                        ? "bg-blue-500"
                        : challenge.status === "Pending"
                        ? "bg-yellow-500"
                        : challenge.status === "Completed"
                        ? "bg-green-500"
                        : "bg-red-500"
                    }`}
                  ></div>
                  <span className="text-sm text-gray-600">
                    {challenge.status}
                  </span>
                </div>
              </td>
              <td className="py-4 px-6 text-sm text-gray-900">
                {challenge.date}
              </td>
              <td className="py-4 px-6">
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-2">
                    {[1, 2, 3].map((i) => (
                      <Avatar
                        key={i}
                        className="w-6 h-6 text-xs border-2 border-white"
                        name={`U${i}`}
                        color="secondary"
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-600">
                    +{challenge.participants}
                  </span>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
