"use client";

import React, { useState } from "react";
import { CustomButton } from "@/components/custom";
import CustomSelect from "@/components/custom/customSelect";
import { FiX } from "react-icons/fi";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@heroui/react";
import { Formik, Form } from "formik";

// Define RewardData interface
interface RewardData {
  title: string;
  recipient: string;
  type: "certificate" | "badge";
  file: File | null;
  milestones: string[];
}

interface AddRewardModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (data: RewardData) => void;
}

export default function AddRewardModal({
  isOpen,
  onClose,
  onAdd,
}: AddRewardModalProps) {
  const [activeTab, setActiveTab] = useState<"certificate" | "badge">(
    "certificate"
  );
  const [file, setFile] = useState<File | null>(null);
  const [milestones, setMilestones] = useState<string[]>([]);
  const [milestone, setMilestone] = useState("");
  const [title, setTitle] = useState("");
  const [recipient, setRecipient] = useState("participants");

  const handleTabChange = (tab: "certificate" | "badge") => {
    setActiveTab(tab);
  };

  const handleAddMilestone = () => {
    if (milestone.trim()) {
      setMilestones([...milestones, milestone]);
      setMilestone("");
    }
  };

  const handleRemoveMilestone = (index: number) => {
    const updatedMilestones = [...milestones];
    updatedMilestones.splice(index, 1);
    setMilestones(updatedMilestones);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = () => {
    const data = {
      title,
      recipient,
      type: activeTab,
      file,
      milestones,
    };
    onAdd(data);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={(isOpen) => {
        if (!isOpen) onClose();
      }}
      size="xl"
      scrollBehavior="inside"
    >
      <ModalContent>
        <ModalHeader className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Add Reward</h3>
        </ModalHeader>

        <ModalBody className="space-y-5">
          <div className="mb-6">
            <div className="flex space-x-4 border-b border-gray-200">
              <button
                className={`py-2 px-4 ${
                  activeTab === "certificate"
                    ? "border-b-2 border-blue-500 text-blue-600"
                    : "text-gray-500"
                }`}
                onClick={() => handleTabChange("certificate")}
              >
                Add Certificate
              </button>
              <button
                className={`py-2 px-4 ${
                  activeTab === "badge"
                    ? "border-b-2 border-blue-500 text-blue-600"
                    : "text-gray-500"
                }`}
                onClick={() => handleTabChange("badge")}
              >
                Add Badge
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {activeTab === "certificate" ? "Certificate" : "Badge"}
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              {file ? (
                <div className="flex flex-col items-center">
                  <img
                    src={URL.createObjectURL(file)}
                    alt="Preview"
                    className="h-32 object-contain mb-2"
                  />
                  <p className="text-sm text-gray-500">{file.name}</p>
                </div>
              ) : (
                <div>
                  <button
                    type="button"
                    className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                    onClick={() =>
                      document.getElementById("file-upload")?.click()
                    }
                  >
                    Browse Files
                  </button>
                  <input
                    id="file-upload"
                    name="file-upload"
                    type="file"
                    className="sr-only"
                    accept="image/*"
                    onChange={handleFileChange}
                  />
                  <p className="mt-2 text-xs text-gray-500">
                    or drag and drop files here
                  </p>
                  <p className="mt-1 text-xs text-gray-500">
                    Upload a{" "}
                    {activeTab === "certificate" ? "certificate" : "badge"} (Max
                    size: 2MB)
                  </p>
                </div>
              )}
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-sm text-gray-700">Title</label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter title"
              className="w-full h-11 px-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="space-y-1">
            <label className="text-sm text-gray-700">
              Who is this{" "}
              {activeTab === "certificate" ? "certificate" : "badge"} for?
            </label>
            <Formik
              initialValues={{ recipient: recipient }}
              onSubmit={() => {}}
            >
              {({ values, setFieldValue }) => {
                // Remove useEffect and handle change directly
                if (values.recipient !== recipient) {
                  setRecipient(values.recipient);
                }

                return (
                  <Form>
                    <CustomSelect
                      name="recipient"
                      options={[
                        { value: "participants", label: "Participants" },
                        { value: "coaches", label: "Coaches" },
                        { value: "all", label: "All Users" },
                      ]}
                      placeholder="Select recipient"
                    />
                  </Form>
                );
              }}
            </Formik>
          </div>

          <div className="space-y-1">
            <label className="text-sm text-gray-700">Milestone to unlock</label>
            <div className="flex gap-2">
              <input
                type="text"
                value={milestone}
                onChange={(e) => setMilestone(e.target.value)}
                placeholder="Enter milestone"
                className="flex-1 h-11 px-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <CustomButton
                variant="primary"
                onClick={handleAddMilestone}
                type="button"
              >
                Add
              </CustomButton>
            </div>
          </div>

          {milestones.length > 0 && (
            <div className="space-y-2">
              {milestones.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between bg-gray-50 p-2 rounded"
                >
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      className="h-4 w-4"
                      checked
                      readOnly
                    />
                    <span className="text-sm">{item}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleRemoveMilestone(index)}
                    className="text-gray-500 hover:text-red-500"
                  >
                    <FiX size={16} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </ModalBody>

        <ModalFooter>
          <div className="flex items-center justify-end gap-3 w-full">
            <CustomButton variant="outline" onClick={onClose} type="button">
              Cancel
            </CustomButton>
            <CustomButton
              variant="primary"
              onClick={handleSubmit}
              type="button"
            >
              Add {activeTab === "certificate" ? "Certificate" : "Badge"}
            </CustomButton>
          </div>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
