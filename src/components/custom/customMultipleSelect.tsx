"use client";

import { Select, SelectItem } from "@heroui/react";
import { useFormikContext, getIn, FormikValues } from "formik";

interface CustomMultiSelectProps {
  name: string;
  label?: string;
  placeholder?: string;
  single?: boolean;
  options: { value: string; label: string }[];
}

/**
 * ✅ Supports both single and multiple selection
 * ✅ Works with Formik values
 * ✅ Displays missing/unknown values safely
 */
export default function CustomMultiSelect({
  name,
  label,
  placeholder,
  single,
  options,
}: CustomMultiSelectProps) {
  const { values, setFieldValue, errors, touched } =
    useFormikContext<FormikValues>();

    const value: string[] = getIn(values, name) || [];
  const error = getIn(errors, name);
  const isTouched = getIn(touched, name);
 

  // ✅ Convert normalized value to a Set (required by HeroUI)
  // const selectedKeys = new Set(normalizedValue);

  // console.log(selectedKeys);
  

  const handleSelectionChange = (keys: any) => {
    const selectedArray = Array.from(keys) as string[];

    console.log(selectedArray);
    

    if (single) {
      // Save only one item in Formik
      setFieldValue(name, [selectedArray[0]]);
    } else {
      setFieldValue(name, selectedArray);
    }
  };

  return (
    <div className="w-full flex flex-col gap-0.5">
      {label && <p className="text-sm text-gray-700 font-medium">{label}</p>}

      <Select
        placeholder={placeholder}
        selectionMode={single ? "single" : "multiple"}
        selectedKeys={value}
        onSelectionChange={handleSelectionChange}
        isInvalid={Boolean(isTouched && error)}
        errorMessage={isTouched && error ? error : undefined}
      > 
          {options.map((opt) => (
            <SelectItem key={opt.value} id={opt.value}>
              {opt.label}
            </SelectItem>
          ))}  
      </Select>
    </div>
  );
}
