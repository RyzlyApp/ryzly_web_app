import { atom } from "jotai";
import { INotificationModel } from "../models/NotificationModel";

export const notificationAtom = atom<INotificationModel[]>([]);
