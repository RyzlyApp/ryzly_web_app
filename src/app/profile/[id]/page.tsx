"use client";

import { ProfileInfo } from "@/components/dashboard/profile";
import { UnauthorisedLayout } from "@/components/shared";

const ProfilePage = () => {
    return (
        <UnauthorisedLayout>
            <ProfileInfo />
        </UnauthorisedLayout>
    );
};

export default ProfilePage;