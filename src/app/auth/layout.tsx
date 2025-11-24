'use client';
import { AuthNavbar } from "@/components/auth";
import LoadingUserDetailsModal from "@/components/modal/LoadingUserDetailsModal";
import StorageClass from "@/dal/storage/StorageClass";
import { STORAGE_KEYS } from "@/dal/storage/StorageKeys";
import useAuth from "@/hook/useAuth";
import React, { useCallback } from "react";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
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
 
  React.useEffect(() => {
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
    <div className=" w-screen h-screen flex flex-col overflow-y-auto pb-6 gap-6 bg-[#EBE6E8] " >
      <div className=" w-full lg:sticky lg:pt-0 pt-6 top-6 px-4 flex justify-center " >
        <AuthNavbar />
      </div>
      <div className=" w-full lg:h-full h-fit flex px-4 justify-center lg:items-center " >
        {children}
        <LoadingUserDetailsModal isOpen={userDetails.isPending} onClose={() => {}} />
      </div>
    </div>
  );
}
