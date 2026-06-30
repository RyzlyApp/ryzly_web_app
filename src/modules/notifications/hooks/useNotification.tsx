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
  const [notificationCount, setNotificationCount] = useAtom(notificationCountAtom);
  return {
    notifications,
    total: notificationCount,
    getNotifications: async ({ page, limit }: INotificationQueryDto) => {
      const response = await NotificationRepository.getUserNotification({
        body: null,
        params: {
          page,
          limit,
        },
      });
      console.log(`🔔 API CALL - GETTING NOTIFICATIONS `, response);
      setNotifications(uniqBy([...notifications, ...(response?.data ?? [])], "_id"));
      setNotificationCount(response?.total ?? 0);
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
