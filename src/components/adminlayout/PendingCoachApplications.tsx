import { Avatar } from "@heroui/react";

interface CoachApplication {
  id: string;
  name: string;
  role: string;
  experience: string;
  avatar: string;
}

const mockApplications: CoachApplication[] = [
  {
    id: "1",
    name: "Adebayo Nwosu",
    role: "Product Designer",
    experience: "5 years of experience",
    avatar: "AN",
  },
  {
    id: "2",
    name: "Adaobi Nwosu",
    role: "Product Designer",
    experience: "5 years of experience",
    avatar: "AN",
  },
  {
    id: "3",
    name: "Adebayo Nwosu",
    role: "Product Designer",
    experience: "5 years of experience",
    avatar: "AN",
  },
  {
    id: "4",
    name: "Adaobi Nwosu",
    role: "Product Designer",
    experience: "5 years of experience",
    avatar: "AN",
  },
  {
    id: "5",
    name: "Adebayo Nwosu",
    role: "Product Designer",
    experience: "5 years of experience",
    avatar: "AN",
  },
  {
    id: "6",
    name: "Adaobi Nwosu",
    role: "Product Designer",
    experience: "5 years of experience",
    avatar: "AN",
  },
];

export default function PendingCoachApplications() {
  return (
    <div className="bg-white rounded-xl p-6 col-span-4 row-span-1">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-bold text-gray-900">
          Pending Coach Applications
        </h3>
        <button className="text-blue-600 text-sm font-medium">See all</button>
      </div>

      <div className="space-y-4">
        {mockApplications.map((application) => (
          <div
            key={application.id}
            className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg"
          >
            <Avatar
              className="w-10 h-10 text-sm"
              name={application.avatar}
              color="secondary"
            />
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-semibold text-gray-900 truncate">
                {application.name}
              </h4>
              <p className="text-xs text-gray-600">{application.role}</p>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              {application.experience}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
