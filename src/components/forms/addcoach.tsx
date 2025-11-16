"use client"
import { IUser } from "@/helper/model/user";
import { useFetchData } from "@/hook/useFetchData";
import { Avatar } from "@heroui/react";
import { CustomButton, CustomSearch } from "../custom";
import { LoadingLayout, ModalLayout } from "../shared";
import useOverview from "@/hook/useOverview";
import { useState } from "react";
import { useAtom } from "jotai";
import { userAtom } from "@/helper/atom/user";

export default function AddCoach(
    { isOpen, setIsCoach }: { isOpen: boolean, setIsCoach: (by: boolean) => void }
) {

    const [userState] = useAtom(userAtom)

    const { data: user } = userState

    const { data, isLoading: loading } = useFetchData<IUser[]>({
        endpoint: `/user/all`, name: "userall", params: {
            isCoach: "true"
        }
    })

    const { addCoachMutate, id } = useOverview()

    const [index, setIndex] = useState("")

    const handleSubmit = (item: string) => {
        setIndex(item)
        addCoachMutate.mutate({
            challengeID: id + "",
            user: item
        })
    }

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
                <CustomButton onClick={() => handleSubmit(item?._id as string)} isLoading={addCoachMutate?.isPending && index === item?._id} fontSize="12px" height="36px" >Add Coach</CustomButton>
            </div>
        )
    }

    return (
        <> 
            <ModalLayout title="Add a coach" isOpen={isOpen} onClose={() => setIsCoach(false)} >
                <div className=" w-full flex flex-col gap-4 " >
                    <CustomSearch />
                    <LoadingLayout loading={loading} >
                        <div className=" flex flex-col gap-3 max-h-[50vh] overflow-y-auto " >
                            {data?.filter((item) => item?._id !== user?._id)?.map((item, index) => {
                                return (
                                    <Card key={index} item={item} />
                                )
                            })}
                        </div>
                    </LoadingLayout>
                </div>
            </ModalLayout>
        </>
    )
}