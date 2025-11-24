import React, { useState } from "react";
import { INotificationQueryDto } from "../dto/notificationQueryDto";
import NotificationRepository from "../Repository/Notification.repository";
import { INotificationModel } from "../models/NotificationModel";
import { useAtom } from "jotai";
import { notificationAtom } from "../state/notificationState";

function useNotification() {
  const [notifications, setNotifications] =
    useAtom<INotificationModel[]>(notificationAtom);
  return {
    notifications,
    getNotifications: async ({ page, limit }: INotificationQueryDto) => {
      const response = await NotificationRepository.getUserNotification({
        body: null,
        params: {
          page,
          limit,
        },
      });
      console.log(`🔔 API CALL - GETTING NOTIFICATIONS `, response?.data);
      setNotifications(response?.data || []);
    },
    markAsRead: async (ids: string[]) => {
      const response = await NotificationRepository.markAsRead({
        body: {
          ids,
        },
        params: null,
      });
      if (response?.data) {
        setNotifications((prev) =>
          prev.map((item) =>
            ids.includes(item._id) ? { ...item, isRead: true } : item
          )
        );
      }
    },
  };
}

export default useNotification;
