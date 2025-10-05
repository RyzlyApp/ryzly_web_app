import { CustomInput } from "@/components/custom"
import { IChallenge } from "@/helper/model/challenge"
import useChat from "@/hook/useChat"
import { Tabs, Tab, Spinner } from "@heroui/react"
import { FormikProvider } from "formik"
import { useEffect, useState } from "react"
import { RiSendPlane2Fill } from "react-icons/ri"
import ChatCard from "./chatCard"
import { useFetchData } from "@/hook/useFetchData"
import { IChatDetail, IMessages } from "@/helper/model/chat"
import { ImagePicker, LoadingLayout } from "@/components/shared"

export default function ChatLayout(
    { item }: { item: IChallenge }
) {

    const [tab, setTab] = useState("")
    const tablink = [
        {
            label: "Messages",
            key: ""
        },
        {
            label: "Announcements",
            key: "task"
        },
        {
            label: "Help",
            key: "resources"
        },
        {
            label: "Coaches",
            key: "reviews"
        },
    ]

    const { formik, isLoading, chatId, user, setChatId } = useChat()

    const { data: chatdata, isLoading: ChatLoading } = useFetchData<IChatDetail>({
        endpoint: `/chat/challenge/${item?._id}`, name: "chat" + user?._id
    })

    useEffect(() => {
        if (chatdata?.chatType) {
            setChatId(chatdata)
        }
    }, [ChatLoading]) 

    useEffect(() => {
        if (chatId) {
            formik.setFieldValue("chatId", chatId?._id)
        }
    }, [chatId])

    const { data, isLoading: loading } = useFetchData<Array<IMessages>>({
        endpoint: `/chat/${chatId?._id}/messages`, name: "chat" + user?._id, enable: chatId?._id ? true : false, params: {
            limit: 100
        }
    })

    return (
        <FormikProvider value={formik}>
            <div className=" w-full flex flex-col h-full p-4 rounded-2xl bg-white " >
                <div className=" w-full flex items-center justify-between " >
                    <p className=" font-bold " >Finlytics Forum</p>
                </div>
                <div className=" w-full flex flex-col h-[75vh] " >
                    <Tabs selectedKey={tab ? tab : ""} aria-label="Tabs" variant={"underlined"} >
                        {tablink?.map((item) => {
                            return (
                                <Tab key={item?.key} onClick={() => setTab(item?.key)} title={item?.label} />
                            )
                        })}
                    </Tabs>
                    <div className=" w-full flex flex-col-reverse h-full overflow-y-auto gap-2 py-1 " >
                        <LoadingLayout loading={loading} >
                            {data?.map((item, index) => {
                                return (
                                    <ChatCard key={index} item={item} self={item?.senderId === user?._id} previousDate={data[index - 1]?.createdAt} />
                                )
                            })}
                        </LoadingLayout>
                    </div>
                    <form onSubmit={formik.handleSubmit} className=" w-full flex pt-2 " >
                        <CustomInput startContent={<ImagePicker type="chat" />} disabled={chatId?._id ? false : true} rounded="999px" placeholder="Write a message" name="message" endContent={
                            <button disabled={!formik.values?.message} className=" w-8 h-8 disabled:bg-neonblue-100 rounded-full flex justify-center items-center bg-neonblue-600 " >
                                {!isLoading ?
                                    <RiSendPlane2Fill size={"16px"} color="white" /> :
                                    <Spinner size="sm" color="white" />
                                }
                            </button>
                        } />
                    </form>
                </div>
            </div>
        </FormikProvider>
    )
}