
// store/uiAtoms.ts
import { atom } from "jotai";
import { IOrganisation, IOrganisationDetails } from "../model/user";

// Initial value is false
export const organisationAtom = atom<IOrganisationDetails[]>([]);
