import { atom } from "jotai";

interface PageDetails {
  title: string;
  subtitle?: string;
  actions?: React.ReactNode;
}

export const navbarDetailsAtom = atom<PageDetails>({
  title: "Dashboard",
});

export const isSecondaryNavAtom = atom<boolean>(false);
