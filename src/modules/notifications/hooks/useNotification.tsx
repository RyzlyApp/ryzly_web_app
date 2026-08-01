import React, { useState } from "react";
import { INotificationQueryDto } from "../dto/notificationQueryDto";
import NotificationRepository from "../Repository/Notification.repository";
import { INotificationModel } from "../models/NotificationModel";
import { useAtom } from "jotai";
import { notificationAtom, notificationCountAtom } from "../state/notificationState";
import { uniqBy } from "lodash";

function useNotification() {
  const [notifications, setNotifications] =
    useAtom<INotificationModel[]>(notificationAtom);
  const [unreadCount, setUnreadCount] = useAtom(notificationCountAtom);
  const [total, setTotal] = useState<number>(0);
  return {
    notifications,
    total: total,
    unreadCount: unreadCount,
    getUnreadCount: async () => {
      const response = await NotificationRepository.getUnreadCount();
      setUnreadCount(response?.data ?? 0);
    },
    getNotifications: async ({ page, limit }: INotificationQueryDto) => {
      const response = await NotificationRepository.getUserNotification({
        body: null,
        params: {
          page,
          limit,
        },
      });
      console.log("Fetched notifications:", response);
      setNotifications(uniqBy([...notifications, ...(response?.data ?? [])], "_id"));
      setTotal(response?.total ?? 0);
    },
    markAsRead: async (ids: string[]) => {
      try {
        await NotificationRepository.markAsRead({
          body: {
            ids,
          },
          params: null,
        });
        const newNotifications = notifications.map((item) => ids.includes(item._id) ? { ...item, read: true } : item);
        setNotifications(newNotifications);
      } catch(error) {
        console.error("Error marking notifications as read:", error);
      }
    },
  };
}

export default useNotification;
