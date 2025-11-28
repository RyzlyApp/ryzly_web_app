import { CustomButton } from "@/components/custom";
import { UpdateUserInfo } from "@/components/forms";
import { ModalLayout } from "@/components/shared";
import useProfile from "@/hook/useProfile";

export default function EditUserBtn() {

    const { formik, isLoading: loading, isOpen, setIsOpen, image, setImage } = useProfile()

    return (
        <>
            <CustomButton variant="outline" onClick={() => setIsOpen(true)} >Edit Profile</CustomButton>
            <ModalLayout title="Edit Profile" isOpen={isOpen} onClose={() => setIsOpen(false)} >
                <UpdateUserInfo image={image} setImage={setImage} formik={formik} isLoading={loading} />
            </ModalLayout>
        </>
    )
}