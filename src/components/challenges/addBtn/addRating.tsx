import { CustomButton } from "@/components/custom"
import AddRating from "@/components/forms/addrating"
import { ModalLayout } from "@/components/shared"
import useChallenge from "@/hook/useChallenge"

export default function AddRatingBtn() {

    const { isOpen, setIsOpen, addRating, formikRating } = useChallenge()

    return(
        <> 
            <CustomButton onClick={() => setIsOpen(true)} variant="outline" height="36px" >Leave a Review</CustomButton>
            {/* AddRating */}

            <ModalLayout isOpen={isOpen} onClose={() => setIsOpen(false)} >
                <AddRating formik={formikRating} isLoading={addRating?.isPending} onClose={setIsOpen} />
            </ModalLayout>
        </>
    )
}