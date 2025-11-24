"use client"
import { IUser } from "@/helper/model/user";
import { CustomButton, CustomSearch } from "../custom";
import { useFetchData } from "@/hook/useFetchData";
import { LoadingLayout } from "../shared";
import { Avatar } from "@heroui/react";
import useOverview from "@/hook/useOverview";
import { useState } from "react";

export default function Addparticipant() {

    const { addParticipantMutate, id } = useOverview()
    const [ index, setIndex ] = useState("")
    const handleSubmit = (item: string) => {
        setIndex(item)
        addParticipantMutate.mutate({
            challengeID: id + "",
            user: item
        })
    }

    const { data, isLoading: loading } = useFetchData<IUser[]>({ endpoint: `/user/all`, name: "userall" })

    console.log(data);

    const Card = ({ item }: { item: IUser }) => {
        return (
            <div className="  flex w-full items-center justify-between py-2 " >
                <div className=" flex gap-2 items-center " >
                    <Avatar src={item?.profilePicture} name={item?.fullName} />
                    <div className=" flex flex-col " >
                        <p className=" font-medium text-sm " >{item?.fullName}</p>
                        <p className=" font-medium text-xs " >{item?.fullName}</p>
                    </div>
                </div>
                <CustomButton onClick={() => handleSubmit(item?._id as string)} isLoading={addParticipantMutate?.isPending && index === item?._id} fontSize="12px" height="36px" >Invite</CustomButton>
            </div>
        )
    }

    return (
        <div className=" w-full flex flex-col gap-4 " >
            <CustomSearch />
            <LoadingLayout loading={loading} >
                <div className=" flex flex-col gap-3 max-h-[50vh] overflow-y-auto " >
                    {data?.map((item, index) => {
                        return (
                            <Card key={index} item={item} />
                        )
                    })}
                </div>
            </LoadingLayout>
        </div>
    )
}