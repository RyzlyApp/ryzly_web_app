interface Challenge {
  id: string;
  title: string;
  description: string;
  dateRange: string;
  thumbnail: string;
}

const mockChallenges: Challenge[] = [
  {
    id: "1",
    title: "E-commerce Dashboard",
    description: "Build a comprehensive admin dashbo...",
    dateRange: "01 Aug - 25 Aug 2025",
    thumbnail: "/images/challenge1.jpg",
  },
  {
    id: "2",
    title: "Design a Mobile App Landing P...",
    description: "Build a comprehensive admin dashbo...",
    dateRange: "01 Aug - 25 Aug 2025",
    thumbnail: "/images/challenge2.jpg",
  },
  {
    id: "3",
    title: "E-commerce Dashboard",
    description: "Build a comprehensive admin dashbo...",
    dateRange: "01 Aug - 25 Aug 2025",
    thumbnail: "/images/challenge3.jpg",
  },
  {
    id: "4",
    title: "Design a Mobile App Landing P...",
    description: "Build a comprehensive admin dashbo...",
    dateRange: "01 Aug - 25 Aug 2025",
    thumbnail: "/images/challenge4.jpg",
  },
  {
    id: "5",
    title: "E-commerce Dashboard",
    description: "Build a comprehensive admin dashbo...",
    dateRange: "01 Aug - 25 Aug 2025",
    thumbnail: "/images/challenge5.jpg",
  },
  {
    id: "6",
    title: "Design a Mobile App Landing P...",
    description: "Build a comprehensive admin dashbo...",
    dateRange: "01 Aug - 25 Aug 2025",
    thumbnail: "/images/challenge6.jpg",
  },
  {
    id: "7",
    title: "E-commerce Dashboard",
    description: "Build a comprehensive admin dashbo...",
    dateRange: "01 Aug - 25 Aug 2025",
    thumbnail: "/images/challenge7.jpg",
  },
  {
    id: "8",
    title: "Design a Mobile App Landing P...",
    description: "Build a comprehensive admin dashbo...",
    dateRange: "01 Aug - 25 Aug 2025",
    thumbnail: "/images/challenge8.jpg",
  },
  {
    id: "9",
    title: "E-commerce Dashboard",
    description: "Build a comprehensive admin dashbo...",
    dateRange: "01 Aug - 25 Aug 2025",
    thumbnail: "/images/challenge9.jpg",
  },
];

export default function RecentChallenges() {
  return (
    <div className="bg-white rounded-xl p-6 col-span-4 row-span-2">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-bold text-gray-900">
          Recently Created Challenges
        </h3>
        <button className="text-blue-600 text-sm font-medium">See all</button>
      </div>

      <div className="space-y-4">
        {mockChallenges.map((challenge) => (
          <div
            key={challenge.id}
            className="flex items-center gap-4 p-3 hover:bg-gray-50 rounded-lg"
          >
            <div className="w-12 h-12 bg-gray-200 rounded-lg flex-shrink-0">
              <img
                src={challenge.thumbnail}
                alt={challenge.title}
                className="w-full h-full object-cover rounded-lg"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                  e.currentTarget.nextElementSibling?.classList.remove(
                    "hidden"
                  );
                }}
              />
              <div className="w-full h-full bg-gray-200 rounded-lg flex items-center justify-center">
                <span className="text-gray-500 text-xs">IMG</span>
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-semibold text-gray-900 truncate">
                {challenge.title}
              </h4>
              <p className="text-xs text-gray-600 truncate">
                {challenge.description}
              </p>
              <p className="text-xs text-gray-500 mt-1">
                {challenge.dateRange}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
