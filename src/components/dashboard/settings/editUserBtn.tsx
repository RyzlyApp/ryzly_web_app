import { CustomButton } from "@/components/custom";
import { UpdateUserInfo } from "@/components/forms";
import { ModalLayout } from "@/components/shared";
import useProfile from "@/hook/useProfile";

export default function EditUserBtn() {

    const { formik, isLoading: loading, isOpen, setIsOpen } = useProfile()

    return (
        <>
            <CustomButton variant="outline" onClick={() => setIsOpen(true)} >Edit Profile</CustomButton>
            <ModalLayout title="Edit Profile" isOpen={isOpen} onClose={() => setIsOpen(false)} >
                <UpdateUserInfo formik={formik} isLoading={loading} />
            </ModalLayout>
        </>
    )
}