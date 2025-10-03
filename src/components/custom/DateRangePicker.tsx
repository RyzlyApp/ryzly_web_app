"use client";

import React from 'react';
import { RiCalendarLine } from 'react-icons/ri';

interface DateRangePickerProps {
  startDate: Date;
  endDate: Date;
  onChange: (dates: { startDate: Date; endDate: Date }) => void;
}

export const DateRangePicker: React.FC<DateRangePickerProps> = ({
  startDate,
  endDate,
  onChange,
}) => {
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <div className="flex items-center bg-white border border-gray-300 rounded-md px-3 py-2 cursor-pointer">
      <RiCalendarLine className="text-gray-500 mr-2" />
      <span className="text-sm text-gray-700">
        {formatDate(startDate)} - {formatDate(endDate)}
      </span>
    </div>
  );
};