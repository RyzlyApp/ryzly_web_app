"use client";
import { Chip } from "@heroui/react";
import { RiCheckboxCircleFill, RiTimeLine } from "react-icons/ri";

interface Task {
  id: string;
  title: string;
  status: "Ongoing" | "Completed" | "Pending";
  dueDate: string;
}

const mockTasks: Task[] = [
  {
    id: "1",
    title: "Draft three quick layout concepts for your landing page",
    status: "Ongoing",
    dueDate: "01 Aug 2025",
  },
  {
    id: "2",
    title: "Draft three quick layout concepts for your landing page",
    status: "Ongoing",
    dueDate: "01 Aug 2025",
  },
  {
    id: "3",
    title: "Create wireframes for both desktop and mobile app",
    status: "Ongoing",
    dueDate: "01 Aug 2025",
  },
  {
    id: "4",
    title: "Draft three quick layout concepts for your landing page",
    status: "Completed",
    dueDate: "01 Aug 2025",
  },
  {
    id: "5",
    title: "Draft three quick layout concepts for your landing page",
    status: "Pending",
    dueDate: "01 Aug 2025",
  },
  {
    id: "6",
    title: "Draft three quick layout concepts for your landing page",
    status: "Pending",
    dueDate: "01 Aug 2025",
  },
  {
    id: "7",
    title: "Draft three quick layout concepts for your landing page",
    status: "Pending",
    dueDate: "01 Aug 2025",
  },
];

const ChallengeTask = () => {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Ongoing":
        return <RiCheckboxCircleFill className="w-5 h-5 text-blue-500" />;
      case "Completed":
        return <RiCheckboxCircleFill className="w-5 h-5 text-green-500" />;
      case "Pending":
        return <RiTimeLine className="w-5 h-5 text-gray-400" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Ongoing":
        return "primary";
      case "Completed":
        return "success";
      case "Pending":
        return "default";
      default:
        return "default";
    }
  };

  return (
    <div className="">
      <div className="bg-white overflow-hidden">
        <div className="grid grid-cols-12 bg-gray-100 gap-5 px-6 py-3 border-b border-gray-200">
          <div className="col-span-6">
            <span className="text-xs font-medium text-gray-900">Task</span>
          </div>
          <div className="col-span-3">
            <span className="text-xs font-medium text-gray-900">Status</span>
          </div>
          <div className="col-span-3">
            <span className="text-xs font-medium text-gray-900">Due Date</span>
          </div>
        </div>
        <div className="">
          {mockTasks.map((task) => (
            <div
              key={task.id}
              className="grid grid-cols-12 gap-5 px-6 py-4 hover:bg-gray-50 transition-colors"
            >
              <div className="col-span-6 flex items-center gap-3">
                {getStatusIcon(task.status)}
                <span className="text-xs text-gray-900">{task.title}</span>
              </div>
              <div className="col-span-3 flex items-center">
                <Chip
                  color={getStatusColor(task.status)}
                  size="sm"
                  variant="flat"
                  className="text-xs"
                >
                  {task.status}
                </Chip>
              </div>

              {/* Due Date Column */}
              <div className="col-span-3 flex items-center">
                <span className="text-xs text-gray-600">{task.dueDate}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChallengeTask;
