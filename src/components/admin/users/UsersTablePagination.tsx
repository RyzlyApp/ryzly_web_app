import React from "react";

const UsersTablePagination = () => {
  return (
    <div className="p-6 border-t border-gray-200">
      <div className="flex items-center">
        <div className="flex items-center justify-between w-full gap-2">
          <button className="px-3 py-1 text-sm text-gray-600 hover:text-gray-900">
            ← Previous
          </button>
          <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((page) => (
              <button
                key={page}
                className={`px-3 py-1 text-sm rounded ${
                  page === 1
                    ? "bg-[#EEF0FF] text-[#5160E7]"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                {page}
              </button>
            ))}
          </div>
          <button className="px-3 py-1 text-sm text-gray-600 hover:text-gray-900">
            Next →
          </button>
        </div>
      </div>
    </div>
  );
};

export default UsersTablePagination;
