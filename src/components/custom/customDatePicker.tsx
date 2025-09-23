"use client";
import React from "react";
import { DatePicker, DateValue } from "@heroui/react";
import { useFormikContext, getIn, FormikValues } from "formik";
import {
  getLocalTimeZone,
  today,
  toZoned,
  CalendarDateTime, // ✅ Correct import
} from "@internationalized/date";

interface IProps {
  name: string;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  withTime?: boolean; // 👈 control whether to include time
  defaultHour?: number; // 👈 default hour
  defaultMinute?: number; // 👈 default minute
}

export default function CustomDateTimePicker({
  name,
  label,
  disabled,
  withTime = true,
  defaultHour = 9,     // ✅ default to 9 AM
  defaultMinute = 0,   // ✅ default to :00
}: IProps) {
  const { errors, touched, setFieldValue } =
    useFormikContext<FormikValues>();

  const error = getIn(errors, name) as string | undefined;
  const isTouched = getIn(touched, name) as boolean | undefined;

  const changeHandler = (item: DateValue | null) => {
    if (!item) return;

    let zoned;
    if (withTime) {
      if ("hour" in item) {
        // Already has a time
        zoned = toZoned(item, getLocalTimeZone());
      } else {
        // No time → add default time
        const withDefaultTime = new CalendarDateTime(
          item.year,
          item.month,
          item.day,
          defaultHour,
          defaultMinute
        );
        zoned = toZoned(withDefaultTime, getLocalTimeZone());
      }
    } else {
      zoned = toZoned(item, getLocalTimeZone());
    }

    setFieldValue(name, zoned.toDate().toISOString());
  };

  return (
    <div className="w-full flex flex-col gap-0.5">
      {label && (
        <p className="text-sm text-gray-700 font-medium">{label}</p>
      )}

      <DatePicker
        isDisabled={disabled}
        minValue={today(getLocalTimeZone())}
        granularity={withTime ? "minute" : "day"}
        hourCycle={12}
        classNames={{
          inputWrapper:
            "bg-white border border-gray-300 rounded-xl h-[45px]",
          input: "text-gray-900",
        }}
        onChange={(date) => changeHandler(date)}
      />

      {isTouched && error && (
        <p className="text-xs text-red-600 font-medium ml-2">{error}</p>
      )}
    </div>
  );
}
