"use client";

import { atom } from "jotai";

// 🧱 Filter Type Definition
export interface FilterParams {  
  tracks: string[];
  tags: string[];
  type?: "Paid" | "Free" | "";
  participationFee?: number | null;
  winningPrice?: number | null;
  level: string;
  industry: string;
}

// 🎯 Default Values
export const defaultFilters: FilterParams = {  
  tracks: [],
  tags: [],
  type: "",
  participationFee: null,
  winningPrice: null,
  level: "",
  industry: "",
};

// 🧠 Jotai Atom Store
export const filtersAtom = atom<FilterParams>(defaultFilters);

// 🔄 Utility Atom to Update Specific Fields
export const updateFilterAtom = atom(
  null,
  (get, set, update: Partial<FilterParams>) => {
    const current = get(filtersAtom);
    set(filtersAtom, { ...current, ...update });
  }
);
