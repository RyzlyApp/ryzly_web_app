"use client"

import CustomModal from "@/components/shared/modalLayout";
import { userAtom } from "@/helper/atom/user";
import { IUser } from "@/helper/model/user";
import useCommunity from "@/hook/useCommunities";
import { useCommunityGroup } from "@/hook/useCommunitiesGroup";
import { Input } from "@heroui/react";
import { useAtom } from "jotai";
import Image from "next/image";
import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";

interface CommunityMembersModalProps {
  isOpen: boolean;
  onClose: () => void;
  isGeneralView: boolean;
  creatorAndMembers: {
    creator?: IUser;
    members?: any[];
  };
}

const CommunityMembersModal = ({
  isOpen,
  onClose,
  isGeneralView,
  creatorAndMembers,
}: CommunityMembersModalProps) => {
  const [userState] = useAtom(userAtom);
  const params = useParams<{ id: string }>();
  const searchParams = useSearchParams();
  const groupId = searchParams.get("group");
  const [searchQuery, setSearchQuery] = useState("");

  const isGroupView = !!groupId;
  const { groupMembers, currentGroup } = useCommunityGroup(isGroupView, params.id);
  const { data: communityMembers } = useCommunity().getCommunityMembers;

  const imagebase = process.env.NEXT_PUBLIC_DOMAIN_URL_LOCAL ?? "";

  const getAvatar = (user?: IUser) => {
    if (user?.profilePicture?.trim()) return user.profilePicture;
    return `${imagebase}/user.png`;
  };

  // Determine creator
  const creator: IUser | undefined = isGroupView
    ? (currentGroup?.creator as IUser)
    : (creatorAndMembers.creator as IUser);

  // Unified member list
  const members = useMemo(() => {
    const raw = isGroupView ? groupMembers : communityMembers;
    return (raw ?? []).map((record: any) => record?.member ?? record).filter(Boolean) as IUser[];
  }, [isGroupView, groupMembers, communityMembers]);

  // Filter out creator from members list to avoid duplication
  const nonCreatorMembers = useMemo(() => {
    if (!creator?._id) return members;
    return members.filter(m => m._id !== creator._id);
  }, [members, creator]);

  // Apply search
  const filteredMembers = useMemo(() => {
    if (!searchQuery.trim()) return nonCreatorMembers;
    const query = searchQuery.toLowerCase();
    return nonCreatorMembers.filter(user =>
      user?.firstName?.toLowerCase().includes(query) ||
      user?.lastName?.toLowerCase().includes(query) ||
      user?.email?.toLowerCase().includes(query)
    );
  }, [nonCreatorMembers, searchQuery]);

  // Also filter creator when searching
  const creatorMatchesSearch = useMemo(() => {
    if (!searchQuery.trim() || !creator) return true;
    const query = searchQuery.toLowerCase();
    return (
      creator?.firstName?.toLowerCase().includes(query) ||
      creator?.lastName?.toLowerCase().includes(query) ||
      creator?.email?.toLowerCase().includes(query)
    );
  }, [creator, searchQuery]);

  const totalCount = nonCreatorMembers.length + (creator ? 1 : 0);

  return (
    <CustomModal
      isOpen={isOpen}
      onClose={onClose}
      title={`${isGeneralView ? "Community" : "Group"} Members`}
      size="xl"
      className="px-0"
    >
      {/* Search + count */}
      <div className="px-4 flex flex-col gap-2">
        <p className="text-xs text-gray-400">{totalCount} member{totalCount !== 1 ? "s" : ""}</p>
        <Input
          placeholder="Search members..."
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          isClearable
          onClear={() => setSearchQuery("")}
        />
      </div>

      <div className="mt-2 space-y-1 max-h-[400px] overflow-y-auto">
        {/* Creator first — always at top with Admin badge */}
        {creator && creatorMatchesSearch && (
          <MemberRow
            user={creator}
            avatar={getAvatar(creator)}
            isAdmin
            isCurrentUser={userState.data?._id === creator._id}
          />
        )}

        {/* Rest of members */}
        {filteredMembers.length > 0 ? (
          filteredMembers.map(member => {
            if (!member?._id) return null;
            return (
              <MemberRow
                key={member._id}
                user={member}
                avatar={getAvatar(member)}
                isCurrentUser={userState.data?._id === member._id}
              />
            );
          })
        ) : (
          !creatorMatchesSearch && (
            <div className="text-center py-8 text-sm text-gray-500">
              {searchQuery ? "No matching members found." : "No members yet."}
            </div>
          )
        )}

        {/* Empty state when no results at all */}
        {filteredMembers.length === 0 && !creatorMatchesSearch && (
          <div className="text-center py-8 text-sm text-gray-500">
            No matching members found.
          </div>
        )}
      </div>
    </CustomModal>
  );
};

export default CommunityMembersModal;

// ── Member row ────────────────────────────────────────────────
const MemberRow = ({
  user,
  avatar,
  isAdmin = false,
  isCurrentUser = false,
}: {
  user: IUser;
  avatar: string;
  isAdmin?: boolean;
  isCurrentUser?: boolean;
}) => (
  <div className="py-3.5 px-4 h-[60px] flex items-center justify-between hover:bg-[#EEF0FF] group cursor-pointer transition-all">
    <Link
      href={`/dashboard/profile/${user._id}`}
      className="flex items-center gap-4 flex-1"
    >
      <div className="relative w-8 h-8 rounded-full overflow-hidden bg-gray-100 shrink-0">
        <Image
          src={avatar}
          alt={`${user.firstName} ${user.lastName}`}
          fill
          className="object-cover"
          sizes="32px"
        />
      </div>
      <div className="flex items-center gap-2 min-w-0">
        <span className="text-sm font-medium text-black truncate">
          {`${user.lastName ?? ""} ${user.firstName ?? ""}`}
        </span>
        {isAdmin && (
          <span className="text-xs px-2 py-0.5 rounded-full bg-[#E3F0B1] shrink-0">
            Admin
          </span>
        )}
        {/* {isCurrentUser && !isAdmin && (
          <span className="text-xs px-2 py-0.5 rounded-full bg-[#EEF0FF] text-[#5160E7] shrink-0">
            You
          </span>
        )} */}
      </div>
    </Link>
  </div>
);