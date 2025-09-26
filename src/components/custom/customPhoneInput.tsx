"use client";
import React from "react";
import { useField } from "formik";
import PhoneInput, { Value } from "react-phone-number-input";
import "react-phone-number-input/style.css";

interface FormikPhoneInputProps {
  name: string;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  defaultCountry?: string; // e.g. "US", "NG", etc.
}

const FormikPhoneInput: React.FC<FormikPhoneInputProps> = ({
  name,
  label,
  placeholder = "Enter phone number",
  disabled,
//   defaultCountry = "NG",
}) => {
  const [field, meta, helpers] = useField(name);

  return (
    <div className="space-y-1">
      {label && (
        <label htmlFor={name} className="text-sm font-medium text-gray-700">
          {label}
        </label>
      )}

      <PhoneInput
        id={name}
        defaultCountry={"NG"}
        value={field.value as Value}
        onChange={(value) => helpers.setValue(value || "")}
        onBlur={() => helpers.setTouched(true)}
        placeholder={placeholder}
        disabled={disabled}
        className={`w-full border rounded-lg px-3  h-[45px] focus:outline-none focus:ring-2 focus:ring-transparent
          ${meta.touched && meta.error ? "border-red-500" : "border-gray-300"}
        `}
      />

      {meta.touched && meta.error && (
        <p className="text-xs text-red-500">{meta.error}</p>
      )}
    </div>
  );
};

export default FormikPhoneInput;
