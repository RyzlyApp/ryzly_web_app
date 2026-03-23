import { CustomButton } from "@/components/custom";
import { OrganisationForm } from "@/components/forms";
import { ModalLayout } from "@/components/shared";
import { organisationAtom } from "@/helper/atom/organization";
import useOrganisation from "@/hook/useOrganisation";
import { useAtom } from "jotai";

export default function EditOrganisationBtn() {


    const [organisation] = useAtom(organisationAtom);
    const { formik, image, setImage, isLoading, isOpen, setIsOpen } =
        useOrganisation(true);

        const AWS_BUCKET_NAME = process.env.NEXT_PUBLIC_AWS_BUCKET_NAME as string;
        const AWS_REGION = process.env.NEXT_PUBLIC_AWS_REGION as string;

    return (
        <>
            <CustomButton variant="outline" onClick={() => setIsOpen(true)}>
                Edit Organisation
            </CustomButton>
            <ModalLayout
                title="Edit Profile"
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
            >
                <OrganisationForm
                    update
                    image={image}
                    preview={`https://${AWS_BUCKET_NAME}.s3.${AWS_REGION}.amazonaws.com/${organisation?.profilePicture}`}
                    setImage={setImage}
                    formik={formik}
                    isLoading={isLoading}
                />
            </ModalLayout>
        </>
    );
}
