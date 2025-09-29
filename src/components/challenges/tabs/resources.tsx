import { AddResourceForm } from "@/components/forms";
import { ModalLayout, ResourceCard } from "@/components/shared";
import { coachAtom } from "@/helper/atom/coach";
import { userAtom } from "@/helper/atom/user";
import { IChallenge } from "@/helper/model/challenge";
import { IUser } from "@/helper/model/user";
// import { useFetchData } from "@/hook/useFetchData";
import useOverview from "@/hook/useOverview";
import { useAtom } from "jotai";
// import { useParams } from "next/navigation"; 
import { RiAddLine } from "react-icons/ri";


export default function Resources(
    { item }: { item: IChallenge }
) {

    const [isCoach] = useAtom(coachAtom); 
    const { formikResource, addResourceMutate, isOpen, setIsOpen } = useOverview()

    const [userState] = useAtom(userAtom)

    const { data } = userState

    // const param = useParams();
    // const id = param.id;
    
    // const { data = [], isLoading } = useFetchData<any[]>({
    //     endpoint: `/resource/${id}`, name: "resource"
    // }) 

    console.log(item); 

    return (
        <div className=" w-full flex flex-col p-4 gap-4" >
            {isCoach && (
                <button onClick={()=> setIsOpen(true)} className=" flex items-center gap-3 text-neonblue-600 " >
                    <div className=" w-8 h-8 rounded-full flex justify-center items-center bg-neonblue-50 " >
                        <RiAddLine size={"18px"} />
                    </div>
                    <p className=" text-sm font-medium " >Add resources</p>
                </button>
            )}
            <div className=" w-full flex flex-col gap-3 shadow p-4 rounded-2xl " >
                {item?.resources?.map((item, index) => {
                    return(
                        <ResourceCard userInfo={data as IUser} key={index} item={item} withImg={true} />
                    )
                })}
            </div>
            <ModalLayout title="Add a participant" isOpen={isOpen} onClose={() => setIsOpen(false)} >
                <AddResourceForm isLoading={addResourceMutate.isPending} formik={formikResource} />
            </ModalLayout>
        </div>
    )
}