"use client";

import { useState } from "react";
import { CustomButton, CustomImage } from "@/components/custom";
import { BsArrowLeft, BsCheck } from "react-icons/bs";
import { FiEdit2 } from "react-icons/fi";

interface Holder {
  id: string;
  name: string;
  role: string;
  date: string;
  avatar: string;
}

interface CertificateDetailsProps {
  id: string;
  title: string;
  imageUrl: string;
  milestones: string[];
  holders?: Holder[];
  onBack: () => void;
  onEdit: (id: string) => void;
}

export default function CertificateDetails({
  id,
  title,
  imageUrl,
  milestones,
  holders = [],
  onBack,
  onEdit,
}: CertificateDetailsProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const totalPages = Math.ceil(holders.length / itemsPerPage);

  const paginatedHolders = holders.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="grid gap-5 grid-cols-2 pb-10">
      <div className="bg-white p-4 rounded-lg h-fit">
        <div>
          <CustomImage
            src={imageUrl}
            width={1000}
            height={1000}
            alt={title}
            className="w-full h-auto"
          />
        </div>
        <div>
          <div className="mt-6">
            <h3 className="text-sm font-medium text-gray-700 mb-2">
              Milestones to unlock
            </h3>
            <div className="space-y-2">
              {milestones.map((milestone, index) => (
                <div key={index} className="flex items-center gap-2">
                  <BsCheck color="" />
                  <span className="text-sm">{milestone}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white p-4 rounded-lg h-fit">
        <h3 className="text-lg font-semibold mb-4">{holders.length} Holders</h3>

        <div className="overflow-hidden ">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="hidden px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="hidden px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Role
                </th>
                <th className="hidden px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {paginatedHolders.map((holder) => (
                <tr key={holder.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-8 w-8">
                        <img
                          className="h-8 w-8 rounded-full"
                          src={holder.avatar}
                          alt={holder.name}
                        />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {holder.name}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500"></div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {holder.date}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {totalPages > 1 && (
          <div className="flex items-center justify-center mt-4">
            <nav
              className="flex items-center justify-between w-full"
              aria-label="Pagination"
            >
              <button
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                type="button"
                className="p-2 text-black rounded-md hover:bg-gray-100 disabled:opacity-50 flex items-center gap-3"
              >
                <BsArrowLeft className="h-4 w-4" />
                <span className="text-xs">Previous</span>
              </button>
              <div>
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  let pageNum;
                  if (totalPages <= 5) {
                    pageNum = i + 1;
                  } else if (currentPage <= 3) {
                    pageNum = i + 1;
                  } else if (currentPage >= totalPages - 2) {
                    pageNum = totalPages - 4 + i;
                  } else {
                    pageNum = currentPage - 2 + i;
                  }

                  return (
                    <button
                      key={pageNum}
                      onClick={() => setCurrentPage(pageNum)}
                      type="button"
                      className={`px-3 py-1.5 text-sm rounded-md ${
                        pageNum === currentPage
                          ? "bg-[#EEF0FF] text-[#5160E7]"
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                })}
              </div>

              <button
                onClick={() =>
                  setCurrentPage(Math.min(totalPages, currentPage + 1))
                }
                disabled={currentPage === totalPages}
                type="button"
                className="p-2 text-black rounded-md hover:bg-gray-100 disabled:opacity-50 flex gap-3"
              >
                <span className="text-xs">Next</span>
                <BsArrowLeft className="h-4 w-4 rotate-180" />
              </button>
            </nav>
          </div>
        )}
      </div>
    </div>
  );
}
