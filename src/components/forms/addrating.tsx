import { IRating } from "@/helper/model/application"
import { FormikProps, FormikProvider } from "formik" 
import { CustomButton, CustomInput } from "../custom"; 
import StarRating from "../custom/customStarRating";

interface IProps {
    formik: FormikProps<IRating>;
    isLoading: boolean,
    edit?: boolean,
    onClose: (by: boolean) => void
}

export default function AddRating({ formik, isLoading, edit, onClose }: IProps) {
 
    return (
        <FormikProvider value={formik}>
            <form onSubmit={formik.handleSubmit} className=" w-full flex flex-col gap-4 " >
                <div className=" w-full flex flex-col gap-3 items-center " >
                    <p className=" text-2xl font-bold max-w-[264px] text-center " >How was the challenge?</p>
                    <StarRating name="rating" max={5} />
                    <CustomInput label="Any other thoughts" placeholder="Describe your experience" name="comment" textarea={true} />
                    <div className=" w-full flex justify-between items-end " >
                        <CustomButton variant="outline" onClick={() => onClose(false)} >Cancel</CustomButton>
                        <CustomButton isLoading={isLoading} onClick={formik.handleSubmit} >{edit ? "Edit Post" : "Submit Review"}</CustomButton>
                    </div>
                </div>
            </form>
        </FormikProvider>
    )
}

