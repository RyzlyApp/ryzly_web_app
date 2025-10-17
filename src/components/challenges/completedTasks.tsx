import AddRatingBtn from "./addBtn/addRating";

export default function CompletedTasks() {
    return(
        <div style={{background: "linear-gradient(90deg, #5160E7 0%, #3F4BB4 100%)"}} className=" w-full text-white h-[88px] flex items-center rounded-2xl px-8 justify-between  " >
            <p className=" text-3xl font-bold " >Challenge Completed</p>
            <p className=" max-w-[345px] text-sm font-medium " >{`You're 1 of 234 participants that completed this challenge, out of 400 participants who started it`}</p>
            <AddRatingBtn />
        </div>
    )
}