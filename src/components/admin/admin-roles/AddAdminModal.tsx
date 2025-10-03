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
  { id: "dashboard", label: "Dashboard", icon: "▦" },
  { id: "users", label: "Users", icon: "👤" },
  { id: "challenges", label: "Challenges", icon: "◎" },
  { id: "communities", label: "Communities", icon: "◎" },
  { id: "approvals", label: "Approvals", icon: "✓" },
  { id: "transactions", label: "Transactions", icon: "⟲" },
  { id: "rewards", label: "Rewards", icon: "🏅" },
  { id: "reports", label: "Reports", icon: "📄" },
  { id: "analytics", label: "Analytics", icon: "📊" },
  { id: "admin_roles", label: "Admin Roles", icon: "👥" },
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
        <ModalBody className="space-y-5">
          <div className="space-y-1">
            <label className="text-sm text-gray-700">Full Name</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter their full name"
              className="w-full h-11 px-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="space-y-1">
            <label className="text-sm text-gray-700">Email</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter email"
              type="email"
              className="w-full h-11 px-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="space-y-1">
            <label className="text-sm text-gray-700">Role</label>
            <input
              value={role}
              onChange={(e) => setRole(e.target.value)}
              placeholder="What’s the admin’s role"
              className="w-full h-11 px-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                    <span className="text-gray-500 w-5 text-center">
                      {item.icon}
                    </span>
                    <span className="text-sm text-gray-800">{item.label}</span>
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
