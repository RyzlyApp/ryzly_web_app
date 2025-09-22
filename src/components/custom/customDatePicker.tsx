"use client"
import React from "react"
import { DatePicker, DateValue } from "@heroui/react"
import { useFormikContext, getIn, FormikValues } from "formik"
import { getLocalTimeZone, toZoned } from "@internationalized/date"

interface IProps {
    name: string
    label?: string
    placeholder?: string
    disabled?: boolean
    withTime?: boolean // 👈 control whether to include time
}

export default function CustomDateTimePicker({
    name,
    label, 
    disabled,
    withTime = true, // default = includes time
}: IProps) {
    const { errors, touched, setFieldValue } =
        useFormikContext<FormikValues>()

    // const value = getIn(values, name) as Date
    const error = getIn(errors, name) as string | undefined
    const isTouched = getIn(touched, name) as boolean | undefined

    // new Date().toISOString()

    const changeHandler = (item: DateValue | null) => {
        if (item) {
            const zoned = toZoned(item, getLocalTimeZone())
            setFieldValue(name, zoned.toDate().toISOString()) 
        } 

    }

    return (
        <div className="w-full flex flex-col gap-0.5">
            {label && (
                <p className="text-sm text-gray-700 font-medium">{label}</p>
            )}

            <DatePicker
                isDisabled={disabled}
                // label={label}
                // placeholder={placeholder ?? (withTime ? "Select date & time" : "Select date")}
                // value={value}
                granularity={withTime ? "minute" : "day"} // 👈 switch between date-only or date+time
                hourCycle={24}
                classNames={{
                    inputWrapper:
                        "bg-white border border-gray-300 rounded-xl h-[45px]",
                    input: "text-gray-900",
                }}
                onChange={(date) => {
                    changeHandler(date)
                }}
            />

            {isTouched && error && (
                <p className="text-xs text-red-600 font-medium ml-2">{error}</p>
            )}
        </div>
    )
}
