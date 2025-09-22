import { CustomButton, CustomSearch } from "../custom";

interface IProps {
    isLoading: boolean,
    click: (by: string) => void
}

export default function Addparticipant(
    { isLoading, click } : IProps
) {

    const Card = () => {
        return (
            <div className="  flex w-full items-center justify-between py-2 " >
                <div className=" flex gap-2 items-center " >
                    <div className=" h-9 w-9 rounded-full bg-neonblue-600 " >

                    </div>
                    <p className=" font-medium text-sm " >@folakeadebayo@mail.com</p>
                </div>
                <CustomButton onClick={()=> click("test")} isLoading={isLoading} fontSize="12px" height="36px" >Add Coach</CustomButton>
            </div>
        )
    }

    return (
        <div className=" w-full flex flex-col gap-4 " >
            <CustomSearch />
            <div className=" flex flex-col gap-3 max-h-[50vh] overflow-y-auto " >
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
            </div> 
        </div>
    )
}