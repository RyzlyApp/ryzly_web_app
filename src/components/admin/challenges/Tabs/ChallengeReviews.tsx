"use client";
import { Avatar } from "@heroui/react";
import { RiStarFill } from "react-icons/ri";

interface Review {
  id: string;
  user: {
    name: string;
    role: string;
    avatar: string;
  };
  rating: number;
  date: string;
  comment: string;
}

const mockReviews: Review[] = [
  {
    id: "1",
    user: {
      name: "Adebola Ogunde",
      role: "UI/UX Designer",
      avatar: "/work.jpg",
    },
    rating: 5.0,
    date: "19 June, 2025",
    comment:
      "This challenge was exactly what I needed! The lessons were short, actionable, and kept me motivated every day. Can't wait for the next one!",
  },
  {
    id: "2",
    user: {
      name: "Oluwaseun Obioma",
      role: "UI/UX Designer",
      avatar: "/work.jpg",
    },
    rating: 5.0,
    date: "18 June, 2025",
    comment:
      "Loved the structure and pace. Even as a beginner, I felt supported throughout the challenge. Highly recommend for anyone wanting quick wins.",
  },
  {
    id: "3",
    user: {
      name: "Folake Adebayo",
      role: "UI/UX Designer",
      avatar: "/work.jpg",
    },
    rating: 5.0,
    date: "17 June, 2025",
    comment:
      "Great balance between theory and practice. Some tasks were a bit tough, but that's what made it worthwhile.",
  },
  {
    id: "4",
    user: {
      name: "Babatunde Oludare",
      role: "UI/UX Designer",
      avatar: "/work.jpg",
    },
    rating: 5.0,
    date: "16 June, 2025",
    comment:
      "The accountability aspect was a game changer for me. I stayed consistent for the first time in months!",
  },
  {
    id: "5",
    user: {
      name: "Adaobi Ogunde",
      role: "UI/UX Designer",
      avatar: "/work.jpg",
    },
    rating: 5.0,
    date: "15 June, 2025",
    comment:
      "Well-designed and engaging. Could use a few more examples in some lessons, but overall an amazing experience.",
  },
];

const ChallengeReviews = () => {
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <RiStarFill
        key={index}
        className={`w-3 h-3 ${
          index < Math.floor(rating) ? "text-yellow-400" : "text-gray-300"
        }`}
      />
    ));
  };

  return (
    <div className="space-y-6">
      {mockReviews.map((review) => (
        <div key={review.id} className="bg-white border-b border-gray-200 p-4">
          <div className="">
            <div className="flex gap-2">
              <Avatar
                src={review.user.avatar}
                alt={review.user.name}
                className="w-12 h-12"
              />
              <div className="flex items-center justify-between mb-2">
                <div>
                  <h4 className="text-sm font-semibold text-gray-900">
                    {review.user.name}
                  </h4>
                  <p className="text-xs text-gray-600">{review.user.role}</p>
                </div>
              </div>
            </div>

            <div className="flex-1"></div>
            <div>
              <div className="flex items-center gap-2 my-3">
                <div className="flex items-center gap-1">
                  {renderStars(review.rating)}
                </div>
                <span className="text-xs font-medium text-gray-900">
                  {review.rating}
                </span>
                <span className="border-l border-gray-300 px-3 text-xs text-gray-500">
                  {review.date}
                </span>
              </div>
              <p className="text-sm text-gray-700 leading-relaxed">
                {review.comment}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ChallengeReviews;
