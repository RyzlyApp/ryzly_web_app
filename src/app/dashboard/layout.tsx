"use client";
import { BottomBar, Navbar, Sidebar } from "@/components/dashboardlayout";
import { ReactNode, useCallback, useEffect } from "react";
import { ModalProvider } from "@/contexts/ModalContext";
import LoadingUserDetailsModal from "@/components/modal/LoadingUserDetailsModal";
import useAuth from "@/hook/useAuth";
import { STORAGE_KEYS } from "@/dal/storage/StorageKeys";
import StorageClass from "@/dal/storage/StorageClass";

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: DashboardLayoutProps) {
    const { userDetails } = useAuth();

  const getUserData = useCallback(async (userid: string) => {
    try {
      const response = await userDetails.mutateAsync(userid);
      return response;
    } catch (error) {
      console.error('Error fetching user data:', error);
      throw error;
    }
  }, [userDetails]);
 
  useEffect(() => {
    (async function() {
      const userid = StorageClass.getValue<string>(STORAGE_KEYS.USERID, { isJSON: false });
      const token = StorageClass.getValue<string>(STORAGE_KEYS.TOKEN, { isJSON: false });
      console.log('userid', userid)
      if (!userid || !token) {
        return;
      } else {
        const userData = await getUserData(userid);
        console.log('userData', userData);
      }
    })()
  }, []);
  return (
    <ModalProvider>
      <div className="w-screen h-screen fixed inset-0 flex !overflow-hidden text-black bg-[#EBE6E8]">
        <div className="w-fit h-screen lg:flex hidden">
          <Sidebar />
        </div>
        <div className="w-full flex flex-col bg-amber-400 h-screen !overflow-y-hidden relative">
          <div className="w-full absolute z-10 bg-white top-0 h-fit">
            <Navbar />
          </div>
          <div className="w-full h-screen relative">
            <div className="w-full lg:absolute fixed top-[70px] lg:top-[80px] bottom-[56px] overflow-x-hidden overflow-y-auto lg:!bottom-0 p-4 inset-x-0 bg-[#f6f6f9]">
              {children}
            </div>
          </div>
          <div className="w-full fixed z-10 lg:hidden bg-white bottom-0 inset-x-0 h-fit">
            <BottomBar />
          </div>
        </div>
      </div>
        <LoadingUserDetailsModal isOpen={userDetails.isPending} onClose={() => {}} />
    </ModalProvider>
  );
}
