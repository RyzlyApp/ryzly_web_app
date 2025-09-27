import { Avatar } from "@heroui/react";

interface Signup {
  id: string;
  name: string;
  role: string;
  date: string;
  avatar: string;
}

const mockSignups: Signup[] = [
  {
    id: "1",
    name: "Oluwaseun Obioma",
    role: "Product Designer",
    date: "01 Sep, 2025",
    avatar: "OO",
  },
  {
    id: "2",
    name: "Adebola Ogunde",
    role: "Product Designer",
    date: "01 Sep, 2025",
    avatar: "AO",
  },
  {
    id: "3",
    name: "Oluwaseun Obioma",
    role: "Product Designer",
    date: "01 Sep, 2025",
    avatar: "OO",
  },
  {
    id: "4",
    name: "Adebola Ogunde",
    role: "Product Designer",
    date: "01 Sep, 2025",
    avatar: "AO",
  },
  {
    id: "5",
    name: "Oluwaseun Obioma",
    role: "Product Designer",
    date: "01 Sep, 2025",
    avatar: "OO",
  },
  {
    id: "6",
    name: "Adebola Ogunde",
    role: "Product Designer",
    date: "01 Sep, 2025",
    avatar: "AO",
  },
];

export default function NewSignups() {
  return (
    <div className="bg-white rounded-xl p-6 col-span-4 row-span-1">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-bold text-gray-900">New Signups</h3>
        <button className="text-blue-600 text-sm font-medium">See all</button>
      </div>

      <div className="space-y-4">
        {mockSignups.map((signup) => (
          <div
            key={signup.id}
            className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg"
          >
            <Avatar
              className="w-10 h-10 text-sm"
              name={signup.avatar}
              color="primary"
            />
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-semibold text-gray-900 truncate">
                {signup.name}
              </h4>
              <p className="text-xs text-gray-600">{signup.role}</p>
            </div>

            <p className="text-xs text-gray-500 mt-1">{signup.date}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
