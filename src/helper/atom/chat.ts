import { atom } from "jotai";
import type { IMessages } from "@/helper/model/chat";

// Centralized atom to avoid circular imports between component and hooks
export const CHAT_MESSAGE = atom<IMessages[]>([]);