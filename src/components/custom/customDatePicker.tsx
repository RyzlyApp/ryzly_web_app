"use client";
import React from "react";
import { DatePicker, DateValue } from "@heroui/react";
import { useFormikContext, getIn, FormikValues } from "formik";
import {
  getLocalTimeZone,
  today,
  fromDate,
  toCalendarDateTime,
  CalendarDate,
  CalendarDateTime,
} from "@internationalized/date";

interface IProps {
  name: string;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  withTime?: boolean;
  defaultHour?: number;
  defaultMinute?: number;
}

export default function CustomDateTimePicker({
  name,
  label,
  disabled,
  withTime = true,
  defaultHour = 9,
  defaultMinute = 0,
}: IProps) {
  const { errors, touched, setFieldValue, values } =
    useFormikContext<FormikValues>();

  const error = getIn(errors, name) as string | undefined;
  const isTouched = getIn(touched, name) as boolean | undefined;

  const rawValue = getIn(values, name) as string | undefined;
  let formikValue: DateValue | null = null;

  // ✅ Convert ISO string to CalendarDate or CalendarDateTime
  if (rawValue) {
    try {
      const jsDate = new Date(rawValue);
      const local = fromDate(jsDate, getLocalTimeZone());
      formikValue = withTime
        ? new CalendarDateTime(
            local.year,
            local.month,
            local.day,
            local.hour,
            local.minute
          )
        : new CalendarDate(local.year, local.month, local.day);
    } catch (e) {
      console.warn("Invalid date in formik value:", rawValue, e);
    }
  }

  const changeHandler = (item: DateValue | null) => {
    if (!item) {
      setFieldValue(name, null);
      return;
    }

    // ✅ Ensure it’s a CalendarDateTime for saving
    const withTimeValue =
      withTime && "hour" in item
        ? item
        : new CalendarDateTime(
            item.year,
            item.month,
            item.day,
            defaultHour,
            defaultMinute
          );

    const jsDate = withTimeValue.toDate(getLocalTimeZone());
    setFieldValue(name, jsDate.toISOString());
  };

  // ✅ Match minValue type to granularity
  const minValue = withTime
    ? toCalendarDateTime(today(getLocalTimeZone()))
    : today(getLocalTimeZone());

  return (
    <div className="w-full flex flex-col gap-1">
      {label && (
        <p className="text-sm text-gray-700 font-medium">{label}</p>
      )}

      <DatePicker
        isDisabled={disabled}
        value={formikValue ?? undefined}
        minValue={minValue}
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
