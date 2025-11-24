import { CustomButton, CustomInput } from "@/components/custom" 
import { IProfile } from "@/helper/model/user"
import { FormikProps } from "formik"


interface IProps {  
    setIsOpen: (by: string) => void, 
    formik: FormikProps<IProfile>, 
    name: string,
    isLoading: boolean
}

export default function SocialInput(
    { 
        setIsOpen,
        formik,
        name,
        isLoading
    }: IProps
) {
 
    return (
        <form onSubmit={formik.handleSubmit} className=" w-full flex flex-col gap-3 " >
            <CustomInput name={`${name}`} />
            <div className=" flex gap-2 justify-end  " >
                <button type="button" onClick={()=> setIsOpen("")} className=" px-5 text-neonblue-600 text-sm h-[36px] " >
                    Cancel
                </button> 
                <CustomButton isLoading={isLoading} type="submit" height="36px" variant="primary" >
                    Save
                </CustomButton>
            </div>
        </form>
    )
}