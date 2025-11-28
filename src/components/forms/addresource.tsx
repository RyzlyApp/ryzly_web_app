import { userAtom } from "@/helper/atom/user"
import { IResource } from "@/helper/model/application"
import { FormikProps, FormikProvider } from "formik"
import { useAtom } from "jotai"
import UserCard from "../shared/userCard";
import { IUser } from "@/helper/model/user";
import { CustomButton, CustomEditor } from "../custom"; 
import { ImagePicker } from "../shared";

interface IProps {
    formik: FormikProps<IResource>;
    isLoading: boolean,
    edit?: boolean,
    preview?: string,
    image: File | null;
    setImage: (by: File | null) => void;
    
}

export default function AddResource({ formik, isLoading, edit, preview, image, setImage }: IProps) {

    const [userState] = useAtom(userAtom)

    const { data } = userState 

    return (
        <FormikProvider value={formik}>
            <form onSubmit={formik.handleSubmit} className=" w-full flex flex-col gap-4 " >
                <UserCard item={data as IUser} />
                <div className=" w-full flex flex-col gap-3 " >
                    <CustomEditor height="300px" name="description" />
                    <div className=" w-full flex justify-between items-end " >
                        <ImagePicker image={image} setImage={setImage} preview={preview} type="resources" />
                        <CustomButton isLoading={isLoading} onClick={formik.handleSubmit} >{edit ? "Edit Post" : "Post"}</CustomButton>
                    </div>
                </div>
            </form>
        </FormikProvider>
    )
}