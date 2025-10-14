"use client";
import { useRouter } from "next/navigation";
import { BiArrowBack } from "react-icons/bi";
import { useAtom } from "jotai";
import { navbarDetailsAtom } from "@/stores/atoms/navbar";

interface AdminNavbarProps {
  showBackButton?: boolean;
  showTitle?: boolean;
  onBack?: () => void;
  children?: React.ReactNode;
}

export default function AdminNavbar({
  showBackButton = true,
  showTitle = true,
  onBack,
  children,
}: AdminNavbarProps) {
  const router = useRouter();
  const [pageDetails] = useAtom(navbarDetailsAtom);

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      router.back();
    }
  };

  return (
    <div className="h-16 bg-white border-b flex items-center justify-between px-6">
      <div className="flex items-center gap-4">
        {showBackButton && (
          <button
            onClick={handleBack}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <BiArrowBack size={20} />
          </button>
        )}
        {showTitle && (
          <div>
            <h1 className="text-xl font-bold">{pageDetails.title}</h1>
            {pageDetails.subtitle && (
              <p className="text-sm text-gray-500">{pageDetails.subtitle}</p>
            )}
          </div>
        )}
      </div>

      <div className="flex items-center gap-4">
        {children}
        {pageDetails.actions}
      </div>
    </div>
  );
}
