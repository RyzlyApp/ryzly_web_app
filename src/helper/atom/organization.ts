
// store/uiAtoms.ts
import { atom } from "jotai";
import { IOrganisationDetails } from "../model/user";

// Initial value is false
export const organisationAtom = atom<IOrganisationDetails>({} as IOrganisationDetails);
