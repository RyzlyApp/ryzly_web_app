"use client";
import { createContext, useContext, useState, ReactNode } from "react";

interface PageDetails {
  title: string;
  subtitle?: string;
  actions?: ReactNode;
}

interface AdminPageContextType {
  pageDetails: PageDetails;
  setPageDetails: (details: PageDetails) => void;
}

const AdminPageContext = createContext<AdminPageContextType | undefined>(
  undefined
);

export function AdminPageProvider({ children }: { children: ReactNode }) {
  const [pageDetails, setPageDetails] = useState<PageDetails>({
    title: "Dashboard",
  });

  return (
    <AdminPageContext.Provider value={{ pageDetails, setPageDetails }}>
      {children}
    </AdminPageContext.Provider>
  );
}

export function useAdminPage() {
  const context = useContext(AdminPageContext);
  if (!context) {
    throw new Error("useAdminPage must be used within AdminPageProvider");
  }
  return context;
}
