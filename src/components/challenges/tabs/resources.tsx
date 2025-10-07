import { LoadingLayout, ResourceCard } from "@/components/shared"; 
import { IChallenge, IResourceDetail } from "@/helper/model/challenge"; 
import { useFetchData } from "@/hook/useFetchData"; 
import { AddResourcesBtn } from "..";


export default function Resources(
    { item }: { item: IChallenge }
) { 

    const { data = [], isLoading } = useFetchData<IResourceDetail[]>({
        endpoint: `/resource`, name: "resource", params: {
            challengeID: item?._id
        }
    }) 

    return (
        <div className=" w-full flex flex-col p-4 gap-4" >
            <AddResourcesBtn tab={true} />
            <LoadingLayout loading={isLoading} lenght={data?.length} >
                <div className=" w-full flex flex-col gap-3 shadow p-4 rounded-2xl " >
                    {data?.map((item, index) => {
                        return (
                            <ResourceCard userInfo={item?.writer} key={index} item={item} withImg={true} />
                        )
                    })}
                </div>
            </LoadingLayout> 
        </div>
    )
}