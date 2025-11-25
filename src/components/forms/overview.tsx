import { CustomButton, CustomInput } from "@/components/custom";
import { IOverview } from "@/helper/model/application";
import { FormikProps, FormikProvider } from "formik";

interface IProps {
    index: number;
    setIsOpen: (by: string) => void;
    formik: FormikProps<IOverview>;
    name: string;
    isLoading: boolean;
}

export default function AboutChallenge({
    index,
    setIsOpen,
    formik,
    name,
    isLoading,
}: IProps) {
    const fieldName = `${name}[${index}]`;

    console.log(`${name}[${index}]`);


    return (
        <FormikProvider value={formik}>
            <form onSubmit={formik.handleSubmit} className="w-full flex flex-col gap-3">
                <CustomInput name={fieldName} />
                <div className="flex gap-2 justify-end">
                    <button
                        type="button"
                        onClick={() => setIsOpen("")}
                        className="px-5 text-neonblue-600 text-sm h-[36px]"
                    >
                        Cancel
                    </button>

                    <CustomButton
                        isLoading={isLoading}
                        type="submit"
                        height="36px"
                        variant="primary"
                    >
                        Save
                    </CustomButton>
                </div>
            </form>
        </FormikProvider>
    );
}
