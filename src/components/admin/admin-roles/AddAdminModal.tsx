"use client";
import { useState } from "react";
import CustomButton from "@/components/custom/customButton";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@heroui/react";
import { MdDashboard } from "react-icons/md";
import { FaTrophy, FaMoneyBillWave, FaChartBar, FaAward } from "react-icons/fa";
import { BiTargetLock } from "react-icons/bi";
import { FiUser } from "react-icons/fi";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { IoPeopleCircleOutline } from "react-icons/io5";
import { LuUsersRound } from "react-icons/lu";

interface AddAdminModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: {
    name: string;
    email: string;
    role: string;
    access: string[];
  }) => void;
}

const ACCESS_ITEMS = [
  {
    id: "dashboard",
    label: "Dashboard",
    icon: <MdDashboard className="w-4 h-4" />,
  },
  { id: "users", label: "Users", icon: <LuUsersRound className="w-4 h-4" /> },
  {
    id: "challenges",
    label: "Challenges",
    icon: <BiTargetLock className="w-4 h-4" />,
  },
  {
    id: "communities",
    label: "Communities",
    icon: <IoPeopleCircleOutline className="w-4 h-4" />,
  },
  {
    id: "approvals",
    label: "Approvals",
    icon: <AiOutlineCheckCircle className="w-4 h-4" />,
  },
  {
    id: "transactions",
    label: "Transactions",
    icon: <FaMoneyBillWave className="w-4 h-4" />,
  },
  { id: "rewards", label: "Rewards", icon: <FaTrophy className="w-4 h-4" /> },
  {
    id: "reports",
    label: "Reports",
    icon: <FaAward className="w-4 h-4" />,
  },
  {
    id: "analytics",
    label: "Analytics",
    icon: <FaChartBar className="w-4 h-4" />,
  },
  {
    id: "admin_roles",
    label: "Admin Roles",
    icon: <FiUser className="w-4 h-4" />,
  },
];

export default function AddAdminModal({
  open,
  onClose,
  onSubmit,
}: AddAdminModalProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [access, setAccess] = useState<string[]>([
    "dashboard",
    "users",
    "challenges",
  ]);

  const toggleAccess = (id: string) => {
    setAccess((prev) =>
      prev.includes(id) ? prev.filter((a) => a !== id) : [...prev, id]
    );
  };

  return (
    <Modal
      isOpen={open}
      onOpenChange={(isOpen) => {
        if (!isOpen) onClose();
      }}
      size="xl"
      scrollBehavior="inside"
    >
      <ModalContent>
        <ModalHeader className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Add Admin</h3>
        </ModalHeader>
        <ModalBody className="space-y-2">
          <div className="space-y-1">
            <label className="text-sm text-gray-700">Full Name</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter their full name"
              className="w-full h-11 px-3 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="space-y-1">
            <label className="text-sm text-gray-700">Email</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter email"
              type="email"
              className="w-full h-11 px-3 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="space-y-1">
            <label className="text-sm text-gray-700">Role</label>
            <input
              value={role}
              onChange={(e) => setRole(e.target.value)}
              placeholder="What’s the admin’s role"
              className="w-full h-11 px-3 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="space-y-3">
            <p className="text-sm text-gray-600">Manage Access</p>
            <div className="space-y-3">
              {ACCESS_ITEMS.map((item) => (
                <label
                  key={item.id}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-gray-500">{item.icon}</span>
                    <span className="text-sm">{item.label}</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={access.includes(item.id)}
                    onChange={() => toggleAccess(item.id)}
                    className="h-4 w-4"
                  />
                </label>
              ))}
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <div className="flex items-center justify-end gap-3 w-full">
            <CustomButton variant="outline" onClick={onClose}>
              Cancel
            </CustomButton>
            <CustomButton
              variant="primary"
              onClick={() => {
                onSubmit({ name, email, role, access });
                onClose();
              }}
            >
              Add Admin
            </CustomButton>
          </div>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
