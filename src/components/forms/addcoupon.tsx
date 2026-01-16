"use client"
import { ICoupon } from "@/helper/model/application"
import { FormikProps, FormikProvider } from "formik" 
import { CustomButton, CustomInput } from "../custom"
import CustomDateTimePicker from "../custom/customDatePicker" 

interface IProp {
    formik: FormikProps<ICoupon>,
    isLoading: boolean,
    edit?: boolean
}

export default function CouponForm(
    {
        formik,
        isLoading,
        edit
    }: IProp
) { 

    return (
        <FormikProvider value={formik}>
            <form onSubmit={formik.handleSubmit} className=" w-full flex flex-col gap-4 " >
                <CustomInput
                    name="code"
                    label="Code"
                    placeholder=""
                /> 
                <CustomInput
                    name="discount"
                    label="Discount"
                    type="number"
                    placeholder=""
                /> 
                <CustomInput
                    name="maxUseCount"
                    label="Max Use Count"
                    type="number"
                    placeholder=""
                />  
                <div className=" w-full flex gap-4 lg:flex-row flex-col " >
                    <CustomDateTimePicker withTime={false} name="validFrom" label="Start Date" />
                    <CustomDateTimePicker withTime={false} name="validTo" label="End Date" />
                </div>
                <div className=" mt-4 w-full flex justify-end " >
                    <CustomButton type="submit" isLoading={isLoading} >{edit ? "Edit Coupon" : "Add Coupon"}</CustomButton>
                </div>
            </form>
        </FormikProvider>
    )
}