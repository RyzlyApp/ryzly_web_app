
// store/uiAtoms.ts
import { atom } from "jotai";
import { IChallenge } from "../model/challenge";

// Initial value is false
export const loadingChallenge = atom(true);
export const challengeData = atom({} as IChallenge);
