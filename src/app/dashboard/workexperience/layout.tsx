import { ReactNode } from "react";

export default function WorkExperienceLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <div className="w-full font-inter">{children}</div>;
}
