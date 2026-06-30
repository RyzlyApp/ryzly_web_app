"use client";

import { useState, useCallback, useMemo } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { uniqBy } from "lodash";
import { ICommunityMessage } from "../models/community-chat.model";
import communityChatRepository from "../repository/community-chat.repository";
import httpService from "@/helper/services/httpService";

export function useCommunityChatMessages({
  communityId,
  groupId,
}: {
  communityId: string;
  groupId: string | null;
}) {
  const queryClient = useQueryClient();
  const isGroupView = !!groupId;
  const entityId = groupId ?? communityId;

  const [isSending, setIsSending] = useState(false);
  const [isUploadingFile, setIsUploadingFile] = useState(false);
  const [replies, setReplies] = useState<Record<string, ICommunityMessage[]>>({});
  const [loadingReplies, setLoadingReplies] = useState<Record<string, boolean>>({});

  const queryKey = ["community-messages", entityId, isGroupView ? "group" : "community"];

  // ── Fetch messages ────────────────────────────────────────────
  const { data, isLoading, isFetching } = useQuery({
    queryKey,
    queryFn: async () => {
      return isGroupView
        ? await communityChatRepository.getGroupMessages(entityId)
        : await communityChatRepository.getCommunityMessages(entityId);
    },
    enabled: !!entityId,
  });

  const messages = (data?.data ?? []) as ICommunityMessage[];

  // ── Fetch liked message IDs ───────────────────────────────────
  const { data: likedData } = useQuery({
    queryKey: ["message-likes"],
    queryFn: async () => {
      const response = await httpService.get("/community/message-likes");
      return response.data.data as { message: string }[];
    },
  });

  const likedMessageIds = useMemo(
    () => new Set((likedData ?? []).map((l: { message: string }) => l.message)),
    [likedData]
  );

  // ── Send new post (now accepts type/tag) ──────────────────────
  const sendMessage = useCallback(
    async (content: string, file?: File, type?: string) => {
      if (!content.trim() && !file) return;
      if (!entityId) return;

      let imageUrl: string | undefined;

      if (file) {
        setIsUploadingFile(true);
        try {
          const url = await communityChatRepository.uploadFile(file);
          if (url) imageUrl = url;
        } catch (err) {
          console.error("❌ Upload failed:", err);
          setIsUploadingFile(false);
          return;
        }
        setIsUploadingFile(false);
      }

      setIsSending(true);
      try {
        const newMessage = isGroupView
          ? await communityChatRepository.sendGroupMessage(entityId, content, imageUrl, type)
          : await communityChatRepository.sendCommunityMessage(entityId, content, imageUrl, type);

        queryClient.setQueryData(queryKey, (old: typeof data) => {
          if (!old) return old;
          const merged = uniqBy(
            [newMessage, ...(old.data as ICommunityMessage[])],
            "_id"
          ).sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
          return { ...old, data: merged };
        });

        await queryClient.invalidateQueries({ queryKey });
      } catch (err) {
        console.error("❌ Failed to send:", err);
      } finally {
        setIsSending(false);
      }
    },
    [entityId, isGroupView, queryClient, JSON.stringify(queryKey)]
  );

  // ── Send reply (now accepts type) ─────────────────────────────
  const sendReply = useCallback(
    async (messageId: string, content: string, file?: File, type?: string) => {
      if (!content.trim() && !file) return;

      let imageUrl: string | undefined;

      if (file) {
        setIsUploadingFile(true);
        try {
          const url = await communityChatRepository.uploadFile(file);
          if (url) imageUrl = url;
        } catch (err) {
          console.error("❌ Upload failed:", err);
          setIsUploadingFile(false);
          return;
        }
        setIsUploadingFile(false);
      }

      setIsSending(true);
      try {
        isGroupView
          ? await communityChatRepository.replyGroupMessage(messageId, content, imageUrl, type)
          : await communityChatRepository.replyCommunityMessage(messageId, content, imageUrl, type);

        await fetchReplies(messageId, true);
        await queryClient.invalidateQueries({ queryKey });
      } catch (err) {
        console.error("❌ Failed to send reply:", err);
      } finally {
        setIsSending(false);
      }
    },
    [isGroupView, queryClient, JSON.stringify(queryKey)]
  );

  // ── Fetch replies ─────────────────────────────────────────────
  const fetchReplies = useCallback(
    async (messageId: string, force = false) => {
      if (!force && (loadingReplies[messageId] || replies[messageId])) return;
      setLoadingReplies(prev => ({ ...prev, [messageId]: true }));
      try {
        const result = isGroupView
          ? await communityChatRepository.getGroupReplies(messageId)
          : await communityChatRepository.getCommunityReplies(messageId);
        setReplies(prev => ({ ...prev, [messageId]: result.data }));
      } catch (err) {
        console.error("❌ Failed to fetch replies:", err);
      } finally {
        setLoadingReplies(prev => ({ ...prev, [messageId]: false }));
      }
    },
    [isGroupView, loadingReplies, replies]
  );

  // ── Like / Unlike ─────────────────────────────────────────────
  const { mutate } = useMutation({
    mutationKey: ["likeAndUnlike"],
    mutationFn: (messageId: string) =>
      httpService.post(`/community/messages/${messageId}/like`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey });
      queryClient.invalidateQueries({ queryKey: ["message-likes"] });
    },
  });

  const likeAndUnlikePost = useCallback(
    (messageId: string) => mutate(messageId),
    [mutate]
  );

  return {
    messages,
    replies,
    isLoading,
    isFetching,
    isSending,
    isUploadingFile,
    loadingReplies,
    likedMessageIds,
    sendMessage,
    sendReply,
    fetchReplies,
    likeAndUnlikePost,
  };
}