"use client";

import React from "react";
import { FormikValues, getIn, useField, useFormikContext } from "formik";
import { Select, SelectItem } from "@heroui/react";
import { Country } from "country-state-city";

interface Props {
    name: string;
    label?: string;
    placeholder?: string;
    className?: string;
    height?: string
}

/**
 * ✅ A reusable HeroUI + Formik country selector
 */
const CountrySelect: React.FC<Props> = ({
    name,
    label = "Country",
    placeholder = "Select a country",
    className,
    height
}) => {

    const { values, setFieldValue, errors, touched } =
        useFormikContext<FormikValues>();

    const value = getIn(values, name);
    const error = getIn(errors, name);
    const isTouched = getIn(touched, name);
    const countries = Country.getAllCountries();

    console.log(countries);
    

    return (
        <div className={`space-y-1 ${className ?? ""}`}>
            {label && (
                <label className="text-[12px] font-medium text-gray-700">
                    {label}
                </label>
            )}

            <Select
                aria-label={label}
                placeholder={placeholder}
                // value={value ? [value] : []}
                selectedKeys={value ? [value] : []}
                onChange={(e) => setFieldValue(name, e.target.value)}
                style={{ height: height ?? "45px", backgroundColor: "white", borderWidth: "1px", borderColor: "#d1d5dc", color: "#101828" }}

                isInvalid={Boolean(isTouched && error)}
                errorMessage={isTouched && error ? error : undefined}
            >
                {countries.map((c) => (
                    <SelectItem key={c.name}>
                        <span className="flex items-center gap-2">
                            {c.flag} {c.name}
                        </span>
                    </SelectItem>
                ))}
            </Select>

            {/* {meta.touched && meta.error && (
                <p className="text-[12px] text-red-500">{meta.error}</p>
            )} */}
        </div>
    );
};

export default CountrySelect;
