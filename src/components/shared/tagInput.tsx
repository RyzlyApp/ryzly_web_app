// "use client";

// import React, { useState } from "react";
// import { useFormikContext, getIn, FormikValues } from "formik";
// import { X } from "lucide-react";
// import { Input } from "@heroui/react";

// interface IProps {
//     name: string;
//     label?: string;
//     max?: number;

//     // 👇 Same pattern as CustomInput
//     notform?: boolean;
//     localValue?: string[];
//     setLocalValue?: (val: string[]) => void;
// }

// export default function CustomTagInput({
//     name,
//     label,
//     max = 8,
//     notform = false,
//     localValue,
//     setLocalValue,
// }: IProps) {
//     const [input, setInput] = useState("");

//     // ---- Formik Mode ----
//     let formik: FormikValues = {};
//     if (!notform) {
//         formik = useFormikContext<FormikValues>();
//     }

//     const tags: string[] = notform
//         ? localValue || []
//         : getIn(formik.values, name) || [];

//     const error = notform ? undefined : getIn(formik.errors, name);
//     const isTouched = notform ? false : getIn(formik.touched, name);

//     const updateTags = (newTags: string[]) => {
//         if (notform) {
//             setLocalValue?.(newTags);
//         } else {
//             formik.setFieldValue(name, newTags);
//         }
//     };

//     const addTag = () => {
//         const value = input.trim();

//         if (!value) return;
//         if (tags.includes(value)) return;
//         if (tags.length >= max) return;

//         updateTags([...tags, value]);
//         setInput("");
//     };

//     const removeTag = (index: number) => {
//         const newTags = tags.filter((_, i) => i !== index);
//         updateTags(newTags);
//     };

//     return (
//         <div className="w-full flex flex-col gap-1">
//             {label && (
//                 <p className="text-sm text-gray-700 font-medium">
//                     {label} ({tags.length}/{max})
//                 </p>
//             )}

//             {/* INPUT */}
//             <div>
//                 <label>Tags ({tags.length}/{max})</label>
//                 <Input
//                     value={input}
//                     onChange={(e) => setInput(e.target.value)}
//                     onKeyDown={(e) => {
//                         if (e.key === "Enter") {
//                             e.preventDefault();
//                             addTag();
//                         }

//                         // 🔥 Backspace deletes last tag (nice UX)
//                         if (e.key === "Backspace" && !input && tags.length) {
//                             removeTag(tags.length - 1);
//                         }
//                     }}

//                     placeholder="Search for a tag"
//                     className="mt-1"
//                     classNames={{
//                         inputWrapper: "bg-white border border-gray-300 h-[45px]",
//                         input: "text-gray-900 text-[16px]",
//                     }}
//                 />
//             </div>

//             {/* TAGS */}
//             <div className="flex flex-wrap gap-2 mt-2">
//                 {tags.map((tag, index) => (
//                     <div
//                         key={index}
//                         className="flex items-center gap-2 bg-[#0F172A] text-white px-3 py-1 rounded-full text-sm"
//                     >
//                         {tag}
//                         <button
//                             type="button"
//                             onClick={() => removeTag(index)}
//                         >
//                             <X size={14} />
//                         </button>
//                     </div>
//                 ))}
//             </div>

//             {/* ERROR */}
//             {!notform && isTouched && error && (
//                 <p className="text-xs text-red-600 font-medium ml-2">
//                     {error}
//                 </p>
//             )}
//         </div>
//     );
// }

"use client";

import React from "react";
import { useFormikContext, getIn, FormikValues } from "formik";
import { Select, SelectItem, Chip, SelectedItems } from "@heroui/react";

interface IProps {
    name: string;
    label?: string;
    max?: number;

    // 👇 Options to display inside the dropdown list
    options?: { label: string; value: string }[];

    // 👇 Formik fallback switches
    notform?: boolean;
    localValue?: string[];
    setLocalValue?: (val: string[]) => void;
}

export default function CustomMultiSelectTag({
    name,
    label,
    max = 8,
    options = [],
    notform = false,
    localValue,
    setLocalValue,
}: IProps) {
    // ---- Formik/Local Mode Synchronization ----
    let formik: FormikValues = {};
    if (!notform) {
        formik = useFormikContext<FormikValues>();
    }

    // Extracted array of current raw strings selected
    const selectedTags: string[] = notform
        ? localValue || []
        : getIn(formik.values, name) || [];

    const error = notform ? undefined : getIn(formik.errors, name);
    const isTouched = notform ? false : getIn(formik.touched, name);

    // If options are empty, build choices on-the-fly out of selected values
    const finalOptions = options.length
        ? options
        : selectedTags.map(t => ({ label: t, value: t }));

    const updateTags = (newTags: string[]) => {
        // Enforce max item configuration criteria limits safely
        if (newTags.length > max) return;

        if (notform) {
            setLocalValue?.(newTags);
        } else {
            formik.setFieldValue(name, newTags);
            // Optionally tell formik to mark it dirty on-change
            formik.setFieldTouched(name, true, false);
        }
    };

    const handleSelectionChange = (keys: any) => {
        // HeroUI Select returns a Selection Set. Convert back to string array
        const selectedArray = Array.from(keys) as string[];
        updateTags(selectedArray);
    };

    const handleRemoveItem = (itemToRemove: string) => {
        const updated = selectedTags.filter(t => t !== itemToRemove);
        updateTags(updated);
    };

    return (
        <div className="w-full flex flex-col gap-1">
            <Select
                label={`${label || "Tags"} (${selectedTags.length}/${max})`}
                selectionMode="multiple"
                placeholder="Select tags"
                selectedKeys={new Set(selectedTags)}
                onSelectionChange={handleSelectionChange}
                isInvalid={!notform && !!(isTouched && error)}
                errorMessage={!notform && isTouched && error ? (error as string) : undefined}
                className="w-full"
                classNames={{
                    trigger: "bg-white border border-gray-300 min-h-[45px] h-auto py-1.5 dynamic-chips shadow-none hover:bg-white",
                    value: "text-gray-900 text-[16px]",
                }}

                // 🔥 Renders tags inside the input trigger box cleanly using Chips
                renderValue={(items: SelectedItems<any>) => (
                    <div className="flex flex-wrap gap-1.5 p-0.5">
                        {items.map((item) => (
                            <Chip
                                key={item.key}
                                size="sm"
                                variant="solid"
                                onClose={() => handleRemoveItem(String(item.key))}
                                classNames={{
                                    base: "bg-[#0F172A] border-none h-6 text-white text-xs",
                                    content: "text-white font-medium pr-1 pl-2",
                                    closeButton: "text-white/70 hover:text-white hover:bg-white/20",
                                }}
                            >
                                {item.textValue || item.key}
                            </Chip>
                        ))}
                    </div>
                )}
            >
                {finalOptions.map((opt) => (
                    <SelectItem
                        key={opt.value}
                        textValue={opt.label}
                        className="text-gray-900 mt-2"
                    >
                        {opt.label}
                    </SelectItem>
                ))}
            </Select>
        </div>
    );
}