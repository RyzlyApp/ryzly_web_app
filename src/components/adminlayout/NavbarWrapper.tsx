"use client";
import { useAtom } from "jotai";
import { isSecondaryNavAtom } from "@/stores/atoms/navbar";
import MainNavbar from "./navbar";
import AdminNavbar from "../admin/AdminNavbar";

export default function NavbarWrapper() {
  const [isSecondaryNav] = useAtom(isSecondaryNavAtom);

  return isSecondaryNav ? <AdminNavbar /> : <MainNavbar />;
}
