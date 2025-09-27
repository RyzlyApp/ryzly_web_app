export default function ApprovalsTablePagination() {
  return (
    <div className="flex items-center justify-center pt-6">
      <div className="flex items-center gap-2">
        <button className="px-3 py-1 text-sm text-gray-600 hover:text-gray-900">
          ← Previous
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
          Next →
        </button>
      </div>
    </div>
  );
}
