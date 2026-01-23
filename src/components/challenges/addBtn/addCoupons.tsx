"use client"
import useChallenge from "@/hook/useChallenge" 
import CustomModal from "../../shared/modalLayout"
import { RiAddLine } from "react-icons/ri"
import CouponForm from "@/components/forms/addcoupon"


export default function AddCouponBtn() {

    const { createCoupon, isOpen, setIsOpen, formikCoupon } = useChallenge()


    return (
        <>
            <button onClick={() => setIsOpen(true)} className=" lg:flex hidden items-center gap-3 text-neonblue-600 " >
                <div className=" w-8 h-8 rounded-full flex justify-center items-center bg-neonblue-50 " >
                    <RiAddLine size={"18px"} />
                </div>
                <p className=" text-sm font-medium " >Add Coupon</p>
            </button>

            <button className=" lg:hidden flex items-center gap-3 text-neonblue-600 " >
                <div className=" w-8 h-8 rounded-full flex justify-center items-center bg-neonblue-50 " >
                    <RiAddLine size={"18px"} />
                </div>
                <p className=" text-sm font-medium " >Add Coupon</p>
            </button>

            <CustomModal title="Coupon Creation" isOpen={isOpen} onClose={() => setIsOpen(false)} >
                <div className="w-full flex flex-col gap-4 items-center">  
                    <CouponForm formik={formikCoupon} isLoading={createCoupon?.isPending} />
                </div>
            </CustomModal>
        </>
    )
}