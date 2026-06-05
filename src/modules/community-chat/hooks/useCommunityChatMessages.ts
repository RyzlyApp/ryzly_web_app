"use client";

import { useState, useCallback } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { uniqBy } from "lodash";
import { ICommunityMessage } from "../models/community-chat.model";
import communityChatRepository from "../repository/community-chat.repository";

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

  // ── Fetch messages — polls every 5s ──────────────────────────
  const { data, isLoading, isFetching } = useQuery({
    queryKey,
    queryFn: async () => {
      const result = isGroupView
        ? await communityChatRepository.getGroupMessages(entityId)
        : await communityChatRepository.getCommunityMessages(entityId);
      return result;
    },
    enabled: !!entityId,
    // refetchInterval: 5_000,
    // refetchOnWindowFocus: true,
    // staleTime: 2_000,
  });

  const messages = (data?.data ?? []) as ICommunityMessage[];

  // ── Send new post ─────────────────────────────────────────────
  // const sendMessage = useCallback(
  //   async (content: string, file?: File) => {
  //     if (!content.trim() && !file) return;
  //     if (!entityId) return;

  //     let fullContent = content;

  //     if (file) {
  //       setIsUploadingFile(true);
  //       try {
  //         const url = await communityChatRepository.uploadFile(file);
  //         if (url) fullContent = content ? `${content}\n${url}` : url;
  //       } catch (err) {
  //         console.error("❌ Upload failed:", err);
  //         setIsUploadingFile(false);
  //         return;
  //       }
  //       setIsUploadingFile(false);
  //     }

  //     if (!fullContent.trim()) return;

  //     setIsSending(true);
  //     try {
  //       const newMessage = isGroupView
  //         ? await communityChatRepository.sendGroupMessage(entityId, fullContent)
  //         : await communityChatRepository.sendCommunityMessage(entityId, fullContent);

  //       // Optimistically add to cache then revalidate
  //       queryClient.setQueryData(queryKey, (old: typeof data) => {
  //         if (!old) return old;
  //         const merged = uniqBy(
  //           [newMessage, ...(old.data as ICommunityMessage[])],
  //           "_id"
  //         ).sort(
  //           (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  //         );
  //         return { ...old, data: merged };
  //       });

  //       // Revalidate to sync with server
  //       await queryClient.invalidateQueries({ queryKey });
  //     } catch (err) {
  //       console.error("❌ Failed to send:", err);
  //     } finally {
  //       setIsSending(false);
  //     }
  //   },
  //   [entityId, isGroupView, queryClient, JSON.stringify(queryKey)]
  // );

  // const sendReply = useCallback(
  //   async (messageId: string, content: string, file?: File) => {
  //     if (!content.trim() && !file) return;

  //     let fullContent = content;

  //     if (file) {
  //       setIsUploadingFile(true);
  //       try {
  //         const url = await communityChatRepository.uploadFile(file);
  //         if (url) fullContent = content ? `${content}\n${url}` : url;
  //       } catch (err) {
  //         console.error("❌ Upload failed:", err);
  //         setIsUploadingFile(false);
  //         return;
  //       }
  //       setIsUploadingFile(false);
  //     }

  //     if (!fullContent.trim()) return;

  //     setIsSending(true);
  //     try {
  //       isGroupView
  //         ? await communityChatRepository.replyGroupMessage(messageId, fullContent)
  //         : await communityChatRepository.replyCommunityMessage(messageId, fullContent);

  //       // Re-fetch replies with force=true to get fully populated author
  //       await fetchReplies(messageId, true);

  //       // Revalidate messages so repliesCount is fresh from server
  //       await queryClient.invalidateQueries({ queryKey });
  //     } catch (err) {
  //       console.error("❌ Failed to send reply:", err);
  //     } finally {
  //       setIsSending(false);
  //     }
  //   },
  //   [isGroupView, queryClient, JSON.stringify(queryKey)]
  // );

  const sendMessage = useCallback(
    async (content: string, file?: File) => {
      if (!content.trim() && !file) return;
      if (!entityId) return;

      let imageUrl: string | undefined;

      // Upload file first, get URL
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
        // Pass content and image separately — no URL embedding in text
        const newMessage = isGroupView
          ? await communityChatRepository.sendGroupMessage(entityId, content, imageUrl)
          : await communityChatRepository.sendCommunityMessage(entityId, content, imageUrl);

        queryClient.setQueryData(queryKey, (old: typeof data) => {
          if (!old) return old;
          const merged = uniqBy(
            [newMessage, ...(old.data as ICommunityMessage[])],
            "_id"
          ).sort(
            (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
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

  const sendReply = useCallback(
    async (messageId: string, content: string, file?: File) => {
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
          ? await communityChatRepository.replyGroupMessage(messageId, content, imageUrl)
          : await communityChatRepository.replyCommunityMessage(messageId, content, imageUrl);

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


  // ── Fetch replies for a message ───────────────────────────────
  const fetchReplies = useCallback(
    async (messageId: string, force = false) => {
      // force=true skips the cache check — used after sending a reply
      if (!force && (loadingReplies[messageId] || replies[messageId])) return;
      setLoadingReplies(prev => ({ ...prev, [messageId]: true }));
      try {
        const result = isGroupView
          ? await communityChatRepository.getGroupReplies(messageId)
          : await communityChatRepository.getCommunityReplies(messageId);
        // Server returns fully populated author objects
        setReplies(prev => ({ ...prev, [messageId]: result.data }));
      } catch (err) {
        console.error("❌ Failed to fetch replies:", err);
      } finally {
        setLoadingReplies(prev => ({ ...prev, [messageId]: false }));
      }
    },
    [isGroupView, loadingReplies, replies]
  );

  return {
    messages,
    replies,
    isLoading,
    isFetching,
    isSending,
    isUploadingFile,
    loadingReplies,
    sendMessage,
    sendReply,
    fetchReplies,
  };
}