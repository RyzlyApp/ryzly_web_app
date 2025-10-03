"use client";

export default function ReportsPagination() {
  return (
    <div className="flex items-center justify-between px-6 py-4 border-t border-gray-200">
      <button className="text-sm text-gray-600 hover:text-gray-800">
        Previous
      </button>
      <div className="flex items-center gap-2">
        {[1, 2, 3, 4, 5].map((n) => (
          <button
            key={n}
            className={`h-8 w-8 rounded-md text-sm ${
              n === 2
                ? "bg-gray-900 text-white"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            {n}
          </button>
        ))}
      </div>
      <button className="text-sm text-gray-600 hover:text-gray-800">
        Next
      </button>
    </div>
  );
}
