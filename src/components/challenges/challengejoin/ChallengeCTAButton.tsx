import { IChallenge } from "@/helper/model/challenge";
import { CustomButton } from "../../custom";
import { isDateExpired } from "@/helper/utils/isDateExpired";

interface ChallengeCTAButtonProps {
    item: IChallenge;
    isCoach: boolean;
    /** true when the logged-in user's account type is "organization" */
    isOrganization: boolean;
    onJoinClick: () => void;
    onEndClick: () => void;
    isJoinLoading: boolean;
    isEndLoading: boolean;
}

export default function ChallengeCTAButton({
    item,
    isCoach,
    isOrganization,
    onJoinClick,
    onEndClick,
    isJoinLoading,
    isEndLoading,
}: ChallengeCTAButtonProps) {
    const expired = isDateExpired(item?.endDate);
    const isOrgCreated = item?.creator?.userType === "organization";

    if (!item?.joined && !isCoach && !isOrganization) {
        return (
            <div className=" w-full lg:w-fit px-4 ">
                <CustomButton
                    onClick={onJoinClick}
                    isLoading={isJoinLoading}
                    fullWidth
                >
                    Join Challenge
                </CustomButton>
            </div>
        );
    }

    if (expired && isCoach && !isOrgCreated) {
        return (
            <div className=" w-full lg:w-fit px-4 ">
                <CustomButton
                    onClick={onEndClick}
                    isLoading={isEndLoading}
                    fullWidth
                >
                    End Challenge
                </CustomButton>
            </div>
        );
    }

    return null;
}
