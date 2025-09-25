import { userAtom } from "@/helper/atom/user"
import { IResource } from "@/helper/model/application"
import { FormikProps, FormikProvider } from "formik"
import { useAtom } from "jotai"
import UserCard from "../shared/userCard";
import { IUser } from "@/helper/model/user";
import { CustomButton, CustomInput } from "../custom";
import { RiImage2Line } from "react-icons/ri";

interface IProps {
    formik: FormikProps<IResource>;
    isLoading: boolean
}

export default function AddResource({ formik, isLoading }: IProps) {

    const [userState] = useAtom(userAtom)

    const { data } = userState

    return (
        <FormikProvider value={formik}>
            <div className=" w-full flex flex-col gap-4 " >
                <UserCard item={data as IUser} />
                <div className=" w-full flex flex-col gap-3 " >
                    <CustomInput name="description" textarea={true} />
                    <div className=" w-full flex justify-between items-center " >
                        <RiImage2Line />
                        <CustomButton isLoading={isLoading} >Post</CustomButton>
                    </div>
                </div>
            </div>
        </FormikProvider>
    )
}