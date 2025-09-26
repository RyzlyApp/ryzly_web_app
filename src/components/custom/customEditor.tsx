"use client";

import React from "react";
import { useField } from "formik";
import Editor, {
  BtnBold,
  BtnItalic,
  Toolbar,
  BtnUnderline,
  BtnLink,
  BtnNumberedList,
  BtnBulletList,
  createButton,
} from "react-simple-wysiwyg";
import {
  RiAlignCenter,
  RiAlignLeft,
  RiAlignRight,
  RiAlignJustify,
} from "react-icons/ri";

interface Props {
  name: string;
  label?: string;
  placeholder?: string;
  height?: string | number;
}

const FormikSimpleWYSIWYG: React.FC<Props> = ({
  name,
  label,
  placeholder = "Type something...",
  height = "200px",
}) => {
  const [field, meta, helpers] = useField(name);

  // ✅ Custom alignment buttons
  const BtnAlignCenter = createButton(
    "Align center",
    <div className=" w-full flex h-full justify-center items-center " >
      <RiAlignCenter />
    </div>,
    "justifyCenter"
  );
  const BtnAlignLeft = createButton(
    "Align left",
    <div className=" w-full flex h-full justify-center items-center " >
      <RiAlignLeft />
    </div>,
    "justifyLeft"
  );
  const BtnAlignRight = createButton(
    "Align right",
    <div className=" w-full flex h-full justify-center items-center " >
      <RiAlignRight />
    </div>,
    "justifyRight"
  );
  const BtnAlignJustify = createButton(
    "Justify",
    <div className=" w-full flex h-full justify-center items-center " >
      <RiAlignJustify />
    </div>,
    "justifyFull"
  );

  return (
    <div className="space-y-2">
      {label && <label className="font-medium">{label}</label>}

      <Editor
        value={field.value || ""}
        onChange={(e) => helpers.setValue(e.target.value)}
        placeholder={placeholder}
        style={{
          minHeight: height,
          // borderRadius: "0.75rem", // ✅ rounded corners
          // border: "1px solid #e5e7eb",
          // padding: "0.75rem",
          // backgroundColor: "#fff",
        }}
      >
        <Toolbar>
          <BtnBold />
          <BtnItalic />
          <BtnUnderline />
          <BtnLink />
          <BtnNumberedList />
          <BtnBulletList />
          <BtnAlignLeft />
          <BtnAlignCenter />
          <BtnAlignRight />
          <BtnAlignJustify />
        </Toolbar>
      </Editor>

      {meta.touched && meta.error && (
        <p className="text-red-500 text-sm">{meta.error}</p>
      )}
    </div>
  );
};

export default FormikSimpleWYSIWYG;
