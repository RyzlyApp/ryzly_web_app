import { CustomButton, CustomInput } from "@/components/custom";
import { ChevronLeft } from "lucide-react"; 

interface CouponStepProps {
    couponCode: string;
    setCouponCode: (val: string) => void;
    onBack: () => void;
    onConfirm: () => void;
    isLoading: boolean;
}

export default function CouponStep({
    couponCode,
    setCouponCode,
    onBack,
    onConfirm,
    isLoading,
}: CouponStepProps) {
    return (
        <div className=" w-full flex flex-col gap-3 pb-4 ">
            <div className=" mb-3 flex items-center relative gap-4 justify-center  ">
                <button onClick={onBack} className=" absolute left-0 ">
                    <ChevronLeft size={"25px"} />
                </button>
                <p className=" text-center font-bold text-xl ">Redeem Coupon</p>
            </div>
            <CustomInput
                name="code"
                notform
                setLocalValue={setCouponCode}
                localValue={couponCode}
                placeholder="00000"
                label="Enter Coupon Code"
            />
            <CustomButton
                isLoading={isLoading}
                onClick={onConfirm}
                height="50px"
                isDisabled={!couponCode}
            >
                Confirm
            </CustomButton>
        </div>
    );
}
