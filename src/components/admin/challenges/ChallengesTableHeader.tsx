"use client";
import { RiFilterLine } from "react-icons/ri";
import CustomSelect from "@/components/custom/customSelect";
import { Formik, Form } from "formik";
import React from "react";

interface ChallengesTableHeaderProps {
  coachFilter: string;
  setCoachFilter: (filter: string) => void;
  statusFilter: string;
  setStatusFilter?: (filter: string) => void;
}

export default function ChallengesTableHeader({
  coachFilter,
  setCoachFilter,
  statusFilter,
  setStatusFilter,
}: ChallengesTableHeaderProps) {
  return (
    <div className="p-6 border-b border-gray-200">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <h3 className="text-lg font-bold text-gray-900">By Coach</h3>
          <div className="w-48">
            <Formik
              initialValues={{ coachFilter: coachFilter }}
              onSubmit={() => {}}
            >
              {({ values }) => {
                // Handle change directly
                if (values.coachFilter !== coachFilter) {
                  setCoachFilter(values.coachFilter);
                }

                return (
                  <Form>
                    <CustomSelect
                      name="coachFilter"
                      options={[
                        { value: "All Coaches", label: "All Coaches" },
                        { value: "Ngozi Nnamani", label: "Ngozi Nnamani" },
                        { value: "Obinna Afolayan", label: "Obinna Afolayan" },
                      ]}
                      placeholder="Select coach"
                      height="40px"
                    />
                  </Form>
                );
              }}
            </Formik>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="w-48">
            <Formik
              initialValues={{ statusFilter: statusFilter }}
              onSubmit={() => {}}
            >
              {({ values }) => {
                // Handle change directly
                if (values.statusFilter !== statusFilter && setStatusFilter) {
                  setStatusFilter(values.statusFilter);
                }

                return (
                  <Form>
                    <CustomSelect
                      name="statusFilter"
                      options={[
                        { value: "All Status", label: "All Status" },
                        { value: "Ongoing", label: "Ongoing" },
                        { value: "Pending", label: "Pending" },
                        { value: "Completed", label: "Completed" },
                        { value: "Banned", label: "Banned" },
                      ]}
                      placeholder="Select status"
                      height="40px"
                    />
                  </Form>
                );
              }}
            </Formik>
          </div>
          <RiFilterLine className="text-gray-400" size={20} />
        </div>
      </div>
    </div>
  );
}
