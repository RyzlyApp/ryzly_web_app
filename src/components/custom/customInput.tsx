"use client"
import { Input } from "@heroui/input";
import React, { useEffect, useState } from 'react';
import { useFormikContext, getIn } from 'formik';


interface IProps {
    name: string;
    height?: string;
    placeholder?: string;
    placement?: "inside" | "outside" | "outside-left" | "outside-top";
    label?: string;
    type?: React.HTMLInputTypeAttribute;
    hasFrontIcon?: boolean;
    hasBackIcon?: boolean;
    icon?: React.ReactNode;
    iconback?: React.ReactNode;
    textarea?: boolean;
    disabled?: boolean;
    editor?: boolean
}

export default function TicketFormInput({
    name,
    placement = "outside-top",
    placeholder,
    label,
    type,
    disabled
}: IProps) {


    // 👇 Hook into Formik
    const { values, errors, touched, setFieldValue } = useFormikContext<any>();

    // Safely pull value, error, touched
    const value = getIn(values, name);
    const error = getIn(errors, name);
    const isTouched = getIn(touched, name);

    const changeHandler = (val: string) => {
        setFieldValue(name, val);
    };

    return (
        <div className=' w-full flex flex-col gap-0.5 ' >
            {label && (
                <p className=" text-sm text-gray-700 font-medium " >{label}</p>
            )}
            {type !== "number" && (
                <Input
                    disabled={disabled}
                    // label={label} 
                    // className=" !bg-white border "
                    placeholder={placeholder}
                    labelPlacement={placement}
                    type={type}
                    classNames={{
                        inputWrapper: "bg-white border border-gray-300 rounded-md",
                        input: "text-gray-900",
                    }}
                    value={value}
                    onValueChange={changeHandler} />
            )}
            {type === "number" && (
                <Input
                    label={label}
                    type={type}
                    value={value}
                    onValueChange={(item: string) => {
                        if (/^\d*$/.test(item)) {
                            changeHandler(item);
                        }
                    }}
                    placeholder={placeholder}
                    labelPlacement={placement}
                    disabled={disabled}
                    onKeyPress={(e) => {
                        if (!/[0-9]/.test(e.key)) {
                            e.preventDefault();
                        }
                    }}
                />
            )}

            {isTouched && error && (
                <p className=' text-xs text-red-600 font-medium ml-2 '>
                    {error}
                </p>
            )}
        </div>
    );
}
