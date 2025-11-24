"use client"
import { Input, Textarea } from "@heroui/input"
import React, { useState } from "react"
import { useFormikContext, getIn, FormikValues } from "formik"

interface IProps {
  name: string
  height?: string
  placeholder?: string
  placement?: "inside" | "outside" | "outside-left" | "outside-top"
  label?: string
  type?: React.HTMLInputTypeAttribute
  hasFrontIcon?: boolean
  hasBackIcon?: boolean
  icon?: React.ReactNode
  iconback?: React.ReactNode
  textarea?: boolean
  disabled?: boolean
  rounded?: string
  startContent?: React.ReactNode
  endContent?: React.ReactNode,
  setLocalValue?: (by: string) => void,
  localValue?: string,
  notform?: boolean   // 👈 new flag
}

export default function CustomInput({
  name,
  placement = "outside-top",
  placeholder,
  height,
  label,
  type,
  disabled,
  textarea,
  rounded,
  startContent,
  localValue,
  setLocalValue,
  endContent,
  notform = false,
}: IProps) {

  // ---- Handle Non-Formik Mode ----
  // const [localValue, setLocalValue] = useState("")

  // ---- Handle Formik Mode ----
  let formik: any = {}
  if (!notform) {
    formik = useFormikContext<FormikValues>()
  }

  const value = notform ? localValue : getIn(formik.values, name)
  const error = notform ? undefined : getIn(formik.errors, name)
  const isTouched = notform ? false : getIn(formik.touched, name)

  const changeHandler = (val: string) => {
    if (notform) {
      setLocalValue?.(val)
      return
    }

    if (type === "number") {
      formik.setFieldValue(name, Number(val))
    } else {
      formik.setFieldValue(name, val)
    }
  }

  return (
    <div className="w-full flex text-base flex-col gap-0.5">
      {label && (
        <p className="text-sm text-gray-700 font-medium">{label}</p>
      )}

      {/* TEXTAREA */}
      {textarea ? (
        <Textarea
          disabled={disabled}
          placeholder={placeholder}
          labelPlacement={placement}
          classNames={{
            inputWrapper: `bg-white border border-gray-300 rounded-xl p-3 min-h-[${height ?? "100px"}]`,
            input: "text-gray-900 text-[16px]",
          }}
          value={value}
          onValueChange={changeHandler}
        />
      ) : (
        <>
          {/* NON-NUMBER INPUT */}
          {type !== "number" && (
            <Input
              disabled={disabled}
              placeholder={placeholder}
              labelPlacement={placement}
              type={type}
              startContent={startContent}
              endContent={endContent}
              classNames={{
                inputWrapper:
                  rounded
                    ? "bg-white rounded-full border border-gray-300 h-[45px]"
                    : "bg-white rounded-xl border border-gray-300 h-[45px]",
                input: "text-gray-900 text-[16px]",
              }}
              value={value}
              onValueChange={changeHandler}
            />
          )}

          {/* NUMBER INPUT */}
          {type === "number" && (
            <Input
              placeholder={placeholder}
              labelPlacement={placement}
              type="text"
              value={value}
              disabled={disabled}
              classNames={{
                inputWrapper:
                  "bg-white border border-gray-300 rounded-md h-[45px]",
                input: "text-gray-900 text-[16px]",
              }}
              startContent={startContent}
              onValueChange={(item: string) => {
                if (/^\d*$/.test(item)) {
                  changeHandler(item)
                }
              }}
              onKeyPress={(e) => {
                if (!/[0-9]/.test(e.key)) {
                  e.preventDefault()
                }
              }}
            />
          )}
        </>
      )}

      {/* FORMIC ERROR */}
      {!notform && isTouched && error && (
        <p className="text-xs text-red-600 font-medium ml-2">{error}</p>
      )}
    </div>
  )
}
