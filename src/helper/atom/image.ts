import { atom } from "jotai";

export const imageAtom = atom<File | null>();
export const previewImageAtom = atom<string | null>(null);
