export default function ChallengesTablePagination() {
  return (
    <div className="p-6 border-t border-gray-200">
      <div className="flex items-center">
        <div className="flex items-center  justify-between gap-2 w-full">
          <button className="px-3 py-1 text-sm text-gray-600 hover:text-gray-900">
            Previous
          </button>
          <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((page) => (
              <button
                key={page}
                className={`px-3 py-1 text-sm rounded ${
                  page === 2
                    ? "bg-blue-600 text-white"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                {page}
              </button>
            ))}
          </div>
          <button className="px-3 py-1 text-sm text-gray-600 hover:text-gray-900">
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
