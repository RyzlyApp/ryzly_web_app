import React from "react";
import { BiComment } from "react-icons/bi";
import { FaHandsClapping } from "react-icons/fa6";

const WorkComp = ({
  data,
}: {
  data: { name: string; no_of_comments: number; number_of_likes: number };
}) => {
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
          <p className="text-sm">{data.name}</p>
        </div>
        <div className="flex gap-2 items-center">
          <div className="flex items-center gap-1">
            <BiComment className="" size={14} />
            <p className="text-xs">{data.no_of_comments}</p>
          </div>
          <div className="flex items-center gap-1">
            <FaHandsClapping className="" size={14} />
            <p className="text-xs">{data.number_of_likes}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const Work = () => {
  const works = ["dat", "data"];
  return (
    <div className="grid grid-cols-1 gap-y-10 lg:grid-cols-4 gap-5">
      {/* {works.map((work, index) => (
        <div key={index}>
          <WorkComp
            data={{
              name: work.name || "",
              no_of_comments: work.no_of_comments || 0,
              number_of_likes: work.number_of_likes || 0,
            }}
          />
        </div>
      ))} */}
    </div>
  );
};

export default Work;
