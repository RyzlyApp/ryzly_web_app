import React from "react";
import { BiComment } from "react-icons/bi";
import { FaHandsClapping } from "react-icons/fa6";

const WorkComp = ({  }: { data: string }) => {
  return (
    <div className="">
      <div
        className="h-[15rem] rounded-lg"
        style={{
          backgroundImage: "url(/work.jpg)",
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      ></div>
      <div className="flex justify-between mt-3">
        <div className="flex items-center gap-1">
          <img
            src="/landingPage/impactDummyImage.png"
            alt=""
            className="rounded-full w-[30px]"
          />
          <p className="text-sm">Oluwatosin</p>
        </div>
        <div className="flex gap-2 items-center">
          <div className="flex items-center gap-1">
            <BiComment className="" size={14} />
            <p className="text-xs">34</p>
          </div>
          <div className="flex items-center gap-1">
            <FaHandsClapping className="" size={14} />
            <p className="text-xs">1k</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const Work = () => {
  const works = ["dat", "data"]
  return (
    <div className="grid grid-cols-1 gap-y-10 lg:grid-cols-4 gap-5">
      {works.map((work, index) => (
        <div key={index}>
          <WorkComp data={work} />
        </div>
      ))}
    </div>
  );
};

export default Work;
