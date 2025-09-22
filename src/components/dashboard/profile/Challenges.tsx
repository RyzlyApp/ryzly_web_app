import React, { useState } from "react";
import { BiHeart, BiUser } from "react-icons/bi";
import { BsClock } from "react-icons/bs";

interface Challenge {
  id: string;
  duration: number;
  image: string;
  skills: string[];
  title: string;
  description: string;
  winningPrice: number;
  participatingPrice: number;
  participants: Participant[];
  startDate: string;
  endDate: string;
  hostedBy: string;
}

interface Participant {
  id: string;
  name: string;
  avatar: string;
}

const Challenges: React.FC = () => {
  const [challenges, setChallenges] = useState<Challenge[]>([
    {
      id: "FRNTD3922",
      duration: 3,
      image: "",
      skills: ["HTML", "CSS", "JavaScript"],
      title: "E-commerce Dashboard",
      description:
        "Build a comprehensive admin dashboard for an online store with analytics, inventory management, and order tracking.",
      winningPrice: 200,
      participatingPrice: 10,
      startDate: "01 Aug 2025",
      endDate: "01 Sep 2025",
      hostedBy: "Finlytics",
      participants: [
        { id: "1", name: "Sarah M.", avatar: "/avatars/avatar1.jpg" },
        { id: "2", name: "John D.", avatar: "/avatars/avatar2.jpg" },
        { id: "3", name: "Emma W.", avatar: "/avatars/avatar3.jpg" },
        { id: "4", name: "Mike T.", avatar: "/avatars/avatar4.jpg" },
        { id: "5", name: "Lisa K.", avatar: "/avatars/avatar5.jpg" },
      ],
    },
    {
      id: "FRNTD4821",
      duration: 2,
      image: "",
      skills: ["React", "Next.js", "Tailwind CSS"],
      title: "Portfolio Website",
      description:
        "Create a personal portfolio website to showcase your skills and projects. It should be responsive and visually appealing.",
      winningPrice: 150,
      participatingPrice: 5,
      startDate: "15 Aug 2025",
      endDate: "15 Sep 2025",
      hostedBy: "DesignHub",
      participants: [
        { id: "6", name: "Alex R.", avatar: "/avatars/avatar6.jpg" },
        { id: "7", name: "Mia S.", avatar: "/avatars/avatar7.jpg" },
        { id: "8", name: "David L.", avatar: "/avatars/avatar8.jpg" },
      ],
    },
    {
      id: "FRNTD9912",
      duration: 4,
      image: "",
      skills: ["React", "API Integration", "CSS"],
      title: "Weather Application",
      description:
        "Develop a weather application that fetches and displays weather data from a public API. Users should be able to search for cities.",
      winningPrice: 180,
      participatingPrice: 8,
      startDate: "10 Aug 2025",
      endDate: "10 Sep 2025",
      hostedBy: "WeatherTech",
      participants: [
        { id: "9", name: "Sophia B.", avatar: "/avatars/avatar9.jpg" },
        { id: "10", name: "James P.", avatar: "/avatars/avatar10.jpg" },
        { id: "11", name: "Olivia M.", avatar: "/avatars/avatar11.jpg" },
        { id: "12", name: "William K.", avatar: "/avatars/avatar12.jpg" },
      ],
    },
    {
      id: "BCKND5893",
      duration: 5,
      image: "",
      skills: ["Node.js", "Express", "MongoDB"],
      title: "RESTful API for a Blog",
      description:
        "Design and build a RESTful API for a blogging platform. It should include CRUD operations for posts and comments.",
      winningPrice: 250,
      participatingPrice: 15,
      startDate: "05 Aug 2025",
      endDate: "05 Sep 2025",
      hostedBy: "DevBlogs",
      participants: [
        { id: "13", name: "Ethan W.", avatar: "/avatars/avatar13.jpg" },
        { id: "14", name: "Ava T.", avatar: "/avatars/avatar14.jpg" },
      ],
    },
    {
      id: "BCKND1234",
      duration: 6,
      image: "",
      skills: ["Python", "Django", "PostgreSQL"],
      title: "User Authentication System",
      description:
        "Implement a secure user authentication system with features like registration, login, password reset, and social logins.",
      winningPrice: 300,
      participatingPrice: 20,
      startDate: "20 Aug 2025",
      endDate: "20 Sep 2025",
      hostedBy: "AuthSecure",
      participants: [
        { id: "15", name: "Noah G.", avatar: "/avatars/avatar15.jpg" },
        { id: "16", name: "Isabella R.", avatar: "/avatars/avatar16.jpg" },
        { id: "17", name: "Lucas M.", avatar: "/avatars/avatar17.jpg" },
        { id: "18", name: "Charlotte H.", avatar: "/avatars/avatar18.jpg" },
        { id: "19", name: "Benjamin L.", avatar: "/avatars/avatar19.jpg" },
      ],
    },
    {
      id: "DSGN7890",
      duration: 3,
      image: "",
      skills: ["Figma", "UI/UX Principles"],
      title: "Mobile Banking App UI",
      description:
        "Design a modern and user-friendly interface for a mobile banking application. Focus on usability and a clean aesthetic.",
      winningPrice: 220,
      participatingPrice: 12,
      startDate: "25 Aug 2025",
      endDate: "25 Sep 2025",
      hostedBy: "BankInnovate",
      participants: [
        { id: "20", name: "Amelia C.", avatar: "/avatars/avatar20.jpg" },
        { id: "21", name: "Henry F.", avatar: "/avatars/avatar21.jpg" },
        { id: "22", name: "Evelyn D.", avatar: "/avatars/avatar22.jpg" },
      ],
    },
  ]);

  // Function to render participant avatars in overlapping circles
  const renderParticipants = (
    participants: Participant[],
    maxDisplay: number = 4
  ) => {
    const displayedParticipants = participants.slice(0, maxDisplay);
    const remainingCount = participants.length - maxDisplay;

    return (
      <div className="flex items-center">
        <div className="flex -space-x-2">
          {displayedParticipants.map((participant, index) => (
            <div
              key={participant.id}
              className="relative w-8 h-8 rounded-full border-2 border-white bg-gray-200 overflow-hidden"
              style={{ zIndex: displayedParticipants.length - index }}
            >
              {participant.avatar ? (
                <img
                  src={participant.avatar}
                  alt={participant.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
                  <span className="text-white text-xs font-bold">
                    {participant.name.charAt(0).toUpperCase()}
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
        {remainingCount > 0 && (
          <span className=" text-xs bg-[#596AFE] px-2 py-1 text-white rounded-full">
            +{remainingCount}
          </span>
        )}
      </div>
    );
  };

  return (
    <div className="grid lg:grid-cols-3 gap-5">
      {challenges.map((challenge, index) => (
        <div
          key={index}
          className="bg-white rounded-xl p-3 shadow-sm hover:shadow-md transition-shadow"
        >
          <div className="relative">
            {/* Heart icon with enhanced glassmorphism */}
            <div className="absolute top-2 left-2 bg-white/20 backdrop-blur-md border border-white/30 shadow-lg rounded-full p-2">
              <BiHeart size={17} className="text-white" />
            </div>

            {/* Date with enhanced glassmorphism */}
            <div className="absolute right-2 top-2 flex text-xs items-center gap-1 bg-white/20 backdrop-blur-md border border-white/30 shadow-lg rounded-full px-3 py-1.5">
              <BsClock className="text-white" />
              <span className="text-white">
                {challenge.startDate} - {challenge.endDate}
              </span>
            </div>

            <img
              src="/landingPage/expertguidance.png"
              alt={challenge.title}
              className="h-48 w-full object-cover rounded-xl"
            />
          </div>

          <div className="flex gap-2 mt-3 flex-wrap">
            {challenge.skills.map((skill, index) => {
              const colors = ["bg-[#FED5CA]", "bg-[#B3BAFF8C]", "bg-[#ECF5CA]"];
              return (
                <p
                  key={index}
                  className={`text-xs py-1 px-2 rounded-full ${
                    colors[index % colors.length]
                  }`}
                >
                  {skill}
                </p>
              );
            })}
          </div>

          <h3 className="text-xl font-semibold mt-5">{challenge.title}</h3>
          <p className="text-xs mt-1 text-gray-500 line-clamp-2">
            {challenge.description}
          </p>

          <div className="flex justify-between mt-5">
            <div>
              <p className="text-xs text-gray-500">Winning Price</p>
              <p className="text-sm mt-2 font-semibold">{`$${challenge.winningPrice}`}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Participating Fee</p>
              <h3 className="text-sm mt-2 font-semibold">{`$${challenge.participatingPrice}`}</h3>
            </div>
          </div>

          <div className="flex justify-between items-center mt-5">
            <div>
              <p className="text-xs text-gray-500 mb-2">Participants</p>
              {renderParticipants(challenge.participants)}
            </div>

            <div>
              <p className="text-xs text-gray-500">Hosted By</p>
              <div className="flex gap-2 mt-2 items-center">
                <div className="w-6 h-6 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center">
                  <BiUser size={12} className="text-white" />
                </div>
                <p className="text-sm font-medium">{challenge.hostedBy}</p>
              </div>
            </div>
          </div>

          <button className="w-full mt-5 bg-[#5160E7] text-white py-2 rounded-lg hover:bg-[#4451c9] transition-colors">
            Participate Now
          </button>
        </div>
      ))}
    </div>
  );
};

export default Challenges;
